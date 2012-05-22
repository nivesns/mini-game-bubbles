#include<iostream>
#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<netinet/in.h>
#include<fcntl.h>
#include<pthread.h>
#include<arpa/inet.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<sys/epoll.h>
#include<string.h>
#include<errno.h>
#define MAX_ADDR_LENG 40
#define MAXLINE 10
#define OPEN_MAX 100
#define LISTENQ 20
#define SERV_PORT 8888
#define INFTIM 1000
#define TIMEOUT 1000
using namespace std;
//线程池任务队列结构体
struct task{
	int fd;
	struct task *next;
};

struct user_data{
	int fd;
	unsigned int n_size;
	char line[MAXLINE];
};
void* readtask(void *args);
void* writetask(void *args);

struct epoll_event ev, events[LISTENQ];
int epfd;
pthread_mutex_t mutex;
pthread_cond_t condl;
struct task *readhead = NULL, *readtail = NULL,*writehead = NULL,*writetail = NULL;

void setnonblocking(int sock)
{
	int opts;
	opts = fcntl(sock, F_GETFL,&opts);
	if (opts < 0 ){
		perror("fcntl get fd state fail");
		exit(EXIT_FAILURE);
	}
	opts = opts | O_NONBLOCK;
	if (fcntl(sock,F_SETFL,opts) < 0){
		perror("fcntl set fd fail");
		exit(EXIT_FAILURE);
	}
}


int main(int argc, char** argv)
{
	int i, maxi, nfds, listenfd, sockfd, clientfd;
	pthread_t tid1,tid2;
	struct task *new_task = NULL;
	struct user_data *rdata = NULL;

	struct sockaddr_in servaddr;
	struct sockaddr_in clientaddr;
	socklen_t addr_length;
	int err;
	pthread_mutex_init(&mutex,NULL);
	pthread_cond_init(&condl,NULL);
	//初始化用于读线程池的线程
	pthread_create(&tid1,NULL,readtask,NULL);
	pthread_create(&tid2,NULL, readtask,NULL);
        epfd = epoll_create(256);
	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	if (sockfd == -1){
		perror("socket fail");
		exit(EXIT_FAILURE);
	}
	//setnonblocking(sockfd);
	ev.data.fd = listenfd;
	ev.events = EPOLLIN | EPOLLET;
	epoll_ctl(epfd,EPOLL_CTL_ADD,listenfd,&ev);
	bzero(&servaddr,sizeof(struct sockaddr));
	servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
	servaddr.sin_family = AF_INET;
	servaddr.sin_port = htons(SERV_PORT);
	err = bind(sockfd,(struct sockaddr*)&servaddr,sizeof(servaddr));
	if (err < 0){
		perror("bind error");
		exit(EXIT_FAILURE);
	}
	if (listen(sockfd,LISTENQ) == -1){ 
		perror("listen");
		exit(EXIT_FAILURE);
	}
	maxi = 0;
	cout<< "start server"<<endl;
//	addr_length = sizeof(struct sockaddr_in);
        for(;;){
		nfds = epoll_wait(epfd,events,LISTENQ,TIMEOUT);
		cout<< "nfds=" << nfds<<endl;
		for (i = 0 ; i < nfds; i++){
			if (events[i].data.fd == listenfd){
				clientfd = accept(listenfd,(struct sockaddr*)&clientaddr,&addr_length);
				if (clientfd < 0){
					perror("clientfd < 0");
					exit(EXIT_FAILURE);
				}else{
					cout<< clientfd<<endl;
				}
				setnonblocking(clientfd);
				char *str = inet_ntoa(clientaddr.sin_addr);
				printf("connection from %s\n", str);
			//	std::cout<<"connection from "<<str<<std::endl;
				ev.data.fd = clientfd;
				ev.events = EPOLLIN | EPOLLET;
				epoll_ctl(epfd,EPOLL_CTL_ADD,clientfd,&ev); 
			}else if (events[i].events & EPOLLIN){
				cout<<"reading!"<<endl;
				if ((sockfd = events[i].data.fd) < 0 ) continue;

				//((SocketConnecton*)events[i].data.ptr)->handle();

				new_task = new task();
				new_task->fd = sockfd;
				new_task->next = NULL;
				pthread_mutex_lock(&mutex);
				if (readhead == NULL){
					readhead = new_task;
					readtail = new_task;
				}else{
					readtail->next = new_task;
					readtail = new_task;
				}
				pthread_cond_broadcast(&condl);
				pthread_mutex_unlock(&mutex);		
			}else if (events[i].events & EPOLLOUT){
				rdata = (struct user_data*)events[i].data.ptr;
				sockfd = rdata->fd;
				write(sockfd,rdata->line,rdata->n_size);
				delete rdata;
				ev.data.fd = sockfd;
				ev.events = EPOLLIN | EPOLLET;
				epoll_ctl(epfd,EPOLL_CTL_MOD,sockfd,&ev);
			}
	}
}
}
void* readtask(void *args)
{
	int fd = -1; 
	unsigned int n;
	struct user_data *data = NULL;
	while(true){
		pthread_mutex_lock(&mutex);
		while(readhead == NULL){
			pthread_cond_wait(&condl,&mutex);
		}
		fd = readhead->fd;
		struct task *tmp = readhead;
		readhead = readhead->next;
		delete tmp;
		pthread_mutex_unlock(&mutex);
		data = new user_data();
		data->fd = fd;
		if ((n = read(fd,data->line,MAXLINE)) < 0){
			if (errno == ECONNRESET){
				close(fd);
			
			}else{
				std::cout<<"readline error"<<std::endl;
			}
			if (data != NULL) delete data;

		}else if (n == 0){
			close(fd);
			printf("Client close connect!\n");
			if (data != NULL) delete data;
		}else{
			data->n_size = n;
			ev.data.ptr = data;
			cout << data->line <<endl;
			ev.events = EPOLLIN | EPOLLET;
			epoll_ctl(epfd,EPOLL_CTL_MOD,fd,&ev);
		
		}
	}
	return 0;
}

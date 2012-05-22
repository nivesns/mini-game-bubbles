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

const int EPOLL_SIZE = 5000;
const int EVENT_ARR = 5000;
const int PORT = 8889;
const int BUF_SIZE = 5000;
const int BACK_QUEUE = 100;
void setnoblock(int sockFd) //设置非阻塞模式
{
	int opt;
	if ((opt = fcntl(sockFd, F_GETFL)) < 0) //获取原来的flag;
	{
		printf("GET FL failed!\n");
		exit(-1);
	}
	opt |= O_NONBLOCK;
	if (fcntl(sockFd, F_SETFL, opt) < 0)
		printf("SET FL failed!\n");

}
char *get_type(char *url, char *buf) {

	const char *t = url + strlen(url);
	char type[64];
	for (; t >= url && *t != '.'; --t)
		;

	strcpy(type, t + 1);
	if (strcmp(type, "html") == 0 || strcmp(type, "htm") == 0)
		sprintf(buf, "text/%s", type);
	else if (strcmp(type, "gif") == 0 || strcmp(type, "jpg") == 0 || strcmp(
			type, "jpeg") == 0 || strcmp(type, "png") == 0)
		sprintf(buf, "image/%s", type);
	else if (strcmp(type, "/") == 0)
		sprintf(buf, "text/html");
	else {

		sprintf(buf, "unknown");
	}

	return buf;

}

void ws_response(int clientFd, char* request){
	char *token = strtok(request, " "); //GET
	printf("token:%s", token);
	char type[64];
	char *url = strtok(NULL, " "); //URL
	while (*url == '.' || *url == '/')
		++url;
	printf("url:%s", url);
	char file[1280000];

	sprintf(file, "%s", url);
	printf("file:%s", file);

	FILE *fp = fopen(file, "rb"); //以只读 二进制格式打开文件

	if (fp == 0) {
		char response[] = "HTTP/1.1 404 NOT FOUND\r\n\r\n";
		printf("HTTP/1.1 404 NOT FOUND\r\n\r\n");
		write(clientFd, response, strlen(response));
	} else {

		int file_size;
		char *content;
		char *response;
		fseek(fp, 0, SEEK_END);
		file_size = ftell(fp);
		fseek(fp, 0, SEEK_SET);
		content = (char *) malloc(file_size + 1);
		response = (char*) malloc(200);
		fread(content, file_size, 1, fp);
		content[file_size] = 0;
		sprintf(
				response,
				"HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: 7GGzyIJjf9bX7pej+3tc5Vv87S0=\r\nWebSocket-Origin: http://www.zendstudio.net\r\nWebSocket-Location: ws://www.zendstudio.net:9108/chat\r\n\r\n",
				file_size, get_type(url, type));

		write(clientFd, response, strlen(response)); //写HTTP头信息
		write(clientFd, content, file_size); //写文件 不能用strlen，否则图片会出错，图片是二进                                                  //制文件，strlen遇到0会结束
		free(content);
		free(response);
	}
	
}
void http_response(int clientFd, char* request) {

	char *token = strtok(request, " "); //GET
	printf("token:%s", token);
	char type[64];
	char *url = strtok(NULL, " "); //URL
	while (*url == '.' || *url == '/')
		++url;
	printf("url:%s", url);
	char file[1280000];

	sprintf(file, "%s", url);
	printf("file:%s", file);

	FILE *fp = fopen(file, "rb"); //以只读 二进制格式打开文件

	if (fp == 0) {
		char response[] = "HTTP/1.1 404 NOT FOUND\r\n\r\n";
		printf("HTTP/1.1 404 NOT FOUND\r\n\r\n");
		write(clientFd, response, strlen(response));
	} else {

		int file_size;
		char *content;
		char *response;
		fseek(fp, 0, SEEK_END);
		file_size = ftell(fp);
		fseek(fp, 0, SEEK_SET);
		content = (char *) malloc(file_size + 1);
		response = (char*) malloc(200);
		fread(content, file_size, 1, fp);
		content[file_size] = 0;
		sprintf(
				response,
				"HTTP/1.1 200 OK\r\nContent-Length:%d\r\nContent-Type:%s\r\n\r\n",
				file_size, get_type(url, type));

		write(clientFd, response, strlen(response)); //写HTTP头信息
		write(clientFd, content, file_size); //写文件 不能用strlen，否则图片会出错，图片是二进                                                  //制文件，strlen遇到0会结束
		free(content);
		free(response);
	}
}
int main() {
	int serverFd;
	serverFd = socket(AF_INET, SOCK_STREAM, 0); //创建服务器fd
	if (serverFd == -1) {
		perror("socket fail");
		exit( EXIT_FAILURE);
	}
	setnoblock(serverFd); //设置为非阻塞模式

	//创建epoll，并将serverFd放入监听队列
	int epFd = epoll_create(EPOLL_SIZE);
	struct epoll_event ev, evs[EVENT_ARR];
	ev.data.fd = serverFd;
	ev.events = EPOLLIN | EPOLLET;
	epoll_ctl(epFd, EPOLL_CTL_ADD, serverFd, &ev);

	//绑定服务器端口
	struct sockaddr_in serverAddr;
	socklen_t serverlen = sizeof(struct sockaddr_in);
	bzero(&serverAddr,sizeof(struct sockaddr));
	serverAddr.sin_addr.s_addr = htonl(INADDR_ANY);
	serverAddr.sin_family = AF_INET;
	serverAddr.sin_port = htons(PORT);
	if (bind(serverFd, (struct sockaddr*) &serverAddr, serverlen)) {
		printf("BIND failed!\n");
		exit(-1);
	}

	//打开监听
	if (listen(serverFd, BACK_QUEUE)) {
		printf("Listen failed!\n");
		exit(-1);
	}

	//服务处理
	int clientFd;
	struct sockaddr_in clientAddr;
	socklen_t clientlen;
	char buf[BUF_SIZE];
	for (;;) {
		//等待epoll事件到来，最多取EVENT_ARR个事件
		int nfds = epoll_wait(epFd, evs, EVENT_ARR, -1);
		//处理事件
		for (int i = 0; i < nfds; i++) {
			if (evs[i].data.fd == serverFd && evs[i].events & EPOLLIN) {
				//如果是serverFd，表明有新连接连入
				if ((clientFd = accept(serverFd,
						(struct sockaddr*) &clientAddr, &clientlen)) < 0) {
					printf("ACCEPT  failed\n");
				}
				printf("Connect from %s:%d\n", inet_ntoa(clientAddr.sin_addr),
						htons(clientAddr.sin_port));
				setnoblock(clientFd);
				//注册accept()到的连接
				ev.data.fd = clientFd;
				ev.events = EPOLLIN | EPOLLET;
				epoll_ctl(epFd, EPOLL_CTL_ADD, clientFd, &ev);
			} else if (evs[i].events & EPOLLIN) {
				//如果不是serverFd,则是client的可读
				printf("client can write!\n");
				if ((clientFd = evs[i].data.fd) > 0) {
					//先进行试探性读取
					int len = read(clientFd, buf, BUF_SIZE);
					printf("%s", buf);
					if (len > 0) {
						//printf("%s\n",buf);
						//http_response(clientFd, buf);
						//有数据可读,Echo写入
						// do{
						// if(write(clientFd,buf,len)<0)
						//   {
						//printf("Write failed\n");
						//   }
						// len=read(clientFd,buf,BUF_SIZE);
						// }while(len>0);

					} else if (len == 0) {
						//触发了EPOLL事件，却没有读取，表示断线
						printf("Client closed at %s\n", inet_ntoa(
								clientAddr.sin_addr));
						epoll_ctl(epFd, EPOLL_CTL_DEL, clientFd, &ev);
						close(clientFd);
						evs[i].data.fd = -1;
						break;
					} else if (len == EAGAIN) {
						printf("socket huan cun man le!\n");
						continue;
					} else {
						//client读取出错
						printf("Client read failed!\n");
					}
				} else
					printf("other error!\n");
			}
		}
	}
	return 0;
}

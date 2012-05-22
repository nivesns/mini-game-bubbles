#define readn(fd,ptr,n) recv(fd,ptr,n,MSG_WAITALL)
#define writen(fd,ptr,n) send(fd,ptr,n,MSG_WAITALL)
struct args{
	long arg1;
	long arg2;
};
struct result{
	long sum;
};


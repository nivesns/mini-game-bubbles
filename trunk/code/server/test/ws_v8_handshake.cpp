
#ifndef HAND_SHAKE_H

#define HAND_SHAKE_H

#include <stdio.h>

#include <stdlib.h>

#include <string.h>

#include <iostream>

#include <openssl/sha.h>

#include <openssl/evp.h>

#include <openssl/sha.h>

#include <openssl/hmac.h>

#include <openssl/bio.h>

#include <openssl/buffer.h>

//定义handshake结构体变量

/*

        GET /chat HTTP/1.1

        Host: server.example.com

        Upgrade: websocket

        Connection: Upgrade

        Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==

        Sec-WebSocket-Origin: http://example.com

        Sec-WebSocket-Protocol: chat, superchat

        Sec-WebSocket-Version: 8

*/

struct handshake 

{

        char *get;

        char *host;

char *key;

char *origin;

        char *protocol;

char *version;

};

//base64编码

char *base64(const unsigned char *input, int length)

{

  BIO *bmem, *b64;

  BUF_MEM *bptr;

 

  b64 = BIO_new(BIO_f_base64());

  bmem = BIO_new(BIO_s_mem());

  b64 = BIO_push(b64, bmem);

  BIO_write(b64, input, length);

  BIO_flush(b64);

  BIO_get_mem_ptr(b64, &bptr);

 

  char *buff = (char *)malloc(bptr->length);

  memcpy(buff, bptr->data, bptr->length-1);

  buff[bptr->length-1] = 0;

 

  BIO_free_all(b64);

 

  return buff;

}

//base64解码

char *unbase64(unsigned char *input, int length)

{

  BIO *b64, *bmem;

 

  char *buffer = (char *)malloc(length);

  memset(buffer, 0, length);

 

  b64 = BIO_new(BIO_f_base64());

  bmem = BIO_new_mem_buf(input, length);

  bmem = BIO_push(b64, bmem);

 

  BIO_read(bmem, buffer, length);

 

  BIO_free_all(bmem);

 

  return buffer;

}

//释放握手后不再使用的部分变量

void free_handshake(struct handshake* hs)

{

        if( hs->get != NULL )            free(hs->get);

        if( hs->host != NULL )           free(hs->host);

        if( hs->key != NULL )            free(hs->key);

        if( hs->protocol != NULL )       free(hs->protocol);

if( hs->version != NULL )        free(hs->version);

 }

 

// 增加了一个end参数，这样不必提取出字符串后，再做剔除处理

char* match_string(const char* src, const char* pattern, char end)

{

        char buf[BUFSIZ];

        memset(buf, 0, BUFSIZ);

        size_t src_len = strlen(src); 

        size_t ptn_len = strlen(pattern);

        unsigned short b=0, p=0, i=0; 

        char c='\0';

        for(i=0; i<src_len; i++)

{

              c = src[i];

              if(p==ptn_len)

 { // p==ptn_len 表示正在匹配中

                 if(c=='\r' || c=='\n'  || (end !='\0' && c==end) ) 

{

p++; // 匹配结束

} else

{

buf[b++]=c; // 匹配到的字符 

}

              }else if(p<ptn_len)

 {    // 为达到匹配要求

                   if(c==pattern[p])

  {

  p++;

  }

                   else 

  {

  p=0;

  }

              }

        }

        size_t ret_len = strlen(buf);

        char *ret_p; 

        if( ret_len>0 )

{

             ret_p = (char*)calloc(ret_len+1,sizeof(char)); // 加 1 为了存储 '\0'

             memcpy(ret_p, buf, ret_len);

        } else 

        {

ret_p = NULL;

}

        return ret_p; 

}

 

void handshake_test(const char* src, struct handshake* hs)

{

        hs->get = match_string(src, "GET ", 0x20); // 提取空格之前

        hs->host = match_string(src, "Host: ", '\0');

        hs->key = match_string(src, "Sec-WebSocket-Key: ", '\0');

        hs->protocol = match_string(src, "Sec-WebSocket-Protocol: ", '\0');

hs->origin = match_string(src, "Sec-WebSocket-Origin: ",'\0');

hs->version = match_string(src,"Sec-WebSocket-Version: ",'\0');

}

//获得握手协议返回数据

char * get_hand_shake(const char * src)

{

 

struct handshake hs = {NULL, NULL, NULL, NULL, NULL, NULL};

 

handshake_test(src,&hs);

 

std::string value=hs.key;

 

     value+="258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

 

unsigned char hash[20];

//sha-1 哈希

SHA1((const unsigned char *)value.c_str(), value.length(), hash);

//base64 编码

char * res= base64(hash,sizeof(hash));

 

    char *buffer = new char[BUFSIZ];

//格式化数据

    sprintf (buffer, "HTTP/1.1 101 Switching Protocols\r\n"

        "Upgrade: websocket\r\n"

        "Connection: Upgrade\r\n"

        "Sec-WebSocket-Accept: %s\r\n\r\n",res);

 

free_handshake(&hs);

 

return buffer;

}

#endif;

//main  函数


int main(int strv ,char srrv[])

{

char  test[] = "GET /chat HTTP/1.1\r\n"

        "Host: server.example.com\r\n"

        "Upgrade: websocket\r\n"

        "Connection: Upgrade\r\n"

        "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\n"

        "Sec-WebSocket-Origin: http://example.com\r\n"

        "Sec-WebSocket-Protocol: chat, superchat\r\n"

        "Sec-WebSocket-Version: 8\r\n\r\n";

    char *buffer ;

buffer = get_hand_shake(test);

std::cout << buffer;

delete buffer;

    printf("\n");

system("pause");

    return 0;

    
}
 
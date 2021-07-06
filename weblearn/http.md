## HTTP协议

#### 1.http报文

http请求由四部分组成：

1. method：常为`get`或者是`post`get主要是请求服务器资源，而post则是向服务器发送`html表单`
2. url：常为要获取资源的路径，就是很明显的元素资源的url
3. http协议的版本号
4. 为服务端表达一些信息的可选头部headers
5. 对于post请求，body中会包含发送的资源

响应报文：

1. http协议版本号
2. 状态码：显示对应请求执行是否成功，以及失败原因
3. 状态信息：状态码描述信息，可以由服务器端自行设定
4. header，与请求类似
5. 可选，响应报文包含资源body更为常见



#### 2.url

也就是网址

基本组成：`scheme://host[:port#]/path/.../[?query-string][#anchor]`

- scheme：访问服务器以获取资源时要使用哪种协议，http.https等
- host：http服务器的ip地址
- port#：端口号
- path：访问资源的路径
- query-string：发给http服务器的数据
- anchor：锚




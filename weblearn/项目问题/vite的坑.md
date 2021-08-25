## vite的坑

#### 1.配置环境变量无效的问题

设置的.env.dev文件内容无效，同时`config`的`index.js`文件中配置也不生效

发现是需要在package.json中![image-20210824094721351](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210824094721351.png)

在`"scripts"`中的`"dev"`属性由`"vite"`改为`"vite --mode dev"`


> #### 报错 VM1033 WAService.js:2 Component is not found in path

原因是根据vscode的路径提示：

在app.json中

```json
 "usingComponents": {  
    "van-divider": "../static/dist/divider/index"
  }
```

然后，我把`../`换成了`./`结果就成了？？？

不太能理解

然而事实就是这样

```json
 "usingComponents": {  
    "van-divider": "./static/dist/divider/index"
  }
```


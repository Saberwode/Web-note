## 这里是HTML笔记

##### 1.a元素中的target属性的值：

- _blank：浏览器新打开页面加载
- _self：默认目标，在相同窗口加载
- _parent：父窗口打开
- _top：载入包含这个超链接的窗口



##### 2.  < img>标签：

- src属性用于描述路径
- alt属性用于加载不成功时显示内容
- title属性用于鼠标悬停在图片上显示提示文字



##### 3.< div>标签：

用于布局，div内的字体独占一行 下一个div块会自动另起一行



##### 4.< b>加粗 < strong>加粗且强调 < i>文字倾斜 < em>倾斜且强调 < pre>保留文本的换行和空格 宽度



##### 5.< sub>和< sup>设置文本的上标和下标 上标就比如是（二次方）的形式



##### 6.`转义字符：(&lt; ) 小于号（<） (&gt; )大于号 ( &amp;) 与号（&）(&nbsp;) 空格 (&times; )乘号×(&divide;) 除号（÷）`



##### 7.行级标签与块级标签之间的转换，通过display属性，如果属性值为inline，那么就是转化为行级标签 而 block则是块级标签



##### 8.项目命名规范：

<img src="C:\Users\gjm\AppData\Local\Temp\Image.png" alt="Image" style="zoom: 67%;" />



##### 9.form表单的input标签中的type属性值：

<img src="C:\Users\gjm\AppData\Local\Temp\Image.png" alt="Image" style="zoom: 67%;" />

- 其中text是文本框，用户可以里面输入任何数字

- password是密码框，用户看不到输入的内容

- radio是单选框，也可以实现多选，如果要实现多选一，必须为其加入name属性，且同为单选框的选项name值需要相同

- checkbox是复选框，可以实现多选



##### 10.form表单中的其他属性：

checked主要针对单选框和复选框，一打开网页就可以默认选中某一个选项maxlength是用户可以在表单元素中输入的最大字符



##### 11.select属性：

其中option属性表示选项，select属性是一个下拉表，可以选择下拉表中的属性值



##### 12.下划线：< hr>



##### 13.html实现内部跳转：# 加上 id就可以实现点击链接跳转到目标id的位置去

```js
<a href="#contacts-header">Contacts</a>...<h2 id="contacts-header">Contacts</h2>
```



##### 14.占位符placeholder:

<img src="file:///C:/Users/gjm/AppData/Local/Temp/enhtmlclip/Image.png" alt="img" style="zoom:50%;" />

<img src="C:\Users\gjm\AppData\Local\Temp\Image.png" alt="Image" style="zoom:50%;" />

其中字体选中之后不会消失，当你输入第一个数字之后才会消失



##### 15.input标签：

disabled属性：使表单变灰色，用户不能向其输入任何数据

label 用于绑定input，其中`<label for="xx">`与`<input id="xx">`相对应，当点击label中的内容时，就会聚焦到input里面


## 这里是JavaScript笔记

##### 1.作用域：

内部函数访问外部函数的变量，采取的是链式查找的方式来决定取哪个值，这种结构我们称之为作用域链 它坚持一个“就近原则”



##### 2.创建函数的两种方法：

（1）：利用函数关键字自定义函数（命名函数）function fn(){}

（2）：利用函数表达式声明（匿名函数）var fun = fuction(){}两者创建方法不同，但是大体用法是相同的，函数表达式同样可以进行传递参数



##### 3.调用对象属性的两种方法：

（1）：Obj.name

（2）：Obj['name']



##### 4.构造函数首字母要大写



##### 5.DOM：element ：

元素！！一定要记住页面中所有标签都是元素。文档：一个页面就是一个文档，DOM用document表示。网页中所有内容都是节点（标签，属性，文本，注释等），DOM中使用node表示DOM把以上内容都看做是对象



##### 6.获取元素：

（1）通过id：document.getElementById();//返回的是一个元素对象var timer = document.getElementById('time');console.dir(timer);dir:目录//打印我们返回的元素对象，可以查看里面的属性和方法

（2）通过父元素然后通过id：element.getElementById();（3）通过类名进行选择：document.getElementByClassName();



##### 7.获取元素：

body：document.body //返回body元素

html:document.documentElement // 返回html元素对象



##### 8.函数与方法：

方法是在对象内定义的函数，浏览器内置函数（方法）和变量（成为属性）存储在结构化对象内，以使代码更加高效，易于处理。
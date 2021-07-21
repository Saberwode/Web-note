## 这里是CSS笔记

##### 1.css选择器分为基础选择器和复合选择器



##### 2.`*{}为通配符选择器，使用他可以将整个网页的样式进行修改`



##### 3.关于字体：

其中font-weight中的属性值：normal 正常， bold 粗体， bolder 特粗， lighter 细体在实际开发中，设置变粗变细一般是使用数字比如normal就是400，再往上加就是变粗700相当于bold



##### 4.font-style：

设置文本风格其中属性值有normal：将文本设置为默认值，italic：将文本设置为斜体



##### 5.字体总结：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082533684.png" alt="image-20210515082533684" style="zoom: 50%;" />



##### 6.文本对齐：text-align：其中有center居中 right 右对齐 left左对齐text-decoration：文本装饰：其中有  none 取消线的格式（常用）underline下划线 line-through删除线 文本缩进：text-indent用于指定文本第一行的缩进：em当前文本元素的一个文字大小比如text-indent：2em 就表示段落前开头空两行





##### 7.文本总结：

<img src="C:\Users\gjm\AppData\Local\Temp\Image.png" alt="Image" style="zoom:33%;" />



##### 8.emmet语法：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082557699.png" alt="image-20210515082557699" style="zoom: 50%;" />



##### 9.id选择器：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082617267.png" alt="image-20210515082617267" style="zoom:50%;" />



##### 10.后代选择器：例如<ul>        <li> 我是li<a href="">我是a</a></li>   </ul>当你想把“我是li”改成其他样式的时候，可以进行 ul li {}操作 而对我是a进行操作的时候，用ul li a{}进行操作



##### 11.子选择器子选择器只会选择最近一级的元素比如：<div><a>我是1</a><p>       <a>  我是2</a>        </p></div>  当你想选“我是2的时候”就用 div >a {}

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082642959.png" alt="image-20210515082642959" style="zoom:50%;" />



##### 12.链接伪选择器：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082700215.png" alt="image-20210515082700215" style="zoom:50%;" />



##### 13.focus伪类选择器：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082717064.png" alt="image-20210515082717064" style="zoom:50%;" />



##### 14.复合选择器总结：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082732989.png" alt="image-20210515082732989" style="zoom:50%;" />



##### 15.块元素：特别注意：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082756649.png" alt="image-20210515082756649" style="zoom:50%;" />

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082825107.png" alt="image-20210515082825107" style="zoom:50%;" />





##### 16.行内元素：



##### 17.行内块元素：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082852377.png" alt="image-20210515082852377" style="zoom:50%;" />



##### 18：display：block（将行内元素转化为块元素）



##### 19：同18元素模式转换：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082912820.png" alt="image-20210515082912820" style="zoom:50%;" />



##### 20:background-repeat属性：背景平铺

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082933071.png" alt="image-20210515082933071" style="zoom:50%;" />



##### 21：背景图片位置：background-position

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515082957386.png" alt="image-20210515082957386" style="zoom:50%;" />



##### 23.CSS背景总结：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083013567.png" alt="image-20210515083013567" style="zoom:50%;" />



##### 24.行高的继承：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083029835.png" alt="image-20210515083029835" style="zoom:50%;" />



##### 25.盒子模型：

边框：border:border-style：边框样式 solid 实线 dashed 虚线 dotted 点线



##### 26.边框可以为单独的一个边指定样式：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083045316.png" alt="image-20210515083045316" style="zoom:50%;" />



##### 27.合并相邻边框：border-collapse：collapse 相邻边框合并在一起，因为相邻边框在一起会产生重叠的效果



##### 28.盒子模型：内边距padding

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083102342.png" alt="image-20210515083102342" style="zoom:50%;" />



##### 29.关于内边距padding的简写：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083114715.png" alt="image-20210515083114715" style="zoom:50%;" />



##### 30.如果已经指定了盒子的大小，再对其进行内边距的设置，会撑大盒子。



##### 31.外边距margin同理简写方式与padding一致（先上下，后左右）



##### 32.行内元素或者行内块元素水平居中要给其父元素添加 text-align：center



##### 33.块元素想设置水平居中需要给盒子的左右外边距设置为auto

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083131675.png" alt="image-20210515083131675" style="zoom:50%;" />



##### 34.

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083153060.png" alt="image-20210515083153060" style="zoom:50%;" />



##### 35.圆角边框

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083209161.png" alt="image-20210515083209161" style="zoom:50%;" />

css3新增

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083242267.png" alt="image-20210515083242267" style="zoom:50%;" />

其数值与上图一一对应注意:outset一定不能写进去，写进去的只能是outset



##### 36.<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083322728.png" alt="image-20210515083322728" style="zoom: 50%;" />

其数值与上图一一对应注意:outset一定不能写进去，写进去的只能是outset



##### 37.<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083400977.png" alt="image-20210515083400977" style="zoom: 50%;" />



##### 38.浮动：![image-20210515083422202](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083422202.png)



##### 39.浮动元素经常与标准父级搭配使用：

![image-20210515083435080](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083435080.png)



##### 40.清除浮动的必要性：

在很多时候，你想要对页面进行布局，你需要先设置一个大的盒子，然后再设置几个小的盒子，然后进行浮动，达到盒子与盒子之间无间距的目的，但是使用浮动的话，当前的盒子所在的位置就会消失，因此，当盒子只有一排的时候，可能会出现当前排都消失的情况。所以需要清除浮动的影响。

![image-20210515083451828](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083451828.png)



##### 41.清除浮动方法：

  另外一种方法就是在父元素上添加 overflow ：hidden ，也是可以起到清除浮动的方法



42.

![image-20210515083503060](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083503060.png) 	

##### 43.css书写顺序规范：

==重点：==

![image-20210515083516428](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083516428.png)



##### 44.导航栏注意：

![image-20210515083614348](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083614348.png)



##### 45.一个浮动，全部都要浮动，不然就浮不上去



##### 46.导航栏设计：

![image-20210515083629946](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515083629946.png)



##### 47.文本对齐方式：

text-align: center



##### 48.让盒子居中对齐：

margin:0 auto;其中auto是第二个值，代表了左右居中对齐 而第一个0代表了上下外边距为0



##### 49.letter-spacing：

设置元素字母间距



##### 50.cursor：

设置鼠标指针的变化：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210515094841186.png" alt="image-20210515094841186" style="zoom: 33%;" />



#### 51.盒模型设置：

box-sizing:border-box;对于有些情况下，内外边距和边框会对box本身的大小造成影响，进而对布局造成影响

所以通常用`box-sizing:border-box`对其进行设置。这么做的效果就是，他的大小不会因为内外边距而改变，而会将图像本身向内缩小

```css
*{
	margin:0;
	padding:0;
	box-sizing:border-box;
	//整体设置，清除内外边距，并且将box-sizing设置为borderbox
}
```

#### 52.flex:1;

![image-20210716151753299](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210716151753299.png)



#### 53.设置断点：

![image-20210716171117075](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210716171117075.png)



#### 54.背景缩放；

![image-20210718110603955](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210718110603955.png)
## 5.27

> ## flex布局

#### 1.flex-direction：主轴的方向

- row 默认左端
- row-reverse 右端
- column 变为垂直方向，起点为上沿
- column-reverse 垂直方向，起点为下沿

reverse就是反转的意思



#### 2.flex-wrap：一条轴线排不下，如何换行

- nowrap 默认不换行，硬塞
- wrap 换行，多的往下面排
- wrap-reverse 换行，第一行在下面，多的往上面排



#### 3.justify-content：在主轴上的对齐方式

- flex-start 左对齐
- flex-end 右对齐
- center 居中
- space-between 两端对齐，项目之间的间隔相等
- space-around 每个项目两侧的间隔相等



#### 4.align-items：定义项目在交叉轴上如何对齐

#### <img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210527110758853.png" alt="image-20210527110758853" style="zoom: 33%;" />



#### 5.align-content：多根轴线的对齐方式

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。
- `stretch`（默认值）：轴线占满整个交叉轴。



#### 6.order：定义项目的排列顺序。数值越小，排列越靠前，默认为0

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210527111139223.png" alt="image-20210527111139223" style="zoom:33%;" />



#### 7.align-self：单个项目有与其他项目不一样的对齐方式，覆盖`align-items`属性



#### 8.flex-shrink:0

不对项目进行压缩，可以用于轮播图，让其中一个图片显示，其他图片隐藏
## this指针指向问题

#### 确保this是否有效

举个栗子，先上一个vscode提示的截图

![image-20210812203302343](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210812203302343.png)

左边是我在最顶层定义的一个stack，右边是我想对其进行push

通过上边的提示其实就很能看出问题了

如果这还不够明显的话，那么再来一个对照

![image-20210812203716091](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210812203716091.png)

这个是将`this`去掉之后的提示

这样是不是就发现这两个能对的上，明显是一个东西

而上面那个明显就不是一个东西

加上this的时候会出现一个报错

`Cannot read property 'push' of undefined`

我刚开始是以为有这个报错是因为`stack`中没有`push`这个属性，我找了其他方式去代替`push`结果依然是报错，因为根本原因出现在==undefine的不是push，而是stack==因为stack未定义，所以自然而然的没有push这个属性，所以写`this`的时候要==慎之又慎==


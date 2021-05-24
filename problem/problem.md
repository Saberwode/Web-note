## 这里是问题汇总

#### 1.关于组件化问题：

报错内容:

`did you register the component correctly? For recursive components, make sure to provide the "name" option.`

翻译过来是：

`您是否正确注册了组件？对于递归组件，请确保提供“name”选项`

出现问题的原因：

所渲染的Vue实例不能在组件前面，若在前面创建实例，则无法读取到后面创建的组件。

即`new Vue()`==实例化Vue要放在后面==

此时问题解决，同时网上还会有引起类似报错的操作：

- 如果全局注册,组件名称问题:

  <img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210521132545399.png" alt="image-20210521132545399" style="zoom: 50%;" />

  若是组件名称是大写,Vue会报错. 可以修改为下面两种:

  - 修改组件名称为小写,即mycomponent即可解决.

  - 如使用局部注册,则是components少写了个s:

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210521132652933.png" alt="image-20210521132652933" style="zoom:50%;" />



#### 2.注意`string`类型和`number`类型比较会出问题

```js
for (let item of this.childstats) {
                        // console.log(item.id);
                        if (item.player === "1") {
                            this.newarr.splice(-1, 0, (item.id));

                        }
                        if (item.player === "2") {
                            this.newarr2.splice(-1, 0, parseInt(item.id));

                        }
                    }
```

比如上面的player1就是没有进行类型转换，所以结果就会出错
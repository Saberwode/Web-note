## ES6

#### 1.闭包与立即执行函数：

具体例子可见：https://zhuanlan.zhihu.com/p/22465092

```js
var btns - document.getElementsByTagName('button');
for(var i = 0; i <btns.length; i++){
	(function (num){
		btns[num].addEventListener('click',function(){
		console.log('第'+num +'个按钮被点击');
		})
	})(i)
	//其中(function(){})()被称为立即执行函数
}
```

那么用上箭头函数的话，上述的箭头函数应该可以改为：

((num)=>{...})(i)

那么这个例子就可以改为：

```js
var btns - document.getElementsByTagName('button');
for(var i = 0; i <btns.length; i++){
	((num)=>{
		btns[num].addEventListener('click',function(){
		console.log('第'+num +'个按钮被点击');
		})
	})(i)
	//其中(function(){})()被称为立即执行函数
}
```

因为函数是有自己的作用域的，所以就不会出现因为var声明，导致打印出现问题的情况，而是会准确的输出预想的数字。

其中立即执行函数最后面的`()`内的`i`，会传入到`num`中，此后，num的值会一直保持不变。



#### 2.const常量：

1.一旦给const修饰的标识符被赋值之后，不能修改

2.在使用const定义标识符，必须进行赋值

3.常量的含义是指向的对象不能修改，但是可以改变对象内部的属性。



#### 3.对象字面量增强写法：

`const obj = {}`这种就是通过字面量的方式来创建对象。

1.属性的增强写法：

```js
const name = 'aa';
const age = 18;
const height = 1.88;

const obj = {
	//es5之前写法是:
	//name:name;
	//age:age;
	//height:height;
	name,
	age,
	height
}
```

2.函数的增强写法：

```js
const obj = {
	//es5
	run: function(){
	
	},
	//es6
	eat(){
	
	}
}
```



#### 4.splice()方法：

```js
//从第 2 位开始删除 1 个元素，插入“trumpet”
splice(2, 1, "trumpet");
```



#### 5.every()：

> `every()`方法测试一个数组内的所有元素是否都能通过某个指定函数的测试，它返回一个布尔值。

这个是官方的解读，下面是例子，根据例子进行解读：

```js
//检测数组中所有元素是否都大于10
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

由上述例子可以看出every()方法中传进来的参数是一个函数`function`，其中`function`中传进来三个参数,`element`元素（当前值，于本例中就相当于是`数组[0],数组[1],也就是12,5...`），`index`索引（当前值的索引），`array`数组（调用array当前的数组）

下面是用箭头函数更简化去表达（推荐）：

```js
[12, 5, 8, 130, 44].every(x => x >= 10); // false
[12, 54, 18, 130, 44].every(x => x >= 10); // true
```

同样的，every()方法中的参数只有一个`x`，如果是第一次循环，那么就代表了数组中的索引值为`0`的值，12也就是数组中的第一个数。如果有一个不满足条件的，就会返回false，箭头函数中，如果只有一个函数体中之后一个return语句的时候，return也可以省略。

下面是在Tic Tac Toe游戏中比较连个数组中的例子，对比一下使用与不使用every的区别

```js
checkId(arr1,arr2){
	for(let i = arr2.length - 1; i >=0; i--){
		if(!arr.includes(arr2[i])){
			return false;
		}
	}
	return true;
}
```

```js
checkId(arr1,arr2){
	return arr2.every(v=>arr1.includes(v))
}
```

其中`v`就是arr2数组中存放的一个个对象，通过`includes()`方法，如果arr2中存在一个对象，是arr1所拥有的，那么every()就会返回一个true。



#### 6.forEach()

> forEach()方法对数组的每个元素执行一次给定的函数

==注意：forEach()并不能使用return和break进行中断，想要性能就别用他。。==

~~其中最常使用的就是用`forEach()`方法去替代`for`循环（以后能不用for就不用for (´；ω；`)~~ 

下面是示例

```js
const items = ['item1', 'item2', 'item3'];
const copy = [];

// before
for (let i=0; i<items.length; i++) {
  copy.push(items[i]);
}

// after
items.forEach(function(item){
  copy.push(item);
});
// 可简写
items.forEach(item=>copy.push(item))
```

由此看来清爽很多

下面是Tic Tac Toe游戏的代码

```js
//这个是goBack2(index)函数中的代码片段
for (let x = 0; x < this.history2.length; x++) {
        this.childstats[this.history2[x].locationx - 1][
          this.history2[x].locationy - 1
        ].player = "";
        this.childstats[this.history2[x].locationx - 1][
          this.history2[x].locationy - 1
        ].click_state = true;
      }
```

```js
//根据历史，恢复棋盘
history.forEach((v)=>{
	this.childstats[v.locationx - 1][v.locationy - 1].player = v.player;
	this.childstats[v.locationx - 1][v.locationy - 1].click_state = true;
})
```

```js
//清空棋盘
this.childstats.forEach((child)=>{
	child.forEach((v)=>{
		v.player = "";
		v.click_state = true;
	})
})
```

因为`childstats`是一个二维数组，所以需要两个循环，`清空棋盘`方法中，首先进行一个forEach()，将第一层对象进行循环，接着用第二个forEach()，对第一层对象内部的对象，也就是第二层对象进行循环，==一层循环找不到`player`的话，那就再多循环一次内部就好了==（这个思想十分值得学习！）



#### 7.构造函数，实例，原型三者关系：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210528101742190.png" alt="image-20210528101742190" style="zoom:50%;" />



#### 8.es6 模板字符串：

```js
``可用于字符串拼接
let name = 'bob';
let out = `${name} is a good boy`
//bob is a good boy
```



#### 9.箭头函数中的this：

对于function，谁调用的function，this就指向谁

对于箭头函数，箭头函数写在哪，this就指向谁

所以，箭头函数适合与this无关的回调，定时器，数组的方法回调

不适合与this有关的回调，事件回调，对象的方法



#### 10.rest参数：

```js
//es5获取实参：
let date = ()=>{
	console.log(arguments);
}
date('1','2','3')
//此时返回的是一个对象Object
```

```js
//es6引入rest参数，用于获取函数的实参，用来替代arguments
let date = (...args){
	console.log(args);
}
date('1','2','3')
//此时返回的是一个数组
//也可以这么使用
let date = (a,b,...args){
    console.log(a);
	console.log(args);
}
date('1','2','3','4','5')
// args会接受后面未定义的参数
```



#### 11.扩展运算符：

...	可以将某些数据结构转化为数组：

```js
let arr = [1, 2, 3, 4, 5, 6, 4, 3, 2, 1];
let arr2 = [4, 5, 6, 5, 6];
let result = [...new Set(arr)];
```

此时result就是一个数组

"..."扩展运算符能将'数组'转换为逗号分隔的'参数序列'

```js
const num = ['1','2','3'];

let out = ()=>{
	console.log(argument);
}
out(num)//此时传入的是一个数组，当你打印argument的时候，也是一个数组
out(...num)//此时传入的是一个个用逗号分隔的单独的参数。
//等同于 out('1','2','3');
```

应用：<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210528153807329.png" alt="image-20210528153807329" style="zoom:33%;" />



#### 12.for of迭代器：

工作原理：

- 创建一个指针对象，指向当前数据结构的起始位置
- 第一次调用对象的next方法，之真紫东指向数据结构的第一个成员
- 接下来不断调用next方法，指针一直往后移动，直到最后一个成员
- 每调用next方法返回一个包含value和done属性的对象

所以迭代器是会返回出键值的，而for in 返回的是键名



#### 13.生成器：

实现1s输出，2s输出，3s输出

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210529073846202.png" alt="image-20210529073846202" style="zoom:50%;" />

旧方法：

```js
setTimeout(()=>{
	console.log(111);
	setTimeout((=>{
		console.log(222);
		setTimeout((=>{
			console.log(333);
		}))
	}))
})
```

如果代码多了，会很难解读和维护

```js
function one(){
	setTimeout(()=>{
		console.log(111);
		gen().next();
	},1000)
}
function one(){
	setTimeout(()=>{
		console.log(222);
		gen().next();		
	},2000)
}
function one(){
	setTimeout(()=>{
		console.log(333);
		gen().next();
	},3000)
}
function * gen(){
	yield one();
	yield two();
	yield three();
}
```

另外一个就是传递参数

```js
// 模拟获取 用户数据，订单数据，商品数据
function getUsers(){
	setTimeout(()=>{
		let data = '用户数据';
		iterator.next(data);
	},1000)
}
function getOrders(){
	setTimeout(()=>{
		let data = '用户数据';
		iterator.next(data);
	},1000)
}
function getGoods(){
	setTimeout(()=>{
		let data = '用户数据';
		iterator.next(data);
	},1000)
}
function * gen(){
	yield getUsers();
	yield getOrdes();
	yield getGoods();
}
```





#### 14.promise:

都是为了解决异步编程，回调地狱的问题

promise封装ajax：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        const p = new Promise((resolve, reject) => {
            // 1.创建对象
            const xhr = new XMLHttpRequest();
            // 2.初始化
            xhr.open("get", "https://api.apiopen.top/getJoke");
            // 3.发送
            xhr.send();
            // 4.绑定事件
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.status);
                    }

                }
            }
        })
        //
        // 指定回调
        p.then(function (value) {
            console.log(value);
        }, function (reason) {
            console.error(reason);
        })
    </script>
</body>

</html>
```



#### 15.集合Set：

Set集合是一个数据结构

```js
let s = new Set('a','b','c','a');
console.log(s);
//结果是a,b,c 
//set会去重
```

元素个数：	s.size

新增元素：	s.add('d');

删除元素：	s.delete('b');

检测元素：	s.has('a');

清空元素：	s.clear();

集合set的应用：

- ##### 数组去重

```js
//公用数组
let arr = [1,2,3,4,5,,4,3,2,1];
let arr2 = [4,5,6,5,6];
```

```js
let result = [...new Set(arr)];
// ...扩展运算符将set 集合转化为数组
```

- ##### 求交集

```js
let result = [...new Set(arr)].filter(item => new Set(arr2).has(item));
```

...new Set(arr)的目的是为了将arr去重，这样会减少筛选次数

- ##### 并集

```js
let union = [...new Set([...arr, ...arr2])];
```

[...arr,...arr2]就是通过扩展运算符，将数组合并，接着将合并后的数组去重

- ##### 差集

```js
let result = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)));
```

交集剩下的就是差集，所以直接在过滤的时候取反就可以，将相同的挑出来去掉



#### 16.class类

```js
function Phone(){

}
Phone.name = '手机';
Phone.change = function(){
	console.log("111");
}
let nokia = new Phone();
//会报错，因为实例对象和函数对象里面的属性是不相通的
console.log(nokia.name);
nokia.change();
//可以在构造函数的原型对象中加入属性
Phone.prototype.size = '1';
//此时就可以用了
console.log(nokia.size);
```

```js
class Phone{
    //静态属性
	static name = '手机';
	static change(){
	
	}
}
```

类的继承

```js
class Phone{
	constructor(brand, price){
		this.brand = brand;
		this.price = price;
	}
	call(){
		console.log("父类方法");
	}
}
class SmartPhone extends Phone {
	constructor(brand,price,color,size){
		super(brand,price);
		this.color = color;
		this.size = size;
	}
}
```

设置私有属性：正常属性前面加一个'#'



#### 17.es6模块化

- 暴露数据

```js
//分别暴露
export let school = '北大'
export function teach(){
	console.log("eee");
}
```

```js
//统一暴露
let school = '北大'
function teach(){
	console.log("eee");
}
export {school,teach};
```

```js
//默认暴露
export default{
	let school = '北大',
	function teach(){
		console.log("eee");
	}
}
```

默认暴露在Vue CLI中见过

- 引入模块

> 引入的时候记得<script src='...' type='module'>

```js
//通用引入
import * as m1 from "./js/m1.js"
```

```js
//解构赋值形式
import {school, teach} from "./js/m1.js"
//如果是默认暴露的话
import {default as m2} from "./js/m2.js"
```

```js
//简便形式 针对默认暴露
import m3 from "./js/m3.js"
```

终于知道Vue CLI 里面的引入模块跟暴露模块是什么东西了，原来是es6的语法	(´；ω；`)



#### 18.includes()

检测数组中是否包含某个元素



#### 19.trimStart(),trimEnd()

用于清除字符串左边和右边的空白

在es5中，trim()方法用于清除两边的空格



#### 20.flat()数组操作

==将多维数组转化为低维数组==

其中`flat()`可以传递参数，参数值就表示转化的深度，如果是三维数组转化为一维数组，那么就可以写`flat(2)`对数组进行操作。



#### 21.可选链操作符`?.`

==这个感觉还挺实用的==

这个操作符可以判断是否传入了这个属性，如果传入了再继续执行，并不会产生报错

比如：

```js
function main(config){
	const dbHost = config && config.db && config.db.host;
	console.log(dbHost);
}
main({
	db:{
		host:'192.168.0.0.1',
		username:'root'
	},
	cache:{
		host:'192.168.0.0.2',
		username:'admin'
	}
})
```

这个是最原始的方法，使用`&&`符号去判断，看数据是否齐全，如果使用可选链操作符的话

```js
function main(config){
	//const dbHost = config && config.db && config.db.host;
	const dbHost = config?.db?.host;
	console.log(dbHost);
}
main({
	db:{
		host:'192.168.0.0.1',
		username:'root'
	},
	cache:{
		host:'192.168.0.0.2',
		username:'admin'
	}
})
```

此时，使用`?.`的话，就可以判断前一个参数是否存在，如果存在，那么就接着往后下一个，如果不存在，那么就返回一个`undefine`



#### 22.动态import

静态import是不管你用不用，一股脑给你加载过来，这样可能会影响效率，所以出来了动态import

```js
const btn = document.getElementById('btn');
btn.onclick = function(){
	import('hello.js').then(module => {
		module.hello();
	})
}
```

此时，触发button的点击事件才会导入hello.js，去调用hello()方法
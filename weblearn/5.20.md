## 5.20

#### 1.变更方法（触发响应式的方法）：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

使用这些方法对数组进行操作，会使页面更新。

变更方法会==改变原始数组==



#### 2.替换数组：

替换数组会返回一个新的数组，如（`filter()`、`concat()` 和 `slice()`）



#### 3.由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化：

==待补充==

补充：

> 在vue中，有时候你修改了数组的某一项值或索引时，视图并未如你想的那样发生变化，虽然你修改了数组但是视图上显示的还是未修改时的值。

```js
//由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
//（1）当你利用索引直接设置一个项时，例如：
vm.items[indexOfItem] = newValue
//（2）当你修改数组的长度时，例如：
vm.items.length = newLength
```

官方的解决方案：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

> 基本解决办法是： this.$set(obj, 'a', 'xxx')
>
> 如果是在watch中，观察变量值val的话，就是 val: {handler: ()=>{xxx}, deep: true }
>
> 通过设置deep:true的方式

#### 4.v-for可以接受整数：

比如：

```html
<span v-for="n in 10">{{n}}</span>
//正常输出结果应该是1,2...10
```



#### 5.filter()函数：

```js
const nums = [10,20,111,222,333,444];
//let newNums = nums.filter(function (n){
let newNums = nums.filter((n)=>{
return n <100
})
```

上述例子就是过滤掉小于100的数字，filter过滤返回的是一个新的数组，不会对旧的数组有所改动。

其中具体的过滤方法就是将nums中的数据传入filter中，将其赋值给n，如果n 不满足返回条件，返回一个false，那么n就不会被加入到新的数组里，反之，就可以加到新的数组里面。



#### 6.map()函数：

```js
//let new2Nums = newNums.map(function(n){
let new2Nums = newNums.map((n)=>{
return n*2;
})
```

上述例子中，map的作用是遍历，将newnums中的值，一个个的传入赋值给n，然后进行×2的操作。



#### 7.reduce()函数：

```js
//ler new3Nums = newNums.reduce(function(preValue,n){
ler new3Nums = newNums.reduce((preValue,n)=>{
	return preValue + n;
},0)
```

上述例子中，`reduce(参数1，参数2)其中参数1是一个function(前一个return值，传入数组的值)`，其中参数2是预设的初值，因为第一次prevalue是没有前一次的返回值的，所以就需要对其设置一个初值，之后每次的return值，都会赋值给prevalue，也就是本例中的(prevalue = prevalue + n;)



#### 8.v-model指令实例：

v-model绑定的是value值。

> 单选框

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="app">
        <label for="male">
            <input type="radio" id="male" value="男" v-model="sex">男
        </label>
        <label for="female">
            <input type="radio" id="female" value="女" v-model="sex">女
        </label>
        <h2>您选择的性别是：{{sex}}</h2>
    </div>
    <script src="vue.js">
    </script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                message:'你好',
                sex:''
            }
        })
    </script>
</body>
</html>
```

上述例子实现双向绑定sex

> 复选框

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="app">
<!--        <label for="male">-->
<!--            <input type="radio" id="male" value="男" v-model="sex">男-->
<!--        </label>-->
<!--        <label for="female">-->
<!--            <input type="radio" id="female" value="女" v-model="sex">女-->
<!--        </label>-->
<!--        <h2>您选择的性别是：{{sex}}</h2>-->
        <input type="checkbox" value="篮球" v-model="hobbies">篮球
        <input type="checkbox" value="足球" v-model="hobbies">足球
        <input type="checkbox" value="乒乓球" v-model="hobbies">乒乓球
        <input type="checkbox" value="羽毛球" v-model="hobbies">羽毛球
        <h2>您的爱好是：{{hobbies}}</h2>
    </div>
    <script src="vue.js">
    </script>
    <script>
        const app = new Vue({
            el:'#app',
            data:{
                message:'你好',
                sex:'',
                hobbies:[],
            }
        })
    </script>
</body>
</html>
```

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210520152021154.png" alt="image-20210520152021154" style="zoom: 33%;" />

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210520152137193.png" alt="image-20210520152137193" style="zoom:50%;" />
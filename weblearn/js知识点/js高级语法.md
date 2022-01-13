## js高级语法

#### 1.v8引擎

js代码的解析过程：

首先是将js文件下载下来，接着就是通过js引擎对js进行解析

1. 将js代码进行词法分析，分析成一个类似数组的tokens，里面存放了各种的对象类似json对象，其中会有例如{type:"keyword",value'name'}之类的，将关键字与变量名和变量值分割
2. 接着就是语法分析，这个过程会生成一个AST抽象语法分析树
3. 语法分析树通过Ignitition（这是一个库），将语法分析树转化为字节码
4. 然后将字节码转化为cpu可以识别的机器码，在这个过程中会对部分高频率运行的一些函数进行优化，比如重复的操作会直接转化为机器码，而不会去重新转换，但是如果突然参数类型发生改变，则会发生反向转换，再将操作转化为字节码，然后再次汇编成机器语言。

#### 2.js代码运行前的解析

在解析过程中，会生成一个全局对象globalObject，这个对象中会有各种对象，比如math对象，date对象，number对象，setTimeout，还有window，其中window是指向globalobj的，指向自己，相当于this。

在解析过程中，var与函数声明会进行作用域提升，提前进行声明，成为GlobalObject的一个属性，但是还是没有赋值，所以都是undefine

#### 3.执行代码

在执行代码的时候，为了使全局代码能够正常运行，所以创建了一个全局上下文(Golbal Execution Context )，接着会将全局对象放入，接着，代码就会顺序执行，将之前定义但是还没有赋值的变量进行赋值

 ![image-20210919140151592](../../img/image-20210919140151592.png)

在遇到函数的时候，会创建一个函数执行上下文，同时创建一个ao对象，将变量的声明会放到ao中，在函数执行结束后，ao会被销毁，然后将函数执行上下文弹出

#### 4.js内存管理

当你对一个变量进行声明的时候，js就会自动为你分配一个内存

#### 5.高阶函数

把一个函数如果接受另外一个函数作为参数，或者该函数会返回另一个函数作为返回值的函数，那么这个函数就称为是一个高阶函数

#### 6.数组方法(高阶函数)

find()查找并返回item

findIndex()查找返回下标index

filter()

map()

forEach()

reduce()查找

#### 7.闭包

闭包是由两部分组成的：函数+可以访问到的外部自由变量

#### 8.this绑定规则

this的绑定与调用者有关，与this函数所处的位置无关

- 默认绑定：当一个函数作为独立函数使用的时候，他的this指向window

  ```js
  let function foo() {
  	console.log(this)
  }
  foo()
  ```

  此时foo()没有调用者，他是作为一个独立函数调用。此时this就指向window

- 隐式绑定：当一个函数有调用者，那么js就会自动将this指向调用者，这个是属于js自动帮忙完成的，所以是隐式绑定。

  ```js
  let obj1 = {
  	name: 'obj1',
  	foo: function() {
  		console.log(this)
  	}
  }
  let obj2 = {
  	name: 'obj2',
  	bar: obj1.foo
  }
  obj2.bar()
  ```

  此时是obj2调用的bar()函数，虽然bar函数是obj1调用的foo函数，但是最终结果的调用是obj2调用的，this再次绑定到了obj2上面。所以此时this指向的还是obj2。

- 显示绑定：apply-call这两种方式都是显示绑定this的，这两个的不同点就是`call`传递的参数是单个参数，以逗号分隔，而`apply`传递参数是以`[]`数组的形式进行传递。call传参使用是属于剩余参数的语法

  - 另外一个显式绑定的函数就是bind,比如说我想多次调用一个绑定其他this的函数，如果每次都要通过`.call`进行绑定会很麻烦，所以可以使用bind

    ```js
    foo.call('aaa')
    foo.call('aaa') // 需要多次绑定
    let newFoo = foo.bind('aaa')
    newFoo()
    ```

    通过`bind`显式的绑定this，此时bind会返回一个新的函数，以后通过这个新的函数，该函数的this值默认就是`'aaa'`，虽然这个新的函数是作为独立函数进行调用的，但是因为之前已经通过bind进行显式绑定了，所以这个函数的this值会将隐式绑定的window进行覆盖

#### 9.作用域问题

对象没有作用域

#### 10.手写call方法

在实现这个函数之前，有几个前置问题需要解决

- 如果要实现通用性，那么必须要每个函数中都要有手写的call方法，暂时命名为`lxCall`，所以这个函数我需要写到`Function`这个构造器的`prototype`中，在他的原型中定义这个函数

- 另一个问题就是我需要获取到这个调用者，是谁调用的`lxCall`，因为`call`方法除了可以绑定`this`，他也会帮助去执行函数，所以我需要获取到调用者本身

  ```js
  Function.prototype.lxCall = function() {
    const fn = this
    fn()
  }
  
  function foo() {
    console.log('foo函数被执行');
  }
  
  function sum(num1, num2) {
    return num1+ num2
  }
  foo.lxCall()
  ```

  通过this的隐式绑定，我在`.lxCall`方法中的`this`是指向调用者的，所以就可以通过上述代码实现绑定和调用
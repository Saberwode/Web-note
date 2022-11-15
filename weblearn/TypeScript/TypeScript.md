## TypeScript学习

#### 1.never类型

never类型主要应用于以下场景

比方说有一个函数

```ts
function handleMessage(message: string | number){
  switch (typeof message){
    case 'string':
      console.log('string处理message');
      break;
    case 'number':
      console.log('number处理message');
      break;
    //default:
    //  const check: never = message
  }
}
```

此时函数支持的参数有`string`和`number`类型的，如果有一个人想去传一个`boolean`类型的参数，首先肯定是会报错的，但是如果修改了`hadleMessage`函数的话，比如在参数中添加`| boolean`，这样就不会报错了，但是这样也会导致一个问题，没有对boolean做相应的处理，只是不会报错。

此时就可以用到`never`类型，添加一个default，虽然有默认值，但是如果严格按照传入参数为`string和number`类型的话，他是永远不可能去执行这行代码的，因此，如果有人像例子一样，修改了主函数，函数就会从default执行，然后就会发生编译报错

#### 

#### 2.类型别名

因为在定义参数的时候需要对参数指定类型，这就导致了会出现代码过长，并且可能再次使用会很麻烦，此时就可以用类型别名进行解决

```ts
type IDType = string | number;
type PointType = {
	x:number,
	y:number,
	z?:number
}
```

可以使用关键字`type`对别名进行定义

#### 3.类型断言 as

类型断言相当于对类型进行一个细化，比如：

```html
<img id="why"/>
```

```js
const el = document.getElementById("why")
```

此时获取到的`el`是一个`Element`元素，而实际上，`el`细分的话是一个`img`元素，此时就可以通过`as`将其断言为更细分的`img`元素

```ts
const el = document.getElementById("why") as HTMLImageElement
```

​	此时`el`就是一个`img`元素，然后就可以使用`img`元素中的方法，比如`el.src="url地址"`

还有一种使用场景就是在父类与子类中

```ts
class Person{

}
class Student extends Person {
  studying() {

  }
}
function sayHello(p:Person){
  //p.studying()是会报错的
  (p as Student).studying()
}
```

本来`p`在参数中设定的事`Person`类，所以默认p是没有`studying`这个方法的，但是如果通过`as`对p进行断言，就可以把p设定为`Student`类，从而可以使用`studying`方法

#### 4.非空类型断言

形如`console.log(message!.length)`加上一个`!`就可以实现非空，这个就表示`message`一定不为空

#### 5.字面量类型

这个类型主要是结合联合类型进行使用的，直接上例子

```ts
type Alignment = 'left' | 'right' | 'center';
let align:Alignment = 'right';
align = 'center';
// align = 'hehehe' 会报错
```

这里面字面量类型的作用就是限制align 的取值，只能通过提前选定的字面量类型进行赋值，如果使用其他的值就会报错

#### 6.any类型和unknown类型this类型

这两个的区别在于赋值的对象，any类型可以赋值给任意类型的对象，而unknown只能赋值给any和unknown类型的对象，为了避免将一个不确定类型任意赋值，所以更加推荐使用unknown类型

可以指定this的类型，在函数调用的时候，就可以避免this缺少该属性导致报错。（我感觉这个类似于object）

#### 7.元组类型的应用场景

可能会有一个函数，函数中会`return`一个数组，这个数组中的类型是不固定的，比如有any,string,number,function等等，如果不适用元组类型的话，返回的数组内容默认是arr数组类型，接着在调用的时候，拿到的数组中的数据类型就会全部变成`any`类型，当对一个不清楚类型的对象进行使用的时候，这个对象如果调用了他本身不存在的方法，那么就会存在报错风险。

下面是例子

```ts
function useState(state: any) {
  let currentState = state;
  const changeState = (newState: any) => {
    currentState = newState;
  };

  const arr: [any, (newState: any) => void] = [currentState, changeState];

  return arr;
}

const [counter, setCounter] = useState(10);
const [] = useState("abc");
```

这个`useState`函数返回了一个数组，这个数组中包含两个元素，一个是currentState,这个变量类型可能是number类型,也可能是string类型，所以暂时给他一个any。

#### 8.??运算符和!!运算符

`!!`作用是将其他类型转化为Boolean类型

`??`是一个逻辑操作符，当操作符左侧是null或者是undefined时，返回其右侧操作数，否则返回左侧操作数

#### 9.类型缩小

```ts
// 1.typeof的类型缩小
type IDType = number | string
function printID(id: IDType) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}

// 2.平等的类型缩小(=== == !== !=/switch)
type Direction = "left" | "right" | "top" | "bottom"
function printDirection(direction: Direction) {
  // 1.if判断
  // if (direction === 'left') {
  //   console.log(direction)
  // } else if ()

  // 2.switch判断
  // switch (direction) {
  //   case 'left':
  //     console.log(direction)
  //     break;
  //   case ...
  // }
}

// 3.instanceof
function printTime(time: string | Date) {
  if (time instanceof Date) {
    console.log(time.toUTCString())
  } else {
    console.log(time)
  }
}

class Student {
  studying() {}
}

class Teacher {
  teaching() {}
}

function work(p: Student | Teacher) {
  if (p instanceof Student) {
    p.studying()
  } else {
    p.teaching()
  }
}

const stu = new Student()
work(stu)

// 4. in
type Fish = {
  swimming: () => void
}

type Dog = {
  running: () => void
}

function walk(animal: Fish | Dog) {
  if ('swimming' in animal) {
    animal.swimming()
  } else {
    animal.running()
  }
}

const fish: Fish = {
  swimming() {
    console.log("swimming")
  }
}

walk(fish)
```

#### 10.函数的重载

```ts
function add(num1: number, num2: number): number;
function add(num1: string, num2: string): string;

function add(num1: any, num2: any): any {
  return num1 + num2;
}
const result = add(20, 30);
const result1 = add("bac", "abc");

export {}
```

上两个add函数是定义函数，第三个函数是实现函数，实现函数是不能被调用的

#### 11.静态属性

类的静态属性，静态方法可以在外部由类进行自由调用，不需要新new出来一个对象

比如：

```ts
class Student {
  static time:string = '20'
}
console.log(Student.time)
```

#### 12.接口的使用

- 索引类型

```ts
interface IndexLanguage {
  [index: number]: string
}

const frontLanguage: IndexLanguage = {
  0: 'html',
  1: 'css',
  2: 'javascript',
  3: 'vue'
}
```

——索引类型还是比较实用的，比如当与后端交互的时候，会去定义一个`state`状态，去表示一些数据等等，==如果直接定义对象的话，索引'0'是固定的字符串类型，除非去定义常量，否则无法做到是number类型的==

- 函数类型

```ts
interface CalcFn {
  (n1: number, n2: number): number
}
function calc(num1: number, num2: number, calcFn: CalcFn) {
  return calcFn(num1, num2)
}
const add: CalcFn = (num1, num2) => {
  return num1 + num2
}
calc(20, 30, add)
```

更加推荐使用 type定义函数，不过函数一般可以通过自动推导的方式。

- 接口继承

```ts
interface ISwim {
  swimming: () => void
}
interface IFly {
  flying: () => void
}
interface IAction extends ISwim, IFly {
}

const action: IAction = {
  swimming() {
  },
  flying() {
  }
}
```

- 交叉类型

```ts
// 一种组合类型的方式: 联合类型
type WhyType = number | string
type Direction = "left" | "right" | "center"
// 另一种组件类型的方式: 交叉类型
type WType = number & string
interface ISwim {
  swimming: () => void
}
interface IFly {
  flying: () => void
}
type MyType1 = ISwim | IFly
type MyType2 = ISwim & IFly
const obj1: MyType1 = {
  flying() {
  },
  swimming() {
  }
}
const obj2: MyType2 = {
  swimming() {
  },
  flying() {    
  }
}
```

交叉类型和接口继承最大的区别就是交叉类型如果合并之后是一个不存在的东西，会返回一个never类型，但是如果是接口继承的话，就会直接报错，引自 [TS 体操 &(交叉运算) 和 接口的继承的区别](https://blog.csdn.net/Jioho_chen/article/details/125588646)

#### 13.接口的实现

接口的实现简单来说就是在类或者对象中引入接口，然后对接口中定义的属性或者方法

进行实现，接口中有什么，类中就必须对其进行定义

```ts
interface ISwim {
  swimming: () => void
}
interface IEat {
  eating: () => void
}
// 类实现接口
class Animal {
}
// 继承: 只能实现单继承
// 实现: 实现接口, 类可以实现多个接口
class Fish extends Animal implements ISwim, IEat {
  swimming() {
    console.log("Fish Swmming")
  }
  eating() {
    console.log("Fish Eating")
  }
}
class Person implements ISwim {
  swimming() {
    console.log("Person Swimming")
  }
}
// 编写一些公共的API: 面向接口编程
function swimAction(swimable: ISwim) {
  swimable.swimming()
}
// 1.所有实现了接口的类对应的对象, 都是可以传入
swimAction(new Fish())
swimAction(new Person())
swimAction({swimming: function() {}})
```

#### 14.interface和type的区别

最主要的区别是，interface的定义可以重复，type不可以重复，多次定义interface的时候，会将interface中定义的属性和方法合并起来

```ts
interface IFoo {
  name: string;
}
interface IFoo {
  age: number;
}
const foo: IFoo = {
  age: 18,
  name: "tset",
};
```

```ts
type IFoo =  {
  name: string,
  age: number
}
```

![image-20220106103400289](C:\Users\Administration\AppData\Roaming\Typora\typora-user-images\image-20220106103400289.png)

#### 15.枚举类型

```ts
enum Direction {
  LEFT = 10,
  RIGHT = 9,
  TOP,
  BOTTOM,
}
function turnDirection(direction: Direction) {
  console.log(Direction.LEFT);
  console.log(Direction.RIGHT);
  console.log(Direction.TOP);
}
turnDirection(Direction.LEFT);
function foo<T, E>(a: T,b:E){
  console.log('');
}
foo(10,10)
```

#### 16.TypeScript声明文件

当引入外部的包的时候，有时候会出现typeScript不识别的情况，原因就是这个包里面缺少`.d.ts`声明文件，解决办法就是从ts的社区中查找

`https://www.typescriptlang.org/dt/search?search=`

通过社区查询是否有现成的声明文件，如果没有的话，就要自己写了



另外一种情况是，如果在`index.html`的script标签中，写入`const name = 'test'`，在main.ts的文件中，如果是按照道理来说的话，是可以运行的，因为main.ts的东西在运行的时候是会插入到script标签的下面的，但是ts并不会知道script标签的内容，所以，可以通过声明文件对其进行声明。声明文件的作用就是帮助ts知道自己有定义这么个东西，并不关心具体实现

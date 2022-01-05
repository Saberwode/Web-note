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

#### 6.any类型和unknown类型

这两个的区别在于赋值的对象，any类型可以赋值给任意类型的对象，而unknown只能赋值给any和unknown类型的对象，为了避免将一个不确定类型任意赋值，所以更加推荐使用unknown类型

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

## 5.16学习

#### 1.第一个例子：

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

前者设置了一个div块，有一个id属性为"app"，后面vue应用将div与其绑定，通过其中的"el:" element

通过id，与这个div绑定。

然后数据区定了一个名为"message"的字符串，内容为"hello vue"

前者div将 "message"作为显示内容。



#### 2.新的绑定形式：

```html
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```

在<>中加入了 v-bind，将span的title属性与之绑定，结果就是 title所显示的value值就是message的内容。

（个人认为：v不就是Vue嘛，bind：捆绑 加起来就是绑定vue）

> 大部分的时候会将v-bind隐藏，直接使用 :title="message"



#### 3.条件循环：

一样的道理，条件就是`v-if`

```html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```

```js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

这里`v-if`的值为`true`，所以这个p标签是生效的，如果`seen`的值改为`flase`那么p标签就会消失。

> v-if 与 v-show的区别：
>
> v-if :true/false 渲染/不渲染（元素是不会存在的）
>
> v-show：true/false 显示/隐藏（元素是依然存在的）

循环：

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
```

这里面的 `v-for="tode in todes"`是一个简单的迭代，~~与`for(let todo in todos){}`应该是等价的~~（错了）

将todo的值遍历出来。

> v-for="todo in todos"可能更对应for(let todo of todos){}

==注意==

误区：

for in遍历的是数组的索引（键名）

而for of 遍历的是数组的元素值。这两个差别可大了，一个是前面的名字，一个是后面的值

可以这么理解，==for in遍历出的索引，索引.value()就是for of遍历出的数值。==

for of 遍历的只是数组内的元素，不包括数组的原型属性method和索引name。

一个for of 循环每次迭代后都会返回一个形式为[key, value]的数组。



可以通过`app4.todos.push({})`去添加一个新的列表内容。

==注意==

> 列表渲染要注意添加 :key="xxx"确保key不重复

==待日后补充==此处留一个疑问



#### 4.事件：

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">反转消息</button>
</div>
```

```js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

同样的，通过很相似的==v-on:click==，绑定按钮点击事件。

在下面的vue中，多出了一个==methods（方法）==里面存放的是该元素所用到的方法。



#### 5.双向绑定==v-model==

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

![image-20210516234224277](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210516234224277.png)

其中神奇的效果就是，你改变==input==中的值，上面的==p==标签中的值也会改变，这就是双向绑定的视觉体现。



#### 5.vue也有一些内置的方法：

内置方法用 $与自定义的做区分。

`$watch('a',function(newValue, oldValue){})`这个方法可以返回属性a的更改后的新值，与之前未更改的旧值。



#### 6.v-once指令：

只渲染元素和组件一次, 这可以用优化更新性vue里就出现了一种=>代替不了function的情况： 在声明data和生命周期函数中如：mounted，created等的情况下，依然要用function或函数名+()的方式来声明函数能. 执行一次性地插值，当数据改变时，插值处的内容不会更新。



#### 7.v-html：

`v-html="url"`这个指令的意思就是，要你用`html`的形式去显示`url`这个字符串，比如：

```html
<h2 v-html="url"></h2>
//前面省略
data:{
	url:'<a href="http://www.bilibili.com">这里是哔哩哔哩</a>'
}
```



#### 8.v-text:

它跟mustache语法很相似{{message}}，但是它没有mustache灵活，所以一般是不用的。



#### 9.Mustache语法：

> Mustache是一个logic-less（轻逻辑）模板解析引擎，它是为了使用户界面与业务数据（内容）分离而产生的，它可以生成特定格式的文档，通常是标准的HTML文档。

语法模板：

- {{keyName}}
- {{{keyName}}}
- {{#keyName}} {{/keyName}}
- {{^keyName}} {{/keyName}}
- {{.}}
- {{!comments}}

- {{>partials}}



1. {{keyName}}简单的变量替换。
2. {{#keyName}} {{/keyName}}以#开始、以/结束表示区块，它会根据当前上下文中的键值来对区块进行一次或多次渲染。它的功能很强大，有类似if、foreach的功能。
3. {{^keyName}} {{/keyName}}该语法与{{#keyName}} {{/keyName}}类似，不同在于它是当keyName值为null, undefined, false时才渲染输出该区块内容。
4. {{.}} {{.}}表示枚举，可以循环输出整个数组
5. {{! }}表示注释
6. {{>partials}}以>开始表示子模块，当结构比较复杂时，我们可以使用该语法将复杂的结构拆分成几个小的子模块。

==待补充，后面见到细说==



#### 10.v-pre:

```html
<h2 v-pre>{{message}}</h2>
```

作用就是，你就是想显示`{{message}}`，不想显示message的值，那么就可以使用v-pre。



#### 11.v-bind，v-on：

语法糖（简写）：

`v-bind` 直接一个`:`就可以了，用于绑定属性。

`v-on`就是一个`@`，用于绑定事件。



#### 12.动态参数:

可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
<a v-bind:[attributeName]="url"> ... </a>
```

> 这里的 `attributeName` 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 `data` property `attributeName`，其值为 `"href"`，那么这个绑定将等价于 `v-bind:href`。

简而言之，attributeName就是一个属性名，只不过他可以改变，并不是写死的。这样就灵活了很多。

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

同样，事件也可以进行绑定，其中`eventName`可以是`click,focus`等许多事件名，当 `eventName` 的值为 `"focus"` 时，`v-on:[eventName]` 将等价于 `v-on:focus`。



#### 13.模板内的表达式：

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

类似这种的模板中，嵌套了各种复杂的逻辑运算是不合适的。

可用下面例子作为替换：

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

js片段中，`this`需要着重注意，在vue中，`this`会频繁出现。

其中vm.reversedMessage的值，始终取决于vm.message的值

==computed==是一个计算属性==methonds==是一个方法，这两者有所区分：

```js
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

同样可以将上述内容定义在methonds中，两者的返回结果是完全相同的。

不同的是，**计算属性是基于他们的响应式依赖进行缓存的**，可以着重“缓存”这儿概念。

只有在message改变时，`reversedMessage`才会重新计算执行结果，执行函数，如果`message`并没有发生改变，

多次访问`reversedMessage`会返回之前计算好的结果，可以理解为直接拿“缓存”好了的数据，不需要重新计算。

相较于方法的优势还是很明显的，效率会提高很多，特别是在逻辑复杂的时候。

另外下面一个例子：

```html
<div id="demo">{{ fullName }}</div>
```

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

此时，如果尝试把==computed==换成==methods==，

那么div里面你需要把`funName`替换成`fullName()`让他去调用这个方法。这样，输出结果都是相同的。

computed的set,get方法：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210519141755795.png" alt="image-20210519141755795" style="zoom:50%;" />

#### 14.class绑定style:

##### 类型：

1.数组语法

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

2.对象语法：

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

3.三元表达式：

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

##### 绑定内联样式：

1.对象语法：

v-bind:style 有自己的格式，不要弄混。

> `v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。==CSS property 名==可以用==驼峰式== (camelCase) 或==短横线分隔== (kebab-case，记得用引号括起来) 来命名：

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```

下面的方式更为清晰推荐：（看着也舒服）

```html
<div v-bind:style="styleObject"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

![image-20210519132933910](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210519132933910.png)

#### 15.条件渲染：

1.在`<template>`元素上使用`v-if`：

`v-if`是一个指令，所以它需要添加到一个元素中，但是如果不想再新增一个额外的标签了（因为没必要），

这时候，可以使用`<template>`，`<template>` 元素可当做不可见的包裹元素，渲染元素时会无视他。

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

2.`v-else`：

跟`if(){}else{}`类似，只要`if()`内的条件不符合，就转到下面else执行。

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

3.`v-else-if`:

同上。。

4.`v-show`:

> 不同的是带有 `v-show` 的元素始终会被渲染并==保留在 DOM 中==。`v-show` 只是简单地==切换元素的 CSS property `display`==。

一般来说，`v-if` 有更高的==切换开销==，而 `v-show` 有更高的==初始渲染开销==。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。



#### 16.用`key`管理可复用的元素：

> Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

Vue 提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。

添加具有唯一值的`key`。

> `key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

==换句人话来说：==vue底层在渲染到浏览器之间会有一个虚拟dom的环节，他会先把东西先渲染到虚拟dom里面，为了尽可能的减少改动，所以他会尽可能的对虚拟dom已经存在的节点进行复用，如果有类似的节点，他会选择去复用类似的节点，然后替换不同的部分，留下相同的部分，所以这个节点并不算是新的节点，不是从头渲染的（**比如input用户输入的值，如果切换的话，可能会存在input里面的内容仍然存在的情况**）这就是典型的复用的例子。

如果不向让vue对其进行复用，那么就为这个元素定义一个`key`属性，他在渲染的时候会对比两者之间的`key`值，如果不一样，那么他就不会对其进行复用，这样vue就会对其进行从头的渲染。

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

这样`input`就不会被复用，每次都会对其重新渲染。

> 注意，`<label>` 元素仍然会被高效地复用，因为它们没有添加 `key` attribute。



#### 17.v-for:

还支持可选的第二个参数：index（当前项的索引）

```html
<li v-for="(item, index) in items"></li>
```

也可以遍历对象，此时提供的第二个参数就是键值，同时可以提供第三个参数，作为索引值。

```html
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```

> 当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将==不会移动 DOM 元素==来匹配数据项的顺序，而是==就地更新每个元素==，并且确保它们在每个索引位置正确渲染。

所以就有必要给vue一个提示，跟踪每个节点，给每一项提供一个`key`






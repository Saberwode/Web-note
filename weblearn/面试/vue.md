## vue面试

#### 1.computed计算属性

计算属性会对结果进行一个缓存，不同于methonds，如果data不发生变化的话，是不会重新计算结果的，而methonds则是每次运行就会计算一次，并没有缓存

#### 2.v-model绑定计算属性

需要写入get()set()两个方法

#### 3.watch监听（深度浅度）

watch默认是浅监听的，对于值类型可以拿到正常的旧值，但是如果是引用类型的话，浅监听是拿不到的，必须对其进行设置`deep:true;`

![image-20210821161845699](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210821161845699.png)

#### 4.动态绑定class（style要用驼峰标识

![image-20210821163410329](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210821163410329.png)

动态添加样式就是`:style`

![image-20210821163534926](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210821163534926.png)

#### 5.v-if,v-show选择

如果需要在两者之间来回切换的话，那么就可以用v-show

因为v-show是将结点给渲染出来了，只是挑一个去显示，其他的都会给设置样式为`display:none`，而v-if，如果条件不满足就会被销毁，条件满足的就会重新渲染，所以，如果是多次切换的话，用v-show效率会更高

#### 6.event

event获取的是原生的event对象，不加任何装饰，而且事件是挂载到当前元素上的

`envent.target`就表示事件的目标是谁，就比如输入框中输入字符串，event.target就是输入框，此时event的目标就是输入框，然后`event.target.value`就是输入框中的内容

#### 7.事件修饰符

vue可以在标签事件中直接跟上事件修饰符，就不需要在函数中定义了

![image-20210823083106074](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210823083106074.png)

按键修饰符

![image-20210823083235647](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210823083235647.png)

#### 8.v-model常用于表单

v-model常用于表单绑定，当data数据中发生变化时，表单也随之发生变化

#### 9.自定义事件$emit $on

其中$emit可以用于父子组件通讯

子组件通常通过插槽写在父组件中，然后父组件可以在子组件插槽上写入自定义得事件名，然后子组件通过$emit向该事件传递数据或者其他信息，然后父组件就会调用该事件绑定的函数进行处理。

$emit也可以跟兄弟组件进行通讯，通过$on的方式

通过在一个组件中用$on去绑定一个事件形如`event.$on('add',this.addlist)`

之后通过在其他组件中用$emit去触发，发射一个事件形如`event.$emit('add',this.data)`实现两个组件中的数据交互

> 另外自定义组件需要及时销毁，否则会导致内存泄漏

`event.$off('add',this.addlist)`

#### 10.在自定义组件中使用v-model

在实际开发过程中，很可能会将表单写到子组件中，然后你需要对其进行动态绑定，所以就用到了在父组件中为自定义组件绑定v-model

要想使用这个v-model，需要在子组件中设置一个

```
model:{
	prop:'text',
	event:'change'
},
props:{
	text:String
}
```

其中父组件中v-model的值==默认==会传入到子组件中`model`的名为`prop`属性中，也就是`text`，同时在props中对应了一个`text`表示这个是父组件传过来的，会将这个值与父组件进行绑定

同时也需要自己在model中设置一个`event`事件，就随便写个名字，没啥大用，但是少了不行，这玩意相当于父子组件传参，没这玩意父组件接不到数据（因为看到了$emit）

父组件：![image-20210823100012258](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210823100012258.png)

子组件：

![image-20210823100025960](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210823100025960.png)

#### 11.使用ref来获取DOM元素

通过在标签中定义`<ul ref= 'ul1'>`

后续在methonds或者其他函数里面可以调用`this.$refs.ul1`来获取到DOM元素

#### 12.获取最新DOM元素

背景：vue是异步渲染DOM元素的

`$nextTick()`函数会等待DOM渲染完成后进行一次回调，此时在`$nextTick()`中传入回调函数，就可以查询到最新的DOM元素

#### 13.slot插槽

基本使用是在子组件模板中写入`<slot>`标签

我感觉比较常用的应该是具名插槽，可以对插槽进行命名

比如

```vue
 <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
```

```vue
<slot name="header"></slot>
```

 

作用域插槽

![image-20210823131353001](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210823131353001.png)

不太常用直接放图了，看官方描述的应该是不能和name混用（？）

#### 14.`:is`动态组件

格式：

```vue
<component :is="itemName"/>
```

```vue
import item from "./item"
exports default{
	components:{
		item
	}
	data:{
		return{
			itemName:"item"
		}
	}
}
```

上方通过:is绑定了data中的数据`itemName`是什么，那么就会渲染什么组件，前提是名字得一样

#### 15.axios封装

想先提一下`axios.get`中的`.get`是如何实现的

因为js中的数组的原型是对象，所以，对象对属性的访问方式同样适用于数组，在控制台中数组是这样的

![image-20210824140103012](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210824140103012.png)

他是以`key:value`的形式，所以可以通过`arr.0`来获取第一个字符串

所以`axios.get`实现也是类似，这个`get`就可以是索引值，然后返回一个函数

下面是二次封装axios，对配置信息进行加工

```js
function request(options){
  // 默认形式为get
  options.methond = options.methond || 'get'
  // 将params改为data
  if(options.methond.toLowerCase()==='get'){
    options.params = options.data;
  }
  // 如果环境是生产环境
  if(config.env === 'prod'){
    // 将baseApi设置为生产api
    service.defaults.baseURL = config.baseApi;

  }else{
    // 看环境mock总开关是否开启
    service.defaults.baseURL = config.mock? config.mockApi : config.baseApi;
  }
  return service(options)
}

```

接着就是对axios函数请求方式的函数外封装

```js
['get','post','put','delete','patch'].forEach(item=>{
  request[item] = (url,data,options)=>{
    return request({
      url,
      data,
      methond:item,
      ...options,
    })
  }
})
```


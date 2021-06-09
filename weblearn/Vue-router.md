## Vue-router

> ## 路由：

#### 1.如何配路由：

<img src="C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210605201112667.png" alt="image-20210605201112667" style="zoom:33%;" />

​	1.配置路由相关信息：

在router文件夹中的index.js文件中，对路由信息进行配置：

```js
import VueRouter from 'vue-router'
```

```js
import Vue from 'vue'
```

 	2.通过Vue.use(插件)，安装插件

```js
Vue.use(VueRouter)
```

​	3.创建VueRouter对象

```js
const routers = {

}
const router = new VueRouter({
	routers
})
```

​	4.将router挂载到main.js中

```js
import router from './router/index'//其中/index可以省略，他会自动从/router中寻找index.js

new Vue({
	el:'#app',
	//router:router,
    router
	render: h => h(app)
})
```

​	5.在index.js中设置路由的对象的内容

```js
import Home from '../components/Home'
import About from '../components/About'

const routers = [
	{
		path:'/home',
		component:Home
	},
	{
		path:'/About',
		component:About
	}
]
```

​	6.在App.vue中写入组件

```js
<template>
	<div>
		<router-link to="/home">首页</router-link>
		<router-link to="/about">关于</router-link>
	</div>
	
</template>
```



#### 2.router-link的其他属性：

`router-link`中加入replace属性，就不会有“前进后退功能了”也就是少了`history.pushState()`由push改为replace自然就没有了前进后退

![image-20210608203605568](C:\Users\gjm\AppData\Roaming\Typora\typora-user-images\image-20210608203605568.png)



#### 3.通过代码方式实现路由跳转：

```html
//比如有两个button
<button @click="index">首页</button>
<button @click="about">关于</button>
```

```js
//接着在methods中写入两个方法
	index(){
		this.$router.push('/home');
		//这个方法不会有前进后退
		this.$router.replace('/home');
	}
```



#### 4.改变router-link的样式：

每个被选中的router-link都会被赋予一个属性：`router-link-active`

所以在css中对`.router-link-active{}`设置css样式，就可以对当前选定的`router-link`进行样式的改变



#### 5.动态路由：

新建一个组件

```vue
<template>
  <div class="page-contianer">
    <h2>这是用户界面</h2>
    <p>这里是用户页面的内容。</p>
    <p>用户ID是: {{ userId }}</p>
  </div>
</template>
<script>
export default {
  name: 'User',
  computed:{
    userId() {
      return this.$route.params.userId
    }
  }
}
</script>
<style scoped>
</style>
```

这个组件使用了一个`computed`计算属性，获取到当前的路由信息，然后将{{}}的内容`userId`通过计算属性，更改为当前路由的userId

在路由index.js中

```vue
  {
    path: '/user/:userId',
    name: 'User',

  }
```

使用`:userId`动态的去绑定`userId`会实现userId随着router的改变，userId就随之改变

> 在router-link中

```vue
 <router-link :to="'/user/' + userId">用户</router-link>
```

==注意==使用`v-bind:`会与data中相应的值进行对应，通过字符串拼接，实现动态加载

> 在data中添加userId变量：

```vue
  data (){
    return {
      userId: 'zty'
    }
```



#### 6.展示多视图：

有时候需要同时展示好几个视图，想要同时导入好几个组件，这时候就需要好几个`router-view`，这时候就`命名视图`对展示的内容进行选中。

`router-view`如果没有设置名字，那么默认为`default`

```vue
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

上述例子中，就对`router-view`绑定了一个`name`

在下述的router中：

```vue
routes: [
    { path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    }
  ]
})

```

里面定义了一个子组件components，其中有三个`name`分别为`default,a,b`这三个`name`与上文的`router-view`相对应。

将`router-view`设置`name`属性，就方便对子组件的位置显示进行控制。



#### 7.动态路由匹配：

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <p>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/bar">/user/bar</router-link>
  </p>
  <router-view></router-view>
</div>
```

```js
const User = {
  template: `<div>User {{ $route.params.id }}</div>`
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})

const app = new Vue({ router }).$mount('#app')
```

其中对于第二个js代码块：

`path: '/user/:id'`应该是相当于:`path: '/user/foo 加上path: '/user/bar'`其中foo与bar就是对应的:id,

:id就与path进行绑定



#### 8.嵌套路由：

当你有一个`path`为/user时，又想加入两个额外的路由，`/user/foo或者/user/bar`此时就可以用嵌套路由在user中，加入`foo和bar`额外路由

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```


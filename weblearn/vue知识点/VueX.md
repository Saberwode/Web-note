## vueX

#### 1.vueX的使用流程：

- 简单的使用公共资源

- 首先在vueX的 `store`文件夹中，找到 `index.js`文件，在里面的state中**设置公共存储的值**比如`name`
- 在其他组件中就可以使用`this.$store.state.name`来对`name`进行使用



- 修改公共资源
- 在其他组件中，需要用`this.$store.patch('change')`**派发一个action**
- 在`index.js`中，改写`actions()`方法**提交一个commit，去触发mutations**，提交一个变化
- 然后在`mutations()`方法中对`state()`方法内容去改写

> 注意：mutations中，只允许写同步代码，异步代码需要放到action中去写

直接上项目代码：

有一个`store`文件夹，用于设置vuex，入口文件为index.js

```js
/**
 * vuex状态管理入口
 */
import storage from '../utils/storage';
import mutations from './mutations';
import { createStore } from 'vuex';


// 创建状态
const state = {
  // 初始为空，如果本地存储有的话，就从本地存储的用户信息
  userInfo : "" || storage.getItem("userInfo")
}

// 创建一个VUEx的实例
export default createStore({
  // 传入两个参数，一个是状态，一个是变化
  state,
  mutations
})
```

调用`vuex`的方法`createStore`创建一个实例，传入两个参数，state,mutations

因为vuex的实例要求需要两个参数，都是对象形式，其中`state`为状态，也就是存储数据的，用来保存数据，`mutations`为变化，用来记录数据的改变，vuex要求需要有这两项，当你想改变state的内容的时候，需要先通过`mutations`将数据做一个变化，然后通过`commit`作一个提交，不提交的话，`state`中的内容是不会发生变化的，尽管你在`mutations`中对`state`进行改变，但是不提交就是不会发生变化

接着就是`mutations.js`文件用来写如何变化数据的

```js
/**
 * 获取变化
 */
import storage from '../utils/storage';


export default {
  saveUserInfo(state,userInfo){
    // 改变状态
    state.userInfo =  userInfo;
    // 将数据存入本地storage
    storage.setItem("userInfo",userInfo);

  }
}
```

`mutations`导出了一个方法，需要传入当前状态`state`和`userInfo`用户信息，当前状态貌似是自动传入的，这个不管他，然后需要手动传入userInfo，通过封装好的`storage`调用set方法，将用户信息存入

```js
login(){
      // el-form提供了一个校验方法validate
      // console.log(this.$refs.userForm);
      this.$refs.userForm.validate(valid=>{
        if(valid){
          
          this.$api.login(this.user).then(res=>{
            this.$store.commit("saveUserInfo",res);
            this.$router.push('/welcome');
          })
        }else{
          return false
        }
      })
    },
```

在提交信息的时候，将用户信息存入
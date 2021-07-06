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


## 前端问题之url问题

> 问题描述：在想通过`this.$router.push('/main')`进行路由跳转的时候，出现了main页面一闪而过的情况，具体效果是首先确实跳转到了main页面，其url中多了一个问号，接着就又跳转回了原重定向页面

造成这个问题的原因就是，在使用原生form表单的时候，form表单中的button按钮触发事件的时候，回首先触发一个默认的submit事件，此时会提交一个action，然后会改变掉url，url中就会多出一个？进而导致再次触发重定向

解决方案：

- 在button标签中设置属性`type="button"`，其在原生form表单中，默认type属性是为submit的
- 在button标签中`<button @click.prevent="login" type="button">login</button>`通过vue提供的方法，阻止触发默认的点击事件
- 手动阻止默认点击事件
- 将button标签写到form表单外


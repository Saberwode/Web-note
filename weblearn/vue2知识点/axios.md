## axios

#### 1.当需要接受多个网络请求的时候

```js
axios.all([axios({
	url:'..'
}),axios({
	url:"..",
	params:{
		type:"sell",
		page:5
	}
})]).then(axios.spread((res1,res2)=>{
	console.log(res1);
	console.log(res2);
}))
```

其中`axios.spread()`是可以将两个请求的返回值作为参数传入，而不需要使用数组的形式

#### 2.设置默认全局配置

```js
axios.defaults.baseURL = "http:123.207.32.32:8000"
axios.defaults.timeout = 5000
```



#### 3.创建axios实例

```vue
const instance = axios.create({
	baseURL:"http:123.207.32.32:8000",
	timeout:10000,
})
```

有时候不同的项目可能会有不同的默认配置，所以可以创建一个axios实例，来实现同种默认配置的请求。
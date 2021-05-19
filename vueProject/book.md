## 书籍管理

```html
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<title></title>
</head>

<body>
	<div id="app">
		<table border="1" cellspacing="0" cellpadding="10">
			<thead>
				<td>序号</td>
				<td>书籍名称</td>
				<td>出版日期</td>
				<td>价格</td>
				<td>购买数量</td>
				<td>操作</td>
			</thead>
			<tbody>
				<tr v-for="(item,index) in books">
					<td>{{item.id}}</td>
					<td>{{item.name}}</td>
					<td>{{item.time}}</td>
					<td>{{thePrice(item.price)}}</td>
					<td>
						<button @click="countDown(index)" :disabled="item.count<=1">-</button>
						{{item.count}}
						<button @click="countUp(index)">+</button>
					</td>
					<td><button>移除</button></td>
				</tr>
			</tbody>
		</table>
	</div>
	<script src="vue.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		const app = new Vue({
			el: "#app",
			data: {
				books: [
					{
						id: 1,
						name: '《算法导论》',
						time: '2006-9',
						price: '85',
						count: 1
					},
					{
						id: 2,
						name: '《UNIX编程艺术》',
						time: '2006-2',
						price: '59',
						count: 1
					},
					{
						id: 3,
						name: '《编程珠玑》',
						time: '2008-10',
						price: '39',
						count: 1
					},
					{
						id: 4,
						name: '《代码大全》',
						time: '2006-3',
						price: '128',
						count: 1
					},
				]
			},
			methods: {
				countDown(index) {
					this.books[index].count--;
				},
				countUp(index) {
					this.books[index].count++;
				},
				thePrice(price) {
					return '￥' + parseInt(price).toFixed(2)
				}
			},
		})
	</script>
</body>

</html>
```


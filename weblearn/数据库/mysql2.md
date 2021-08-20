## 使用mysql2

#### 1.基本使用

```js
// 基本使用步骤：
//首先要引入mysql2
const mysql = require('mysql2')
// 1.建立与数据库的连接
const connection = mysql.createConnection({
  host:"localhost",
  database:"bili",
  user:"root",
  password:"123456"

})

// 2.写sql语句
const statement = `
SELECT *FROM products WHERE price = 999;
`

// 3.运行sql语句
connection.query(statement,(err,result)=>{
  console.log(result);
})
```

#### 2.使用连接池

```js
const mysql = require('mysql2')
// 1.创建连接池
const connection = mysql.createPool({
  host:"localhost",
  database:"bili",
  user:"root",
  password:"123456",
  connectionLimit:10,
})
// 2.写sql语句
// 3.在这一步骤中，向sql语句中加入了?暂定数值，
const statement = `
SELECT * FROM products WHERE price > ? AND score > ?;
`
// 3.传入参数，执行sql语句
connection.execute(statement,[6000,7],(err,result)=>{
  console.log(result);
})

// 4.执行的时候是可以使用promise的方式的
connection.execute(statement,[6000,7],(err,result)=>{
  console.log(result);
})
```

#### 3.使用sequelize（ORM）

```js
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('bili','root','123456',{
  host:'localhost',
  dialect:'mysql'
});
// 授权
sequelize.authenticate().then(()=>{
  console.log('数据库连接成功');
}).catch(err=>{
  console.log('数据库连接失败',err);
})
```


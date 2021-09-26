## mongodb知识点

#### 1.基本使用

- 创建数据库`use DATABASE_NAME`（集合在插入文档后，数据库才会真正被创建）

- 查看所有数据库`show dbs`

- 删除数据库`db.dropDatabase()`

- 切换数据库`use runoob`（有该数据库的话就会切换，没有就新建）

- 创建集合（也就是表）`db.createCollection(name,options)`（option）是可选项，（插入文档的时候需要选定对应集合，如果当前选定的集合不存在，则会创建该集合）

- 查看已有集合`show collections or show tables`

- 删除集合`db.集合名字.drop()`

- 插入文档（也就是数据）`db.COLLECTION_NAME.insertOne(document) or db.COLLECTION_NAME.insertMany()`语法格式为：

  ```sql
  db.collection.insertMany(
     [ <document 1> , <document 2>, ... ],
     {
        writeConcern: <document>,
        ordered: <boolean>
     }
  )
  ```

- 更新文档

  ```sql
  db.collection.update(
     <query>,
     <update>,
     {
       upsert: <boolean>,
       multi: <boolean>,
       writeConcern: <document>
     }
  )
  ```

  - **query** : update的查询条件，类似sql update查询内where后面的。
  - **update** : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
  - **upsert** : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
  - **multi** : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
  - **writeConcern** :可选，抛出异常的级别。

  ```sql
  db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},{multi:true})
  ```

  这个语句只会修改第一条发现的文档，如果想更改所有的，需要将multi设置为true

  > 条件操作符

  - (>) 大于 - **`$gt`**
  - (<) 小于 - **`$lt`**
  - (>=) 大于等于 - **`$gte`**
  - (<= ) 小于等于 - **`$lte`**
  - (!= ) 不等于 - **`$ne`**
  - ( = ) 等于 **`$eq`**
  - 在什么范围内 **`$in`**
  - 不在什么范围 **`$nin`**    (not in)  
  - 属性是否存在 **`$exists`**    `$exists {'age':{'$exists':true}}`
  - 类型判断 **`$type`**    `{'age':{'$type':'int'}}` 类型为int的age
  - 文本查询 **`$text `**   `{'$text':{'$search':'Mike'}}` 查找mike字段
  - 查找多种条件**` $or`**    `{'$or':[{'name':'chen'},{'name':'wang'}]}`
  - 组合使用 `db.user.find({"age":{"$gte":18,"$lte":25}})`

- 

```
"userId" : 1000001,//用户ID，自增长 
"userName" : "admin",//用户名称 
"userPwd" : "e10adc3949ba59abbe56e057f20f883e",//用户密码，md5加密 
"userEmail" : "admin@imooc.com",//用户邮箱 
"mobile":13788888888,//手机号 
"sex":0,//性别 0:男 1：女 
"deptId":[ObjectId("")],//部门
"job":"前端架构师",//岗位
"state" : 1,// 1: 在职 2: 离职 3: 试用期 
"role": 0, // 用户角色 0：系统管理员 1： 普通用户 
"roleList" : [ObjectId("")], //系统角色 
"createTime" : ISODate("2021-01-17T13:32:06.381Z"),//创建时间
"lastLoginTime" : ISODate("2021-01-17T13:32:06.381Z"),//更新时间
```

#### 2.mongoose使用

1.首先需要定义一个模型与数据库对应起来

```js
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    "userId" : Number,//用户ID，自增长
    "userName" : String,//用户名称
    "userPwd" : String,//用户密码，md5加密
    "userEmail" : String,//用户邮箱
    "mobile":String,//手机号
    "sex":Number,//性别 0:男  1：女 
    "deptId":[],//部门
    "job":String,//岗位
    "state" : {
        type:Number,
        default:1
    },// 1: 在职 2: 离职 3: 试用期
    "role": {
        type:Number,
        default:1
    }, // 用户角色 0：系统管理员  1： 普通用户
    "roleList" : [], //系统角色
    "createTime" : {
        type:Date,
        default:Date.now()
    },//创建时间
    "lastLoginTime" : {
        type:Date,
        default:Date.now()
    },//更新时间
    remark:String
})

module.exports = mongoose.model("users",userSchema,"users")
```

2.接着就可以进行查询了

```js
const res = await User.findOne({
      userName,
      userPwd,
   },'userId userName')
```

#### 3.返回数据库指定字段

例如：

```sql
const res = await User.find({},'userId userName userPwd')
```

第一个参数是查询条件，第二个参数是返回的字段，返回字段的设置方式有三种，可用于不同的场景

```sql
1.'userId userName userEmail' ##用空格分隔开
```

```sql
2.{userId:1,_id:0} ##不返回id字段
```

```sql
3.select('userId') ##返回userId
```


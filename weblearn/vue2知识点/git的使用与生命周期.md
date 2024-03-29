## 5.17

#### 1.编程范式：

vue使用的是声明式编程，你不需要知道他需要显示什么东西就可以了，并不需要自己写如何实现

而之前的js，jQuery使用的是命令式编程，你需要一步步的将执行步骤写好，他才能正常运行。



#### 2.git brush切换路径：

`cd /d/Git_Repositor`

接着就是初始化仓库：

`git init`



#### 3.git仓库使用：

- 初始化一个仓库，使用`git init`命令

添加文件到git仓库中：

- 使用命令 `git add`，可以反复多次使用，添加多个文件；
- 使用命令`git commit -m ""`

掌握工作区的状态

- `git status`

  该指令可以看出你当前的工作区是否有修改后的文件，和有没有修改。

- `git diff`

  如果`git status`告诉你有文件被修改过，该指令可以查看修改的内容。

回退前进版本

- HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使⽤用命 令`git reset --hard commit_id`。
- 可以用`git log`查看提交历史，确定回退到哪个版本
- 用`git reflog`查看命令历史，确定返回回退之前的版本

#### 4.将本地与github连接起来

（1）本地创建ssh key：

`ssh-keygen -t rsa -C "1435554189@qq.com"`

没设密码直接一路回车

（2）将生成的key放入github

打开id_rsa.pub(我用的typora)，复制里面的key。

登陆GitHub，打开“Account settings”，左边选择SSH Keys，Add SSH Key。

`ssh -T git@github.com`验证效果。

（3）`git remote add origin git@github.com:Saberwode/Web-note.git`绑定github上的库

（4）`git add xxx`添加文件

（5）`git commit -m "xxx更新日志"`更新日志

（6）`git push  -u origin master` 将本地工作区的内容推送到github

（7）如果上一步报错：那就直接`git push -f origin master`把-m换成==-f==就能正常上传了。



#### 5.vue也有一些内置的方法：

内置方法用 $与自定义的做区分。

`$watch('a',function(newValue, oldValue){})`这个方法可以返回属性a的更改后的新值，与之前未更改的旧值。



#### 6.生命周期

> ##### 每个Vue实例或组件从创建到显示再到废弃的过程就是vue的生命周期。很多时候我们希望能在这个过程中执行一些操作，于是就有了生命周期钩子。
>
> ##### 生命周期钩子函数允许我们在实例不同阶段执行各种操作，便于我们更好地控制和使用实例。

钩子函数：

```js
//在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
	beforeCreate:function(){
		console.log('beforeCreate');
	},
	/* 在实例创建完成后被立即调用。
	在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
	然而，挂载阶段还没开始，$el 属性目前不可见。 */
	created	:function(){
		console.log('created');
	},
	//在挂载开始之前被调用：相关的渲染函数首次被调用
	beforeMount : function(){
		console.log('beforeMount');

	},
	//el 被新创建的 vm.$el 替换, 挂载成功	
	mounted : function(){
		console.log('mounted');
	
	},
	//数据更新时调用
	beforeUpdate : function(){
		console.log('beforeUpdate');
			
	},
	//组件 DOM 已经更新, 组件更新完毕 
	updated : function(){
		console.log('updated');
			
	}
});
```

1.beforeCreate：显而易见的就是在“页面创建之前调用的函数”

> 2.vue的挂载概念：将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载

3.beforeUpdate：数据进行变化之前


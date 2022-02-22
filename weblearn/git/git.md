## Git

#### 1.git打tag

可以在git commit提交之后，可以通过git tag "名字"打一个tag，然后通过`git push origin master --tags`将本地分支提交到GitHub上，提交不上就多提交几次

#### 2.git将本地与仓库进度同步

```git
git fetch --all #取回远程库的所有操作
git reset --hard origin/master #指向远程库origin的master
git pull #把远程库拉取到本地库
```


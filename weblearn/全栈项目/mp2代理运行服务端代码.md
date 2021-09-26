修改代码后，需要将项目重启

我目前的操作是先将服务关闭，删除，然后重新启动

pm2 stop all	pm2 delete all	pm2 start ./bin/www
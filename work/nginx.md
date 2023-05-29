## nginx

#### nginx虚拟主机配置文件(conf.d)

如果虚拟主机配置多了，需要将配置文件拆分出来，此时可将文件放在`conf.d`中，建立各自对应的配置文件。

让上述配置生效的话需要在`nginx.conf`的http块中加上`include conf.d/*.conf;`
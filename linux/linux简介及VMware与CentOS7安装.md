# Linux简介

## linux历史

* Unix操作系统、收费
* Minux操作系统是linux操作系统的前身
* Linus Towards根据Minix写了Minix, Linux
* Linux在移动设备Android, 在车载导航 工业 服务器

---

## 为什么选择linux做服务器呢？

* 1.linux本身是网络操作系统，支持所有TCP/IP协议，网络功能是内核中六大模块之一
* 2.linux和unix兼容，unix是早期的服务器霸主，现在份额逐渐让给linux了
* 3.linux是多用户多进程系统，windows是单用户伪多用户系统，不适合服务器
* 4.互联网开放，linux也是开放的，像apach这样的开放软件优先在linux上实现
* 5.linux是模块化的，可裁减，出现问题只要关闭一个模块，windows只有微软自己才会裁减
* 6.linux的用户管理严格，病毒难以破坏，windows漏洞百出，用户管理混乱
* 7.linux硬件需求小，大部分版本免费，总得成本低
* 8.windows常会蓝屏、需要磁盘清理，linux下kernel panic几年一遇，也可以好几年不关机，一两年一次磁盘清理
* 9.win的图形界面浪费了太多资源，linux使用x-window systerm，平时根本不用开图形界面

---

## 安装VMware与CentOS7

### 安装VMware-Workstation

安装包下载地址：[https://my.vmware.com](https://my.vmware.com/en/web/vmware/info/slug/desktop_end_user_computing/vmware_workstation_pro/12_0)
* 下载并运行安装文件
* 安装完成之后输入激活码激活软件

---
### CentOS7安装、设置共享文件、VMware Tools安装

ISO镜像文件下载地址:
[http://isoredirect.centos.org](http://isoredirect.centos.org)
* CentOS系统安装百度网盘有详细文档介绍

  [http://pan.baidu.com/s/1pLM91Uj](http://pan.baidu.com/s/1pLM91Uj)  密码：248f

---

### Linux内部结构

* boot 文件夹 放操作系统内核
* etc 放linux各种配置文件
* home 放的是每个账号用户的数据
* lib64 lib 放各种库文件 jar
* mnt 放各种mount简称 /mnt/usb1
* proc sys 放系统内存 系统动态信息
* run srv tmp 放临时文件 开机自动清空
* var 动态信息 放 mysql的数据库放在这里 apache/http 放在这里 /var/www
* bin 放各种二进制程序
* dev 设备文件
* opt 放第三方安装程序
* root root用户的自己私有目录
* sbin 系统二进制程序
* usr 放软件按照包

---

## 部分基础命令

### 查看当前目录
``` xshell
# 查看当前目录、查看当前文件
ls
```

### 查看详情
``` xshell
# 查看详情 （一般简写为ll）
ls -l
# 查看隐藏文件
ls -a
```

### 查看根文件目录
``` xshell
# 查看详情
ls /
```

### 进入根目录
``` xshell
# 进入根目录
cd /
```

### 回到上级目录
``` xshell
# 回到上级目录
cd ..
```

### 创建目录
``` xshell
# 创建目录abc
mkdir abc
```

### 删除目录或者文件

``` xshell
# 删除目录或者文件abc (慎用，此乃无条件删除)
rm -rf abc
```

### 创建一个空的文件
``` xshell
# 创建一个空的文件a.txt
touch a.txt
```

### 查看文件内容
``` xshell
# 查看文件内容
cat a.txt
```

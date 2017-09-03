

# Linux的基础

## 一、Linux的实验环境

## 二、安装配置Linux和Linux的目录结构
	1、安装Linux的过程中，注意的问题：
		（*）虚拟机类型：Redhat linux 7 64位
		（*）重要的：网卡的类型：仅主机模式（host only）
		（*）IP地址需要跟VMNet1网卡在一个网段
		      192.168.244.111
			  后面4台:
			  192.168.244.112
			  192.168.244.113
			  192.168.244.114
			  192.168.244.115

		（*）配置：关闭防火墙、设置主机名
		      systemctl stop firewalld.service （重启恢复）
			  systemctl disable firewalld.service （永久关闭）
		      systemctl status firewalld.service  查看防火墙的状态

			  设置主机名: 修改文件:  /etc/hosts
			  vi /etc/hosts
			  增加一行
			  192.168.244.111 RedHat111

	2、对比：Linux和Unix的区别

	3、Linux的目录结构（了解）

## 三、vi编辑器的使用：Linux的记事本

	三种模式：
	1、编辑模式: 等待命令的输入
	             按i进入到插入模式


	2、插入模式：按键盘的esc键 回到 编辑模式


	3、命令模式: 需要在编辑模式上，输入冒号
	    (*) 保存：w
        (*) 保存退出： wq
	    (*) 退出:      q
	    (*) 打开行号:  set number


## 四、文件目录操作和压缩命令： HDFS操作命令类似Linux

	（*）ls 显示文件和目录列表
	        -l 列出文件的详细信息
	        -a 列出当前目录所有文件，包含隐藏文件、隐藏目录

			隐藏文件：.bash_profile -----> 配置环境变量，比如：安装JDK，配置JAVA_HOME环境变量
			          在当前用户的家目录下  ~/.bash_profile

			隐藏目录：.ssh          -----> 配置免密码登录

	 （*）mkdir 创建目录
	            -p 父目录不存在情况下先生成父目录

		  举例：mkdir training   ------> 安装目录
		        mkdir tools      ------> 是存放介质的目录


	（*）pwd: 显示当前的路径
	（*）cd 切换目录:   cd ~ 是什么意思？  ~ ---> 代表当前用户的家目录

	（*）touch 生成一个空文件
	（*）echo 生成一个带内容文件
	          echo更常用的用法：查看环境变量  举例：echo $JAVA_HOME

	（*）cat、tac 显示文本文件内容
	      cat是从第一行开始写；tac是从最后一行开始写

		  举例: cat a.txt

	（*）cp 复制文件或目录
	        举例：cp a.txt b.txt

	（*）rm 删除文件
	        -r 同时删除该目录下的所有文件
	        -f 强制删除文件或目录

		举例： rm -rf a.txt
		       rm -rf 目录名称

	（*） tail：查看文件的最后一页
	    举例: tail a.txt
		参数：-f   ---> 始终查看文件最新内容
		举例： tail -f a.txt  
               tail -f tomcat.log   ----> 装好tomcat后，演示


	（*）解压（压缩）命令: 安装包基本都是  .tar.gz  结尾
	      tar命令
		  举例：安装JDK

## 五、Linux权限的管理: HDFS的权限类似Linux
	1、权限有哪些：读r    写w   执行x
	2、查看某个文件的权限？
	    ls -l

		a.txt文件的权限

		第一位: 文件还是目录
		-             rw-                     r--                r--          a.txt
		           第一个三位                第二个三位         第三个三位
				   当前用户的权限            同组用户的权限      其他人

				     111                      111               111
					  7                        7                 7

					 111                      110               100
					  7                        6                 4


        改变权限：chmod ----> 计算一个二进制数字
		举例1：所有人对a.txt文件：可读  可写  可执行
		       chmod 777 a.txt

		举例2： 对a.txt 文件： 当前用户：可读  可写  可执行
		                       同组用户：可读  可写
							   其他人：  可读

				chmod 764 a.txt


## 六、安装常用软件

	1、安装JDK
	    tar -zxvf jdk-8u144-linux-x64.tar.gz -C ~/training/
		将 jdk-8u144-linux-x64.tar.gz文件加压到~/training/目录

		编辑vi ~/.bash_profile

		JAVA_HOME=/root/training/jdk1.8.0_144
		export JAVA_HOME

		PATH=$JAVA_HOME/bin:$PATH
		export PATH

		使环境变量生效
		source ~/.bash_profile

	2、安装Tomcat: 部署Java应用
		安装：tar -zxvf apache-tomcat-7.0.81.tar.gz -C ~/training/

		打开tomcat的访问日志：tomcat7以前默认是禁用的

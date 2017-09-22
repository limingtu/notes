
# Hadoop学习大纲

## 一、案例：Java的死锁分析（性能瓶颈）
	1、JDK：提供了一个非常强大的性能诊断工具： Thread Dump文本  ----> 照片
		作用：（1）分析死锁
		      （2）性能问题:慢

	2、得到信息
		Linux：  kill -3 pid  ----> 产生Thread Dump

		Windows：组合键 ctrl + break（fn键+b键）

		Java stack information for the threads listed above:
		===================================================
		"Thread-1":
				at ThreadB.run(DeadLock.java:68)
				- waiting to lock <0x000000076dc57420> (a java.lang.Object)
				- locked <0x000000076dc57430> (a java.lang.Object)
		"Thread-0":
				at ThreadA.run(DeadLock.java:41)
				- waiting to lock <0x000000076dc57430> (a java.lang.Object)
				- locked <0x000000076dc57420> (a java.lang.Object)

		Found 1 deadlock.

## 二、学什么？怎么学？
	1、（最重要）大数据的原理、运行机制、体系结构  ------> 理论基础  ----> 画图
	2、安装和配置 -----> 动手
	3、操作：命令行、Java API、Web Console ----> 网页图形工具

	基础：Java基础、Linux的基础


## 三、各章概述: Hadoop的部分，列出一个大纲
	目的：（1）学习的内容，整体的概念
	      （2）大数据的领域中，概念非常多，名词非常多

	(一)、Hadoop的起源与背景知识
		1、什么是大数据？
			（*）举例：两个例子
				（1）商品推荐   问题  （1）大量的订单如何存储？    （2）大量的订单如何计算？
				（2）天气预报   问题  （1）大量的天气数据如何存储？（2）大量的天气数据如何计算？

				大数据的核心问题是：（1）数据的存储：分布式的存储（分布式的文件系统）
				                    （2）数据的计算: 分布式的计算（MapReduce和Spark RDD）

				IBM 曾经提出了大数据的定义


		2、什么是数据仓库？Data Warehouse  ----> 传统的数据分析方式
			（*）就是一个数据库，可以是：Oracle、MySQL、****
			（*）一般只做select
			（*）画图：数据仓库搭建的过程

			（*）Hadoop可以看成是数据仓库的一种实现方式
			（*）数据仓库又是一个OLAP的应用


		3、基本概念：OLTP和OLAP
		4、（最重要的内容）：Google的基本思想：三篇论文   ------> 掌握原理
			（1）GFS（google的文件系统）  ----------> HDFS（Hadoop的文件系统）
			（2）MapReduce：计算模型，处理大数据  ---> MapReduce的来源是什么？ PageRank问题
			（3）BigTable：大表  -------> NoSQL的数据库：HBase

	(二)、实验环境

	(三)、Apache Hadoop的体系结构（重要）
		1、HDFS：hadoop distributed file system
			（*）主节点：NameNode
			（*）从节点：DataNode
			（*）SecondaryNameNode

		2、Yarn：运行MapReduce程序
			（*）主节点：ResourceManager
			（*）从节点：NodeManager

		3、HBase
			（*）主节点：HMaster
			（*）从节点：RegionServer

		在大数据领域中，都是什么结构？主从结构

	(四)、Hadoop 2.X的安装与配置
		三种模式
		1、本地模式
		2、伪分布模式
		3、全分布模式

	(五)、Hadoop应用案例分析

	(六)、HDFS: 分布式的文件系统
		1、操作HDFS：命令行、Java API、Web Console
		2、原理：文件上传和文件下载的原理
		3、HDFS高级功能
			（*）回收站：补充：Oracle回收站
			（*）快照snapshot：是一种备份
			（*）配额quota：（1）名称配额   （2）空间配额
			（*）安全模式：safemode
			（*）HDFS的权限：类似Linux
			（*）底层原理：RPC和Java的动态代理

	(七)、MapReduce：计算模型，使用Java的语言
			（*）第一个案例：WordCount 单词计数  ----> MapReduce处理数据的过程
			（*）MR的功能：
				（1）排序：基本数据类型（字符串和数字）
				           对象
				（2）序列化：类似Java的序列化
				     MR的序列化表示：如果一个类实现了MR的序列化，这个类的对象就可以作为Map和Reduce输入输出对象
				（3）分区：partition
				（4）合并：combiner
				（5）MR的核心：Shuffle（洗牌） -----> 画图

	(八)、Hive：是数据分析引擎
		1、什么是Hive？是基于Hadoop之上的数据仓库
		2、支持SQL select ----> hive 转换 ----> MapReduce程序
		3、体系结构和安装配置
		4、（重要）数据模型：内部表、外部表、分区表、桶表、视图
		5、通过Java访问Hive的数据
			（*）JDBC
			（*）Thrift Client
		6、Hive自定义函数(本质也是一个Java程序)

	(九)、Pig：是数据分析引擎
		1、什么是Pig？体系结构
		2、安装和配置
		3、数据模型
		4、支持语言：PigLatin语言  ----> MR程序
		5、自定义函数

	(十)、HBase：NoSQL数据库
		1、常用的NoSQL数据库
			（*）HBase
			（*）Redis
			（*）MongoDB
			（*）Cassandra

		2、体系结构和安装配置，表结构
		3、操作：命令行、Java API、Web Console
		4、HBase的过滤器（filter）
		5、HBase上的MR
		6、HBase的HA（high avaibiltiy）

	(十一)、Sqoop：数据交换
		1、采集关系型数据库  Oracle <----> Sqoop <----> HDFS、HBase、Hive

	(十二)、Flume：数据采集
		1、采集日志
		2、体系结构

	(十三)、HUE：基于Web的图形工具

	(十四)、ZooKeeper:相当于是一个数据库，实现HA（HDFS、Yarn、HBase、Storm、Spark）
		1、特点：自动在ZK集群中，实现数据的同步

	(十五)、Hadoop的集群和HA
		1、HDFS的联盟（Federation）：Load Balance
		2、利用Zk实现HA：fail over

	(十六)、Redis： 基于内存的NoSQL的数据库
		1、安装配置
		2、基本操作
		3、简单的事务管理和消息机制
		4、持久化
		5、集群：实现读写分离

	(十七)、Storm：实现实时计算

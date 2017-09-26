# Hadoop

## (一)、Hadoop的起源与背景知识
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
		（1）OLTP：online transaction processing 联机事务处理： insert update delete
		           举例：转账
				   MySQL: 手动开启事务
				         start transaction;
						 update myaccount set money=money-100 where tname='Tom';
						 update myaccount set money=money+100 where tname='Mary';
						 commit;

		（2）OLAP：online analytic processing 联机分析处理：数据仓库，一般select

	4、（最重要的内容）：Google的基本思想：三篇论文   ------> 掌握原理
		（1）GFS（google的文件系统）  ----------> HDFS（Hadoop的文件系统）
			（*）google file system：分布式的文件系统 -----> 数据的存储
			（*）分布式的文件系统的原理
			（*）演示Demo：Hadoop的伪分布模式
			（*）倒排索引 -----> 查找数据
            1、复习：索引  index :   create index *****
      	         问题：索引一定能提高查询的性能吗？
      			 举例：通过查看SQL的执行计划，可以确定索引是否提高了性能（重要） ----->  Hive的分区表

          	2、倒排索引：reverted index

		（2）MapReduce：计算模型，处理大数据  ---> MapReduce的来源是什么？ PageRank问题
			（*）什么是PageRank问题？-----> 搜索排名
			（*）MapReduce的编程模型
			（*）演示Demo：WordCount单词计数
			      例子：/root/training/hadoop-2.7.3/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.3.jar
				  hadoop jar hadoop-mapreduce-examples-2.7.3.jar  wordcount /input/data.txt /output/wc0904
				  日志：
					17/09/04 22:19:43 INFO mapreduce.Job:  map 0% reduce 0%
					17/09/04 22:19:52 INFO mapreduce.Job:  map 100% reduce 0%
					17/09/04 22:20:04 INFO mapreduce.Job:  map 100% reduce 100%

			     MR的分区: 举例： 3个分区
				  日志：
					17/09/04 22:19:43 INFO mapreduce.Job:  map 0% reduce 0%
					17/09/04 22:19:52 INFO mapreduce.Job:  map 100% reduce 0%
					17/09/04 22:19:52 INFO mapreduce.Job:  map 100% reduce 33%
					17/09/04 22:19:52 INFO mapreduce.Job:  map 100% reduce 67%					
					17/09/04 22:20:04 INFO mapreduce.Job:  map 100% reduce 100%				  

		（3）BigTable：大表  -------> NoSQL的数据库：HBase
          1、大表的思想是违背关系型数据库范式的要求
        	    (*) 存在数据的冗余
        		  (*) 提高性能
        		  (*) 重要：通过牺牲空间，换取时间（性能）

        	2、大表：把所有的数据存入一张表
        	3、对比：Oracle数据库中表   和  HBase的表结构

## (二)、Hadoop 2.X的安装与配置   
        	1、Hadoop的安装模式：
        		（1）本地模式
        		（2）伪分布模式
        		（3）全分布模式

        	2、虚拟机：tanzhou111
        		准备工作：关闭防火墙、安装JDK、设置主机名
        		tar -zxvf hadoop-2.7.3.tar.gz -C ~/training/

        		设置环境变量： vi ~/.bash_profile
        			HADOOP_HOME=/root/training/hadoop-2.7.3
        			export HADOOP_HOME

        			PATH=$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH
        			export PATH

        		生效：source ~/.bash_profile

        	3、本地模式
        		（1）特点：不具备HDFS的功能，只能测试MapReduce程序（处理的是Linux的文件）
        		（2）配置：hadoop-env.sh
        		                 26 export JAVA_HOME=/root/training/jdk1.8.0_144

        		（3）Demo：例子：/root/training/hadoop-2.7.3/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.3.jar
        			hadoop jar hadoop-mapreduce-examples-2.7.3.jar wordcount ~/input/data.txt ~/output/wc0906


        	4、伪分布模式：一台
        		（1）特点：在单机上模拟一个分布式的环境
        		           HDFS: 主节点 NameNode  从节点：DataNode（一个）  SecondaryNameNode
        				   Yarn: 主节点 ResourceManager  从节点 NodeManager（一台）

        				   具备Hadoop的所有功能，开发测试阶段

        		（2）配置：
        		   hadoop-env.sh

                 26 export JAVA_HOME=/root/training/jdk1.8.0_144

        		   hdfs-site.xml
        					<!--配置数据块的冗余度-->
        					<property>
        					   <name>dfs.replication</name>
        					   <value>1</value>
        					</property>

        					<!--开启HDFS的权限检查-->
        					<!--
        					<property>
        					   <name>dfs.permissions</name>
        					   <value>false</value>
        					</property>
        					-->		  

        		  core-site.xml
        				<!--配置NameNode地址-->
        				<property>
        				   <name>fs.defaultFS</name>
        				   <value>hdfs://192.168.244.111:9000</value>
        				</property>

        				<!--配置数据在Linux上保存的位置-->
        				<property>
        				   <name>hadoop.tmp.dir</name>
        				   <value>/root/training/hadoop-2.7.3/tmp</value>
        				</property>		

        		 mapred-site.xml
        				<!--MR运行的框架-->
        				<property>
        				   <name>mapreduce.framework.name</name>
        				   <value>yarn</value>
        				</property>				

        		yarn-site.xml
        				<!--yarn的主节点 RM-->
        				<property>
        				   <name>yarn.resouremanager.hostname</name>
        				   <value>192.168.244.111</value>
        				</property>

        				<!--NodeManager运行MR程序方式-->
        				<property>
        				   <name>yarn.nodemanager.aux-services</name>
        				   <value>mapreduce_shuffle</value>
        				</property>		

        	（3）对HDFS进行格式化    hdfs namenode -format
        	      日志：
        		  17/09/06 22:24:53 INFO common.Storage: Storage directory /root/training/hadoop-2.7.3/tmp/dfs/name has been successfully formatted.

        	（4）启动:  start-all.sh   = start-dfs.sh   +   start-yarn.sh

## (三)、免密码登录的原理和配置  
        步骤：ssh-keygen -t rsa
	      ssh-copy-id -i .ssh/id_rsa.pub root@192.168.244.111

## (四)、Apache Hadoop的体系结构（重要）
        （一）HDFS的体系结构
        		1、主从结构：主节点：NameNode
        		            从节点：DataNode
        					 SecondaryNameNode

        		2、NameNode
        			(1)职责：管理HDFS
        			         接收客户端请求，比如：上传文件、下载文件
        					 维护文件的元信息（fsimage文件）和操作日志（edits文件）

        			(2) 文件的元信息（fsimage文件）: 记录了数据块的位置信息
        				(*) 位置：/root/training/hadoop-2.7.3/tmp/dfs/name/current/fsimage*****
        				(*) 二进制
        				(*) HDFS提供一个工具：image viewer ----> 转换成是一个文本文件（XML）

        			(3) 操作日志文件：edits文件，记录客户端的所有操作
        			    (*) 位置：/root/training/hadoop-2.7.3/tmp/dfs/name/current/edits****
        				(*) 二进制
        				(*) HDFS提供一个工具：edits viewer ----> 转换成是一个XML文件
        				   hdfs oev -i edits_inprogress_0000000000000000006 -o ~/c.xml
        				   操作：hdfs dfs -mkdir /input
        				   日志：
        					  <RECORD>
        						<OPCODE>OP_MKDIR</OPCODE>
        						<DATA>
        						  <TXID>7</TXID>
        						  <LENGTH>0</LENGTH>
        						  <INODEID>16386</INODEID>
        						  <PATH>/input</PATH>
        						  <TIMESTAMP>1504876545684</TIMESTAMP>
        						  <PERMISSION_STATUS>
        							<USERNAME>root</USERNAME>
        							<GROUPNAME>supergroup</GROUPNAME>
        							<MODE>493</MODE>
        						  </PERMISSION_STATUS>
        						</DATA>
        					  </RECORD>

        				(4) fsimage文件和edits文件，哪个文件体现了HDFS最新的状态？
        					（*）edits文件记录了最新的状态
        					（*）定期将edits中日志合并到fsimage中

        				(5) NameNode为了提高查询fsimage文件中的元信息的性能，缓存1000M元信息
        				    参数：hadoop-env.sh文件
        					# The maximum amount of heap to use, in MB. Default is 1000.
        					#export HADOOP_HEAPSIZE=
        					#export HADOOP_NAMENODE_INIT_HEAPSIZE=""

        		3、DataNode
        			（1）数据节点，伪分布环境1个，全分布环境至少2个
        			（2）按照数据块为单位保存在DataNode
        			         hadoop 1.x:  64M
        					     hadoop 2.x: 128M

        			（3）位置：
        			/root/training/hadoop-2.7.3/tmp/dfs/data/current/BP-1979204862-192.168.157.111-1504707893298/current/finalized/subdir0/subdir0

        			（4）设置数据块的冗余度：一般数据块的冗余度跟数据节点的个数一致，最大一般不超过3

        		4、SecondaryNameNode：定期将edits中日志合并到fsimage中
        			（1）fsimage文件和edits文件，哪个文件体现了HDFS最新的状态？ ----> edits体现最新的状态
        			（2）SecondaryNameNode进行日志合并过程

        （二）Yarn的体系结构
        		1、是一个容器，装MapReduce程序
        		2、资源调度平台
        		3、主从结构：主节点：ResourceManager
        		            从节点：NodeManager

        		4、Demo例子：WordCount程序
        		    hadoop jar hadoop-mapreduce-examples-2.7.3.jar wordcount /input/data.txt /output/wc0908

        		   日志：
        		  17/09/08 22:17:14 INFO client.RMProxy: Connecting to ResourceManager at /192.168.244.111:8032
        			17/09/08 22:17:34 INFO mapreduce.Job:  map 0% reduce 0%
        			17/09/08 22:17:43 INFO mapreduce.Job:  map 100% reduce 0%
        			17/09/08 22:17:55 INFO mapreduce.Job:  map 100% reduce 100%

        		5、一个MR任务在Yarn中调度的过程


        （三）HBase的体系结构
            1、主从结构：主节点：HMaster
               从节点：RegionServer

            2、基于HDFS上的NOSQL数据库
                         HBase             HDFS
                         表    -------->   目录
                         数据  --------->  文件

        （四）主从结构的单点故障问题
            1、主从结构
        		                 主节点             从节点
        		   HDFS       NameNode           DataNode
        			 Yarn       ResourceManager    NodeManager
        			 HBase      HMaster            RegionServer
        			 Storm      Nimbus             Supervisor
        			 Spark      Master             Worker

        		2、主从结构的单点故障问题

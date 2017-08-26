# Victors

<div align="center">
  <img src="http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/Victors.png"><br><br>
</div>

-----------------

## “Victors' WIFI”项目简介

- 本项目为第六届全国软件杯A2题的参赛作品
- 题目：基于WIFI探针的商业大数据分析技术
- 开发团队：Victors
- 指导老师：刘钢
- 队长：汤佳辉
- 队员：赵鹏越，郭欣光

## “Victors' WIFI”之软硬件环境

### 硬件实现

- 主要硬件参数
    1. 50台基于ARM7架构的树莓派
    2. 50口千兆交换机一台
    3. Arduino Mega 2560单片机一块
    4. SIM900芯片一块
    5. WIFI探针设备若干
    6. 电源等

### 软件环境

- 搭载系统：Raspbian Jessie（Based on Debian Jessie）
- version-Linux内核：Linux 4.9

### 实物拍摄

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/pi.png)


## “Victors' WIFI”之短信服务

>- 项目全称：基于WIFI探针的商业大数据分析技术---“Victors' WIFI”
>- 开发人员：汤佳辉 赵鹏越 郭欣光 
>- 程序目录：Victors-source/sms
>- 开发语言：Python，Arduino
>- 开发工具：Vim 7.3, Arduino 1.6.9

### UI展示

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/sms.png)

### 短信服务程序目录相关说明

程序目录中`github-images-folder`文件夹与短信服务端程序无关，里面的图片为Github项目README页面的说明。

### 短信服务程序功能相关说明

- 远程控制探针采集设备的状态
- 控制结果信息实时反馈
- 支持中英文

### 短信服务程序简要使用说明

- 发送短信内容为 `开机` 或 `boot` ，开启探针设备
- 发送短信内容为`关机` 或 `shutdown` ，关闭探针设备
- 发送短信内容为 `重启` 或 `reboot` ，重启探针设备


## “Victors' WIFI”之微信服务

>- 项目全称：基于WIFI探针的商业大数据分析技术---“Victors' WIFI”
>- 开发人员：汤佳辉 赵鹏越 郭欣光 
>- 程序目录：Victors-source/wechat
>- 开发语言：Python
>- 开发工具：Vim 7.3

### UI展示

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/wechat-control.png)
![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/wechat-result.png)

### 微信服务程序目录相关说明

程序目录中`github-images-folder`文件夹与微信服务端程序无关，里面的图片为Github项目README页面的说明。

### 微信服务程序功能相关说明

- 远程在线控制探针采集设备的状态
- 在线快速获取多维度的店铺客流信息
- 支持菜单栏选项和关键字

### 微信服务程序简要使用说明

- 选择 `设备控制` 的菜单栏子选项进行探针设备的远程在线控制
- 发送 `开机/关机/重启` 的关键字进行探针设备的远程在线控制
- 选择 `客流查询` 的菜单栏子选项进行店铺客流信息的多维度数据查询
- 发送 `查询时/查询天/查询周/查询月` 的关键字进行店铺客流信息的多维度查询

## “Victors' WIFI”之web服务

>- 项目全称：基于WIFI探针的商业大数据分析技术---“Victors' WIFI”
>- 开发人员：汤佳辉 赵鹏越 郭欣光
>- 程序目录：Victors-source/web
>- 开发语言：Java，html，css，Javascrip
>- 开发工具：MyEclipse2015

### UI展示

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/index.png)

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/mulu.png)

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/shishi.png)

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/lixian.png)

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/tanzhen.png)

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/fuwu.png)

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/kongzhi.png)

![image](http://42.123.127.93:10080/tangjiahui1014/Victors-readme/raw/c6a29c47ad94b6d29f484b48569fbf7a4fe69560/github-images-folder/map.png)

### web服务程序目录相关说明

程序目录中`github-images-folder`文件夹与web服务端程序无关，里面的图片为Github项目README页面的说明。

### web服务程序功能相关说明

- 店铺客流信息的实时数据动态展示
- 精准，高效，全面的离线查询
- 支持历史查询，环比及多维度比较
- WIFI探针设备的实时状态监控
- 服务器设备的实时状态监控
- 远程在线控制探针设备，支持开关机，重启及设定自动开关机
- 在线配置探针
- 探针设备的定位，支持平面地图，卫星地图及三维地图

### web服务程序简要使用说明

- 点击 `实时展示` ，查看店铺客流信息的实时动态展示
- 点击 `离线查询` ，查看店铺客流信息的历史数据离线查询
- 点击 `探针监控` ，对探针设备进行实时状态监控
- 点击 `系统服务` ，对服务设备进行实时状态监控
- 点击 `远程控制` ，远程在线配置及控制探针设备
- 点击 `设备定位` ，多种类地图实时定位探针设备


## 项目客户端地址

- 短信服务号：155-9059-6925
- 微信公众号：Victors
- web客户端地址：[http://www.rpiwifi.com](http://www.rpiwifi.com)


## 项目视频演示

- git目录：Victors-readme/视频/Victors.wmv
- 爱奇艺在线链接：[http://www.iqiyi.com/w_19rtorga7x.html](http://www.iqiyi.com/w_19rtorga7x.html)
- 温馨提示：在线观看时请尽量选择1080p观看高清版哦！



## 关于我们

此项目为Victors团队汤佳辉、赵鹏越、郭欣光三人合力开发。

联系方式：986537890@qq.com
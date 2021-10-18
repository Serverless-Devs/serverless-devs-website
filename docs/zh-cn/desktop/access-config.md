---
title: ServerlessDesktop 秘钥信息配置
keywords: Serverless,Electron,秘钥信息
description: 指引大家进行秘钥信息配置。
---
# ServerlessDesktop 秘钥信息配置
## 秘钥说明
秘钥是本地客户端访问云资源的关键凭证，只有配置好相应的秘钥信息之后，ServerlessDesktop才能对应用进行正确的部署联调等操作。本文以阿里云秘钥配置为例，来向大家展示如何利用ServerlessDesktop进行秘钥配置

## 操作入口
客户端下载完毕后，如果您没有配置秘钥信息，会有多个地方可以帮助您进行配置
### 入口1
ServerlessHub -> 添加秘钥 
![ServerlessDesktop](https://img.alicdn.com/imgextra/i4/O1CN01Usjp0n1Ndddw9fx1X_!!6000000001593-2-tps-3378-2032.png)

### 入口2

左下角配置Icon -> 添加秘钥
![ServerlessDesktop](https://img.alicdn.com/imgextra/i2/O1CN01bhzNkO1j7VP4p2Evw_!!6000000004501-2-tps-3378-2032.png)


## 配置

打开添加秘钥对话框后展示出如下效果
![ServerlessDesktop](https://img.alicdn.com/imgextra/i4/O1CN01YptW3O28AaSm9VrDR_!!6000000007892-2-tps-3378-2032.png)

默认选择的是alibaba也就是阿里云秘钥，您可以根据需要自行切换到其他的云，每多云对应的配置属性都不相同，比如阿里云的秘钥信息需要三个属性 AccountID, AccessKeyId,AccessKeySecret,接下来我们可以点开 "查看秘钥信息安装说明" 来获取这三个关键属性

### AccountID 获取

获取地址 https://account.console.aliyun.com/v2/#/basic-info/index

![ServerlessDesktop](https://img.alicdn.com/imgextra/i1/O1CN01zItuN11rfPeWZFSms_!!6000000005658-2-tps-3584-2032.png)
### AccessKey 及 AccessKeySecret 获取

获取地址 https://usercenter.console.aliyun.com/#/manage/ak


如果您是新用户，需要点击此页面上的”创建AccessKey“ 创建新的Ak,Sk，如果是老用户可以直接使用已有的Ak，Sk， 不过Ak 的部分需要通过手机验证以进一步显示
![ServerlessDesktop](https://img.alicdn.com/imgextra/i3/O1CN010CHpGe2483oWWPs3k_!!6000000007345-2-tps-1655-811.png)

## 填写别名
三个属性都获取完毕后，对号入座即可，最后还有一个关键的属性"秘钥别名",这也是一个关键属性，秘钥别名通常是在 S工具的配置文件 s.yaml 需要用到的 access 属性，S的执行引擎会通过这个别名解析到真正的秘钥信息。这里我们写入”default“ 即可，一般情况下会通过defaul 别名找到对应的 秘钥真实信息进行应用的部署处理工作

![ServerlessDesktop](https://img.alicdn.com/imgextra/i3/O1CN01WXEbba1iqYkXWmrCS_!!6000000004464-2-tps-806-626.png)

## 秘钥管理

配置好秘钥后，可以通过点击 左下角配置Icon，查看配置中心的秘钥，在这里您可以选择继续添加秘钥，或者删除以前不用的秘钥。另外S工具会对秘钥进行加密处理，防止因显式透出引起秘钥信息泄露
![ServerlessDesktop](https://img.alicdn.com/imgextra/i2/O1CN01jr3oXo1q943qMdTzP_!!6000000005452-2-tps-1689-987.png
)


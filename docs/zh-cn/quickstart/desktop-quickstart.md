---
key1: serverless
key2: electron
---

# 使用ServerlessDesktop构建高性能Web站点详细教程
本教程可以帮助用户获得一个高性能的博客主站，并且提供ServerlessApi 调用
###  部署软件ServerlessDesktop安装
本次部署软件使用的是阿里云Serverless开发者工具 Serverless Devs 桌面客户端，大家可以通过 [ServerlessDevs官网](http://www.serverless-devs.com/) 获取,目前提供windows 和 mac 两个版本
​

![](https://img.alicdn.com/imgextra/i3/O1CN017uLxWG1toEUyYJtxz_!!6000000005948-2-tps-3572-1956.png#id=oFAVo&originHeight=1956&originWidth=3572&originalType=binary&ratio=1&status=done&style=none)


​

### 使用ServerlessDesktop 配置阿里云秘钥信息


应用打开后提示配置秘钥信息![](https://img.alicdn.com/imgextra/i4/O1CN01mFPHaH1UZhXOHQpt1_!!6000000002532-2-tps-2700-1830.png#id=bgi3I&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&status=done&style=none)


我们点击这行文字进行配置
​

![](https://img.alicdn.com/imgextra/i1/O1CN010p4Ghk207p8Otl1aE_!!6000000006803-2-tps-2700-1830.png#id=d4OZR&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&status=done&style=none)


可以看到这里需要我们填写4个关键信息， AccountID，AccessKeyId, AccessKeySecret 和秘钥别名
秘钥别名填写default即可。
剩下的三个配置获取方式如下：

- 注册阿里云账号（可以通过支付宝快捷注册）

![](https://img.alicdn.com/imgextra/i3/O1CN011veHuH1Pa5nRmVpBy_!!6000000001856-2-tps-3546-1958.png#id=sOTQx&originHeight=1958&originWidth=3546&originalType=binary&ratio=1&status=done&style=none)

- 获取accountId，注册之后 在阿里云官网右上角查看，复制账号ID

![](https://img.alicdn.com/imgextra/i2/O1CN012dc4ew1WUK7Vpogip_!!6000000002791-2-tps-3564-1952.png#id=NmqRm&originHeight=1952&originWidth=3564&originalType=binary&ratio=1&status=done&style=none)

- AK,SK 的获取
##### 点击控制台![](https://img.alicdn.com/imgextra/i2/O1CN01MemFSa1TccRgQowrj_!!6000000002403-2-tps-3582-1880.png#id=xiFkT&originHeight=1880&originWidth=3582&originalType=binary&ratio=1&status=done&style=none)
鼠标浮到右上角的小人头像上，展开的页面有AccessKey管理，点击这个。
![](https://img.alicdn.com/imgextra/i3/O1CN01h07vGA22wmQw1UBqu_!!6000000007185-2-tps-3564-1958.png#id=L1791&originHeight=1958&originWidth=3564&originalType=binary&ratio=1&status=done&style=none)
新用户需要新建一个AK,SK。点击"继续使用AccessKey"
![](https://img.alicdn.com/imgextra/i4/O1CN01SdOdfI1rsEjKYBBdk_!!6000000005686-2-tps-3570-1954.png#id=zW9nC&originHeight=1954&originWidth=3570&originalType=binary&ratio=1&status=done&style=none)
点击“创建AccessKey”![](https://img.alicdn.com/imgextra/i2/O1CN01C9ZN8e1esc3AJlyOP_!!6000000003927-2-tps-3570-1944.png#id=xP0cr&originHeight=1944&originWidth=3570&originalType=binary&ratio=1&status=done&style=none)


会提示让用户输入关联手机的验证码，获取验证码输入即可，最终得到AK,SK![](https://img.alicdn.com/imgextra/i1/O1CN01prtYM01OzS6qw3YA9_!!6000000001776-2-tps-3562-1926.png#id=qinyB&originHeight=1926&originWidth=3562&originalType=binary&ratio=1&status=done&style=none)
把他们复制到我们的 desktop里面即可![](https://img.alicdn.com/imgextra/i3/O1CN01LbS1Tr1d79ODX8mQh_!!6000000003688-2-tps-2700-1830.png#id=FP7Ib&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&status=done&style=none)
点击确定之后你就可以开启网站部署之旅了。![](https://img.alicdn.com/imgextra/i4/O1CN01dihTzB1Wc6qpl0rVG_!!6000000002808-2-tps-2700-1830.png#id=TFtDR&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&status=done&style=none)
### 站点部署
#### 选择 start-jamstack 应用模板, 点击“使用”,根据下面的动图指引操作
![](https://img.alicdn.com/imgextra/i4/O1CN017uMg9w1DH3wuf9zAC_!!6000000000190-1-tps-1345-909.gif#id=zAKDu&originHeight=909&originWidth=1345&originalType=binary&ratio=1&status=done&style=none)
恭喜你，你已经得到了一个jamstack站点
​

### 站点更新
因为本项目的开发需要依赖 nodejs环境，可以通过nodejs 官网安装最新稳定版本的nodejs
![](https://img.alicdn.com/imgextra/i3/O1CN018DdFjZ2AMc53fx0X4_!!6000000008189-2-tps-3546-1782.png#id=ZmAye&originHeight=1782&originWidth=3546&originalType=binary&ratio=1&status=done&style=none)


笔者的 nodejs 版本，和npm 版本如下![](https://img.alicdn.com/imgextra/i4/O1CN01FPMSmV1mOrFJ2GZan_!!6000000004945-2-tps-1130-678.png#id=xMr4N&originHeight=678&originWidth=1130&originalType=binary&ratio=1&status=done&style=none)
​

使用任意IDE打开源代码目录,笔者使用的vscode
下面给出具体的修改，构建，部署视频操作

- 1.通过 vscode 的终端入口进入 当前的 serverlessdevs-website 目录下，执行npm i

![](https://img.alicdn.com/imgextra/i4/O1CN01oBSsi31FFo62fFBrG_!!6000000000458-1-tps-1777-961.gif#id=zMWnr&originHeight=961&originWidth=1777&originalType=binary&ratio=1&status=done&style=none)

- 2.启动项目 npm start ，修改源码内容

![](https://img.alicdn.com/imgextra/i1/O1CN01pEYS3u1y4V1rEflyH_!!6000000006525-1-tps-1777-961.gif#id=Uaqxt&originHeight=961&originWidth=1777&originalType=binary&ratio=1&status=done&style=none)

- 3.执行构建 npm run build, 将源码进行编译

![](https://img.alicdn.com/imgextra/i1/O1CN01R0UhQu1TDt3gsWAFo_!!6000000002349-1-tps-1777-961.gif#id=wjeax&originHeight=961&originWidth=1777&originalType=binary&ratio=1&status=done&style=none)

- 4.重新打开ServerlessDesktop ，进入应用配置，重新执行部署

![](https://img.alicdn.com/imgextra/i2/O1CN01VuMumE1wQp6SbMeEo_!!6000000006303-1-tps-1777-961.gif#id=jQjYv&originHeight=961&originWidth=1777&originalType=binary&ratio=1&status=done&style=none)


### 动态API 部署
这部分需要依赖[阿里云函数计算产品](https://www.aliyun.com/product/fc?spm=5176.10695662.1112509.1.70384357R9ch0D) ， 我们需要开通一下（本身开通免费，并且产品有免费额度）
开通后可以访问一下我们[控制台](https://fcnext.console.aliyun.com/overview)，推荐大家使用新版，体验比较好
![](https://img.alicdn.com/imgextra/i4/O1CN01WLU8qJ1noKtRk44PT_!!6000000005136-2-tps-3464-1924.png#id=yRNte&originHeight=1924&originWidth=3464&originalType=binary&ratio=1&status=done&style=none)
#### 
打开ServerlessDesktop 进入配置中心，解除右边配置文件注释的api 部分，然后执行部署操作
![api注释掉](https://img.alicdn.com/imgextra/i1/O1CN010a1MJ21lUyvNM70JK_!!6000000004823-2-tps-2700-1830.png)
![](https://img.alicdn.com/imgextra/i3/O1CN019gKcNi1J9dDo8BbcO_!!6000000000986-1-tps-1356-914.gif#id=Klxh9&originHeight=914&originWidth=1356&originalType=binary&ratio=1&status=done&style=none)
​

执行完毕后注意保存最后得出的customerDomain![](https://img.alicdn.com/imgextra/i2/O1CN01bqIorg1qSIgZ5AvS5_!!6000000005494-2-tps-2742-1958.png#id=XTpCq&originHeight=1958&originWidth=2742&originalType=binary&ratio=1&status=done&style=none)
当然这个时候我们可以直接访问这个域名![](https://img.alicdn.com/imgextra/i4/O1CN01Ho4uI91lVtiWc4z5z_!!6000000004825-2-tps-3470-194.png#id=UYfaZ&originHeight=194&originWidth=3470&originalType=binary&ratio=1&status=done&style=none)
同时查看我们的函数计算云产品控制台，可以看到一个标准http函数已经被创建成功![](https://img.alicdn.com/imgextra/i1/O1CN01DKl2jX1eH3ZZItHlx_!!6000000003845-2-tps-3478-956.png#id=aIPeN&originHeight=956&originWidth=3478&originalType=binary&ratio=1&status=done&style=none)
把动态api 的域名替换掉 静态站点 的proxy配置,![](https://img.alicdn.com/imgextra/i4/O1CN01dSi7XT1d6EbBzi8cQ_!!6000000003686-2-tps-1356-914.png#id=pLmPM&originHeight=914&originWidth=1356&originalType=binary&ratio=1&status=done&style=none)
​

 恭喜你最后得到了一个 高性能的serverless 博客站点 [https://zhangsan01.resume.net.cn/](https://zhangsan01.resume.net.cn/)
​


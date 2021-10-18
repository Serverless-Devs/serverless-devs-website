---
title: 构建Serverless 化的restful api
keywords: Serverless,restful,api,Jamstack
description: 引导Serverless 化的restful api。
---
# 构建restful api

## 说明
restful api 是我们在日常生产中经常使用到的重要资源，本教程演示如何使用ServerlessDesktop 构建 restful api，本次教程演示使用 javascript语言，更多其他语言[点击查看](https://help.aliyun.com/document_detail/191345.html)
## 主体操作
该部分大约花费5分钟, 本项目源码地址 https://github.com/Serverless-Devs/restful-api-demo

### 应用选择
操作路由：Serverless Hub -> 搜索框搜索“dk”，找到 dk-http应用模板 下载使用

![dk-http应用模板](https://img.alicdn.com/imgextra/i1/O1CN01aWJdHQ1X9Xm6Z4Guo_!!6000000002881-2-tps-3584-2032.png)

![dk-http应用模板](https://img.alicdn.com/imgextra/i2/O1CN01XadYeo1bLgjzXCL4l_!!6000000003449-1-tps-1777-951.gif)


### 应用项目结构简介

![dk-http应用模板](https://img.alicdn.com/imgextra/i4/O1CN01B5uUdi1D1wtTtDiyM_!!6000000000157-2-tps-3584-2032.png)

在执行部署之前，我们不妨可以在IDE中打开应用，看一下项目的结构，可以看到我们整体的项目结构比较简单，就是一个配置文件s.yaml 加上一个 源码目录 code，打开code/index.js 之后是前端同学比较熟悉的 [koa](https://koa.bootcss.com/) 路由风格，每一个路径都可以对应一个restful 的请求

### 部署测试
接下来我们可以直接做一下部署
![dk-http应用模板](https://img.alicdn.com/imgextra/i2/O1CN01WfcTGt28sYTzscbMX_!!6000000007988-1-tps-1777-951.gif)

注意上面针对这个应用模板有两个前置操作
+ 添加一个 前置的 action ，指令设置为 `npm i` 路径指向 `./code`
+ 修改服务名 dk-service -> dk-service-test

然后再点击“执行"部署，可以看到很快我们就部署成功，并且得到一个可以访问的http域名,接下来我们继续对代码进行改进来看看效果。在本地调试修改代码的时候有个非常
实用的技巧，就是启动 ```npm run serve``` 沙盒环境，这样大大提高本地开发的效率。

![dk-http应用模板](https://img.alicdn.com/imgextra/i3/O1CN01Mdhn871JF7z0xGRM6_!!6000000000998-1-tps-1777-951.gif)

完整的 resetful api 开发完毕
![dk-http应用模板](https://img.alicdn.com/imgextra/i1/O1CN01qbTlc91Vzdau7X5xa_!!6000000002724-2-tps-3584-2032.png)

接下来使用postman我们做一个本地测试
![dk-http应用模板](https://img.alicdn.com/imgextra/i1/O1CN01sGBWhP1cW3JzgUHfn_!!6000000003607-2-tps-1777-951.png)

可以看到，增，删，改，查 操作已经全部OK，接下来我们再做一个部署，然后对线上接口再进行一遍测试

![dk-http应用模板](https://img.alicdn.com/imgextra/i3/O1CN01RZkJ931exePz1LWDe_!!6000000003938-1-tps-1777-951.gif)

至此已经完成一个完成的 restful api示例

## 如何调试？
请参考[《端云调试部分》](/zh-cn/docs/desktop/debug.html)
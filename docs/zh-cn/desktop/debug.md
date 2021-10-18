---
title: ServerlessDevs 端云调试
keywords: Serverless Devs 源规范
description: ServerlessDevs 端云调试。
---

## 说明
Serverless 应用开发 目前在调试上有比较大的困难，目前看大部分的云商服务其 函数运行空间对于用户是黑盒的，为了解决黑盒调试的问题，我们推出了端云调试的功能，方便广大开发者对自己的线上应用进行仿真调试，为了让开发者使用 本地ide 对线上的代码进行debug，并且不影响线上环境，ServerlessDevs 做了一些创新，本篇以阿里云函数计算为例，来演示一下如何对函数进行端云调试，目前端云调试支持语言为python以及javascript，本次演示示例为javascript

## 基本原理
[《原理说明》](https://github.com/devsapp/fc/blob/main/docs/Usage/proxied.md#%E7%AE%80%E4%BB%8B%E4%B8%8E%E5%8E%9F%E7%90%86)
## 操作说明
以refulapi 为例，[(如何创建restfulapi?)](/zh-cn/docs/best-practice/restful.html), 进入到 restfulapi应用 的工作空间/应用详情
### 端云调试前置条件：

+ 安装并启动[docker](https://www.docker.com/);
+ 开通 [阿里云镜像服务 acr](https://www.aliyun.com/product/acr?spm=serverlessdevs)

### 初始化环境

在 端云调试/云端资源及环境准备 面板点击“启动资源准备”(请确保3001端口没被占用)
![serverless devs](https://img.alicdn.com/imgextra/i1/O1CN01vGPJN01VQpUmc5G5E_!!6000000002648-2-tps-3584-2032.png)

出现“End of method: proxied” 成功结束
![serverless devs](https://img.alicdn.com/imgextra/i2/O1CN01utW2rr1wKPZLNixnY_!!6000000006289-2-tps-3584-2032.png)

### 调试开始
切换到“本地调试配置”面板，首先打开 vscode编辑器，并启动调试模式，在同时打上断点
![serverless devs](https://img.alicdn.com/imgextra/i4/O1CN01lqlVP21cXQVjLSrGZ_!!6000000003610-2-tps-3584-2032.png)
点击“发起调用”
![serverless devs](https://img.alicdn.com/imgextra/i2/O1CN01HGo3op1sHQWiLCb09_!!6000000005741-1-tps-1777-951.gif)

可以看到请求发起到达 debug断点


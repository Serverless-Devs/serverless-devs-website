---
slug: new-serverless-devs-output-format
title: 命令行工具升级：不仅仅是更多的Emoji 
author: Anycodes
author_title: Serverless Devs
author_url: https://github.com/anycodes
author_image_url: https://avatars.githubusercontent.com/u/21079031?v=4
tags: [命令行, Serverless, 输出格式]
date: 2021-05-18
---

# 命令行工具升级：不仅仅是更多的Emoji 

安装完一个工具，第一步做什么？敲一下工具的名称，看看这个工具的“葫芦里卖的什么药”：

![image](https://user-images.githubusercontent.com/21079031/118627195-182b5000-b7fe-11eb-8f27-5fd1edc826b9.png)

在这个页面我们做了这样几个事情：
1. 提供了一个极客的logo：serverless
2. 提供了工具的简介，并提供了部分的url入口：包括Documents、Discussions、Issues
3. 提供了快速入门的指令：`🍻 Can perform [s init] fast experience`
4. 提供了指令说明，包括自定义命令，例如：` 👉 This is a customer command please use [s fc-deploy-test -h]  obtain the documentation`

当我们入门执行`s init`之后，你会发现：

![image](https://user-images.githubusercontent.com/21079031/118630218-ea93d600-b800-11eb-8e63-b635e5ae2c5b.png)

我们提供了：Hello World Example、Web Framework Example、Static Website、Serverless Dev template等十余个案例的模板，如果觉得这些模板不够有趣，还可以直接使用已有的模板。那么问题来了，已有的模板在哪里看呢？

当然，在这个页面已经告诉大家了：`🚀 More: https://github.com/Serverless-Devs/package-awesome`

So.... 我们可以初始化一个，假如说，我们要初始化一个`zblog-example`: 

![image](https://user-images.githubusercontent.com/21079031/118630392-11eaa300-b801-11eb-98a0-0210c7ae6fc8.png)

不要惊慌，仔细看一下错误信息：`No application found?`，下面附带了几个解决方案：

```
   1️⃣  Start quickly with 's init'
   2️⃣  See some cases on GitHub: https://github.com/Serverless-Devs/package-awesome
   😬 Give us an issue to solve: https://github.com/Serverless-Devs/Serverless-Devs/issues
```

Get新技能，打开` https://github.com/Serverless-Devs/package-awesome`搜索一下`zblog`，发现`zblog`案例叫做`start-zblog`，果然名字不能瞎猜，要看文档，接下来`s init start-zblog`，爽歪歪 ....

![image](https://user-images.githubusercontent.com/21079031/118630733-64c45a80-b801-11eb-8e77-7e0bf18c5e70.png)

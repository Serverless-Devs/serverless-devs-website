---
slug: serverless-devs-static-website-and-cd
title: Serverless Devs的官网是通过Serverless Devs部署的
author: Anycodes
author_title: Serverless Devs
author_url: https://github.com/anycodes
author_image_url: https://avatars.githubusercontent.com/u/21079031?v=4
tags: [命令行, Serverless, 官网]
---

# Serverless Devs的官网是通过Serverless Devs部署的

只有自己吃自己的狗粮，自己做的东西才不“🐶”。Serverless Devs自发展之处到现在，已经经历了几个月的时间，在这几个月，Serverless Devs的成长是迅速的，这很大一部分的原因是“我们在吃自己的狗粮”，我们相信，如果自己都用不爽的东西，大家一定很难用的起来。

今天这篇文章，是一个关于Serverless Devs官网建设的文章，文章很简单，也很有趣。

## Serverless Devs与Docusaurus

众所周知，开源项目的官网不宜太复杂，其实简简单单的就好，所以我们经过了很长时间的对比，最终选择了Docusaurus作为官网的框架选型。那么问题来了，我们选型结束之后，我们要如何来建设官网？

经过一些简单的调研，我们决定用Serverless Devs建设Serverless Devs官网，并将其部署到Serverless架构上，很绕嘴是吧？但是，这个过程却真的很“经典”：

我们通过Serverless devs初始化了Docusaurus：`s init devsapp/website-docusaurus`，这一部分可以参考文档：https://github.com/devsapp/website-example

讲真，虽然也就是一行代码的事情，但是整个初始化还是比较“赏心悦目”的，作为一个Serverless应用全生命周期的工具，Serverless Devs在脚手架和引导层面还是下了很多功夫的：

![image](https://user-images.githubusercontent.com/21079031/118791385-3f028880-b8c9-11eb-8369-126f2576dfa9.png)

可以看到，初始化的时候，系统引导式的让我们填写了项目名，存储桶名，以及需要的密钥信息，同时完成之后，还告诉我们：

```
You could [cd /Users/jiangyu/Desktop/start-fc/website/serverless-website] and enjoy your serverless journey!
```

感觉还是很贴心的。

接下来，按照指引：

![image](https://user-images.githubusercontent.com/21079031/118791648-7e30d980-b8c9-11eb-9667-8cb9f1345bfe.png)

可以看到帮助文档：

![image](https://user-images.githubusercontent.com/21079031/118791706-8a1c9b80-b8c9-11eb-8e62-b570a640ba6c.png)

当执行`s website-starter -h`之后，首次运行帮助信息，可能涉及到组件加载过程，稍等片刻，可以看到帮助信息：

![image](https://user-images.githubusercontent.com/21079031/118792626-6b6ad480-b8ca-11eb-8523-de2d189c3a8e.png)

此时，我们要将项目部署到线上，只需要执行`s deploy`即可。

当然，我们还需要对项目进行一定的配置，以及对我们的官网进行一定的建设。

关于网站建设，可以参考Docusaurus的官网文档，关于Serverless Devs的website组件配置，可以参考上图给我们`🧭  More information: https://github.com/devsapp/website`：

![image](https://user-images.githubusercontent.com/21079031/118792932-b4228d80-b8ca-11eb-8028-e1329b6a01b4.png)

在文档中可以了解更多的配置内容，最终生成我们的`s.yaml`：

```yaml
edition: 1.0.0
access: website_access

services:
  website:
    component: devsapp/website
    actions:
      pre-deploy:
        - run: npm install
          path: ./
        - run: npm run build
          path: ./
    props:
      bucket: serverless-devs-website
      src:
        codeUri: ./
        publishDir: ./build
        index: index.html
        subDir:
          type: index
      region: cn-hongkong
```

## CD与Serverless Devs

当我们建立好了网站页面，在本地也可以正常运行，通过本地的`s deploy`也可以顺利部署了，这个时候面临了新的问题：我如何更新我的网站？每次都要手动的在本地发布么？是否可以利用Github Action，接入自动化的能力呢？

所以：

1. 我创建了一个仓库：https://github.com/Serverless-Devs/website
2. 我将代码推送到仓库之后，创建了一个Github Action的配置：

```
name: Website Publish

on:
  push:
    branches: [ master ]

jobs:
  publish-website:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: npm install
      - run: npm install -g @serverless-devs/s
      - run: s config add --AccountID ${{secrets.ALIYUN_ACCOUNT_ID}} --AccessKeyID ${{secrets.ALIYUN_ACCESS_KEY_ID}} --AccessKeySecret ${{secrets.ALIYUN_ACCESS_KEY_SECRET}} -a website_access
      - run: s deploy
```

此时我再`push`代码，就可以自动将网站发布出来了。

这里面的核心点：

1. 安装Serverless Devs： `run: npm install -g @serverless-devs/s`
2. 配置密钥信息：`run: s config add --AccountID ${{secrets.ALIYUN_ACCOUNT_ID}} --AccessKeyID ${{secrets.ALIYUN_ACCESS_KEY_ID}} --AccessKeySecret ${{secrets.ALIYUN_ACCESS_KEY_SECRET}} -a website_access`
3. 部署：`run: s deploy`

整个效果：

![image](https://user-images.githubusercontent.com/21079031/118793762-7b36e880-b8cb-11eb-8b97-e7d5affc88b9.png)

部署后的页面：

![image](https://user-images.githubusercontent.com/21079031/118793811-8853d780-b8cb-11eb-89bb-cc0beabdbb00.png)

> 这里要说明，此处配置密钥信息，使用了Github的Secrets功能，这个功能还是比较基础的，所以不多赘述，主要就是将发布的所需要的密钥信息配置到Secrets里面。

## 总结

其实，目前来说很多人的博客，部分的官网都是通过静态网站等进行部署，通过Serverless Devs走这一套还是比较方便的：

1. 得益于Serverless Devs的行为描述，我们可以更简单的将`npm install`，`npm run build`等指令集成到项目中；
2. 得益于Serverless Devs的引导能力，包括创建，入门，以及密钥配置时的获取链接，Serverless devs确实在不断的从细节出发，为便利而努力；
3. 得益于Serverless Devs的灵活性，只需要两三行代码，就可以配置出Github的CD能力，将网站持续发出去，我觉得这个还是挺爽的；

当然，目前来看还是有一些问题等待去做的：
1. Serverless Devs的场景还是有待丰富的；
2. 这个社区官网只有CD，没有CI其实还是有一定风险的，要慢慢的完善起来；


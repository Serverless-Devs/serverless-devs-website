---
slug: gitee-gitee-go-serverless-devs-ci-cd
title: 通过Gitee+Serverless Devs快速实现函数代码更新与版本发布
author: Anycodes
author_title: Serverless Devs
author_url: https://github.com/anycodes
author_image_url: https://avatars.githubusercontent.com/u/21079031?v=4
tags: [命令行, Serverless, CICD, 原子化操作, 阿里云]
date: 2021-07-2
---

# 通过Gitee+Serverless Devs快速实现函数代码更新与版本发布

在上一篇文章中，我们介绍了如何通过Github + Github Action进行单纯的代码更新以及版本发布，在本篇文章中，将会分享如何通过Gitee + Gitee Go实现：
1. 单纯更新函数代码
2. 进行版本发布

## 实践准备

首先，我们在开始正式实践之前，我们要做几个事情：
1. 安装Serverless开发者工具
2. 部署一个函数到线上

### 安装Serverless开发者工具

通过 [npm](https://www.npmjs.com/) 包管理安装：适用于已经预装了 npm 的 Windows、Mac、Linux 平台。在 Windows、Mac、Linux 平台执行以下命令安装 Serverless Devs Tool工具。

```shell script
$ npm install @serverless-devs/s -g
```
或者 通过 [yarn](https://yarnpkg.com/) 进行安装

```shell script
$ yarn global add @serverless-devs/s
```

> **说明**:   
> - 如果在 Linux 或 MacOS 下执行该命令报错且报错信息为 `未找到命令`，请执行命令 `ln -s serverless-devs安装位置 /usr/bin`，serverless-devs安装位置可以通过`find / -name s` 查找。   
> - 如果在 Linxu 下执行该命令报错且报错信息为 `Error: EACCES: permission denied`，请执行命令 `sudo npm install @serverless-devs/s -g`。   
> - 如果安装过程较慢，可以考虑使用淘宝 npm 源，安装命令为 `npm --registry=https://registry.npm.taobao.org install @serverless-devs/s -g`。

### 部署一个函数到线上

1. 在本地初始化一个基于nodejs运行时的koa项目

```
s init nodejs-koa
```

初始化的时候会让我们填写相关内容，例如项目目录，选择密钥等：

![image](https://user-images.githubusercontent.com/21079031/124715032-17c55080-df35-11eb-867d-f1e8eec12ccc.png)

如何配置阿里云密钥信息，可以参考：http://www.serverless-devs.com/docs/provider-config/alibabacloud

2. 进入到项目目录，并进行部署操作：

![image](https://user-images.githubusercontent.com/21079031/124715149-3cb9c380-df35-11eb-8d90-41fbacb9e5eb.png)

稍等片刻，即可看到项目已经完成部署：

![image](https://user-images.githubusercontent.com/21079031/124715442-991ce300-df35-11eb-8069-8555148aeaae.png)

我们打开项目页面：

![image](https://user-images.githubusercontent.com/21079031/124715707-dd0fe800-df35-11eb-89df-f271f57e410d.png)

至此，我们的准备环节完成。


## 基于Gitee的CD能力建设

在这一步，我们需要做几个事情：

1. 有一个Gitee仓库
2. 在仓库中push我们的代码
3. 配置环境变量
4. 开启Gitee Go
5. 更新代码

## Gitee仓库的准备

创建一个Gitee仓库：

![image](https://user-images.githubusercontent.com/21079031/124716206-632c2e80-df36-11eb-97b0-9a6f665b06c4.png)

## push代码到仓库

![image](https://user-images.githubusercontent.com/21079031/124716448-ab4b5100-df36-11eb-8054-9d4150c35c86.png)

推送后：

![image](https://user-images.githubusercontent.com/21079031/124716480-b4d4b900-df36-11eb-9d08-6acdfab31567.png)

## 配置环境变量

此时，我们将阿里云的密钥等信息配置到环境变量：

![image](https://user-images.githubusercontent.com/21079031/124716639-e5b4ee00-df36-11eb-9dc8-cf2d8eb30e51.png)

例如配置：

![image](https://user-images.githubusercontent.com/21079031/124719394-aa67ee80-df39-11eb-84ad-944ccf0486ba.png)

配置后的效果：

![image](https://user-images.githubusercontent.com/21079031/124719496-c9ff1700-df39-11eb-8ef6-4ccae28caefc.png)

## 开启Gitee Go

此时开启Gitee Go：

![image](https://user-images.githubusercontent.com/21079031/124719913-367a1600-df3a-11eb-9aa6-73b34b9211d7.png)

然后：

![image](https://user-images.githubusercontent.com/21079031/124719958-3da12400-df3a-11eb-8e3d-cf530b90591d.png)


点击创建流水线，并输入流水线内容：

![image](https://user-images.githubusercontent.com/21079031/124720074-56a9d500-df3a-11eb-8a47-beca02818d1b.png)

流水线文件名：`deploy.yml`

流水线配置：

```
name: koa-cicd
displayName: 'KOA自动部署流水线'
triggers:                                  # 流水线触发器配置
  push:                                    # 设置 master 分支 在产生代码 push 时精确触发（PRECISE）构建
    - matchType: PRECISE
      branch: master
commitMessage: ''                          # 通过匹配当前提交的 CommitMessage 决定是否执行流水线
stages:                                    # 构建阶段配置
  - stage:                                 # 定义一个 ID 标识为 deploy-stage ,名为「 Deploy Stage 」的阶段
      name: deploy-stage
      displayName: 'Deploy Stage'
      failFast: false                      # 允许快速失败，即当 Stage 中有任务失败时，直接结束整个 Stage

      steps:                               # 构建步骤配置
        - step: npmbuild@1                 # 采用 npm 编译环境
          name: deploy-step                # 定义一个 ID 标识为 deploy-step ,名为「 Deploy Step 」的阶段
          displayName: 'Deploy Step'
          inputs:                          # 构建输入参数设定
            nodeVersion: 14.15             # 指定 node 环境版本为 14.15
            goals: |                       # 安装依赖，配置相关主题、部署参数并发布部署
              node -v
              npm -v
              npm install -g @serverless-devs/s
              s config add --AccountID $ACCOUNTID --AccessKeyID $ACCESSKEYID --AccessKeySecret $ACCESSKEYSECRET -a default
              cd src && npm install
              s cli fc-api updateFunction --region cn-hangzhou --serviceName koademo --functionName http-trigger-function --code '{"zipFile":"./"}'
              s cli fc-api publishVersion --region cn-hangzhou --serviceName koademo
```


其实核心部分只有5句话：

```
npm install -g @serverless-devs/s
s config add --AccountID $ACCOUNTID --AccessKeyID $ACCESSKEYID --AccessKeySecret $ACCESSKEYSECRET -a default
cd src && npm install
s cli fc-api updateFunction --region cn-hangzhou --serviceName koademo --functionName http-trigger-function --code '{"zipFile":"./"}'
s cli fc-api publishVersion --region cn-hangzhou --serviceName koademo
```

1. `npm install -g @serverless-devs/s`: 安装Serverless Devs工具
2. `s config add --AccountID $ACCOUNTID --AccessKeyID $ACCESSKEYID --AccessKeySecret $ACCESSKEYSECRET -a default`: 根据刚才配置的环境变量，取环境变量内容配置密钥
3. `cd src && npm install`: 进入src目录，并安装依赖
4. `s cli fc-api updateFunction --region cn-hangzhou --serviceName koademo --functionName http-trigger-function --code '{"zipFile":"./src/"}' `: 更新函数代码
5. `s cli fc-api publishVersion --region cn-hangzhou --serviceName koademo `: 发布函数版本

## 更新代码

此时，我们可以对Index.js内容进行更改：

![image](https://user-images.githubusercontent.com/21079031/124720548-d8016780-df3a-11eb-9412-ef25bdadcf03.png)

然后保存，稍等片刻，可以在流水线中看到这个发布流程：

![image](https://user-images.githubusercontent.com/21079031/124720637-ee0f2800-df3a-11eb-8e7b-67cab4a78900.png)

此时，我们可以点到流程中查看详情：

![image](https://user-images.githubusercontent.com/21079031/124721010-4e9e6500-df3b-11eb-8dd0-7397aaa2444e.png)

稍等片刻，可以看到CD流程完成：

![image](https://user-images.githubusercontent.com/21079031/124722870-0d0eb980-df3d-11eb-8442-6544c30881a7.png)

完成之后，我们可以点击查看线上的代码：

![image](https://user-images.githubusercontent.com/21079031/124734004-4fd58f00-df47-11eb-860e-787d44224954.png)


# 总结

基于Serverless架构进行项目开发，与CI/CD的集成，搞定自动化发布等是必不可少的“课程”，希望通过本文，读者可以对相关的流程有进一步的思路，可以应用到自己的项目中。

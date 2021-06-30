---
slug: serverless-devs-and-serverless-blog
title: 简单几步完成Serverless架构下的Blog建设
author: Anycodes
author_title: Serverless Devs
author_url: https://github.com/anycodes
author_image_url: https://avatars.githubusercontent.com/u/21079031?v=4
tags: [命令行, Serverless, 博客建设]
date: 2021-05-20
---

# 简单几步完成Serverless架构下的Blog建设

## 前言

在日常生活中，我们经常需要记录一些自己的日常，包括一些想法、状态，或者是学习的某些技术，这个时候，就需要有一个博客系统来满足需求。但是无论是自己开发的博客系统，还是用已经开源的博客软件或者一些CMS系统，只要涉及到自己搭建博客功能，就离不开服务器等云资源，涉及到服务器、数据库等云资源，就势必离不开成本的支出，包括资金成本和运维成本等。此时，如果可以有一个可以保证博客安全、稳定、高性能的同时，又能低运维、低成本的运行博客的云端服务/云产品，显得尤为重要。而随着Serverless架构越来越火热，其按量付费，弹性伸缩... 等很多优质特性，都让人眼前一亮，不得惊叹云计算为我们带来的便利，也让很多人逐渐的开始思考，自己的项目应该如何和Serverless架构有交集，或者如何让Serverless为自己的项目赋能，体验Serverless架构带来的技术红利。

一个博客对于一个人而言可能会承载很多事情，尤其是一个技术博客对于一个程序员而言，不仅仅是自己学习、成长的见证，也是自己的工作、生活的一个见证，甚至在很多的技术面试过程中，拥有一个自己的技术博客都是一个非常不错的加分项。但是传统意义上的很多研发同学建设的技术博客都会面临服务器的问题，因为技术博客往往并没有太大的流量，也很难产生很大的收入，单纯为了自己的兴趣、爱好来购买服务器，并且进行一些后期运维工作，在成本支出、精力支出上确实不太合适。所以基于Serverless架构的博客系统就显得非常重要了，因为基于Serverless架构建设的博客系统，不仅仅可以体验学习进技术，也可以直接得到Serverless架构带来的技术红利

## 安装Serverless Devs开发者工具

通过 [npm](https://www.npmjs.com/) 包管理安装：适用于已经预装了 npm 的 Windows、Mac、Linux 平台。在 Windows、Mac、Linux 平台执行以下命令安装 Serverless Devs Tool工具。

```shell script
$ npm install @serverless-devs/s -g
```
或者 通过 [yarn](https://yarnpkg.com/) 进行安装

```shell script
$ yarn global add @serverless-devs/s
```


> **说明**:   
> - 如果在 Linux 或 MacOS 下执行该命令报错且报错信息为 Error: EACCES: permission denied，请执行命令 sudo npm install @serverless-devs/s -g。   
> - 如果安装过程较慢，可以考虑使用淘宝 npm 源，安装命令为 npm --registry=https://registry.npm.taobao.org install @serverless-devs/s -g。

## 快速部署博客系统

Serverless devs提供了多种类型的博客系统：
- Zblog
- Wordpress
- Hexo
- Vuepress
- Django Blog

> 在部署过程中可能需要获取阿里云密钥信息，可以参考：https://config.devsapp.net/account/alibaba

### Zblog

Zblog是一款轻量级的PHP开源框架，拥有独立的后台管理能力，支持Sqlite和Mysql等数据库。    
使用该博客系统涉及到阿里云函数计算、容器镜像、硬盘挂载等产品。

部署流程：

- 初始化一个模版项目：`s init devsapp/start-zblog`
- 进入项目：`cd start-zblog`
- 部署项目：`s deploy`

### Typecho

Typecho是一款PHP开源框架，拥有独立的后台管理能力，支持Sqlite和Mysql等数据库。    
使用该博客系统涉及到阿里云函数计算、容器镜像、硬盘挂载等产品。

部署流程：

- 初始化一个模版项目：`s init devsapp/start-typecho`
- 进入项目：`cd start-typecho`
- 部署项目：`s deploy`

### Wordpress

Wordpress是一款PHP开源框架，拥有独立的后台管理能力，支持Mysql等数据库。    
使用该博客系统涉及到阿里云函数计算、容器镜像、硬盘挂载等产品。

部署流程：

- 初始化一个模版项目：`s init devsapp/start-wordpress`
- 进入项目：`cd start-wordpress`
- 部署项目：`s deploy`

### Hexo

Hexo是一款轻量级的前端开源框架。    

#### 部署到函数计算

针对该博客系统，您可以选择把他部署在函数计算上，涉及到阿里云函数计算、容器镜像、硬盘挂载等产品。

部署流程：

- 初始化一个模版项目：`s init devsapp/start-hexo`
- 进入项目：`cd start-hexo`
- 部署项目：`s deploy`


#### 部署到对象存储

您也可以选择把他部署在对象存储上，涉及到阿里云函数计算、对象存储、CDN等产品。

部署流程：

- 初始化一个模版项目：`s init devsapp/website-hexo`
- 进入项目：`cd website-hexo`
- 部署项目：`s deploy`

### Vuepress

Vuepress可以作为一款轻量级的前端博客系统。     
使用该博客系统涉及到阿里云函数计算、对象存储、CDN等产品。

部署流程：

- 初始化一个模版项目：`s init devsapp/website-vuepress`
- 进入项目：`cd website-vuepress`
- 部署项目：`s deploy`

### Django Blog

Django Blog是一款基于Python Django框架编写的博客系统，拥有独立的后台管理能力，支持Sqlite和Mysql等数据库。    
使用该博客系统涉及到阿里云函数计算、容器镜像、硬盘挂载等产品。

部署流程：

- 初始化一个模版项目：`s init devsapp/django-blog`
- 进入项目：`cd django-blog`
- 部署项目：`s deploy`

默认信息：

- 默认登录后台：`/admin`
- 默认账号：`blog`
- 默认密码：`myblog12345!`

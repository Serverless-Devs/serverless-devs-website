---
slug: yunxiao-dotNET-serverless-devs-ci-cd
title: 云效+Serverless Devs快速实现.NET5函数计算代码更新
author: GotzeWong
author_title: Serverless Devs
author_url: https://github.com/GotzeWong
author_image_url: https://avatars.githubusercontent.com/u/7664030?s=400&u=2f76225e0bbe1b735d6f3552498266c20025282e&v=4
tags: [命令行, Serverless, OSS, CICD]
date: 2021-07-13
---

# Serverless Devs实现.NET5函数计算云效CI/CD实践案例

笔者在Serverless Devs技术大牛们帮助下，成功实现了云效+Serverless Devs发布.NET5 Web API到函数计算。下文将对流水线开发的流程进行分享，希望能够抛砖引玉，给大家提供一些思路和避免一下坑。本文基于已创建好Custom Runtime的函数计算前提下，具体创建流程可参考阿里云官网。本文云效流水线主要流程如下：

**Git Clone** -> **Build** -> **Zip** -> **OSS Upload** -> **Serverless Deploy Function**

由于本文Web API使用了ABP Framework，因此编译后文件在压缩前已经超过100Mb限制，选择使用OSS方式部署。


## 一、构建


1. Build


因为FC暂时不支持.NET5 Runtime，因此选择Custom Runtime并选择self-contained部署。

```
dotNET restore $BUILD_PATH

dotNET publish $BUILD_PATH --runtime linux-x64 --framework NET5.0 --self-contained true -c Release -o out

```
2. 重命名

函数计算冷启动Custom Runtime时，会默认调用bootstrap文件启动您自定义的HTTP Server。详情见函数计算Custom Runtime[基本原理](https://help.aliyun.com/document_detail/132044.html?spm=5176.21213303.J_6028563670.22.537d3edaSzOPvs&scm=20140722.S_help%40%40%E6%96%87%E6%A1%A3%40%40132044.S_0.ID_132044-RL_bootstrap-OR_s%2Bhelpproduct-V_1-P0_3#title-f3l-xma-ffg)。

```
mv out/$PROJECT_NAME out/bootstrap

```
3. 压缩代码包

安装zip并压缩编译后的文件。
```
# 
apt-get update
apt-get install zip unzip
cd out && zip -qr $PROJECT_NAME.zip .
```

## 二、OSS上传

使用官方oss cli-ossutil传输代码包到oss。 

1. 下载部署包

```
curl -L $PACKAGE -o /tmp/down.tgz

tar -C /tmp -xzf /tmp/down.tgz
```

2. 安装和配置ossutil命令行工具

```
wget http://gosspublic.alicdn.com/ossutil/1.7.5/ossutil64

chmod 755 ossutil64
```
3. 配置OSS

```
ossutil config [-e endpoint] [-i id] [-k key] [-t token] [-L language] [--output-dir outdir] [-c file]
```
4. 上传OSS

```
ossutil cp /tmp/$PROJECT_NAME.zip oss://$OSS_BUCKET [-c file]
```


## 三、发布FC

### update Function

在笔者使用时，云效目前Serverless devs版本为2.0.50，而新版本已经是2.0.67。
0. 查看版本
```
s -v
```
而云效默认Serverless devs版本没法正常执行`s cli fc-api updateFunction`，因此需要自行更新CLI版本。

1. 版本升级

```
curl -o- -L http://cli.so/install.sh | bash
```

2. 配置serverless

```
s config add --AccountID [AccountID] --AccessKeyID [AccessKeyID] --AccessKeySecret [AccessKeySecret] -a [alias]
```

3. 更新函数

```
s cli fc-api updateFunction --access [alias] --region [region] --serviceName [Service Name] --functionName [Function Name] --code '{"ossBucketName": "", "ossObjectName": ""}'
```

## 总结

基于Serverless架构集成云效 CI/CD，搞定自动化部署，轻松实现一键发布。希望通过本文，能够对.NET 开发者有所帮助。笔者云开发时间不长，针对文中部署步骤有更好的建议，欢迎分享探讨。


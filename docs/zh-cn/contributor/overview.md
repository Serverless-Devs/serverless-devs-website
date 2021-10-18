---
title: 如何成为贡献者
keywords: Serverless Devs, Serverless,阿里云
description: 如何成为贡献者
---

## 如何成为贡献者
您可以通过创建 【应用模板】，创建【组件模板】，以及参与【Serverless Devs Cli】 内核开发来成为我们的贡献者。
### 相关开发内容文档
+ [组件开发视频介绍](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/video.mov)

## 应用模板

### 初始化应用模板
您可以通过`s init`指令，选择对应的`application`，初始化应用模板

-----
下面是应用模板的例子

```yaml
# 完整的是一个应用
edition: 1.0.0 
name: FullStack 
access: xxx-account1

services:
  nextjs-portal:
    component: fc # 这个fc是一个组件
    props:
      src: ./frontend_src
      url: ${backend.output.url}
    actions:
      pre-deploy:
        - plugin: plugin-name # 这是一个插件，这执行deploy之前会执行
```


### 应用模板（Application）开发规范

以下开发规范仅是测试版的规范（但是之后的规范会兼容这套规范），规范会在后期不断完善，也期待您可以给我们更多的意见、建议。

项目目录必须遵守以下格式：

```
|- src # 目录名字不可变更
|   └── 应用目录  
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```
#### publish.yaml

这个文件时项目的描述文档。系统将会在您发布资源的时候，读取该文档并且进行相关信息的录入，请您务必认真填写。

```yaml
Type: Application
Name: 名称
Provider:
  - 云厂商名称 # Alibaba/Baidu/Huawei/AWS/Google Cloud/Azure/Vercel/Tencent
Version: 版本，例如0.0.1
Description: 
  zh: 简短的描述/介绍
  en: English
HomePage: 项目首页地址
Tags: #标签详情
  - zh: 部署函数
    en: English
Category: 分类 # 基础云服务/Web框架/Web应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
Service: # 使用的服务
  - Name: 服务名 # 函数计算/容器服务/镜像服务/消息队列/工作流/CDN/对象存储/表格存储/MNS/日志服务/API网关/数据库/解析服务/云应用/其他
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限权限
      - zh: 创建函数 # 所需要的权限
        en: English
```

部分参数取值范围：

* 云厂商：
    ```阿里云, 百度智能云, 华为云, 腾讯云, AWS, Azure, Google Cloud, /其它```
    
* 分类：
    ```基础云服务, Web框架, 全栈应用, 人工智能, 音视频处理, 图文处理, 监控告警, 大数据, IoT, 新手入门, 其他```
    
* 云厂商：
    ```函数计算, 容器服务, 镜像服务, 消息队列, 工作流, CDN, 对象存储, 表格存储, MNS, 日志服务, API网关, 数据库, 解析服务, 云应用, 其他```
    
* 运行时：
    ```Node.JS, Python, PHP, Java, Go, 其它```

##### readme.md

这个文件是项目的简介，您可以通过这部分，为您的项目写一份完整的描述文档，这样大家在使用您的项目的时候，才可以更加简单，轻松快速的用的起来。

##### version.md

这个版本升级的描述文档，可以在这个文档介绍版本升级的内容

### 提交合并请求

应用模板开发完毕，测试完毕之后，请
在Serverless Devs 应用仓库https://github.com/devsapp/start-application/issues 提交请求， 附上应用功能说明，以及git 仓库地址

## 组件模板
### 初始化组件模板
您可以通过`s init`指令，选择对应的`component`，初始化组件模板

### 组件开发规范

以下开发规范仅是测试版的规范（但是之后的规范会兼容这套规范），规范会在后期不断完善，也期待您可以给我们更多的意见、建议。

项目目录必须遵守以下格式：

```
|- src # 目录名字可以变更
|   └── 代码目录  
|- package.json: 需要定义好main   
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```
#### publish.yaml

这个文件时项目的描述文档。系统将会在您发布资源的时候，读取该文档并且进行相关信息的录入，请您务必认真填写。

```yaml
Type: Component
Name: 名称
Provider:
  - 云厂商名称 
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: 分类 # 基础云服务/Web框架/Web应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
Service: # 使用的服务
  - Name: 服务名 # 函数计算/容器服务/镜像服务/消息队列/工作流/CDN/对象存储/表格存储/MNS/日志服务/API网关/数据库/解析服务/云应用/其他
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限描述
      - 创建函数 # 所需要的权限
Commands: # 指令，格式为指令：指令描述，例如：
  deploy: 部署函数
  invoke: 调用函数
Properties:
  Region: # 参数
    Description: 参数描述
    Required: true # 参数必选，true/false
    Type: # 参数类型
      - String
```

部分参数取值范围：

* 云厂商：
    ```阿里云, 百度智能云, 华为云, 腾讯云, AWS, Azure, Google Cloud, 其它```
    
* 分类：
    ```基础云服务, Web框架, 全栈应用, 人工智能, 音视频处理, 图文处理, 监控告警, 大数据, IoT, 新手入门, 其他```
    
* 云厂商：
    ```函数计算, 容器服务, 镜像服务, 消息队列, 工作流, CDN, 对象存储, 表格存储, MNS, 日志服务, API网关, 数据库, 解析服务, 云应用, 其他```
    
* 运行时：
    ```Node.JS, Python, PHP, Java, Go, 其它```

* Properties相关：   
    必须参数：   
    ```Description, Required, Type```    
    可选参数：    
    ```Example, Default```    
    Type可以是String类型，也可以是List类型，取值：    
    ```String, Number, List, Enum, Struct, Boolean, Null, Any```    
    负责类型可以是：`List<数据类型>`   
    当Type是List类型时，可以针对不同的元素做别名：`数据类型[别名]`
    
##### readme.md

这个文件是项目的简介，您可以通过这部分，为您的项目写一份完整的描述文档，这样大家在使用您的项目的时候，才可以更加简单，轻松快速的用的起来。

##### version.md

这个版本升级的描述文档，可以在这个文档介绍版本升级的内容


### 提交合并请求
组件模板开发完毕，测试完毕之后，请
在Serverless Devs 应用仓库https://github.com/devsapp/start-component/issues 提交请求， 附上应用功能说明，以及git 仓库地址
## Serverless Devs Cli 贡献

fork https://github.com/Serverless-Devs/Serverless-Devs 源码，然后进行修改代码，提交合并请求即可。
[更多关于命令行的详细贡献指南](https://github.com/Serverless-Devs/Serverless-Devs/discussions/60)
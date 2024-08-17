---
title: Fun项目迁移 fun2s
description: 'Fun项目迁移 fun2s'
position: 2
category: '其他功能'
---

# Fun2s 命令

`fun2s` 命令是将 Funcraft 开发者工具所识别的 `template.yaml` 转换成 Serverless Devs 所识别的 `s.yaml`的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)


## 命令解析

当执行命令`fun2s -h`/`fun2s --help`时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Cli模式下必填 | 参数含义                                                     |
| -------- | -------- | ------------- | ------------------------------------------------------------ |
| force    | -        | 选填          | 强行覆盖已存在/已指定的 Serverless Devs 资源描述文件 |
| region   | -        | 选填          | 地区，默认读取 Funcraft 的配置。取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| source   | -        | 选填          | Funcraft的配置文档路径（默认是`template.yaml`/`template.yml`） |
| target   | -        | 选填          | 生成的 Serverless Devs 的配置文档路径（默认是`s.yaml`）      |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](https://serverless-devs.com/serverless-devs/command/readme#全局参数)

### 操作案例

可以在 Funcraft 项目目录下，通过`fun2s`命令，实现 Yaml 规范转换，例如：

```shell
s cli fc fun2s --region cn-shenzhen --target ./s.yml

[2021-11-02T19:51:25.418] [INFO ] [FC-TRANSFORM] - Using funcraft yaml: /Users/jiangyu/demo/test/start-fc-http-python3/template.yml
[2021-11-02T19:51:25.429] [INFO ] [FC-TRANSFORM] - Reminder serverless devs yaml path: /Users/jiangyu/demo/test/start-fc-http-python3/s.yml

Tips for next step
======================
* Deploy Function: s deploy -t ./s.yml
* Invoke Event Function: s local invoke -t ./s.yml
* Invoke HTTP Function: s local start -t ./s.yml
```

此时，就可以将原有的 Funcraft 规范的 `template.yaml` 转换成支持 Serverless Devs 规范的 `s.yaml`。

转换前（`template.yaml`）：

```yaml
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
  start-fc-http-python3:
    Type: 'Aliyun::Serverless::Service'
    Properties:
      Description: 'helloworld'
    start-fc-http-python3:
      Type: 'Aliyun::Serverless::Function'
      Properties:
        Handler: index.handler
        Runtime: nodejs10
        CodeUri: './'
```

转换后（`s.yaml`）：

```yaml
edition: 1.0.0
name: transform_fun
access: default
vars:
  region: cn-shenzhen
services:
  fc-start-fc-http-python3-start-fc-http-python3:
    component: devsapp/fc
    props:
      region: ${vars.region}
      service:
        name: start-fc-http-python3
        description: helloworld
        internetAccess: true
      function:
        name: start-fc-http-python3
        handler: index.handler
        runtime: nodejs10
        codeUri: ./
```

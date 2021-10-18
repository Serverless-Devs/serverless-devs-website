---
title: Serverless Devs
keywords: Serverless Devs
description: ServerlessDevs术语。
---

# ServerlessDevs术语

### Serverless Desktop
Serverless Devs 的桌面可视化工具，提供Serverless应用初始化，开发，构建，部署，测试，联调，压测等全生命周期能力
### Serverless Cli

Serverles Devs 命令行工具，操作灵活易于集成，可以用于构建部署Serverless 应用，以及持续集成Serverless 应用开发流程
### Serverless Hub
Serverless Devs 应用市场，用户可以检索适合业务需求场景的应用模板，进行下载使用，开发者可以贡献应用到市场
### Access
秘钥认证信息，通常不同云商的认证都有各自的关键词，比如 阿里云需要添加 AccountID, AccountID,AccessKeySecret
### 应用
具有业务场景能力的代码交付模板，包含业务源码，配置文件，属性描述配置，简介等属性

### 组件
Serverless Devs 逻辑执行的基本单位，类似fc,oss，nas 等组件可以提供专属的云资源操作能力

### 配置文件
在Serverless Devs 应用根目录下 s.yaml 的形式存在， 配置文件主要负责 应用编排，涵盖
变量定义， 秘钥别名信息， 服务，组件等属性
#### 配置文件-服务 services
服务是对单一场景业务逻辑的编排，比如独立的api 构建场景， 由唯一的 键值对组合而成，其中键名唯一，值则有固定的字段 component, actions, props 组成

```yaml
 api:
    component: devsapp/jamstack-api
    actions:
      pre-deploy:
        - run: npm install
          path: ./functions
    props:
      region: cn-hangzhou
      app:
        name: devs-http-demo #选填 默认 devs-http-demo
      sourceCode: functions
      route:
        - /
```
#### 配置文件-component 
组件,可以被Serverless Devs 解析引擎解析成执行对象，并且发起方法调用
```yaml
component: devsapp/jamstack-api
```
#### 配置文件-actions
组件方法执行的前后钩子，命名规则 pre(前置)-，post(后置)- 加方法名，比如这里是deploy
则会在组件执行deploy方法之前执行， 内容是数组，包含 run(指令) 和 path（指令执行的位置）
```yaml
    actions:
      pre-deploy:
        - run: npm install
          path: ./functions
``` 

#### 配置文件-props
组件执行的入参信息，配合组件执行逻辑实现具体的功能
```yaml
props:
      region: cn-hangzhou
      app:
        name: devs-http-demo #选填 默认 devs-http-demo
      sourceCode: functions
      route:
        - /
```


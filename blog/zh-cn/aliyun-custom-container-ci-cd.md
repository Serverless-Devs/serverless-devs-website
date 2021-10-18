---
slug: aliyun-custom-container-ci-cd
title: 阿里云Custom Container的CI/CD最佳实践案例
author: Anycodes
author_title: Serverless Devs
author_url: https://github.com/anycodes
author_image_url: https://avatars.githubusercontent.com/u/21079031?v=4
tags: [命令行, Serverless, CICD]
date: 2021-07-2
---

# 阿里云Custom Container的CI/CD最佳实践案例

在实际生产过程中，我们往往会遇到这样一个通用的项目持续发布的流程：

Git Clone -> Docker Build -> Docker Push -> Deploy Function

这样一个简单的流程，却在很多工具中难以实现，或者过于复杂，那么在Serverless架构下，通过Serverless devs如果来解决这个流程呢？

> 本文参考：https://github.com/devsapp/fc/tree/add-custom-container-example/examples/custom-container-function

## 准备一个Github仓库

这个仓库包括了以下的内容：
- 用户的代码
- 构建镜像所需要的Dockerfile
- 部署所需要的资源描述文件
- 一些流程脚本

以仓库[anycodes/CustomContainerDemo](https://github.com/anycodes/CustomContainerDemo) 为例，可以看到这是一个Node.js的项目，其中：

- 用户的代码
  - server.js
  - package.json
- 构建镜像所需要的Dockerfile
  - Dockerfile
- 部署所需要的资源描述文件
  - s.yaml
- 一些流程脚本
  - setup.sh
- 其他文件
  - Github Action文件
  - version（描述景象tag的文件）

## 关于一些流程

在整个项目中，包括两个流程：
- Github Action的流程
- 自定义Setup.sh流程

### Github Action的流程

这个流程主要是一些环境的初始化等：

```
name: Publish

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: npm install -g @serverless-devs/s
      - run: s config add --AccountID ${{secrets.AccountID}} --AccessKeyID ${{secrets.AccessKeyID}} --AccessKeySecret ${{secrets.AccessKeySecret}} -a publish_access
      - run: chmod +x ./setup.sh
      - run: ./setup.sh
```

整个过程为确定nodejs环境，安装Serverless Devs，配置密钥信息（可以参考[如何通过Github Action使用Serverless Devs做CI/CD - 账号信息配置](http://www.serverless-devs.com/blog/serverless-devs-ci-cd-github-action-usage#%E8%B4%A6%E5%8F%B7%E4%BF%A1%E6%81%AF%E9%85%8D%E7%BD%AE)）

完成上述的初始化和密钥配置之后，可以直接执行我们的流程`./setup.sh`

### 自定义Setup.sh流程

该流程也是比较简单的，主要做了几个事情：
1. 明确我的镜像registry地址和tag（此处tag是从version文件读取的）
2. 通过serverless devs fc组件提供的build能力，进行构建操作
3. 通过deploy方法进行项目部署

```
#!/usr/bin/env bash

# git clone && cd repo

version=$(cat version)
registry='registry.cn-shanghai.aliyuncs.com/custom-container/test:'

export image=$registry$version
s build --use-docker
s deploy --push-registry acr-internet --use-local -y
```

这里有一个问题：谁给我进行的docker build以及谁给我进行的docker push?
* 在本例子中`docker build`行为是由serverless devs帮做的，但是此出也可以不选择`s build`，可以选择更为原生的`docker build`
* 在本例子中，在进行`s deploy`的时候，会有一个参数叫做`--push-registry acr-internet`，此时可以注意该参数有两个可选：
```
Deploy

  Deploy a serverless application. 

Usage

  $ s deploy <options> 

Options

  --use-remote                 Deploy resource using remote config.                                          
  --use-local                  Deploy resource using local config.                                           
  --push-registry <registry>   Specify registry or registry type of the image when use custom container      
                               runtime.                                                                      
                               Registry type includes 'acr-internet' and 'acr-vpc'                           

Global Options

  -y, --assume-yes    Assume that the answer to any question which would be asked is yes. 
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s deploy                                    
  $ s <ProjectName> deploy                      
  $ s deploy --use-remote                       
  $ s exec -- deploy --use-remote               
  $ s exec <ProjectName> -- deploy --use-remote 

Examples with CLI

  You can refer to the usage of fc-api and execute [s cli fc-api -h] for help 
```

可以根据自己需求，选择：
-  'acr-internet': 目标 registry 地址设为公网地址。
-  'acr-vpc': 目标 registry 地址设为专有网络（vpc）地址。
-  '${registry url}': 自定义 registry 地址。


关于上述整个操作的基本流程：

整个流程基本是：

![image](https://user-images.githubusercontent.com/21079031/124237905-a0fe1100-db4a-11eb-82d8-24c5f82aa2fa.png)

## 项目测试

由于我在Github Action中声明的是：

```
on:
  push:
    branches: [ main ]
```

所以，此时我只需要push代码，即可触发发布流程：

![image](https://user-images.githubusercontent.com/21079031/124238239-e7537000-db4a-11eb-8807-8fc21ca1dd3d.png)

部署后的地址效果：

![image](https://user-images.githubusercontent.com/21079031/124238354-11a52d80-db4b-11eb-9dfb-b40f29b3a035.png)


## 注意的点


在上面的步骤中，我们进行了密钥的配置：
```
s config add --AccountID ${{secrets.AccountID}} --AccessKeyID ${{secrets.AccessKeyID}} --AccessKeySecret ${{secrets.AccessKeySecret}} -a publish_access
```

这里面其实最后有一个参数是`-a publish_access`，它的含义是为当前密钥指定一个别名，因为Serverless Devs支持多密钥的，所以为当前密钥配置一个别名，在以后的使用过程中可以指定，例如在当前的Yaml中，第三行有：

```
access: publish_access
```

用来指定使用该密钥，测试的Yaml配置如下：

```
edition: 1.0.0
name: fcDeployApp
access: publish_access

services:
  HelloWorld:
    component: fc
    props:
      region: cn-shanghai
      service:
        name: custom-container-test
        description: demo for custom-container-test
      function:
        name: custom-container-function
        runtime: custom-container
        caPort: 8080
        codeUri: ./
        timeout: 60
        customContainerConfig:
          image: ${env(image)}
          command: '["node"]'
          args: '["server.js"]'
      triggers:
        - name: httpTrigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET
              - POST
      customDomains:
        - domainName: auto
          protocol: HTTP
          routeConfigs:
            - path: /*
```

完整的Yaml配置可以参考：https://github.com/devsapp/fc/blob/main/docs/Others/yaml.md

在上面的Yaml中，其实可以看到`image: ${env(image)}`，其实Serverless Devs的Yaml支持多种形式的变量：

- 获取当前机器中的环境变量：${env(环境变量)}，例如${env(secretId)}
- 获取外部文档的变量：${file(路径)}，例如${file(./path)}
- 获取全局变量：${vars.*}
- 获取其他项目的变量：${projectName.props.*}
- 获取Yaml中其他项目的结果变量：${projectName.output.*}

> 实战举例，例如当我需要访问数据库等，此时我并不想把密钥明文配置到Yaml中，此时可以考虑，将密钥配置到环境变量中，进行直接使用。

关于 **构建** 问题：

如果使用 `s build --use-docker` 构建镜像，则需要确保 s.yml 中的 `codeUri` 字段指向的目录中包含 `Dockerfile`。

关于 **权限** 问题：

如果配置的密钥权限不够（例如是子账号），则可能会导致用户无法创建某些权限，进而导致部署不成功，这个时候可以考虑让主账号创建好相关的Role，并且在此处指定：
![image](https://user-images.githubusercontent.com/21079031/124239737-96dd1200-db4c-11eb-9123-ab6b6f0afae5.png)


关于密钥最小权限：
- AliyunFCFullAccess
- AliyunContainerRegistryFullAccess

关于所绑定的Role的最小权限：
- AliyunContainerRegistryReadOnlyAccess


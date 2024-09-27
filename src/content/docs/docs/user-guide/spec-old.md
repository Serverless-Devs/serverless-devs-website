---
title: 旧版描述文件
---
# 旧版描述文件 Serverless User Model 

> **注意：该规范仅适用于 `edition` 不为 `3.0.0` 的旧版YAML文件。**  
> 旧版规范已不再维护，若想使用最新功能，可以使用[fc3组件提供的方法](https://manual.serverless-devs.com/user-guide/aliyun/fc3/s2tos3/)自动升级，也可以根据[新版规范](spec.md)手动升级。

Serverless User Model 部分介绍了 Serverless Application 规范以及 Serverless Package Component 使用规范。

- [Serverless Application 模型](#serverless-application)
    - [元数据](#元数据)
    - [变量赋值](#变量赋值)
    - [服务顺序](#服务顺序)
    - [行为描述](#行为描述)
- [Serverless Package Component 使用规范](#serverless-package-component)

## Serverless Application 模型

Serverless Application 模型的定义，基于Serverless Devs开发者工具可识别的资源/行为描述文件。该文件仅支持`.yaml`和`.yml`两种格式，且需要符合Yaml的标准规范。与此同时，Serverless Application 模型规定，一个Serverless Devs开发者工具可识别的资源/行为描述文件表示一个Serverless应用。

同时，需要注意的是，Serverless Application模型对应的Yaml格式文件默认名称为`s.yaml`与`s.yml`，且`s.yaml`的优先级大于`s.yml`，即在一个Serverless应用下，同时出现`s.yaml`与`s.yml`时，系统会优先识别和使用`s.yaml`，除非用户在使用时指定了其他Yaml格式的文件，作为默认文件。

关于Serverless Application模型对应的Yaml文件格式，也是有着比较严格的要求，其格式为：

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: applicationName   #  应用名称
access: xxx-account1    #  秘钥别名

vars: # [全局变量，提供给各个服务使用]
  Key: Value

Service:
  ServiceName: # 服务名称
    access: xxx-account1      #  秘钥别名，如果和项目的access相同，可省略
    component: componentName  #  组件名称
    props: serviceProp        #  组件的属性值
    actions: serviceActions   #  自定义执行逻辑
```

一个完整的符合Serverless Application模型

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: xxx-account1  #  秘钥别名

vars: # [全局变量，提供给各个服务使用]
  logo: https://image.aliyun.com/xxxx.png

services:
  nextjs-portal: #  服务名称
    access: xxx-account1  #  秘钥别名，如果和项目的access相同，可省略
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src
      url: url
    actions: # 自定义执行逻辑
      pre-deploy: # 在deploy之前运行
        - run: s exec -- publish  # 要运行的命令行
          path: ./backend_src # 命令行运行的路径
        - run: s build  # 要运行的命令行
          path: ./backend_src # 命令行运行的路径
      post-deploy: # 在deploy之后运行
        - run: s clean
          path: ./frontend_src

  assets:
    component: static
    props:
      cache-control: "public, max-age=604800, immutable"
      www: "./public"

  express-blog:
    component: express
    props:
      app: ./express-blog
      url: ${vars.domain}
    actions:
      pre-deploy:
        - run: npm run build
          path: ./express-blog

  gateway:
    component: serverless-gateway # 路由组件：HTTP URL和服务之间的映射规则
    props:
      routes:
        - route: /~assets
          value: ${assets.output.url}
        - route: /
          value: ${nextjs-portal.output.url}
          index: index.html
        - route: /~portal
          value: ${nextjs-portal.output.url}
          inex: index.html
        - route: /~blog
          value: ${express-blog.output.url}
```

### 元数据

在该格式中：

| 参数名 |  代表含义   | 
|  ----  | ----  | 
| edition  | 命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范 | 
| name  | 应用名称 | 
| access  | 秘钥别名 |
| vars  | 全局变量，提供给各个服务使用，是一个Key-Value的形式 |
| Service  | 应用所包含的服务，是一个Key-Value的形式 |

关于Service参数：

| 参数名 |  代表含义   | 
|  ----  | ----  | 
| access  | 秘钥别名，如果和项目的access相同，可省略 | 
| component  | 组件名称 | 
| actions  | 自定义执行逻辑 |
| props  | 组件的属性值 |

### 变量赋值

Serverless Application模型对应的Yaml文件支持多种变量格式：

- 获取当前机器中的环境变量：${env(环境变量)}，例如${env(secretId)}
- 获取外部文档的变量：${file(路径)}，例如${file(./path)}
- 获取全局变量：${vars.*}
- 获取其他项目的变量：${projectName.props.*}
- 获取Yaml中其他项目的结果变量：${projectName.output.*}

### 服务顺序

如果一个Serverless Application模型对应的Yaml文件中有过多的服务，系统会默认分析部署顺序，该部署顺序分为两个步骤：

1. 分析项目中的依赖关系
2. 有依赖关系的按照依赖关系从前到后部署，无依赖关系的按Yaml配置的从上到下部署

### 行为描述

在Serverless Application模型对应的Yaml文件中，可以针对服务，提供对应的行为操作，其基本格式是：

```yaml
actions: # 自定义执行逻辑
  pre-命令: # 在命令之前运行
    - run: command  # 要运行的操作
      path: ./path # 运行操作的路径
  post-命令: # 在命令之后运行
    - run: command  # 要运行的操作
      path: ./path # 运行操作的路径
```

例如：

```yaml
actions: # 自定义执行逻辑
  pre-deploy: # 在deploy之前运行
    - run: s exec -- publish  # 要运行的命令行
      path: ./backend_src # 命令行运行的路径
    - run: s build  # 要运行的命令行
      path: ./backend_src # 命令行运行的路径
  post-deploy: # 在deploy之后运行
    - run: s clean
      path: ./frontend_src
```

当Serverless Devs开发者工具执行到该服务时，会在进行相关的命令之行之前，优先按照顺序执行`pre-命令`的操作，所有内容完成执行之后，再执行`post-命令`的操作。

以下面的Yaml为例：

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称

services:
  nextjs-portal: #  服务名称
    access: xxx-account1  #  秘钥别名，如果和项目的access相同，可省略
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src
      url: url
    actions: # 自定义执行逻辑
      pre-deploy: # 在deploy之前运行
        - run: s exec -- publish  # 要运行的命令行
          path: ./backend_src # 命令行运行的路径
        - run: s build  # 要运行的命令行
          path: ./backend_src # 命令行运行的路径
      post-deploy: # 在deploy之后运行
        - run: s clean
          path: ./frontend_src
```

当开发者在当前应用下执行了`deploy`命令，系统将会按照以下顺序进行操作：
1. 在`./backend_src`目录下执行`s exec -- publish`
2. 在`./backend_src`目录下执行`s build`
3. 调用组件`vue-component`的`deploy`方法，并将`props`和项目的基本信息传入到组件`vue-component`的`deploy`方法中
4. 在`./frontend_src`目录下执行`s clean`

以上顺序仅适用于整个流程没有出错的前提下，如果流程出现错误，系统将会进行报错，并终止后续流程的执行。

## Serverless Package Component 使用规范

Serverless 开发者模型，规定了Serverless Package Component的使用规范。对于一个符合Serverless Application模型的Yaml文件：

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: applicationName   #  应用名称
access: xxx-account1    #  秘钥别名

vars: # [全局变量，提供给各个服务使用]
  Key: Value

Service:
  ServiceName: # 服务名称
    access: xxx-account1      #  秘钥别名，如果和项目的access相同，可省略
    component: componentName  #  组件名称
    props: serviceProp        #  组件的属性值
    actions: serviceActions   #  自定义执行逻辑
```
在规范中，不同的Service都需要明确需要使用的component。此时的component格式将会分为几种：
- 一个存在与指定registry的组件，例如`fc`组件等；
- 一个存在Github的仓库，且按照规Serverless Package Component规范发布了Release，例如`devsapp/fc`
- 一个本地的且符合Serverless Package Component规范的组件路径，例如`./../start-component/`


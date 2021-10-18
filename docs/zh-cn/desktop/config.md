---
title: ServerlessDesktop 可视化配置
keywords: Serverless,Electron,秘钥信息
description: ServerlessDesktop 可视化配置 说明
---
# ServerlessDesktop 可视化配置说明
## 为什么有可视化配置
市面上的Serverless开发者工具通常都有自己的一套配置规范，用来对应用进行约束定义。 但往往配置项会比较复杂不容易阅读理解。Serverless Devs 为了更加友好的帮助开发者理解每一个配置项的含义，提供了可视化配置服务能力。


## 配置项组成
### 基本配置
这部分包括版本号，项目名，全局变量，秘钥信息 4个部分，值得关注的是**全局变量**和**秘钥配置**
+ 全局变量在这里定义可以被下面所有的service共享。
比如我们在全局变量中定义了 domain: xxxx，则在service 的属性里可以通过 ${vars.domain}获取其具体的值。变量除了这种自定义之外，也支持从环境便令中获取，比如${env.name}(从process.env 获取值)，以及${path('xxx')} 路径地址等
![ServerlessDesktop](https://img.alicdn.com/imgextra/i2/O1CN01nph8Ux1C7cB2ItD9k_!!6000000000034-2-tps-3584-2032.png)
+ 秘钥配置则会通过别名取的对应的具体 ak,sk凭证信息，用来操作云端资源
### 服务配置
服务是Serverless Devs对具备独立功能模块的抽象，一个项目由一个或多个service 组成
每一个service 包括
服务名，操作指令，执行组件，执行动作，以及属性信息组成，这些元素在我们的可视化面面都有完整的呈现。

### 服务属性说明
每一个服务都有唯一的执行组件，比如这里的服务是依赖 fc 组件，服务的执行指令会跟组件的内部方法对应，比如 fc组件有 deploy,invoke 等方法，那么这个服务也会有这样的操作指令
，服务的属性配置是跟组件的属性设置说明配对的，服务的属性配置好之后会在执行的时候传入到组件的方法中。另外 服务还包括了执行动作，可以做一些组件执行前后的动作，比如安装依赖，删除不用的环境变量等。
![ServerlessDesktop](https://img.alicdn.com/imgextra/i4/O1CN01axOAUm1hM2k9a7z5k_!!6000000004262-2-tps-3584-2032.png)


## 执行说明
每一个服务都有自己的"执行"按钮，另外对于整个项目而言，你可以进行“全量操作”,就是对所有的服务进行统一的指令执行。
![ServerlessDesktop](https://img.alicdn.com/imgextra/i3/O1CN01UnRREm1lFrrmtBicv_!!6000000004790-2-tps-3536-1916.png)


## 可视化配置和编辑器联动

在配置信息视图中，左侧的可视化操作部分和右侧的代码编辑器是互通互联的，对于属性细节的配置更适合用左边的可视化能力，但是对于更复杂的配置，比如你复制粘贴其他应用的模板希望移植到现在应用上。更适合粘贴到左边的编辑器中，注意需要 ctrl/command + s 之后才能生效
---
title: 应用开发
---
# 应用开发规范

## 快速开始

Serverless Devs的应用开发案例已经被集成到Serverless Devs命令行工具中，通过对Serverless Devs的命令行工具，可以进行空白应用项目的初始化。

![s init](https://gw.alicdn.com/imgextra/i4/O1CN01huHvq11MXrDfieWcl_!!6000000001445-1-tps-1179-792.gif)

```bash
$ s init

🚀 More applications: https://registry.serverless-devs.com

? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

此时，选择最后的`Dev Template for Serverless Devs`，并按回车：

```bash
$ s init

🚀 More applications: https://registry.serverless-devs.com

? Hello Serverless for Cloud Vendors Dev Template for Serverless Devs
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
❯ Application Scaffolding 
  Component Scaffolding 
  Plugin Scaffolding 
```

此时，选择`Application Scaffolding`，并按回车，即可完成一个完整的Serverless Devs的Application项目的初始化，可以通过命令查看文件树：

```bash
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____readme.md
|____version.md
|____publish.yaml
|____src
| |____s.yaml
| |____index.js
|____hook
| |____index.js
```

## 目录结构

推荐的应用目录结构为：

```text
|- src # 目录名字不可以变更
|   └── 应用目录
|   └── s.yml: 应用描述文件
|- hook # 目录名字不可以变更
|   └── 应用目录
|   └── index.js: 应用钩子
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```

其中：

| 目录         | 必须     | 含义                                                      |
| ------------ | -------- | --------------------------------------------------------- |
| src          | 必须存在 | 应用所在目录                                              |
| s.yml        | 必须存在 | 应用的资源描述Yaml，需要符合该应用对应的publish，yaml规范 |
| publish.yaml | 必须存在 | Serverless Devs Package的开发识别文档                     |
| readme.md    | 必须存在 | 对该应用的描述，或帮助文档信息                            |
| version.md   | 推荐存在 | 版本的描述，例如当前版本的更新内容等                      |
| hook         | 推荐存在 | init时的钩子函数目录                      |

## 应用模型元数据

应用模型元数据将会在publish.yaml中进行描述，并在Serverless Registry和Serverless Devs开发者工具侧进行识别和初始化。

`publish.yaml`文件的基本格式如下所示：

```yaml
Edition: 3.0.0
Type: Project
Name: 名称
Provider:
  - XXXXX # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: XXXXX # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
Service: # 使用的服务
  XXXXX: # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
    Authorities: #权限描述
      - XXXXX # 所需要的权限，例如AliyunFCFullAccess
Organization: 组织名称
Effective: 可视 / Public， Private，Organization
Parameters: # 标准的JSON Scheme
  type: object
  additionalProperties: false # 不允许增加其他属性
  required: # 必填项
    - mysqlName
    - regionName
  properties:
    mysqlName: # 正则校验
      type: string, # 类型
      description: Mysql连接串 # 描述
      title: Mysql连接串
      pattern: '^mysql:.*$' # 正则表达式
```

### 参数详解

| 目录         | 必须 | 结构         | 含义                                                                                            |
| ------------ | ---- | ------------ | ----------------------------------------------------------------------------------------------- |
| Edition      | 是   | String       | 当前Yaml的版本，推荐3.0.0                                                                       |
| Type         | 是   | String       | 类型，包括Component和Project，Plugin三个取值，此处取值Project                                   |
| Name         | 是   | String       | 应用名称                                                                                        |
| Provider     | 是   | List<String> | 应用所支持的云厂商信息                                                                          |
| Version      | 是   | String       | 应用版本号，例如0.0.1                                                                           |
| Description  | 是   | String       | 应用描述（一句话的简短描述）                                                                    |
| HomePage     | 否   | String       | 应用的主页，可以填写应用的仓库地址                                                              |
| Tags         | 否   | List<String> | 应用的标签                                                                                      |
| Category     | 是   | String       | 应用的分类                                                                                      |
| Service      | 是   | Struct       | 应用所需要的服务和相关的权限等描述，例如该应用需要函数计算，Serverless工作流等产品/服务作为支持 |
| Organization | 是   | String       | 应用的组织名称                                                                                  |
| Effective    | 是   | String       | 应用的可视权限                                                                                  |
| Parameters   | 是   | Struct       | 应用中Yaml内需要填写的字段，严格遵守Json Schema规范标准， 具体可以参考 [Parameters 规范](../parameters.md)                                        |

#### Provider

取值范围：`阿里云`, `百度智能云`, `华为云`, `腾讯云`, `AWS`, `Azure`, `Google Cloud`, `其它`

```yaml
Provider:
    - 阿里云
    - 百度智能云
```

#### Version

通过不同格式的版本号，来进行开发，灰度，正式的版本划分。

- `x.x.x`指正式版本，获取时会取最高版本号的对应内容。
- `dev.x.x`或`dev`指开发版本，可以通过拉版本列表获取，也可以通过指定对应版本获取，但是不会通过获取最新版本获取，例如最新版本是`1.0.0`，之后发布`dev.1.1`版本，此时获取最新版本依旧是`1.0.0`版本。
- `beta.x.x#x`指灰度版本，可以通过拉版本列表获取，也可以通过指定对应版本获取或拉最新版本获取，其中`#`后面是一个小于 10 大于 0 的正整数，用于表示当前版本的灰度百分比，例如`beta.1.0#4`，表示的是，用户在获取最新版本时，有40%概率获得到当前的beta版本。

格式参考：

```yaml
Version: 1.0.0
Version: dev.0.1
Version: beta.1.0#4
```

#### Category

取值范围：`基础云服务`, `Web框架`, `全栈应用`, `人工智能`, `音视频处理`, `图文处理`, `监控告警`, `大数据`, `IoT`, `新手入门`, `其它`, `开源项目`其他`

```yaml
Category: 基础云服务
```

#### Service

取值范围：`函数计算`, `容器服务`, `镜像服务`, `消息队列`, `工作流`, `CDN`, `对象存储`, `表格存储`, `MNS`, `日志服务`, `API网关`, `数据库`, `解析服务`, `云应用`, `其它`

```yaml
Service: # 使用的服务
  函数计算:
    Authorities: #权限描述
      - AliyunFCFullAccess # 所需要的权限，例如AliyunFCFullAccess
```

#### Effective

取值范围：`Public，Private，Organization`

```yaml
Effective: Public
```

根据`Organization`字段的有无（是否加入组织），此字段的作用范围也不一样。可概括如下：

| Effective/有无组织       | 有   |  无  |
| --------   | ------   | ----  |
| Public     | 所有人可见 |   所有人可见    |
| Private        |  只有自己可见  |   只有自己可见  |
| Organization     |    组织内可见    |   invalid |

#### Parameters

在应用模型中，尽管已经有一个完整的`s.yaml`用来描述应用的信息，但是实际上还会存在诸如下面的情况：

- 某些`s.yaml`中的参数需要使用者来填写，例如某些应用需要连接数据库，此时需要用户在初始化应用的时候进行参数的填写；
- 某些`s.yaml`中的参数尽管存在默认值，但是仍任需要用户关注，或者需要用户在某些情况下自定义；

所以，Serverless Package模型，针对Application类型，提供了`Parameters`参数。通过该参数，可以描述`s.yaml`中的相关参数，例如：

```yaml
Parameters: # 标准的JSON Scheme
  type: object
  additionalProperties: false # 不允许增加其他属性
  required: # 必填项
    - mysqlName
    - regionName
  properties:
    mysqlName: # 正则校验
      type: string, # 类型
      description: Mysql连接串 # 描述
      title: Mysql连接串
      pattern: '^mysql:.*$' # 正则表达式
    regionName: # 枚举类型
      type: string,
      description: 地域Region
      default: cn-hangzhou # 默认值
      title: 地域
      enum: # 枚举类型
        - cn-beijing
        - cn-hangzhou
        - cn-shanghai
```

此时，在`s.yaml`中可以引用该字段，例如：

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: component-test   #  项目名称
vars: # [全局变量，提供给各个服务使用]
  domain: xxxx.yyy.com

resources:
  component-test:
    component: demo
    props:
      mysqlName: {{ mysqlName }}
      regionName: {{ regionName }}
```

这样，当用户使用`s init`创建你的应用时，将会被要求输入`mysqlName`和`regionName`两个参数，并替换掉双括号内容。

## 开发与调试

为了兼容[spec 0.0.1](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/zh/0.0.1/serverless_package_model/package_model.md#%E5%BA%94%E7%94%A8%E6%A8%A1%E5%9E%8B%E8%A7%84%E8%8C%83) 中，关于`s.yaml`的特殊格式定义，在当前版本中：

1. 如果`s.yaml`中存在类似`'{{ bucket | alibaba oss bucket }}'`的内容 ，则直接提醒用户需要输入bucket这样的一个参数，作为Yaml中所必须的参数，并以`|`之后的内容"alibaba oss bucket"作为解释这个参数的含义；

2. 如果`s.yaml`中存在类似`"{{ access }}"`内容，则判断`publish.yaml`中是否存在`Parameters`参数以及相关的Key：
    - 如果存在，则默认进行对应；
    - 如果不存在，直接提醒用户需要输入access这样的一个参数，作为Yaml中所必须的参数；

> 关于Parameters参数的格式，严格遵循JSON Scheme的规范标准，更多使用示例可查看[Parameters参数](../parameters.md)文档。

### 私有应用调试

#### 外部应用模版下载

在初始化应用时，指定 uri 参数能够从指定路径下载应用模版

```bash
s init --uri https://images.devsapp.cn/goat/start-fc3-nodejs.zip
```

注意文件内结构和`publish.yaml`内容必须依照此文档，不然会初始化失败。

### 发布流程

开发者可以在 src 下完成应用的开发，并对项目进行`publish.yaml`文件的编写。完成之后，即可通过以下几个步骤发布项目：

- 更改 `publish.yaml` 里的 `Version` 字段。确保版本号比现有最高版本号大 1，例如：1.0.0 -> 1.0.1。

    > 您可以使用固定的 dev 版本用于持续发布测试版本

- 首次发布需要通过 [registry](../user-guide/builtin/registry.md) 命令先登录 Serverless Devs Registry。

    ```bash
    s registry login
    ```

    随后浏览器会跳出登陆窗口，根据提示进行操作即可。

- 后续直接执行 `s registry publish` 即可进行发布

- 测试应用

    如果您使用 dev 版本进行了应用的发布， 假设您的应用名字为 start-application-v3, 那么您可以使用：

    - 本地终端执行: `s init start-application-v3@dev`
    - 浏览器打开: https://fcnext.console.aliyun.com/applications/create?template=start-application-v3@dev 进行测试

### 查看已发布的应用

> 详细可见 [registry 命令文档](../user-guide/builtin/registry.md)

可以通过`s registry list`指令查看当前登陆到 [Serverless Registry](https://registry.serverless-devs.com) 账号所发布的组件。例如：

```bash
$ s registry list
- 
  type:        Project
  name:        start-qwen-api-messages
  description: 使用函数计算 FC 快速体验通义千问 API，通过 messages 以文本指令对话
  category:    人工智能
  tags: 
    - Web框架
    - Flask
    - 人工智能
    - 通义千问
...
```

`list`指令会输出所有组件。在组件过多的情况下，可以通过`category`, `tag`和`page`参数进行筛选，还可以通过`search`参数搜索特定的组件。

### 使用钩子函数

在`hook`目录下，可以通过编写`index.js`内的代码来在`s init`初始化你的应用时，在初始化前后执行特定操作。`index.js`初始值如下：

```js
async function preInit(inputObj) {

}

async function postInit(inputObj) {

}

module.exports = {
    postInit,
    preInit
}
```

把代码放到`preInit`和`postInit`函数中，即可在`init`操作执行前后执行特定操作，例如：

```js
async function preInit(inputObj) {
    console.log(`
  Serverless Devs Application Case
    
    Cloud services required：
    - FC : https://fc.console.aliyun.com/
    
    Tips：
    - FC Component: https://docs.serverless-devs.com/user-guide/aliyun/#fc3`)

}

async function postInit(inputObj) {
    console.log(`
    * Before using, please check whether the actions command in Yaml file is available
    * Carefully reading the notes in s.yaml is helpful for the use of the tool
    `)
}

module.exports = {
    postInit,
    preInit
}
```

此时，当你执行 `s init` 命令初始化时，会在初始化之前执行 `preInit` 函数，初始化之后执行 `postInit` 函数。

其中传入的`inputObj`是一个对象，包含以下字段：

```json
{
  "name": "(string) 应用名",
  "version": "(string) 应用版本",
  "appPath": "(string) 保存地址",
  "tempAppPath": "(string) 项目临时存储地址",
  "logger": "(object) 日志对象",
  "fs": "(object) fs-extra库",
  "lodash": "(object) lodash库",
}
```

---
title: CAP应用开发规范
---

## 快速开始

通过对Serverless Devs的命令行工具，可以进行空白 CAP 应用项目的初始化。

```bash
$ s init start-application-cap -d start-application-cap
```

按下回车，即可完成一个完整的CAP Application项目的初始化，可以通过命令查看文件树：

```bash
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____readme.md
|____version.md
|____publish.yaml
|____hook
| |____index.js
|____src
| |____s.yaml
| |____variable.yaml
| |____code
| | |____index.js
| | |____package.json
| |____readme.md
| |____build.yaml
```

## 目录结构

推荐的应用目录结构为：

```text
|- src # 目录名字不可以变更
|   └── 应用目录
|   └── s.yaml: 应用描述文件, 必需
|   └── build.yaml: 应用中服务构建命令, 可选
|   └── variable.yaml: 应用中变量定义, 可选
|- hook # 目录名字不可以变更
|   └── 应用目录
|   └── index.js: 应用钩子
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```

其中：

| 目录          | 必须     | 含义                                                                                 |
| ------------- | -------- | ------------------------------------------------------------------------------------ |
| src           | 必须存在 | 应用所在目录                                                                         |
| s.yaml        | 必须存在 | 应用的资源描述Yaml，[yaml规范](https://docs.serverless-devs.com/user-guide/spec/#_1) |
| publish.yaml  | 必须存在 | Serverless Devs Package的开发识别文档                                                |
| readme.md     | 必须存在 | 对该应用的描述，或帮助文档信息，具体参考[readme规范](#readme)                        |
| version.md    | 推荐存在 | 版本的描述，例如当前版本的更新内容等                                                 |
| hook          | 推荐存在 | init时的钩子函数目录                                                                 |
| build.yaml    | 可选     | 应用中服务构建命令, 可选                                                             |
| variable.yaml | 可选     | 应用中变量定义, 可选                                                                 |

### build.yaml 示例

```yaml
hello_world: # 对应 s.yaml 中 resources 中的某个 key, 代表某个服务
  default:
    languages: # 构建需要的编程语言环境
      - nodejs16
    steps: # 构建命令及步骤
      - run: npm install
        path: ./code
```

### variable.yaml 示例

```yaml
services:  # 服务变量
  hello_world:  # 对应 s.yaml 中 resources 中的某个 key, 代表某个服务
    timeZone:
      title: 时区
      type: string
      default: Asia/Shanghai
      description: 创建的应用函数执行时候所在实例的时区, 详情参考 https://docs.oracle.com/middleware/12211/wcs/tag-ref/MISC/TimeZones.html
      required: true

    API_KEY:
      title: API Key
      type: string
      value: sk-xxxxxx
      sensitive: true   # 是否为敏感变量
      description: '长度为 8 到 32 个字符。必须包含大写字母、小写字母、数字和特殊字符'
      default: ''

# shared:   # 共享变量
#   DB_NAME:
#     value: db-name
#     description: 'db name'
#     type: string
```


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

| 目录         | 必须 | 结构         | 含义                                                                                                       |
| ------------ | ---- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| Edition      | 是   | String       | 当前Yaml的版本，推荐3.0.0                                                                                  |
| Type         | 是   | String       | 类型，此处取值Project表示应用                                                                              |
| Name         | 是   | String       | 应用名称                                                                                                   |
| Provider     | 是   | List<String> | 应用所支持的云厂商信息                                                                                     |
| Version      | 是   | String       | 应用版本号，例如0.0.1                                                                                      |
| Description  | 是   | String       | 应用描述（一句话的简短描述）                                                                               |
| HomePage     | 否   | String       | 应用的主页，可以填写应用的仓库地址                                                                         |
| Tags         | 否   | List<String> | 应用的标签                                                                                                 |
| Category     | 是   | String       | 应用的分类                                                                                                 |
| Service      | 是   | Struct       | 应用所需要的服务和相关的权限等描述，例如该应用需要函数计算，Serverless工作流等产品/服务作为支持            |
| Organization | 是   | String       | 应用的组织名称                                                                                             |
| Effective    | 是   | String       | 应用的可视权限                                                                                             |
| Parameters   | 是   | Struct       | 应用中Yaml内需要填写的字段，严格遵守Json Schema规范标准， 具体可以参考 [Parameters 规范](../parameters.md) |

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
- `dev`指开发版本，可以覆盖。

格式参考：

```yaml
Version: 0.0.1
Version: dev
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

| Effective/有无组织 | 有           | 无           |
| ------------------ | ------------ | ------------ |
| Public             | 所有人可见   | 所有人可见   |
| Private            | 只有自己可见 | 只有自己可见 |
| Organization       | 组织内可见   | invalid      |

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

1. 如果`s.yaml`中存在类似`'{{ bucket }}'`的内容 ，则直接提醒用户需要输入bucket这样的一个参数，作为Yaml中所必须的参数；

2. 如果`s.yaml`中存在类似`"{{ access }}"`内容，则判断`publish.yaml`中是否存在`Parameters`参数以及相关的Key：
    - 如果存在，则默认进行对应；
    - 如果不存在，直接提醒用户需要输入access这样的一个参数，作为Yaml中所必须的参数；

> 关于Parameters参数的格式，严格遵循JSON Scheme的规范标准，更多使用示例可查看[Parameters参数](../parameters.md)文档。

### 发布流程

开发者可以在 src 下完成应用的开发，并对项目进行`publish.yaml`文件的编写。完成之后，即可通过以下几个步骤发布项目：

- 更改 `publish.yaml` 里的 `Version` 字段。确保版本号比现有最高版本号大 1，例如：1.0.0 -> 1.0.1。

    > 您可以使用固定的 dev 版本用于持续发布测试版本

- 首次发布需要通过 [registry](../../user-guide/builtin/registry.md) 命令先登录 Serverless Devs Registry。

    ```bash
    s registry login
    ```

    随后浏览器会跳出登陆窗口，根据提示进行操作即可。

- 后续直接执行 `s registry publish` 即可进行发布

- 测试应用

    如果您使用 dev 版本进行了应用的发布， 假设您的应用名字为 my-cap, 那么您可以使用浏览器打开: https://cap.console.aliyun.com/template-detail?template=my-cap@dev 进行测试

### 查看已发布的应用

> 详细可见 [registry 命令文档](../../user-guide/builtin/registry.md)

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

## Readme 规范
### 一、内容分布

案例开发者仅需关注5、6、7、8

1. 【抬头内容】（自动生成）
   > 这一部分主要是注、标题、三张图等构成，由capreadme工具自动生成，无需手写。
   在控制台读取时，由前端自动去除。

2. 简介（自动生成）
   > 用一句话介绍案例基本能力。通过publish.yaml中的description生成，无需关注。

3. 前期准备（自动生成）
   > 该部分整体通过capreadme自动识别生成。主要包括所依赖服务和权限。

4. 创建＆部署（自动生成）
   > 在CAP控制台前端会不展示。

5. 项目架构图（开发者通过capreadme填写）
   > 参考下面注意点中 2 上传图片到文档内容

6. 案例介绍（开发者通过capreadme填写）
    该部分需要手写，建议依次包括以下内容：
    - 简介、基本功能（主语为案例或用户，而不是用到的技术，参考2.注意事项的说明或下方示例）
    - 背景/适用场景
    - 火爆/可靠程度（可选）
    - 案例化带来的价值、好处——与开发平台的关系/开发平台起的作用

        以stable-diffusion-plus为例：

        基于本案例，您可以快捷地部署、使用stable-diffuison-plus，体验强大的ai图像生成能力，实现文生图、图生图等。
        stable-diffusion是一款用于xxxxx的大模型。它可以xxxxx。 它被广泛应用于xxxx、xxx等领域，现在世界范围内已有过xxx使用人次，是最主流的ai图像生成大模型。 使用本案例，serverless开发平台将为您便捷地stable-diffusion部署到阿里云函数计算上，并额外提供了一系列增强功能，帮助您更方便地使用stable-diffusion。

        以ffmpeg-app-v3生成为例:

        本案例将FFmpeg包装为一款音视频处理应用, 能够便捷地提供获取音视频元信息、获取音视频时长、音频转换、雪碧图生成、生成 GIF、打水印等一系列能力。
        fmpeg是音视频处理领域的，它可以被用于xxxx。 该技术目前使用于xxx领域，github star数xxxx，被xxxx等企业采用。 使用本案例，serverless开发平台将为你 ...

7. 使用流程（开发者通过capreadme填写）
    该部分需要手写，要求如下：
    - 涉及api参数需要表格化呈现
    - 每一步的操作需要附带该步骤作用说明
    - 步骤需要手动设置标题
    - 重要步骤需要截图
    如果是事件函数， 有关函数的调用写法请参考： [word2pdf readme](https://github.com/devsapp/start-word2pdf/tree/dipper/src)

8. 注意事项（可选）（开发者通过capreadme填写）
    您可以选择性填写此项，用来声明一些注意事项。
    注意，在控制台呈现时，会自动添加免责声明9，但是对文档编写者无感。无需在注意事项中重复添加。

9. 免责声明（控制台固定显示，文档无需添加）

### 二、注意点与其他问题

capreadme 工具的使用：

1. 需要安装s工具:

    > 安装方法见 https://docs.serverless-devs.com/user-guide/install/ ，在publish.yaml所在目录下使用命令 `s cli capreadme index`。若发现工具版本不对，可以先使用s clean --all进行清除本地缓存

2. 上传图片到文档：
      - 阿里内部同学推荐使用[内部图床](https://content.alibaba-inc.com/work/internal-media-management/pic/upload?iframe=3)，上传图片后，将链接粘贴到输入框内。
      - 如果为外部同学，在运行capreadme工具以前，可以先通过命令s registry login登录，然后再运行capreadme工具，可以直接将图片复制粘贴到以上网页的输入框中，capreadme3将自动上传图片到图床，并转化为链接。但是，此方法，有上传容量限制，不推荐内部同学使用

3. 对于步骤的格式书写：大步骤名称需要用三级标题###标明。如果是小步骤，使用markdown语法的有序列表形式即可。
      1. 称谓：统一为"案例"（或"项目案例"），不要用"模板"，也少用"项目"。
      2. description：发布的同时，也请对publish.yaml中的description进行优化，要求可以表明案例基本能力，可以参考案例介绍开头的简介部分，两者建议保持一致。这里如果模板是包装的某个架构或技术，建议是介绍案例基于xxx技术/架构进行了什么操作，以及可以做到什么，但是不要展开介绍xxx技术/架构本身。也就是说主语应当是案例或者用户。（例如：
            - 基于本案例，您可以快捷地部署、使用stable-diffuison-plus，体验强大的ai图像生成能力，实现文生图、图生图等。
            - 本案例是将 Python Web 框架中，非常受欢迎的 Flask 框架，快捷创建并部署到阿里云函数计算 FC。）

### 三、填写示例文档

- [fc-stable-diffusion文档](https://github.com/devsapp/fc-stable-diffuson/tree/v3/src#%E6%A1%88%E4%BE%8B%E4%BB%8B%E7%BB%8D)

- [fc-flask-v3文档](https://github.com/devsapp/start-web-framework/tree/dipper/web-framework/python/flask/src#%E6%A1%88%E4%BE%8B%E4%BB%8B%E7%BB%8D)

### 四、验收标准

案例介绍、使用流程两部分必须结构清晰、内容明了，满足上述内容中必要的部分。

案例readme规范由百潼负责验收。如果不符合规范将退回进行修改。
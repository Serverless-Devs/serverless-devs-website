---
title: 组件开发
---
# 组件开发规范

通过Serverless Devs，可以被应用所引用，并按照用户的输入，执行预定的功能。例如某个应用中引用了FC组件，那么此时，用户可以通过传入Deploy命令进行函数的部署，而这里的FC组件，则是需要建立在组件模型基础之上，即要符合组件的开发规范；

## 快速开始

Serverless Devs的组件开发案例已经被集成到Serverless Devs命令行工具中，通过对Serverless Devs的命令行工具，可以进行空白组件项目的初始化，开发者只需要执行`s init`即可看到：

![s init](https://gw.alicdn.com/imgextra/i2/O1CN01nO85g424zBx2E8CnQ_!!6000000007461-1-tps-1179-792.gif)

```bash

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
 Application Scaffolding 
❯  Component Scaffolding 
  Plugin Scaffolding 
```

此时，选择`Component Scaffolding`，并按回车，即可完成一个完整的Serverless Devs的Component项目的初始化，可以通过命令查看文件树：

```bash
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____LICENSE
|____.signore
|____.prettierignore
|____README.md
|____publish.yaml
|______tests__
| |____mocks
| | |____s.yaml
| | |____code
| | | |____index.js
| |____index.test.ts
| |____cli.test.ts
|____.gitignore
|____package-lock.json
|____package.json
|____.prettierrc.js
|____tsconfig.json
|____jest.config.ts
|____src
| |____commands-help
| | |____remove.ts
| | |____index.ts
| | |____deploy.ts
| | |____alias.ts
| |____index.ts
```


## 开发与调试

通过脚手架安装的目录中，能够在 `{root}/__tests__/mocks` 目录下模拟本地组件的使用与开发调试，该 `s.yaml` 通过 `component: ${path('../..')}` 引用 `src` 目录下的代码作为组件内容：

```yaml
edition: 3.0.0
name: hello-world-app
access: "default"

vars:
  region: "cn-huhehaote"
resources:
  hello_world:
    component: ${path('../..')} # 组件名称，Serverless Devs 工具本身类似于一种游戏机，不具备具体的业务能力，组件类似于游戏卡，用户通过向游戏机中插入不同的游戏卡实现不同的功能，即通过使用不同的组件实现不同的具体业务能力
    props:
      region: ${vars.region} 
      functionName: "start-nodejs-b97b"
      description: "hello world by serverless devs"
      runtime: "nodejs14"
      code: ./code
      handler: index.handler
      memorySize: 128
      timeout: 60
```

### 私有组件调试

#### 工具外部组件

> 3.0.2及以上版本支持

示例 s.yaml 如下，其中

- component 能够指定为一个 zip 包的外部链接，通过此方式获取的组件默认为 v3 版本，请使用 serverless-devs 3.0 描述文件规范进行编写 s.yaml 文件；可参考：[描述文件规范](../user-guide/spec.md)

- 使用外部组件时，默认会将文件名称视为组件名，可通过 s component 查看详细信息；

- 使用外部组件时，工具的缓存与更新策略默认不对其生效；若本地需要同步外部组件的代码包内容，可手动清理缓存已获取最新组件：`s clean --component <component_name>  # 清除指定组件缓存`

- 外部组件会被 s 工具的 loadComponent 方法加载到内存中，核心方法为 buildComponentInstance，通过 require 加载，需要具备相关必要字段，详细见本文档。

```yaml
edition: 3.0.0
name: hello-world-app
access: "test1"

vars:
  region: "cn-hangzhou"
resources:
  hello_world:
    component: 'https://images.devsapp.cn/goat/fc3.zip'
    actions:
      pre-deploy:
        - run: 's clean --component v3/fc3' # 每次清除缓存获取最新组件
    props:
      region: ${vars.region}
      functionName: "start-nodejs-4s87"
      description: 'hello world by serverless devs'
      runtime: "nodejs16"
      code: ./code
      handler: index.handler
      memorySize: 128
      timeout: 30
```

### 正式发布流程

开发者可以在 src 下完成应用的开发，并对项目进行`publish.yaml`文件的编写。完成之后，即可通过以下几个步骤发布项目：

- 更改 `publish.yaml` 里的 `Version` 字段。确保版本号比现有最高版本号大 1，例如：1.0.0 -> 1.0.1。

- 检测确认组件接收的参数 `Properties`后，首次发布需要先登录 `s registry login`。

    ```bash
    s registry login
    ```

  根据提示进行操作即可。

- 后续直接执行 `s registry publish` 即可进行发布

## 目录结构

Component Model，即组件模型，需要通过指定的文件进行模型的规范和定义的。在这里，推荐的组件模型目录结构为：

```text
|- src # 目录名字可以变更
|   └── 代码目录  
|- package.json: 需要定义好main   
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```

其中：

| 目录         | 必须     | 含义                                                                                        |
| ------------ | -------- | ------------------------------------------------------------------------------------------- |
| src          | 推荐存在 | 统一放置功能实现，当然也可以换成其他的名称，或者平铺到项目下，但是推荐通过src来做统一的存放 |
| package.json | 必须存在 | Node.js的package.json，需要描述清楚组件的入口文件位置                                       |
| publish.yaml | 必须存在 | Serverless Devs Package的开发识别文档                                                       |
| readme.md    | 必须存在 | 对该组件的描述，或帮助文档信息                                                              |
| version.md   | 推荐存在 | 版本的描述，例如当前版本的更新内容等                                                        |

## 组件模型元数据

组件模型元数据将会在`publish.yaml`中进行描述，并在Serverless Registry和Serverless Devs开发者工具侧进行识别和引用。

`publish.yaml`文件的基本格式如下所示：

```yaml
Edition: 3.0.0
Type: Component
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
  XXXXX:  # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
    Authorities: #权限描述
      - XXXXX # 所需要的权限，例如AliyunFCFullAccess
Commands: # 指令，格式为指令：指令描述，例如：
  deploy: 部署函数
  invoke: 调用函数
Organization: 组织名称
Effective: 可视 / Public， Private，Organization
Parameters:
  type: object
  additionalProperties: false
  required: # 必填项
    - region
    - service
  properties:
    region: # 枚举类型
      default: cn-hangzhou
      title: 地域 # 名称
      enum: # 枚举
        - cn-beijing
        - cn-hangzhou
```

### 参数详解

| 目录         | 必须 | 结构         | 含义                                                                                            |
| ------------ | ---- | ------------ | ----------------------------------------------------------------------------------------------- |
| Edition      | 是   | String       | 当前Yaml的版本，推荐3.0.0                                                                       |
| Type         | 是   | String       | 类型，包括Component和Project，Plugin三个取值，此处取值Component                                 |
| Name         | 是   | String       | 组件名称                                                                                        |
| Provider     | 是   | List<String> | 组件所支持的云厂商信息                                                                          |
| Version      | 是   | String       | 组件版本号，例如0.0.1                                                                           |
| Description  | 是   | String       | 组件描述（一句话的简短描述）                                                                    |
| HomePage     | 否   | String       | 组件的主页，可以填写组件的仓库地址                                                              |
| Tags         | 否   | List<String> | 组件的标签                                                                                      |
| Category     | 是   | String       | 组件的分类                                                                                      |
| Service      | 是   | Struct       | 组件所需要的服务和相关的权限等描述，例如该组件需要函数计算，Serverless工作流等产品/服务作为支持 |
| Organization | 是   | String       | 组件的组织名称                                                                                  |
| Effective    | 是   | String       | 组件的可视权限                                                                                  |
| Properties   | 是   | Struct       | 组件的参数描述，组件的属性定义，严格遵守Json Schema规范标准                                     |

#### Provider

取值范围：`阿里云`, `百度智能云`, `华为云`, `腾讯云`, `AWS`, `Azure`, `Google Cloud`, `其它`

格式参考：

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

#### Category

取值范围：`基础云服务`, `Web框架`, `全栈应用`, `人工智能`, `音视频处理`, `图文处理`, `监控告警`, `大数据`, `IoT`, `新手入门`, `其它`, `开源项目`

格式参考：

```yaml
Category: 基础云服务
```

#### Service

取值范围：`函数计算`, `容器服务`, `镜像服务`, `消息队列`, `工作流`, `CDN`, `对象存储`, `表格存储`, `MNS`, `日志服务`, `API网关`, `数据库`, `解析服务`, `云应用`, `其它`

格式参考：

```yaml
Service: # 使用的服务
  函数计算:
    Authorities: #权限描述
      - AliyunFCFullAccess # 所需要的权限，例如AliyunFCFullAccess
```

#### Properties  

Properties参数的格式，严格遵循JSON Scheme的规范标准，具体格式，可以参考以下案例：

```yaml
Properties:
  type: object
  additionalProperties: false
  required: # 必填项
    - region
    - service
  properties:
    region: # 枚举类型
      default: cn-hangzhou
      title: 地域 # 名称
      enum: # 枚举
        - cn-beijing
        - cn-hangzhou
        - cn-shanghai
        - cn-qingdao
    service:
      title: 服务配置 # 名称
      type: object # 类型
      properties:
        name: # 正则校验
          title: 名称
          description: 只能包含字母、数字、下划线和中划线。不能以数字、中划线开头。长度在 1-128 之间。
          type: string
          pattern: '^[a-zA-Z0-9-_]{1,128}$'
        internetAccess: # boolean 值
          title: 允许公网访问
          description: 配置服务中的函数是否可以访问互联网
          default: true
          type: boolean
        logConfig: # 复杂类型
          title: 日志配置
          oneOf: # 只能有一个生效
            - title: 自动配置
              enum:
                - auto
            - logConfig:
                type: object
                title: 日志配置
                additionalProperties: true
                required:
                  - project
                  - logstore
                properties:
                  project:
                    type: string
                    title: 日志项目
                    default: ''
                    examples:
                      - xx-project
                  logstore:
                    type: string
                    title: 日志仓库
                    default: ''
                    examples:
                      - xx-logstore
                  logBeginRule:
                    title: 日志分割规则
                    default: None
                    enum:
                      - DefaultRegex
                      - None
                  enableRequestMetrics:
                    type: boolean
                    title: 请求级别指标
                    default: true  # 默认值
                  enableInstanceMetrics:
                    type: boolean
                    title: 实例级别指标
                    default: false
                    examples:
                      - true
```

### 代码规范

在组件模型中，代码组成规范有两个部分：

- `package.json`中需要描述清楚入口文件所在地址；例如`{"main": "./dist/index.js"}`；
- 在代码中实现对应的用户方法。例如Package开发者希望用户可以通过deploy命令，进行项目的部署，那么就可以实现一个deploy的方法，并在方法内实现对应的部署能力；

关于代码规范部分，可以参考如下案例：

```typescript
import * as commandsHelp from './commands-help';
import { IInputs } from '@serverless-devs/component-interface';
import { parseArgv } from '@serverless-devs/utils';

// 示例组件
export default class StartComponent {
  private logger: any;
  public commands = {};
  constructor({ logger = console }) {
    this.logger = logger;
    this.commands = commandsHelp;
  }
  // 基本示例
  // 部署
  public async deploy(inputs: IInputs) {
    this.logger.debug(`deploy inputs: ${JSON.stringify(inputs)}`);
    const argv = parseArgv(inputs.args);
    this.logger.debug(`y=${argv.y}`);
    const credential = await inputs.getCredential();
    this.logger.debug(`credential: ${JSON.stringify(credential, null, 2)}`)
    this.logger.progress('this is a test message');
    return { hello: 'world', message: 'this is a deploy function', y: argv.y };
  }
}
```

其中入参`inputs`的结构为：

```ts
{
    props: Record<string, any>;
    name: string;
    command: string;
    yaml: {
        path: string;
    };
    resource: {
        name: string;
        component: string;
        access: string;
    };
    getCredential: () => Promise<ICredentials | any>;
    args: [];
    cwd: string;
    outputs?: Record<string, any>;
}
```

| 目录          | 含义                                       |
| ------------- | ------------------------------------------ |
| props         | 用户配置的属性/参数                        |
| name          | 用户的项目名称                             |
| command       | 用户所执行的命令                           |
| yaml          | 用户的yaml配置文件路径                     |
| resource      | 用户的应用模块基本信息                     |
| getCredential | 用户的密钥信息                             |
| args          | 用户传递的参数（解析后的，以数组形式传递） |
| cwd           | 用户执行linux命令的当前路径                |
| outputs       | 记录之前已执行完的模块输出结果             |

在上面的案例代码中，可以看到有一个deploy方法，该方法就是功能实现的方法。此时当用户使用deploy命令时，系统就会携带参数调用该方法。以一个真实案例作为举例说明：

该组件名为`hexo`，组件核心代码如上所示，具备一个test方法，此时用户侧的Yaml为：

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: hello-world-app      #  项目名称
access: default  #  秘钥别名

resources:
  HexoComponent:
    component: hexo
    props:
      region: 'cn-hangzhou'
      codeUri: './src'
  Hexo2Component:
    component: hexo
    props:
      region: 'cn-huhehaote'
      codeUri: './src'
```

当用户执行`s deploy --debug`，此时，组件代码中的`deploy`方法，收到的`inputs`参数实际上是：

```json
{
    "cwd": "/Users/start-component-v3/__tests__/mocks",
    "name": "hello-world-app",
    "props": {
        "region": "cn-huhehaote",
        "code": "./code"
    },
    "command": "deploy",
    "args": [
        "--debug"
    ],
    "yaml": {
        "path": "/Users/start-component-v3/__tests__/mocks/s.yaml"
    },
    "resource": {
        "name": "Hexo2Component",
        "component": "/Users/start-component-v3",
        "access": "default"
    },
    "outputs": {
        "HexoComponent": {
            "hello": "world",
            "message": "this is a deploy function"
        }
    }
}
```

### 约定方法

在3.0版本中，cli工具的部分指令会调用组件的特定方法，以便实现对应的功能。因此，若你的组件需要实现对应的功能，那么需要在组件代码中实现对应名称的方法。目前约定的方法如下：

#### getSchema

在`s verify`指令中，cli工具会调用组件的`getSchema`方法，获取组件的属性定义，并进行校验。因此，若你的组件想要对Yaml中填写的`props`进行校验，则需要在代码中实现一个名称为`getSchema`方法。该方法的入参出参应如下：

| 入参 | 类型 | 含义 |
| ---- | ---- | ---- |
| -    | -    | -    |

| 出参   | 类型   | 含义                                                                             |
| ------ | ------ | -------------------------------------------------------------------------------- |
| schema | string | 组件属性的JSON Schema。格式可参考[JSON Schema官方网站](https://json-schema.org/) |

[fc3](https://github.com/devsapp/fc3/blob/master/src/index.ts)组件实现案例：

```typescript
public async getSchema(inputs: IInputs) {
  logger.debug(`getSchema: ${JSON.stringify(inputs)}`);
  return fs.readFileSync(SCHEMA_FILE_PATH, 'utf-8');
}
```

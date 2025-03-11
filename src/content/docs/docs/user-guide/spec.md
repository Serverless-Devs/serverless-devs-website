---
title: 描述文件格式/规范
---
# 描述文件 Spec

> **注意：此文档适用于`edition`为`3.0.0`的YAML文件。** 如果您使用的是`edition`不为`3.0.0`的YAML文件，请参考[旧版YAML规范](spec-old.md)。

在非`cli`模式下([Yaml 模式 Cli 模式对比](#yaml-cli))，进行应用的操作、组件的使用，需要按照 Serverless Devs 的规范，提供相对应的资源/行为描述文件，且该文件还需要符合以下条件：

- 拓展名可以是`.yaml`或`.yml`
- 格式必须符合[Yaml规范](https://yaml.org/spec/1.2.2/)

> 👉 对于需要通过描述文件进行环境隔离的项目，建议将文件命名为 `s-${ENV}.yaml` 或 `s-${ENV}.yml` 格式。 例如：`s-prod.yaml`。

在默认情况下，Serverless Devs 开发者工具会默认该描述文件的名称为`s.yaml`或`s.yml`，且`s.yaml`的优先级大于`s.yml`， 即在一个 Serverless 应用下，同时出现`s.yaml`与`s.yml`时，系统会优先识别和使用`s.yaml`。

当然，开发者也可以通过`-t, --template  [templatePath]`进行指定，例如，在某应用在生产环境下的描述文件名为`s-prod.yml`，则可以在执行相关命令时，增加参数`-t s-prod.yml`或者`--template s-prod.yml`。

## 描述文件格式/规范

关于 Serverless Devs 所支持的资源/行为描述文件基本格式为：

```yaml
edition: 3.0.0 # 命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: hello-world-app # 项目名称
access: default # 秘钥别名

flow: # 全局执行流程
  Command: # 流程作用的指令
    - [ResourceName] # 这一步骤运行的资源名称

template: # 模板信息
  TemplateName: # 模板名称
    Key: Value

vars: # [全局变量，提供给各个项目使用]
  Key: Value

validation: true # 是否开启资源属性值校验

actions: globalActions # 自定义全局的执行逻辑

resources: # 可以包括多个业务模块
  ResourceName: # 资源名称
    actions: projectActions # 自定义执行逻辑
    component: componentName # 组件名称
    props: componentProps # 组件的属性值
```

例如，一个相对完整的 Yaml 案例可以是：

```yaml
edition: 3.0.0 # 命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: hello-world-app # 项目名称
access: default # 秘钥别名

vars: # [全局变量，提供给各个业务模块使用]
  logo: https://image.aliyun.com/xxxx.png
  region: cn-hangzhou

template: # 模板信息
  nextjs_common: # 模板名称
    runtime: nodejs14

validation: true # 开启资源属性值校验

flow: # 全局执行流程
  deploy: # 使用deploy指令时生效
    - [nextjs_portal] # 第一步：部署nextjs_portal函数
    - [nextjs-domain] # 第二步：部署nextjs-domain函数

actions: # 自定义全局的执行逻辑
  pre-deploy: # 项目deploy执行之前执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
  success-deploy: # 项目deploy执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      allow_failure: true # true/false 允许失败条件
      args: # 插件的参数
        key: value 
  fail-deploy: # 项目deploy执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      allow_failure: # 允许失败条件
        command: # 允许失败的执行command
          - deploy
        exit_code: # 允许失败的退出码
          - 100
          - 101
      args: # 插件的参数
        key: value 
  complete-deploy: # 项目deploy执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 

resources:
  nextjs_portal: # 资源名称
    component: fc3 # 组件名称
    actions: # 自定义执行逻辑
      pre-deploy: # 在deploy之前运行
        - run: npm install # 要运行的命令行
          path: ./nextjs_portal # 命令行运行的路径
      success-deploy: # 在deploy之后运行
        - component: fc3 invoke # 要运行的组件，格式为【component: 组件名 命令 参数】
          allow_failure: true # true/false 允许失败条件
    extend: # 要使用的模板
      name: nextjs_common # 将模版的属性放到props中
    props: #  组件的属性值
      region: ${vars.region}
      functionName: nextjs_portal
      code: ./nextjs_portal
      handler: index.handler
      memorySize: 128
      timeout: 30

  nextjs-domain:
    component: fc3-domain
    props:
      region: ${vars.region}
      domainName: auto
      protocol: HTTP
      routeConfig:
        routes:
          - path: /*
            functionName: nextjs_portal
```

## 元数据

在该格式中：

| 参数名 |  代表含义   | 
|  ----  | ----  | 
| edition  | 命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范 | 
| name  | 项目名称 | 
| access  | 秘钥别名，可以使用通过[config命令](builtin/config.md#config-add)配置的密钥信息，以及[通过环境变量设置密钥](../dev-guide/cli_design.md#_11) |
| validation | （3.0.5及之后版本可用）是否开启资源属性值校验。设置为true时，会使用[组件提供的schema](../dev-guide/component.md#getschema)校验模板中定义的资源属性值，默认为false |
| extend  | 所继承的模板 |
| template  | 可被继承的模板 |
| flow  | 操作顺序。默认按照从上到下的书写顺序执行 |
| vars  | 全局变量，提供给各个业务模块使用，是一个Key-Value的形式 |
| actions  | 自定义全局的执行逻辑 |
| resources  | 项目所包含的业务模块，是一个Key-Value的形式 |

### template
关于 template 参数：
可被继承的模板，主要为key-object形式，例如；

```yaml
template: 
  template1: 
    region: cn-hangzhou
    runtime: python3
    vpcConfig: vpc-1
  template2: 
    region: cn-beijing
    runtime: nodejs14
    vpcConfig: vpc-2
```

此时在 resource 中即成当前模板，可以进行重写操作，例如：

```yaml
resources:
  resource1:
    component: fc       # 组件名称
    extend: 
      name: template1   # 继承template中的指定key对应的结构，与props内容进行合并
      ignore:           # 忽略的属性
         - vpcConfig
    props:
      region: cn-shanghai
      cpu: 1
      memorySize: 128
  resource2:
    component: fc        # 组件名称
    extend: 
      name: template1    # 继承template中的指定key对应的结构，与props内容进行合并
    props:
      region: cn-hongkong
      cpu: 1
      memorySize: 128
  resource3:
    component: fc        # 组件名称
    extend: 
       name: template2   # 继承template中的指定key对应的结构，与props内容进行合并
  resource4:
    component: fc        # 组件名称
    props:
      region: cn-hongkong
      cpu: 1
      memorySize: 128
```
完成渲染后，该部分的结果：

- resource1：继承了template1，同时删除了vpcConfig参数，在template1基础上配置了region、cpu以及memorySize；
- resource2：继承了template1，在template1基础上配置了region、cpu以及memorySize；
- resource3：继承了template2；
- Resource4：没有做任何继承，配置了region、cpu以及memorySize；

渲染结果：

```yaml
resources:
  resource1:
    component: fc # 组件名称
    props:
      region: cn-shanghai
      runtime: python3
      cpu: 1
      memorySize: 128
  resource2:
    component: fc # 组件名称
    props:
      region: cn-hongkong
      runtime: python3
      vpcConfig: vpc-1
      cpu: 1
      memorySize: 128
  resource3:
    component: fc # 组件名称
    props:
      region: cn-hongkong
      cpu: 1
      memorySize: 128
  resource4:
    component: fc # 组件名称
    props:
      region: cn-hongkong
      cpu: 1
      memorySize: 128
```
### resources
关于resources中Value参数：

| 参数名 |  代表含义   | 
|  ----  | ----  | 
| component  | 组件名称 | 
| extend  | 所继承的模板 | 
| actions  | 自定义执行逻辑 |
| props  | 组件的属性值 |

`component`可以指定使用组件的版本，写法为：`<组件名称>@<组件版本>`，版本可选值可参考[组件开发文档](../dev-guide/component.md)。

## 变量赋值

Serverless Application模型对应的Yaml文件支持多种变量格式：

- 获取当前机器中的环境变量：`${env('环境变量')}`，例如 `${env('secretId')}`, `${env('secretId', '默认值')}`
- 获取外部文档的变量：`${file('路径')}`，例如 `${file('./path')}`
- 获取全局变量：`${vars.*}`
- 获取Json字符串内容的变量：`${json('json字符串')}`，例如 `${json(file('./a.json'))}`
- 获取路径的变量：`${path('路径')}`，例如 `${path('../')}`
- 获取其他业务模块的变量：`${resources.project_name.props.*}`
- 获取业务模块的结果变量：`${resources.project_name.output.*}`
- 获取当前配置的config变量：`${config('AccountID')}`, 本质是获取 `s config get`中的变量值
- 获取当前模块的信息：`${this.xx}`
- 使用`{{if}}`语法实现条件判断

### 使用`${env('')}`获取环境变量

以下面的Yaml为例：

```yaml
resources:
  next_demo:
    component: fc3
    props: # 组件的属性值
      region: cn-hangzhou
      function:
        functionName: "next-start-hello"
        runtime: ${env('runtime', 'nodejs16')}
        code: ./code
```

在`next_demo`中，`${env('runtime')}`将尝试获取当前计算机中`runtime`环境变量的值，如果获取不到，将使用默认值`nodejs16`。

### 使用`${file('')}`获取外部文档内容

以下面的Yaml为例：

```yaml
resources:
  framework: 
    component: fc3
    actions:
      pre-deploy:
        - plugin: website-fc
    props:
      functionName: ${file('./file.txt')}
```

若此时`file.txt`的内容为：

```txt
this is file fun test
```

则解析后结果为：

```yaml
resources:
  framework: 
    component: fc3
    actions:
      pre-deploy:
        - plugin: website-fc
    props:
      functionName: this is file fun test
```

### 使用`${vars.*}`获取全局变量

以下面的Yaml为例：

```yaml
vars: # 全局变量
  region: cn-hangzhou
  service:
    name: website
    description: Serverless Devs Website Service
    internetAccess: true
resources:
  framework: # 资源名称
    component: fc3 # 组件名称
    props: # 组件的属性值
      region: ${vars.region}
```

在`framework`中，`${vars.region}`将获取`vars`下的`region`参数，因此渲染结果为：

```yaml
vars: # 全局变量
  region: cn-hangzhou
  service:
    name: website
    description: Serverless Devs Website Service
    internetAccess: true
resources:
  framework: # 资源名称
    component: fc3 # 组件名称
    props: # 组件的属性值
      region: cn-hangzhou
```

### 使用`${json('')}`获取Json字符串内容

以下面的Yaml为例：

```yaml
resources:
  framework: # 资源名称
    component: fc3 # 组件名称
    props: # 组件的属性值
      region: cn-hangzhou
      function:
        name: vuepress
        description: ${json(file("./a.json"))}
        runtime: nodejs12
```

若其中`a.json`的内容为：

```json
{
  "info": "this is a fun test"
}
```

则解析时，会将`a.json`中的内容加在`description`之下。渲染结果为：

```yaml
resources:
  framework: # 资源名称
    component: fc3 # 组件名称
    props: # 组件的属性值
      region: cn-hangzhou
      function:
        name: vuepress
        description: 
          info: this is a fun test
        runtime: nodejs12
```

### 使用`${path('')}`获取路径

以下面的Yaml为例：

```yaml
resources:
  framework: # 资源名称
    component: ${path('./fc.js')} # 组件名称
```

在`framework`中，`${path('./fc.js')}`将尝试获取`fc.js`文件的绝对路径。若路径为`/Users/XXX/XXX/fc.js`，则渲染结果为：

```yaml
resources:
  framework: # 资源名称
    component: /Users/XXX/XXX/fc.js # 组件名称
```

### 使用`${resources.project_name.props.*}`获取其他业务模块的变量

以下面的Yaml为例：

```yaml

resources:
  framework: # 资源名称
    component: fc3 # 组件名称
    props: # 组件的属性值
      region: cn-hangzhou
      name: vuepress
      description: Serverless Devs Website vuepress Function
      codeUri: ./code/docs/.vuepress/dist
      runtime: nodejs12
      environmentVariables:
        region: cn-hangzhou
        functionName: ${resources.next_function.props.name}
  next_function: 
    component: fc3
    props:
      region: cn-hangzhou
      name: next-function-example
      description: Serverless Devs Website vuepress Function
      codeUri: ./next-code
      runtime: nodejs12
```

在`framework`中，`${resources.next_function.props.function.name}`会获取`next_function`中的`function`属性中的`name`值。因此，渲染结果为：

```yaml
resources:
  framework: # 资源名称
    component: fc3 # 组件名称
    props: # 组件的属性值
    ...
      functionName: next-function-example
    ...
```

### 使用`${resources.project_name.output.*}`获取业务模块的结果变量

以下面的Yaml为例：

```yaml
vars: # 全局变量
  region: cn-hangzhou

resources:
  framework: # 资源名称
    component: fc3 # 组件名称
    props: # 组件的属性值
      region: ${vars.region}
      name: vuepress
      description: Serverless Devs Website vuepress Function
      codeUri: ./code/docs/.vuepress/dist
      timeout: 30
      memorySize: 512
      runtime: nodejs12
      environmentVariables:
        hello: ${resources.next_function.output.hello}
  next_function: # 第二个函数的案例，仅供参考
    component: fc3
    props:
      region: ${vars.region}
      name: next-function-example
      description: Serverless Devs Website vuepress Function
```

在`framework`中，`${resources.next_function.output.hello}`会等待`next_function`运行完后，获取输出的`hello`值。若`next_function`的输出的`hello`值为`hello world`，则渲染结果为：

```yaml
vars: # 全局变量
  region: cn-hangzhou

resources:
  framework: # 资源名称
    component: fc3
    props: # 组件的属性值
    ...
      environmentVariables:
        hello: hello world
    ...
```

### 使用`${config('')}`获取当前配置的config变量

以下面的Yaml为例：

```yaml
props: # 组件的属性值
  region: cn-hangzhou
  ...
  environmentVariables:
    AccountID: ${config('AccountID')}
    ...
```

在`props`中，`${config('AccountID')}`将尝试获取在`s config`中配置的`AccountID`的值。若`AccountID`的值为`123456789012`，则渲染结果为：

```yaml
props: # 组件的属性值
  region: cn-hangzhou
 ...
  environmentVariables:
    AccountID: 123456789012
    ...
```

### 使用`${this.xx}`获取当前模块的信息

以下面的Yaml为例：

```yaml
edition: 3.0.0
name: NextProject
access: default-access

resources:
  nextjs_portal:
    component: fc3
    actions:
      pre-deploy:
        - run: s invoke ${this.props.url}
          path: ./backend_src
    props:
      code: ./frontend_src
      url: url
```

在`nextjs_portal`中:

- 使用`${this.name}`将解析为`nextjs_portal`
- 使用`${this.props.code}`将解析为 `./frontend_src`
- 使用`${this.access}`将解析为`default-access`

### 使用`{{if}}`语法实现条件判断

Yaml文件支持**键值对**级别的条件判断语法，您能够在Yaml文件中的属性值中使用[`art-template`](https://goofychris.github.io/art-template/zh-cn/docs/syntax.html)的`{{if}}`语法进行条件判断。以下面的Yaml为例：

```yaml
resources:
  nextjs_portal:
    component: fc3
    props:
      code: ./frontend_src
      url: url
      runtime: ${var.runtime}
      layers: 
        - acs:xxx/versions/{{if that.props.runtime === 'custom'}}1{{else}}2{{/if}}
```

此时就能实现根据`runtime`的值来改变层版本，确保`runtime`变更的情况下不出现兼容性问题。当`runtime`的值为`custom`时，层版本为`1`，否则为`2`。当`runtime`为`custom`时，渲染结果为：

```yaml
layers: 
  - acs:xxx/versions/1
```

具体的语法请参考[art-template语法文档](https://goofychris.github.io/art-template/zh-cn/docs/syntax.html)。

> 注意：
>
> 1. art-template包含标准语法和原始语法，均可在Yaml中使用。
> 2. 在`{{}}`包裹的语句内，使用其他模版语法无需用`${}`包裹。
> 3. 在`{{}}`包裹的语句内使用`this`语法时，需将`this`写成`that`。

## 特殊变量
在Serverless-Devs中有些特殊变量有特定的用途，开发者没有特殊的需求，避免使用特殊变量
- `${aliyun-cli}`
 作用在`access`的值中，从获取[aliyun cli](https://github.com/aliyun/aliyun-cli)的默认的`profile`，并且生效。

 > 执行`aliyun configure list`可以查看当前生效的`profile`

## 执行顺序

如果一个Serverless Project 模型对应的 Yaml 文件中有多个的服务，系统会默认分析部署顺序，该部署顺序分为两个方面：

- 是否已经制定flow流程
  - 按照指定的流程进行部署，没在流程中的不进行额外的操作·
- 没有指定flow流程
  - 分析项目中的依赖关系
  - 有依赖关系的按照依赖关系从前到后部署，无依赖关系的按Yaml配置的从上到下部署

### 指定 flow

flow表示执行流程或顺序，主要是key-list形式组成，例如：

```yaml
flow:
  deploy: # 支持正则
    - [project_a]
    - [project_b, project_c]
```

表示的是，在进行deploy操作时先部署project_a，然后同时（并行）部署project_b, project_c；

这里的key也支持正则，比如

```yaml
flow:
  ${regex('.')}: # 支持正则
    - [project_a]
    - [project_b, project_c]
```
本质上是将`regex`接收的参数value执行 `new RegExp('value').test('当前执行的指令')`， 比如:  `new RegExp('.').test('deploy')`, 如果匹配成功，则按照指定的flow进行操作，如果匹配不成功，则按照系统分析出的顺序进行操作。

> 如果用户指定了`flow`, 按照指定的流程进行部署，没在流程中的不进行额外的操作·

### 未指定 flow

- 被依赖的 `resource` 优先部署；
- 从上到下的顺序，按顺序进行部署；

例如，某资源描述 Yaml 可以缩写成：

```yaml
edition: 3.0.0 #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack # 项目名称
access: xxx-account1 #  秘钥别名

resources:
   nextjs-portal: # 资源名称
    component: vue-component # 组件名称
    props: #  组件的属性值
      src: ./frontend_src
      url: url

   assets:
    component: static
    props:
      www: './public'

  gateway:
    component: serverless-gateway # 路由组件：HTTP URL和服务之间的映射规则
    props:
      routes:
        - url: ${assets.output.url}
```

> 此时，可先进行依赖关系分析，服务`nextjs-portal`、`assets`没有额外依赖，服务`gateway`通过魔法变量`${assets.output.url}`依赖了`assets`服务；此时部署顺序则为：  
> `nextjs-portal`、`assets`按照上下顺序部署, 之后 `gateway` 拿到 `assets` 服务的返回结果再进行部署
> 即：`nextjs-portal`->`assets`->`gateway`

## Yaml 继承

通过关键字`extend`， 可以解决多个Yaml配置冗余的问题。

### 典型场景

比如使用Serverless Devs部署一个[函数计算FC](https://github.com/devsapp/fc3)应用的时候，预发环境的和正式环境除了`name`不一致。其他配置完全一致。Yaml配置如下

```text
├── code
├── s.yaml
├── s.prod.yaml
└── s.pre.yaml
```

其中：

- `s.yaml`为默认配置

  ```yaml
  edition: 3.0.0
  access: "default"
  resources:
    fc-deploy-test:
      component: fc3
      props:
        region: cn-hangzhou
        nasConfig: Auto
        name: hello-function
        description: "Serverless Devs Function"
        codeUri: "./"
        runtime: nodejs12
        timeout: 60
  ```

- `s.pre.yaml`配置如下

  ```yaml
  extend: s.yaml
  resources:
    fc-deploy-test:
      props:
        name: fc-function-pre
  ```

- `s.pro.yaml`配置如下

  ```yaml
  extend: s.yaml
  resources:
    fc-deploy-test:
      props:
        name: fc-function-pro
  ```

显示的声明 `extend`关键字，获得继承能力

- 最终生效的配置

  通过指定yaml配置`s deploy -t s.pro.yaml`生效

  ```yaml
  edition: 3.0.0
  access: "default"
  resources:
    fc-deploy-test:
      component: fc3
      props:
        region: cn-hangzhou
        nasConfig: Auto
        name: fc-function-pro
        description: "Serverless Devs Function"
        codeUri: "./"
        runtime: nodejs12
        timeout: 60
  ```

### 合并规则

配置的合并使用[extend2](https://www.npmjs.com/package/extend2) 模块进行深度拷贝。
但是考虑到`yaml`的配置层级比较深，比如上面的[示例](#/典型场景),我们在预发环境需要覆盖`resource名称`，需要严格按照层级关系进行编写，相对繁琐。 

```yaml
resources:
  fc-deploy-test:
    props:
      name: fc-service-pro
```

#### 数组合并

数据在做合并的时候，直接覆盖，而不是合并操作

```js
const a = {
  arr: [1, 2],
};
const b = {
  arr: [3],
};
extend(true, a, b);
// => { arr: [ 3 ] }
```

### 最佳实践

Yaml继承一般用作环境划分，比如预发环境为`s.pre.yaml`，线上环境为`s.pro.yaml`，部署时候通过指定对应部署模版`s deploy -t s.pro.yaml`配置。

## 行为描述

### 全局Action

全局Action的基本格式是：

```yaml
actions: # 自定义全局的执行逻辑
  pre-命令: # 项目在命令执行之前执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
  success-命令: # 项目在命令执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  fail-命令: # 项目在命令执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  complete-命令: # 项目在命令执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
```

例如：

```yaml
actions: # 自定义全局的执行逻辑
  pre-deploy: # 项目deploy执行之前执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
  success-deploy: # 项目deploy执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  fail-deploy: # 项目deploy执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  complete-deploy: # 项目deploy执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
```

当Serverless Devs开发者工具执行相关的命令时，项目执行相关的命令之前，会执行全局的`pre-命令`操作，项目执行成功之后，会执行全局的`success-命令`操作，项目执行失败之后，会执行全局的`fail-命令`操作, 项目执行完成之后，会执行全局的`complete-命令`操作。

以下面的Yaml为例：

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: default       #  秘钥别名

actions: # 自定义全局的执行逻辑
  pre-deploy: # 项目deploy执行之前执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
  success-deploy: # 项目deploy执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  fail-deploy: # 项目deploy执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  complete-deploy: # 项目deploy执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 

resources:
  nextjs_portal: # 资源名称
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src
      url: url
```

当开发者在当前应用下执行了`deploy`命令，系统将会按照以下顺序进行操作:

1. 执行全局的`pre-deploy`命令：在`./src`目录下执行`npm install`
2. 调用组件`vue-component`的`deploy`方法，并将`props`和项目的基本信息传入到组件`vue-component`的`deploy`方法中
3. 如果第`2`步骤执行成功则执行全局的`success-deploy`操作，执行失败则执行全局的`fail-deploy`操作，不管成功还是失败，只要执行完成后一定执行全局的`complete-deploy`操作。


关于`actions`中的`run`，`plugin`的定位和区别：

- `run`，需要指定执行目录，仅仅是一个`hook`的能力，可以认为就是单纯的执行命令（即调用系统的命令）；
- `plugin`，是一种轻量化的插件，每个插件通常情况下只会支持一个能力；

> 注意：全局Action中仅支持`run`和`plugin`。

### 局部Action

在Serverless Application模型对应的Yaml文件中，可以针对业务模块提供对应的行为操作，其基本格式是：

```yaml
actions: # 自定义执行逻辑
  pre-命令: # 在命令之前运行
    - run: command  # 要运行的操作
      path: ./path # 运行操作的路径
    - component: pgo  # 要运行的组件，格式为【component: 组件名 命令 参数】
    - plugin: website-fc  # 要使用的插件
      args: # 插件的参数
        key: value 
  success-命令: # 在命令执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
    - component: pgo  # 要运行的组件，格式为【component: 组件名 命令 参数】
  fail-deploy: # 在命令执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  complete-deploy: # 在命令执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
```

例如：

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: default       #  秘钥别名
resources:
  nextjs_portal: # 资源名称
    actions: # 自定义全局的执行逻辑
      pre-deploy: # 在deploy之前运行
        - run: npm install  # 要运行的命令行
          path: ./backend_src # 命令行运行的路径
        - component: fc build --use-docker  # 要运行的命令行
      success-deploy: # 在deploy成功之后运行
        - plugin: fc-warm
          args:
            corn: '********'
      fail-deploy: # 在deploy执行失败之后执行
        - plugin: dingding-robot # 要使用的插件
          args: # 插件的参数
            key: value 
      complete-deploy: # 在deploy执行完成之后执行
        - plugin: dingding-robot # 要使用的插件
          args: # 插件的参数
            key: value 
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src
      url: url
```

当开发者在当前应用下执行了`deploy`命令，系统将会按照以下顺序进行操作：

1. 在`./backend_src`目录下执行`npm install`
2. 在对项目`nextjs_portal`，使用`fc`组件的`build`方法，入参为`--use-docker`(即在`docker`环境下，对项目`nextjs_portal`进行构建)
3. 调用组件`vue-component`的`deploy`方法，并将`props`和项目的基本信息传入到组件`vue-component`的`deploy`方法中
4. 如果第`3`步骤执行成功则执行`success-deploy`操作，将部署的输出结果等信息，传递给插件`fc-warm`，并将`{"corn": "********"}`作为参数传入，执行失败则执行`fail-deploy`操作，不管成功还是失败，只要执行完成后一定执行`complete-deploy`操作。

关于`actions`中的`run`，`component`，`plugin`的定位和区别：

- `run`，需要指定执行目录，仅仅是一个`hook`的能力，可以认为就是单纯的执行命令（即调用系统的命令）；
- `component`，使用格式是`组件名 命令 参数`，将会把当前项目所使用的密钥信息、属性信息等一并传给指定的组件方法；
- `plugin`，是一种轻量化的插件，每个插件通常情况下只会支持一个能力，与`component`最大的不同是，他可以修改属性。例如用户配置了`props`中的某个`k-v`为：`codeUri: ./code`：
    - 在使用`component`之后，当前信息（`codeUri: ./code`），会继续成为项目执行的参数，不会变更；
    - 在使用`plugin`之后，当前信息（`codeUri: ./code`），可能会发生变更，并将变更后的内容作为项目执行的参数；      

关于三者的具体的例子：

**场景1：**

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称

resources:
    nextjs_portal: # 资源名称
    component: test-component  # 组件名称
    props: #  组件的属性值
        src: ./frontend_src
        url: url 
```
用户在执行`s deploy -a mytest`后，系统会将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`）传递给组件`test-component`的`deploy`方法；

**场景2：**

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称

resources:
    nextjs_portal: # 资源名称
    component: test-component  # 组件名称
    actions: # 自定义执行逻辑
        pre-deploy: # 在deploy之前运行
        - run: s build
            path: ./
    props: #  组件的属性值
        src: ./frontend_src
        url: url 
```

用户在执行`s deploy -a mytest`后，系统会：

- 在`./`目录下执行`s build`，此时`-a mytest`参数并不会直接传递给`s build`方法，可以认为纯粹的执行某个命令，无相关状态的继承和关联；
- 将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`）传递给组件`test-component`的`deploy`方法；

**场景3：**

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称

resources:
    nextjs_portal: # 资源名称
    component: test-component  # 组件名称
    actions: # 自定义执行逻辑
        pre-deploy: # 在deploy之前运行
        - component: fc build
    props: #  组件的属性值
        src: ./frontend_src
        url: url 
```

用户在执行`s deploy -a mytest`后，系统会：

- 将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`）传递给组件`fc`的`build`方法；
- 将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`）传递给组件`test-component`的`deploy`方法

**场景4：**

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称

resources:
    nextjs_portal: # 资源名称
    component: test-component  # 组件名称
    actions: # 自定义执行逻辑
        pre-deploy: # 在deploy之前运行
        - plugin: qbuild
            args:
            key: value
    props: #  组件的属性值
        src: ./frontend_src
        url: url 
```

用户在执行`s deploy -a mytest`后，系统会：

- 将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`），`plugin`的参数（`{"key": "value"}`）传递给插件`qbuild`，此时插件`qbuild`进行相关的业务处理，处理完成：
    - 如果返回信息对`props`进行了修改，那么会将密钥`mytest`以及修改后的`props`的传递给组件`test-component`的`deploy`方法；
    - 如果返回信息未对`props`进行了修改，那么会将密钥`mytest`以及原始的`props`的传递给组件`test-component`的`deploy`方法；

-----------

> 在一个项目下，如何一键部署整个项目？又或者如何只部署应用中的某个业务模块？可以参考[自定义命令使用指南](builtin/custom.md)

### Action通配符

工具会识别魔法变量regex里的内容来正则匹配当前的执行方法。比如全局的`pre-${regex(.)}`表示项目执行任何方法之前都会执行`pre`的动作 

> 本质上是将`regex`接收的参数value执行 `new RegExp('value').test('当前执行的指令')`， 比如:  `new RegExp('.').test('deploy')`

```yaml
actions: 
  pre-${regex('.')}: # 执行任何方法之前都会执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
```


## Yaml 模式 Cli 模式对比
Serverless Devs 开发者工具从根本上提供了两种使用方法。

- Yaml模式：需要依赖资源描述文档进行操作的模式
- Cli模式：可以在任何目录下直接执行，而不需要依赖资源描述文档；

这两者的核心区别是：

1. 如果想要使用 Yaml 模式，在当前目录下，必须要有`s.yaml`/`s.yml`文件，或通过`-t`/`--template`指定的资源部描述文件；
2. 如果想要试用 Cli 模式，则必须是 `s cli 组件名 方法 参数`的格式进行，此时不需要 Yaml 文件；

举一个非常简单的例子，如果有一个应用的资源描述文件`s.yaml`如下：

```yaml
name: myApp
edition: 3.0.0
access: "myaccess"

resources:
  website-starter:
    component: website
    props:
      bucket: testbucket
  backend-starter:
    component: demo
    props:
      service:
        name: serviceName
      function:
        name: functionName
      region: cn-hangzhou
```

此时，可以执行`s deploy`进行`myApp`应用部署，如果执行`s backend-starter deploy`则可以进行`myApp`应用下的`backend-starter`项目/服务部署。

此时，部署过程中，所需要的相关参数，可以通过该 Yaml 文件进行读取。

但是，在某些情况下，并不方便直接使用 Serverless Devs 规范的 Yaml 文件（例如，将线上资源同步到本地），此时可以选择纯命令行形式，即`s cli`模式。

在 `s cli` 模式下，由于不会读取 Yaml 等资源描述文件，所以很多参数都需要自行填写，这时的填写方法有两种：

- 通过 `s cli` 天然支持的 `-p`/`--prop` 参数，进行相关 Yaml 参数的赋值，例如上述案例的`s backend-starter deploy`，此时可以改写成：

```bash
s cli demo -p "{\"service\":{\"name\":\"serviceName\"},\"function\":{\"name\":\"functionName\"},\"region\":\"cn-hangzhou\"}"
```

- 通过 demo 组件本身所支持的一些参数，例如通过`s cli demo -h`，可以得到帮助信息，部分内容如下：

```bash
    --region [region]               [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1  
    --service-name [serviceName]    [C-Required] Specify the fc service name  
    --function-name [functionName]  [Optional] Specify the fc function name   
```

此时，就可与通过下面的命令实现上述功能：

```bash
s cli demo --region cn-hangzhou --service-name serviceName --function-name functionName
```

### 特点对比

| 模式 | 使用方法 | 优势 |  劣势 |  适用场景  |
| --- | --- | --- | --- | --- |
| Yaml模式 | 在具有符合Serverless Devs规范，且存在资源/行为描述的Yaml文件的应用目录下，执行组件对应的命令，即可直接使用，例如`s deploy`，`s servicename build`等 | 可以一键部署一个完整的应用（例如，某个应用中规定了多个Service，可以通过该命令一键部署）；同时，通过资源/行为描述文档，可以更佳简单，清晰的对应用进行描述； | 需要学习Yaml的规范，且在某些时候与一些自动化流程进行结合，会比较复杂； | 部署、运维等操作，尤其是批量操作时更为合适； |
| 纯Cli模式 | 在任何目录下，通过子命令`cli`进行触发，同样适用全部组件，例如`s cli deploy -p "{/"function/": /"function-name/"}"`，`s cli fc3 sync --region cn-hangzhou --function-name test -a default` | 相对来说可以更加简单，快速上手工具，并且可以非常简单的与自动化流程进行结合，降低了Yaml格式/规范的学习难度 | 对于一些复杂项目而言，需要在命令行中写过多的参数，出错的概率会比较高； | 更适合项目的管理，源自化操作 |

### 设计思路

> ❓ 为什么要同时存在 Yaml 模式和 Cli 模式？
> 💬 因为在长期的实践过程中，我们发现通过 Yaml 进行资源描述会相对来说更简单和方便，例如 K8S 等也都是通过 Yaml 进行资源描述的；但是，在某些情况下，Yaml 文件也可能成为一种负担，例如想要查看某个服务下的函数列表，查看某个地区下的服务列表，因为这样一个简单的事情要额外的去完成一个 Yaml 文件，就显得过于臃肿，所以，在 Serverless Devs 项目中，同时保留了两种使用方法。

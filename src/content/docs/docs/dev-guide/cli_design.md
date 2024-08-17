---
title: 命令行设计规范
---
# 命令行设计规范

## Exit Code 定义

| code | 含义                                               |
| ---- | -------------------------------------------------- |
| 0    | 正常退出                                           |
| 100  | Serverless Devs 工具本身错误退出                   |
| 101  | Serverless Devs 工具组件执行时，组件错误引起的退出 |

## 命令行设计规范

Serverless Devs 作为 Serverless 领域的开发者工具，其输出的标准化和规范化会在一定程度上对用户体验有比较明显的影响。

本文档将会通过一些文字和案例，对Serverless Devs的命令行工具输出，进行规范化升级。

### 规范详情

输出格式的规范目标是：

- 更清晰
- 更简约
- 不影响功能实用

基于以上三个原则，我们可以通过正常输出的形式、异常输出的形式等分别进行举例说明

#### 基本输出

基本输出的形式，整体上包括两个部分：

1. 项目执行阶段

    项目执行阶段主要包括一个基本格式:

    ```text
    ⌛ Steps for process
    ====================
    ```

    采用重写机制，不断的更新输出内容，每个项目执行完成可以输出相对应的结果，示例：

    ```text
    ⌛ Steps for process
    ====================
    ✔ Pre-action completed (10s)
    ```

2. 结果输出阶段

    项目执行阶段主要包括一个基本格式:

    ```text
    🚀 Result for process
    ====================
    ```

    具体的项目输出采用`Yaml`的格式进行输出，输出时，项目名称要加下划线，如果没有输出则直接结束项目，示例：

    ```text
    🚀 Result for process
    ====================
    ✔ MyProject deployed (11s)
    fc-deploy-test:
      region: cn-hangzhou
      service:
        name: fc-deploy-service
        memorySize: 128
    ```

##### 单项目输出示例

![render1629447409205](https://img.alicdn.com/imgextra/i4/O1CN01Ljuu2R1Yeyn3PVr3G_!!6000000003085-1-tps-2566-804.gif)

##### 多项目输出示例

![render1629448703505](https://img.alicdn.com/imgextra/i4/O1CN01gBLVHk1zKoz1h2YD7_!!6000000006696-1-tps-2566-1444.gif)

#### 调试模式

当用户使用`--debug`进入到调试模式，则会打印非常详细的信息在控制台，但是这些信息将会以灰色形式打印出来，以保持整体的层次感：

![render1629448900851](https://img.alicdn.com/imgextra/i1/O1CN01Kmp9WX1q3783Cqraz_!!6000000005439-1-tps-2566-1444.gif)

#### 错误输出

当执行出现错误时，Serverless Devs要做到感知并输出相对应的内容：

```text
⌛ Steps for process
====================
✔ MyProject pre-action completed (10s)
✖ MyProject failed to deploy:

Error Message: 
t[r] is not a function

Env:   darwin, node v15.14.0
Docs:  https://github.com/serverless-devs/docs
Bugs:  https://github.com/Serverless-Devs/Serverless-Devs/issues
Logs:  ~/demo/demo/demo/s.log
```

动态效果为：

![render1629447327225](https://img.alicdn.com/imgextra/i4/O1CN01IJVzIh1QMe0XQ3Ofc_!!6000000001962-1-tps-2566-804.gif)

## 优先级定义

在使用 Serverless Devs 开发者工具时，会遇到一些带有默认值的参数/变量，这一部分将会针对这些参数/变量，进行优先级划分，在每个类别下面的列表中，上面的情况优先级高于下面的情况，例如`Yaml 文件优先级规范`为案例，描述为：

- 通过`-t/--template`参数指定的 Yaml 文件
- 默认的 Yaml 文件（`s.yaml`/`s.yml`，且`s.yaml`的优先级大于`s.yml`）

则 Serverless Devs 开发者工具在进行资源描述文件使用时，会优先选择`通过 -t/--template 参数指定的 Yaml 文件`，其次才会采用`默认的 Yaml 文件（ s.yaml/s.yml，且 s.yaml 的优先级大于 s.yml ）`

### Yaml 文件优先级规范

- 通过`-t/--template`参数指定的 Yaml 文件
- 默认的 Yaml 文件（`s.yaml`/`s.yml`，且`s.yaml`的优先级大于`s.yml`）

### 应用内资源部署顺序

如果一个Serverless Project 模型对应的 Yaml 文件中有多个的资源，系统会默认分析部署顺序，该部署顺序分为两个方面：

1. 是否已经制定flow流程

    - 按照指定的流程进行部署，没在流程中的不进行额外的操作

2. 没有指定flow流程

    - 分析项目中的依赖关系
    - 有依赖关系的按照依赖关系从前到后部署，无依赖关系的按Yaml配置的从上到下部署

具体请参考[spec执行顺序](../user-guide/spec.md#_6)

### 密钥使用顺序与规范

- 通过`-a/--access`参数指定的密钥信息
- 使用已经配置的`default`密钥信息
- 使用通过环境变量配置的`default_serverless_devs_key`密钥信息
- 不使用密钥信息 / 进入密钥信息配置引导

具体的流程图为：

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635841483040_20211102082444588067.png)

## 通过环境变量设置密钥

Serverless Devs 可以比较容易的通过环境变量进行密钥信息的设定。通过环境变量配置密钥的方法有两种：

1. 通过命令引入环境变量中的密钥：例如在环境变量中有`ALIBABA_CLOUD_ACCOUNT_ID`、`ALIBABA_CLOUD_ACCESS_KEY_ID`、`ALIBABA_CLOUD_ACCESS_KEY_SECRET`等相关内容，此时可以通过`s config add`命令进行添加：

    ```bash
    s config add -a default-aliyun --kl AccountID,AccessKeyID,AccessKeySecret --il ${ALIBABA_CLOUD_ACCOUNT_ID},${ALIBABA_CLOUD_ACCESS_KEY_ID},${ALIBABA_CLOUD_ACCESS_KEY_SECRET}
    ```

2. 通过指定环境变量的名字进行配置：例如当前有阿里云密钥对：
      - AccountID: temp_accountid
      - AccessKeyID: temp_accesskeyid
      - AccessKeySecret: temp_accesskeysecret  
       此时可以在环境变量中可以命名 key 为`*********_serverless_devs_key`，例如`default_serverless_devs_key`，value 为 JSON 字符串，例如：
      - Key：`default_serverless_devs_key`
      - Value：`{\"AccountID\":\"temp_accountid\",\"AccessKeyID\":\"temp_accesskeyid\",\"AccessKeySecret\":\"temp_accesskeysecret\"}`  
      此时，可以在配置密钥的时候指定密钥`default_serverless_devs_key`。

      在`s.yaml`配置如下:

      ```yaml
      edition: 3.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
      name: fcDeployApp       #  项目名称
      access: default_serverless_devs_key  #  秘钥别名

      resources:
       fc-deploy-test:
       component: fc-deploy  # 组件名称
       props: #  组件的属性值
           region: cn-shenzhen
           service:
           name: fc-deploy-service
      ```

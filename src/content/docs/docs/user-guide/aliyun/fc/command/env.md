---
title: 多环境Env
description: '多环境Env'
position: 7
category: '其他功能'
---

# Env 命令

利用 `env` 命令，您可以:
1. 通过基础设施即代码（IaC）的能力定义可复用的基础设施模板
2. 基于模板构建不同的测试、预发、生产等互相隔离的环境，并自动完成基础设施的搭建
3. 将函数的同一份代码部署到不同的环境上

- [Env 命令](#env-命令)
  - [命令解析](#命令解析)
  - [模板操作](#模板操作)
    - [模板开发](#模板开发)
      - [模板代码包结构](#模板代码包结构)
      - [模板示例](#模板示例)
    - [env init-template 命令](#env-init-template-命令)
    - [env apply-template 命令](#env-apply-template-命令)
    - [env describe-template 命令](#env-describe-template-命令)
    - [env remove-template 命令](#env-remove-template-命令)
    - [env list-templates 命令](#env-list-templates-命令)
  - [环境操作](#环境操作)
    - [权限说明](#权限说明)
    - [env init 命令](#env-init-命令)
      - [参数解析](#参数解析)
      - [操作案例](#操作案例)
    - [env deploy 命令](#env-deploy-命令)
      - [参数解析](#参数解析-1)
    - [env info / list 命令](#env-info--list-命令)
  - [进阶操作](#进阶操作)
    - [指定环境部署服务](#指定环境部署服务)
    - [使用环境的信息配置服务](#使用环境的信息配置服务)
    - [使用差异化配置](#使用差异化配置)
  - [背景及原理](#背景及原理)
    - [Serverless Devs 多环境](#serverless-devs-多环境)
    - [Infrastructure as Code](#infrastructure-as-code)
    - [整体工作流](#整体工作流)
    - [概念组成](#概念组成)
      - [Application](#application)
      - [Service](#service)
      - [Environment](#environment)
  - [操作案例: 管理员/开发人员围绕 FC 协作](#操作案例-管理员开发人员围绕-fc-协作)
    - [管理员：定义环境模板](#管理员定义环境模板)
      - [定义 IaC](#定义-iac)
      - [定义权限策略](#定义权限策略)
      - [发布模板](#发布模板)
    - [管理员：为开发人员提供环境](#管理员为开发人员提供环境)
      - [创建测试环境](#创建测试环境)
      - [创建生产环境](#创建生产环境)
    - [开发人员：将函数部署到指定环境](#开发人员将函数部署到指定环境)
      - [创建工程](#创建工程)
      - [部署服务到测试环境](#部署服务到测试环境)
      - [部署服务到生产环境，并使用差异化配置](#部署服务到生产环境并使用差异化配置)

## 命令解析

当执行命令 `env -h` / `env --help` 时，可以获取帮助文档。

## 模板操作

和开发人员开发函数代码不同，环境模板主要针对运维人员和平台管理员，采用基础设施即代码（IaC）来定义资源。通过环境模板，可以对开发人员屏蔽基础设施的复杂性并且有效控制权限半径，让开发人员自助、安全地部署自己的服务。

### 模板开发
环境模板采用 IaC 来定义资源，目前只支持 [Terraform](https://www.terraform.io/) 类型的模板。
#### 模板代码包结构

环境模板的代码目录要包含两类文件：
1. `IaC` 文件：即 `Terraform` 的 `.tf` 文件，目录中可以有多个 `.tf` 文件，注册模板时组件会将所有 `.tf` 合并成一份 `HCL` 代码，关于一个目录下多个 `.tf` 文件的合并可以参考 [官方文档](https://www.terraform.io/language/files/override)
2. `policy.json`：[RAM](https://www.aliyun.com/product/ram?spm=5176.19720258.J_3207526240.103.51212c4aruIq9h) 的权限策略 `数组`，支持自定义策略和系统策略，声明了使用该模板创建资源所需要的权限，授信对象是 [函数计算](https://www.aliyun.com/product/fc?spm=5176.19720258.J_3207526240.63.2c5d2c4apUM9KP)。当使用该模板创建环境时，组件会创建相应的 [服务角色](https://help.aliyun.com/document_detail/160674.html) 并绑定模板定义的权限策略。部署环境时，函数计算会通过角色扮演的方式访问模板中定义的资源。关于权限策略的介绍可以参考 [官方文档](https://help.aliyun.com/document_detail/93732.html)

模板 IaC 文件的核心要素为：
1. variable：定义模板的参数，用户使用该模板创建环境时输入参数的值
2. resource：定义模板的资源，环境部署时完成资源的供给
3. output：定义模板的输出，环境部署成功后透出相应输出，可以被其他服务所访问

![alt](https://img.alicdn.com/imgextra/i1/O1CN01mjhF1V1PdIcpVLfUN_!!6000000001863-2-tps-2234-672.png)

#### 模板示例

定义一个只提供 VPC、VSwitch 的环境模板：
* IaC（`main.tf`）
  ```hcl
  resource "random_id" "this" {
    byte_length = 8
  }
  locals {
    default_description  = "Auto created by serverless devs with terraform"
    default_name_prefix  = var.namePrefix == "" ? "serverless-devs" : var.namePrefix
    default_name_suffix  = random_id.this.hex
    default_name         = "${local.default_name_prefix}-${local.default_name_suffix}"
    default_vpc_cdir     = "192.168.0.0/16"
    default_vswitch_cdir = "192.168.1.0/24"
  }

  resource "alicloud_vpc" "vpc" {
    vpc_name    = local.default_name
    cidr_block  = local.default_vpc_cdir
    description = local.default_description
  }
  data "alicloud_fc_zones" "fc-zone" {}

  resource "alicloud_vswitch" "vsw" {
    vpc_id       = alicloud_vpc.vpc.id
    vswitch_name = local.default_name
    cidr_block   = local.default_vswitch_cdir
    zone_id      = data.alicloud_fc_zones.fc-zone.ids.0
    description  = local.default_description
  }

  variable "namePrefix" {
    default = ""
    type    = string
  }

  output "vpcId" {
    value = alicloud_vpc.vpc.id
  }

  output "vswitchId" {
    value = alicloud_vswitch.vsw.id
  }
  ``` 

* `policy.json`
  ```json
  [
    {
      "statement": [
        {
          "Effect": "Allow",
          "Action": [
            "vpc:CreateVpc",
            "vpc:CreateVSwitch",
            "vpc:DeleteVpc",
            "vpc:DeleteVSwitch",
            "vpc:ModifyVpcAttribute",
            "vpc:ModifyVSwitchAttribute"
          ],
          "Resource": "*"
        },
        {
          "Effect": "Allow",
          "Action": [
            "fc:GetAccountSettings"
          ],
          "Resource": "*"
        }
      ]
    },
    "AliyunVPCReadOnlyAccess"
  ]
  ```

### env init-template 命令
通过 `s env init-template` 可以进入引导式操作创建一个环境模板。

```shell
s env init-template
```

执行后，会提示您输入一系列参数，具体参数含义如下

| 参数全称    | 例子         | 参数含义                                    |
| ----------- | ------------ | ------------------------------------------- |
| name        | testing      | 环境模板名字                                |
| description | it is a demo | 环境模板描述                                |
| engine      | terraform    | IaC 执行引擎，目前只支持 `Terraform`        |
| code        | ./infra      | [模板代码目录](#模板开发)，绝对或者相对路径 |

![Alt Text](https://img.alicdn.com/imgextra/i4/O1CN01uF01GS1VY9sOWHe7Q_!!6000000002664-1-tps-1158-484.gif)

### env apply-template 命令
通过 `s env apply-template` 可以创建或者更新一个环境模板。

```shell
s env apply-template --name testing --description 'it is a demo' --code ./infra
```
参数含义如下：

| 参数全称    | 是否必填 | 参数含义                                    |
| ----------- | -------- | ------------------------------------------- |
| name        | True     | 环境模板名字                                |
| description | False    | 环境模板描述                                |
| code        | False    | [模板代码目录](#模板开发)，绝对或者相对路径 |

操作成功后，会返回当前模板的 [详细信息](#env-describe-template-命令)
### env describe-template 命令

通过 `s env describe-template` 可以查看环境模板详情。

```shell
s env describe-template --name testing
```
查询结果会返回当前模板的 `variable`、`outputs`、`状态`、 `policy`、`文本内容`、`版本` 等信息。
```yaml
  name:        test-template
  description: test
  type:        EnvironmentTemplate
  engine:      terraform
  version:     1
  generation:  0
  status: 
    observedGeneration: 0
    observedTime:       2022-05-18T13:17:37Z
    outputs: 
      - 
        name:      vpcId
        sensitive: false
      - 
        name:      vswitchId
        sensitive: false
    phase:              DeploySuccess
    variables: 
      - 
        defaultJson: ""
        name:        namePrefix
        nullable:    true
        sensitive:   false
        type:        string
    ramPolicy:          [{"statement":[{"Effect":"Allow","Action":["vpc:CreateVpc","vpc:CreateVSwitch","vpc:DeleteVpc","vpc:DeleteVSwitch","vpc:ModifyVpcAttribute","vpc:ModifyVSwitchAttribute"],"Resource":"*"},{"Effect":"Allow","Action":["fc:GetAccountSettings"],"Resource":"*"}]},"AliyunVPCReadOnlyAccess"]
    rawContent: 
      """
        
        resource "random_id" "this" {
          byte_length = 8
        }
        locals {
          default_description  = "Auto created by serverless devs with terraform"
          default_name_prefix  = var.namePrefix == "" ? "serverless-devs" : var.namePrefix
          default_name_suffix  = random_id.this.hex
          default_name         = "${local.default_name_prefix}-${local.default_name_suffix}"
          default_vpc_cdir     = "192.168.0.0/16"
          default_vswitch_cdir = "192.168.1.0/24"
        }
        
        resource "alicloud_vpc" "vpc" {
          vpc_name    = local.default_name
          cidr_block  = local.default_vpc_cdir
          description = local.default_description
        }
        data "alicloud_fc_zones" "fc-zone" {}
        
        resource "alicloud_vswitch" "vsw" {
          vpc_id       = alicloud_vpc.vpc.id
          vswitch_name = local.default_name
          cidr_block   = local.default_vswitch_cdir
          zone_id      = data.alicloud_fc_zones.fc-zone.ids.0
          description  = local.default_description
        }
        
        variable "namePrefix" {
          default = ""
          type    = string
        }
        
        output "vpcId" {
          value = alicloud_vpc.vpc.id
        }
        
        output "vswitchId" {
          value = alicloud_vswitch.vsw.id
        }
        
      """
```
### env remove-template 命令
通过 `s env remove-template` 可以删除一个环境模板，但不会删除具体的云资源。

```shell
s env remove-template --name testing
```
**注意：如果环境模板被某个环境所引用，环境模板会删除失败，必须先删除环境后再删除模板。**

### env list-templates 命令
通过 `s env list-templates` 可以查询账号下所有的环境模板。

```shell
s env list-templates
```

## 环境操作

### 权限说明

环境操作基础设施时需要操作对应云资源的权限，需要授予函数计算服务账号以角色扮演的方式访问您的云资源，因此需要：

1. 创建普通的服务角色，授信服务选择[函数计算](https://www.aliyun.com/product/fc)
2. 为该角色授予环境所需要的权限

您可以在环境中使用指定的 `roleArn`，也可以授权让 Serverless Devs 自动创建环境所需要的角色

### env init 命令

通过 `s env init` 可以创建一个环境。

```shell
s env init --filename fc-env-testing.yaml
```

执行成功后，会在本地 `.s` 目录下创建 `env/fc-env-testing.yaml` 描述文件，您可以查看并编辑该文件。

```yaml
#.s/env/fc-env-testing.yaml
name: fc-env-testing #环境名
region: cn-hangzhou #地域
roleArn: acs:ram::${accountId}:role/aliyunfcdefaultrole #关联角色arn
template: "serverless-devs.com/alicloud-fc/environment"  #引用环境模板
props: #以下参数由环境模板定义
  namePrefix: fc-testing #资源名字前缀
  createLog: true #是否创建sls project、logstore，默认false
  createBucket: true #是否创建oss bucket，默认false
  createNas: true #是否创建nas文件系统、挂载点，默认false
```

#### 参数解析


| 参数全称  | 参数缩写 | Yaml模式下必填 | 例子         | 参数含义                                            |
| --------- | -------- | -------------- | ------------ | --------------------------------------------------- |
| name      | n        | 选填           | testing      | 指定环境名                                          |
| filename  | f        | 选填           | testing.yaml | 指定环境配置文件进行创建                            |
| overwrite | o        | 选填           | false        | 当本地存在相同名称的环境时是否进行覆盖，默认值false |

#### 操作案例

可以直接通过 `s env init` 命令，执行成功后会进入引导式操作，提示您输入环境名以及其他属性。

![Alt Text](https://img.alicdn.com/imgextra/i4/O1CN01fEkUrH1MnsuywXgX4_!!6000000001480-1-tps-1668-606.gif)

### env deploy 命令

通过 `s env deploy` 可以部署指定的环境。

```shell
s env deploy --name fc-env-testing
```

执行指令后，Serverless Devs 会使用 [环境模板](#模板操作) 中声明的 IaC 完成环境基础设施的搭建，此时环境的所有信息都是持久化的，您不用担心本地配置文件删除后无法恢复的问题。

#### 参数解析


| 参数全称 | 参数缩写 | Yaml模式下必填 | 例子    | 参数含义   |
| -------- | -------- | -------------- | ------- | ---------- |
| name     | n        | 必填           | testing | 指定环境名 |

### env info / list 命令

通过 `s env info` 可以查询指定环境信息。

```
s env info --name fc-env-testing
```

通过 `s env list` 可以查询账号下全部环境的信息。

执行指令后，组件会返回环境当前的信息，包括基本信息以及资源 output 详情。

## 进阶操作

### 指定环境部署服务

在 `s deploy` 命令的基础上，可以通过 `s deploy --env` 将函数部署到指定的环境中。

```
s deploy --env fc-env-testing
```

执行指令后，组件会先判断环境是否已经部署，如果环境状态为 ready 则会将 `s.yaml `中的服务部署到该环境上；
否则会先部署环境，再部署 `s.yaml` 中的服务。

### 使用环境的信息配置服务

当指定环境部署时，您可以使用环境的信息覆盖服务的配置：

* 如果要使用环境提供的 SLS 资源，可以在 `s.yaml` 中如下指定 logConfig

  ```yaml
  logConfig:
    project: ${environment.outputs.slsProject}
    logstore: ${environment.outputs.slsLogStore}
  ```
* 如果要使用环境提供的 NAS 资源，可以在 `s.yaml` 中如下指定 vpcConfig 和 nasConfig

  ```yaml
  vpcConfig:
    vpcId: ${environment.outputs.vpcId}
    securityGroupId: ${environment.outputs.securityGroupId}
    vswitchIds:
    - ${environment.outputs.vswitchId}
  nasConfig:
    userId: 10003
    groupId: 10003
    mountPoints:
    - serverAddr: ${environment.outputs.nasMountTargetId}
      nasDir: /fc-deploy-service
      fcDir: /mnt/auto
  ```
* 在实际场景中，FC 的服务概念往往和一个环境相关联，通常在创建服务时服务名要带上环境的后缀，比如 **service-testing**/**service-prod**。当指定环境部署时，您完全可以在 `s.yaml` 中如下设置，让您的服务和环境自动关联

  ```yaml
  service:
      name: ${environment.name}
  ```

  ```yaml
  service:
      name: my-fc-${environment.name}
  ```
* 当指定了环境时，您无需在 props 中指定 region，组件会自动保证将服务部署到环境所在的 region。当 `s.yaml` 中的 region 和环境所在 region 不匹配时，会自动替换成环境所在 region

### 使用差异化配置

当您将服务部署到指定的环境上时，如果希望在该环境下使用差异化的配置（比如测试环境的函数内存为1024，生产环境的内存为2048)，可以通过 `--overlays` 参数。
`--overlays` 参数接收的数据格式是 `json` 或者 `yaml`

```shell
s deploy --env fc-env-testing --overlays '{"function":{"memorySize":256,"timeout":120}}'
```

也可以使用 yaml 文件来设置 `overlays`

```shell
s deploy --env fc-test-2 --overlays overlay.yaml --patch-strategy merge
```

通过 ``--overlays`` 参数，组件会使用指定的配置增量替换(Patch操作) props 中的值。patch 有两种策略：

1. 合并(merge)：默认策略，通过 `--patch-strategy merge` 生效，指定该策略时，在遇到相同的 key 值时，会将对应的 value 进行合并
2. 替换(replace)：通过 `--patch-strategy replace` 生效，指定该策略时，在遇到相同的 key 值时，会使用 overlays 中的 value 直接进行替换

## 背景及原理

随着以现代化应用的普及，项目中会涉及越来越多的云资源。对于一家现代化企业，平台团队根据业务场景进行抽象，对研发人员屏蔽了基础设施；基础设施团队根据职责边界，又为平台团队规划了不同的子账号以及权限策略。
这种分层管理必然的结果是应用和基础设施的生命周期完全不同，基础设施管理员、平台管理员、研发人员关注的云资源视角也不尽相同。比如：

* 基础设施管理员管理整家企业的云账号，为各个平台团队设置不同子账号以及访问策略；
* 平台管理员持有子账号，根据容灾及高可用场景划分网络、安全、流量策略，并且根据业务场景规划日志、存储、数据库的规格、备份配置、Quota 等，或者购买 K8s 集群；
* 研发人员在使用平台过程中，仅需关注代码、数据、配置等程序相关内容：
  * 当需要访问数据库时，向平台索要数据连接串
  * 当需进行日志采集时，仅需采集路径提交给平台，由平台操作日志服务完成日志采集配置挂载
  * 当需要使用持久化存储时，仅需将本地挂载路径提交给平台，由平台操作存储服务完成文件目录挂载
  * 当需要访问 K8s 集群时，向平台索要 K8s 访问凭证

因此，随着职责边界的不同，必然存在的天然的关注点分离，比较有效的做法是将各个环境进行模板化，比如：

* 基础设施管理员将账号以及访问策略封装成 Policy 模板
* 平台管理员选择 Policy 模板，填写Policy/Role name，即可自助创建服务账号，并且关联访问策略
* 平台管理员将网络、安全、流量策略、K8s 集群根据测试/生产隔离的需求封装成 Environment 模板；将日志服务、存储、数据库这些需要伴随应用实时开通的资源封装成 Service 模板
* 研发人员选择 Environment 模板进行环境部署；选择 Service 模板，以及关联的环境，将日志、存储、数据库，已经应用程序部署到指定的环境上

通过这种分边界的模板化的处理方式，可以让企业不同的团队自助完成基础设施的搭建，提高生产效率的同时，又保证了权限隔离，让基础设施受到保护。

### Serverless Devs 多环境

Serverless Devs 是一款面向 Serverless 应用生命周期的 DevsOps 工具，目前缺少对多环境的内在支持。目前的做法是为不同的环境维护不同的 s.yaml，或者
通过环境变量的方式用以区分多环境，这种方式的弊端主要有3点：

1. 配置维护成本比较高，当需要更新环境时需要重新发起部署，对接 CI/CD 系统时，就要重新发起一次完整的发布上线操作。但通常情况下环境的变化（例如升降配、更新权限）对程序来说是安全的，不需要发起一次上线；
2. 难以实现基础设施团队、平台团队、研发团队分层协作的场景。比如研发人员需要将程序使用的 VPC、VSwitch、文件系统ID等无关信息进行明文存储，并且需要对子账号ak/sk进行明文存储，无疑减低了研发效率并增加了安全风险；
3. 对于一些资源的变更可能会引起实例重建或者不能提供服务（比如更改数据库引擎、ACK 绑定的 SLB），这些风险组件开发者未必会清楚也可能会忽略，即使清楚也需要 Case By Case 的通过很多判断代码来解决，也增加了组件开发的复杂度和使用成本；

如果采用上面分层的模板化方案，以上问题就可以顺利解决：

1. 平台团队通过封装 Environment 模板，仅需对研发人员暴露安全的参数（比如实例规格），研发人员可以直接更新环境，而不需要重新发起一次上线操作
2. 平台团队通过封装 Policy 模板，研发人员在部署环境或者服务涉及到资源的操作时，通过角色扮演的方式安全访问云资源，不需要感知ak/sk

### Infrastructure as Code

Serverless Devs 离不开对云资源的操作，现在的做法是在组件中直接使用云产品 SDK，或者封装成 Pulumi Stack，但都需要通过 GPL 来完成，这需要开发者对 TypeScript 有一定开发经验，对于非 Node.js 的玩家来说，还是有一定的学习成本的，也不利于组件的功能扩展。

目前基础设施管理最强大的工具是 [Terraform](https://www.terraform.io/)，基本已成为事实标准。Terraform HCL 本身是一种 DSL，任何生态都能很好地兼容，特别是 Provider 极其丰富。
阿里云的云产品如果对接 POP，已经可以自动生成 Terraform 的 Provider，其可靠性和接入便捷程度已经相当之高。

如果将 Serverless Devs 关于基础设施操作的能力抽离出来，通过 IaC 来完成，这样可以极大拓宽用户领域，用户可以通过编写 Terraform 文件来定义自己的基础设施。

结合上述，通过分层化的模板来管理基础设施，并且和 Serverless Devs 相结合，可以为 Serverless Devs 用户带来以下价值:

* 满足企业级IT基础设施的复杂场景：基础设施团队/平台团队/业务团队自助化操作、安全隔离、多环境 CI/CD
* 集成各种开源生态，实现应用架构以及基础设施的可定制、可扩展、可重用能力：
  - 可自定义 IaC（Terraform/Pulumi/Crossplane）、应用交付方式(镜像/代码)、CI/CD Pipeline（GithubAction/Jenkins）
  - 环境和服务相解耦，通过模板组合及引用完成能力扩展及复用

### 整体工作流

![alt](https://img.alicdn.com/imgextra/i1/O1CN014O2OLr1gRFequqnOC_!!6000000004138-2-tps-2248-1596.png)

### 概念组成

![alt](https://img.alicdn.com/imgextra/i2/O1CN01TYGUXA1nr5JBz557q_!!6000000005142-2-tps-1590-926.png)

#### Application

一组 `Service`、`Policy`、`Environment`、`Pipeline` 所有资源的集合

#### Service

`Application` 可以关联一组 `Service`，每个 `Service` 都是对代码、程序的描述，只描述跟程序相关的信息，比如函数配置、日志采集配置(只用关注采集路径)

* 对于函数型应用，`Service` 一般描述一个函数
* 对于容器化应用，`Service` 一般描述一个Workload

#### Environment

`Service` 运行在多个 `Environment` 上，每个 `Environment` 都是 `Service` 运行的载体，描述了基础设施(如网络、集群、存储)的配置，以及应用运行时的运维配置(如弹性伸缩、资源规格)

* `Environment` 是部署的范畴，不关注跟代码相关配置
* `Environment` 可以被多个 `Service` 共享

## 操作案例: 管理员/开发人员围绕 FC 协作

### 管理员：定义环境模板

为每个环境提供完全新建的基础设施，自动创建 VPC、VSwitch、Security、OSS、SLS、NAS
#### 定义 IaC

```hcl
resource "random_id" "this" {
  byte_length = 8
}
locals {
  default_description  = "Auto created by serverless devs with terraform"
  default_name_prefix  = var.namePrefix == "" ? "serverless-devs" : var.namePrefix
  default_name_suffix  = random_id.this.hex
  default_name         = "${local.default_name_prefix}-${local.default_name_suffix}"
  default_vpc_cdir     = "192.168.0.0/16"
  default_vswitch_cdir = "192.168.1.0/24"
}

resource "alicloud_vpc" "vpc" {
  vpc_name    = local.default_name
  cidr_block  = local.default_vpc_cdir
  description = local.default_description
}
data "alicloud_fc_zones" "fc-zone" {}

resource "alicloud_vswitch" "vsw" {
  vpc_id       = alicloud_vpc.vpc.id
  vswitch_name = local.default_name
  cidr_block   = local.default_vswitch_cdir
  zone_id      = data.alicloud_fc_zones.fc-zone.ids.0
  description  = local.default_description
}

locals {
  ingress_with_cidr_blocks = [
    {
      from_port  = -1
      to_port    = -1
      protocol   = "all"
      cidr_block = "192.168.0.0/16"
      priority   = 100
    },
    {
      from_port  = -1
      to_port    = -1
      protocol   = "icmp"
      cidr_block = "0.0.0.0/0"
      priority   = 100
    },
    {
      from_port  = 443
      to_port    = 443
      protocol   = "tcp"
      cidr_block = "0.0.0.0/0"
      priority   = 100
    },
    {
      from_port  = 80
      to_port    = 80
      protocol   = "tcp"
      cidr_block = "0.0.0.0/0"
      priority   = 100
    },
  ]
}

resource "alicloud_security_group_rule" "sg_rule" {
  count             = length(local.ingress_with_cidr_blocks)
  security_group_id = alicloud_security_group.sg.id

  type        = "ingress"
  ip_protocol = local.ingress_with_cidr_blocks[count.index].protocol
  nic_type    = "intranet"
  port_range  = "${local.ingress_with_cidr_blocks[count.index].from_port}/${local.ingress_with_cidr_blocks[count.index].to_port}"
  cidr_ip     = local.ingress_with_cidr_blocks[count.index].cidr_block
  priority    = local.ingress_with_cidr_blocks[count.index].priority
  description = local.default_description
}

resource "alicloud_security_group" "sg" {
  name        = local.default_name
  description = local.default_description
  vpc_id      = alicloud_vpc.vpc.id
}

resource "alicloud_log_project" "project" {
  count       = var.createLog ? 1 : 0
  name        = local.default_name
  description = local.default_description
}

resource "alicloud_log_store" "store" {
  count                 = var.createLog ? 1 : 0
  project               = alicloud_log_project.project.0.name
  name                  = local.default_name
  shard_count           = 3
  auto_split            = true
  max_split_shard_count = 60
  append_meta           = true
}

resource "alicloud_oss_bucket" "bucket" {
  count           = var.createBucket ? 1 : 0
  bucket          = local.default_name
  acl             = "private"
  storage_class   = "Standard"
  redundancy_type = "LRS"
}

resource "alicloud_nas_file_system" "nas_fs" {
  count         = var.createNas ? 1 : 0
  protocol_type = "NFS"
  storage_type  = "Capacity"
}

resource "alicloud_nas_access_group" "nas_ag" {
  count = var.createNas ? 1 : 0
  name  = local.default_name
  type  = "Vpc"
}

resource "alicloud_nas_mount_target" "nas_mt" {
  count             = var.createNas ? 1 : 0
  file_system_id    = alicloud_nas_file_system.nas_fs.0.id
  access_group_name = alicloud_nas_access_group.nas_ag.0.name
  vswitch_id        = alicloud_vswitch.vsw.id
  security_group_id = alicloud_security_group.sg.id
}


variable "namePrefix" {
  default = ""
  type    = string
}

variable "createLog" {
  default = true
  type    = bool
}

variable "createBucket" {
  default = true
  type    = bool
}

variable "createNas" {
  default = true
  type    = bool
}

output "vpcId" {
  value = alicloud_vpc.vpc.id
}

output "vswitchId" {
  value = alicloud_vswitch.vsw.id
}

output "securityGroupId" {
  value = alicloud_security_group.sg.id
}

output "nasId" {
  value = var.createNas ? alicloud_nas_file_system.nas_fs.0.id : null
}

output "nasMountTargetId" {
  value = var.createNas ? replace(alicloud_nas_mount_target.nas_mt.0.id, "${alicloud_nas_file_system.nas_fs.0.id}:", "") : null
}

output "slsProject" {
  value = var.createLog ? alicloud_log_project.project.0.name : null
}

output "slsLogStore" {
  value = var.createLog ? alicloud_log_store.store.0.name : null
}

output "ossBucketName" {
  value = var.createBucket ? alicloud_oss_bucket.bucket.0.bucket : null
}

output "ossExtranetEndpoint" {
  value = var.createBucket ? alicloud_oss_bucket.bucket.0.extranet_endpoint : null
}

output "ossIntranetEndpoint" {
  value = var.createBucket ? alicloud_oss_bucket.bucket.0.intranet_endpoint : null
}
```
#### 定义权限策略
```json
[
  {
    "statement": [
      {
        "Effect": "Allow",
        "Action": [
          "vpc:CreateVpc",
          "vpc:CreateVSwitch",
          "vpc:DeleteVpc",
          "vpc:DeleteVSwitch",
          "vpc:ModifyVpcAttribute",
          "vpc:ModifyVSwitchAttribute"
        ],
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Action": [
          "ecs:CreateSecurityGroup",
          "ecs:ModifySecurityGroupAttribute",
          "ecs:ModifySecurityGroupRule",
          "ecs:ModifySecurityGroupPolicy",
          "ecs:ModifySecurityGroupEgressRule",
          "ecs:DeleteSecurityGroup",
          "ecs:AuthorizeSecurityGroup",
          "ecs:AuthorizeSecurityGroupEgress",
          "ecs:RevokeSecurityGroup",
          "ecs:RevokeSecurityGroupEgress"
        ],
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Action": [
          "nas:CreateMountTarget",
          "nas:ModifyMountTarget",
          "nas:CreateFileSystem",
          "nas:ModifyFileSystem",
          "nas:CreateAccessGroup",
          "nas:CreateAccessRule",
          "nas:ModifyAccessGroup",
          "nas:ModifyAccessRule",
          "nas:DeleteAccessGroup",
          "nas:DeleteAccessRule",
          "nas:DeleteFileSystem",
          "nas:DeleteMountTarget"
        ],
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Action": [
          "fc:GetAccountSettings"
        ],
        "Resource": "*"
      }
    ]
  },
  "AliyunFCDefaultRolePolicy",
  "AliyunECSReadOnlyAccess",
  "AliyunVPCReadOnlyAccess",
  "AliyunNASReadOnlyAccess"
]
```
#### 发布模板
```shell
s env apply-template --name fc-template --code ./infra
```

### 管理员：为开发人员提供环境
#### 创建测试环境

```
s env init --name env-testing --template-name fc-template
```

#### 创建生产环境

```
s env init --name env-production --template-name fc-template
```
### 开发人员：将函数部署到指定环境

#### 创建工程

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: component-test   #  项目名称
access: "default"  #  秘钥别名

services:
  srv-test: #  服务名称
    component: ${path(../..)}  # 这里引入的是相对路径，正式配置替换成你自己的component名称即可
    props:
      #      region: cn-zhangjiakou
      service:
        name: my-svc-${environment.name}
        description: demo for fc-deploy component
        internetAccess: true
        vpcConfig:
          vpcId: ${environment.outputs.vpcId}
          securityGroupId: ${environment.outputs.securityGroupId}
          vswitchIds:
            - ${environment.outputs.vswitchId}
        logConfig:
          project: ${environment.outputs.slsProject}
          logstore: ${environment.outputs.slsLogStore}
        nasConfig:
          userId: 10003
          groupId: 10003
          mountPoints:
            - serverAddr: ${environment.outputs.nasMountTargetId}
              nasDir: /fc-deploy-service
              fcDir: /mnt/auto
      function:
        name: multi-envs
        codeUri: ./
        runtime: nodejs12
        handler: index.handler
        memorySize: 128
        timeout: 60
        instanceConcurrency: 1
        instanceType: e1
      triggers:
        - name: httpTrigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET

```

#### 部署服务到测试环境

```
s deploy --env env-testing
```

#### 部署服务到生产环境，并使用差异化配置

```
s deploy --env env-testing --overlays '{"function":{"memorySize":256,"timeout":120}}'
```

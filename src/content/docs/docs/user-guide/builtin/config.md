---
title: Config 密钥配置
---
# Config 命令

当执行`s config -h`之后，可以进行相关帮助信息的查看：

```bash
Usage: s config [commands] [options]

Configure vendors account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

📖  Document: https://serverless.help/t/s/config

Options:
  -h, --help                      Display help for command

Commands:
  add [options]                       Add an account
  get [options]                       Get accounts
  delete [options]                    Delete an account
  rename [options]                    Rename an account
```

## config add 命令

通过`config add`命令，可以进行密钥的配置，使用者可以通过不同厂商的默认密钥模板进行密钥配置，也可以通过`Custom`选项进行自定义密钥配置。

通过`-h/--help`可以查看到配置帮助：

```bash
Usage: s config add [options]

You can add an account

    Example:
        $ s config add
        $ s config add --AccessKey ****** --SecretKey ******
        $ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ****** --SecurityToken ******
        $ s config add --keyList key1,key2,key3 --infoList value1,value2,value3

    Configuration parameters template for vendors:
        alibaba: AccessKeyID, AccessKeySecret
        aws: AccessKeyID, SecretAccessKey
        baidu: AccessKeyID, SecretAccessKey
        huawei: AccessKey, SecretKey
        google: PrivateKeyData
        tencent: AccountID, SecretID, SecretKey

🧭  How to get the key: https://serverless.help/t/s/provider_config

Options:
  --AccountID <AccountID>              AccountID of key information
  --AccessKeyID <AccessKeyID>          AccessKeyID of key information
  --AccessKeySecret <AccessKeySecret>  AccessKeySecret of key information
  --SecurityToken <SecurityToken>      SecurityToken of key information
  --SecretAccessKey <SecretAccessKey>  SecretAccessKey of key information
  --AccessKey <AccessKey>              AccessKey of key information
  --SecretKey <SecretKey>              SecretKey of key information
  --SecretID <SecretID>                SecretID of key information
  --PrivateKeyData <PrivateKeyData>    PrivateKeyData of key information
  --kl, --keyList <keyList>            Keys of key information, like: --kl key1,key2,key3
  --il, --infoList <infoList>          Values of key information, like: --il info1,info2,info3
  -f, --force                          Mandatory overwrite key information
  -h, --help                           Display help for command
```

### 参数解析

| 参数全称        | 参数缩写 | 是否必填 | 参数含义                                                                       |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------ |
| AccountID       | -        | 选填     | 部分云厂商配置密钥所需要的默认字段                                             |
| AccessKeyID     | -        | 选填     | 部分云厂商配置密钥所需要的默认字段                                             |
| AccessKeySecret | -        | 选填     | 部分云厂商配置密钥所需要的默认字段                                             |
| SecurityToken   | -        | 选填     | 部分云厂商配置密钥所需要的默认字段                                             |
| SecretAccessKey | -        | 选填     | 部分云厂商配置密钥所需要的默认字段                                             |
| AccessKey       | -        | 选填     | 部分云厂商配置密钥所需要的默认字段                                             |
| SecretKey       | -        | 选填     | 部分云厂商配置密钥所需要的默认字段                                             |
| SecretID        | -        | 选填     | 部分云厂商配置密钥所需要的默认字段                                             |
| PrivateKeyData  | -        | 选填     | 部分云厂商配置密钥所需要的默认字段                                             |
| keyList         | kl       | 选填     | 在默认字段无法满足配置诉求时，可以通过`keyList`与`infoList`进行批量自定义配置  |
| infoList        | il       | 选填     | 在默认字段无法满足配置诉求时，可以通过``keyList`与`infoList`进行批量自定义配置 |
| access          | a        | 选填     | 密钥的别名                                                                     |
| force           | f        | 选填     | 强制修改/覆盖已经配置的密钥信息                                                |

### 操作案例

可以通过`config add`直接进行密钥的添加：

```bash
$ s config add 

? Please select a provider: (Use arrow keys)
❯ Alibaba Cloud (alibaba) 
  AWS (aws) 
  Azure (azure) 
  Baidu Cloud (baidu) 
  Google Cloud (google) 
  Huawei Cloud (huawei) 
  Tencent Cloud (tencent) 
(Move up and down to reveal more choices)
```

当使用者选择某个选项之后，系统会进行交互式引导：

```bash
s config add 

? Please select a provider: Alibaba Cloud (alibaba)
🧭 Refer to the document for Alibaba Cloud key: https://serverless.help/t/s/alibabacloud
? AccessKeyID:  ******
? AccessKeySecret:  ******
? Please create alias for key pair. If not, please enter to skip (default-2) 
Alias:      default-2
Credential: 
  __provider:      Alibaba Cloud
  AccessKeyID:     LTA******************KNA
  AccessKeySecret: U2q************************RuI
  AccountID:       124**********881
```

也可以通过命令式直接进行密钥的添加：
```bash
$ s config add --AccessKeyID ****** --AccessKeySecret ****** 
```

或者添加自定义内容：
```bash
$ s config add -kl key1,key2,key3 -il info1,info2,info3
```

- 常见云厂商密钥配置内容

```
alibaba:    AccountID, AccessKeyID, AccessKeySecret,
aws:        AccessKeyID, SecretAccessKey,
baidu:      AccessKeyID, SecretAccessKey,
huawei:     AccessKeyID, SecretAccessKey,
azure:      KeyVaultName, TenantID, ClientID, ClientSecret,
tencent:    AccountID, SecretID, SecretKey,
google:     PrivateKeyData
```

> - 通过环境变量获取密钥方法： 这一部分可能会根据不同的文档有不同的可能性，所以需要参考对应的文档进行环境变量对应的`Key-Value`确定。
> - 不同云厂商获取密钥获取请参考[云厂商密钥配置](#cloud-vendor)

## config get 命令

通过`config get`命令，您可以获得配置过的账号信息。

通过`-h/--help`可以查看到配置帮助：

```bash
$ s config get -h

Usage: s config get [options]

You can get accounts.
 
  Example:
    $ s config get
    $ s config get -a demo
    
📖  Document: https://serverless.help/t/s/config

Options:
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义   |
| -------- | -------- | -------- | ---------- |
| access   | a        | 选填     | 密钥的别名 |

### 操作案例

如果想要获取某个已经配置的密钥详情，可以通过`config get`进行获取，例如，想要获取别名为`test`的密钥信息，就可以执行：

```bash
$ s config get -a test
test:
  AccountID: 146**********468
  AccessKeyID: LTA******************f5Q
  AccessKeySecret: qDN************************Xp7
```

如果想获得全部的一配置的密钥信息，可以直接通过`config get`不加参数的形式获取：

```bash
$ s config get
default:
  AccountID: 158**********465
  AccessKeyID: LTA******************ZCW
  AccessKeySecret: mDL************************odO
test:
  AccountID: 146**********468
  AccessKeyID: LTA******************f5Q
  AccessKeySecret: qDN************************Xp7
release:
  AccountID: 176**********635
  AccessKeyID: LTA******************Yy3
  AccessKeySecret: LhT************************VB5
```

## config delete 命令

通过`config delete`命令，您可以删除配置过的账号信息。

通过`-h/--help`可以查看到配置帮助：

```bash
$ s config delete -h

Usage: s config delete [options]

You can delete an account.
  
  Example:
    $ s config delete -a demo
    
📖  Document: https://serverless.help/t/s/config

Options:
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义   |
| -------- | -------- | -------- | ---------- |
| access   | a        | 必填     | 密钥的别名 |

### 操作案例

如果想要删除某个已经配置的密钥，可以通过`config delete`进行删除，例如，想要删除别名为`test`的密钥信息，就可以执行：

```bash
$ s config delete -a test
Access [test] has been successfully deleted.
```

## config rename 命令

通过`config rename`命令，您可以更改配置过的密钥信息名称。

通过`-h/--help`可以查看到配置帮助：

```bash
$ s config rename -h

Usage: s config rename [options]

You can rename an account.
  
  Example:
    $ s config rename --source source --target target
    
📖  Document: https://serverless.help/t/s/config

Options:
  --source <source>               Source alias name
  --target <target>               Target alias name
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义         |
| -------- | -------- | -------- | ---------------- |
| source   | -        | 必填     | 原始密钥的别名   |
| target   | -        | 必填     | 变更后密钥的别名 |

### 操作案例

如果想要变更某个已经配置的密钥的别名，可以通过`config rename`进行变更，例如，想要变更别名为`test`的密钥信息别名为`test2`，就可以执行：

```bash
$ s config rename --source test --target test2  
Alias:      test2  
credential: 
  AccessKeyID:     ******************
  AccessKeySecret: ******************
  AccountID:       ******************
```

也可以步输入参数，通过交互更改：

```bash
$ s config rename
? Please select need rename alias name: (Use arrow keys)
❯ test
```

选择需要更改的别名后，再输入目标别名即可：

```bash
$ s config rename
? Please select need rename alias name: default2
? Please select need rename alias name: default
Alias:      default
credential: 
  __provider:      Alibaba Cloud
  AccessKeyID:     LTA******************TCU
  AccessKeySecret: Gwv************************GwT
  AccountID:       124**********881
  __default:       true
```

## config default 命令

通过`config default`命令，您可以配置默认密钥信息。

通过`-h/--help`可以查看到配置帮助：

```bash
$ s config default -h

Usage: s config default [options]

Specify an access as the default.
  
  Example:
    $ s config default
    $ s config default -a demo
    
📖  Document: https://serverless.help/t/s/config

Options:
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义   |
| -------- | -------- | -------- | ---------- |
| access   | a        | 选填     | 密钥的别名 |

### 操作案例

可以通过`s config default`命令来配置默认的密钥信息。例如，想要设置当前默认的密钥为`demo`，可以执行：

```bash
$ s config default

You can choose an access to set as the default.

? Please select an access: (Use arrow keys)
❯ demo
  demo1
  demo2
(Move up and down to reveal more choices)
```

选择之后会提示：

```bash
Access [demo] has been set as default.
```

以上为交互式设置，也可以直接输入`s config default -a demo`进行设置。

```bash
$ s config default -a demo
Access [demo] has been set as default.
```

## 注意事项

### 通过环境变量设置密钥

详情可以参考：[命令行设计规范](../../dev-guide/cli_design.md) 中的 [通过环境变量设置密钥](../../dev-guide/cli_design.md#_11)

### 关于配置密钥的使用顺序

详情可以参考：[命令行设计规范](../../dev-guide/cli_design.md) 中的 [密钥使用顺序与规范](../../dev-guide/cli_design.md#_10)


## Cloud Vendor 密钥配置

### 阿里云密钥获取

阿里云官网：https://www.aliyun.com   
获取密钥页面：https://usercenter.console.aliyun.com/#/manage/ak

- 打开 [获取密钥页面](https://usercenter.console.aliyun.com/#/manage/ak) 获取密钥信息 ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)
 
  
> 云账号 AccessKey 是您访问阿里云 API 的密钥，具有该账户完全的权限，请您务必妥善保管！不要通过任何方式（e.g. Github）将 AccessKey 公开到外部渠道，以避免被他人利用而造成 [安全威胁](https://help.aliyun.com/knowledge_detail/54059.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) 。    
> 强烈建议您遵循 [阿里云安全最佳实践](https://help.aliyun.com/document_detail/102600.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) ，使用 RAM 子用户 AccessKey 来进行 API 调用。

----

安全建议

- 创建独立的RAM用户
企业只需使用一个云账号。通过RAM为名下的不同操作员创建独立的RAM用户，进行分权管理，不使用云账号进行日常运维管理。

  详情请参见[创建RAM用户](https://help.aliyun.com/document_detail/93720.html?spm=a2c4g.11186623.2.15.c79a1723Vwyvig#task-187540) 。

- 将控制台用户与API用户分离
  不建议给一个RAM用户同时创建用于控制台操作的登录密码和用于API操作的访问密钥。

  应用程序账号：只需要通过OpenAPI访问云资源，创建访问密钥即可。
  员工账号：只需要通过控制台操作云资源，设置登录密码即可。
  详情请参见[创建RAM用户](https://help.aliyun.com/document_detail/93720.html?spm=a2c4g.11186623.2.16.c79a1723Vwyvig#task-187540) 。

- 创建用户并进行分组
  当云账号下有多个RAM用户时，可以通过创建用户组对职责相同的RAM用户进行分类并授权。

  详情请参见[创建用户组](https://help.aliyun.com/document_detail/93724.html?spm=a2c4g.11186623.2.17.c79a1723Vwyvig#task-187540) 。

- 给不同用户组分配最小权限
  您可以使用系统策略为用户或用户组绑定合理的权限策略，如果您需要更精细粒度的权限策略，也可以选择使用自定义策略。通过为用户或用户组授予最小权限，可以更好的限制用户对资源的操作权限。

  详情请参见[创建自定义策略](https://help.aliyun.com/document_detail/93733.html?spm=a2c4g.11186623.2.18.c79a1723Vwyvig#task-glf-vwf-xdb) 。

- 为用户登录配置强密码策略
  您可以通过RAM控制台设置密码策略，如密码长度、密码中必须包含元素、密码有效期等。如果允许RAM用户更改登录密码，那么应该要求RAM用户创建强密码并且定期轮换登录密码或访问密钥。   

  详情请参见[设置RAM用户安全策略](https://help.aliyun.com/document_detail/116414.html?spm=a2c4g.11186623.2.19.c79a1723Vwyvig#task-188786) 。

- 为云账号开启多因素认证
  开启多因素认证（Multi-factor authentication，MFA）可以提高账号的安全性，在用户名和密码之外再增加一层安全保护。启用MFA后，用户登录阿里云时，系统将要求输入两层安全要素：

  第一安全要素：用户名和密码
  第二安全要素：多因素认证设备生成的验证码
  详情请参见[为云账号设置多因素认证](https://help.aliyun.com/document_detail/28635.html?spm=a2c4g.11186623.2.20.c79a1723Vwyvig#task-u2b-ww2-xdb) 。

- 为用户开启SSO单点登录功能
  开启SSO单点登录后，企业内部账号进行统一的身份认证，实现使用企业本地账号登录阿里云才能访问相应资源

  详情请参见[SSO概览](https://help.aliyun.com/document_detail/93684.html?spm=a2c4g.11186623.2.21.c79a1723Vwyvig#concept-etn-fjc-mfb) 。

- 不要为云账号创建访问密钥
  由于云账号对名下资源有完全控制权限，AccessKey与登录密码具有同样的权力，AccessKey用于程序访问，登录密码用于控制台登录。为了避免因访问密钥泄露带来的信息泄露，不建议您创建云账号访问密钥并使用该密钥进行日常工作。

  您可以通过为RAM用户创建访问密钥，使用RAM用户进行日常工作。

  详情请参见[为RAM用户创建访问密钥](https://help.aliyun.com/document_detail/116401.html?spm=a2c4g.11186623.2.22.c79a1723Vwyvig#task-188766) 。

- 使用策略限制条件来增强安全性
  要求用户必须使用安全信道（例如：SSL）、在指定时间范围或在指定源IP条件下才能操作指定的云资源。

  详情请参见[权限策略基本元素](https://help.aliyun.com/document_detail/93738.html?spm=a2c4g.11186623.2.23.c79a1723Vwyvig#concept-xg5-51g-xdb) 。
  
- 集中控制云资源
  阿里云默认云账号是资源的拥有者，掌握完全控制权。RAM用户对资源只有使用权，没有所有权。这一特性可以方便您对用户创建的实例或数据进行集中控制。
  当用户离开组织：只需要将对应的账号移除，即可撤销所有权限。
  当用户加入组织：只需创建新的账号，设置登录密码或访问密钥并为RAM用户授权。
  详情请参见为[RAM用户授权](https://help.aliyun.com/document_detail/116146.html?spm=a2c4g.11186623.2.24.c79a1723Vwyvig#task-187800) 。

- 使用STS给用户授权临时权限
  STS （Security Token Service）是RAM的一个扩展授权服务，使用STS访问令牌可以给用户授予临时权限，您可以根据需要来定义访问令牌的权限和自动过期时间，可以让授权更加可控。

  详情请参见[什么是STS](https://help.aliyun.com/document_detail/28756.html?spm=a2c4g.11186623.2.25.c79a1723Vwyvig#concept-ong-5nv-xdb) 。


### AWS密钥获取

AWS官网：https://www.AWS.com       

- 打开 [AWS官网](https://www.AWS.com) 进行登录，登录后选择右上角【我的凭证】：
  ![获取密钥页面](https://images.devsapp.cn/access/aws-page.jpg)
- 点击【访问密钥】，并且【创建新的访问密钥】：
  ![](https://images.devsapp.cn/access/aws-create.jpg)
- 完成之后即可看到密钥详情：
  ![](https://images.devsapp.cn/access/aws-access.jpg)

> 为帮助保护您的安全，请妥善保存私有访问密钥，切勿与他人共享。

### Azure密钥获取

Azure官网：https://www.azure.com       

- 通过 [Azure网](https://portal.azure.com/) 进入所创建的Azure Web App的管理界面之后进入Identity管理界面
- 在Azure网站最上方的搜索栏里搜索Key Vault关键字并进入Key Vault管理总界面
   ![](https://images.devsapp.cn/access/azure-page.jpg)
- 点击进入创建好的Azure Key Vault实例之后进入Access Policies管理界面
- 击添加访问策略按钮，为需要授权的principal添加权限后点击保存按钮即可

### 百度云密钥获取

百度云官网：https://cloud.baidu.com/        

- 打开 [百度云官网](https://cloud.baidu.com/) 进行登录，登录后选择右上角安全认证 ：
  ![获取密钥页面](https://images.devsapp.cn/access/baidu-login.jpg)
- 点击Access Key ID右侧的“显示”，可查看其对应的Secret Access Key，点击“隐藏”可隐藏对应的Secret Access Key: 
  ![获取密钥](https://images.devsapp.cn/access/baidu-access.jpg)

### Google Cloud密钥获取

Google Cloud官网：https://cloud.google.com       

- 打开 [Google Cloud官网](https://cloud.google.com) 进行登录，选择对应项目，进入到项目中：
  ![获取密钥页面](https://images.devsapp.cn/access/google-console.jpg)
- 点击左侧的【服务账号】：
  ![](https://images.devsapp.cn/access/google-service.jpg)
- 再点击上面的【创建服务账号】：
  ![](https://images.devsapp.cn/access/google-add.jpg)
- 创建完成会下载对应文件】：
  ![](https://images.devsapp.cn/access/google-access.jpg)
- 将该文件存储到本地，并将存储的绝对路径配置到`s`工具所需的`PrivateKeyData`中

> 当您在应用中使用 API 密钥时，请确保其在存储和传输期间均安全无虞。公开泄露凭据可能会导致您的帐号遭盗用，这可能会使您的帐号产生预料之外的费用。为帮助确保 API 密钥的安全，请遵循以下最佳做法：
> - 不要直接在代码中嵌入 API 密钥。嵌入代码中的 API 密钥可能会被意外泄露给公众。例如，您可能忘记从共享的代码中移除密钥。您可以将 API 密钥存储在环境变量或应用的源代码树之外的文件中，而不是将 API 密钥嵌入应用中。
> - 不要将 API 密钥存储在应用的源代码树内的文件中。如果将 API 密钥存储在文件中，请将文件保留在应用的源代码树之外，这有助于确保密钥最终不会进入源代码控制系统。 如果您使用公共源代码管理系统（如 GitHub），这种做法尤为重要。
> - 设置应用和 [API 密钥限制](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions) 。 通过添加限制，您可以降低 API 密钥被盗用时造成的影响。
> - 删除不需要的 API 密钥以最大限度地减少遭到攻击的风险。
> - 定期重新生成 API 密钥。您可以在[“凭据”页面](https://console.cloud.google.com/apis/credentials?_ga=2.119850376.1642904664.1603769673-1032325965.1594091682) 中，针对每个密钥点击重新生成密钥，从而重新生成 API 密钥。然后，更新您的应用以使用新生成的密钥。生成替换密钥后，旧密钥将在 24 小时后失效。
> - 公开发布代码前，先检查您的代码，确保您的代码不包含 API 密钥或任何其他私密信息，然后再公开代码。

### 华为云密钥获取

华为云官网：https://www.huaweicloud.com/

- 打开 [华为云官网](https://www.huaweicloud.com/) 进行登录，登录后选择右上角【我的凭证】再选择左侧的 【访问密钥】：
  ![获取密钥页面](https://images.devsapp.cn/access/huawei-page.jpg)
- 点击新增访问密钥，会弹出提示框进行相关安全验证，通过之后可以看到：
  ![](https://images.devsapp.cn/access/huawei-download.jpg)
- 下载之后可以看到自己的密钥信息：
  ![](https://images.devsapp.cn/access/huawei-access.jpg)

> 如果访问密钥泄露，会带来数据泄露风险，且每个访问密钥仅能下载一次，为了账号安全性，建议您定期更换并妥善保存访问密钥。

------

安全建议

- 不给华为云账号创建访问密钥
华为云账号是您华为云资源归属、资源使用计费的主体，对其所拥有的资源及云服务具有完全的访问权限。密码与访问密钥（AK/SK）都是账号的身份凭证，具有同等效力，密码用于登录界面控制台，是您必须具备的身份凭证，访问密钥用于使用开发工具进行编程调用，是第二个身份凭证，为辅助性质，非必须具备。为了提高账号安全性，建议您仅使用密码登录控制台即可，不要给账号创建第二个身份凭证（访问密钥），避免因访问密钥泄露带来的信息安全风险。

- 不将访问密钥嵌入到代码中
当您使用API、CLI、SDK等开发工具来访问云服务时，请勿直接将访问密钥嵌入到代码中，减少访问密钥被泄露的风险。

- 创建单独的IAM用户
如果有任何人需要访问您华为云账号中的资源，请不要将账号的密码共享给他们，而是在您的账号中给他们创建单独的IAM用户并分配相应的权限，同时，作为华为云账号主体，建议您不使用账号访问华为云，而是为自己创建一个IAM用户，并授予该用户管理权限，以使用该IAM用户代替账号进行日常管理工作，保护账号的安全。

- 授予最小权限
最小权限原则是标准的安全建议，您可以使用IAM提供的系统权限，或者自己创建自定义策略，给账号中的用户仅授予刚好能完成工作所需的权限，通过最小权限原则，可以帮助您安全地控制用户对华为云资源的访问。

   同时，建议为使用API、CLI、SDK等开发工具访问云服务的IAM用户，授予自定义策略，通过精细的权限控制，减小因访问密钥泄露对您的账号造成的影响。

- 开启虚拟MFA功能
Multi-Factor Authentication (简称MFA) 是一种非常简单的安全实践方法，建议您给华为云账号以及您账号中具备较高权限的用户开启MFA功能，它能够在用户名和密码之外再额外增加一层保护。启用MFA后，用户登录控制台时，系统将要求用户输入用户名和密码（第一安全要素），以及来自其MFA设备的验证码（第二安全要素）。这些多重要素结合起来将为您的账户和资源提供更高的安全保护。

   MFA设备可以基于硬件也可以基于软件，系统目前仅支持基于软件的虚拟MFA，虚拟MFA是能产生6位数字认证码的应用程序，此类应用程序可在移动硬件设备（包括智能手机）上运行，非常方便。

- 设置强密码策略
在IAM控制台设置强密码策略，例如密码最小长度、密码中同一字符连续出现的最大次数、密码不能与历史密码相同，保证用户使用复杂程度高的强密码。

- 设置敏感操作
设置敏感操作后，如果您或者您账号中的用户进行敏感操作时，例如删除资源、生成访问密钥等，需要输入密码和验证码进行验证，避免误操作带来的风险和损失。
- 定期修改身份凭证
如果您不知道自己的密码或访问密钥已泄露，定期进行修改可以将不小心泄露的风险降至最低。

   定期轮换密码可以通过设置密码有效期策略进行，您以及您账号中的用户在设置的时间内必须修改密码，否则密码将会失效，IAM会在密码到期前15天开始提示用户修改密码
   轮换访问密钥可以通过创建两个访问密钥进行，将两个访问密钥作为一主一备，一开始先使用主访问密钥一，一段时间后，使用备访问密钥二，然后在控制台删除主访问密钥一，并重新生成一个访问密钥，在您的应用程序中定期轮换使用。

- 删除不需要的身份凭证
   对于仅需要登录控制台的IAM用户，不需要使用访问密钥，请不要给他们创建，或者及时删除访问密钥。您还可以通过账号中IAM用户的“最近一次登录时间”，来判断该用户的凭证是否已经属于不需要的范畴，对于长期未登录的用户，请及时修改他们的身份凭证，包括修改密码和删除访问密钥，您还可以设置“账号停用策略”来控制长期未使用的账号到期自动停用。

### 腾讯云密钥获取

腾讯云官网：https://cloud.tencent.com/
获取密钥页面：https://console.cloud.tencent.com/cam/capi

- 打开 [获取密钥页面](https://console.cloud.tencent.com/cam/capi) 获取密钥 ：
  ![获取密钥页面](https://images.devsapp.cn/access/tencent-access.jpg)

> 使用主账号密钥可以无限制地访问您的腾讯云资源，主账号密钥泄露可能造成您的云上资产损失！强烈建议您参照 [最佳实践](https://cloud.tencent.com/document/product/598/10592) 停止使用主账号登录控制台或者使用主账号密钥访问云API，请使用子账号进行相关资源操作。 [如何创建子用户](https://cloud.tencent.com/document/product/598/13674)

------

安全建议

- 开启 MFA 保护
  为增强账号安全性，建议您为所有账号绑定 MFA；为主账号及子账号都开启登录保护和敏感操作保护。对于支持邮箱登录或者微信登录的强烈推荐进行 MFA 二次验证。开启 MFA 后，账号登录及敏感操作需进行二次校验。相关设置请参考：[为协作者设置安全保护](https://cloud.tencent.com/document/product/598/36626) 、[为子用户设置安全保护](https://cloud.tencent.com/document/product/598/36383) 。

- 使用子账号访问腾讯云
  请尽量不要使用主账号的身份凭证访问腾讯云，更不要将身份凭证共享给他人。一般情况下，应该为所有访问腾讯云的用户创建子账号，同时授权该子账号相应的管理权限。相关设置请参考：[用户类型](https://cloud.tencent.com/document/product/598/13665) 。

- 使用组给子账号分配权限
  按照工作职责定义好组，并给组分配相应的管理权限。然后把用户分配到对应的组里。这样，当您修改组的权限时，组里相关用户的权限随即发生变更。另外，当组织架构发生调整时，只需要更新用户和组的关系即可。相关设置请参考：[用户组](https://cloud.tencent.com/document/product/598/14985) 。

- 最小权限原则
  最小权限原则是一项标准的安全原则。即仅授予执行任务所需的最小权限，不要授予更多无关权限。例如，一个用户仅是 CDN 服务的使用者，那么不需要将其他服务的资源访问权限（如 COS 读写权限）授予给该用户。

- 分子账号管理用户、权限和资源
  建议同一个子账号不同时管理用户、权限和资源。应该让部分子账户管理用户，部分子账号管理权限，部分子账号管理其他云资源。

- 定期轮转身份凭证
  建议您或 CAM 用户要定期轮换登录密码或云 API 密钥。这样可以让身份凭证泄漏情况下的影响时间受限
  主账号密码设置请参考：[账号密码](https://cloud.tencent.com/document/product/378/14623) 
  子用户密码设置请参考：[子用户重置密码](https://cloud.tencent.com/document/product/598/36260) 

- 删除不需要的证书和权限
  删除用户不需要的证书以及用户不再需要的权限。尽量减少访问凭证泄漏后带来的安全风险。

- 使用策略条件来增强安全性
尽可能的为策略定义更精细化的条件，约束策略生效的场景，强化安全性。如约束用户必须在指定的时间，指定的服务器上执行某些操作等。   
  相关设置请参考：[元素参考 condition](https://cloud.tencent.com/document/product/598/10603#6.-.E7.94.9F.E6.95.88.E6.9D.A1.E4.BB.B6.EF.BC.88condition.EF.BC.89)
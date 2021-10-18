---
slug: serverless-devs-update-fc-code
title: 只更新代码，然后发布版本：基于Serverless Devs原子化操作阿里云函数计算
author: Anycodes
author_title: Serverless Devs
author_url: https://github.com/anycodes
author_image_url: https://avatars.githubusercontent.com/u/21079031?v=4
tags: [命令行, Serverless, CICD, 原子化操作, 阿里云]
date: 2021-07-2
---

# 基于Serverless Devs原子化操作阿里云函数计算

众所周知，随着时间的发展，Serverless命令行工具也逐渐的玩出了更多的花样，就目前来看，常见的形态有两种，一种是通过Yaml来进行资源的描述，另外一种是纯粹的命令行操作，而不依赖这些内容。

第一种通过Yaml来进行资源描述，其好处不言而喻，目前主流的Serverless开发者工具均是类似的模式，例如阿里云的Funcraft，著名的开源项目Serverless Framework等，通过Yaml，使用者可以通过简单的命令，进行复杂的操作，例如开发者在Yaml中描述好服务、函数等配置，描述好代码位置，只需要deploy就可以将本地项目部署到线上，非常方便。但是这里有一个非常明显的劣势，在很多时候我们的企业管理者，给每个人分配的权限是固定的，例如运维人员只能更新某些内容，开发人员只能更新某些代码，某些负责可以发布版本等，那么这个时候"一把梭"的行为就显得非常尴尬，想为开发者做更多，但是有些开发者不需要你做更多，那么"高阶能力"和"原子能力"的平衡就显得至关重要的。

第二种模式，虽然是不需要依赖Yaml，在很多时候使用起来可能会稍微复杂一些，例如我们创建一个函数可能涉及到很多流程：创建服务，创建函数，创建触发器...，相对比上面所说的一条指令而言，确实复杂很多，但是这种无Yaml的模式，更适合做原子操作，可以最大程度解决上述问题，同时这种做法也可以在一定程度上进行更多的拓展，例如某些本不需要依赖Yaml的行为：查询服务列表，查询函数列表......

所以这两种模式各有优缺点，我们在使用的时候完全可以组合来使用，达到最大的一个生产效能。那么一个新问题来了，以阿里云函数计算为例，如何同时拥有这两种模式的使用方法呢？

其实Serverless Devs天然支持Yaml描述和非Yaml描述的能力，例如阿里云函数计算的FC组件就是一个可以依靠Yaml描述进行资源操作的组件，而FC-API组件则是API相关的原子性操作。

本文将会以这样一个案例/场景为例，为读者介绍这两者的使用方法：

1. 通过Serverless Devs快速创建一个服务/函数/触发器
2. 通过无Yaml的模式对其中的代码部分进行单独的更新
3. 更新之后发布一个版本
4. 通过Git+Github Action实现一个代码自动化发布和版本自动化发布的能力

## 快速创建函数

我们只需要通过`s init`并且选择阿里云函数计算的Python3 Http函数即可：


![image](https://user-images.githubusercontent.com/21079031/124547503-d2365400-de5e-11eb-9044-bf9c9a5ccd01.png)

创建完成之后，我们只需要进入到对应的文件夹，并且执行`s deploy`，即可将项目快速部署到线上。在进入到项目后，我们可以在项目下看到一个`s.yaml`的文件，这个文件就是资源描述文件：


![image](https://user-images.githubusercontent.com/21079031/124547911-7fa96780-de5f-11eb-91d1-bf1a2607c8f3.png)

其完整的描述：https://github.com/devsapp/fc/blob/main/docs/Others/yaml.md

此时我们可以通过`s deploy`进行项目的部署：


![image](https://user-images.githubusercontent.com/21079031/124548730-b16efe00-de60-11eb-8b0f-c58cefb70053.png)



部署完成，我们可以打开系统分配给我们的域名，我们可以看到内容：

![image](https://user-images.githubusercontent.com/21079031/124548769-c0ee4700-de60-11eb-8be2-273b079abf72.png)


## 通过无Yaml模式更新函数

此时，我们可以编辑`index.py`，将`Hello world!`变为`Hello world Serverless Devs!`

![image](https://user-images.githubusercontent.com/21079031/124549589-f2b3dd80-de61-11eb-9156-a18d1bf09863.png)

然后我们就要接触一个新的组件FC-API：https://github.com/devsapp/fc-api

我们可以执行帮助文档：`s cli fc-api -h`：

![image](https://user-images.githubusercontent.com/21079031/124549126-4d990500-de61-11eb-94fb-cf94bb365135.png)

此时我们需要明确的是，当我们执行`s cli`的时候，系统就不去读Yaml，而直接进行相关方法的调用。

如果我们对这个方法还是不清楚，我们可以：`s cli fc-api updateFunction -h`

![image](https://user-images.githubusercontent.com/21079031/124549293-8d5fec80-de61-11eb-9f75-31c66070b8fa.png)

此时我们只需要按照规范，填写好地区，服务名，函数名，以及要更新的字段即可：

```
s cli fc-api updateFunction --region cn-hangzhou --serviceName fc-deploy-service --functionName http-trigger-function --code '{"zipFile": "./"}'
```

完成之后，我们可以再去看一下之前的页面是否同步更新了：

![image](https://user-images.githubusercontent.com/21079031/124550008-9ac9a680-de62-11eb-9701-54c4305123e9.png)

> 此处可能有疑问，你的帮助文档写的是：`--code string                    [JSON String] The code of the function. The code must be packaged into a ZIP file. `
> 你是怎么知道传递`--code '{"zipFile": "./"}'`的？
>
> 因为在我们看帮助文档的时候，题已经提醒了我们这是一个JSON String，同时在帮助文档最上面是有链接地址：


```
    Usage
    
      s cli fc-api updateFunction                                                   
      API Document: https://help.aliyun.com/document_detail/189986.html             
    
    Options
    
      --region string                  The region of fc endpoint.                                                    
      --access string                  Specify the key name.                                                         
      --props string                   The json string of props.                                                     
      --serviceName string             The name of the service.                                                      
      --functionName string            The description of the function.                                              
      --code string                    [JSON String] The code of the function. The code must be packaged into a ZIP file.                                        
```

> 此时，我们可以打开https://help.aliyun.com/document_detail/189986.html：

![image](https://user-images.githubusercontent.com/21079031/124550239-f5fb9900-de62-11eb-819b-9e662cb80fe6.png)

![image](https://user-images.githubusercontent.com/21079031/124550302-0ca1f000-de63-11eb-974e-9453449e525b.png)

> 此时为了方便，Serverless devs支持本地路径，会帮助你进行打包等操作。

当然，我们还可以更刺激一些，修改其他内容，例如单纯修改一些timeout:

```
 s cli fc-api updateFunction --region cn-hangzhou --serviceName fc-deploy-service --functionName http-trigger-function --timeout 70 
```

![image](https://user-images.githubusercontent.com/21079031/124550447-3bb86180-de63-11eb-836a-01d102a6eab9.png)

## 通过无Yaml模式发布版本

和上面一样，我们可以用`s cli fc-api -h `查看一下版本发布的方法：`s cli fc-api publishVersion -h`

![image](https://user-images.githubusercontent.com/21079031/124550575-715d4a80-de63-11eb-8182-bd154507e19d.png)

尝试拼接参数：

```
s cli fc-api publishVersion --region cn-hangzhou --serviceName fc-deploy-service --description "This is a test version"
```

得到结果：

![image](https://user-images.githubusercontent.com/21079031/124550685-9ce03500-de63-11eb-95bf-ed59c494fd7d.png)


## CI/CD组件的使用

当我们想要把上面只更新代码，发布版本的能力集成到CI/CD，或者某些自动化流程中，如何操作呢？

以Github Action为例，我们可以直接执行`s cli cicd`:

![image](https://user-images.githubusercontent.com/21079031/124550942-07917080-de64-11eb-8b57-d59eba0cdc47.png)

接下来，我们对`./.github/workflow/serverless-devs.yml`进行自定义编辑：

```yaml
name: Serverless Devs Project CI/CD

on:
  push:
    branches: [ master ]

jobs:
  serverless-devs-cd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: npm install
      - run: npm install -g @serverless-devs/s
      # 默认密钥配置指令是阿里云密钥配置指令，更多可以参考：
      # 如何通过Github Action使用Serverless Devs做CI/CD：http://short.devsapp.cn/cicd/github/action/usage
      # Serverless Devs的官网是通过Serverless Devs部署的: http://short.devsapp.cn/cicd/github/action/practice
      - run: s config add --AccountID ${{secrets.AccountID}} --AccessKeyID ${{secrets.AccessKeyID}} --AccessKeySecret ${{secrets.AccessKeySecret}} -a default
      - run: s cli fc-api updateFunction --region cn-hangzhou --serviceName fc-deploy-service --functionName http-trigger-function --code '{"zipFile":"./"}'
      - run: s cli fc-api publishVersion --region cn-hangzhou --serviceName fc-deploy-service
```

其实，我们只是在最后加了两个人run，一个是发布代码，一个是发布版本，此时我们可以创建一个Github仓库，尝试一下：

![image](https://user-images.githubusercontent.com/21079031/124551282-7c64aa80-de64-11eb-91e4-bcb97156cfde.png)

创建完成之后，我们可以按照案例提醒，进行密钥的配置：

```
# 默认密钥配置指令是阿里云密钥配置指令，更多可以参考：
# 如何通过Github Action使用Serverless Devs做CI/CD：http://short.devsapp.cn/cicd/github/action/usage
# Serverless Devs的官网是通过Serverless Devs部署的: http://short.devsapp.cn/cicd/github/action/practice
```

![image](https://user-images.githubusercontent.com/21079031/124551345-8d152080-de64-11eb-82e5-b2c26194501a.png)


![image](https://user-images.githubusercontent.com/21079031/124551702-20e6ec80-de65-11eb-9ed9-9cf20b2ec112.png)


接下来， 我们通过git init等一系列指令，完成代码推到仓库：

![image](https://user-images.githubusercontent.com/21079031/124551849-51c72180-de65-11eb-89da-8c6608718b95.png)

此时，我们再次修改代码：

![image](https://user-images.githubusercontent.com/21079031/124552138-b6827c00-de65-11eb-9f8a-8ab8aff63437.png)

修改完成之后，我们将代码push到测试仓库，可以看到，我们在Action中可以看到一个workflow在执行：：

![image](https://user-images.githubusercontent.com/21079031/124552227-d44fe100-de65-11eb-9acc-8eb9a66312a4.png)

稍等片刻，当这个流程完成：

![image](https://user-images.githubusercontent.com/21079031/124552662-6c4dca80-de66-11eb-9943-256ea78eabab.png)

我们打开之前的页面，可以看到，网页内容已经顺利被更新：

![image](https://user-images.githubusercontent.com/21079031/124552637-648e2600-de66-11eb-9df2-ee23e41d693d.png)

# 总结

本文以阿里云为例，通过在Github上使用Servelress devs单纯对代码进行更新，并进行版本发布，该流程是比较常见的，也是比较通用的，希望读者可以发挥想象力，将这个流程应用到自己的项目中。

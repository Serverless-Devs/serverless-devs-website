---
slug: modern-web-application
title: 让理想中的企业级站点开发走进大众 - ServerlessDevs 1024特别奉献
author: serverless devs
author_title: Serverless Devs
author_url: https://github.com/Serverless-Devs/Serverless-Devs
author_image_url: https://avatars.githubusercontent.com/u/21079031?v=4
tags: [命令行, Serverless, CICD, 原子化操作, 阿里云,apigteway,oss,fc,dns]
date: 2021-10-25
---

# 让理想中的企业级站点开发走进大众 - ServerlessDevs 1024特别奉献
## 1024节祝语
首先祝各位同学 1024节快乐，阖家欢乐，健康平安。今天也是ServerlessDevs 发展满一年的纪念日，我们从最初的蹒跚起步，探索碰壁，迷茫彷徨到现在的步伐稳健，循序渐进，自信坚定。经历从1.0到2.0，从命令行到桌面可视化，从封闭的数据源到更加开放的多数据源能力，每一次革新都是对自我的拷问，拷问我们是否依然坚持那个“为了开发者的一切，一切为了开发者”的初心。随着越来越多的开发者加入，使用Serverless Devs，并为ServerlessDevs 提出宝贵的意见，让我们越发相信，虽然前途依然坎坷，但此行值得。
## 新的干货
当然今天不是为了煽情而来，我们准备了更大的干货，借今天的好日子分享给大家，首先向大家宣布我们的 [新官网](https://serverless-devs.com/zh-cn) 正式上线了，更加清晰的梳理了我们的产品能力和文档介绍，并且加入了在线[应用中心](https://serverlesshub.resume.net.cn/)，供开发者提供直观的在线选择应用的服务，那么今天的主菜也是这个“应用中心”，由我来为大家介绍一下它背后的实现。
## 理想的企业级站点
之前介绍了几篇使用 Serverless Devs 开发站点的介绍，包括Jamstack，包括使用我们的函数计算或者OSS 进行托管。对于一般用以展示的用户而言已经足够用，但大家可以试想一下，对于真正的企业的站点服务而言是否足够。尤其在安全接口层面，诸如流量控制，IP访问控制，后端签名，JWT鉴权等是否也是必须的，我想这个答案应当是肯定的，企业对安全的诉求甚至是大于性能，体验的。
安全的能力再加上可以应对高并发，具备实时弹性，具备可观测，可调测能力，同时性能，体验，可扩展都非常优秀是我们认为的理想的企业级站点。
理想的企业级站点在现实中其实不多，因为想要实现这样的理想，往往需要非常大规模的人力投入，从投入产出上考量的话很多公司可能都会放弃，值得庆幸的是在云原生时代，依靠Serverless技术，投入极少人力甚至单个人实现这样理想的企业站点已经变为可能。
以云服务将安全能力，弹性高可用能力，可观测能力“BAAS化”为前提，结合ServerlessDevs 工具做串联粘合，接下来我们的目标就是要让中国更多的网站变成理想的企业级站点，来看一下如何做到
## 整体架构设计及说明
在展开介绍实现之前，先来看一下理想中的企业级站点的架构是怎样的


![image.png](https://img.alicdn.com/imgextra/i2/O1CN01NoFbPR1HbuSNFQvlC_!!6000000000777-2-tps-2188-866.png)
从上图可以看到，dns 将我们的域名解析到 apigateway 公网访问二级域名上,  然后依靠 apigateway 来实现动静态分流，流量控制，ip控制等能力，静态资源托管到oss 服务，你可以利用任意 jamatck 框架，最大化的将站点静态化。 这样会带来诸多好处，如安全，seo友好，体验上佳等。至于动态的api 部分我们优选了阿里云函数计算的 faas 方案，本身后端语言采用的是 javascript 对冷启动的支持非常友好，如果你不想重构自己的服务并且又希望拥有 serverless 化的能力的话可以考虑使用 sae 产品，后续我们也会专门做一期相关的案例实践。
本次 演示的示例  api 服务仅是做数据的组合转发，并未关联数据库，关于数据库的最佳实践我们目前也正在整理中，相信不久就可以跟大家见面。
## 准备工作
虽然 Serverless Devs 可以将整个架构中的构建部署流程做统一处理，但是申请并且认证域名（非香港地区需要备案），云产品的开通等仍然需要开发者自己来操作，不过这些工作比较简单点点鼠标即可完成,已经开通的产品可以忽略这些步骤

- [域名申请](https://wanwang.aliyun.com/?spm=5176.21213303.1158081.1.4a0d3edaw8aGsw&scm=20140722.S_card@@%E5%8D%A1%E7%89%87@@581._.ID_card@@%E5%8D%A1%E7%89%87@@581-RL_%E5%9F%9F%E5%90%8D%E6%B3%A8%E5%86%8C-OR_ser-V_2-P0_0), 到任意域名服务商申请自己喜欢的域名即可，不过推荐在阿里云万网，能够统一管理，比如笔者申请了 serverless-developer.com 这样的顶级域名，一年60多块钱

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01AFvXaF1LmDq8JPgcs_!!6000000001341-2-tps-2382-1148.png)

- [域名解析](https://www.aliyun.com/product/dns?spm=serverlessdevs), 域名申请好应该会自动开通，我们待会会用它来做一个CNAME解析，解析到我们的 apigateway 公网二级域名

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01EGjtZJ1g193l9iDcg_!!6000000004081-2-tps-3468-1762.png)

- [apigateway](https://www.aliyun.com/product/apigateway?spm=)  网关服务，开通后会默认赠送 一个共享实例，费用低廉

![image.png](https://img.alicdn.com/imgextra/i3/O1CN011GRj3v1u08oRY3Qjx_!!6000000005974-2-tps-2324-770.png)

- [oss](https://www.aliyun.com/product/oss?spm=serverlessdevs) 对象存储， 用来存储我们的静态资源

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01EDpiJG1K339x9iNxT_!!6000000001107-2-tps-2562-708.png)

- [函数计算](https://www.aliyun.com/product/fc?spm=serverlessdevs) ， serverless 后端服务

![image.png](https://img.alicdn.com/imgextra/i4/O1CN016nNleE1lnlB60iELW_!!6000000004864-2-tps-2306-760.png)
## 应用模板初始化
使用s 命令行工具进行应用模板初始化 `s init modern-web-application`下载
下载后可以看到整体目录结构比较清晰，就是动态api部分，静态资源部分和配置文件部分
![image.png](https://img.alicdn.com/imgextra/i1/O1CN01r0Rfat23XQ8G4Fdvv_!!6000000007265-2-tps-874-888.png)


我们再展开看一下配置文件,配置文件稍稍复杂些
```yaml
edition: 1.0.0 #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: modern-web-application #  项目名称
access: #访问秘钥别名
vars: '' # [全局变量，提供给各个服务使用]
  domain: 
  region: cn-hongkong
  indexFile: index.html
  fc: 
    baseUrl:  '' #函数计算触发器地址，可以在部署好函数之后获得。例子： https://xxx.cn-hongkong.fc.aliyuncs.com/2016-08-15/proxy/serverlesshub/serverlesshub/
  oss:
    baseUrl: '' #oss 公网访问地址 。例子： https://<bucketname>.oss-cn-hongkong.aliyuncs.com
    bucketName: hanxie-serverless-hub
services:
  www: # 静态资源
    component: devsapp/website
    actions:
      pre-deploy:
        - run: npm install
          path: ./
        - run: npm run build
          path: ./
    props:
      bucket: ${vars.oss.bucketName}
      src:
        # codeUri: ./
        publishDir: ./www/build
        index: index.html
        subDir:
          type: index
      region: ${vars.region}
  apis: #动态api
    component: devsapp/fc # 组件名称
    actions:
      pre-deploy:
        - run: npm install
          path: ./apis
    props:
      region: ${vars.region}
      service:
        name: serverlesshub
        description: serverless应用市场
        internetAccess: true
      function:
        name: serverlesshub
        description: serverless应用市场的函数
        runtime: nodejs12
        codeUri: ./apis
        handler: index.handler
        memorySize: 128
        timeout: 10
      triggers:
        - name: httpTrigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET
              - POST
      customDomains:
        - domainName: auto
          protocol: HTTP
          routeConfigs:
            - path: /*
  gateway: #  服务名称
    component: apigateway # 这里引入的是相对路径，正式配置替换成你自己的component名称即可
    props:
      regionId: ${vars.region}
      customerDomain: ${vars.domain} # 客户自定义域名
      groupName: release_hub #指定分组 这里你可以分开设置环境
      stageName: RELEASE  
      apis:
        - apiName: portal_get_api # 访问网站的getapi
          regionId: ${vars.region}
          requestConfig:
            requestPath: /api/*
            requestHttpMethod: GET
          serviceConfig:
            servicePath: / # 后端路径
            serviceProtocol: FunctionCompute
            functionComputeConfig: # 函数计算的配置
              fcRegionId: ${vars.region} # 函数计算region
              fcBaseUrl: ${vars.fc.baseUrl}
              onlyBusinessPath: true # 只接受路径
              contentTypeCatagory: CLIENT
              path: /
            resultType: JSON
        - apiName: portal_post_api # 访问网站post类型的api
          regionId: ${vars.region}
          requestConfig:
            requestPath: /api/*
            requestHttpMethod: POST
          serviceConfig:
            servicePath: / # 后端路径
            serviceProtocol: FunctionCompute
            functionComputeConfig: # 函数计算的配置
              fcRegionId: ${vars.region} # 函数计算region
              fcBaseUrl: ${vars.fc.baseUrl}
              onlyBusinessPath: true # 只接受路径
              path: /
              contentTypeCatagory: CLIENT
            resultType: JSON
        - apiName: portal_assets # 访问站点的静态资源
          regionId: ${vars.region}
          requestConfig:
            requestPath: /*
            requestHttpMethod: GET
          serviceConfig:
            serviceAddress: ${vars.oss.baseUrl}
            aoneAppName: cloudapi-openapi
            servicePath: /* # 后端路径
            serviceHttpMethod: ANY
            serviceProtocol: HTTP
            resultType: JSON
        - apiName: protal_index # 设置访问站点的主页路径
          regionId: ${vars.region}
          requestConfig:
            requestPath: /
            requestHttpMethod: GET
          serviceConfig:
            serviceAddress: ${vars.oss.baseUrl}
            aoneAppName: cloudapi-openapi
            servicePath: /index.html # 后端路径
            serviceHttpMethod: GET
            serviceProtocol: HTTP
            resultType: JSON
```
### 项目初始化及管理
为了演示方便，下面对应用中包含的服务进行一一部署,本次演示使用 serverless cli + serverless desktop结合的方式 - 用 s 命令行进行项目初始化后，再用serverless desktop进行纳管，进行可视化操作。


![](https://img.alicdn.com/imgextra/i1/O1CN019QAvJ61HnMMMFKGNn_!!6000000000802-1-tps-1777-944.gif#id=blVxu&originHeight=944&originWidth=1777&originalType=binary&ratio=1&status=done&style=none)
### 部署静态资源
我们提前已经把静态资源的发布包构建好了存放于 www/build ，只需要执行一下部署即可，如果改动代码后需要重新构建出新的生产包。
![](https://img.alicdn.com/imgextra/i1/O1CN01GjGIFh1WiyoAKmzzY_!!6000000002823-1-tps-1777-944.gif#id=oOdnM&originHeight=944&originWidth=1777&originalType=binary&ratio=1&status=done&style=none)
s 工具会把 www/build 下的静态资源上传到用户设置好的 bucket 里面，上传好bucket 之后，我们重新配置好全局的oss.baseUrl 的变量，给后面的gateway使用
### 部署动态函数
静态部署之后就是动态函数了，这里我们提前准备好了，使用koa 范式构建的 serverless hub 服务端
![image.png](https://img.alicdn.com/imgextra/i3/O1CN01tbRbHM1kTJstzDVHO_!!6000000004684-1-tps-1777-944.gif)
部署好之后，刷新一下自己的 函数计算，可以看到已经配置好了需要的服务和函数，同样我们把返回的触发器地址 配置到 全局变量 fc.baseUrl上以备 apigateway 使用。
### 部署apigateway
动静态的依赖都配好之后，接下来就是gateway配置
![](https://img.alicdn.com/imgextra/i3/O1CN01pVkJLx1L132k3FcTo_!!6000000001238-1-tps-1777-944.gif#id=qUQwi&originHeight=944&originWidth=1777&originalType=binary&ratio=1&status=done&style=none)
这里我们会帮您创建一个共享实例下的分组，然后在分组下创建了4个api，它们分别是：

- 访问 get 请求的api 【portal_get_api】
- 访问 post 请求的 api 【portal_post_api】
- 访问 全部静态资源的 api 【portal_assets】
- 首页访问入口 api 【protal_index】
### 域名绑定相关
因为时间关系，我们没有完全实现自动化的域名绑定，所以最后如果你希望通过自定义域名访问你的网站，还是需要打开产品控制台进行域名的绑定操作。
![image.png](https://img.alicdn.com/imgextra/i3/O1CN019ZCsES1uI0G4XBx7O_!!6000000006013-1-tps-1777-944.gif)

- 1.进入云解析控制台，对自己的域名添加一个 cname 解析，解析内容指定到 apigateway 分组生成的 二级公网访问域名
- 2.进入apigateway控制台 ，同样再反绑定一下刚才的域名 hanxie.serverless-developer.com
- 3.进入oss控制台 ，在传输管理->域名管理 中同样绑定 hanxie.serverless-developer.com（注意这里可能要你验证一下dns 的解析，根据提示操作即可）
### 访问收尾
综上配置好之后（域名解析可能需要一段时间，请耐心等待） 我们就可以通过访问 hanxie.serverless-developer.com 来查看访我们的站点了。
![image.png](https://img.alicdn.com/imgextra/i3/O1CN01xlaxfc1LUomshJeDY_!!6000000001303-2-tps-3242-1902.png)
当然这里还没添加 https证书，你可以创建一个免费的证书，添加到 apigateway上。 这样最后可以得到一个完美的https站点。
![image.png](https://img.alicdn.com/imgextra/i4/O1CN01fZHfUD26ryl8DZWOd_!!6000000007716-2-tps-3082-268.png)
## 关于网站安全能力的设置
我们的网站有很多可以加的安全防护， 比如开通 apigateway 专享版，通过内网 vpc 转发oss 以及函数计算服务，避免任意服务暴露到外部，其次我们可以通过添加 apigateway 的插件来增加流量控制，jwt鉴权，ip限制等能力，下面我们演示一下 通过apigateway 插件增加 basic auth 来限制 api 访问。
![](https://img.alicdn.com/imgextra/i2/O1CN01z6RiT21e1U7TIbGuT_!!6000000003811-1-tps-1777-944.gif#id=XZlJh&originHeight=944&originWidth=1777&originalType=binary&ratio=1&status=done&style=none)
插件管理-> 创建 -> 选择 basis auther -> 绑定 get api
可以看到 插件创建好之后我们再次访问 网站会提示401错误，我们再来用 postman 访问一下
![image.png](https://img.alicdn.com/imgextra/i3/O1CN01hPbYu11tdF0dhsuyb_!!6000000005924-2-tps-3584-1954.png)
一样是401，然后我们添加一下 账号密码再测试一下
![dkhttp13.gif](https://img.alicdn.com/imgextra/i1/O1CN01vmf8rT1Mb3na8oUX2_!!6000000001452-1-tps-1777-944.gif)
可以看到已经通过了。关于其他的安全设置您可以自行尝试
## 关于访问性能的提升
目前我们使用的 apigateway 的共享实例，在并发访问量不大的情况下没有太大问题，当你的网站访问上升，遇到访问慢的时候可以考虑升级到专享实例，这样可以直接通过内网访问静态资源和函数，另外可以按照 jamstak 理念尽量实现最大程度的静态化，可以考虑一些相关的 jamstack框架，关于函数方面，我们目前使用的是 js runtime 部署，冷启动时间会在1s左右浮动， 另外还没有做数据库连接等。如果你觉得比较慢，可以考虑在函数计算上增加预留实例，保障函数的快速运行。
## 关于资费问题
到目前为止给大家展示的都是经计算最省钱的无服务化实现，你不必去购买主机就可以实现一个非常高性能的站点，需要花费的有 ：

- 申请域名 （笔者申请的域名大概是60多元一年）。
- apigateway的共享实例是按照流量和api调用计费，本身新网站的话不会花费太高
- fc 本身是有免费流量，新网站几乎超不出这个限制
- oss 本身也是按照存储和公网流量计费，可以说微乎其微

综上对于新上的站点而言花费是很低的，当然如果你的站点未来访问量上去之后也可以通过加配置无缝升级上去，您的程序无需做任何改进。
## 关于多环境设置问题
在真正开发生产过程中，多环境的问题是避不开的， 上面仅展示了生产环境，你完全可以通过多个配置文件来配置更多的测试和预发环境，按照 apigateway 给的多环境实践进行配置使用，这部分欢迎更多实践的小伙伴与我们交流探索。
## 最后
基于这套模式你可以自由设置后端api 部分，使用serverelss ，微服务等，不会干扰前端的使用，通过预发测试环境去实践，然后发布到生产。我们欢迎有更多的伙伴加入去探索这个最佳实践，另外后续我会继续展开介绍这套Serverless devs 应用模板的产出细节，你可以自由定制组件，以及自由组合发布流程。 用Iac 的理念通过Serverless Devs 更好的管理自己发布生产流程
最后如果你觉得上面的文章对你有帮助，不妨去我们的官网帮忙点个赞
[https://github.com/Serverless-Devs/Serverless-Devs](https://github.com/Serverless-Devs/Serverless-Devs)



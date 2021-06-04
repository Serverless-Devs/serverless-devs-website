---
slug: serverless-devs-cli-intro
title: 透过指令集设计去看Serverless Devs 的扩展能力
author: hanxie-crypto
author_title: Serverless Devs
author_url: https://github.com/hanxie-crypto
author_image_url: https://avatars.githubusercontent.com/u/4457084?v=4
tags: [命令行, Serverless, Cloudshell]
date: 2021-06-04
---
#  透过指令集设计去看Serverless Devs 的扩展能力
## 
希望通过本篇文章帮助你理解serverless devs 的指令集设计思想，并且希望你能够更好的使用serverless devs工具提升自己的开发生产力


## 静态指令和动态指令
目前serverless devs 开发者工具的静态指令集非常简单只有5个
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1622787931570-6bc376df-e4bc-4a2c-a5c8-df1fabf4ea34.png#clientId=ue380b034-bff6-4&from=paste&height=95&id=ub651dc36&margin=%5Bobject%20Object%5D&name=image.png&originHeight=190&originWidth=1224&originalType=binary&size=97993&status=done&style=none&taskId=u1f0500a8-c942-477f-bab7-c526c7ffec3&width=612)


+ 配置云商秘钥的【conifg】
+ 初始化应用/组件的 【init】
+ 以及无配置式执行指令的 【cli】
+ 数据源设置【set】 
+ 以及可以用来支持 复杂指令执行的 【exec】

**以上的静态指令集主要可以帮助新用户快速使用s工具，掌握s工具的基本能力。**
除了上面的静态指令，还有就是检测到有配置文件s.yaml会自动生成的动态指令，这些动态指令是根据具体执行组件的方法来确认的。举个例子，如果有一个配置文件如下，他包含了一个标准服务 component-demo,
服务所关联的逻辑组件是s-demo。
```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: component-demo   #  项目名称
vars: # [全局变量，提供给各个服务使用]
  logo: https://image.aliyun.com/xxxx.png
  domain: xxxx.yyy.com
services:
  component-demo: #  服务名称
    component: s-demo  # 这里引入的是相对路径，正式配置替换成你自己的component名称即可 
    props:
      name: ${component-test2.props.name}
      otherInput: ${component-test2.output.hello}
      envshow: ${env(USER)}
```
那么在这个配置文件的同目录下你去查看s 的输出指令,会发现新增了一个 component-demo的指令
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1622788342218-1d4c86a6-e3f3-4679-af94-ea901f2c5a93.png#clientId=ue380b034-bff6-4&from=paste&height=234&id=u5f9698c3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=468&originWidth=1884&originalType=binary&size=242519&status=done&style=none&taskId=u0e388f94-f32b-4d71-b766-1ac1a35f42c&width=942)
然后你可以通过 s component-demo -h 查看其具体的使用方法
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1622788811202-d8f7f7c7-400b-4809-a020-e64f1fca9da7.png#clientId=ue380b034-bff6-4&from=paste&height=121&id=ud823ceee&margin=%5Bobject%20Object%5D&name=image.png&originHeight=242&originWidth=1250&originalType=binary&size=227446&status=done&style=none&taskId=u3304fd51-5125-4ebc-8f9d-1c7524f1c2d&width=625)
这里面实现的原理是输入了 s component-demo test 指令后s工具会去找到 component-demo 关联的 组件s-demo，然后对他进行实例化，再把配置文件中的props 参数以及 内置的秘钥信息参数统一传到  s-demo 的 test 方法中，并且会代为执行test 方法，并把该方法的结果进行格式化输出。
这样的好处就是，s工具不关心具体的组件实现逻辑，只负责编排和解析，二把具体的执行逻辑交给组件开发者实现，从而极大的扩展了工具的能力范围。
当然假设你的配置文件下有多个services
```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: component-demo   #  项目名称
vars: # [全局变量，提供给各个服务使用]
  logo: https://image.aliyun.com/xxxx.png
  domain: xxxx.yyy.com
services:
  component-demo: #  服务名称
    component: s-demo  # 这里引入的是相对路径，正式配置替换成你自己的component名称即可 
    props:
      name: s1
  component-demo2: #  服务名称
    component: s-demo  # 这里引入的是相对路径，正式配置替换成你自己的component名称即可 
    props:
      name: s2
```
而你不希望 s component-demo test  ， s component-demo2 test  这样一个一个的去执行，也可以通过
s test 去全量执行
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1622789389445-666be5b2-16be-4e66-be87-4724942a87ca.png#clientId=ue380b034-bff6-4&from=paste&height=131&id=u11561a55&margin=%5Bobject%20Object%5D&name=image.png&originHeight=262&originWidth=2250&originalType=binary&size=438340&status=done&style=none&taskId=u979ad809-adda-439f-9e84-5d3d665ad22&width=1125)
系统会提示要执行的全量服务，并且会把最终结果做汇总，一起输出，这样的好处是简化了多服务并且之间有依赖关系的执行方式，**是应用编排能力的具体实现**。
即使只有一个服务也可以 使用 s test，最起码输入的字符更少，更加节省时间。
## cli - 无配置执行组件的指令
##### 单独把这个指令拿出来说是因为他是本篇文章的主角，体现Serverless devs 强大扩展能力的关键点之一。
实际上我们知道，随着一个工具支持的能力越来越多，他的使用复杂度也会越来越高，我们一直想需要一个设计上的平衡，**既能够让新用户快速上手，不让那些复杂的指令迷人眼，也能够支持老用户的进阶，满足他们更高层次的需求**。
配置式的指令执行方式固然有着他自己的强大和独到之处，但是相关的依赖也让很多自动化的流程变的更加的复杂，所以团队考虑再三决定推出无配置的指令集 **s cli**
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1622790598634-d454a58b-6c12-46d7-99db-fac56ed6703a.png#clientId=ue380b034-bff6-4&from=paste&height=239&id=u86c479ff&margin=%5Bobject%20Object%5D&name=image.png&originHeight=478&originWidth=1768&originalType=binary&size=191300&status=done&style=none&taskId=u888a7e42-b775-4ed9-9a66-ce503aa1794&width=884)

实际上有了他，我可以在数小时或半天之内扩展一个新的功能点，而且对用户而言无需更新他们的工具集，即可使用我开发的功能。

### 真实组件例子
#### platform - 登录，注册，发布
拿 platform 组件举例子来说，platform 组件是为了方便开发者贡献用用或者组件，快速发布到我们的serverless hub上，从开发测试到发布使用只用了半天不到。
已经安装好s工具的开发者不需要做任何的升级改变，就可以
通过 s cli platform register 注册 serverless hub账号;
以及 s cli platform login 登录 serverless hub;
然后再通过s cli platform publish 发布已经写好的应用/组件。
#### init - 已有项目初始化s配置， cicd配置， api 配置
再比如当前我们的 s init 只能针对新项目初始化配置，对于已有项目，比如我已经有一个使用create-react-app开发的前端项目，想把他部署到 云服务上。是没有办法处理的，这个如果通过修正核心指令，增加逻辑分支支持固然也可以应对这种需求，但是这意味着核心代码改动，再让开发者更新s工具，整个流程会非常的长，而且存在bug风险。
我采取的方案是通过cli 组件扩展
1.使用 s init 初始化一个组件模板，命名为 init ，
2.然后开发初始化逻辑，比如对已有项目初始化配置文件，支持添加cicd配置文件，添加api文件等
3.使用 s cli platform publish（其实已经内置到组件模板的npm publish指令了，可以直接使用npm run publish） 发布到应用市场。
之后其他的开发者就能够使用这个组件 ，通过 s cli init 引导式的初始化配置，并且 使用s deploy将自己的静态站点发布，整个过程行云流水，效率奇高，并且核心模块完全不受影响，完全不用担心影响到其他的功能使用
## 未来的扩展
除了platform,init 这些官方的能力，我们也欢迎更加优秀的场景方案透出到指令设计上。这边我可以把场景大家分享一下，具体实现可以交给大家
### 场景1
企业内部系统自动化流程构建， 比如我们提交代码，触发集成测试，然后继续构建部署Serverless服务到指定的云商，最后把部署结果通过钉钉等IM 端通知到开发者。
这个时候你可以在自己的CI，CD 服务器上部署 s 工具，然后开发 对应的组件，在执行脚本里面通过 s cli <自定义组件> <自定义方法> 处理流程，最终完成这个流程
​

### 场景2
企业内容serverless 开发脚手架初始化 ，通过包装s 工具完成内部常用开发工程的选择，初始化配置 ，部署测试等工作。 比如你经常做中后台开发， 可以为内部其他开发同学提供多个主题选择，将s工具用于部署和调试阶段会减少对这方面的开发量
​

其他更多的场景取决于你的想象力。
## 写在最后
我们最近一直在思考，工具最终要做成什么样子，最后觉得是能够帮助到更多的开发者，让他们享受serverless红利，或者优化自己的工作流都是好的，当然这个过程离不开广大开发者的支持，我们也希望不仅仅是我们自己在主导这个项目，希望更多的人参与进来加入社区，通过社区去主导他，只有集众所长，才有能把serverless devs 建设的更好。
社区也正在招募优秀开发，欢迎你的加入， 提pr，提issue，点star 都可以。

项目地址 https://github.com/Serverless-Devs/Serverless-Devs



​


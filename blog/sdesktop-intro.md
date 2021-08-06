---
slug: sdesktop-intro
title: Serverless Desktop介绍
author: hanxie-crypto
author_title: Serverless Desktop
author_url: https://github.com/hanxie-crypto
author_image_url: https://avatars.githubusercontent.com/u/4457084?v=4
tags: [Serverless, 桌面应用, Electron ,应用平台]
date: 2021-08-06
---

# Serverless Desktop介绍
上周我们在serverless meetup 杭州站上给大家初步展示了一下我们的新客户端工具ServerlessDesktop ，Serverless Desktop 也是Serverless 工具链产品中首个具备全方位Serverless开发能力的可视化工具，涵盖了应用初始化，开发，部署，压测，调试，运维等完整的开发能力。
本篇详细展开来跟大家介绍一下 这个桌面客户端的详细内容，包括为什么选择客户端而非web，以及整体功能方面的介绍等。
​

## 为什么选择桌面的方式
在当前B/S 模式盛行的今天，选择destkop 这种 C/S 的形式看起来是有些逆历史潮流，并且单纯从追求技术的角度讲选择桌面应用的开发挑战性更高，相对而言带来的交付风险也更高。然而从我们的需求侧出发去看的话，又必须选择原生桌面应用的方式，项目初始化，调用terminal, 本地压测，端云调试，组件可视化等等能力皆需要跟用户自己的PC做大量的交互，这个时候web本身的能力就已经无法满足了。另外真正从用户的使用体验上看，桌面应用的方式是要好于web的，更稳定，更流畅一些，所以功能性要求和追求更好的用户体验，让我们最终中选择了桌面应用的形态。
​

## UI
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628177738443-df54bbbb-e5eb-450e-9c7c-2dcb9dc11b69.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=ub98acace&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=1147671&status=done&style=none&taskId=udfa789a3-c483-45b1-b1ba-5a239b83ae4&width=1350)
如上图给大家呈现的UI 库在是 我们**阿里云云原生前端团队**和**阿里云设计中心**以及**阿里云全球交付前端团队**联袂打造的一款精美的基础组件库 [B-design](https://b-design.aliyun.com/#/home)。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628178066645-7a9b7ffa-dad0-4f65-aec8-8a754f01d99e.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=450&id=u98fea317&margin=%5Bobject%20Object%5D&name=image.png&originHeight=900&originWidth=1596&originalType=binary&ratio=1&size=1986558&status=done&style=none&taskId=uca0f4274-cc63-4811-808a-726e41dc0a5&width=798)


目前也是完全开放给外部开发者使用的。组件库API目前完全兼容 阿里巴巴开源的 Fusion组件库，另外 Ant-design的组件库支持也正在紧张研发，相信过不久就能够跟大家见面，欢迎大家下载使用。后续我们也会准备更多的B-design中后台模板发放到 Serverless Hub上供大家使用。
​

## 重要功能介绍
### Serverless Hub
也就是我们的应用市场，这个是个典型的需要GUI化的场景，相比Serverless cli 的列表展示要有更丰富的表现力
#### 应用初始化
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628178694267-25d6df78-a828-43f1-b4c1-6daf24959f5f.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=uce3d1e41&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=1127285&status=done&style=none&taskId=uf525cf64-037d-4578-8134-2832301fbc9&width=1350)
vs
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628178766574-d7ff831f-8743-44c0-9f3b-02f2d7196723.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=600&id=u58337e14&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1200&originWidth=1572&originalType=binary&ratio=1&size=481880&status=done&style=none&taskId=uc64eba74-ef88-470b-a3aa-6e5388b3651&width=786)
这里面我们提供了4个页签
【S优选】 // 官方提供的优选项目，如jamstack 和精选应用框架
【S新品】 // 顾名思义，由开发者发布的最新应用
【S热门】 // 这个显示的是下载量最大的应用，比如最近的怀旧游戏
【S收藏】 // 收藏量最大，这边收藏需要用户登录才能完成
​

用户在Serverless Hub上选中自己需要的应用后，紧接着进行项目目录选择
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628179054257-f6c9de82-0024-477f-8666-4bfeea8c07ec.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=u52d41f4a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=1391408&status=done&style=none&taskId=u2ef72a2a-1cbd-4aa0-b38c-6c7233c6fd5&width=1350)
这里需要您准备一个空的目录进行下载（命令行则会引导创建新目录），好处是你可以可视化的掌握自己项目路径。
目录选取后确定，接下来SDesktop会帮助完成项目download，部分项目需要预先填写一些配置，比如这里的jamstack项目，根据提示填写即可
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628179229082-fb0e3ca3-13d6-4b83-8877-aefb7f92e191.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=u3cdcdb90&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=903961&status=done&style=none&taskId=ubbe1345f-3403-4d06-8126-08cb559cf84&width=1350)
#### 应用配置
应用配置是专门为部署服务的，主要包含了基本配置和服务配置，他们都可以折叠
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628179516629-47980db3-d904-43f0-9a42-fc4dfe732469.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=ub08bce38&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=1274895&status=done&style=none&taskId=u72a04f6b-7fcb-4b94-a985-98dc2b419a3&width=1350)
一般情况下我们会尽量要求应用的作者将其配置项进行最简化，所以进入界面后您可以直接点击“全量操作” 进行部署或者其他的操作。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628179677417-abdcb19f-4f6e-453f-9872-b5d39295923a.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=u32c02577&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=1299821&status=done&style=none&taskId=u46c1ef57-89fb-4a6b-b6b3-7f7b7e48a45&width=1350)
​

 如果您只想对某个单项的服务做部署或者其他动作，可以在具体服务上找到 “执行”按钮 进行操作
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628179729838-a098d8e2-11d8-47e0-be0a-f8daed59aa50.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=u7b4f5fd9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=1278096&status=done&style=none&taskId=u25be40ed-35dc-4bfc-a8b6-55e4b85afbd&width=1350)全量操作和单个服务的执行在 单服务情形下效果等同。
​

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628179790945-72f8d17c-a23e-4d72-a480-b3b19e2804b9.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=u9c7698ee&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=3523999&status=done&style=none&taskId=ucf1f7ec6-1520-42c5-a0cf-5cc957bfde2&width=1350)
比如这里直接针对单个服务进行操作，SDesktop会调动S执行器内核进行构建部署，并将最终结果输出到界面上。
值得一提的是，应用配置的可视化部分和代码编辑部分是双向的，修改左侧表单，右侧的yaml配置会随之改变，修改右侧yaml ，左侧表单也会发生变化。 当你只需要改动小部分配置的时候用左侧表单最保险，进行大规模注释，则用有半部分更合理![testview.gif](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/13970/1628181633344-e9548097-30d8-4134-9884-42afdc827c41.gif#clientId=ufd54e6bc-ca8d-4&from=drop&id=ud09170c4&margin=%5Bobject%20Object%5D&name=testview.gif&originHeight=927&originWidth=1373&originalType=binary&ratio=1&size=1366393&status=done&style=none&taskId=u6501a680-d311-448e-a10d-bd88abb4a52)
### 工作空间-用户视角
工作空间是用户对应用最主要的维护界面，会展示用户作为使用者所拥有的应用，也可以展示用户作为应用贡献者所拥有的应用，可以通过切换【用户视角/开发者视角】来查看
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628181716720-61c477f5-fb6e-418b-9409-8b51dd465051.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=u479614e1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=1443029&status=done&style=none&taskId=ud89bb0a6-0385-40a9-9880-aa0da1d507a&width=1350)
​

​

进入具体的应用详情后，会看到一个全方位的面板，涵盖基本信息，配置信息，可观测，压测，端云调试，终端，六个面板。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628181815650-42e65aae-bba9-4d7f-9b07-15db4c446eb3.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=u88b008a9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=683772&status=done&style=none&taskId=u206dfb7f-db40-480b-b607-efd85fb0b7f&width=1350)


#### 基本信息

- 应用信息列举了项目的本地路径，如果项目是有域名的也会帮助展示出来，这样及时你在部署的是时候忘记观察自己的域名也可以在这里继续查看，另外我们还提供了一些站点的小工具，比如前端性能监控 和 站点性能检测。
- 资源信息则会把本次应用部署所利用的云端资源全部列出，比如 使用的cdn,oss,fc等，方便用户查看，以前这部分都是黑盒的我们现在希望完全的透明化
- 操作记录会展示每一次用户通过配置信息板块操作的结果记录，方便定位问题
#### 配置信息
这部分同上面的应用配置，不再赘述
​

#### 可观测
你可以通过此面板查看函数调用信息,当然可以配置压测能力验证系统的承压水位
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628242298265-54973578-6e4c-48dc-a3fb-9b7827c03ff6.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=915&id=ua1bd49a9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1830&originWidth=2700&originalType=binary&ratio=1&size=1043960&status=done&style=none&taskId=u4e4c288e-372a-40ed-931b-d7ff9b4b751&width=1350)
#### 压测
Serverless Devs 工具链中提供的压测有别于传统的压测，除了能够兼容 传统的 http 协议，还能够针对事件驱动类型的函数进行施压测试，那么压测的启动也非常的简单，按照面板的提示，选择秘钥，地域，服务，函数。然后添加好模拟的参数，启动压测即可。
![st.gif](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/13970/1628242592390-fefd470d-ed79-4c08-a45a-cc05f2e6d356.gif#clientId=ufd54e6bc-ca8d-4&from=drop&id=u04accd95&margin=%5Bobject%20Object%5D&name=st.gif&originHeight=927&originWidth=1373&originalType=binary&ratio=1&size=1896035&status=done&style=none&taskId=u9376509d-b3f0-4061-9b7b-5bfae22f0cf)
压测结束后会有一份压测报告展现出来。
#### 端云调试
端云调试也是我们的一个比较大的亮点，具备较高的实战价值，一般而言其他云商会提供线上调试，但真正的开发场景中本地调试云上才是更好的体验。这里展示一下调试的demo,demo。模板来源是start-node-proxied-invoke![debug.gif](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/13970/1628249049727-75546217-3a1e-416b-bf42-b5bc85873bac.gif#clientId=ufd54e6bc-ca8d-4&from=drop&id=u2325524a&margin=%5Bobject%20Object%5D&name=debug.gif&originHeight=927&originWidth=1373&originalType=binary&ratio=1&size=8093550&status=done&style=none&taskId=u88e5cbdb-6f66-45e7-8af2-f6e274b86fb)


#### 终端
本身Serverless Desktop 也是把终端集成进来的，所以对于喜欢使用终端的开发者用户依然可以在这里进行命令行操作。
### 工作空间-开发者视角
除了上面作为一个用户去使用工具，以及应用模板构建自己的应用以外，我们Serverless Desktop也是专门给开发者提供了一个体验良好的工作台，下面展示一下如果使用它构建自己的组件和应用
​

#### 创建组件
我们先初始化一个组件的模板，并进行项目的编辑
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628249878366-423450c6-180f-4a51-9429-5cf97a09f860.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=453&id=u700d13e6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=905&originWidth=1347&originalType=binary&ratio=1&size=91980&status=done&style=none&taskId=u511b9327-b3c1-409b-9fee-3a744995b19&width=673.5)
然后编写一些代码逻辑并对他进行测试
![developcomponentcode.gif](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/13970/1628250273107-9b079c67-15da-4440-88e7-1746c53d89f3.gif#clientId=ufd54e6bc-ca8d-4&from=drop&id=uab013f1b&margin=%5Bobject%20Object%5D&name=developcomponentcode.gif&originHeight=905&originWidth=1347&originalType=binary&ratio=1&size=8828067&status=done&style=none&taskId=u63681d64-0b05-46b4-aae6-397b559565e)


当你的组件开发好之后可以通过2中方式被使用
第一种 是通过 s cli <component> <method>
比如我想使用刚才本地写好的组件，调用他的deploy 方法，可以这么用
s cli <本地组件的目录地址> deploy
![use.gif](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/13970/1628250414113-a3574f0c-7c67-4b60-8837-707a7741ee1c.gif#clientId=ufd54e6bc-ca8d-4&from=drop&id=u18b9fc8c&margin=%5Bobject%20Object%5D&name=use.gif&originHeight=905&originWidth=1347&originalType=binary&ratio=1&size=460360&status=done&style=none&taskId=u9f1042a5-53d8-41f4-b5dd-c1323e3ab2f)
这种用法适合在系统的集成， 比如你在gitaction 或者自己的系统里面，通过指令就能完成某些复杂逻辑的处理
​

第二种 用过应用编排
这里就需要进一步开发应用了，应用本身其实不带逻辑执行，他是资源的编排和资源的定义，主要的逻辑执行是在组件。
可以用过 s init 指令选择最后的应用模板进行初始化
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628251340802-dcceaaf7-18b2-4a8a-a827-4ded0015f51c.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=619&id=u1ed89b23&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1238&originWidth=2816&originalType=binary&ratio=1&size=319654&status=done&style=none&taskId=uea29b390-10d1-4323-b455-06f1383b27d&width=1408)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/13970/1628251911045-964d4473-baa1-4c96-9772-8b31399f91fa.png#clientId=ufd54e6bc-ca8d-4&from=paste&height=893&id=u31fa7697&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1786&originWidth=2524&originalType=binary&ratio=1&size=1170000&status=done&style=none&taskId=u8d0bf34f-33e0-4b2b-b9a8-58be50d8b2d&width=1262)






这时在 s.yaml目录下执行 s deploy ，可以看到本地组件被正常调用，并且通过 props 属性传入了name 和 region
### 组件中心
因为组件是S 生态重要的一等公民，这里把组件单独拿出来，是为了更好的让用户复用组件的逻辑能力，我们提供组件的说明文档等，部分组件，比如fc-api 还提供了可视化的操作，方便用户查询api
![component.gif](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/13970/1628249595167-2ab5c634-a1bc-4a44-8830-7c96b5325c89.gif#clientId=ufd54e6bc-ca8d-4&from=drop&id=uc4c7b070&margin=%5Bobject%20Object%5D&name=component.gif&originHeight=960&originWidth=1761&originalType=binary&ratio=1&size=1960738&status=done&style=none&taskId=ud3636cea-76ce-4aad-9582-4315714aae5)
​

​

### 登录github
![login.gif](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/13970/1628252109410-4f232236-1414-4ea5-b106-406f2932e48d.gif#clientId=ufd54e6bc-ca8d-4&from=drop&id=u9b5fce05&margin=%5Bobject%20Object%5D&name=login.gif&originHeight=928&originWidth=1358&originalType=binary&ratio=1&size=1248486&status=done&style=none&taskId=ud81205c3-13dd-4e3e-abdd-457123227d6)
授权登录github 可以对应用进行收藏，这里因为国内网络的问题，授权登录可能会失效，可以多次尝试一下
​

### 秘钥管理
通过Serverless Desktop 你可以很方便的管理你的秘钥信息，请务必注意保管好自己的秘钥信息，防止泄露。如有必要可以通过官网控制台禁用秘钥。 
![ak.gif](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/13970/1628252193511-3b9cf023-d6cb-47e3-abca-bcaee3a30771.gif#clientId=ufd54e6bc-ca8d-4&from=drop&id=u63471f4a&margin=%5Bobject%20Object%5D&name=ak.gif&originHeight=928&originWidth=1358&originalType=binary&ratio=1&size=1161077&status=done&style=none&taskId=ubd3da72c-b060-4198-8db7-090ab514bd9)


## 未来展望
接下来我们还会技术深入打磨 Serverless Desktop 除了继续优化本身的使用体验外，还会继续增加更多的新能力和特色，比如会由我们超优秀的设计师同学给出新的视觉和交互方案（笔者做为程序员现在已经到极限），加入高质量技术文章板块， 开放专业开发者认证机制，power tuning，低代码搭建等等。 除了平台建设，我们也会更加专注于开发者实战场景，重点打造 jamstack 建站， api 开发 ，以及多个 serverless 应用场景解决方案等。 我们希望能够为Serverless 开发基建贡献自己的力量，也欢迎大家加入不管是作为开发者还是用户，我们都非常欢迎。
​

## 助力帮助
如果您对Serverless Devs 感兴趣，请帮助我们的项目增加star 吧，[点击访问github项目地址](https://github.com/Serverless-Devs/Serverless-Devs)



---
slug: serverless-devs-fc-perception
title: 阿里云函数计算组件感知线上“异动”：让发布更安全
author: Anycodes
author_title: Serverless Devs
author_url: https://github.com/anycodes
author_image_url: https://avatars.githubusercontent.com/u/21079031?v=4
tags: [命令行, Serverless, 感知]
date: 2021-07-12
---

# 阿里云函数计算组件感知线上“异动”：让发布更安全

从我做Serverless工具开始，就经常会遇到有人问这样一个问题：如何保证Serverless业务部署更新的一致性。

所谓的一致性在这里指的是：我们通过工具在本地进行项目部署，此时再有人通过其他途径（例如控制台等），对项目进行过更新等操作，此时我再在本地进行项目部署，是不是会直接覆盖？

例如，当用户A在本地更新了业务，因为一些特殊情况，导致出现了一个线上异常x，此时用户B重新更新，将这个内容修复了，但是B没有及时同步给A这个事情，A又更新了新的功能，直接覆盖了B的内容，这个时候之前的异常x又出现了，如果此时在A更新的时候，可以感知到线上资源已经变动，那么这种事情就不会再次发生。

目前基于Serverless Devs的阿里云函数计算组件，已经支持了线上“异动”的感知能力，包括了以下几个情况：

1. 本地新建并部署一个线上没有的资源
2. 本地部署完成，线上更新，本地再次部署
3. 本地新建并部署一个线上已经有的资源


## 实验准备

通过`s init`创建一个函数（选择`Alibaba Cloud Serverless`， 选择`HTTP Function - Python3 Example`）：

![image](https://user-images.githubusercontent.com/21079031/125262802-0e712500-e335-11eb-9cca-22ebe1248c94.png)

此时我们查看一下`s.yaml`：

![image](https://user-images.githubusercontent.com/21079031/125263977-0b2a6900-e336-11eb-8f3d-f70a52c278a6.png)

该项目部署到线上之后的表现就是在`cn-hangzhou`区创建一个`fc-deploy-service`服务，以及`http-trigger-function`函数

## 本地新建并部署一个线上没有的资源

此时，我们确定一下线上并没有对应资源，所以我们部署一下：

![image](https://user-images.githubusercontent.com/21079031/125263807-ea621380-e335-11eb-8eb2-dd0beee6f935.png)

部署完成，很顺利：

![image](https://user-images.githubusercontent.com/21079031/125264196-3b720780-e336-11eb-861c-780de5e751c8.png)

打开浏览器，查看反馈给我们的自定义地址：

![image](https://user-images.githubusercontent.com/21079031/125264252-46c53300-e336-11eb-94c4-9381447a5550.png)

此时，我们可以在本地，更新一下这个函数代码：

![image](https://user-images.githubusercontent.com/21079031/125264375-62303e00-e336-11eb-86dc-9732cdf8d0e4.png)

保存部署：

![image](https://user-images.githubusercontent.com/21079031/125264530-8429c080-e336-11eb-9dec-957724db95b1.png)

完成之后，再查看线上资源：

![image](https://user-images.githubusercontent.com/21079031/125264620-96a3fa00-e336-11eb-9ffa-ca95a97df6a2.png)

整个过程，还是比较贴近传统的基本流程，也没有触发线上异动，算是中规中矩的理想过程。

## 本地部署完成，线上更新，本地再次部署

此时，我们对线上资源进行变更，首先在控制台找到函数：

![image](https://user-images.githubusercontent.com/21079031/125264794-c3581180-e336-11eb-8081-2a827be9e0b0.png)

修改代码，并部署。

![image](https://user-images.githubusercontent.com/21079031/125264887-dff44980-e336-11eb-9243-bdc9b1b2f9b6.png)

部署完成之后，我们刷新一下刚才的地址：

![image](https://user-images.githubusercontent.com/21079031/125265103-16ca5f80-e337-11eb-9922-45f6fd096575.png)

可以看到已经更新。此时，我们再从本地进行部署：

![image](https://user-images.githubusercontent.com/21079031/125266017-f6e76b80-e337-11eb-9166-252558c59f37.png)

可以看到，系统已经感知到我们的代码变化，此时，我们选择yes，完成之后在查看线上资源：

![image](https://user-images.githubusercontent.com/21079031/125266107-0bc3ff00-e338-11eb-8910-0fed24396313.png)

此处需要额外说明的是，只要是函数计算的服务，函数，触发器发生变化，此处都可以进行感知，不管是配置还是代码。

## 本地新建并部署一个线上已经有的资源

此时，我们再进行最后的实验，我们将本地项目删除，重新建设。然后执行部署，由于刚刚实验过的原因，我们已经在线上存在了这些资源，所以此时算是部署一个线上的资源。

![image](https://user-images.githubusercontent.com/21079031/125266378-5a719900-e338-11eb-90a9-41b30694cda2.png)

此时可以看到，系统感知到这个资源本地没部署过，线上并且已经存在，所以此时需要确定是否覆盖。

## 总结

代码在其他场景被更新，需要我们在当前得到感知，这个事情其实是非常重要的，和代码的安全发布密不可少。而此时，通过Serverless Devs是可以做到的。

那么问题来了，如果我已经有了一个项目，我想集成到cd流程，我不想出现交互式操作，应该如何处理呢？

此时我们提供一个`--use-remote`参数，用来强行覆盖线上配置，通过这样的指令就可以实现无交互的，本地优先。

每一个工具的诞生，都要有一个成长的过程，Serverless Devs正在不断的成长。期待更多更好的功能出现。

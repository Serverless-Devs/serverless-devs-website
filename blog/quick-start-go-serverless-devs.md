---
slug: quick-start-go-serverless-devs
title: 从玩具到生产力 2： 从脚手架到快速部署
author: Anycodes
author_title: Serverless Devs
author_url: https://github.com/anycodes
author_image_url: https://avatars.githubusercontent.com/u/21079031?v=4
tags: [命令行, Serverless, 脚手架, 快速部署]
date: 2021-06-21
---

# 从玩具到生产力 2： 从脚手架到快速部署

从刚开始接触一个工具，到通过这个工具把一个东西部署到线上要多久？这一直是我在思考的一个问题，就我个人而言，如果这个时间超过1小时，就会大大折扣开发者的耐性，甚至让开发者直接放弃这个工具的使用，更甚之，这个时间不能超过30分钟，10分钟，5分钟。

那么Serverless Devs从脚手架到快速部署要多久呢？

## 部署一个Hello World

当我们通过`npm install -g @serverless-devs/s`完成了Serverless的安装，我们只需要`s init`，选择一个云厂商（例如`Alibaba`），就可以看到`Hello world`的模板了：

![image](https://user-images.githubusercontent.com/21079031/122704697-c7889600-d286-11eb-8ab6-fe28eb7333bd.png)

此时，我们可以快速选择一个`Hello world`的模板：

![image](https://user-images.githubusercontent.com/21079031/122704751-e0914700-d286-11eb-849b-53171ef91804.png)

此时脚手架发挥作用，会引导我们选择文件目录，所需密钥信息等，完成之后，我们就可以直接进入项目目录，并且执行`s deploy`部署项目：

![image](https://user-images.githubusercontent.com/21079031/122704948-509fcd00-d287-11eb-965a-788343e90db9.png)


此时系统会为我们默认分配一个域名，我们可以直接打开： 

![image](https://user-images.githubusercontent.com/21079031/122705044-80e76b80-d287-11eb-984f-1634303f2289.png)


## 部署一个Zblog/Wordpress

部署一个Zblog/Wordpress有多简单？也许在传统服务器上，宝塔等工具已经让我们部署这类PHP框架非常简单的，但是在Serverless架构下，由于天然分布式原因，由于一些目录不可写原因，这些框架的部署，还是挺受考验的。

但是Serverless devs可以提供非常简单的部署方案：

![image](https://user-images.githubusercontent.com/21079031/122706145-d6bd1300-d289-11eb-93c1-0687fc9200e3.png)

根据各种提醒，即可完成项目创建：

![image](https://user-images.githubusercontent.com/21079031/122706174-eb99a680-d289-11eb-9f95-ff904f476d46.png)

> 这里需要额外说明一下，阿里云Serverless Devs提供的传统CMS，BLOG等项目的部署到Serverless架构，默认采用了NAS的模式，即函数计算本身是一个单纯的环境，所有代码等放在NAS中，这样可以保证代码最小改造，以目前的所示的Zblog案例，理论上是可以做到0改造部署到Serverless架构，Wordpress同样。Wordpress的初始化方法为：`s init start-wordpress`

完成之后，同样可以获得到一测试地址，快速体验。

## 更多的部署

- 快速创建案例项目：
  - 快速创建WordPress: `s init start-wordpress`   
  - 快速创建ZBlog: `s init start-zblog`   
  - 快速创建Discuz: `s init start-discuz`   
  - 快速创建企业网站: `s init start-metinfo`   
  - 快速创建问答系统: `s init start-whatsns`  
  - 快速创建电商系统: `s init start-ecshop`
- 快速创建静态项目：
  - react应用 `s init devsapp/website-react`
  - vue应用 `s init devsapp/website-vue`
  - hexo应用 `s init devsapp/website-hexo`
  - docusaurus应用 `s init devsapp/website-docusaurus`
  - vuepress应用 `s init devsapp/website-vuepress`

创建完成之后，可以直接进入项目，执行s deploy进行项目部署


## 总结

Serverless Devs提供了强大的脚手架能力和快速部署的能力，通过这些能力，对我们：
- 创建一个初始化项目快速体验有极好的帮助
- 对我们快速创建一个示例项目有很好的支持
- 对于我们快速开发，上手项目有比较好的效果

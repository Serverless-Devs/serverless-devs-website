---
title: 如何开发一个 CAP 的应用
---

## 准备工作

安装最新版本的 s 工具

如果本地已经安装了 node，且 node 版本 >=16

```npm i @serverless-devs/s -g  --force```

mac 或者 linux 可以直接使用脚本安装

```curl -o- -L https://cli.serverless-devs.com/install.sh | bash```

其他安装方式： https://docs.serverless-devs.com/user-guide/install/

> 如果涉及到对外推送 github， 请安装敏感信息检查插件 : https://aliyuque.antfin.com/ly3h7p/fi19ng/qgdp11vkdxfd8esc

## 开发应用&以及发布应用到 registry

直接参考[应用规范](./application.md)

**建议项**

- 建议统一使用在 publish.yaml 的目录上执行 `s cli capreadme index` 完成 readme 的编写， 请参考文档规范来完成， 文档有 review 机制，不合格不会上线

- 默认的模版中 publish.yaml 中的 "Organization: 阿里云函数计算（FC）" 是注释掉的， 如果取消注释的话，设置应用属于阿里云函数计算（FC）组织的话， 需要执行 s registry login, 完成 github 授权登录，然后把 github 名字告诉 西流 张星宇(宇暮) 高魏洪 后台添加到到对应的组织才有权限发布。 其他组织同理，目前组织有如下几种：
  > 阿里云函数计算（FC） Serverless应用引擎（SAE） 云工作流 （CloudFlow） 阿里云文档Docs  云原生应用开发平台（CAP）

## 上架应用到开发中心控制台
为了保证上架到控制台应用的质量，我们会插入一个审批流
发起审批入口地址：https://yida-group.alibaba-inc.com/s/cap-check

![](https://img.alicdn.com/imgextra/i3/O1CN01hkXDr01Mh1GBi1jFn_!!6000000001465-0-tps-1858-1040.jpg)

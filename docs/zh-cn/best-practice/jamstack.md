---
title: 构建Jamstack站点
keywords: Serverless,Electron,Jamstack
description: 引导构建Jamstack站点应用。
---
# 使用ServerlessDesktop 构建Jamstack站点

## 前置准备
+ 请先安装ServerlessDesktop 并且 配置好秘钥信息
+ 相关内容参考 [《ServerlessDesktop安装指引》](/zh-cn/docs/installed/desktopinstall.html) 以及 ServerlessDesktop使用指南-> [《秘钥信息配置》](/zh-cn/docs/desktop/access-config.html)
## 主体操作
该部分大约花费5分钟

### 应用选择
操作路由：Serverless Hub -> 优选 -> Jamstack实战，点击"docsite-basic"查看应用详情
 
![ServerlessDesktop](https://img.alicdn.com/imgextra/i3/O1CN013VP5rf1XgWIAXo6fk_!!6000000002953-2-tps-1689-987.png)

点击“下载”,并选择本地目录进行项目模板初始化。系统将应用模板下载并初始化之后会出现一个要求填写二级域名的阻塞操作。
![ServerlessDesktop](https://img.alicdn.com/imgextra/i2/O1CN01ZYrOry1gvwAW2QFxo_!!6000000004205-1-tps-1777-951.gif)
这里说明一下，为了尽最大程度的保障用户使用体验，我们官方提前准备了 resume.net.cn 的主域名，用户可以在此主域名基础上自定义自己的二级域名 ，您可以以自己的名字作为输入内容，也可以以自己的应用名作为输入域名，输入后为了防止跟其他的域名冲突，可以做一下域名检测. 检测通过后进入主配置界面（您也可以直接忽略检测直接进入主配置界面）
![ServerlessDesktop](https://img.alicdn.com/imgextra/i2/O1CN013QJGDG1SGLaA0CsKN_!!6000000002219-1-tps-1777-951.gif)

可以看到主配置界面左边是可视化配置部分，右边是源码显示
我们在左侧 [服务配置->www] “操作指令”行末，点击“执行”按钮，系统则开始自动执行部署操作，把当前应用模板的资源进行文件上传，并且返回xxx.resume.net.cn域名。 成功后我们从 工作空间（左侧小房子icon）-> 应用管理 查看已经部署好的jamstack应用，进去后点击 “访问域名” 之后的url 即可看到 我们的博客站点。至此您已经拥有了一个 jamstack 博客站点。 
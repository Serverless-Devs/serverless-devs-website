// 全局的一些配置
export default {
  rootPath: '', // 发布到服务器的根目录，需以/开头但不能有尾/，如果只有/，请填写空字符串
  port: 8080, // 本地开发服务器的启动端口
  domain: 'serverlessdevs.resume.net.cn', // 站点部署域名，无需协议和path等
  defaultSearch: 'baidu', // 默认搜索引擎，baidu或者google
  defaultLanguage: 'zh-cn',
  'en-us': {
    pageMenu: [
      {
        key: 'products', // 用作顶部菜单的选中
        text: 'Products',
        link: '/en-us/products/index.html',
        children: [{
          key: 'serverlessdesktop',
          text: 'Serverless Desktop',
          link: '/zh-cn/desktop/index.html'
        }, {
          key: 'serverlesscli',
          text: 'Serverless Cli',
          link: '/zh-cn/cli/index.html'
        }, {
          key: 'serverlesshub',
          text: 'Serverless Hub',
          link: ''
        }]
      },
      {
        key: 'developer',
        text: 'Developer',
        link: '/zh-cn/developer/index.html',
        children: [{
          key: 'doc',
          text: '文档',
          link: '/zh-cn/desktop/index.html'
        }, {
          key: 'getstart',
          text: '快速开始',
          link: ''
        }, {
          key: 'community',
          text: '社区活动',
          link: ''
        }, {
          key: 'opensource',
          text: '开源',
          link: 'https://github.com/Serverless-Devs/Serverless-Devs'
        }]
      },
      {
        key: 'serverlesshub',
        text: '应用中心',
        link: 'https://serverlesshub.resume.net.cn?spm=serverlessdevs.topbar.0.0.0',
      },
      {
        key: 'serverlessresolve',
        text: '企业级Serverless解决方案',
        link: '',
        children: [{
          key: 'fc',
          text: '函数计算 FC',
          link: 'https://www.aliyun.com/product/fc?spm=serverlessdevs.topbar.0.0.0'
        }, {
          key: 'sae',
          text: 'Serverless 应用引擎',
          link: 'https://www.aliyun.com/product/aliware/sae?spm=serverlessdevs.topbar.0.0.0'
        }]
      },
      {
        key: 'blog',
        text: 'BLOG',
        link: '/en-us/blog/index.html',
      },
      {
        key: 'community',
        text: 'COMMUNITY',
        link: '/en-us/community/index.html',
      },
    ],
    disclaimer: {
      title: 'Disclaimer',
      content: 'the disclaimer content',
    },
    documentation: {
      title: 'Documentation',
      list: [
        {
          text: 'Overview',
          link: '/en-us/docs/demo1.html',
        },
        {
          text: 'Quick start',
          link: '/en-us/docs/demo2.html',
        },
        {
          text: 'Developer guide',
          link: '/en-us/docs/dir/demo3.html',
        },
      ],
    },
    resources: {
      title: 'Resources',
      list: [
        {
          text: 'Blog',
          link: '/en-us/blog/index.html',
        },
        {
          text: 'Community',
          link: '/en-us/community/index.html',
        },
      ],
    },
    copyright: 'Copyright © 2018 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  'zh-cn': {
    pageMenu: [
      {
        key: 'products',
        text: '产品',
        link: '/zh-cn/products/index.html',
        children: [{
          key: 'serverlessdesktop',
          text: 'Serverless Desktop',
          link: '/zh-cn/desktop/index.html'
        }, {
          key: 'serverlesscli',
          text: 'Serverless Cli',
          link: '/zh-cn/cli/index.html'
        }, {
          key: 'serverlesshub',
          text: 'Serverless Hub',
          target: '_blank',
          link: 'https://serverlesshub.resume.net.cn?spm=serverlessdevs.topbar.0.0.0'
        }]
      },
      {
        key: 'developer',
        text: '开发者',
        link: '/zh-cn/developer/index.html',
        children: [{
          key: 'doc',
          text: '文档',
          link: '/zh-cn/docs/overview/intro.html'
        }, {
          key: 'getstart',
          text: '快速开始',
          link: '/zh-cn/docs/quickstart/desktop-quickstart.html'
        }, {
          key: 'community',
          text: '社区活动',
          link: 'https://github.com/Serverless-Devs/Serverless-Devs/discussions'
        }, {
          key: 'opensource',
          text: '开源',
          link: 'https://github.com/Serverless-Devs/Serverless-Devs'
        }]
      },
      {
        key: 'serverlesshub',
        text: '应用中心',
        target: '_blank',
        link: 'https://serverlesshub.resume.net.cn?spm=serverlessdevs.topbar.0.0.0',
      },
      {
        key: 'serverlessresolve',
        text: '企业级Serverless解决方案',
        link: '',
        children: [{
          key: 'fc',
          text: '函数计算 FC',
          link: 'https://www.aliyun.com/product/fc?spm=serverlessdevs..topbar.0.0.0'
        }, {
          key: 'sae',
          text: 'Serverless 应用引擎',
          link: 'https://www.aliyun.com/product/aliware/sae?spm=serverlessdevs..topbar.0.0.0'
        }]
      },
      {
        key: 'blog',
        text: '博客',
        link: '/zh-cn/blog/index.html',
      },
      {
        key: 'community',
        text: '社区',
        target: '_blank',
        link: 'https://github.com/Serverless-Devs/Serverless-Devs/discussions',
      },
    ],
    disclaimer: {
      title: '愿景',
      content: 'Serverless Devs 一款可以在Serverless应用全生命周期发挥作用的开发者工具，致力于打造成为 Serverless 应用开发的基础设施',
    },
    documentation: {
      title: '文档',
      list: [
        {
          text: '概览',
          link: '/zh-cn/docs/intro.html',
        },
        {
          text: '快速开始',
          link: '/zh-cn/docs/quickstart/desktop-quickstart.html',
        },
        {
          text: '开发者指南',
          link: '/zh-cn/developer/index.html',
        },
      ],
    },
    resources: {
      title: '资源',
      list: [
        {
          text: '博客',
          link: '/zh-cn/blog/index.html',
        },
        {
          text: '社区',
          link: 'https://github.com/Serverless-Devs/Serverless-Devs/discussions',
        },
      ],
    },
    copyright: 'Copyright © 2021 Serverless Devs,Inc. Built with docsite',
  },
};

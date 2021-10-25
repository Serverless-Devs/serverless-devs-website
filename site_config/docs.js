export default {
  'en-us': {
    sidemenu: [
      {
        title: '概述',
        children: [
          {
            title: 'ServerlessDevs是什么',
            link: '/zh-cn/docs/overview/intro.html',
          },
          {
            title: '术语表',
            link: '/zh-cn/docs/overview/terminology.html',
          },
          {
            title: 'FAQ',
            link: '/zh-cn/docs/overview/faq.html',
          }
        ],
      },
      {
        title: '获取ServerlessDevs 客户端工具',
        children: [
          {
            title: 'Serverless Desktop 安装指引',
            link: '/zh-cn/docs/intalled/desktopinstall.html',
          },
          {
            title: 'Serverless Cli 安装指引',
            link: '/zh-cn/docs/intalled/cliinstall.html',
          }
        ],
      },
      {
        title: '快速开始',
        children: [
          {
            title: '使用ServerlessDesktop构建高性能站点',
            link: '/zh-cn/docs/quickstart/desktop-quickstart.html',
          }
        ],
      },
      {
        title: '最佳案例',
        children: [
          {
            title: '快速构建Jamstack站点',
            link: '/zh-cn/docs/m1.html',
          }, {
            title: 'Nuxt实现SSR方案',
            link: '/zh-cn/docs/m2.html',
          }
        ],
      },
      {
        title: '用户文档',
        children: [
          {
            title: '使用ServerlessDesktop构建高性能站点',
            link: '/zh-cn/docs/demo8.html',
          }
        ],
      },
      {
        title: '开发者指引',
        children: [
          {
            title: '使用ServerlessDesktop构建高性能站点',
            link: '/zh-cn/docs/demo9.html',
          }
        ],
      },
      {
        title: '运维指南',
        children: [
          {
            title: '使用ServerlessDesktop构建高性能站点',
            link: '/zh-cn/docs/demo10.html',
          }
        ],
      }
    ],
    barText: 'Documentation',
  },
  'zh-cn': {
    sidemenu: [
      {
        title: '概述',
        children: [
          {
            title: 'ServerlessDevs是什么',
            link: '/zh-cn/docs/overview/intro.html',
          },
          {
            title: '术语表',
            link: '/zh-cn/docs/overview/terminology.html',
          },
          {
            title: 'FAQ',
            link: '/zh-cn/docs/overview/faq.html',
          }
        ],
      },
      {
        title: '快速开始',
        children: [
          {
            title: 'Serverless Desktop 安装指引',
            link: '/zh-cn/docs/installed/desktopinstall.html',
          },
          {
            title: 'Serverless Cli 安装指引',
            link: '/zh-cn/docs/installed/cliinstall.html',
          }
        ],
      },
      {
        title: '最佳实践',
        children: [
          {
            title: '快速构建Jamstack站点',
            link: '/zh-cn/docs/best-practice/jamstack.html',
          }, {
            title: 'Restful API 实现',
            link: '/zh-cn/docs/best-practice/restful.html',
          }
        ],
      },
      {
        title: '用户文档',
        children: [
          {
            title: '配置规范说明',
            link: '/zh-cn/docs/user/yaml.html',
          }, {
            title: '源规范说明',
            link: '/zh-cn/docs/user/registry.html',
          }, {
            title: '秘钥配置介绍',
            link: '',
            children: [{
              title: '阿里云秘钥获取',
              link: '/zh-cn/docs/provider-config/alibabacloud.html'
            }, {
              title: 'AWS秘钥获取',
              link: '/zh-cn/docs/provider-config/aws.html'
            }, {
              title: 'Azure秘钥获取',
              link: '/zh-cn/docs/provider-config/azure.html'
            }, {
              title: '百度云秘钥获取',
              link: '/zh-cn/docs/provider-config/baiducloud.html'
            }, {
              title: 'Google Cloud秘钥获取',
              link: '/zh-cn/docs/provider-config/gcp.html'
            }, {
              title: '华为云秘钥获取',
              link: '/zh-cn/docs/provider-config/huawei.html'
            }, {
              title: '腾讯云秘钥获取',
              link: '/zh-cn/docs/provider-config/tencentcloud.html'
            }]
          }, {
            title: '应用模板介绍',
            link: '/zh-cn/docs/user/app-template.html',
          }, {
            title: '组件说明',
            link: '/zh-cn/docs/user/component.html',
          }, {
            title: '应用说明',
            link: '/zh-cn/docs/user/app.html',
          }
        ],
      },
      {
        title: '成为贡献者',
        children: [
          {
            title: '如何成为贡献者',
            link: '/zh-cn/docs/contributor/overview.html',
          }, 
        ]
      },
      {
        title: 'Serverless Devs Cli使用指南',
        children: [
          {
            title: '命令行使用介绍',
            link: '/zh-cn/docs/cli/init.html',
          }
        ],
      },
      {
        title: 'Serverless Desktop使用指南',
        children: [
          {
            title: '秘钥信息配置',
            link: '/zh-cn/docs/desktop/access-config.html',
          },
          {
            title: '可视化配置介绍',
            link: '/zh-cn/docs/desktop/config.html',
          }, {
            title: '工作空间介绍',
            link: '/zh-cn/docs/desktop/workspace.html',
          }, {
            title: '端云调试介绍',
            link: '/zh-cn/docs/desktop/debug.html',
          }
        ],
      }
    ],
    barText: '文档',
  },
};

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'Serverless Devs',
    tagline: '一款可以在Serverless应用全生命周发挥作用的开发者工具',
    url: 'https://www.serverless-devs.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'Serverless Devs', // Usually your repo name.
    themeConfig: {
        navbar: {
            title: 'Serverless Devs',
            // logo: {
            //   alt: 'Serverless Devs',
            //   src: 'img/logo.svg',
            // },
            items: [
                {
                    type: 'doc',
                    docId: 'intro',
                    position: 'left',
                    label: '帮助文档',
                },
                {to: '/blog', label: '最新动态', position: 'left'},
                {
                    to: 'https://github.com/Serverless-Devs/Serverless-Devs/discussions',
                    label: '交流论坛',
                    position: 'left'
                },
                {
                    to: 'https://github.com/Serverless-Devs/Serverless-Devs/discussions/60',
                    label: '贡献代码',
                    position: 'left',
                },
                {
                    to: 'https://github.com/Serverless-Devs/Serverless-Devs/discussions/62',
                    label: '开发组件',
                    position: 'left',
                },
                {
                    to: '/blog/open-source-summer-2021',
                    label: ' 🔥🔥 开源之夏2021',
                    position: 'left',
                },
                {
                    href: 'https://github.com/serverless-devs/serverless-devs',
                    label: 'GitHub',
                    position: 'right',
                },
                {
                    href: 'https://gitee.com/serverless-devs/Serverless-Devs',
                    label: 'Gitee',
                    position: 'right',
                },
                {
                    href: 'https://github.com/Serverless-Devs/package-awesome',
                    label: 'Awesome',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: '帮助文档',
                            to: '/docs/intro',
                        },
                    ],
                },
                {
                    title: '社区',
                    items: [
                        {
                            label: 'Github Discussions',
                            href: 'https://github.com/Serverless-Devs/Serverless-Devs/discussions',
                        }
                    ],
                },
                {
                    title: '仓库',
                    items: [
                        {
                            label: 'Github',
                            to: 'https://github.com/Serverless-Devs/Serverless-Devs/',
                        },
                        {
                            label: 'Gitee',
                            href: 'https://gitee.com/serverless-devs/Serverless-Devs',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Serverless Devs, Inc. Built with Docusaurus.`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/Serverless-Devs/Serverless-Devs/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://gitee.com/serverless-devs/Serverless-Devs',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};

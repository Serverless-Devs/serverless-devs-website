import type { Customer, Solution, ChooseReason, CommunityLink, ContributeLink } from "@/types"
import { getEntries } from "astro:content";

// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// TODO: 配置algolia
export const ALGOLIA = {
  appId: '1QV814950M',
  apiKey: '7445da3dec050d45d29f3fe93ed45af3',
  indexName: 'nacos'
}

// 文档根据版本区分的提示banner
export const DOCS_BANNER = {
  latest: '',
  next: '',
  v1: '',
  v2: '',
}

// TODO: 文档Header数据
export const DOCS_ITEM = [
  {
    key: "快速开始",
    label: "快速开始",
    target: "_self",
    link: "https://docs.serverless-devs.com/getting-started/",
    translations: {
      en: "Quick start",
      link: "https://docs.serverless-devs.com/getting-started/",
    }
  },
  {
    key: "docs",
    label: "文档相关",
    target: "_self",
    link: "http://docs.serverless-devs.com",
    translations: {
      en: "Docs",
      link: "http://docs.serverless-devs.com",
    }
  },
];

// 主要特性
export const CHOOSE_REASON_LIST: ChooseReason[] = [
  {
    title: "home.website.edge.1.title",
    svgKey: "easy",
    description: "home.website.edge.1.description",
  },
  {
    title: "home.website.edge.2.title",
    svgKey: "adaptive",
    description: "home.website.edge.2.description",
  },
  {
    title: "home.website.edge.3.title",
    svgKey: "timeTested",
    description: "home.website.edge.3.description",
  },
  {
    title: "home.website.edge.4.title",
    svgKey: "variety",
    description: "home.website.edge.4.description",
  },
]

// 合作客户反馈
export const COMPANY_CUSTOMERS: Customer[] = [
  {
    name: "cloud.feedback.soul.name",
    theme: "gray",
    logo: "https://img.alicdn.com/imgextra/i2/O1CN01GZhEqR1bY3dY5SOuY_!!6000000003476-2-tps-160-130.png",
    href: "https://code.alibaba-inc.com/goat/astro-nacos",
    description: "cloud.feedback.soul.description",
  },
  {
    name: "cloud.feedback.laidian.name",
    theme: "dark",
    logo: "https://img.alicdn.com/imgextra/i3/O1CN010ulPrT1M45UNBCAXe_!!6000000001380-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/855894",
    description: "cloud.feedback.laidian.description",
  },
  {
    name: "cloud.feedback.zeekr.name",
    theme: "light",
    logo: "https://img.alicdn.com/imgextra/i2/O1CN01zluUCK29BKvOCojPr_!!6000000008029-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/1173573",
    description: "cloud.feedback.zeekr.description",
  },
  {
    name: "cloud.feedback.ykc.name",
    theme: "gray",
    logo: "https://img.alicdn.com/imgextra/i1/O1CN01LWMfwx1Ggf9VGmXBF_!!6000000000652-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/1172572?groupCode=mse",
    description: "cloud.feedback.ykc.description",
  },
  {
    name: "cloud.feedback.bosideng.name",
    theme: "dark",
    logo: "https://img.alicdn.com/imgextra/i2/O1CN01d7EDXs1HLsnXSTgGG_!!6000000000742-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/1147221?groupCode=mse",
    description: "cloud.feedback.bosideng.description",
  },
  {
    name: "cloud.feedback.skechers.name",
    theme: "light",
    logo: "https://img.alicdn.com/imgextra/i1/O1CN01P1k9gA1YpVsxPYzAw_!!6000000003108-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/844814",
    description: "cloud.feedback.skechers.description",
  },
  {
    name: "cloud.feedback.very.name",
    theme: "gray",
    logo: "https://img.alicdn.com/imgextra/i1/O1CN01DevTFA28W7HY1JFC6_!!6000000007939-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/992090",
    description: "cloud.feedback.very.description",
  },
  {
    name: "cloud.feedback.helian.name",
    theme: "dark",
    logo: "https://img.alicdn.com/imgextra/i3/O1CN01YmUBmh1snwqr4kRot_!!6000000005812-2-tps-544-180.png",
    href: "https://developer.aliyun.com/article/1095573",
    description: "cloud.feedback.helian.description",
  },
  {
    name: "cloud.feedback.zhijin.name",
    theme: "light",
    logo: "https://img.alicdn.com/imgextra/i3/O1CN015GIqM31qsPTObt2CV_!!6000000005551-2-tps-544-180.png",
    href: "https://developer.aliyun.com/article/1064881",
    description: "cloud.feedback.zhijin.description",
  },
];

// 解决方案列表
export const SOLUTION_LIST: Solution[] = [
  {
    checked: true,
    src: "https://help.aliyun.com/zh/mse/use-cases/implement-high-availability-capabilities-of-mse-microservices-registry/?spm=a2c4g.11186623.0.0.102a27e0juv8vG",
    title: "home.solutions.card.1",
    keyword: [
      "home.solutions.card.keyword.high_availability",
      "home.solutions.card.keyword.multi_availability",
      "home.solutions.card.keyword.multi_data",
      "home.solutions.card.keyword.disaster_recovery_protect",
    ],
  },
  {
    checked: false,
    src: "https://help.aliyun.com/zh/mse/use-cases/migration-solution-based-on-mse-sync/?spm=a2c4g.11186623.0.0.13f12318fSap49",
    title: "home.solutions.card.2",
    keyword: [
      "home.solutions.card.keyword.data_synchronization_migration",
      "home.solutions.card.keyword.smooth_migration",
      "home.solutions.card.keyword.migration_high_availability",
      "home.solutions.card.keyword.easy_use",
    ],
  },
  {
    checked: false,
    src: "https://developer.aliyun.com/article/1265016?spm=5176.21213303.J_qCOwPWspKEuWcmp8qiZNQ.10.c89e2f3dQa2WtF&scm=20140722.S_community@@%E6%96%87%E7%AB%A0@@1265016._.ID_community@@%E6%96%87%E7%AB%A0@@1265016-RL_%E4%BA%91%E5%8E%9F%E7%94%9F%E7%BD%91%E5%85%B3%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%AE%89%E5%85%A8%E9%98%B2%E6%8A%A4%E8%83%BD%E5%8A%9B-LOC_llm-OR_ser-V_3-RK_rerank-P0_2",
    title: "home.solutions.card.3",
    keyword: [
      "home.solutions.card.keyword.three_in_one",
      "home.solutions.card.keyword.safety",
      "home.solutions.card.keyword.plugin_ecosystem",
      "home.solutions.card.keyword.application_firewall",
    ],
  },
  {
    checked: false,
    src: "https://help.aliyun.com/zh/mse/use-cases/implement-graceful-start-and-shutdown-of-microservice-applications-by-using-mse/?spm=a2c4g.11186623.0.0.385116bftBJhAY",
    title: "home.solutions.card.4",
    keyword: [
      "home.solutions.card.keyword.lossless",
      "home.solutions.card.keyword.multi_availability",
      "home.solutions.card.keyword.grayscale",
      "home.solutions.card.keyword.service_governance",
    ],
  },
];

// 文档贡献板块的链接列表
export const getCommunityLinkList = (t: Function): CommunityLink[] => [
  {
    href: `/blog`,
    text: t("rightSidebar.readBlog"),
    icon: "basil:document-outline",
  },
  {
    href: "https://github.com/nacos-group/nacos-group.github.io/tree/develop-astro-nacos/src/content/docs",
    text: t("rightSidebar.github"),
    icon: "ant-design:github-filled",
  },
];



// 文档社区板块的链接列表
export const getContributeLinkList = (lang: string, editHref: string, feedbackUrl: string, t: Function): ContributeLink[] => [
  {
    href: `/${lang}/v2/contribution/contributing`,
    text: t("rightSidebar.contributorGuides"),
    depth: 2,
    icon: "tabler:book",
  },
  {
    href: editHref,
    text: t("rightSidebar.editPage"),
    depth: 2,
    icon: "tabler:pencil",
  },
  {
    href: feedbackUrl,
    text: t("rightSidebar.feedbackIssue"),
    depth: 2,
    icon: "ant-design:github-filled",
  },
];

export const i18nMap = {
  "blog": {
    article: 'blog.article.technical',
    case: 'blog.article.case.best.practices',
    ecosystem: 'blog.article.ecosystem.articles',
    expertConsultation: 'blog.article.expert.consultation',
    all: 'blog.all.articles'
  },
  "news": {
    announcement: 'blog.activity.community.announcement',
    release: 'blog.activity.release.statement',
    committer: 'page.blog.news.personnel.promotion',
    cooperate: 'page.blog.news.community.cooperation',
    all: 'page.blog.news.all'
  },
  "activity": {
    'announcement': 'blog.activity.community.announcement',
    'activity-preview': 'blog.activity.preview.event',
    'activity-detail': 'blog.activity.detail.event',
    'all': 'blog.activity.all.event'

  }
};

export const BLOG_CATEGORY = [
  {
    type: 'all',
    title: '全部文章',
    href: '/blog/'
  },
  {
    type: 'expertConsultation',
    title: '专家答疑',
    href: '/blog/expertConsultation/'
  },
  // {
  //   type: 'article',
  //   title: '技术文章',
  //   href: '/blog/article/'
  // },

  // {
  //   type: 'ecosystem',
  //   title: '生态文章',
  //   href: '/blog/ecosystem/'
  // },
  // {
  //   type: 'case',
  //   title: '最佳实践',
  //   href: '/blog/case/'
  // },
];

export const NEWS_CATEGORY = [
  {
    type: 'announcement',
    title: '社区公告',
    href: '/news/announcement'
  },
  {
    type: 'release',
    title: '发布声明',
    href: '/news/release'
  },
  {
    type: 'committer',
    title: '人员晋升',
    href: '/news/committer'
  },
  {
    type: 'cooperate',
    title: '社区合作',
    href: '/news/cooperate'
  },
  {
    type: 'all',
    title: '全部新闻',
    href: '/news/all'
  }
];

export const ACTIVITY_CATEGORY = [
  {
    type: 'announcement',
    title: '社区公告',
    href: '/activity/announcement'
  },
  {
    type: 'activity-preview',
    title: '活动预告',
    href: '/activity/activity-preview'
  },
  {
    type: 'activity-detail',
    title: '活动详情',
    href: '/activity/activity-detail'
  },
  {
    type: 'all',
    title: '全部活动',
    href: '/activity/all'
  }
];

// TODO: 设置运营位
export const HEADER_ACTIVITY_CARD = [
  {
    "collection": "blog",
    "slug": "release-nacos132",
    "description": "Nacos 两周年献礼，Nacos 1.3.2 + Go SDK 1.0.0发布",
    "imageUrl": "https://img.alicdn.com/imgextra/i4/O1CN01bGnAVW1pFeLFnlaQL_!!6000000005331-2-tps-508-370.png"
  },
  {
    "collection": "blog",
    "slug": "release-nacos110",
    "description": "Nacos 1.1.0发布，支持灰度配置和地址服务器模块",
    "imageUrl": "https://img.alicdn.com/imgextra/i4/O1CN01zfayJW1Lhe4kliPv9_!!6000000001331-2-tps-508-370.png"
  }
];

export const HEADER_LEARN_CARD = [
  {
    collection: "blog",
    slug: "release-nacos110",
    description: "Nacos 1.1.0发布，支持灰度配置和地址服务器模块",
    imageUrl:
      "https://img.alicdn.com/imgextra/i4/O1CN01zfayJW1Lhe4kliPv9_!!6000000001331-2-tps-508-370.png",
  },
];

export const HEADER_SOLUTIONS_CARD = [
  {
    collection: "blog",
    slug: "release-nacos110",
    description: "Nacos 1.1.0发布，支持灰度配置和地址服务器模块",
    imageUrl:
      "https://img.alicdn.com/imgextra/i4/O1CN01zfayJW1Lhe4kliPv9_!!6000000001331-2-tps-508-370.png",
  },
];

export const BLOG_IMAGE_SOURCE = [
  "https://img.alicdn.com/imgextra/i1/O1CN0114MKuq1qKyZ0heOq7_!!6000000005478-2-tps-304-179.png",
  "https://img.alicdn.com/imgextra/i2/O1CN01E4YfjD1WmBmWymUJC_!!6000000002830-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i1/O1CN01o9sjZA1Efd1bMrl0C_!!6000000000379-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i1/O1CN011wgjV01CZ695M8OEB_!!6000000000094-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i2/O1CN01swoIUH1csxKPKfwJE_!!6000000003657-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i4/O1CN01nIy1Wf1DjSiy0TCxe_!!6000000000252-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i3/O1CN019EjKf11Dj0KQKkP3e_!!6000000000251-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i2/O1CN01l7gM7r1Y4L5ngHWb8_!!6000000003005-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i2/O1CN01oWfLB51kfENwUFaQw_!!6000000004710-2-tps-608-358.png"
];

export const MICROSERVICE_SOLUTION = [
  { title: 'Spring Cloud Alibaba SEATA', image: '/assets/2-1.jpg', detailTitle: "home.introduction.detailTitle.1", detail: 'home.introduction.detail.1' },
  { title: 'Spring Cloud Alibaba Sentinel', image: '/assets/2-2.jpg', detailTitle: 'home.introduction.detailTitle.2', detail: 'home.introduction.detail.2' },
  { title: 'Spring', image: '/assets/2-3.jpg', detailTitle: 'home.introduction.detailTitle.3', detail: 'home.introduction.detail.3' },
  { title: 'Spring Cloud Alibaba Nacos', image: '/assets/2-4.jpg', detailTitle: 'home.introduction.detailTitle.4', detail: 'home.introduction.detail.4' },
  { title: 'Spring Cloud Alibaba Nacos', image: '/assets/2-5.jpg', detailTitle: 'home.introduction.detailTitle.5', detail: 'home.introduction.detail.5' },
  { title: 'Spring Cloud Alibaba Nacos', image: '/assets/2-6.jpg', detailTitle: 'home.introduction.detailTitle.6', detail: 'home.introduction.detail.6' },
  { title: 'Spring Cloud Alibaba Nacos', image: '/assets/2-7.jpg', detailTitle: 'home.introduction.detailTitle.7', detail: 'home.introduction.detail.7' },
];

export const categoryMap = {
  article: "blog_article",
  case: "blog_case",
  ecosystem: "blog_ecosystem",
  expertConsultation: "blog_expertConsultation",
  release: "news_release",
  committer: "news_personnel",
  announcement: "news_announcement",
  cooperate: "news_cooperate",
  "activity-preview": "activity_activity-preview",
  "activity-detail": "activity_activity-preview",
};

export const blogArticle = {
	article: "blog.article.technical",
	case: "blog.article.case.best.practices",
	ecosystem: "blog.article.ecosystem.articles",
  expertConsultation: "blog.article.expert.consultation",
	announcement: "blog.activity.community.announcement",
	release: "blog.activity.release.statement",
	committer: "page.blog.news.personnel.promotion",
	cooperate: "page.blog.news.community.cooperation",
	"activity-preview": "blog.activity.preview.event",
	"activity-detail": "blog.activity.detail.event",
};

export const ProductDisplayCardData = [
  {
    cover: "https://img.alicdn.com/imgextra/i2/O1CN01k1amBw1U0RHtPPlvH_!!6000000002455-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Spring",
    body: "home.introduction.card.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i3/O1CN01WxXILZ1C0I4pkZUyD_!!6000000000018-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Spring Boot",
    body: "home.introduction.card.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i4/O1CN01ye2eKa1obLWDSsIiE_!!6000000005243-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Spring Cloud Alibaba",
    body: "home.introduction.card.sca.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i2/O1CN01psWBwW1tzgeAxapCz_!!6000000005973-0-tps-2448-3672.jpg",
    coverPosition: "bottom",
    title: "Spring Cloud Alibaba Nacos",
    body: "home.introduction.card.Nacos.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i2/O1CN01HzKXZY29J7h0UIGJ5_!!6000000008046-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Spring Cloud Alibaba Sentinel",
    body: "home.introduction.card.Sentinel.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i3/O1CN01bJroU81BzNHfeB3jN_!!6000000000016-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Spring Cloud Alibaba Seata",
    body: "home.introduction.card.Seata.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i2/O1CN01l9eXcR1LJN7PxX79e_!!6000000001278-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Spring Cloud Alibaba RocketMQ",
    body: "home.introduction.card.RocketMQ.des",
  },
];

//获取顶部导航悬浮层 博客列表信息
export const getBlogContentList = async (blogList = []) => {

  const simplifiedPosts = blogList.map((item) => ({
    collection: item.collection,
    slug: item.slug,
  }));
  const blogDescrip = blogList.map((item) => item.description);

  const blogImgs = blogList.map((item) => item.imageUrl);
  const posts = (await getEntries(simplifiedPosts as any)) || [];

  return {
    blogDescrip,
    blogImgs,
    posts,
  };
}

export const COMMUNITY_MENU_LIST = [
  {
    key: "app",
    label: "应用",
    target: "_self",
    link: "https://registry.serverless-devs.com/application.html",
    translations: {
      en: "Applications",
      link: "https://registry.serverless-devs.com/application.html",
    }
  },
  {
    key: "components",
    label: "组件",
    target: "_self",
    link: "https://registry.serverless-devs.com/component.html",
    translations: {
      en: "Components",
      link: "https://registry.serverless-devs.com/component.html",
    }
  },
  {
    key: "plugins",
    label: "插件",
    target: "_self",
    link: "https://registry.serverless-devs.com/plugin.html",
    translations: {
      en: "Plugins",
      link: "https://registry.serverless-devs.com/plugin.html",
    }
  },
  {
    key: "qa",
    label: "常见问答",
    target: "_self",
    link: "https://registry.serverless-devs.com/faq.html",
    translations: {
      en: "Q&A",
      link: "https://registry.serverless-devs.com/faq.html",
    }
  },
];

export const LEARN_CARD_LIST = [
  {
    title: "commmon.header.spring.tutorial",
    description: "commmon.header.spring.tutorial.describe",
    href: "/blog/release-nacos132/?source=blog_article",
  },
  {
    title: "commmon.header.spring.boot.tutorial",
    description: "commmon.header.spring.boot.tutorial.describe",
    href: "/blog/release-nacos132/?source=blog_article",
  },
  {
    title: "commmon.header.spring.cloud.alibaba.tutorial",
    description:  "commmon.header.spring.cloud.alibaba.tutorial.describe",
    href: "/blog/release-nacos132/?source=blog_article",
  },
  {
    title: "commmon.header.spring.mse.ebook",
    description: "commmon.header.spring.mse.ebook.describe",
    href: "/blog/release-nacos132/?source=blog_article",
  },
];

export const SOLUTIONS_CARD_LIST = [
  {
    title: "commmon.header.microservices.engine",
    description: "commmon.header.microservices.engine.describe",
    href: "/blog/release-nacos132/?source=blog_article",
  },
  {
    title: "commmon.header.microservices.cloud.native.gateway",
    description: "commmon.header.microservices.cloud.native.gateway.describe",
    href: "/blog/release-nacos132/?source=blog_article",
  },
  {
    title: "commmon.header.microservices.governance",
    description: "commmon.header.microservices.governance.describe",
    href: "/blog/release-nacos132/?source=blog_article",
  },
  {
    title: "commmon.header.microservices.application.service",
    description: "commmon.header.microservices.application.service.describe",
    href: "/blog/release-nacos132/?source=blog_article",
  },
];
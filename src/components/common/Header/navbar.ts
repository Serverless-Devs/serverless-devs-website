import DocsMenu from "./DocsMenu.astro";
import CommunityMenu from "./CommunityMenu.astro";
import LearnMenu from "./LearnMenu.astro";
import SolutionsMenu from "./SolutionsMenu.astro";


export default [
  {
    label: "主页",
    translations: {
      en: "HOME",
    },
    route: "/",
    trigger: "hover",
    relativePosition: 'page',
    position: "absolute",
  },
  {
    label: "开始与文档",
    translations: {
      en: "DOCS",
    },
    trigger: "hover",
    slot: DocsMenu,
    position: "absolute",
  },
  {
    label: "Registry",
    translations: {
      en: "COMMUNITY",
    },
    trigger: "hover",
    // relativePosition: 'page',
    slot: CommunityMenu,
    position:"absolute",
  },
  {
    label: "答疑样例",
    translations: {
      en: "FAQ",
    },
    route: "/blog/",
    trigger: "hover",
    relativePosition: 'page',
    position: "absolute",
  },
];
import React from 'react';
import clsx from 'clsx';

import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '可支持主流 Serverless 服务/框架',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Serverless Devs 是一个组件化与插件化的 Serverless 开发者平台，开发者可以在平台中可插拔式的使用不同 Serverless 的服务和框架，同时可参与组件和插件的开发。无论是工业级的 Serverless 服务，还是各类开源的 Serverless 框架，Serverless Devs 都可友好支持。开发者无需对市面上每一款 Serverless 工具进行研究和学习，只需通过 Serverless Devs ，就可以简单、快捷的“上手”主流 Serverless 服务和框架。
      </>
    ),
  },
  {
    title: 'Serverless Desktop 可视化编辑和部署',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <>
          Serverless Devs 拥有可视化编辑和部署流程。在 Serverless Desktop 中，使用者可以通过关键词快速检索所需的应用案例或组件，并且通过可视化编辑完成项目配置，通过鼠标点击即可完成项目部署。无论是进行项目体验，还是进行项目开发、运维，在应用中心的加持下，在可视化编辑和部署的加持下，Serverless 项目的整体部署时间缩短了近 1 倍。
        </>
        <>
          <a style={{ display: 'block' }} href="https://serverlessdesktop.oss-cn-beijing.aliyuncs.com/ServerlessDesktop-0.0.4-mac.zip" target="_blank">下载 MAC 版 Serverless Desktop</a>
        </>
        <>
          <a style={{ display: 'block' }} href="https://serverlessdesktop.oss-cn-beijing.aliyuncs.com/ServerlessDesktop-0.0.4-win.zip" target="_blank">下载 Windows 版 Serverless Desktop</a>
        </>
      </>
    ),
  },
  {
    title: '灵活与开放的使用方法',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        与绝大部分的开发者工具不同的是，Serverless Devs 在进行项目描述时不仅仅可以对函数计算、API 网关、对象存储等资源进行描述，也可以通过 Serverless Devs 提供的插件以及 Hook 进行 Install、Build、Publish 等行为描述。与此同时 Serverless Devs 不会对每个组件的命令进行限制，而是鼓励开发者针对不同的组件，开发不同的能力来应对更多、更复杂的场景。
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

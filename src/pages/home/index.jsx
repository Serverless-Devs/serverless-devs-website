import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { getScrollTop, getLink } from '../../../utils';
import { get } from '../../../utils/request';
import Header from '../../components/header';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
import homeConfig from '../../../site_config/home';

import './index.scss';

class Home extends Language {

  constructor(props) {
    super(props);
    this.state = {
      headerType: 'primary',
      contributors: [],
      gitdata: {},
      releases: []
    };
  }

  componentDidMount = async () => {
    window.addEventListener('scroll', () => {
      const scrollTop = getScrollTop();
      if (scrollTop > 66) {
        this.setState({
          headerType: 'normal',
        });
      } else {
        this.setState({
          headerType: 'primary',
        });
      }
    });

    const gitdata = await get('https://api.github.com/repos/Serverless-Devs/Serverless-Devs');
    const releases = await get('https://api.github.com/repos/Serverless-Devs/Serverless-Devs/releases');
    const contributors = await get('https://api.github.com/repos/Serverless-Devs/Serverless-Devs/contributors');

    this.setState({
      contributors,
      gitdata,
      releases
    })
    // const kvStoreData = await getKvRequest('/user.json'); // 获取kv 的动态数据
    // console.log(kvStoreData);

    // const serverlessData = await getServerlessRequest('/apis'); // 获取函数接口 的动态数据
    // console.log(serverlessData);


  }



  render() {
    const language = this.getLanguage();
    const dataSource = homeConfig[language];
    const { headerType, contributors, gitdata, releases } = this.state;
    const currentRelease = releases[0] || {};
    const headerLogo = headerType === 'primary' ? '/img/sdLogo.png' : '/img/sdLogoblack.png';
    return (
      <div className="home-page">
        <section className="top-section" style={{ backgroundImage: 'url(https://img.alicdn.com/imgextra/i3/O1CN01OSBkaL1JL57ypRyZa_!!6000000001011-2-tps-2880-1400.png)' }}>
          <Header
            currentKey="home"
            type={headerType}
            logo={headerLogo}
            language={language}
            onLanguageChange={this.onLanguageChange}
          />
          <div className="vertical-middle">
            <div className="product-name">
              <div className="release-content">
                <h2>{dataSource.release.releaseTitle}</h2>
                <h2>{dataSource.release.releaseVersion}</h2>
                <p className="product-desc">{dataSource.release.releaseInfo}</p>
                <div className="button-area">
                  {
                    dataSource.release.buttons.map(b => <Button type={b.type} key={b.type} link={b.link} target={b.target}>{b.text}</Button>)
                  }
                </div>
                <div className="github-buttons" >
                  <a target='_blank' href="https://github.com/Serverless-Devs/Serverless-Devs" rel="noopener norefferrer" >
                    <div className="star">
                      <img src="/img/github_star.png" />
                      <span className="type">Star</span>
                      <span className="line"></span>
                      <span className="count">{gitdata.watchers || 0}</span>
                    </div>
                  </a>
                  <a target='_blank' href="https://github.com/Serverless-Devs/Serverless-Devs/fork" rel="noopener norefferrer" >
                    <div className="fork">
                      <img src="/img/github_fork.png" />
                      <span className="type">Fork</span>
                      <span className="line"></span>
                      <span className="count">{gitdata.forks || 0}</span>
                    </div>
                  </a>
                </div>
                <div className="version-note">
                  <a target='_blank' href="https://github.com/Serverless-Devs/Serverless-Devs/releases/tag/2.0.82" rel="noopener norefferrer" >{currentRelease.name || ''}</a>
                </div>
                <div className="release-data">Released on {currentRelease.published_at ? moment(currentRelease.published_at).format('YYYY-MM-DD HH:mm') : ''}</div>
              </div>
              <img src={'https://img.alicdn.com/imgextra/i4/O1CN01LjoHqF1iw3UUB2okX_!!6000000004476-2-tps-1820-1182.png'} className="s-terminal s-img" />
              <img src={'https://img.alicdn.com/imgextra/i3/O1CN01JTrbzu1xLcDSTdapL_!!6000000006427-2-tps-2700-1830.png'} className="s-desktop s-img" />
            </div>
          </div>
        </section>
        <section className="use-section">
          <div className="use-body">
            <h2>Serverless Devs</h2>
            <h3>一款可以在Serverless应用全生命周期发挥作用的开发者工具</h3>
            <div className="feature-container">
              <div className="feature-item">
                <div className="feature-tile">
                  100+
                </div>
                <div className="feature-intro">
                  应用/组件
                </div>
                <div className="feature-intro-detail">
                  人工智能，音视频处理，图文处理，大数据
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-tile">
                  30+
                </div>
                <div className="feature-intro">
                  web框架支持
                </div>
                <div className="feature-intro-detail">
                  Express,Koa,Egg,Next,Nuxt,Web.py,django等
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-tile">
                  7
                </div>
                <div className="feature-intro">
                  场景应用模板
                </div>
                <div className="feature-intro-detail">
                  博客，个人/企业建站，论坛&社交，电子商务，问答知识服务，内容管理
                </div>
              </div>

            </div>
            <div className="quick-start">
              <Button type="primary" link={`developer/index.html`}>快速开始</Button>
            </div>
          </div>
        </section>
        <section className="introduction-section">
          <div className="intro-container">
          </div>
          <div className="introduction-body">
            <div className="introduction">
              <h3>{dataSource.feature.feature1.title}</h3>
              <p>{dataSource.feature.feature1.desc}</p>
            </div>
            <img src={dataSource.feature.feature1.img} />
          </div>
        </section>
        <section className="introduction-section deep-color">
          <div className="intro-container">
          </div>
          <div className="introduction-body">
            <img src={dataSource.feature.feature2.img} />
            <div className="introduction">
              <h3>{dataSource.feature.feature2.title}</h3>
              <p>{dataSource.feature.feature2.desc}</p>
            </div>
          </div>
        </section>
        <section className="introduction-section">
          <div className="intro-container">
          </div>
          <div className="introduction-body">
            <div className="introduction">
              <h3>{dataSource.feature.feature3.title}</h3>
              <p>{dataSource.feature.feature3.desc}</p>
            </div>
            <img src={dataSource.feature.feature3.img} />
          </div>
        </section>
        {/* <section className="feature-section">
          <h3>{dataSource.features.title}</h3>
          <ul>
            {
              dataSource.features.list.map((feature, i) => (
                <Item feature={feature} key={i} />
              ))
            }
          </ul>
        </section>
        <section className="start-section">
          <div className="start-body">
            <div className="left-part">
              <h3>{dataSource.start.title}</h3>
              <p>{dataSource.start.desc}</p>
              <a href={getLink(dataSource.start.button.link)} target={dataSource.start.button.link || '_self'}>{dataSource.start.button.text}</a>
            </div>
            <div className="right-part"><img src={getLink('/img/quick_start.png')} /></div>
          </div>
        </section> */}
        <section className="introduction-section deep-color">
          <div className="contributors-section ">
            <a href={`/${language}/docs/contributor/overview.html`} target="_blank">
              <div className="left">
                <div className="left-header">
                  <span>{dataSource.contributors.title}</span>
                  <a href="javascript:void(0)" className="right-arrow" />
                </div>
                <div className="description">
                  {
                    dataSource.contributors.desc.map((item, i) => (
                      <div className="desc-item">
                        <span className="header">{item.header}</span>
                        <span className="text">{item.text}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </a>
            <div className="right">
              {
                contributors.map((contributor, i) => (
                  <a href={contributor.url} key={contributor.node_id} target="_blank">
                    <div className="contributor-item">
                      <img src={getLink(contributor.avatar_url)} />
                      <span>{contributor.login}</span>
                    </div>
                  </a>
                ))
              }
            </div>
          </div>
        </section>
        <Footer logo="/img/dubbo_gray.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Home />, document.getElementById('root'));

export default Home;

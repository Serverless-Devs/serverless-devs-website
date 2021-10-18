import React from 'react';
import ReactDOM from 'react-dom';
import { getScrollTop, getLink } from '../../../utils';
import { getKvRequest, getServerlessApi } from '../../../utils/request';
import Header from '../../components/header';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
import Item from './featureItem';
import productConfig from '../../../site_config/product';

import './index.scss';

class Products extends Language {

    constructor(props) {
        super(props);
        this.state = {
            headerType: 'primary',
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
        const kvStoreData = await getKvRequest('/user.json'); // 获取kv 的动态数据
        console.log(kvStoreData);

        const serverlessData = await getServerlessRequest('/apis'); // 获取函数接口 的动态数据
        console.log(serverlessData);


    }



    render() {
        const language = this.getLanguage();
        const dataSource = productConfig[language];
        const { headerType } = this.state;
        const headerLogo = headerType === 'primary' ? '/img/sdLogo.png' : '/img/sdLogoblack.png';
        return (
            <div className="product-page">
                <section className="top-section" style={{ backgroundImage: 'url(../../../img/background.png)' }}>
                    <Header
                        currentKey="products"
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
                            </div>
                        </div>
                    </div>
                    {/* <div className="animation animation1" />
          <div className="animation animation2" />
          <div className="animation animation3" />
          <div className="animation animation4" />
          <div className="animation animation5" /> */}
                </section>

                <section className="introduction-section">
                    <div className="intro-container">
                    </div>
                    <div className="introduction-body">
                        <div className="introduction">
                            <h3>Serverless Hub</h3>
                            <p style={{ color: '#0b214a' }}>提供丰富海量的Serverless应用模板，包括博客，个人建站，论坛&社交，电子商务，问答知识服务，内容管理等多个业务场景</p>
                            <p>开发者可以访问 Serverless Hub 查询收藏适合自己业务的应用模板，并利用我们配套的开发者工具进行下载使用</p>
                            <div style={{ marginTop: 20 }}>
                                <Button type="primary" >访问详情</Button>
                            </div>
                        </div>
                        <img src={'https://img.alicdn.com/imgextra/i4/O1CN01NQjt1J1ciQ0FwzLHJ_!!6000000003634-2-tps-2562-1736.png'} />
                    </div>
                </section>
                <section className="introduction-section deep-color">
                    <div className="intro-container">
                    </div>
                    <div className="introduction-body">

                        <div style={{ height: 500, position: 'relative' }} className="introduction">
                            <img src={'https://img.alicdn.com/imgextra/i4/O1CN01DhnWI328dtnjNBZKw_!!6000000007956-2-tps-2700-1830.png'} className="ab ab-1" />
                            <img src={'https://img.alicdn.com/imgextra/i1/O1CN01iGkko01HgwnmQFW4l_!!6000000000788-2-tps-2700-1830.png'} className="ab ab-2" />
                        </div>
                        <div className="introduction">
                            <h3 style={{ color: '#0b214a' }}>ServerlessDesktop</h3>
                            <p style={{ color: '#0b214a' }}>在桌面上构建Serverless 应用的最佳实践</p>
                            <p>使用ServerlessDesktop 可以快速创建本地的Serverless应用，我们提供了配置可视化的方案，您可以选择通过可视化表单阅读具体的配置文档，也可以选择直接
                            操作配置文件的内容。ServerlessDesktop 将整个Serverless应用的生命周期进行了很好的托管，包括应用创建，发布构建，压测，端云调试，可视化观测等
                            </p>
                            <div style={{ marginTop: 20 }}>
                                <div style={{ marginRight: 12, display: 'inline' }}>
                                    <Button type="primary" >mac版下载</Button>
                                </div>
                                <Button type="primary" >windows版本下载</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="introduction-section">
                    <div className="intro-container">
                    </div>
                    <div className="introduction-body">
                        <div className="introduction">
                            <h3>Serverless Devs Cli</h3>
                            <p style={{ color: '#0b214a' }}>精巧的命令行客户端，可通过 <span style={{ backgroundColor: '#000', color: '#fff', paddingLeft: 8, paddingRight: 8 }}>npm install -g @serverless-devs/s</span> 获取</p>
                            <p>Serverless Devs Cli 以获取，操作简便，更易于集成，除了可以使用它进行应用和组件的初始化工作，部署工作。也可以把它作为完整的持续集成核心逻辑加入到你的CICD流程中
                            </p>
                        </div>
                        <img src={'https://img.alicdn.com/imgextra/i3/O1CN01R4XP0X1mPJdsKIwsk_!!6000000004946-2-tps-743-573.png'} />
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
                {/* <section className="users-section">
                    <h3>{dataSource.users.title}</h3>
                    <p>{dataSource.users.desc}</p>
                    <div className="users">
                        {
                            dataSource.users.list.map((user, i) => (
                                <img src={getLink(user)} key={i} />
                            ))
                        }
                    </div>
                </section> */}
                <Footer logo="/img/sdLogoblack.png" language={language} />
            </div>
        );
    }
}

document.getElementById('root') && ReactDOM.render(<Products />, document.getElementById('root'));

export default Products;

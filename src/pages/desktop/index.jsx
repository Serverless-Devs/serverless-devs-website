import React from 'react';
import ReactDOM from 'react-dom';
import { getScrollTop, getLink } from '../../../utils';
import { getKvRequest, getServerlessApi } from '../../../utils/request';
import Header from '../../components/header';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
// import Item from './featureItem';
import desktopConfig from '../../../site_config/desktop';

import './index.scss';

class Desktop extends Language {

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


        // const kvStoreData = await getKvRequest('/user.json'); // 获取kv 的动态数据
        // console.log(kvStoreData);

        // const serverlessData = await getServerlessRequest('/apis'); // 获取函数接口 的动态数据
        // console.log(serverlessData);


    }



    render() {
        const language = this.getLanguage();
        const dataSource = desktopConfig[language];
        const { headerType } = this.state;
        const headerLogo = '/img/sdLogoblack.png';
        return (
            <div className="desktop-page">
                <section className="top-section" style={{ backgroundImage: 'none' }}>
                    <Header
                        currentKey="home"
                        type={headerType}
                        logo={headerLogo}
                        language={language}
                        onLanguageChange={this.onLanguageChange}
                    />
                    <div className="vertical-middle">
                        <div className="product-name">
                            <h2>{dataSource.brand.brandName}</h2>
                        </div>
                        <p className="product-desc">{dataSource.brand.briefIntroduction}</p>
                        <div className="button-area">
                            {
                                dataSource.brand.buttons.map(b => <Button type={b.type} key={b.link} link={b.link} target={b.target}>{b.text}</Button>)
                            }
                        </div>
                    </div>
                </section>
                <section className="introduction-section">
                    <div className="introduction-body">
                        <div className="introduction">
                            <h3>应用中心内容更加丰富</h3>
                            <p>增加JAMStack ，SSR等应用场景，拥有30+ web框架</p>
                        </div>
                        <div style={{ height: 500, position: 'relative' }} className="introduction">
                            <img src={'https://img.alicdn.com/imgextra/i4/O1CN01Zy065m215Md0DSZJI_!!6000000006933-2-tps-2336-1830.png'} className="ab ab-1" />
                            <img src={'https://img.alicdn.com/imgextra/i4/O1CN01Cj0YWW1igU1sCeJAN_!!6000000004442-2-tps-2336-1830.png'} className="ab ab-2" />
                        </div>
                    </div>
                </section>
                <section className="introduction-section">
                    <div className="introduction-body">
                        <div style={{ height: 500, position: 'relative' }} className="introduction">
                            <img src={'https://img.alicdn.com/imgextra/i1/O1CN01HOwcEw1PvcQ2xPhNp_!!6000000001903-2-tps-2336-1830.png'} className="ab ab-1" />
                            <img src={'https://img.alicdn.com/imgextra/i2/O1CN01NE4F9J1dzeWesXqsR_!!6000000003807-2-tps-2336-1830.png'} className="ab ab-2" />
                        </div>
                        <div className="introduction">
                            <h3>全新的配置可视化能力</h3>
                            <p>配置可视化能力全新视觉来袭，可视化和代码编辑互通</p>
                        </div>

                    </div>
                </section>
                <section className="introduction-section">
                    <div className="introduction-body">
                        <div className="introduction">
                            <h3>企业级的工作空间服务</h3>
                            <p>提供项目管理，配置可视化，可观测，端云调试，压测等全方位服务</p>
                        </div>
                        <div style={{ height: 500, position: 'relative' }} className="introduction">
                            <img src={'https://img.alicdn.com/imgextra/i4/O1CN01gLubwK1QrKK369rLk_!!6000000002029-2-tps-2336-1830.png'} className="ab ab-1" />
                            <img src={'https://img.alicdn.com/imgextra/i3/O1CN01KmIhgn1XxSwJERzuT_!!6000000002990-2-tps-2336-1830.png'} className="ab ab-2" />
                        </div>
                    </div>
                </section>

                <Footer logo="/img/dubbo_gray.png" language={language} />
            </div>
        );
    }
}

document.getElementById('root') && ReactDOM.render(<Desktop />, document.getElementById('root'));

export default Desktop;

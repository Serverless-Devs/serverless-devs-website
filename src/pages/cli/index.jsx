import React from 'react';
import ReactDOM from 'react-dom';
import { getScrollTop, getLink } from '../../../utils';
import { getKvRequest, getServerlessApi } from '../../../utils/request';
import Header from '../../components/header';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
import Item from './featureItem';
import desktopConfig from '../../../site_config/desktop';

import './index.scss';

class Cli extends Language {

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
                            <h2>Serverless Devs Cli</h2>
                        </div>
                        <p className="product-desc">轻便的交互式命令行工具，帮助您快速获得Serverless应用</p>
                        <div className="button-area">
                            <div style={{ color: 'white', backgroundColor: 'black', width: 300, margin: '0 auto', borderRadius: '5px' }}>npm install -g @serverless-devs/s</div>
                        </div>
                    </div>
                </section>
                <section className="introduction-section">
                    <div className="introduction-body">
                        <div className="introduction">
                            <h3>精简的指令集，极速的使用体验</h3>
                            <p>核心指令只保留 config,init,cli,set,exec 便于记忆，优化执行效率节省200%时间</p>
                        </div>
                        <div style={{ height: 500, position: 'relative' }} className="introduction">
                            <img src={'https://img.alicdn.com/imgextra/i3/O1CN01gbK44t1iYEtnH85ZI_!!6000000004424-2-tps-1640-976.png'} className="ab ab-1" />
                            <img src={'https://img.alicdn.com/imgextra/i3/O1CN01AZFzvH1wwQQzzreZw_!!6000000006372-2-tps-1660-1022.png'} className="ab ab-2" />
                        </div>
                    </div>
                </section>
                <section className="introduction-section">
                    <div className="introduction-body">
                        <div style={{ height: 500, position: 'relative' }} className="introduction">
                            <img src={'https://img.alicdn.com/imgextra/i1/O1CN01kbAfY01ObB7sBIGLN_!!6000000001723-2-tps-1698-1008.png'} className="ab ab-1" />
                            <img src={'https://img.alicdn.com/imgextra/i4/O1CN01u5HJdN1ar0CUDloWt_!!6000000003382-2-tps-2180-1110.png'} className="ab ab-2" />
                        </div>
                        <div className="introduction">
                            <h3>灵活的无配置指令cli</h3>
                            <p>无配置执行指令可以配合做应用集成测试等能力</p>
                        </div>

                    </div>
                </section>
                <section className="introduction-section">
                    <div className="introduction-body">
                        <div className="introduction">
                            <h3>开放的源设计方案</h3>
                            <p>打破应用的数据来源单一的问题，通过Registry 您可以用有自己的Serverless Hub</p>
                        </div>
                        <div style={{ height: 500, position: 'relative' }} className="introduction">
                            <img src={'https://img.alicdn.com/imgextra/i1/O1CN01XZnrwZ1d6EbPtpUPp_!!6000000003686-2-tps-1598-1006.png'} className="ab ab-1" />
                            <img src={'https://img.alicdn.com/imgextra/i4/O1CN01hhGuro1zvSRkhUnC1_!!6000000006776-2-tps-1640-1038.png'} className="ab ab-2" />
                        </div>
                    </div>
                </section>

                <Footer logo="/img/dubbo_gray.png" language={language} />
            </div>
        );
    }
}

document.getElementById('root') && ReactDOM.render(<Cli />, document.getElementById('root'));

export default Cli;

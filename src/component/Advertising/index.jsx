import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Link } from 'react-router-dom';
import AdNav from './adNav.jsx';
import { withRouter } from 'react-router-dom';
import '../../assets/css/ad.scss';

class AD extends Component {
    //发布广告
    toRelease = () => {
        this.props.history.push({ pathname: '/ad/release' })
    };
    //广告列表
    toAdList = () => {
        this.props.history.push({ pathname: '/ad/adList' })
    };
    //我的发布
    toMyRelease = () => {
        this.props.history.push({ pathname: '/ad/myAdList' })
    };
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <span>广告</span>
        </span>;
        const clickTo = [this.toRelease, this.toAdList, this.toMyRelease];
        return (
            <div>
                <Page className="article" title="广告" subTitle={bread}>
                    <AdNav clickTo = {clickTo} />
                </Page>
            </div>
        )
    }
}
export default withRouter(AD);

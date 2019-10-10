import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import PoolSwitch from './switch.jsx';
import PoolOthersEdit from './othersEdit.jsx';
import { GetPoolInfo } from '../../http/http.jsx';
import { GetCookie } from '../../assets/js/common.jsx';
import { GetGroupId } from '../../assets/js/getGroupId.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import {Link} from 'react-router-dom';

export default class PoolSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolInfo: {},
            group_id:'',
            loadingShow: false,
        }
    }

    componentDidMount(){
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        this.setState(() => ({poolInfo}))
    }

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <span>矿池设置</span>
        </span>;
        return (
            <div>
                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow} />
                        : ''
                }
                <Page className="article" title="矿池设置" subTitle={bread} >
                    <PoolOthersEdit poolInfo={this.state.poolInfo} />
                    <PoolSwitch poolInfo={this.state.poolInfo} />
                </Page>
            </div>
        )
    }
}

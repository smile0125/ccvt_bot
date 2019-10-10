import React, {Component} from 'react';
import {GetInfoBase} from '../../http/http.jsx';
import {GetCookie, SetCookie} from '../../assets/js/common.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import {withRouter} from 'react-router-dom';
import InfoHeader from './infoHeader.jsx';
import InfoBody from './infoBody.jsx';

class HomeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info_base: {},
            loadingShow: false,
            showTopTips: false,
            topTipTimer: null,
            toptipType: 'primary',
            text: '提交成功'
        }
    }

    componentDidMount() {
        const token = GetCookie('token');
        this.setState({token: token});
        this.GetInfoBaseFun();
    }

    GetInfoBaseFun = () => {
        const params = {token: GetCookie('token')};
        // console.log(params);
        GetInfoBase(params).then(res => {
            let data = res.data;
            if (data.errcode == 0) {
                let rows = data.rows;
                SetCookie('application_group', rows.application_group);
                SetCookie('us_id', rows.us_id);
                SetCookie('group_name', rows.group_name);
                SetCookie('rows', JSON.stringify(rows));
                this.setState({
                    info_base: rows
                })
            } else if (data.errcode == '120') {
                const url = window.location.href;
                window.location.href = `http://wx.fnying.com/ahino/index_login.php?url=${encodeURIComponent(url)}`;
                throw new Error('Fail:Terminate the front-end program and jump to WeChat login');
            }
        });
    };

    stopTopTips() {
        this.state.topTipTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.state.topTipTimer);
    }

    //进入内页
    toInnerPage = (pathname) => {
        this.props.history.push({pathname: pathname})
    };


    setWeChat = () => {
        const wechat = this.state.info_base.wechat;
        this.props.history.push({pathname: '/setWeChatName', query: {wechat: wechat}})
    };

    render() {
        return (
            <div>
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow}/>
                        : ''
                }
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips}>{this.state.text}</TopTip>
                        : ''
                }
                <InfoHeader setWeChat={this.setWeChat} info={this.state.info_base}/>
                <InfoBody toInnerPage={this.toInnerPage} info={this.state.info_base}/>
            </div>
        )
    }
}

export default withRouter(HomeInfo);
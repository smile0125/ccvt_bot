import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Link} from 'react-router-dom';
import {AllAdList, AdSwitch} from '../../http/http.jsx';
import {GetCookie} from '../../assets/js/common.jsx';
import AdListUi from './adListUi.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import '../../assets/css/adList.scss';

export default class AdListClass extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            limit: 100,
            offset: 0,
            rows: [],
            showIOS2: false,
            timer_id: '',
            is_close: '',
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }

    componentDidMount() {
        this.getAdListFun();
    }


    //获取广告列表
    getAdListFun = () => {
        const token = GetCookie('token');
        const is_audit = '';
        const {limit, offset} = this.state;
        const params = {token, is_audit, limit, offset};
        AllAdList(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = data.rows;
                this.setState({rows: rows});
            }
        })
    };

    //开关广告
    adSwitchFun = () => {
        const token = GetCookie('token');
        let {timer_id, is_close} = this.state;
        if (is_close == 1) {
            is_close = 2
        } else {
            is_close = 1
        }
        const params = {token, timer_id, is_close};
        console.log(params)
        AdSwitch(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                this.getAdListFun();
                this.setState({showIOS2: false, toptipType: 'primary', showTopTips: true, text: `提交成功`});
            } else {
                this.setState({showIOS2: false, toptipType: 'warn', showTopTips: true, text: `提交失败`});
            }

            this.stopTopTips();
        })
    };

    //开关按钮
    swithchToggle = (timer_id, is_close) => {
        if (is_close == 1) {
            this.setState({showIOS2: true, timer_id: timer_id, is_close: is_close})
        } else if (is_close == 2) {
            this.setState({timer_id: timer_id, is_close: is_close}, () => {
                this.adSwitchFun();
            })
        } else {
            this.setState({showIOS2: false})
        }
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer)
    }

    render() {
        const rows = this.state.rows;
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/ad' className='hight_color'>广告</Link>&nbsp;|&nbsp;
            <span>广告列表</span>
        </span>;
        return (
            <div>
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                <Page className="article" title="广告列表" subTitle={bread}>
                    <AdListUi rows={rows} swithchToggle={this.swithchToggle} showIOS2={this.state.showIOS2}
                              adSwitchFun={this.adSwitchFun}/>
                </Page>
            </div>
        )
    }
}

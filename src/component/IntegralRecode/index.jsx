import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Link} from 'react-router-dom';
import {Button, ButtonArea} from 'react-weui';
import {GetCookie, Throttling} from '../../assets/js/common.jsx';
import {GetRecode} from '../../http/http.jsx';
import RecodeItem from './recodeItem.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import ScrollData from '../../assets/js/scrollData.jsx';

class IntegralRecode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: '',
            loadingShow: true,
            scale: '',
            limit: 50,
            offset: 0,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: '',
            timer: null
        };
    }

    componentDidMount() {
        this.getRecodeFun();
        const rows = JSON.parse(GetCookie('rows'));
        this.setState({scale: rows.scale})
    }

    //监听滚动距离，如果滚动到底部，加载更多数据；
    handleScroll = Throttling(() => {
        const is_bottom = ScrollData();
        if (is_bottom) {
            this.handleVisit();
        }
    },2000);

    //滚动加载数据
    handleVisit = () => {
        const {items, total, limit, offset} = this.state;
        if (items.length <= 0) {
            this.getRecodeFun();
        } else if (items.length < total) {
            this.setState({loadingShow: true, offset: offset + limit}, () => this.getRecodeFun())
        } else {
            this.setState({showTopTips: true, toptipType: 'warn', text: '暂无更多数据'});
            this.stopTopTips();
        }
    };

    //获取记录
    getRecodeFun = () => {
        let params = {
            token: GetCookie('token'),
            limit: this.state.limit,
            offset: this.state.offset,
        };

        GetRecode(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = data.rows;
                let items = this.state.items;
                items = items.concat(rows);
                this.setState({loadingShow: false, items: items, total: data.total})
            } else {
                this.setState({loadingShow: false});
            }
        })
    };

    //充值
    toRecharge = () => {
        window.open('https://ccvt.io/h5/ba/ba_recharge_address.html');
    };
    //提现
    toWithdraw = () => {
        window.open('https://ccvt.io/h5/ba/ba_withdraw.html');
    };
    //转账
    toTransfer = () => {
        window.open('https://ccvt.io/h5/user/transfer.html');
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
        clearTimeout(this.state.timer);
    }


    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <span>账户积分变动记录</span>
        </span>;
        return (
            <div id='integralRecode'
                 onScroll={this.handleScroll}>
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow}/>
                        : ''
                }
                <Page className="article" title="账户积分变动记录" subTitle={bread}>
                    <ButtonArea direction="horizontal">
                        <Button size='small' plain onClick={this.toRecharge}>充值</Button>
                        {
                            this.state.scale >= 2 ?
                                <Button size='small' plain onClick={this.toWithdraw}>提现</Button>
                                : ''
                        }

                        {
                            this.state.scale >= 2 ?
                                <Button size='small' plain onClick={this.toTransfer}>转账</Button>
                                : ''
                        }
                    </ButtonArea>
                    <RecodeItem getRecodeFun={this.getRecodeFun} items={this.state.items}/>
                </Page>
            </div>
        )
    }
}

export default (IntegralRecode)
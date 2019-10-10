import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Link } from 'react-router-dom';
import { GetCookie } from '../../assets/js/common.jsx';
import { Toast, Article } from 'react-weui';
import { InviteRecode } from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import copy from 'copy-to-clipboard';
import SuccessInvite from './successInvite.jsx';
import InviteRecodeClass from './inviteRecode.jsx';
import GenerateInviteImg from './generateInviteImg.jsx';
import InfiniteLoader from 'react-infinite-loader';
import '../../assets/css/invite.scss';



export default class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 50,
            offset: 0,
            list: [],
            invite_link: `http://bot.fnying.com/#/?invite_code=""&state=1`,
            showToast: false,
            toastTimer: null,
            invite_count: '',
            invite_send_money: '',
            canvas_src: '',
            loadingShow: true,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: '',
        }
    }
    componentDidMount() {
        const rows = JSON.parse(GetCookie('rows'));
        this.getInviteRecode();
        const invite_count = rows.invite_count;
        const invite_send_money = rows.invite_send_money;
        const us_nm = rows.us_nm;
        this.setState({
            invite_count: invite_count,
            invite_send_money: invite_send_money,
            invite_link: `http://bot.fnying.com/#/?invite_code=${us_nm}&state=1`
        })
    }
    //复制链接
    copyInviteLink = () => {
        copy(this.state.invite_link);
        this.setState({ showToast: true });
        this.state.toastTimer = setTimeout(() => {
            this.setState({ showToast: false });
        }, 2000);
    };

    handleVisit = () => {
        const { list, total, limit, offset } = this.state;
        if (list.length < total) {
            this.setState({ loadingShow: true, offset: offset + limit }, () => this.getInviteRecode())
        } else {
            this.setState({ showTopTips: true, toptipType: 'warn', text: '暂无更多数据' });
            this.stopTopTips();
        }
    };

    //获取邀请记录
    getInviteRecode = () => {
        const { limit, offset } = this.state;
        const params = {
            token: GetCookie('token'),
            limit: limit,
            offset: offset,
        };
        InviteRecode(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = data.rows;
                let list = this.state.list;
                list = list.concat(rows);
                this.setState({ loadingShow: false, list: list, total: data.total });
            }
        })
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
        clearTimeout(this.state.toastTimer);
    }
    render() {
        const { invite_count, invite_send_money, invite_link, list } = this.state;
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <span>邀请有礼</span>
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
                {this.state.showToast ?
                    <Toast icon="success-no-circle" show={this.state.showToast}>复制成功</Toast>
                    : ''
                }
                <Page className="article" title="邀请有礼" subTitle={bread}>
                    <Article>
                        <SuccessInvite invite_count={invite_count} invite_send_money={invite_send_money} invite_link={invite_link} copyInviteLink={this.copyInviteLink} />

                        <GenerateInviteImg invite_link={invite_link} />

                        <InviteRecodeClass list={list} />
                        <InfiniteLoader onVisited={() => this.handleVisit()} />
                    </Article>
                </Page>

            </div>
        )
    }
}

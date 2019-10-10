import React, {Component, Fragment} from 'react';
import Page from '../../assets/js/page.jsx';
import {Link} from "react-router-dom";
import {GetQueryString, SetCookie, GetCookie} from '../../assets/js/common.jsx';
import {
    Article, Popup, Panel, PanelHeader, PanelBody, PanelFooter, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
} from 'react-weui';
import {AdInfoClick, RedEnvelopeInfo, GetInfoBase} from '../../http/http.jsx';
import RedEnvelope from './redEnvelope.jsx';
import MyRedEnvelope from './myRedEnvelope.jsx';
import '../../assets/css/adInfo.scss';

export default class AdInfo extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            adItem: {},
            adver_id: '',
            bonus_amount: 0,
            fullpage_show: false,
            redEnvelopeList: [],
            redEnvelopeInfo: {},
            showMyRedEnvelope: false,//显示我的红包
            info: {}
        }
    }

    componentDidMount() {
        this.GetInfoBaseFun();
        const search = this.props.location.search;
        const adver_id = GetQueryString(search, 'adver_id');
        if (adver_id) {
            this.setState({adver_id: adver_id}, () => {
                this.getAdDetailFun();
            });
        } else if (this.props.location.state) {
            const {item} = this.props.location.state;
            SetCookie('adItem', JSON.stringify(item));
            this.setState({adItem: item, adver_id: item.id})
        } else {
            const adItemCookie = JSON.parse(GetCookie('adItem'));
            this.setState({adItem: adItemCookie, adver_id: adItemCookie.id});
        }
    }

    //获取个人信息
    GetInfoBaseFun = () => {
        const params = {token: GetCookie('token')};
        GetInfoBase(params).then(res => {
            const info = res.data.rows;
            this.setState({info: info}, () => {
            });
            SetCookie('rows', info);
        });
    };


    //获取广告详情
    getAdDetailFun = () => {
        const adver_id = this.state.adver_id;
        const token = GetCookie('token');
        const params = {token, adver_id};
        AdInfoClick(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                this.RedEnvelopeInfoFun();
                const item = data.row;
                const bonus_amount = item.bonus_amount;
                const history_bonus_amount = item.history_bonus_amount;
                const past_due = item.past_due;
                if (past_due == 2) {//广告过期了，不弹出红包
                    this.setState({showMyRedEnvelope: false, fullpage_show: false})
                } else if (bonus_amount == 0 && history_bonus_amount > 0) {//同一条新闻，已经获得过红包，直接显示列表
                    this.setState({fullpage_show: true, showMyRedEnvelope: false})
                } else {//第一次获得红包或者未获得红包手慢了
                    this.setState({bonus_amount: bonus_amount, showMyRedEnvelope: true})
                }
                this.setState({adItem: item});
            }
        })
    };

    //关闭我的红包
    closeMyRedEnvelope = () => {
        this.setState({showMyRedEnvelope: false})
    };

    //获取红包记录
    RedEnvelopeInfoFun = () => {
        const params = {
            token: GetCookie('token'),
            adver_id: this.state.adver_id
        };
        RedEnvelopeInfo(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const item = {
                    'bonus_amount': data.rows.bonus_amount,
                    'daily_award_amount': data.rows.daily_award_amount,
                    'give_count': data.rows.give_count,
                    'send_count': data.rows.send_count,
                    'all_count': data.rows.all_count,
                };
                this.setState({redEnvelopeList: data.rows.list, redEnvelopeInfo: item})
            }
        })
    };

    //红包详情
    showRedEnvelope = () => {
        if (!this.state.fullpage_show) {
            this.RedEnvelopeInfoFun();
        }
        this.setState({fullpage_show: !this.state.fullpage_show, showMyRedEnvelope: false});
    };

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/ad' className='hight_color'>广告</Link>&nbsp;|&nbsp;
            <Link to='/ad/myAdList' className='hight_color'>我的发布</Link>&nbsp;|&nbsp;
            <span>广告详情</span>
        </span>;

        const {content, tx_content, head_img, wechat,all_browse_count,all_us_browse_count} = this.state.adItem;
        const {redEnvelopeList, redEnvelopeInfo, fullpage_show, info, showMyRedEnvelope, bonus_amount} = this.state;
        let _src = '';
        if (tx_content) {
            let _tx_content = tx_content.split('.');
            _src = _tx_content[_tx_content.length - 1];
        }
        return (
            <Fragment>
                {
                    showMyRedEnvelope ? <MyRedEnvelope
                        head_img={head_img}
                        wechat={wechat}
                        bonus_amount={bonus_amount}
                        closeMyRedEnvelope={this.closeMyRedEnvelope}
                        showRedEnvelope={this.showRedEnvelope}/> : ''
                }

                <RedEnvelope info={info} redEnvelopeList={redEnvelopeList} adItem={redEnvelopeInfo}
                             fullpage_show={fullpage_show}
                             showRedEnvelope={this.showRedEnvelope}/>
                <Page className="article adInfoBox" title="广告详情" subTitle={bread}>
                    <Article className='adInfoBox_content'>
                        {/*<h1>H1 Heading</h1>*/}
                        <section>
                            <div className='browser_box'>
                                <div>
                                    <p>[浏览量] {all_browse_count}次</p>
                                    <p>[用户量] {all_us_browse_count}个</p>
                                </div>
                                {
                                    this.state.adItem.is_audit == 2 || this.state.adItem.is_audit == 5 ?
                                        <h2 className="title" onClick={this.showRedEnvelope}>【红包详情】</h2> : ''
                                }
                            </div>

                            <section>
                                <p>{content}</p>
                                {
                                    _src == ('jpg' || 'png' || 'gif' || 'jpeg') ?
                                        <img src={`${tx_content}`} alt=""/>
                                        :
                                        <p>
                                            广告链接：
                                            <a className='hight_color' href={`${tx_content}`}>{tx_content}</a>
                                        </p>
                                }

                                {/*<div className='adInfoBox_footer'>*/}
                                {/*<h3>发送周期：{cycle} 天</h3>*/}
                                {/*<h3>发送时间：{time}</h3>*/}
                                {/*</div>*/}
                            </section>
                        </section>
                    </Article>
                </Page>
            </Fragment>
        )
    }
}

import React, { Component } from 'react'
import { SetCookie, GetCookie, DelCookie } from '../../assets/js/common.jsx';
import Page from '../../assets/js/page.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { Link } from 'react-router-dom';
import { GiveLike, GiveLikeCeil } from '../../http/http.jsx';
import { Form, FormCell, CellHeader, Label, CellBody, Input, ButtonArea, Button, CellsTitle, CellsTips } from 'react-weui';

export default class ZanCai extends Component {
    constructor(props) {
        super(props)
        this.state = {
            us_id: '',
            wechat: '',
            type: '',
            give_num: '',
            all_cai: 0,
            all_zan: 0,
            max_give_like: 10000,
            max_give_no_like: 10000,
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentWillMount() {
        this.giveLikeCEiling();
        if (this.props.location.query) {
            const us_id = this.props.location.query.us_id;
            const wechat = this.props.location.query.wechat;
            const type = this.props.location.query.type;
            this.setState({ us_id: us_id, wechat: wechat, type: type });
            SetCookie('give_us_id', us_id);
            SetCookie('wechat', wechat);
            SetCookie('type', type);
        } else {
            this.setState({ us_id: GetCookie('give_us_id'), wechat: GetCookie('wechat'), type: GetCookie('type') })
        }
    }

    //获取赞踩上限
    giveLikeCEiling = () => {
        const params = { token: GetCookie('token') };
        GiveLikeCeil(params, res => {
            if (res.errcode == 0) {
                const { all_cai, all_zan, max_give_like, max_give_no_like } = res.rows;
                this.setState({ all_cai: all_cai, all_zan: all_zan, max_give_like: max_give_like, max_give_no_like: max_give_no_like })
            }
        }, res => {
            console.log(res);
        })
    }
    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer)
        DelCookie('give_us_id');
        DelCookie('wechat');
        DelCookie('type');
    }
    //输入数量
    giveNumChang = (e) => {
        this.setState({ give_num: e.target.value });
    }
    //提交点赞/砸踩数量
    giveLikeClick = () => {
        let state = '';
        if (this.state.type == '点赞') {
            state = 1
        } else {
            state = 2
        }
        const params = {
            token: GetCookie('token'),
            give_us_id: this.state.us_id,
            give_num: this.state.give_num,
            state: state
        }
        this.setState({ loadingShow: true });
        GiveLike(params, res => {
            if (res.errcode == 0) {
                this.giveLikeCEiling();
                this.setState({ loadingShow: false, toptipType: 'primary', showTopTips: true, text: '成功' });
                this.stopTopTips();
            }
        }, res => {
            this.setState({ loadingShow: false, toptipType: 'warn', showTopTips: true, text: `失败 ${res.errmsg}` });
            this.stopTopTips();
        });
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/leaderBoard' className='hight_color'>荣耀榜</Link>&nbsp;|&nbsp;
            <span>{this.state.type}</span>
        </span>
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
                <Page className="article" title="荣耀榜" subTitle={bread} >
                    <CellsTitle>为{this.state.wechat}{this.state.type}</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>{this.state.type}</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" value={this.state.give_num} onChange={this.giveNumChang} placeholder="请输入数量" />
                            </CellBody>
                        </FormCell>
                    </Form>
                    <ButtonArea>
                        <Button onClick={this.giveLikeClick}>提交</Button>
                    </ButtonArea>
                    <CellsTips>每日最高点赞 {this.state.max_give_like} CCVT</CellsTips>
                    <CellsTips>每日最高砸踩 {this.state.max_give_no_like} CCVT</CellsTips>
                    <CellsTips>已点赞 {this.state.all_zan} CCVT</CellsTips>
                    <CellsTips>已砸踩 {this.state.all_cai} CCVT</CellsTips>
                </Page>

            </div>
        )
    }
}

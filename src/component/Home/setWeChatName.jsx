import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Form, FormCell, CellHeader, Label, Input, CellBody, Button } from 'react-weui';
import { ModifyBindWeChat } from '../../http/http.jsx';
import { GetCookie } from '../../assets/js/common.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import {Link} from 'react-router-dom';

export default class SetAccountName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wechat: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentWillMount() {
        if (this.props.location.query) {
            const wechat = this.props.location.query.wechat;
            this.setState({ wechat: wechat });
        }
    }
    
    wechatChange = (e) => {
        this.setState({ wechat: e.target.value });
    }
    wechatClick = () => {
        const params = {
            token: GetCookie('token'),
            wechat: this.state.wechat
        }
        if (!this.state.wechat) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `请输入微信昵称` });
            this.stopTopTips();
            return;
        }
        this.setState({ loadingShow: true });
        ModifyBindWeChat(params, res => {
            if (res.errcode == 0) {
                this.setState({ toptipType: 'primary', showTopTips: true, text: `成功`, loadingShow: false });
                window.location.hash = '/'
            }
        }, res => {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `失败`, loadingShow: false });
        })
    }

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }
    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer)
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <span>设置微信昵称</span>
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
                <Page className="article" title="微信昵称" subTitle={bread}>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>微信昵称</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入微信昵称" value={this.state.wechat} onChange={this.wechatChange} />
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className='margin_top_1 margin_bottom_1 page_padding'>
                        <Button onClick={this.wechatClick}>提交</Button>
                    </div>
                </Page>
            </div>
        )
    }
}

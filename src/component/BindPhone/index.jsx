import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import Country from '../../assets/js/country.jsx';
import CfmCode from '../../assets/js/cfmCode.jsx';
import GetSmsCodeFun from '../../assets/js/getSmsCode.jsx';
import {WeChatLoginBindPhone} from '../../http/http.jsx';
import {GetCookie, SetCookie} from '../../assets/js/common.jsx';
import {withRouter} from 'react-router-dom';
import {Form, FormCell, CellHeader, Label, CellBody, Input, Button, CellFooter, CellsTips} from 'react-weui';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';


class BindPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country_code: '86',
            cellphone: '',
            cfm_code: '',
            sms_code: '',
            invite_code: '',
            unionid: '',
            loading: false,
            uploadCfmCode: false,
            loadingShow: false,
            loadingText: '',
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }

    componentDidMount() {
        document.title = "绑定手机-CCVT";
        const unionid = GetCookie('unionid');
        const token = GetCookie('token');
        const invite_code = GetCookie('invite_code');
        if (unionid) {
            this.setState({unionid: unionid, invite_code: invite_code});
        }
        if ((unionid && token) || !unionid) {
            window.location.href = 'http://bot.fnying.com/#/';
            console.log(unionid)
            console.log('跳转')
        }
    }

    phoneChange = (e) => {
        this.setState({cellphone: e.target.value});
    };

    getCountryCode = (code) => {
        this.setState({country_code: code});
    };

    cfmCodeChange = (e) => {
        this.setState({cfm_code: e.target.value});
    };

    smsCodeInputChange = (e) => {
        this.setState({sms_code: e.target.value});
    };

    inviteCodeChange = (e) => {
        this.setState({invite_code: e.target.value});
    };


    bindPhoneClick = () => {
        const {cellphone, country_code, sms_code, unionid, invite_code} = this.state;
        if (!cellphone) {
            this.setState({toptipType: 'warn', showTopTips: true, text: '请输入手机号码'});
            this.stopTopTips();
            return;
        }

        const params = {
            cellphone: cellphone.replace(/\s/g, ''),
            country_code: country_code,
            sms_code: sms_code,
            unionid: GetCookie('unionid') || unionid,
            invite_code: invite_code,
            group_id: GetCookie('group_id')
        };

        this.setState({loadingShow: true});

        WeChatLoginBindPhone(params, res => {
            if (res.errcode == 0) {
                this.setState({toptipType: 'primary', showTopTips: true, text: '绑定成功', loadingShow: false});
                this.stopTopTips();
                SetCookie('token', res.errmsg);
                this.props.history.push('/');
            }
        }, res => {
            this.setState({toptipType: 'warn', showTopTips: true, text: `绑定失败 ${res.errmsg}`, loadingShow: false});
            this.stopTopTips();
        });
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    render() {
        const {cellphone, cfm_code, country_code} = this.state;
        return (
            <div>
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow}/>
                        : ''
                }
                <Page className="article" title="绑定手机">
                    <Form>
                        <Country getCountryCode={this.getCountryCode}/>
                        <FormCell>
                            <CellHeader>
                                <Label>手机号码</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="输入手机号码" value={this.state.cellphone}
                                       onChange={this.phoneChange}/>
                            </CellBody>
                        </FormCell>

                        <FormCell vcode>
                            <CellHeader>
                                <Label>验证码</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="phone" value={this.state.cfm_code} onChange={this.cfmCodeChange}
                                       placeholder="请输入验证码"/>
                            </CellBody>
                            <CellFooter className='cfm_code_width'>
                                <CfmCode uploadCfmCode={this.state.uploadCfmCode}/>
                            </CellFooter>
                        </FormCell>

                        <FormCell vcode>
                            <CellHeader>
                                <Label>短信验证码</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" value={this.state.sms_code} onChange={this.smsCodeInputChange}
                                       placeholder="请输入短信验证码"/>
                            </CellBody>
                            <CellFooter>
                                <Button type="vcode">{<GetSmsCodeFun cellphone={cellphone} cfm_code={cfm_code}
                                                                     country_code={country_code}
                                                                     getSmsCallback={this.getSmsCallbackFuc}/>}</Button>
                            </CellFooter>
                        </FormCell>`
                        <FormCell>
                            <CellHeader>
                                <Label>邀请码</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" value={this.state.invite_code} onChange={this.inviteCodeChange}
                                       placeholder="输入邀请码/选填"/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className='margin_top_1 margin_bottom_1 page_padding'>
                        <Button onClick={this.bindPhoneClick}>提交</Button>
                    </div>
                    <CellsTips>友情提示：</CellsTips>
                    <CellsTips>1.首次登录请绑定手机号码</CellsTips>
                    <CellsTips>2.若已在CCVT绑定手机号，请直接输入原CCVT绑定的手机号码进行关联</CellsTips>
                </Page>
            </div>
        );
    }
}

export default withRouter(BindPhone);
import React, { Component } from 'react';
import Country from '../../assets/js/country.jsx';
import { GetWeChatName } from '../../http/http.jsx';
import GetSmsCodeFun from '../../assets/js/getSmsCode.jsx';
import CfmCode from '../../assets/js/cfmCode.jsx';
import { Form, FormCell, CellHeader, Label, CellBody, Input, CellFooter, Button } from 'react-weui';
import RegisterBtn from './registerBtn.jsx';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cellphone: '',
            pass_word: '',
            inviteCode: '',
            country_code: '86',
            cfm_code: '',
            uploadCfmCode: false,
            sms_code: '',
            maxLength: 4,
            getSmsBtnText: "获取验证码",
            show_none: false,
            wechatShow: false,
            group_id: "",
            wechat: "",
            loading: false,
        }
    }

    //在组件挂载之前获取context的值
    componentDidMount() {
        if (this.context && this.context.invite_code != '0') {
            this.setState({
                invite_code: this.context.invite_code
            })
        }
        //如果content中code有值，获取微信昵称
        if (this.context && this.context.code) {
            let params = { code: this.context.code };
            GetWeChatName(params, res => {
                if (res.wechat) {
                    this.setState({ wechat: res.wechat, wechatShow: !this.state.wechatShow })
                }
            }, res => {
                // fail('微信昵称获取失败');
            });
        }
    }

    //监听输入框的输入变化
    phoneInputChange = (e) => {
        this.setState({
            cellphone: e.target.value
        })
    };

    passwordInputChange = (e) => {
        this.setState({
            pass_word: e.target.value
        })
    };
    inviteCodeChange = (e) => {
        this.setState({
            inviteCode: e.target.value
        })
    }

    cfmCodeChange = (e) => {
        this.setState({
            cfm_code: e.target.value
        })
    };
    wechatChange = (e) => {
        this.setState({
            wechat: e.target.value
        })
    };

    smsCodeInputChange = (e) => {
        this.setState({
            sms_code: e.target.value
        })
    };

    getCountryCode = (code) => {
        this.setState({ country_code: code });
    };

    //获取手机短信callback验证
    getSmsCallbackFuc = () => {
        this.setState({
            uploadCfmCode: true
        });
    };

    render() {
        return (
            <div>
                <Form>
                    <Country getCountryCode={this.getCountryCode} />

                    <FormCell>
                        <CellHeader>
                            <Label>手机号码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="输入手机号码" value={this.state.cellphone} onChange={this.phoneInputChange} />
                        </CellBody>
                    </FormCell>

                    <FormCell vcode>
                        <CellHeader>
                            <Label>验证码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" value={this.state.cfm_code} onChange={this.cfmCodeChange} placeholder="请输入图形验证码" />
                        </CellBody>
                        <CellFooter className='cfm_code_width'>
                            <CfmCode uploadCfmCode={this.state.uploadCfmCode} />
                        </CellFooter>
                    </FormCell>

                    <FormCell vcode>
                        <CellHeader>
                            <Label>短信验证码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" value={this.state.sms_code} onChange={this.smsCodeInputChange} placeholder="请输入短信验证码" />
                        </CellBody>
                        <CellFooter>
                            <Button type="vcode">{<GetSmsCodeFun cellphone={this.state.cellphone} cfm_code={this.state.cfm_code} getSmsCallback={this.getSmsCallbackFuc} />}</Button>
                        </CellFooter>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" value={this.state.pass_word} onChange={this.passwordInputChange} placeholder="请输入密码" />
                        </CellBody>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>邀请码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" value={this.state.inviteCode} onChange={this.inviteCodeChange} placeholder="请输入邀请码/选填" />
                        </CellBody>
                    </FormCell>

                    {
                        this.state.wechatShow ?
                            <FormCell>
                                <CellHeader>
                                    <Label>微信昵称</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" value={this.state.wechat} onChange={this.wechatChange} placeholder="请输入微信昵称" />
                                </CellBody>
                            </FormCell>
                            : ''
                    }
                </Form>

                <div className='page_padding margin_top_1'>
                    <RegisterBtn
                        country_code={this.state.country_code}
                        cellphone={this.state.cellphone}
                        pass_word={this.state.pass_word}
                        invite_code={this.state.inviteCode}
                        sms_code={this.state.sms_code}
                        cfm_code={this.state.cfm_code}
                        group_id={this.state.group_id}
                        wechat={this.state.wechat}
                    />
                </div>
                <div className='margin_top_1 text_align-center'>
                    <Link to='/'>登录</Link>
                </div>
            </div>
        )
    }
}
export default RegisterForm
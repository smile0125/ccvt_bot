import React, { Component } from 'react';
import { Form, FormCell, CellHeader, Label, CellBody, Input, CellFooter } from 'react-weui';
import Country from '../../assets/js/country.jsx';
import CfmCode from '../../assets/js/cfmCode.jsx';
import LoginBtn from './loginBtn.jsx';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country_code: '86',
            cellphone: '',
            pass_word: '',
            cfm_code: '',
            uploadCfmCode: false,

        }
    }

    //获取国家代码
    getCountryCode = (code) => {
        this.setState({ country_code: code })
    };

    //手机号码
    phoneChange = (e) => {
        this.setState({
            cellphone: e.target.value
        });
    }

    //密码
    passwordChange = (e) => {
        this.setState({
            pass_word: e.target.value
        })
    };

    //图形验证码
    cfmCodeChange = (e) => {
        this.setState({ cfm_code: e.target.value })
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
                            <Input type="tel" placeholder="输入手机号码" value={this.state.cellphone} onChange={this.phoneChange} />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" value={this.state.pass_word} onChange={this.passwordChange} placeholder="输入登录密码" />
                        </CellBody>
                    </FormCell>

                    <FormCell vcode>
                        <CellHeader>
                            <Label>验证码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" value={this.state.cfm_code} onChange={this.cfmCodeChange} placeholder="请输入验证码" />
                        </CellBody>
                        <CellFooter className='cfm_code_width'>
                            <CfmCode uploadCfmCode={this.state.uploadCfmCode} />
                        </CellFooter>
                    </FormCell>
                </Form>
                <div className='page_padding margin_top_1'>
                    <LoginBtn
                        country_code={this.state.country_code}
                        cellphone={this.state.cellphone}
                        pass_word={this.state.pass_word}
                        cfm_code={this.state.cfm_code}
                    />
                </div>
                <div className='margin_top_1 text_align-center'>
                    <Link to='/register'>注册</Link>
                </div>
            </div>
        )
    }
}
export default LoginForm
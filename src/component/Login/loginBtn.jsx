import React, { Component } from 'react';
import { Button, Toptips } from 'react-weui';
import { UserLogin } from '../../http/http.jsx';
import { SetCookie } from '../../assets/js/common.jsx';
import hex_sha1 from '../../assets/js/sha.jsx';

export default class LoginBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTopTips: false,
            topTipTimer: null,
            toptipType: 'primary',
            text: '提交成功'
        }
    }


    loginClick = () => {
        const { country_code, cellphone, pass_word, cfm_code } = this.props;
        if (!country_code.length) {
            this.setState({ text: '请选择国家', toptipType: 'warn' })
            this.topTips()
            return;
        }
        if (!cellphone) {
            this.setState({ text: '请输入手机号码', toptipType: 'warn' })
            this.topTips()
            return;
        }
        if (!pass_word.length) {
            this.setState({ text: '请输入密码', toptipType: 'warn' })
            this.topTips()
            return;
        }
        if (!cfm_code.length) {
            this.setState({ text: '请输入图形验证码', toptipType: 'warn' })
            this.topTips()
            return;
        }

        let params = {
            country_code: country_code,
            cellphone: cellphone.replace(/\s/g, ''),
            pass_word_hash: hex_sha1(pass_word),
            cfm_code: cfm_code
        };
        UserLogin(params, res => {
            if (res.errcode == "0") {
                this.setState({ text: '登录成功', toptipType: 'primary' })
                this.topTips()
                SetCookie("token", res.token, 2);
                window.location.hash = '/';
            }
        }, res => {
            console.log(res);
            this.setState({ text: res.errmsg, toptipType: 'warn' })
            this.topTips()
            if (res.errcode == '116' || res.errcode == '122') {
                this.setState({ text: "请" + res.errmsg + "后重试", toptipType: 'warn' })
                this.topTips()
            }
        });
    };

    topTips() {
        this.setState({ showTopTips: true });

        this.state.topTipTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.state.topTipTimer)
    }

    render() {
        return (
            <div>
                {
                    this.state.showTopTips ?
                        <Toptips type={this.state.toptipType} show={this.state.showTopTips}>{this.state.text}</Toptips>
                        : ''
                }
                <Button onClick={this.loginClick}>登录</Button>
            </div>
        )
    }
}

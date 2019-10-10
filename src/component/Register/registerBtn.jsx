import React, { Component } from 'react';
import { Button } from 'react-weui';
import hex_sha1 from '../../assets/js/sha.jsx';
import { Register } from '../../http/http.jsx';
import TopTip from '../../assets/js/topTops.jsx';

export default class RegisterBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: 'warn',
            text: '提交成功'
        }
    }


    handdleRegisterClick = () => {
        const { cellphone, pass_word, cfm_code, sms_code, country_code, invit_code, group_id, wechat } = this.props;
        if (!cellphone) {
            this.setState({ showTopTips: true, text: '请输入手机号码' });
            this.stopTopTips();
            return;
        }
        if (!pass_word) {
            this.setState({ showTopTips: true, text: '请输入密码' });
            this.stopTopTips();
            return;
        }
        if (!cfm_code.length) {
            this.setState({ showTopTips: true, text: '请输入图形验证码' });
            this.stopTopTips();
            return;
        }
        if (sms_code.length <= 0) {
            this.setState({ showTopTips: true, text: '请输入手机验证码' });
            this.stopTopTips();
            return;
        }

        let params = {
            country_code: country_code,
            cellphone: cellphone.replace(/\s/g, ''),
            pass_word: pass_word,
            pass_word_hash: hex_sha1(pass_word),
            invit_code: invit_code,
            sms_code: sms_code,
            group_id: group_id,
            wechat: wechat
        };

        this.setState({
            loading: !this.state.loading
        });

        Register(params, res => {
            if (res.errcode == "0") {
                this.setState({ showTopTips: true, text: '注册成功', type: 'primary' });
                this.stopTopTips();
                window.location.hash = '/';
            }
        }, res => {
            this.setState({ showTopTips: true, text: `注册失败${res.errmsg}` });
            this.stopTopTips();
        })
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillMount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }



    render() {
        return (
            <div>
                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }

                <Button onClick={this.handdleRegisterClick}>注册</Button>
            </div>
        )
    }
}

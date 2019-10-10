import React, { Component } from 'react';
import { Button } from 'react-weui';
import { GetSmsCode } from '../../http/http.jsx';
import TopTip from '../../assets/js/topTops.jsx';

class GetSmsCodeFun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getSmsBtnText: "获取验证码",
            btnDisabled: false,
            timer: null,
            time: 60,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: 'warn',
            text: '提交成功'
        }
    }

    getSmsCodeClick = () => {
        const { cellphone, cfm_code, getSmsCallback } = this.props;

        if (!cfm_code) {
            this.setState({ showTopTips: true, text: '请输入图形验证码' });
            this.stopTopTips();
            return;
        }
        if (!cellphone) {
            this.setState({ showTopTips: true, text: '请输入手机号码' });
            this.stopTopTips();
            return;
        }

        let params = {
            country_code: this.props.country_code,
            bind_type: '1',
            cellphone: cellphone.replace(/\s/g, ''),
            cfm_code: cfm_code
        };

        GetSmsCode(params, res => {
            if (res.errcode == 0) {
                this.setState({ showTopTips: true, text: '发送成功', toptipType: 'primary' });
                this.stopTopTips();
                this.setState({
                    btnDisabled: !this.state.btnDisabled
                });
                this.tick(this.state.time);
            }
        }, res => {
            this.setState({ showTopTips: true, text: `发送失败 ${res.errmsg}`, toptipType: 'warn' });
            this.stopTopTips();
        })
    };

    //获取短信倒计时60s
    tick = (time) => {
        this.state.timer = setInterval(() => {
            if (time < 0) {
                clearInterval(this.state.timer);
                this.setState({
                    btnDisabled: !this.state.btnDisabled
                });
                this.setState({ getSmsBtnText: '获取验证码' })
            } else {
                this.setState({ getSmsBtnText: time });
                time--;
            }
        }, 1000);
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    render() {
        return (
            <div>
                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }

                <Button className='getSmsBtn' size="small" disabled={this.state.btnDisabled} onClick={this.getSmsCodeClick}>{this.state.getSmsBtnText}</Button>
            </div>
        );
    }
}

export default GetSmsCodeFun;
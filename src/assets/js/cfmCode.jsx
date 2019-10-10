import React, { Component } from 'react';
import { VCode } from 'react-weui';
const baseUrl = "http://bot_api.fnying.com";
// const baseUrl = "http://ccvt_bot.phpmanong.cn";

export default class CfmCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgCodeSrc: `${baseUrl}/api/inc/code.php?${Math.random()}`
        }
    }

    //点击切换图形验证码
    toggleImgCodeClick = () => {
        this.setState({
            imgCodeSrc: `${baseUrl}/api/inc/code.php?${Math.random()}`
        })
    };

    //根据状态更新图形验证码
    componentWillReceiveProps() {
        const uploadCfmCode = this.props.uploadCfmCode;
        if (uploadCfmCode) {
            this.setState({
                imgCodeSrc: `${baseUrl}/api/inc/code.php?${Math.random()}`
            })
        }
    }

    render() {
        return (
            <VCode src={this.state.imgCodeSrc} onClick={this.toggleImgCodeClick}></VCode>
        )
    }
}

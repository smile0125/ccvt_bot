import React, { Component } from 'react';
import { ButtonArea, Button } from 'react-weui';
import * as QrCode from 'qrcode.react';
import Loading from '../../assets/js/loading.jsx';

export default class GenerateInviteImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '',
            loadingShow: false,
        }
    }
    //生成二维码
    generateInviteImg = () => {
        this.setState({ loadingShow: true });
        let _this = this;
        let qrImg = new Image();
        qrImg.crossOrigin = "*";
        qrImg.src = require('../../assets/img/inviteImg.png');
        const huabu = document.getElementById('huabu');
        huabu.width = '750';
        huabu.height = '1334';
        let ctx = huabu.getContext("2d");
        const qr = document.getElementById('qr');
        qrImg.onload = function () {
            ctx.drawImage(qrImg, 0, 0, 750, 1334);
            ctx.drawImage(qr, 515, 1115, 170, 170);//dx:x轴坐标 dy:y轴坐标 dw:宽度 dh:高度
            let base64 = huabu.toDataURL("images/png");//转换URL
            _this.setState({ src: base64, loadingShow: false })
        };
    };
    hideImg = () => {
        this.setState({ src: '' })
    };

    render() {
        return (
            <div>
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow} />
                        : ''
                }
                <div style={{ display: 'none' }}>
                    <QrCode id='qr' value={this.props.invite_link} size={120} />
                    <canvas id='huabu'></canvas>
                </div>

                {
                    this.state.src ?
                        <div className='shar_img_box' onClick={this.hideImg}>
                            <img src={this.state.src} alt="" />
                        </div>
                        : ""
                }

                <ButtonArea direction="horizontal">
                    <Button className='invite_img_btn' onClick={this.generateInviteImg} plain size='small'>专属邀请海报</Button>
                </ButtonArea>
            </div>
        )
    }
}

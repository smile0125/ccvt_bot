import React, { Component } from 'react';
import { Panel, PanelHeader, PanelBody, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription, Button } from 'react-weui';
import {GetCookie} from '../../assets/js/common.jsx';
export default class DmainList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_hide_img_box: false,
            src: '',
        }
    }
    //点击显示图片
    showImg = (src) => {
        if (src) {
            this.setState({ src: src, show_hide_img_box: true });
        }
    };
    //隐藏图片
    hideImgBox = () => {
        this.setState({ src: '', show_hide_img_box: false });
    };
    render() {
        return (
            <div id='domain'>
                {
                    this.state.show_hide_img_box ?
                        <div className='show_img_box' onClick={this.hideImgBox}>
                            <img src={this.state.src} alt="" />
                        </div> : ''
                }

                <Panel>
                    <PanelHeader>
                        {
                            GetCookie('group_name') ?
                                <p>当前所在群：{GetCookie('group_name')}</p> : ''
                        }

                        <p>选择加入感兴趣的矿池</p>
                    </PanelHeader>
                    <PanelBody>

                        {
                            this.props.list.map((item, index) => {
                                return (
                                    <MediaBox type="appmsg" key={item.id}>
                                        <MediaBoxHeader className='domain_header'>
                                            <img src={item.qr_code_address} onClick={() => this.showImg(item.qr_code_address)} alt="" />
                                        </MediaBoxHeader>
                                        <MediaBoxBody>
                                            <MediaBoxTitle>{item.name}</MediaBoxTitle>

                                            <MediaBoxDescription className='domain_info_p'>
                                                <svg className="icon">
                                                    <use xlinkHref='#icon-type1'>
                                                    </use>
                                                </svg>&nbsp;
                                               {item.group_type_name}
                                            </MediaBoxDescription>
                                            <div className='domain_info'>
                                                <MediaBoxDescription className='domain_info_p'>
                                                    <svg className="icon">
                                                        <use xlinkHref='#icon-qunzhu1'>
                                                        </use>
                                                    </svg>&nbsp;
                                                    {item.group_manager}
                                                </MediaBoxDescription>
                                                <MediaBoxDescription className='domain_info_p'>
                                                    <svg className="icon">
                                                        <use xlinkHref='#icon-robot'>
                                                        </use>
                                                    </svg>&nbsp;
                                                    {item.bot_name}
                                                </MediaBoxDescription>
                                                <MediaBoxDescription className='domain_info_p'>
                                                    <svg className="icon">
                                                        <use xlinkHref='#icon-renshu1'>
                                                        </use>
                                                    </svg>&nbsp;
                                                    {item.member_count}
                                                </MediaBoxDescription>
                                            </div>

                                            <MediaBoxDescription>
                                                介绍：{item.dis}
                                            </MediaBoxDescription>
                                        </MediaBoxBody>
                                    </MediaBox>
                                )
                            })
                        }
                    </PanelBody>
                </Panel>
            </div >
        )
    }
}

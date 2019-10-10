import React, { Component } from 'react';
import { AiLoginState, AiLogOut, ToggleAILogin } from '../../http/http.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { GetCookie, SetCookie } from '../../assets/js/common.jsx';
import { CellsTitle, Cells, Cell, CellBody, Dialog, CellFooter, Button } from 'react-weui';
import AdminLoginTips from './adminLoginTips.jsx';
import { clearTimeout } from 'timers';
let timer = null;
export default class AiLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            us_id: '',
            is_deal: '',
            robot_us_id: '',
            timer: null,
            info: '',
            action: '',
            showTopTips: false,
            topTipTimer: null,
            toptipType: 'primary',
            text: 'AI登录成功',
            dialog: false,
            toggleLoginDialog: false,
            adminLoginDialog: false,
        }
    }

    componentDidMount() {
        const us_id = GetCookie('us_id');
        this.setState({ us_id: us_id });
        clearInterval(timer);
        this.AiLoginStateFun();
    }

    AiLoginStateFun = () => {
        const params = { us_id: GetCookie('us_id') };
        AiLoginState(params, res => {
            this.setState({ info: res.rows });
            let robot_alive = res.rows.robot_alive;
            let search_pory = res.rows.ip_address;
            this.setState({ action: "http://" + search_pory + "/search", is_deal: res.rows.is_deal });
            robot_alive === '2' ? this.startInterval() : this.stopInterval();
        }, res => {
        })
    };

    startInterval = () => {
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(() => {
            this.AiLoginStateFun();
            SetCookie('robot_alive', 2);
        }, 3000);
    };

    stopInterval = () => {
        clearInterval(timer);
        const robot_alive = GetCookie('robot_alive');
        if (robot_alive != 1) {
            this.setState({ toptipType: 'warn', showTopTips: false, text: `登录成功` });
            this.stopTopTips();
            SetCookie('robot_alive', 1);
        }
    };

    submitForm = () => {
        setTimeout(function () {
            window.location.reload();
        }, 4000);
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(timer);
        clearTimeout(this.state.topTipTimer);
    }

    //退出
    aiOut = () => {
        this.setState({ dialog: true })
    }

    hideDialog = () => {
        this.setState({ dialog: false, toggleLoginDialog: false, adminLoginDialog: false })
    }

    outLoginAIConfirm = () => {
        const us_id = this.state.us_id;
        const params = {
            robot_alive: 2,
            us_id: GetCookie('us_id') || us_id
        }
        AiLogOut(params, res => {
            if (res.errcode == 0) {
                this.setState({ dialog: false, toptipType: 'primary', showTopTips: false, text: '退出成功' })
                this.stopTopTips();
                this.startInterval();
            }
        }, res => {
            this.setState({ dialog: false, toptipType: 'warn', showTopTips: false, text: `退出失败 ${res.errmsg}` })
            this.stopTopTips();
        })
    }

    //大白转用户 1 
    toggleLogin = () => {
        this.setState({ toggleLoginDialog: true });
    };

    //用户转大白 2
    toggleAdmin = (us_id) => {
        this.setState({ adminLoginDialog: true, robot_us_id: us_id });
    };

    toggleLoginConfirm = (type) => {
        const params = { token: GetCookie('token'), type: type, us_id: this.state.robot_us_id };
        ToggleAILogin(params, res => {
            if (res.errcode == 0) {
                this.setState({ toggleLoginDialog: false, adminLoginDialog: false, toptipType: 'primary', showTopTips: false, text: `切换成功` })
                this.stopTopTips();
                this.AiLoginStateFun();
            }
        }, res => {
            this.setState({ toggleLoginDialog: false, toptipType: 'warn', showTopTips: false, text: `切换失败 ${res.errmsg}` })
            this.stopTopTips();
        });
    };

    render() {
        const { bot_name, robot_alive, login_time, elapsed_time, is_my_bot } = this.state.info;
        const style2 = {
            title: '退出AI登录',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hideDialog
                },
                {
                    type: 'primary',
                    label: '确定',
                    onClick: this.outLoginAIConfirm
                }
            ]
        };
        const toggleLoginStyle = {
            title: '切换AI登录',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hideDialog
                },
                {
                    type: 'primary',
                    label: '确定',
                    onClick: () => { this.toggleLoginConfirm('1') }
                }
            ]
        };
        const toAdminLoginStyle = {
            title: '切换登录',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hideDialog
                },
                {
                    type: 'primary',
                    label: '确定',
                    onClick: () => { this.toggleLoginConfirm('2') }
                }
            ]
        };
        return (
            <div>
                {
                    this.state.dialog ?
                        <Dialog type="ios" title={style2.title} buttons={style2.buttons} show={this.state.dialog}>
                            确定退出当前AI登录？
                        </Dialog> : ''
                }
                {
                    this.state.toggleLoginDialog ?
                        <Dialog type="ios" title={toggleLoginStyle.title} buttons={toggleLoginStyle.buttons} show={this.state.toggleLoginDialog}>
                            <p>个人微信必须可以登录微信网页版</p>
                        </Dialog> : ''
                }
                {
                    this.state.adminLoginDialog ?
                        <Dialog type="ios" title={toAdminLoginStyle.title} buttons={toAdminLoginStyle.buttons} show={this.state.adminLoginDialog}>
                            确定切换登录？
                </Dialog> : ''
                }
                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }
                <CellsTitle>AI登录</CellsTitle>
                {
                    is_my_bot != 1 ?
                        <Cells>
                            <Cell>
                                <CellBody>
                                    当前登录
                            </CellBody>
                                <CellFooter>{bot_name ? bot_name : '--'}</CellFooter>
                            </Cell>
                        </Cells> :
                        <Cells>
                            <Cell>
                                <CellBody>
                                    当前登录
                            </CellBody>
                                <CellFooter>{bot_name ? bot_name : '--'}</CellFooter>
                            </Cell>
                            <Cell>
                                <CellBody>
                                    登录状态
                            </CellBody>
                                <CellFooter>
                                    {robot_alive == 1 ? <span className="color_green">已登录</span> :
                                        <span className="color_red">未登录</span>}
                                </CellFooter>
                            </Cell>
                            <Cell>
                                <CellBody>
                                    登录时间
                            </CellBody>
                                <CellFooter>
                                    {login_time ? login_time : '--'}
                                </CellFooter>
                            </Cell>
                            <Cell>
                                <CellBody>
                                    运行时长
                            </CellBody>
                                <CellFooter>
                                    {elapsed_time ? elapsed_time : '--'}
                                </CellFooter>
                            </Cell>
                        </Cells>
                }

                {
                    is_my_bot == 1 ?
                        <div className='ai_tips margin_top_1 page_padding'>

                            {
                                robot_alive == 1 ?
                                    <Button type='warn' onClick={this.aiOut}>退出AI</Button>
                                    :
                                    <div className='text_align-center qr_login_box addBtnStyle'>
                                        <img src={this.state.info.qr_path} style={{ width: '40%' }} alt="" />
                                        <p className='font-size-14'>扫码登录AI机器人</p>
                                        <form action={this.state.action} method="get" id="form">
                                            <input type="hidden" value={this.state.us_id} name="us_id" />
                                            <input type="submit" className='submitForm' onClick={this.submitForm}
                                                value='刷新二维码' />
                                        </form>
                                        <div style={{ textAlign: "left" }}>
                                            <p className='text_tips'>友情提示：</p>
                                            <p className='text_tips'>.扫码的微信必须能登录微信网页版</p>
                                            <p className='text_tips'>.扫码前必须要在群里</p>
                                            <p className='text_tips'>.该群必须要保存在通讯录</p>
                                            <p className='text_tips'>.群昵称必须与当前所登录的AI昵称一致</p>
                                            <p className='text_tips'>.二维码无法长按识别,可通过其他设备扫码登录</p>
                                        </div>
                                    </div>
                            }

                            <AdminLoginTips toggleAdmin={this.toggleAdmin} />
                            <p className='text_tips margin_top_1'>友情提示：</p>
                            <p className='text_tips'>如何退出AI：打开当前登录AI的微信客户端->可看到微信顶部显示"网页微信已登录"->点击选择退出即可</p>
                        </div> :
                        <div className='margin_top_1 page_padding'>
                            <Button type='primary' onClick={this.toggleLogin}>切换个人登录</Button>
                            <div style={{ textAlign: "left" }} className='margin_top_1'>
                                {
                                    this.state.is_deal == 0 ?
                                        <p className='text_tips' style={{fontSize:'14px'}}>切换状态：正在审核中</p> : ''
                                }

                                <p className='text_tips'>友情提示：</p>
                                <p className='text_tips'>.可切换为个人AI登录进行管理</p>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

import React, { Component } from 'react';
import { CellsTitle, Form, FormCell, CellBody, CellFooter, Switch } from 'react-weui';
import { ModifyPoolSet } from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { GetCookie } from '../../assets/js/common.jsx';

export default class PoolSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            poolInfo: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }

    componentDidMount() {
        const token = GetCookie('token');
        if (token) {
            this.setState({ token: token });
        }
    }

    //开关按钮变化
    switchChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        let poolInfo = this.props.poolInfo;
        // console.log(checked)
        // console.log(poolInfo)
        let params = {
            token: this.state.token,
            group_id: poolInfo.id,
        };

        switch (value) {
            case 'is_del':
                checked ? poolInfo.is_del = '1' : poolInfo.is_del = '2';
                this.setState({ poolInfo: poolInfo });
                params.del = poolInfo.is_del;
                this.ModifyPoolSetFun(params);
                break;
            case 'is_flirt':
                checked ? poolInfo.is_flirt = '1' : poolInfo.is_flirt = '2';
                this.setState({ poolInfo: poolInfo });
                params.flirt = poolInfo.is_flirt;
                this.ModifyPoolSetFun(params);
                break;
            case 'leave_message_switch':
                checked ? poolInfo.leave_message_switch = '1' : poolInfo.leave_message_switch = '2';
                this.setState({ poolInfo: poolInfo });
                params.leave_message_switch = poolInfo.leave_message_switch;
                this.ModifyPoolSetFun(params);
                break;
            case 'bind_account_notice':
                checked ? poolInfo.bind_account_notice = '1' : poolInfo.bind_account_notice = '2';
                this.setState({ poolInfo: poolInfo });
                params.bind_account_notice = poolInfo.bind_account_notice;
                this.ModifyPoolSetFun(params);
                break;
            case 'send_address':
                checked ? poolInfo.send_address = '1' : poolInfo.send_address = '2';
                this.setState({ poolInfo: poolInfo });
                params.send_address = poolInfo.send_address;
                this.ModifyPoolSetFun(params);
                break;
            case 'ranking_change_switch':
                checked ? poolInfo.ranking_change_switch = '1' : poolInfo.ranking_change_switch = '2';
                this.setState({ poolInfo: poolInfo });
                params.ranking_change_switch = poolInfo.ranking_change_switch;
                this.ModifyPoolSetFun(params);
                break;
            default:
        }
    };

    //修改开关
    ModifyPoolSetFun = (params) => {
        this.setState({ loadingShow: true });
        ModifyPoolSet(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false, toptipType: 'primary',
                    showTopTips: true, text: `修改成功`
                });
                this.stopTopTips();
            }
        }, res => {
            this.setState({
                loadingShow: false, toptipType: 'warn',
                showTopTips: true, text: `${res.errmsg}`
            });
            this.stopTopTips();
        })
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    render() {
        const { is_del, is_flirt, send_address, bind_account_notice, ranking_change_switch, leave_message_switch } = this.props.poolInfo;
        return (
            <div>
                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow} />
                        : ''
                }

                <CellsTitle>矿池开关</CellsTitle>
                <Form>
                    <FormCell>
                        <CellBody>运行状态</CellBody>
                        <CellFooter>
                            <Switch onChange={this.switchChange} value='is_del' checked={is_del == '1' ? true : false} />
                        </CellFooter>
                    </FormCell>

                    <FormCell>
                        <CellBody>调戏状态</CellBody>
                        <CellFooter>
                            <Switch onChange={this.switchChange} value='is_flirt' checked={is_flirt === '1' ? true : false} />
                        </CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellBody>留言通知</CellBody>
                        <CellFooter>
                            <Switch onChange={this.switchChange} value='leave_message_switch' checked={leave_message_switch === '1' ? true : false} />
                        </CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellBody> 未绑定通知</CellBody>
                        <CellFooter>
                            <Switch onChange={this.switchChange} value='bind_account_notice' checked={bind_account_notice === '1' ? true : false} />
                        </CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellBody>推送当天统计</CellBody>
                        <CellFooter>
                            <Switch onChange={this.switchChange} value='send_address' checked={send_address === '1' ? true : false} />
                        </CellFooter>
                    </FormCell>
                    
                    <FormCell>
                        <CellBody>荣耀积分变化通知</CellBody>
                        <CellFooter>
                            <Switch onChange={this.switchChange} value='ranking_change_switch' checked={ranking_change_switch === '1' ? true : false} />
                        </CellFooter>
                    </FormCell>
                    
                </Form>
            </div>
        )
    }
}

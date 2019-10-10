import React, {Component} from 'react';
import {Dialog, Switch} from 'react-weui';
import {DelTask} from '../../http/http.jsx';
import {GetCookie} from '../../assets/js/common.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';

export default class OnOff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }

    onOffSwitch = (is_close) => {
        console.log(is_close);
        if (is_close == 2) {
            this.offTaskConfirm('0')
        } else {
            this.setState({dialog: true});
        }
    };
    hideDialog = () => {
        this.setState({dialog: false});
    };
    //确定开关
    offTaskConfirm = (is_del) => {
        const timer_id = this.props.timer_id;
        const token = GetCookie('token');
        const params = {token: token, timer_id: timer_id, is_del: is_del};
        const {upLoadList} = this.props;
        this.setState({loadingShow: true, loadingText: 'loading...'});

        DelTask(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    dialog: false,
                    loadingShow: false,
                    showTopTips: true,
                    toptipType: 'primary',
                    text: '提交成功'
                });
                this.stopTopTips();
                upLoadList();
            }

        }, res => {
            this.setState({dialog: false, loadingShow: false, showTopTips: true, toptipType: 'warn', text: `失败`});
            this.stopTopTips();
        })
    };
    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    render() {
        const style2 = {
            title: '关闭任务',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hideDialog
                },
                {
                    type: 'primary',
                    label: '确定',
                    onClick: () => this.offTaskConfirm('2')
                }
            ]
        };
        const {toptipType, showTopTips, text, loadingShow} = this.state;
        const is_close = this.props.is_close;
        return (
            <div>
                {
                    this.state.showTopTips ?
                        <TopTip type={toptipType} show={showTopTips} text={text}/> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={loadingShow}/>
                        : ''
                }
                {
                    this.state.dialog ?
                        <Dialog type="ios" title={style2.title} buttons={style2.buttons} show={this.state.dialog}>
                            确定关闭此任务？
                        </Dialog> : ''
                }
                <Switch onChange={() => this.onOffSwitch(is_close)}
                        defaultChecked={is_close == 2 ? false : true}/>
            </div>
        )
    }
}

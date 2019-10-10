import React, { Component } from 'react';
import { GetCookie } from '../../assets/js/common.jsx';
import { Dialog } from 'react-weui';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { DelTask } from '../../http/http.jsx';

export default class DelTaskClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            loadingShow: false,
            loadingText: '',
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    delTaskClick = () => {
        this.setState({ dialog: true });
    }

    delTaskConfirm = () => {
        const timer_id = this.props.timer_id;
        const token = GetCookie('token');
        const params = { token: token, timer_id: timer_id, is_del: '1' };
        const { upLoadList } = this.props;
        this.setState({ loadingShow: true, loadingText: 'loading...' });

        DelTask(params, res => {
            if (res.errcode == 0) {
                this.setState({ dialog: false, loadingShow: false, showTopTips: true, toptipType: 'primary', text: '删除成功' });
                upLoadList();
            }

        }, res => {
            this.setState({ dialog: false, loadingShow: false, showTopTips: true, toptipType: 'primary', text: `删除失败 ${res.errmsg}` });
        })
    }

    hideDialog = () => {
        this.setState({ dialog: false });
    }

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    render() {
        const style2 = {
            title: '删除任务',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hideDialog
                },
                {
                    type: 'primary',
                    label: '确定',
                    onClick: this.delTaskConfirm
                }
            ]
        }
        return (
            <div>
                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow} loadingText={this.state.loadingText} />
                        : ''
                }
                {
                    this.state.dialog ?
                        <Dialog type="ios" title={style2.title} buttons={style2.buttons} show={this.state.dialog}>
                            确定删除此任务？
                        </Dialog> : ''
                }
                <svg className="icon" onClick={this.delTaskClick}>
                    <use xlinkHref={'#icon-shanchu'}>
                    </use>
                </svg>
            </div>

        )
    }
}

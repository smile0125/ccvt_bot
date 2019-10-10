import React, { Component } from 'react';
import { GetCookie } from '../../assets/js/common.jsx';
import { Dialog } from 'react-weui';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { DeleteKeyWord } from '../../http/http.jsx';

export default class DelTaskClass extends Component {
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
    delKeyWordClick = () => {
        this.setState({ dialog: true });
    };

    delTaskConfirm = () => {
        const key_id = this.props.id;
        const { uploadkeyWordList } = this.props;
        const token = GetCookie('token');
        const params = { token: token, key_id: key_id };

        this.setState({ loadingShow: true });

        DeleteKeyWord(params, res => {
            if (res.errcode == 0) {
                uploadkeyWordList(key_id);
                this.setState({ dialog: false, loadingShow: false, showTopTips: true, toptipType: 'primary', text: '删除成功' });
                this.stopTopTips();
            }

        }, res => {
            console.log('err')
            this.setState({ dialog: false, loadingShow: false, showTopTips: true, toptipType: 'warn', text: `删除失败 ${res.errmsg}` });
            this.stopTopTips();
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
                <svg className="icon" onClick={this.delKeyWordClick}>
                    <use xlinkHref={'#icon-shanchu'}>
                    </use>
                </svg>
            </div>

        )
    }
}

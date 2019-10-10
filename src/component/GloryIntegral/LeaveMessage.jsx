import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../assets/js/page.jsx';
import { LeaveMessage } from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { CellsTitle, Form, FormCell, CellBody, TextArea, ButtonArea, Button } from 'react-weui';
import { GetCookie, SetCookie } from '../../assets/js/common.jsx';

export default class LeaveMessageClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaveMessageValue: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentDidMount() {
        const rows = GetCookie('rows');
        const leave_message = JSON.parse(rows).leave_message;
        this.setState({ leaveMessageValue: leave_message })
    }
    LeaveMessageChange = (e) => {
        this.setState({ leaveMessageValue: e.target.value })
    };
    handleLeaveMessage = () => {
        const { leaveMessageValue } = this.state;
        const params = {
            token: GetCookie('token'),
            leave_message: leaveMessageValue
        };
        if (!leaveMessageValue) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: '请输入留言内容' });
            this.stopTopTips();
            return;
        }
        this.setState({ loadingShow: true });
        LeaveMessage(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = JSON.parse(GetCookie('rows'));
                rows.leave_message = leaveMessageValue;
                SetCookie('rows',JSON.stringify(rows));
                this.setState({ leaveMessageValue: '' });
                this.setState({ loadingShow: false, toptipType: 'primary', showTopTips: true, text: '留言成功' });
                this.stopTopTips();
            } else {
                this.setState({ loadingShow: false, toptipType: 'warn', showTopTips: true, text: `留言失败 ${data.errmsg}` });
                this.stopTopTips();
            }
        })
    };
    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/gloryIntegral' className='hight_color'>荣耀积分</Link>&nbsp;|&nbsp;
            <span>荣耀留言</span>
        </span>;
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
                <Page className="article" title="荣耀留言" subTitle={bread} >
                    <CellsTitle>荣耀留言</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellBody>
                                <TextArea placeholder="请输入荣耀留言" value={this.state.leaveMessageValue} onChange={this.LeaveMessageChange} rows="3"></TextArea>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <ButtonArea>
                        <Button onClick={this.handleLeaveMessage}>提交</Button>
                    </ButtonArea>
                </Page>
            </div>
        )
    }
}

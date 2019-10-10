import React, { Component } from 'react';
import TopTip from '../../assets/js/topTops.jsx';
import Loading from '../../assets/js/loading.jsx';
import Page from '../../assets/js/page.jsx';
import { GetCookie } from '../../assets/js/common.jsx';
import { AddKeyWord } from '../../http/http.jsx';
import {Link} from 'react-router-dom';
import { Form, FormCell, CellHeader, Label, CellBody, Input, CellsTitle, TextArea, Button } from 'react-weui';

export default class AddKeyWordClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            ask: '',
            answer: '',
            group_id: '',
            send_type: 1,
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentDidMount() {
        const token = GetCookie('token');
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        const group_id = poolInfo.id;
        this.setState({ token, group_id });
    }
    //输入关键字
    aksChange = (e) => {
        this.setState({ ask: e.target.value })
    }
    //输入回复内容
    answerChange = (e) => {
        this.setState({ answer: e.target.value })
    }

    //提交关键字
    submitAddKeyWord = () => {
        const { ask, answer } = this.state;
        if (!ask) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `请输入关键字` });
            this.stopTopTips();
            return;
        }
        if (!answer) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `请输入回复内容` });
            this.stopTopTips();
            return;
        }
        this.confirmAddKeyWord();
    }

    //确认提交关键字
    confirmAddKeyWord = () => {
        const { ask, answer, send_type, group_id, token } = this.state;
        const params = {
            token: GetCookie('token') || token,
            ask: ask,
            answer: answer,
            send_type: send_type,
            group_id: group_id,
        }
        this.setState({ loadingShow: true });
        AddKeyWord(params, res => {
            if (res.errcode == 0) {
                this.setState({ loadingShow: false, toptipType: 'warn', showTopTips: true, text: `添加成功` });
                this.stopTopTips();
                window.location.hash = '/manageMent/keyWord';
            }
        }, res => {
            console.log(res);
            this.setState({ loadingShow: false, toptipType: 'warn', showTopTips: true, text: `添加失败 ${res.errmsg}` });
            this.stopTopTips();
        });
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
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/keyWord' className='hight_color'>关键字</Link>&nbsp;|&nbsp;
            <span>添加</span>
        </span>
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
                <Page className="article" title="添加关键字回复" subTitle={bread} >
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>关键字</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" value={this.state.ask} onChange={this.aksChange} placeholder="请输入关键字" />
                            </CellBody>
                        </FormCell>
                    </Form>
                    <CellsTitle>回复内容</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellBody>
                                <TextArea placeholder="请输入回复内容" value={this.state.answer} onChange={this.answerChange} rows="3"></TextArea>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className='page_padding margin_top_1'>
                        <Button onClick={this.submitAddKeyWord}>提交</Button>
                    </div>
                </Page>
            </div>
        )
    }
}

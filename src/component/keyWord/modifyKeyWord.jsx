import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import Loading from '../../assets/js/loading.jsx';
import { GetCookie, SetCookie, DelCookie } from '../../assets/js/common.jsx';
import { GetGroupId } from "../../assets/js/getGroupId.jsx";
import { ModifyKeyWord } from '../../http/http.jsx';
import {Link} from 'react-router-dom';
import { Form, FormCell, CellHeader, CellBody, Label, Input, CellsTitle, TextArea, Button } from 'react-weui';

export default class ModifyKeyWordClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            ask: '',
            answer: '',
            key_id: '',
            group_id: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentWillMount() {
        const token = GetCookie('token');
        this.setState({ token: token });
        const group_id = GetCookie('group_id');
        if (group_id) {
            this.setState({ group_id: group_id });
        } else {
            GetGroupId();
        }
        clearTimeout(this.state.toptTipsTimer);

        if (this.props.location.query) {
            const item = this.props.location.query.item;
            console.log(item);
            this.setState({ ask: item.ask, answer: item.answer, key_id: item.id })
            SetCookie('ask', item.ask);
            SetCookie('answer', item.answer);
            SetCookie('key_id', item.id);

        } else {
            this.setState({
                ask: GetCookie('ask'),
                answer: GetCookie('answer'),
                key_id: GetCookie('key_id')
            })
        }
    }
    //输入关键字
    askChange = (e) => {
        this.setState({ ask: e.target.value });
    }
    //输入回复内容
    answerChange = (e) => {
        this.setState({ answer: e.target.value });
    }

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    //提交
    modifyKeyWordClick = () => {
        const { token, ask, answer, key_id, group_id } = this.state;
        const params = {
            token: token,
            ask: ask,
            answer: answer,
            key_id: key_id,
            send_type: 1,
            group_id: group_id || GetCookie('group_id')
        }
        this.setState({ loadingShow: true });
        ModifyKeyWord(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false, toptipType: 'primary',
                    showTopTips: true,
                    text: '修改成功'
                });
                this.stopTopTips();
                window.location.hash = '/manageMent/keyWord';
            }
        }, res => {
            this.setState({
                loadingShow: false, toptipType: 'warn',
                showTopTips: true,
                text: `修改失败 ${res.errmsg}`
            });
            this.stopTopTips();
        })
    }

    componentWillUnmount() {
        DelCookie('ask');
        DelCookie('answer');
        DelCookie('key_id');
        clearTimeout(this.state.toptTipsTimer);
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/keyWord' className='hight_color'>关键字</Link>&nbsp;|&nbsp;
            <span>修改</span>
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
                <Page className="article" title="修改关键字回复" subTitle={bread} >
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>关键字</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" value={this.state.ask} onChange={this.askChange} placeholder="请输入关键字" />
                            </CellBody>
                        </FormCell>
                    </Form>
                    <CellsTitle>回复内容</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellBody>
                                <TextArea value={this.state.answer} onChange={this.answerChange} placeholder="请输入对应的回复内容" rows="3"></TextArea>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className='page_padding margin_top_1'>
                        <Button onClick={this.modifyKeyWordClick}>提交</Button>
                    </div>
                </Page>
            </div>
        )
    }
}

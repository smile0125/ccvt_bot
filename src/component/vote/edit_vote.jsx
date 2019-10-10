import React, {Component} from 'react';
import {Form, FormCell, CellHeader, CellBody, Label, Input, CellsTips, Button, ButtonArea, Toptips, Toast, Popup, Panel, PanelHeader, PanelBody, Article } from 'react-weui';
import {GetCookie} from "../../assets/js/common.jsx";
import {SubmitVoteInfo} from '../../http/http.jsx';

class EditVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            amount: 100,
            topTipsTimer:null,
            topTipsType:'primary',
            topTipsShow:false,
            topTipsText:'',
            showLoading: false,
            fullpage_show: false,
        }
    }

    //输入内容
    handleChange = (e, key) => {
        const value = e.target.value;
        this.setState(() => ({[key]: value}))
    };

    //提交
    handleClick = () => {
        const {name, url, amount} = this.state;
        if(!name) {
            this.setState(() => ({topTipsShow: true, topTipsType: 'warn', topTipsText: '请输入提名姓名'}));
            this.hideTopTips();
            return;
        }
        if(!url){
            this.setState(() => ({topTipsShow: true, topTipsType: 'warn', topTipsText: '请输入提名链接'}));
            this.hideTopTips();
            return;
        }
        const token = GetCookie('token');
        const params = {token, name, url, amount};
        this.setState(() => ({ showLoading: true }));
        SubmitVoteInfo(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                this.setState(() => ({ showLoading: false, topTipsShow: true, topTipsType: 'primary', topTipsText: '提交成功', name: '', url: '' }));
            }else{
                this.setState(() => ({ showLoading: false, topTipsShow: true, topTipsType: 'warn', topTipsText: `${ data.errmsg }`}));
            }
            this.hideTopTips();
        })
    };

    //关闭顶部信息提示
    hideTopTips = () => {
        this.state.topTipsTimer = setTimeout(() => {
            this.setState(() => ({ topTipsShow:false }))
        },2000)
    };

    //卸载组建之前
    componentWillUnmount(){
        clearTimeout(this.state.topTipsTimer);
    }

    render() {
        const { name, url, amount, topTipsType, topTipsShow, topTipsText, showLoading } = this.state;
        return (
            <div>
                { topTipsShow ? <Toptips type={ topTipsType } show={ topTipsShow }> { topTipsText } </Toptips> : null }
                { showLoading ? <Toast icon="loading" show={showLoading}></Toast> : null }
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="提名的姓名 如：刘德华" valle={ name }
                                   onChange={(e) => this.handleChange(e, 'name')}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>链接</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="百度百科链接" value= { url }
                                   onChange={(e) => this.handleChange(e, 'url')}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>默认数量</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="投票数量" value= { amount }
                                   onChange={(e) => this.handleChange(e, 'amount')}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <ButtonArea><Button onClick={ this.handleClick }>提交</Button></ButtonArea>
                <CellsTips>提示：</CellsTips>
                <CellsTips>1，姓名必须是百度百科上面可以查到的姓名。</CellsTips>
                <CellsTips>2，在百度百科上面查到对应的人物后，复制URL中的链接，粘贴到输入框中即可。</CellsTips>
                <CellsTips>3，投票数量默认为100 CCVT。</CellsTips>
                <CellsTips style={{color:'#1AAD19'}}>
                    荣耀提名规则：<span style={{color:'#1AAD19'}} onClick={() => {this.setState({fullpage_show:true})}}>查看详细规则</span>
                </CellsTips>
                <Popup
                    show={this.state.fullpage_show}
                    // onRequestClose={e => this.setState({fullpage_show: false})}
                >
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <Panel>
                            <PanelHeader>荣耀题名规则</PanelHeader>
                            <PanelBody>
                                <Article>

                                <img src={require('../../assets/img/vote_rules.jpg')} alt=""/>
                                <Button type='warn' plain onClick={() => this.setState({fullpage_show: false})}>关闭</Button>
                                </Article>
                            </PanelBody>
                        </Panel>
                    </div>
                </Popup>
                {/*<CellsTips>每人只能提名一次；</CellsTips>*/}
                {/*<CellsTips>每周期荣耀日公布结果，前三名被提名者将会加入荣耀榜；</CellsTips>*/}
                {/*<CellsTips>提名者获得提名总数量10%的CCVT奖励；</CellsTips>*/}
                {/*<CellsTips>提名总数作为被提名者初始的荣耀积分。</CellsTips>*/}
            </div>
        );
    }
}

export default EditVote;
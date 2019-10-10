import React, {Component} from 'react';
import {Panel, PanelHeader, Form, FormCell, CellHeader, Label, CellBody, Input, CellsTitle, Cell, CellFooter, Cells, Radio, Select, Button, ButtonArea, Toast, Toptips} from "react-weui";
import {withRouter} from 'react-router-dom';
import BankList from './assets/bank.jsx';
import UploadImg from '../../assets/js/uploadImg.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import InputChangeAction from "../../redux/action/inputChangeAction.jsx";
import {GetCookie} from "../../assets/js/common.jsx";
import { applicationAgentHttp, modifyAgentHttp } from '../../http/http.jsx';
import  ApplicationAgentPayment from './applicationAgentPayment.jsx';

class ApplicationAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '2',
            bank_name: '支付宝',
            logo: '',
            picture: '',
            showLoading: false,
            loadingText: '',
            showTopTips: false,
            topTipsType: 'warn',
            topTipsTimer: null,
            topTipsText: '',
        }
    }

    //获取上传的图片
    fnGetUploadImg = (src, id) => {
        console.log(src, id);
        if(id === 1){
            this.setState({logo: src})
        }else{
            this.setState({picture: src})
        }

    };

    //选择支付宝或者银行卡
    fnGetRadioChange = (bank_name, type) => {
        this.setState({bank_name, type})
    };

    //选择银行
    fnBankChange = e => {
      const val = e.target.value;
        BankList.forEach((item, index) => {
            item['value'] == val && this.setState({bank_name: item['label']})
        })
    };

    //输入内容
    fnHandleInputChang = (type, val) => {
        const params = {type, val};
        this.props.inputHandleChange(params);
    };

    //提交申请
    submitApplication = async () => {
        const unionid = GetCookie('unionid');
        const token = GetCookie('token');
        const fid = GetCookie('agent_id');
        const { name, account } = this.props.inputValue;
        const { logo, picture, type, bank_name } = this.state;
        if(!name){
            this.setState({ topTipsType: 'warn', showTopTips: true, topTipsText: '请输入店铺名称' });
            this.stopTopTips();
            return
        }
        if(!account){
            this.setState({ topTipsType: 'warn', showTopTips: true, topTipsText: '请输入收款账号' });
            this.stopTopTips();
            return
        }
        if(!logo){
            this.setState({ topTipsType: 'warn', showTopTips: true, topTipsText: '请上传店铺logo' });
            this.stopTopTips();
            return
        }
        if(!picture){
            this.setState({ topTipsType: 'warn', showTopTips: true, topTipsText: '请上传店铺图片' });
            this.stopTopTips();
            return
        }
        const params = {unionid, token, fid, name, account, logo, picture, type, bank_name};
        this.setState({  showLoading: true });
        const response = await applicationAgentHttp(params);
        if(response.data.errcode == 0){
            this.setState({  showLoading: false, topTipsType: 'primary', showTopTips: true, topTipsText: '成功' });
            this.stopTopTips();
            this.props.history.push({pathname: '/mall/merchants'})
        }else{
            this.setState({  showLoading: false, topTipsType: 'warn', showTopTips: true, topTipsText: `${ response.data.errmsg }` });
            this.stopTopTips();
        }
    };

    //修改商铺信息
    fnModifyAgentInfo = async () => {
        const unionid = GetCookie('unionid');
        const token = GetCookie('token');
        const id = this.props.match.params.id;
        const { name } = this.props.inputValue;
        const { logo, picture } = this.state;
        const params = { unionid, token ,id, name, logo, picture };
        this.setState({  showLoading: true });
        const response = await modifyAgentHttp(params);
        if(response.data.errcode == 0){
            this.setState({  showLoading: false, topTipsType: 'primary', showTopTips: true, topTipsText: `成功` });
            this.stopTopTips();
            this.props.history.goBack();
        }else{
            this.setState({  showLoading: false, topTipsType: 'warn', showTopTips: true, topTipsText: `${ response.data.errmsg }` });
            this.stopTopTips();
        }
    };

    stopTopTips = () => {
        this.state.topTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer)
    }

    render() {
        const { aliPay, showLoading, loadingText, showTopTips, topTipsType, topTipsText } = this.state;
        const { name } = this.props.inputValue;
        const id = this.props.match.params.id;
        return (
            <div>
                { showLoading ? <Toast icon="loading" show={showLoading}><span style={{color:'#fff'}}>{ loadingText }</span></Toast> : null }
                { showTopTips ? <Toptips type={ topTipsType } show={ showTopTips }> { topTipsText } </Toptips> : null }
                <Panel style={{ minHeight: '100vh', paddingBottom: '2rem', background: '#eee' }}>
                    <PanelHeader onClick={() => this.props.history.goBack()} style={{background: '#fff'}}>返回</PanelHeader>
                    <CellsTitle>填写店铺信息</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>店铺名称</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" defaultValue={name} placeholder="请输入店铺名称" onChange={ (e) => this.fnHandleInputChang('name', e.target.value) } />
                            </CellBody>
                        </FormCell>
                    </Form>
                    { id == 'first' ? <ApplicationAgentPayment aliPay={aliPay} fnBankChange={this.fnBankChange} fnGetRadioChange={this.fnGetRadioChange} /> : null }


                    <CellsTitle>分别上传LOGO和店铺图片</CellsTitle>
                    <UploadImg title='分别上传LOGO和店铺图片' fnGetUploadImg={this.fnGetUploadImg} />
                    <ButtonArea>
                        {
                            id === 'first' ? <Button onClick={ this.submitApplication }>提交</Button> : <Button onClick={ this.fnModifyAgentInfo }>修改</Button>
                        }
                    </ButtonArea>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    inputValue: state.inputChangeReducer
});
const mapDispatchToProps = dispatch => ({
    inputHandleChange : bindActionCreators(InputChangeAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplicationAgent));
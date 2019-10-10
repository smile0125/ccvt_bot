import React, {Component} from 'react';
import {CellBody, CellFooter, CellHeader, CellsTitle, Form, FormCell, Input, Label, Panel, Radio, Select, PanelHeader, Button, ButtonArea} from "react-weui";
import BankList from "./assets/bank.jsx";
import {bindActionCreators} from "redux";
import InputChangeAction from "../../redux/action/inputChangeAction.jsx";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {GetCookie} from "../../assets/js/common.jsx";
import { modifyPaymentHttp } from '../../http/http.jsx'

class ApplicationAgentPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aliPay: true,
            bank_name:'支付宝',
            type: 2
        }
    }

    //输入内容
    fnHandleInputChang = (type, val) => {
        const params = {type, val};
        this.props.inputHandleChange(params);
    };

    //选择支付宝或者银行卡
    radioChange = (e) => {
        const val = e.target.value;
        if(val == 2){
            this.setState({aliPay: true, bank_name:'支付宝', type: val})
        }else{
            this.setState({aliPay: false, bank_name: '中国银行', type: val})
        }
        const fnGetRadioChange = this.props.fnGetRadioChange;
        const { bank_name, type } = this.state;
        fnGetRadioChange && fnGetRadioChange(bank_name, type);
    };

    // unionid	string	Y
    // token	string	Y
    // id	int	Y		收款信息的主键id
    // account	string	Y		账号
    // type	int	Y		1:银行卡 2：支付宝
    // bank_name
    fnModifyPayment = async () => {
        const unionid = GetCookie('unionid');
        const token = GetCookie('token');
        const id = this.props.match.params.type;
        const { account } = this.props.inputValue;
        const { type, bank_name } = this.state;
        const params = { unionid, token, id, account, type, bank_name };
        const response = await modifyPaymentHttp(params);
        if(response.data.errcode == 0){
            this.props.history.goBack();
        }
    };

    render() {
        const { account } = this.props.inputValue;
        const { fnBankChange } = this.props;
        const { aliPay } = this.state;
        const show = this.props.match.params.type;
        return (
            <div>
                <Panel style={{background: '#eee'}}>
                    { show ? <PanelHeader onClick={() => this.props.history.goBack()} style={{background: '#fff'}}>返回</PanelHeader> : null }
                <CellsTitle>选择收款账户</CellsTitle>
                <Form radio onChange={ this.radioChange }>
                    <FormCell radio>
                        <CellHeader>
                            <svg className='icon'>
                                <use xlinkHref='#icon-zhifubao'/>
                            </svg>
                        </CellHeader>
                        <CellBody>支付宝</CellBody>
                        <CellFooter>
                            <Radio name="radio1" value="2" defaultChecked/>
                        </CellFooter>
                    </FormCell>
                    <FormCell radio>
                        <CellHeader>
                            <svg className='icon'>
                                <use xlinkHref='#icon-yinhangka'/>
                            </svg>
                        </CellHeader>
                        <CellBody>银行卡</CellBody>
                        <CellFooter>
                            <Radio name="radio1" value="1"/>
                        </CellFooter>
                    </FormCell>
                </Form>

                <CellsTitle>填写收款账户信息</CellsTitle>
                {
                    aliPay ?
                        <Form>
                            <FormCell>
                                <CellHeader>
                                    <Label>支付宝账号</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" defaultValue={account} placeholder="请输入支付宝账号" onChange={ (e) => this.fnHandleInputChang('account', e.target.value) }/>
                                </CellBody>
                            </FormCell>
                        </Form>
                        : <Form>
                            <FormCell select selectPos="after">
                                <CellHeader>
                                    <Label>选择银行</Label>
                                </CellHeader>
                                <CellBody>
                                    <Select data={ BankList } onChange={ fnBankChange } />
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label>银行卡号</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" defaultValue={account} placeholder="请输入银行卡号" onChange={ (e) => this.fnHandleInputChang('account', e.target.value) }/>
                                </CellBody>
                            </FormCell>
                        </Form>
                }
                    {
                        show ?
                            <ButtonArea>
                                <Button onClick={ this.fnModifyPayment }>修改</Button>
                            </ButtonArea>
                            : null
                    }
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplicationAgentPayment));

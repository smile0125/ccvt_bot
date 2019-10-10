import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Form,FormCell,CellHeader,Label,CellBody,Input,CellsTitle,TextArea,ButtonArea,Button,Toast, Dialog} from 'react-weui';
import Address from './address.jsx';
import {Link} from "react-router-dom";
import { GetCookie } from '../../assets/js/common.jsx';
import { SubmitAddress } from '../../http/http.jsx';

class ExchangeInfoEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            showLoading: false,
            showTop: true,
            showDialog: false,
            dialogTitle:'提交成功',
            dialogText:'',
            address:{
                phone:'',
                name:'',
                province:'',
                city:'',
                area:'',
                address:'',
            }
        }
    }

    componentDidMount() {
        const address = JSON.parse(GetCookie('address'));
        address && this.setState({address})
    }

    handleChange = (val, type) => {
        const address = this.state.address;
        address[type] = val;
        this.setState({address});
    };

    //提交地址
    submitAddress = () => {
        const order_id = GetCookie('order_id');
        const token = GetCookie('token');
        const { phone, name, province, city, area, address } = this.state.address;
        const params = { token, order_id, phone, name, province,city,area,address };
        this.submitAddressFunc(params);
    };
    submitAddressFunc = (params) => {
        this.setState({showLoading: true});
        SubmitAddress(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                this.setState({showLoading: false, showDialog: true, dialogTitle:'兑换成功', dialogText: '奖品稍后发货'});
            }else{
                this.setState({showLoading: false, showDialog: false, dialogTitle: '兑换失败', dialogText: '稍后再试'});
            }
        })
    };

    hideDialog = () => {
        window.location.hash='/lottery';
    };

    render() {
        const { phone, name, province, city, area, address } = this.state.address;
        const { showLoading, showDialog, dialogTitle, dialogText } = this.state;
        const bread = <span>
            <Link to='/lottery' className='hight_color'>抽奖</Link>&nbsp;|&nbsp;
            <span>奖品兑换</span>
        </span>;

        const style2 = {
            title: 'Heading',
                buttons: [

                {
                    type: 'primary',
                    label: '继续抽奖',
                    onClick: this.hideDialog
                }
            ]
        };

        return (
            <div>
                { showDialog ? <Dialog type= "ios" title={dialogTitle} buttons= { style2.buttons } show= { showDialog }>{dialogText}</Dialog> : null }
                { showLoading ? <Toast icon="loading" show={ showLoading }/> : null }
                <Page className="article" title="奖品兑换" subTitle={bread}>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>收货人</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" value={ name } onChange={(e) => this.handleChange(e.target.value, 'name')} placeholder="请填写收货人姓名"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>手机号码</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" value={ phone } onChange={(e) => this.handleChange(e.target.value, 'phone')} placeholder="请填写收货人手机号"/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Address address={`${province} ${city} ${area}`} handleChange={this.handleChange} />
                    <CellsTitle>详细地址</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellBody>
                                <TextArea placeholder="街道 楼牌号等" value={ address } onChange={(e) => this.handleChange(e.target.value, 'address')} rows="3"/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <ButtonArea>
                        <Button onClick={this.submitAddress}>提交</Button>
                    </ButtonArea>
                </Page>
            </div>
        );
    }
}

export default ExchangeInfoEdit;
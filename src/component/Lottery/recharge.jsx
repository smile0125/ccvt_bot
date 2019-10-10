import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Link} from "react-router-dom";
import { Form, FormCell, CellBody, CellFooter, Radio, CellsTitle, ButtonArea, Button } from 'react-weui';
import { RechargeCount, SubmitOrder } from '../../http/http.jsx';
import {GetCookie} from "../../assets/js/common.jsx";
import {withRouter} from 'react-router-dom';

class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceList: [],
            price_id:'',
            price:''
        }
    }

    componentDidMount() {
        this.fnRechargeCount()
    }

    //获取充值列表
    fnRechargeCount = () => {
        const token = GetCookie('token');
        const params = {token};
        RechargeCount(params).then(res => {
            if(res.data.errcode == 0){
                const rows = res.data.rows;
                const defaultPrice = rows[rows.length-1];
                this.setState({priceList: rows, price_id: defaultPrice.id, price: defaultPrice.num})
            }
        })
    };

    //选择充值数额
    priceChange = (e, price) => {
        const price_id = e.target.value;
        this.setState({price_id, price})
    };

    //提交订单
    fnSubmitOrder = () => {
        const token = GetCookie('token');
        const {price_id} = this.state;
        const params = { token, price_id };
        SubmitOrder(params).then(res => {
            const code = res.data.errcode;
            if(code == 0){
                const {order_info} = res.data;
                this.fnRechargePay(order_info);
            }
        })
    };

    //支付
    fnRechargePay = (order_info) => {
        const total_amount = parseInt(order_info.price);
        const order_id = order_info.order_number;
        const notify_url = order_info.callback_url;
        const reference_url = "http://bot.fnying.com/#/lottery";
        const shop_name = '充值抽奖次数';
        window.location.href= "http://wx.fnying.com/pay/jsapi.php?total_amount=" + total_amount + "&order_id=" + order_id + "&notify_url=" +
            notify_url + "&shop_name=" + shop_name + "&reference_url=" + encodeURIComponent(reference_url);
    };

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/lottery' className='hight_color'>抽奖</Link>&nbsp;|&nbsp;
            <span>充值</span>
        </span>;
        const {priceList} = this.state;
        return (
            <div>
                <Page className="article" title="充值" subTitle={bread}>
                    <CellsTitle>选择充值数量</CellsTitle>
                    <Form radio>
                        {
                            priceList.map((item, index) => {
                                return(
                                    <FormCell radio key={index}>
                                        <CellBody>{item.price}元 {item.num}次</CellBody>
                                        <CellFooter>
                                            <Radio name="radio1" value={ item.id } defaultChecked onClick={ (e) => this.priceChange(e, item.price) }/>
                                        </CellFooter>
                                    </FormCell>
                                )
                            })
                        }
                    </Form>
                    <ButtonArea>
                        <Button type="primary" onClick={this.fnSubmitOrder}>确认购买</Button>
                        <Button type="default" onClick={ () => this.props.history.push({pathname:'/lottery/recharge/rechargeRecode'}) }>充值记录</Button>
                    </ButtonArea>
                </Page>
            </div>
        );
    }
}

export default withRouter(Recharge);
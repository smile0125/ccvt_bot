import React, {Component} from 'react';
import {MediaBox,MediaBoxBody,MediaBoxDescription,MediaBoxHeader,MediaBoxTitle, Panel, PanelHeader, PanelBody, Dialog} from 'react-weui';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import InputChangeAction from "../../redux/action/inputChangeAction.jsx";
import SubmitOrderAction from "./action/submitOrderAction.jsx";
import { SetCookie, GetCookie } from '../../assets/js/common.jsx';
import '../../assets/css/payOrder.scss';

class PayOrder extends Component {
    constructor(props) {
        super(props);
        this.state={
            shopDetail:'',
            buyCount:'',
            payDialog: false,
            order_info: {order_number:'', price:''}
        }
    }

    componentDidMount() {
        const shopDetail = this.props.location.shopDetail;
        const buyCount = this.props.inputValue.buyCount;
        if(shopDetail){
            SetCookie('shopDetail', JSON.stringify(shopDetail));
            SetCookie('buyCount', buyCount);
            this.setState({shopDetail, buyCount})
        }else{
            const shopDetail = JSON.parse(GetCookie('shopDetail'));
            const buyCount = GetCookie('buyCount');
            this.setState({shopDetail, buyCount})
        }
    }

    //改变数量
    fnChangeCount = (changeType, type) => {
        const buyCount = this.state.buyCount;
        if(changeType == 'add'){
            let val = parseInt(buyCount) + 1;
            this.setState({buyCount: val})
        }else{
            if(parseInt(buyCount) <=1 ){
                return
            }
            let val = parseInt(buyCount) - 1;
            this.setState({buyCount: val})
        }
    };

    countChange = (type, val) => {
        const params = { type, val };
        this.props.inputHandleChange(params);
    };

    //提交订单
    fnSubmitOrder = () => {
        const address = this.props.location.address;
        if(!address){
            alert('请选择收货地址');
            return
        }

        const shop_id = GetCookie('shop_id');
        const agent_id = GetCookie('agent_id');
        const token = GetCookie('token');
        const unionid = GetCookie('unionid');
        const num = this.state.buyCount;
        const address_id = address.id;
        const params = {shop_id, unionid, num, address_id, agent_id, token};
        this.props.submitOrder(params, () => {
            // console.log(this.props.orderInfo);
            this.setState({payDialog: true, order_info: this.props.orderInfo.order_info});

        });
    };

    //支付
    startPay = () => {
        const { order_info, shopDetail } = this.state;
        const total_amount = parseInt(order_info.price);
        const order_id = order_info.order_number;
        const notify_url = order_info.callback_url;
        const reference_url = "http://bot.fnying.com/#/mall/myOrder";
        const shop_name = shopDetail.name;
        window.location.href= "http://wx.fnying.com/pay/jsapi.php?total_amount=" + total_amount + "&order_id=" + order_id + "&notify_url=" +
            notify_url + "&shop_name=" + shop_name + "&reference_url=" + encodeURIComponent(reference_url);
    };

    render() {
        const address = this.props.location.address;
        const { shopDetail,buyCount, payDialog } = this.state;
        const { order_number, price } = this.state.order_info;
        const style1={
            title: '下单成功',
            buttons: [
                {
                    label: '支付',
                    onClick: this.startPay
                }
            ]
        };
        return (
            <div>
                {
                    payDialog ?
                        <Dialog type="ios" title={style1.title} buttons={style1.buttons} show={true}>
                            <p style={{lineHeight:'2', color:'#888'}}>订单号：{ order_number }</p>
                            <p style={{lineHeight:'2', color:'red'}}>金额：{ price }</p>
                        </Dialog>
                        : null
                }
                <Panel className='payOrder'>
                    <PanelHeader onClick={ () => this.props.history.goBack() }>返回</PanelHeader>
                    <PanelBody className='payOrder_body'>
                        <div id="addressDefault" className="address_defalut address_border" onClick={() => this.props.history.push({pathname: '/mall/goods/addressList/true'})}>
                            {
                                address ?
                                    <ul className='address_default_info'>
                                        <li><strong>{ address.name } { address.phone }</strong></li>
                                        <li className='payOrder_body-address'>{ address.province } { address.city } { address.area } { address.address }</li>
                                    </ul>
                                    : <ul className='address_default_info'>
                                        <li><strong>选择地址</strong></li>
                                    </ul>
                            }
                        </div>
                        <MediaBox type="appmsg">
                            <MediaBoxHeader className='goods-left-img'>
                                <img src={ require('../../assets/img/jxc-goods.jpg') } alt=""/>
                            </MediaBoxHeader>
                            <MediaBoxBody>
                                {
                                    shopDetail ?
                                        <MediaBoxTitle className='goodsList-price-name'>
                                            <div style={{overflow: 'hidden'}}>
                                                <p><i className='mod_tag'>新品</i><i className='mod_tag' style={{background: '#3fe2eb'}}>{ shopDetail.name }</i>持续薄荷酷爽，强劲击喉，尽情享受舒爽清新时刻</p>
                                            </div>
                                            <div className='section_price'>
                                                <span className="price">¥ <span className="int">{ shopDetail.price }</span></span>

                                                <div id="modifyNumDom" className="num_wrap">
                                                    <span className="minus" onClick={ (e) => this.fnChangeCount('reduce', 'buyCount') } />
                                                    <input className="num" type="tel" value={ buyCount } onChange={(e) => this.countChange('buyCount', e.target.value)}/>
                                                    <span className="plus" onClick={ (e) => this.fnChangeCount('add', 'buyCount') }/>
                                                </div>
                                            </div>
                                        </MediaBoxTitle>
                                        : null
                                }
                                <MediaBoxDescription/>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
                {
                    shopDetail ?
                        <div className='payOrder_money'>
                            <ul className="buy_chart">
                                <li className="buy_chart_item">
                                    <p className="buy_chart_item_text">商品单价</p>
                                    <p className="buy_chart_item_price">¥&nbsp;{ shopDetail.price }</p>
                                </li>
                                <li className="buy_chart_item">
                                    <p className="buy_chart_item_text">商品数量</p>
                                    <p className="buy_chart_item_price">¥&nbsp;{ buyCount }</p>
                                </li>
                                <li className="buy_chart_item">
                                    <p className="buy_chart_item_text">运费</p>
                                    <p className="buy_chart_item_price"> +&nbsp;¥0.00 </p>
                                </li>
                            </ul>
                            <p className="actual_price">实付金额： <strong id="pageTotalPrice" price="1246.00">¥{ parseInt(shopDetail.price) * parseInt(buyCount) }</strong></p>
                            <button className='onlinePay' onClick={this.fnSubmitOrder}>提交订单</button>
                        </div>:null
                }

            </div>
        );
    }
}

const mapStateToProps = state => ({
    inputValue: state.inputChangeReducer,
    orderInfo: state.submitOrderReducer
});
const mapDispatchToProps = dispatch => ({
    inputHandleChange : bindActionCreators(InputChangeAction, dispatch),
    submitOrder : bindActionCreators(SubmitOrderAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PayOrder));
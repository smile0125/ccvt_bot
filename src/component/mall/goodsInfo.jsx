import React, {Component} from 'react';
import '../../assets/css/goodsInfo.scss';
import {Panel, PanelHeader, Form, FormCell, CellHeader, Label, CellBody, Input, Toptips} from "react-weui";
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from "redux";
import shopDetailAction from "./action/shopDetailAction.jsx";
import { SetCookie, GetCookie } from '../../assets/js/common.jsx';
import { connect } from 'react-redux';
import InputChangeAction from "../../redux/action/inputChangeAction.jsx";

class GoodsInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            showTopTips: false,
            topTipsText: '',
            topTipsType: 'warn',
            topTipsTimer: null
        }
    }

    componentDidMount() {
        /*获取商品详情
        *@params{shop_id: 商品id, store_id: 店铺id, agent_id: 代理id}
         */
        const shop_id = this.props.match.params.id;
        const store_id = GetCookie('store_id');
        const agent_id = GetCookie('agent_id');
        SetCookie('shop_id', shop_id);
        const params = { shop_id, store_id, agent_id };
        this.props.shopDetail(params);
    }


    //购买数量
    buyCountChange = (type, val) => {
        const params = { type, val };
        this.props.inputHandleChange(params);
    };

    //购买
    handleBuy = (rows) => {
      const buyCount = this.props.inputValue.buyCount;
      const goodsInfo = this.props.reducerState.rows;
      if(buyCount <= 0){
          this.setState(() => ({ showTopTips:true, topTipsText: '请输入正确的购买数量', topTipsType: 'warn' }));
          this.stopTopTips();
          return
      }
      if(buyCount > parseInt(goodsInfo.inventory)){
          this.setState(() => ({ showTopTips:true, topTipsText: '没有更多库存', topTipsType: 'warn' }));
          this.stopTopTips();
          return
      }

      rows.buyCount = buyCount;
      this.props.history.push({ pathname: '/mall/goods/payOrder', shopDetail:rows });

    };

    //取消提示
    stopTopTips = () => {
        this.state.topTipsTimer = setTimeout(()=> {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.stopTopTips)
    }

    render() {
        const {  showTopTips, topTipsText, topTipsType } = this.state;
        const rows = this.props.reducerState.rows;
        const buyCount = this.props.inputValue.buyCount;
        return (
            <div id='goods-info'>
                { showTopTips ? <Toptips type={ topTipsType } show={ showTopTips }>{ topTipsText }</Toptips> : null }
                <Panel className='goods-info-panel'>
                    <PanelHeader onClick={ () => this.props.history.goBack() }>返回</PanelHeader>
                    <div className='goods-info-img'>
                        <img src={require('../../assets/img/jxc-goods.jpg')} alt=""/>
                    </div>
                    <div className='goods-info-priceBlock'>
                        <span className="price large_size" id="priceSale">¥<em>{ rows.price }</em></span>
                        <span className='origin_price'>¥ { rows.old_price }</span>
                    </div>
                    <div className='goods-info-name'>
                        <p><i className='mod_tag'>{ rows.name }</i> { rows.describes } </p>
                        <p className='sales'>销量：{rows.sales}件</p>
                        <p className='sales'>库存：{rows.inventory}件</p>
                    </div>
                    <div>
                        <Form>
                            <FormCell>
                                <CellHeader>
                                    <Label>数量</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="tel" value={ buyCount } onChange={ (e) => this.buyCountChange('buyCount', e.target.value) } />
                                </CellBody>
                            </FormCell>
                        </Form>
                    </div>
                    <div className='buy-btn-box'>
                        <button className='buy-btn' onClick={ () => this.handleBuy(rows) }>立即购买</button>
                    </div>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducerState: state.shopDetailReducer,
    inputValue: state.inputChangeReducer
});
const mapDispatchToProps = dispatch => ({
    shopDetail: bindActionCreators(shopDetailAction, dispatch),
    inputHandleChange : bindActionCreators(InputChangeAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoodsInfo));
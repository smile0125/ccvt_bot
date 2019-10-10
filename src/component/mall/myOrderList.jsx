import React, {Component} from 'react';
import { Cell, CellBody, CellFooter, MediaBox, MediaBoxBody, MediaBoxHeader, MediaBoxTitle, Panel, PanelBody, PanelFooter, PanelHeader, Toptips } from "react-weui";
import { GetCookie } from '../../assets/js/common.jsx';
import { receiveHttp } from '../../http/http.jsx';

class MyOrderList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            showTopTips: false,
            topTipsText: '',
            topTipsType: 'warn',
            topTipsTimer: null
        }
    }

    //领取CCVT
    fnReceive = async (id) => {
        const order_id = id;
        const token = GetCookie('token');
        const unionid = GetCookie('unionid');
        const params = { token, unionid, order_id };
        const response = await receiveHttp(params);
        // console.log(response);
        if(response.data.errcode === '120'){
            window.location.href = `http://wx.fnying.com/ahino/index_login.php?url=${encodeURIComponent(window.location.href)}`;
        }
        if(response.data.errcode === '0' ){
            this.setState({ showTopTips: true , topTipsText: '成功', topTipsType: 'primary'});
            this.stopTopTips();
        }else{
            this.setState({ showTopTips: true , topTipsText: response.data.errmsg});
            this.stopTopTips();
        }
    };

    //取消提示
    stopTopTips = () => {
        this.state.topTipsTimer = setTimeout(()=> {
            this.setState({showTopTips: false});
        }, 2000);
    };

    render() {
        const myOrderList = this.props.orderList;
        const {  showTopTips, topTipsText, topTipsType } = this.state;
        const toPayStyle = {
                color: '#fff',
                background: 'rgb(233, 59, 61)',
                padding: '1px 5px',
                borderRadius: '2px'
        };
        return (
            <section>
                { showTopTips ? <Toptips type={ topTipsType } show={ showTopTips }>{ topTipsText }</Toptips> : null }
                {
                    myOrderList ?
                    myOrderList.map((item, index) => {
                        return(
                            <Panel style={{marginBottom: '1rem', background:'#fff'}} key={index}>
                                <PanelHeader>
                                    <div className='my-order-top'>
                                        <span>{ item.name }</span>
                                        <span style={{color: '#e93b3d'}}>{
                                            item.state === '0' ? <span><span style={{color: '#e93b3d'}}>待支付</span>&nbsp;&nbsp;<span style={toPayStyle}>去支付</span></span> :
                                                (item.state === '1' ? '已支付' : (item.state === '2' ? '已完成' : '支付超时')) }
                                        </span>
                                    </div>
                                </PanelHeader>
                                <PanelBody>
                                    <MediaBox type="appmsg" href="javascript:void(0);" key={item.id} onClick={this.toGoodsInfo}>
                                        <MediaBoxHeader className='goods-left-img'>
                                            <img src={ require('../../assets/img/jxc-goods.jpg') } alt=""/>
                                        </MediaBoxHeader>
                                        <MediaBoxBody>
                                            <MediaBoxTitle className='goodsList-price-name'>
                                                <div style={{overflow: 'hidden'}}>
                                                    <p className='my-order-goods-name'>持续薄荷酷爽，强劲击喉，尽情享受舒爽清新时刻</p>
                                                </div>
                                                <div className='goodsList-price' style={{ fontSize: '13px' }}>
                                                    数量：x{ item.num }&nbsp;
                                                    实际付款：
                                                    <span className="price">¥ <span className="int">{ item.price }</span></span>
                                                    <p style={{color: '#888', fontSize: '12px'}}>下单时间：{ item.ctime }</p>
                                                    {
                                                        item.pay_time ? <p style={{color: '#888'}}>支付时间：{ item.pay_time }</p> : null
                                                    }
                                                </div>
                                            </MediaBoxTitle>
                                            {/*<MediaBoxDescription>金小草旗舰店</MediaBoxDescription>*/}
                                        </MediaBoxBody>
                                    </MediaBox>
                                </PanelBody>
                                <PanelFooter>
                                    <Cell link>
                                        <CellBody>
                                            <p style={{fontSize: '14px', color: '#888'}}>奖励：{ item.give_ccvt_num } CCVT</p>
                                        </CellBody>
                                        <CellFooter>
                                            <p onClick={ item.is_receive === '0' ? () => this.fnReceive(item.id) : null } style={{fontSize: '14px', color: 'green'}}>{ item.is_receive === '0' ? '领取' : '已领取' }</p>
                                        </CellFooter>
                                    </Cell>
                                </PanelFooter>
                            </Panel>
                        )
                    }) : <Panel style={{marginBottom: '1rem', background:'#fff'}}>
                            <PanelHeader/>
                            <PanelBody>
                                <MediaBox type="appmsg" href="javascript:void(0);">
                                    <MediaBoxHeader/>
                                    <MediaBoxBody>
                                        暂无数据
                                    </MediaBoxBody>
                                </MediaBox>
                            </PanelBody>
                        </Panel>
                }
            </section>
        );
    }
}

export default MyOrderList;
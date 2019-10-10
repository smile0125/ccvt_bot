import React, {Component} from 'react';
import { Panel, PanelHeader, PanelBody, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription } from 'react-weui';
import {withRouter} from 'react-router-dom';
import '../../assets/css/goodsList.scss';
import { connect } from 'react-redux';

class GoodsList extends Component {
    //前往商品详情
    toGoodsInfo = (id) => {
        this.props.history.push({pathname:`/mall/goods/goodsInfo/${id}`})
    };

    render() {
        const { shop_list } = this.props.reducerState.rows;
        return (
            <div id='goodsList'>
                <Panel>
                    {/*<PanelHeader onClick={ () => this.props.history.goBack() }>返回</PanelHeader>*/}
                    <PanelBody>
                        {
                            shop_list.map((item, index) => {
                                return (
                                    <MediaBox type="appmsg" href="javascript:void(0);" key={item} onClick={ () => this.toGoodsInfo(item.id) }>
                                        <MediaBoxHeader className='goods-left-img' style={{ background: `${ item.picture ? (item.picture.match('jpg') ? item.picture : 'rgb(63, 226, 235)') : 'rgb(63, 226, 235)' }` }}>
                                            {/*<img src={ require('../../assets/img/jxc-goods.jpg') } alt=""/>*/}
                                            {/*<img src={ `${ item.picture ? (item.picture.match('jpg') ? item.picture : 'rgb(63, 226, 235)') : 'rgb(63, 226, 235)' }` } alt=""/>*/}
                                        </MediaBoxHeader>
                                        <MediaBoxBody>
                                            <MediaBoxTitle className='goodsList-price-name'>
                                                <div style={{overflow: 'hidden'}}>
                                                    <p><i className='mod_tag'>新品</i><i className='mod_tag' style={{background: '#3fe2eb'}}>{ item.name }</i>{ item.describes }</p>
                                                </div>
                                                <div className='section_price'>
                                                    <span className="price">¥ <span className="int">{ item.price }</span></span>
                                                    <span className='origin_price'>¥ { item.old_price }</span>
                                                </div>
                                            </MediaBoxTitle>
                                            <MediaBoxDescription>
                                                销量：{ item.sales }件  库存：{ item.inventory }件
                                            </MediaBoxDescription>
                                        </MediaBoxBody>
                                    </MediaBox>
                                )
                            })
                        }
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducerState: state.getShopListReducer
});

export default connect(mapStateToProps)(withRouter(GoodsList));
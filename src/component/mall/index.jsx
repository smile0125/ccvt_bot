import React, { Component } from 'react';
import { Panel, PanelHeader, PanelBody, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription } from 'react-weui';
import { withRouter } from 'react-router-dom';
import '../../assets/css/merchants.scss';
import GoodsList from './goodsList.jsx';
import { connect } from 'react-redux';
import getShopListAction from './action/getShopListAction.jsx';
import { bindActionCreators } from 'redux';
import {GetCookie} from "../../assets/js/common.jsx";

class Index extends Component{
    constructor(props) {
        super(props);
        this.state={
            shopListArr:[1]
        }
    }

    componentDidMount() {
        /*
        *获取商家列表
        * @params{ store_id-店铺id, agent_id-代理id }
        * */
        const store_id = GetCookie('store_id');
        const agent_id = GetCookie('agent_id');
        const params = { store_id, agent_id };
        this.props.getShopList(params);

    }

    render(){
        const { store }  = this.props.reducerState.rows;
        return (
            <div>
                <Panel style={{marginBottom:'0.5rem'}}>
                    <PanelHeader className='merchants-top'>
                        {/*<span className='merchants-top_logo' style={{backgroundImage: `url(${jxcLogo})`}}>*/}
                        <span className='merchants-top_logo' style={{background: `${ store.picture ? (store.picture.match('jpg') ? store.picture : 'rgb(63, 226, 235)') : 'rgb(63, 226, 235)' }`}}>
                        </span>
                        <div className='merchants-top_name'>
                            <p><i className='mod_tag'>店铺</i>{ store.name }</p>
                        </div>
                        {/*<span className='merchants-top_into'>进店</span>*/}
                        <div className="follow_panel">
                            {/*<div id="wd_shop_unfav_btn" onClick={fnFollow} className={follow ? 'follow default_follow' : 'is_follow default_follow'}>*/}
                            {/*{ follow ? '收藏' : '已收藏' }*/}
                            {/*</div>*/}
                            {/*<div className="follow_number">1635万人收藏</div>*/}
                        </div>
                    </PanelHeader>
                </Panel>
                <GoodsList/>
            </div>
    )
     }
}

const mapStateToProps = state => ({
    reducerState: state.getShopListReducer
});
const mapDispatchToProps = dispatch => ({
    getShopList: bindActionCreators(getShopListAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));
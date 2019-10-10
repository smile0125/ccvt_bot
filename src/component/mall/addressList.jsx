import React, {Component} from 'react';
import {Panel, PanelHeader, PanelBody, MediaBox, MediaBoxTitle, MediaBoxDescription} from "react-weui";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addressListAction from './action/addressListAction.jsx';
import deleteAddressAction from './action/deleteAddressAction.jsx';
import '../../assets/css/addressList.scss';
import {GetCookie} from "../../assets/js/common.jsx";

class AddressList extends Component {
    componentDidMount() {
        this.fnGetAddressList();
    }

    //获取地址列表
    fnGetAddressList = () => {
        const unionid = GetCookie('unionid');
        const params = {unionid};
        this.props.getAddressList(params);
    };

    //删除地址
    fnDeleteAddress = id => {
        this.props.deleteAddress({ id }, this.fnGetAddressList)
    };

    render() {
        const { rows } = this.props.reducerState;
        const type = this.props.match.params.type;
        return (
            <div id='addressList'>
                <Panel className='goods-info-panel'>
                    <PanelHeader onClick={ () => this.props.history.goBack() }>返回</PanelHeader>
                    <PanelBody>
                        {
                            rows ? rows.map(item => {
                                return(
                                    <MediaBox type="text" key={item.id}>
                                        <MediaBoxTitle className='address_item_header'>
                                            <span  onClick={ type=='true' ? () => this.props.history.push({pathname: '/mall/goods/payOrder', address: item}) : null }>
                                                { item.is_default === "1" ? <i className="mod_tag">默认</i> : null }
                                                { item.name } { item.phone }</span>
                                            <div>
                                                <svg className="icon" aria-hidden="true" onClick={() => this.props.history.push({pathname: `/mall/goods/address/${item.id}`})}>
                                                    <use xlinkHref="#icon-bianji"></use>
                                                </svg>
                                                &nbsp;&nbsp;&nbsp;
                                                <svg className="icon" aria-hidden="true" onClick={ () => this.fnDeleteAddress(item.id) }>
                                                    <use xlinkHref="#icon-shanchu"></use>
                                                </svg>
                                            </div>
                                        </MediaBoxTitle>
                                        <MediaBoxDescription>
                                            { item.province } { item.city } { item.area } { item.address }
                                        </MediaBoxDescription>
                                    </MediaBox>
                                )
                            }) : null
                        }
                    </PanelBody>
                    <div className='addAddressBtnBox'>
                        <span className='addAddressBtn' onClick={() => this.props.history.push({pathname: '/mall/goods/address/newAddress'})}>+ 新建收货地址</span>
                    </div>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducerState: state.addressListReducer,
});
const mapDispatchToProps = dispatch => ({
    getAddressList: bindActionCreators(addressListAction, dispatch),
    deleteAddress: bindActionCreators(deleteAddressAction, dispatch)//删除地址
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddressList));
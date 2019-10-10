import React, {Component} from 'react';
import { Tab, NavBar, Panel, NavBarItem, TabBody, Article, PanelHeader, PanelBody, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription, PanelFooter, Cell, CellBody, CellFooter } from 'react-weui';
import MyOrderList from './myOrderList.jsx';
import '../../assets/css/myOrder.scss';
import {GetCookie} from "../../assets/js/common.jsx";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import getMyOrderListAction from './action/getMyOrderListAction.jsx';

class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.state={
            myOrderList: [1,2,3,4,5,6],
            tab: 0
        }
    }

    componentDidMount() {
        this.fnGetMyOrderList(0);
    }

    //获取我的订单列表
    fnGetMyOrderList = (state) => {
        this.setState({tab: state	});
        if(state === 0){
            state = '';
        }
        const unionid = GetCookie('unionid');
        const params = { unionid, state};
        this.props.getMyOrder(params)
    };

    render() {
        const { listAll, listPay, listCompleted } = this.props.myOrderList;
        const { tab } = this.state;
        return (
            <div>
                <Tab>
                    <NavBar style={{ position: 'fixed', top: '0', left: '0' }}>
                        <NavBarItem active={tab === 0} onClick={ () => this.fnGetMyOrderList(0) }>全部</NavBarItem>
                        <NavBarItem active={tab === 1} onClick={ () => this.fnGetMyOrderList(1) }>已支付</NavBarItem>
                        <NavBarItem active={tab === 2} onClick={ () => this.fnGetMyOrderList(2) }>已完成</NavBarItem>
                    </NavBar>
                    <TabBody>
                        <div>
                            <MyOrderList orderList = { tab === 0 ? listAll : (tab === 1 ? listPay : listCompleted) }/>
                        </div>
                    </TabBody>
                </Tab>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    myOrderList: state.getMyOrderListReducer
    });

const mapDispatchToProps = dispatch => ({
    getMyOrder: bindActionCreators(getMyOrderListAction, dispatch)
    });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyOrder));
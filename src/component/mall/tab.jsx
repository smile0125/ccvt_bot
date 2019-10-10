import React, {Component} from 'react';
import Index from './index.jsx';
import MyOrder from './myOrder.jsx';
import Merchants from './merchants.jsx';
import {NavLink} from 'react-router-dom';
import { checkIsAgentAction } from './action/checkIsAgentAction.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SetCookie, GetCookie } from '../../assets/js/common.jsx';
import '../../assets/css/goodsTab.scss';

class TabToggle extends Component {
    constructor(props) {
        super(props);
        this.state={
            store_id: '',
            agent_id: '',
        }
    }

    componentDidMount() {
        this.fnGetSearchQuery();
    }

    fnGetSearchQuery = () => {
        const search = this.props.location.search;
        if (search.match('store_id')){
            const search = this.props.location.search.split('?')[1].split('&');
            const store_id = search[0].split('=')[1];
            const agent_id = search[1].split('=')[1];
            SetCookie('store_id', store_id);
            SetCookie('agent_id', agent_id);
            this.setState({ store_id, agent_id });
            /*
        * 判断store_id和agent_id是否相等。
        * 如果相等在判断是否为代理商（is_agent  1:是代理商  0：不是）
        * 如果不是代理商将隐藏商家按钮
        * */
            if(store_id === agent_id){
                const unionid = GetCookie('unionid');
                const params = { unionid };
                this.props.fnCheckIsAgent(params);
            }
        }else{
            const store_id = GetCookie('store_id');
            const agent_id = GetCookie('agent_id');
            this.setState({ store_id, agent_id });
        }
    };

    switchGoodsRender = () => {
        const pathname = this.props.location.pathname;
        switch (pathname) {
            case '/mall' :
                return <Index/>;
                case '/mall/myOrder' :
                return <MyOrder/>;
                case '/mall/merchants' :
                return <Merchants/>;
            default: return <Index/>;
        }
    };

    render() {
        const { is_agent } = this.props.reducerState;
        const { store_id, agent_id } = this.state;
        console.log(agent_id);
        const pathname = this.props.location.pathname;
        return (
            <div>
                <div className='tab-content'>
                    { this.switchGoodsRender() }
                </div>
                <div className='tab'>
                    <NavLink className={ pathname === '/mall' ? 'tabItemNav active' : 'tabItemNav' } to={`/mall?store_id=${store_id}&agent_id=${agent_id}`}>商品</NavLink>
                    <NavLink className='tabItemNav' exact to={'/mall/myOrder'}>订单</NavLink>
                    { is_agent === 1 ? <NavLink className='tabItemNav' exact to={'/mall/merchants'}>商家</NavLink> :  null }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducerState: state.checkIsAgentReducer
});
const mapDispatchToProps = dispatch => ({
    //判断是否为代理商
    fnCheckIsAgent: bindActionCreators(checkIsAgentAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TabToggle);
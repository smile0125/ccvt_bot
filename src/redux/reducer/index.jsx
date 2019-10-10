import { combineReducers } from 'redux';
import checkIsAgentReducer from '../../component/mall/reducer/checkIsAgentReducer.jsx'
import getShopListReducer from '../../component/mall/reducer/getShopListReducer.jsx'
import shopDetailReducer from '../../component/mall/reducer/shopDetailReducer.jsx'
import addEditAddressReducer from '../../component/mall/reducer/addEditAddressReducer.jsx'
import addressListReducer from '../../component/mall/reducer/addressListReducer.jsx'
import submitOrderReducer from '../../component/mall/reducer/submitOrderReducer.jsx'
import getMyOrderListReducer from '../../component/mall/reducer/getMyOrderListReducer.jsx'
import merchantsInfoReducer from '../../component/mall/reducer/merchantsInfoReducer.jsx'
import inputChangeReducer from '../reducer/inputChangeReducer.jsx';
const rootReducer = combineReducers({
    checkIsAgentReducer,
    getShopListReducer,
    shopDetailReducer,
    inputChangeReducer,
    addEditAddressReducer,
    addressListReducer,
    submitOrderReducer,
    getMyOrderListReducer,
    merchantsInfoReducer,
});
export default rootReducer;
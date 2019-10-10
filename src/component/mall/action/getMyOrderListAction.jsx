import { GET_MY_ORDER_LIST_ALL, GET_MY_ORDER_LIST_PAY, GET_MY_ORDER_LIST_COMPLETED } from '../../../redux/action/actionTypes.jsx';
import { getMyOrderListHttp } from '../../../http/http.jsx';

const getMyOrderListAllType = data => ({ type: GET_MY_ORDER_LIST_ALL, payload: data });
const getMyOrderListPayType = data => ({ type: GET_MY_ORDER_LIST_PAY, payload: data });
const getMyOrderListCompletedType = data => ({ type: GET_MY_ORDER_LIST_COMPLETED, payload: data });
const getMyOrderListAction = params => async dispatch => {
    const response = await getMyOrderListHttp(params);
    const { state } = params;
    if(response.data.errcode === '0'){
        const data = response.data;
        let action = '';
        if(state === ''){
            action = getMyOrderListAllType(data);
        }else if(state === 1){
            action = getMyOrderListPayType(data);
        }else if(state === 2){
            action = getMyOrderListCompletedType(data);
        }

        dispatch(action)
    }
};
export default getMyOrderListAction;
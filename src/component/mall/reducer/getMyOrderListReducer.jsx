import { GET_MY_ORDER_LIST_ALL, GET_MY_ORDER_LIST_PAY, GET_MY_ORDER_LIST_COMPLETED } from '../../../redux/action/actionTypes.jsx';
const initialState = {
        listAll: [],
        listPay: [],
        listCompleted: [],
    };

const getMyOrderListReducer = (state = initialState, action) => {
    let new_state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_MY_ORDER_LIST_ALL:
            new_state.listAll = action.payload.rows;
            new_state.a = 200;
            return new_state;
        case GET_MY_ORDER_LIST_PAY:
            new_state.listPay = JSON.parse(JSON.stringify(action.payload.rows));
            return new_state;
        case GET_MY_ORDER_LIST_COMPLETED:
            new_state.listCompleted = JSON.parse(JSON.stringify(action.payload.rows));
            return new_state;
        default:
            return state
    }
};
export default getMyOrderListReducer;
import { ADDRESS_LIST } from '../../../redux/action/actionTypes.jsx';
const initialState = {};

const addressListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDRESS_LIST:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
};
export default addressListReducer;
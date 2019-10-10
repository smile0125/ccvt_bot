import { SHOP_DETAIL } from '../../../redux/action/actionTypes.jsx';
const initialState = {
    rows: {},
};

const shopDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOP_DETAIL:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
};
export default shopDetailReducer;
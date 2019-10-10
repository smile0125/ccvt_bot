import { GET_SHOP_LIST } from '../../../redux/action/actionTypes.jsx';
const initialState = {
    rows: {
        store: {},
        shop_list: []
    }
};

const getShopListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOP_LIST:
            return Object.assign({}, state, action.payload);
        default: return state
    }
};
export default getShopListReducer;
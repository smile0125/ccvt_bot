import { MERCHANTS_INFO } from '../../../redux/action/actionTypes.jsx';
const initialState = {

    };

const merchantsInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case MERCHANTS_INFO:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
};
export default merchantsInfoReducer;
import { SUBMIT_ORDER } from '../../../redux/action/actionTypes.jsx';
const initialState = {

};

const submitOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_ORDER:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
};
export default submitOrderReducer;
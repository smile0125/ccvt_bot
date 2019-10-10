import { ADD_EDIT_ADDRESS } from '../../../redux/action/actionTypes.jsx';
const initialState = {

};

const addEditAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EDIT_ADDRESS:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
};
export default addEditAddressReducer;
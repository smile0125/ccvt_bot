import { ADD_EDIT_ADDRESS } from '../../../redux/action/actionTypes.jsx';
import { addEditAddressHttp } from '../../../http/http.jsx';

const addEditAddressType = data => ({ type: ADD_EDIT_ADDRESS, payload: data });
const addEditAddressAction = (params, callback) => async dispatch => {
    const response = await addEditAddressHttp(params);
    if(response.data.errcode === '0'){
        callback();
        const data = response.data;
        const action = addEditAddressType(data);
        dispatch(action);
    }
};
export default addEditAddressAction;
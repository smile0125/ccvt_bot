import { DELETE_ADDRESS } from '../../../redux/action/actionTypes.jsx';
import { deleteAddressHttp } from '../../../http/http.jsx';

const deleteAddressType = data => ({ type: DELETE_ADDRESS, payload: data });
const deleteAddressAction = (params, fn) => async dispatch => {
    const response = await deleteAddressHttp(params);
    if(response.data.errcode === '0'){
        fn();
        const data = response.data;
        const action = deleteAddressType(data);
        dispatch(action);
    }
};
export default deleteAddressAction;
import { ADDRESS_LIST } from '../../../redux/action/actionTypes.jsx';
import { addressListHttp } from '../../../http/http.jsx';

const addressListType = data => ({ type: ADDRESS_LIST, payload: data });
const addressListAction = (params) => async dispatch => {
    const response = await addressListHttp(params);
    if(response.data.errcode === '0'){
        const data = response.data;
        const action = addressListType(data);
        dispatch(action);
    }
};
export default addressListAction;
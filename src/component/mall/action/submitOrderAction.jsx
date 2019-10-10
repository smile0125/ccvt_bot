import { SUBMIT_ORDER } from '../../../redux/action/actionTypes.jsx';
import { submitOrderHttp } from '../../../http/http.jsx';

const submitOrderType = data => ({ type: SUBMIT_ORDER, payload: data });
const submitOrderAction = (params, callback) => async dispatch => {
    const response = await submitOrderHttp(params);
    if(response.data.errcode === '0'){
        const data = response.data;
        const action = submitOrderType(data);
        dispatch(action);
        callback();
    }
};
export default submitOrderAction;
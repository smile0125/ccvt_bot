import { MERCHANTS_INFO } from '../../../redux/action/actionTypes.jsx';
import { getMerchantsInfoHttp } from '../../../http/http.jsx';

const merchantsInfoType = data => ({ type: MERCHANTS_INFO, payload: data });
const merchantsInfoAction = (params) => async dispatch => {
    const response = await getMerchantsInfoHttp(params);
    if(response.data.errcode === '0'){
        const data = response.data;
        const action = merchantsInfoType(data);
        dispatch(action);
    }
};
export default merchantsInfoAction;
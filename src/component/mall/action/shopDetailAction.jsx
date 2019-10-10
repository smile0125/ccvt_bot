import { SHOP_DETAIL } from '../../../redux/action/actionTypes.jsx';
import { shopDetailHttp } from '../../../http/http.jsx';

const shopDetailType = data => ({ type: SHOP_DETAIL, payload: data });
const shopDetailAction = params => async dispatch => {
    const response = await shopDetailHttp(params);
    if(response.data.errcode === '0'){
        const data = response.data;
        const action = shopDetailType(data);
        dispatch(action);
    }
};
export default shopDetailAction;
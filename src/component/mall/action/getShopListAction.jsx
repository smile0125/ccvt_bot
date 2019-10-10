import { GET_SHOP_LIST } from '../../../redux/action/actionTypes.jsx';
import { getShopListHttp } from '../../../http/http.jsx';

const getShopListType = data => ({ type: GET_SHOP_LIST, payload: data });
const getShopListAction = params => async dispatch => {
    const response = await getShopListHttp(params);
    if(response.data.errcode === "0"){
        const data = response.data;
        const action = getShopListType(data);
        dispatch(action);
    }

};
export default getShopListAction;
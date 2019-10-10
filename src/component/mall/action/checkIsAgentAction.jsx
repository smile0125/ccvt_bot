import { CHECK_IS_AGENT } from '../../../redux/action/actionTypes.jsx';
import { checkIsAgentHttp } from '../../../http/http.jsx';

const checkIsAgentType = data => ({ type: CHECK_IS_AGENT, payload: data });
export const checkIsAgentAction = params => async dispatch => {
    const response = await checkIsAgentHttp(params);
    if(response.data.errcode === "0"){
        const data = response.data;
        const action = checkIsAgentType(data);
        dispatch(action);
    }
};
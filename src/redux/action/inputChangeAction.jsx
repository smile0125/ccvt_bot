import { INPUT_CHANGE } from './actionTypes.jsx';
const inputChangeType = data => ({ type: INPUT_CHANGE, payload: data });
const inputChangeAction = params => dispatch => {
    const action = inputChangeType(params);
    dispatch(action);
};
export default inputChangeAction;
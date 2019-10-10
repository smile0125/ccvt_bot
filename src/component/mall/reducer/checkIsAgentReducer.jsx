import { CHECK_IS_AGENT } from '../../../redux/action/actionTypes.jsx';

const initialState = {
    is_agent: 1
};

const checkIsAgentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_IS_AGENT :
                return Object.assign({}, state, { ...action.payload });
        default: return state;
    }
};
export default checkIsAgentReducer;
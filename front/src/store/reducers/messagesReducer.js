import {
    FETCH_MESSAGES_SUCCESS,
    POST_MESSAGE_ERROR,
    POST_MESSAGE_REQUEST,
    POST_MESSAGE_SUCCESS
} from "../actions/messagesActions";

const initialState = {
    messages: [],
    sending: false,
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.messages
            };
        case POST_MESSAGE_REQUEST:
            return {
                ...state,
                sending: true
            };
        case POST_MESSAGE_SUCCESS:
            return {
                ...state,
                sending: false
            };
        case POST_MESSAGE_ERROR:
            return {
                ...state,
                sending: false,
            };
        default:
            return state;
    }
};

export default messagesReducer;

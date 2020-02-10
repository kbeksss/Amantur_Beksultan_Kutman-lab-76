import {
    FETCH_MESSAGES_SUCCESS, GET_MESSAGES_BY_DATE_ERROR, GET_MESSAGES_BY_DATE_REQUEST, GET_MESSAGES_BY_DATE_SUCCESS,
    POST_MESSAGE_ERROR, POST_MESSAGE_REQUEST,
    POST_MESSAGE_SUCCESS
} from "../actions/messagesActions";

const initialState = {
    messages: [],
    error: null,
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
                error: null,
            };
        case POST_MESSAGE_SUCCESS:
            return {
                ...state,
                error: null
            };
        case POST_MESSAGE_ERROR:
            return {
                ...state,
                error: action.error
            };
        case GET_MESSAGES_BY_DATE_REQUEST:
            return {
                ...state,
                error: null,
            };
        case GET_MESSAGES_BY_DATE_SUCCESS:
            return {
                ...state,
                messages: [...action.messages, ...state.messages],
                error: null
            };
        case GET_MESSAGES_BY_DATE_ERROR:
            return {
                ...state,
                error: action.e
            };
        default:
            return state;
    }
};

export default messagesReducer;

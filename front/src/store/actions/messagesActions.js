import axiosChat from "../../axiosChat";

export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR = 'FETCH_MESSAGES_ERROR';

export const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_ERROR = 'POST_MESSAGE_ERROR';

export const GET_MESSAGES_BY_DATE_REQUEST = 'GET_MESSAGES_BY_DATE_REQUEST';
export const GET_MESSAGES_BY_DATE_SUCCESS = 'GET_MESSAGES_BY_DATE_SUCCESS';
export const GET_MESSAGES_BY_DATE_ERROR = 'GET_MESSAGES_BY_DATE_ERROR';

const fetchMessagesSuccess = messages => ({type: FETCH_MESSAGES_SUCCESS, messages});
const fetchMessagesError = () => ({type: FETCH_MESSAGES_ERROR});

const getMessagesByDateRequest = () => ({type: GET_MESSAGES_BY_DATE_REQUEST});
const getMessagesByDateSuccess = (messages) => ({type: GET_MESSAGES_BY_DATE_SUCCESS, messages});
const getMessagesByDateError = (e) => ({type: GET_MESSAGES_BY_DATE_ERROR, e});

const postMessageRequest = () => ({type: POST_MESSAGE_REQUEST});
const postMessageSuccess = () => ({type: POST_MESSAGE_SUCCESS});
const postMessageError = (error) => ({type: POST_MESSAGE_ERROR, error});

export const fetchMessages = () => {
    return async dispatch => {
        try {
            const response = await axiosChat.get('messages');
            dispatch(fetchMessagesSuccess(response.data));
        } catch(e) {
            console.error('Error while making request for messages', e);
            dispatch(fetchMessagesError());
        }
    }
};

export const getMessagesByDate = (date) => {
    return async dispatch => {
        try {
            dispatch(getMessagesByDateRequest());
            const response = await axiosChat.get('messages?datetime=' + date);
            if(response.data.length){
                dispatch(getMessagesByDateSuccess(response.data));
            }
        } catch (e) {
            dispatch(getMessagesByDateError(e.response));
        }
    }

};

export const postMessage = message => {
    return async dispatch => {
        try {
            dispatch(postMessageRequest());
            await axiosChat.post('messages', message);
            dispatch(postMessageSuccess());
        } catch (e) {
            dispatch(postMessageError(e.response));
        }
    }
};

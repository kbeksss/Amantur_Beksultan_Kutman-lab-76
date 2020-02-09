import axiosChat from "../../axiosChat";

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR = 'FETCH_MESSAGES_ERROR';

export const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_ERROR = 'POST_MESSAGE_ERROR';

export const UPDATE_MESSAGES_REQUEST = 'UPDATE_MESSAGES_REQUEST';
export const UPDATE_MESSAGES_SUCCESS = 'UPDATE_MESSAGES_SUCCESS';
export const UPDATE_MESSAGES_ERROR = 'UPDATE_MESSAGES_ERROR';

const fetchMessagesRequest = () => ({type: FETCH_MESSAGES_REQUEST});
const fetchMessagesSuccess = messages => ({type: FETCH_MESSAGES_SUCCESS, messages});
const fetchMessagesError = () => ({type: FETCH_MESSAGES_ERROR});

const postMessageRequest = () => ({type: POST_MESSAGE_REQUEST});
const postMessageSuccess = () => ({type: POST_MESSAGE_SUCCESS});
const postMessageError = (error) => ({type: POST_MESSAGE_ERROR, error});

const updateMessagesRequest = () => ({type: UPDATE_MESSAGES_REQUEST});
const updateMessagesSuccess = newMessages => ({type: UPDATE_MESSAGES_SUCCESS, newMessages});
const updateMessagesError = () => ({type: UPDATE_MESSAGES_ERROR});

export const fetchMessages = () => {
    return async dispatch => {
        try{
            dispatch(fetchMessagesRequest());
            const response = await axiosChat.get('messages');
            dispatch(fetchMessagesSuccess(response.data));
        } catch(e){
            console.error('Error while making request for messages', e);
            dispatch(fetchMessagesError());
        }
    }
};

export const postMessage = message => {
    return async dispatch => {
        try{
            dispatch(postMessageRequest());
            await axiosChat.post('messages', message);
            dispatch(postMessageSuccess());
        } catch (e) {
            console.error(e);
            dispatch(postMessageError(e));
        }
    }
};

export const updateMessages = datetime => {
    return async dispatch => {
        try{
            console.log(datetime);
            dispatch(updateMessagesRequest());
            const response = await axiosChat.get('messages?datetime=' + datetime);
            console.log(response.data);
            // dispatch(updateMessagesSuccess(response.data));
        } catch(e){
            console.error('Error while trying to update', e);
            dispatch(updateMessagesError());
        }
    }
};

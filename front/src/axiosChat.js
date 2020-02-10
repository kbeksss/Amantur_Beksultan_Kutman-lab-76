import axios from 'axios';

const axiosChat = axios.create({
    baseURL: 'http://localhost:8000/'
});

export default axiosChat;

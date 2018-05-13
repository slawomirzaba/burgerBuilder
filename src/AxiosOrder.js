import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-app-6d782.firebaseio.com/'
});

export default instance;


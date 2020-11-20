const axios = require('axios').default;
const baseURL = 'https://v2.api-football.com/';

const instance = axios.create({
    baseURL: baseURL,
    // headers: {'X-RapidAPI-Key': 'cb6d6e9afe20f55fca86c57cda274ad4'}
    headers: {'X-RapidAPI-Key': '690a737882e9a787a902ff5aaa72384e'}


    	
});

export default instance;
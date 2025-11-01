// cấu hình API gửi request đến server 
// (dùng axious thay thế fetch)

import axios from 'axios'

const API_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

export default api;
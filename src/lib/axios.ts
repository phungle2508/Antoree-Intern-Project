// src/lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://appf4.io.vn:8010",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // This header is usually set by the server, not the client
    },
});

export default axiosInstance;

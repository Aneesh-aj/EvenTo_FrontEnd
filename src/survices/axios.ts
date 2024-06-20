import axios from 'axios';

const Api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URLS,
    headers: {
        "Content-Type": 'application/json'
    },
    withCredentials: true
});

Api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const role = localStorage.getItem('role');
        const verifyToken = localStorage.getItem("verifyToken")
        console.log(" acc____tre<role :_____________--",verifyToken,"____________________--",role)
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        if (refreshToken) {
            config.headers['x-refresh-token'] = refreshToken;
        }
        if (role) {
            config.headers['x-user-role'] = role;
        }
        if(verifyToken){
            config.headers['x-verify-token']= verifyToken;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    response => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message);
        } else {
            console.log(error);
        }
        return Promise.reject(error);
    },
);

export default Api;

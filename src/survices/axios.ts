import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../utils/clearUser';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';


const Api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URLS,
    headers: {
        "Content-Type": 'application/json'
    },
    withCredentials: true
})


Api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    
    response => {
          console.log(" response e nn")
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
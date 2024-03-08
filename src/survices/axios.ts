import axios from 'axios'

const Api = axios.create({ baseURL: import.meta.env.VITE_BASE_URLS, 
    headers:{
      "Content-Type":'application/json'
    },
    withCredentials: true})


Api.interceptors.request.use((request)=>{
     return request
})

Api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message);

        } else {
            console.log(error);
        }
        return Promise.reject(error);
    }
);


export default Api;
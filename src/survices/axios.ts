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
    }
);


export default Api;
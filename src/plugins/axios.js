import axios from 'axios'
axios.defaults.withCredentials = true;
const http = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/',
    withCredentials: true,
    timeout: 10000
});

// configure to update csrf tokens in the background
const XSRFHeader = 'X-CSRF-TOKEN';
http.get('./csrf').then(res => http.defaults.headers.common[XSRFHeader] = res.data);
http.interceptors.response.use(res => {
    if(res.headers[XSRFHeader] && http.defaults.headers.common[XSRFHeader]) http.defaults.headers.common[XSRFHeader] = res.headers[XSRFHeader];
    return res;
});
export default http;
import axios from 'axios'  //引入axios

let api = axios.create({
})

// http request 拦截器
api.interceptors.request.use(
    config => {
        // if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        let auth = localStorage.getItem("auth");
        if(auth){
            // config.headers.authorization = store.state.token //请求头加上token
            config.headers.authorization=auth
            // alert(store.state.token)
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })

// http response 拦截器
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response.status==401){
            console.log('401');
            localStorage.removeItem('auth')
            window.location.href='/'
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });


const baseURL='http://192.168.43.124:9091'
// const baseURL='http://localhost:8080/'
// const baseURL='http://172.20.10.6:9091'
api.defaults.baseURL=baseURL
export default api


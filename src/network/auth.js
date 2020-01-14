import axios from 'axios'  //引入axios
//下面这两个不一定需要引入，看你项目需要拦截的时候做什么操作，但是一般都需要引入store

// const baseURL='http://localhost:8080/'
// const baseURL='http://192.168.43.124:9090'
// const baseURL='http://172.20.10.6:9090'
let auth = axios.create({
baseURL:'http://172.20.10.6:9090'
})
//
//
//
// auth.defaults.baseURL=baseURL

export default auth


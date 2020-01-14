import axios from 'axios'  //引入axios



let img = axios.create({
    baseURL:'http://192.168.43.124:9092'
})

export default img
// 配置基础的ajax请求
import axios from 'axios';

const api = axios.create({
    //测试链接
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export default api
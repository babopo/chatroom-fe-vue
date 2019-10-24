// 配置基础的ajax请求
import axios from 'axios';

const api = axios.create({
    //测试链接
    baseURL: 'http://chat-vue.limbotech.top/api',
    // 设置跨域请求带cookie
    withCredentials: true,
})

export default api
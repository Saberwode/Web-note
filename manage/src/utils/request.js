/**
 * axios二次封装
 */
import axios from 'axios'
import config from './../config'
import { ElMessage } from 'element-plus'
import router from './../router'
import storage from './storage'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

// 创建axios实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req) => {
    const headers = req.headers;
    // 默认token是为空的，如果是undefined会有很多问题
    const { token = "" } = storage.getItem('userInfo') || {};
    if (!headers.Authorization) headers.Authorization = 'Bearer ' + token;
    return req;
})

// 响应拦截
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data;
    if (code === 200) {
        return data;
    } else if (code === 500001) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})
/**
* 请求核心函数
* @param {*} options 请求配置
*/
function request(options) {
    // 默认为get请求
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        // 统一用data去传递数据，因为get方法只能用params传参，所以需要给params赋值
        options.params = options.data;
    }
    // 使用mock调试接口，如果不是直接连接后端，用mock开关来开关，其中，在config/index中有总开关
    // 每个api接口都有一个分开关，可以分别对各自的请求进行mock开关，决定用哪里的接口

    let isMock = config.mock;
    if (typeof options.mock != 'undefined') {
        isMock = options.mock;
    }

    // 另行判断，如果项目已经上线，强制使用后台接口
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        // 如果是本地调试，可以判断isMock的状态
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    // service.defaults.baseURL = config.baseApi


    return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})

export default request;

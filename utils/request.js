import axios from 'axios'
import qs from 'qs'




function get(url, data) {
    return axios.get(`${url}`, {
        params: data
    })
}
/**
 * @description 封装的get请求的方法
 * @param {*} url 请求的地址
 * @param {*} data  请求的数据
 * @returns 数据请求的promise对象
 */
function getKvRequest(url, data) {
    return axios.get(`/~kv${url}`, {
        params: data
    })
}

/**
 * 查询serverlessApi
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
function getServerlessApi(url, data) {
    return axios.get(`/~apis${url}`, {
        params: data
    })
}


/**
 * 查询serverlessApi
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
function postServerlessApi(url, data) {
    return axios.post(`/~apis${url}`, {
        params: data
    })
}



/**
 * @description 封装post请求的方法
 * @param {*} url 请求的地址
 * @param {*} data 请求的数据
 * @returns 数据请求的promise对象
 */
function postKvRequest(url, data) {
    return axios.post(`/~apis${url}`, data)
}

// 请求拦截器
axios.interceptors.request.use(config => {
    if (Object.prototype.toString.call(config.data) !== '[object FormData]') {
        config.data = qs.stringify(config.data);
    }
    return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
    const { Error } = response.data;
    if (Error) {
        window.alert(Error.Message);
    }
    return response.data
}, error => {
    if (error.response.status === 500) {
        window.alert('服务器发生错误，请检查服务器');
    } else if (error.response.status === 401) {
        window.alert('401 Unauthorized');
    } else {
        console.log(error.response)
    }

    return Promise.reject(error) //接口500抛出异常（不走页面逻辑）
})

export {
    get,
    getServerlessApi,
    postServerlessApi,
    postKvRequest,
    getKvRequest
}
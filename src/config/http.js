import axios from 'axios'
// import Vue from 'vue'

// let bus = new Vue()

// axios.defaults.timeout = 2000
let CancelToken = axios.CancelToken
let source = CancelToken.source()

// 判断元素类型
function toType (obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params) {
  if (params) {
    params = filterNull(params)
  }
  return axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    // baseURL: 'http://139.219.100.170:8080',
    withCredentials: false,
    cancelToken: source.token
  })
    .then(function (res) {
      if (res.data.code === 0) {
        return Promise.resolve(res.data)
      } else {
        console.log(res.data)
        // bus.$message.error(res.data.message)
        return Promise.reject(res.data)
      }
    })
    .catch(function (err) {
      console.log(err)
      // if (!err.code) {
      //   bus.$message.error('请求失败')
      // }
      if (err.message.indexOf('timeout') >= 0) {
        source.cancel('Operation canceled because of timeout')
      }
      alert('请求失败')
      return Promise.reject(err)
    })
}

export default {
  get: function (url, params) {
    return apiAxios('GET', url, params)
  },
  post: function (url, params) {
    return apiAxios('POST', url, params)
  },
  put: function (url, params) {
    return apiAxios('PUT', url, params)
  },
  delete: function (url, params) {
    return apiAxios('DELETE', url, params)
  }
}

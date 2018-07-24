import axios from 'axios'
import qs from 'qs'
// import store from '../../store'

/**
 * 封装axios的通用请求
 * @param  {string}   method     get\post\put\delete
 * @param  {string}   url       请求的接口URL
 * @param  {object}   param     传的参数，没有则传空对象
 */
//https://www.easy-mock.com/mock/5b519c5677cf626bb418768f/AwesomePOS
export function http(method, url, param) {
  param = param && typeof param === 'object' ? param : {};
  const config = {
    url: url,
    baseURL: '',
    method: method,
    transformRequest: [function (param) {
      return qs.stringify(param);
    }],
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  // post请求时需要设定Content-Type
  if (method === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    config.data = param;
  } else if (method === 'get') {
    config.params = param;
  }

  // axios.interceptors.request.use(function(config){
  //   store.commit('SET_LOADING',true)
  //   return config
  // },function(err){
  //   return Promise.reject(err)
  // });
  // axios.interceptors.response.use(function(response){
  //   store.commit('SET_LOADING',false)
  //   return response
  // },function(err){
  //   return Promise.reject(err)
  // });
  return axios(config);
}

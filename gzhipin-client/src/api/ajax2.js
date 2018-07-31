/*
*这个模块主要是发送ajax请求,返回只是一个promise对象,参数有url路径,type请求类型,data请求参数
*/
import axios from 'axios';
export default (url = '',data = {},type='POST') => {
  if(type === 'GET'){
    let queryStr = '';
    Object.keys(data).forEach(key => {
      queryStr += '?' + key + '=' + data[key] + '&';
    });
    if(queryStr){
      queryStr.substring(0,queryStr.length-1);
    }
    return axios.get(url + queryStr);
  }else{
    return axios.post(url,data)
  }
}
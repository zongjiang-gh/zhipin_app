import axios from 'axios';
const BASE_URl = 'http://localhost:4000';
export default (url='',data={},type='GET') => {
  url = BASE_URl + url;
  if(type==='GET'){
    let dataStr = '';
    //Object.keys(obj)将对象的所有的key值存入一个数组,并返回数组
    Object.keys(data).forEach(item=>{
      dataStr += item + '=' + data[item] + '&';
    });
    if(dataStr !== ''){
      //string.substring(start,end)方法主要是将起始位置到结束位置的字符串截取返回
      dataStr = dataStr.substring(0,dataStr.length-1);
      url = url + '?' + dataStr;
    }
    return axios.get(url);
  }else{
    return axios.post(url,data);
  }
}
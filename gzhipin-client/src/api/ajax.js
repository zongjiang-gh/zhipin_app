import axios from 'axios';
export default (url='',data={},type='GET') => {
  if(type==='GET'){
    let dataStr = '';
    //Object.keys(obj)将对象的所有的key值存入一个数组,并返回数组
    Object.keys(data).forEach(item=>{
      dataStr += item + '=' + data[item] + '&';
    });
    if(dataStr !== ''){
      //string.substring(start,end)方法主要是将起始位置到结束位置的字符串截取返回
      dataStr = dataStr.substring(0,dataStr.lastIndexof('&'));
      url = url + '?' + dataStr;
      return axios.get(url);
    }
  }else{
    console.log(url,data);
    return axios.post(url,data);
  }
}
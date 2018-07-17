import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types';
import {reqRegister,reqLogin,reqUpdate} from "../api";


const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user});
const receiveUser = (user) => ({type:RECEIVE_USER,user});
const resetUser = (msg) => ({type:RESET_USER,msg});

export function register({username,password,password2,type}) {
  if(!username || !password || !type){
    return errorMsg('用户名密码,必须输入');
  }
  if(password !== password2){
    return errorMsg('两次密码输入不一致');
  }
  return async dispatch => {
    const response = await reqRegister({username,password,type});
    const result = response.data;
    if(result.code === 0){
      dispatch(authSuccess(result.data))
    }else{
      dispatch(errorMsg(result.msg));
    }
  }
}
export const login = ({username,password}) => {
  if(!username || !password){
    return errorMsg('用户密码必须输入');
  }
  return async dispatch => {
    const response = await reqLogin({username,password});
    console.log(response);
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccess(result.data));
    }else{
      dispatch(errorMsg(result.msg));
    }
  }
};
export const updateUser = (user)=>{
  return async dispatch =>{
    const response = await reqUpdate(user);
    const result = response.data;
    if(result.code === 0){
      dispatch(receiveUser(result.data));
    }else{
      dispatch(resetUser(result.msg));
    }
  }
};

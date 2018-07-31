/*
* 这个模块主要是定义所有用到的的接口函数
*/
import ajax from './ajax';

export const reqRegister = ({username,password,type}) => ajax('/register',{username,password,type},'POST');
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST');

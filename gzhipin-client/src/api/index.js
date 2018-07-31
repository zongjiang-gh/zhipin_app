import ajax from './ajax';
export const reqRegister = (user) => {
return ajax('/register',user,'POST');
};
export const reqLogin = (user) => ajax('/login',user,'POST');
export const reqUpdate = (user) => ajax('/update',user,'POST');
export const reqUser = ()=> ajax('/user');//后两个参数可以不传
export const reqUsersList = type => ajax('/userlist',{type});
export const reqChatMsgList = () => ajax('/msglist');
export const reqReadChatMsg = (from) => ajax('readmsg',{from},'POST');

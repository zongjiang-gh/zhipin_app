import ajax from './ajax';
export const reqRegister = (user) => {
return ajax('/register',user,'POST');
};
export const reqLogin = (user) => ajax('/login',user,'POST');
export const reqUpdate = (user) => ajax('/update',user,'POST');

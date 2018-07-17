import {combineReducers} from 'redux';
import {AUTH_SUCCESS,ERROR_MSG,RESET_USER,RECEIVE_USER} from './action-types';
import {getRedirectPath} from '../untils';

const initUser = {
  username:'',
  type:'',
  msg:'',
  redirectTo:''
};
function user(state = initUser,action){
  switch (action.type){
    case AUTH_SUCCESS:
      const redirectTo = getRedirectPath(action.data.type,action.data.header);
      return {...action.data,redirectTo};
    case ERROR_MSG:
      return {...state,msg:action.data};
    case RESET_USER:
      return action.data;
    case RECEIVE_USER:
      return {...initUser,msg:action.data};
    default:
      return state;
  }
}
export default combineReducers({
  user
})
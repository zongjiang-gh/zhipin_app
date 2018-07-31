import {combineReducers} from 'redux';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USERs_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ
} from './action-types';
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
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return {...initUser,msg:action.data};
    default:
      return state;
  }
}

const initUserList = [];
function userList(state = initUserList ,action) {
  switch (action.type){
    case RECEIVE_USERs_LIST:
      return action.data;
    default:
      return state;
  }
}

const initChat = {
  chatMsgs:[],
  users:{},
  unReadCount:0
};

function chat(state=initChat,action) {
  switch(action.type){
    case RECEIVE_MSG:
      const  {chatMsg} = action.data;
      return {
        chatMsgs: [...state.chatMsgs, chatMsg],
        users: state.users,
        unReadCount: state.unReadCount+(chatMsg.read && chatMsg.to ===action.data.meId?1:0)
      };
    case RECEIVE_MSG_LIST:
      const {chatMsgs, users,meId} = action.data;
      return {
        chatMsgs,
        users,
        unReadCount: chatMsgs.reduce((preCount,msg) => {
          return preCount + (!msg.read && msg.to===meId ? 1 : 0)
        },0)
      };
    case MSG_READ:
      const {count,from,to} = action.data;
      return {
        chatMsgs: state.chatMsgs.map(msg => {
          if(msg.from===from && msg.to===to && !msg.read) {
            // msg.read = true  // 不能直接修改状态
            return {...msg, read: true}
          } else {
            return msg
          }
        }),
        users: state.users,
        unReadCount: state.unReadCount-count
      };

    default:
      return state;
  }
}

export default combineReducers({
  user,
  userList,
  chat
})
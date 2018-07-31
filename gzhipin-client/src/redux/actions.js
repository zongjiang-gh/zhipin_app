import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USERs_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ
} from './action-types';
import {
  reqRegister,
  reqLogin,
  reqUpdate,
  reqUser,
  reqUsersList,
  reqChatMsgList,
  reqReadChatMsg
} from "../api";
import io from 'socket.io-client';

 const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
 const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
 const receiveUser = (user) => ({type: RECEIVE_USER, data: user});
export const resetUser = (msg) => ({type: RESET_USER, data: msg});
 const displayUserList = (usersList) => ({type: RECEIVE_USERs_LIST, data: usersList});
 const receiveMsgList = ({users,chatMsgs,meId}) => ({type:RECEIVE_MSG_LIST,data:{users,chatMsgs}});
 const receiveMsg = ({chatMsg,meId}) => ({type:RECEIVE_MSG,data:{chatMsg,meId}});
 const msgRead = ({from,to,count}) => ({type:MSG_READ,data:{from,to,count}});



export function register({username, password, password2, type}) {
  if (!username || !password || !type) {
    return errorMsg('用户名密码,必须输入');
  }
  if (password !== password2) {
    return errorMsg('两次密码输入不一致');
  }
  return async dispatch => {
    const response = await reqRegister({username, password, type});
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch,result.data._id);
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg));
    }
  }
}

export const login = ({username, password}) => {
  if (!username || !password) {
    return errorMsg('用户密码必须输入');
  }
  return async dispatch => {
    const response = await reqLogin({username, password});
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch,result.data._id);
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  }
};

export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdate(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  }
};

export function getUser() {
  return async dispatch => {
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch,result.data._id);
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  }
}

export function getUserList(type) {
  return async dispatch => {
    const response = await reqUsersList(type);
    const result = response.data;
    if (result.code === 0) {
      dispatch(displayUserList(result.data));
    }
  }
}

const socket = io('ws://localhost:4000');

function initIO(dispatch,meId) {
  if(!io.socket){
    io.socket = socket;
    socket.on('receiveMessage', chatMsg => {
      if (chatMsg.from === meId ||  chatMsg.to === meId) {
        dispatch(receiveMsg({chatMsg,meId}))
      }
    })
  }
}

export function sendMsg({from,to,content}) {
  return dispatch =>{
    io.socket.emit('sendMessage',{from,to,content});
    console.log({from,to,content});
  }
}

async function getMsgList(dispatch,meId) {
    initIO(dispatch,meId);
    const response = await reqChatMsgList();
    const result = response.data;
    if(result.code === 0 ){
      const {chatMsgs,users} =result.data;
      dispatch(receiveMsgList({users,chatMsgs,meId}));
    }
}

export const readMsg = ({from,to}) => {
  return async (dispatch) => {
    const response = await reqReadChatMsg(from);
    const result = response.data;
    if(result.code === 0){
      const count = result.data;
      dispatch(msgRead({from,to,count}));
    }
  }
};
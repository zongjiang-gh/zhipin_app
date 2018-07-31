import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';
import QueueAnim  from 'rc-queue-anim';

const Item = List.Item;
const Brief = Item.Brief;


class Message extends Component {
  getLastMsgs = (chatMsgs,meId) => {
    const lastMsgObjs = {};
    chatMsgs.forEach(msg => {
      if(!msg.read && msg.to === meId){
        msg.unReadCount = 1;
      }else{
        msg.unReadCount = 0;
      }
      const chatId = msg.chat_id;
      const lastMsg = lastMsgObjs[chatId];
      if(!lastMsg){
        lastMsgObjs[chatId] = msg;
      }else{
        const unReadCount = lastMsg.unReadCount + msg.unReadCount;
        if(msg.create_time>lastMsg.create_time){
          lastMsgObjs[chatId] = msg;
        }
        lastMsgObjs[chatId].unReadCount = unReadCount;
      }
    });
    const lastMsgs = Object.values(lastMsgObjs);
    lastMsgs.sort(function(m1,m2){
      return m2.create_time - m1.create_time;
    });
    return lastMsgs;
  };
  render() {
    const {users, chatMsgs} = this.props.chat;
    const {user} = this.props;
    const meId = user._id;
    const lastMsgs = this.getLastMsgs(chatMsgs,meId);
    return (
      <List style={{marginTop: 50, marginBottom: 50}}>
        {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
        <QueueAnim type='scale' delay={100}>

        {
          lastMsgs.map(msg => {
            let toId;
            if(msg.to===meId) {
              toId = msg.from
            } else {
              toId = msg.to
            }
            const targetUser = users[toId];
            const {header, username} = targetUser;
            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={require(`../../assets/headers/${header}.png`)}
                arrow='horizontal'
                onClick={()=>this.props.history.push(`/chat/${toId}`)}
              >
                {msg.content}
                <Brief>{username}</Brief>
              </Item>
            )
          })
        }
        </QueueAnim>
      </List>
    );
  }
}

export default connect(
  state=>({chat:state.chat,user:state.user}),
  {}
)(Message);
/*聊天对话的界面*/
import React, {Component} from 'react';
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import QueueAnim  from 'rc-queue-anim'

import {sendMsg, readMsg} from '../../redux/actions';

const Item = List.Item;

class Chat extends Component {
  state = {
    content: '',
    isShow: false
  };
  send = () => {
    const {content} = this.state;
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    this.props.sendMsg({content, from, to});
    this.setState({content: ''})
  };

  componentWillMount() {
    const emojisString = '☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺ ';
    const emojis = [];
    emojisString.split('').forEach(emoji => {
      emojis.push({text: emoji})
    });
    this.emojis = emojis;
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentWillUnmount() {
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    this.props.readMsg({from,to});
  }

  toggleShow = () => {
    const isShow = !this.state.isShow;
    console.log(isShow);
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 0);
    }
    this.setState({isShow});
  };

  render() {
    const toId = this.props.match.params.userid;
    const {users, chatMsgs} = this.props.chat;
    const {user} = this.props;
    const meId = user._id;
    if (!users[toId]) {
      return null;
    }
    const chatId = [toId, meId].sort().join('_');
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);
    const toHeader = users[toId].header;
    const toIcon = require(`../../assets/headers/${toHeader}.png`);
    return (
      <div id='chat-page'>
        <NavBar
          className='stick-top'
          icon={<Icon type="left"/>}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >{users[toId].username}</NavBar>
        <List style={{marginTop: 50, marginBottom: 50}}>
          {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
          <QueueAnim type='left' delay={100}>
          {msgs.map(msg => {
            if (msg.to === meId) {
              return (<Item
                key={msg._id}
                thumb={toIcon}
              >
                {msg.content}
              </Item>)
            } else {
              return (<Item
                key={msg._id}
                className='chat-me'
                extra='我'
              >
                {msg.content}
              </Item>)
            }
          })}
          </QueueAnim>
        </List>
        <div className='am-tab-bar'>
          <InputItem
            onChange={val => this.setState({content: val})}
            value={this.state.content}
            placeholder="请输入"
            extra={
              <span>
                <span className='send-chat' onClick={this.toggleShow}>☺</span>&nbsp;
                <span className='send-chat' onClick={this.send}>发送</span>
              </span>
            }
          />
          {
            this.state.isShow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item) => {
                  this.setState({content: this.state.content + item.text})
                }}
              />
            ) : null
          }
        </div>
      </div>

    );
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {
    sendMsg,
    readMsg
  }
)(Chat);
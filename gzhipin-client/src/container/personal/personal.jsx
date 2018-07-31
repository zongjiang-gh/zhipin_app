import React, {Component} from 'react';
import {Result, List, WhiteSpace, Button,Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';

import {resetUser} from '../../redux/actions';

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component {
  handleLogout=()=> {
    const alert = Modal.alert;
    const{resetUser} = this.props;
    alert('注销用户', '你真的要注销吗?', [
        {text: '不注销', onPress: () => console.log('cancel')},
        {text: '无情注销', onPress: () => {
            Cookies.remove('user_id');
            resetUser('');
          }},
    ])
  };


render(){
  const {header, username, info, company, post, type, salary} = this.props.user;
  const postTitle = type === 'dashen' ? '求职岗位' : '招聘职位';
  const postMessage = type === 'dashen' ? '个人简介' : '职位简介';
  return (
    <div style={{marginTop: 50}}>
      <Result
        img={<img src={require(`../../assets/headers/${header}.png`)} style={{width: 50}} alt='header'/>}
        title={username}
        message={company || info || '信息还没有完善'}
      />
      <List renderHeader={() => '相关信息'}>
        <Item multipleLine>
          <Brief>{postTitle}: {post}</Brief>
          <Brief>{postMessage}: {info}</Brief>
          {salary ? <Brief>薪资: {salary}</Brief> : null}
        </Item>
      </List>
      <WhiteSpace/>
      <List>
        <Button onClick={this.handleLogout} type='warning'>退出登录</Button>
      </List>

    </div>
  );
}
}

export default connect(
  state =>({user:state.user}),
  {resetUser}
)(Personal);
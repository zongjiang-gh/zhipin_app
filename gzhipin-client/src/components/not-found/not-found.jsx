import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import Logo from '../../components/logo/logo';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h2>抱歉,找不到该页面!</h2>
        <Logo />
        <Button type='primary' onClick={this.props.history.replace('/')}>回到首页</Button>
      </div>
    );
  }
}

export default NotFound;
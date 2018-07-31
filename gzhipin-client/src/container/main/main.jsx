import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';

import LaoBanInfo from '../laoban-info/laoban-info';
import DaShenInfo from '../dashen-info/dashen-info';
import DaShen from '../dashen/dashen';
import LaoBan from '../laoban/laoban';
import Message from '../message/message';
import Personal from '../personal/personal';
import NavFooter from '../../components/nav-footer/nav-footer';
import NotFound from '../../components/not-found/not-found';
import Chat from '../chat/chat';

import {getUser} from '../../redux/actions';
import {getRedirectPath} from '../../untils';


class Main extends Component {
  navList = [
    {
      path: '/dashen',
      component: DaShen,
      text: '老板',
      icon: 'dashen',
      title: '老板列表'
    },
    {
      path: '/laoban',
      component: LaoBan,
      text: '大神',
      icon: 'laoban',
      title: '大神列表'
    },
    {
      path: '/message',
      component: Message,
      text: '消息',
      icon: 'message',
      title: '消息列表'
    },
    {
      path: '/personal',
      component: Personal,
      text: '个人',
      icon: 'personal',
      title: '个人中心'
    }
  ];
  componentWillMount(){
    const userid = Cookies.get('user_id');
    if (!userid) {
      this.props.history.replace('/login');
    }
  }
  componentDidMount() {
    const userid = Cookies.get('user_id');
    const {user} = this.props;
    if (userid && !user._id) {
      this.props.getUser();
    }
  }
  componentWillReceiveProps(){
    const userid = Cookies.get('user_id');
    if (!userid) {
      this.props.history.replace('/login');
    }
  }
  render() {
    const pathname = this.props.location.pathname;
    const {user,unReadCount} = this.props;
    if (!user._id) {
      return null;
    } else {
      if (pathname === '/') {
        const path = getRedirectPath(user.type, user.header);
        return <Redirect to={path}/>
      }
      if (pathname === '/laoban') {
        this.navList[0].hide = true;
        this.navList[1].hide = false;
      } else {
        this.navList[1].hide = true;
        this.navList[0].hide = false;
      }
    }
    const currentNav = this.navList.find(navItem => pathname === navItem.path);
    return (
      <div>
        {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/laobaninfo' component={LaoBanInfo}/>
          <Route path='/dasheninfo' component={DaShenInfo}/>

          <Route path='/dashen' component={DaShen}/>
          <Route path='/laoban' component={LaoBan}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
          <Route path='/chat/:userid' component={Chat}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter unReadCount={unReadCount} navList={this.navList}/> : null}
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user,unReadCount:state.chat.unReadCount}),
  {
    getUser
  }
)(Main);
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';

import HeaderSelector from '../../components/header-selector/header-selector';
import {updateUser} from '../../redux/actions';

class DaShenInfo extends Component{
  state = {
    header: '', // 头像名称
    info: '', // 职位简介
    post: '', // 职位名称
    company: '', // 公司名称
    salary: '' // 工资
  };
  handleChange = (name,value) => {
    this.setState({[name]:value});
  };
  setHeader = (header) => {
    this.setState({header})
  };
  render(){
    const {user} = this.props;
    if(user.header){
      return <Redirect to='/dashen'/>
    }
    return(
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem onChange={val => this.handleChange('post',val)}>
          求职岗位:
        </InputItem>
        <TextareaItem title='个人简介' row={3} onChange={val => this.handleChange('info',val)} />
        <Button type='primary' onClick={() => this.props.updateUser(this.state)}>保存</Button>
      </div>
    );
  }
}
export default connect(
  state => ({user:state.user}),
  {updateUser}
)(DaShenInfo);
import React, {Component} from 'react';
import {WingBlank, WhiteSpace, Card} from 'antd-mobile';
import {withRouter}from 'react-router-dom';
import QueueAnim  from 'rc-queue-anim'


class UserList extends Component {
  render() {
    const userList = this.props.userList.filter((user)=>user.header);
    return (
      <WingBlank style={{marginTop: 50, marginBottom: 50}} size="lg">
        {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
        <QueueAnim type='left' delay={100}>
        {userList.map(user => {
          const{_id,header,username,post,company,salary,info} = user;
          return (
            <div key={_id}>
              <WhiteSpace />
              <Card onClick={()=>this.props.history.push(`/chat/${_id}`)}>
                <Card.Header
                  thumb={require(`../../assets/headers/${header}.png`)}
                  thumbStyle={{}}//thumb的样式
                  extra={<span>{username}</span>}
                />
                <Card.Body>
                  <div>职位:{post}</div>
                  {company ?  <div>公司:{company}</div> : null}
                  {salary ?  <div>月薪:{salary}</div> : null}
                  <div>描述:{info}</div>
                </Card.Body>
              </Card>
            </div>
          )
        })}
        </QueueAnim>
      </WingBlank>
    );
  }
}

export default withRouter(UserList);
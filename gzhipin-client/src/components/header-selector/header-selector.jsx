import React, {Component} from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'props-types';

class HeaderSelector extends Component{
  constructor(props) {
    super(props);
    this.headerList = [];
    for (let i = 0; i < 20; i++) {
      const text = `头像${i + 1}`;
      this.headerList.push({text, icon: require(`../../assets/headers/${text}.png`)});
    }
  }

  static prosTypes = {
    setHeader: PropTypes.func.isRequired
  };
  state = {
    icon: null
  };
  selectorHeader = ({text, icon}) => {
    this.setState({icon});
    this.props.setHeader(text);
  };

  render() {
    const {icon} = this.state;
    const gridHeader = icon ? <p>已选择头像:<img src={icon} alt="header img" /></p>:'请选择头像';
  return(
    <List renderHeader={() => gridHeader}>
      <Grid data={this.headerList}
            column={5}
            onClick={this.selectorHeader}
      />
    </List>
  );
  }
  }
  export default HeaderSelector;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

const Item = TabBar.Item;

class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  };
  render() {
    let {navList} = this.props;
    navList = navList.filter(nav => !nav.hide);
    const {pathname} = this.props.location;
    return (
      <TabBar>
        {navList.map((nav) =>
          (<Item key={nav.path}
                 title={nav.text}
                 icon={{uri: require(`./images/${nav.icon}.png`)}}
                 selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                 selected={pathname===nav.path}
                 onPress={() => {
                   this.props.history.replace(nav.path)
                 }}
            />
          ))}
      </TabBar>

    )
  }
}

export default withRouter(NavFooter);
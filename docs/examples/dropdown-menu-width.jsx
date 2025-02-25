import Dropdown from '@rc-component/dropdown';
import Menu, { Item as MenuItem } from '@rc-component/menu';
import React, { PureComponent } from 'react';
import '../../assets/index.less';

class Example extends PureComponent {
  state = { longList: false };

  short = () => {
    this.setState({ longList: false });
  };

  long = () => {
    this.setState({ longList: true });
  };

  render() {
    const menuItems = [
      <MenuItem key="1">1st item</MenuItem>,
      <MenuItem key="2">2nd item</MenuItem>,
    ];

    if (this.state.longList) {
      menuItems.push(<MenuItem key="3">3rd LONG SUPER LONG item</MenuItem>);
    }
    const menu = <Menu>{menuItems}</Menu>;
    return (
      <div>
        <Dropdown overlay={menu}>
          <button>Actions</button>
        </Dropdown>
        <button onClick={this.long}>Long List</button>
        <button onClick={this.short}>Short List</button>
      </div>
    );
  }
}

export default Example;

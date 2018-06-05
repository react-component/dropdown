/* eslint-disable no-console */
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Demo extends Component {
  render() {
    const menu = (
      <Menu
        style={{ width: 140 }}
      >
        <MenuItem key="1">one</MenuItem>
        <MenuItem key="2">two</MenuItem>
      </Menu>
    );

    return (
      <Dropdown
        trigger={['contextMenu']}
        overlay={menu}
        animation="slide-up"
        minOverlayWidthMatchTrigger={false}
        alignPoint
      >
        <div
          role="button"
          style={{
            border: '1px solid #000',
            padding: '100px 0',
            textAlign: 'center',
          }}
        >
          Right click me!
        </div>
      </Dropdown>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));

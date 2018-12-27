/* eslint-disable no-console */
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';

function onSelect({ key }) {
  console.log(`${key} selected`);
}

function onVisibleChange(visible) {
  console.log(visible);
}

const menuCallback = () => (
  <Menu onSelect={onSelect}>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem key="1">one</MenuItem>
    <Divider />
    <MenuItem key="2">two</MenuItem>
  </Menu>
);

ReactDOM.render(
  <div style={{ margin: 20 }}>
    <div style={{ height: 100 }}/>
    <div>
      <Dropdown
        trigger={['click']}
        overlay={menuCallback}
        animation="slide-up"
        onVisibleChange={onVisibleChange}
      >
        <button style={{ width: 100 }}>open</button>
      </Dropdown>
    </div>
  </div>
, document.getElementById('__react-content'));

/* eslint-disable no-console */
import Dropdown from 'rc-dropdown';
import Menu from 'rc-menu';
import 'rc-dropdown/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';

function onSelect({key}) {
  console.log(`${key} selected`);
}

const menu = (
  <Menu onSelect={onSelect}>
    <Menu.Item disabled>disabled</Menu.Item>
    <Menu.Item key="1">one</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">two</Menu.Item>
  </Menu>
);

ReactDOM.render(<div style={{ margin: 20 }}>
  <div style={{ height: 100 }}/>
  <div>
    <Dropdown trigger="click" overlay={menu} animation="slide-up">
      <button style={{ width: 100 }}>open</button>
    </Dropdown>
  </div>
</div>, document.getElementById('__react-content'));

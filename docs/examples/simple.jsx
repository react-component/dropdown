/* eslint-disable no-console,react/button-has-type */
import Dropdown from '@rc-component/dropdown';
import Menu, { Divider, Item as MenuItem } from '@rc-component/menu';
import React from 'react';
import '../../assets/index.less';

function onSelect({ key }) {
  console.log(`${key} selected`);
}

function onOpenChange(open) {
  console.log(open);
}

const menu = (
  <Menu onSelect={onSelect}>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem key="1">one</MenuItem>
    <Divider />
    <MenuItem key="2">two</MenuItem>
  </Menu>
);

export default function Simple() {
  return (
    <div style={{ margin: 20 }}>
      <div style={{ height: 100 }} />
      <div>
        <Dropdown
          autoFocus
          trigger={['click']}
          overlay={menu}
          animation="slide-up"
          onOpenChange={onOpenChange}
        >
          <button style={{ width: 100 }}>open</button>
        </Dropdown>
      </div>
    </div>
  );
}

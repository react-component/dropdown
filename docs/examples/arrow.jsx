import Dropdown from '@rc-component/dropdown';
import Menu, { Divider, Item as MenuItem } from 'rc-menu';
import React from 'react';
import '../../assets/index.less';

function onSelect({ key }) {
  console.log(`${key} selected`);
}

function onVisibleChange(visible) {
  console.log(visible);
}

const menu = (
  <Menu onSelect={onSelect}>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem key="1">one</MenuItem>
    <Divider />
    <MenuItem key="2">two</MenuItem>
  </Menu>
);

export default function Arrow() {
  return (
    <div style={{ margin: 20 }}>
      <div style={{ height: 100 }} />
      <div>
        <Dropdown
          arrow
          trigger={['click']}
          overlay={menu}
          animation="slide-up"
          onVisibleChange={onVisibleChange}
        >
          <button style={{ width: 100 }}>open</button>
        </Dropdown>
      </div>
      <div>
        <Dropdown
          placement="topLeft"
          arrow
          trigger={['click']}
          overlay={menu}
          animation="slide-up"
          onVisibleChange={onVisibleChange}
        >
          <button style={{ width: 100 }}>open</button>
        </Dropdown>
      </div>
    </div>
  );
}

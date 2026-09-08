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

const menuCallback = () => (
  <Menu onSelect={onSelect}>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem key="1">one</MenuItem>
    <Divider />
    <MenuItem key="2">two</MenuItem>
  </Menu>
);

export default function OverlayCallback() {
  return (
    <div style={{ margin: 20 }}>
      <div style={{ height: 100 }} />
      <div>
        <Dropdown
          trigger={['click']}
          overlay={menuCallback}
          animation="slide-up"
          onOpenChange={onOpenChange}
        >
          <button style={{ width: 100 }}>open</button>
        </Dropdown>
      </div>
    </div>
  );
}

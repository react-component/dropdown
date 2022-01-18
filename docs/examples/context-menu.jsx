import Menu, { Item as MenuItem } from 'rc-menu'
import '../../assets/index.less'
import React from 'react'
import Dropdown from 'rc-dropdown'

function ContextMenu() {
  const menu = (
    <Menu style={{ width: 140 }}>
      <MenuItem key="1">one</MenuItem>
      <MenuItem key="2">two</MenuItem>
    </Menu>
  )

  return (
    <Dropdown
      trigger={['contextMenu']}
      overlay={menu}
      animation="slide-up"
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
  )
}

export default ContextMenu

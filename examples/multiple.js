/* eslint-disable no-console,react/button-has-type */
import Menu, { Item as MenuItem, Divider } from 'rc-menu'
import '../assets/index.less'
import React, { Component } from 'react'
import Dropdown from '../src'

class Test extends Component {
  state = {
    visible: false,
  }

  onVisibleChange = visible => {
    console.log('visible', visible)
    this.setState({
      visible,
    })
  }

  selected = []

  saveSelected = ({ selectedKeys }) => {
    this.selected = selectedKeys
  }

  confirm = () => {
    console.log(this.selected)
    this.setState({
      visible: false,
    })
  }

  render() {
    const menu = (
      <Menu
        style={{ width: 140 }}
        multiple
        onSelect={this.saveSelected}
        onDeselect={this.saveSelected}
      >
        <MenuItem key="1">one</MenuItem>
        <MenuItem key="2">two</MenuItem>
        <Divider />
        <MenuItem disabled>
          <button
            style={{
              cursor: 'pointer',
              color: '#000',
              pointerEvents: 'visible',
            }}
            onClick={this.confirm}
          >
            确定
          </button>
        </MenuItem>
      </Menu>
    )

    return (
      <Dropdown
        trigger={['click']}
        onVisibleChange={this.onVisibleChange}
        visible={this.state.visible}
        closeOnSelect={false}
        overlay={menu}
        animation="slide-up"
      >
        <button>open</button>
      </Dropdown>
    )
  }
}

export default Test

/* eslint-disable no-console,react/button-has-type */
import Menu, { Item as MenuItem } from 'rc-menu'
import '../assets/index.less'
import React, { PureComponent } from 'react'
import Dropdown from '../src'

class Example extends PureComponent {
  state = { longList: false }

  short = () => {
    this.setState({ longList: false })
  }

  long = () => {
    this.setState({ longList: true })
  }

  render() {
    const menuItems = [
      <MenuItem key="1">1st item</MenuItem>,
      <MenuItem key="2">2nd item</MenuItem>,
    ]

    if (this.state.longList) {
      menuItems.push(<MenuItem key="3">3rd LONG SUPER LONG item</MenuItem>)
    }
    const menu = <Menu>{menuItems}</Menu>
    return (
      <div>
        <Dropdown overlay={menu}>
          <button>Actions</button>
        </Dropdown>
        <button onClick={this.long}>Long List</button>
        <button onClick={this.short}>Short List</button>
      </div>
    )
  }
}

export default Example

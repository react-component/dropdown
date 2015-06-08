'use strict';

var Dropdown = require('rc-dropdown');
var pkg = require('../package.json');
var Menu = require('rc-menu');
require('rc-dropdown/assets/index.css');

function onClick(key) {
  console.log(`${key} selected`);
}

var menu = <Menu style={{width:140}} onClick={onClick}>
  <Menu.Item disabled>disabled</Menu.Item>
  <Menu.Item key="1">one</Menu.Item>
  <Menu.Divider/>
  <Menu.Item key="2">two</Menu.Item>
</Menu>;

React.render(<div style={{margin:20}}>
  <h1>{pkg.name}@{pkg.version}</h1>

  <div>
    <Dropdown trigger="click" overlay={menu} animation="slide-up">
      <button>open</button>
    </Dropdown>
  </div>
</div>, document.getElementById('__react-content'));


// use jsx to render html, do not modify simple.html
require('rc-dropdown/assets/index.css');
var React = require('react');
var Dropdown = require('../');
var MenuItem = Dropdown.MenuItem;


var demo = (<div>
  <h2>dropdown</h2>
  <Dropdown title='Dropdown'>
    <MenuItem eventKey='1'>Dropdown link</MenuItem>
    <MenuItem eventKey='2'>Dropdown link</MenuItem>
  </Dropdown>
</div>);

React.render(demo, document.getElementById('__react-content'));
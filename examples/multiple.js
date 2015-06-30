'use strict';

var Dropdown = require('rc-dropdown');
var Menu = require('rc-menu');
require('rc-dropdown/assets/index.css');

var Test = React.createClass({
  getInitialState() {
    this.selected = [];
    return {
      visible: false
    };
  },

  handleVisibleChange(visible) {
    this.setState({
      visible: visible
    });
  },

  handleSelect(selected) {
    this.selected.push(selected);
  },

  handleDeselect(key) {
    var index = this.selected.indexOf(key);
    if (index !== -1) {
      this.selected.splice(index, 1);
    }
  },

  confirm() {
    console.log(this.selected);
    this.setState({
      visible: false
    });
  },

  render() {
    var menu = <Menu style={{width: 140}} multiple={true} onSelect ={this.handleSelect} onDeselect={this.handleDeselect}>
      <Menu.Item key="1">one</Menu.Item>
      <Menu.Item key="2">two</Menu.Item>
      <Menu.Divider/>
      <Menu.Item disabled>
        <button
          style={{
            cursor: 'pointer',
            color: '#000',
            'pointerEvents': 'visible'
          }}
          onClick={this.confirm}>确定</button>
      </Menu.Item>
    </Menu>;

    return <Dropdown trigger="click"
      onVisibleChange={this.handleVisibleChange}
      visible={this.state.visible}
      closeOnSelect={false}
      overlay={menu} animation="slide-up">
      <button>open</button>
    </Dropdown>;
  }
});

React.render(<div style={{margin: 20}}>
  <Test/>
</div>, document.getElementById('__react-content'));

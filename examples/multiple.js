webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Dropdown = __webpack_require__(2);
	var Menu = __webpack_require__(34);
	__webpack_require__(44);
	
	var Test = React.createClass({
	  displayName: 'Test',
	
	  getInitialState: function getInitialState() {
	    this.selected = [];
	    return {
	      visible: false
	    };
	  },
	
	  handleVisibleChange: function handleVisibleChange(visible) {
	    this.setState({
	      visible: visible
	    });
	  },
	
	  handleSelect: function handleSelect(selected) {
	    this.selected.push(selected);
	  },
	
	  handleDeselect: function handleDeselect(key) {
	    var index = this.selected.indexOf(key);
	    if (index !== -1) {
	      this.selected.splice(index, 1);
	    }
	  },
	
	  confirm: function confirm() {
	    console.log(this.selected);
	    this.setState({
	      visible: false
	    });
	  },
	
	  render: function render() {
	    var menu = React.createElement(
	      Menu,
	      { style: { width: 140 }, multiple: true, onSelect: this.handleSelect, onDeselect: this.handleDeselect },
	      React.createElement(
	        Menu.Item,
	        { key: '1' },
	        'one'
	      ),
	      React.createElement(
	        Menu.Item,
	        { key: '2' },
	        'two'
	      ),
	      React.createElement(Menu.Divider, null),
	      React.createElement(
	        Menu.Item,
	        { disabled: true },
	        React.createElement(
	          'button',
	          {
	            style: {
	              cursor: 'pointer',
	              color: '#000',
	              'pointerEvents': 'visible'
	            },
	            onClick: this.confirm },
	          '确定'
	        )
	      )
	    );
	
	    return React.createElement(
	      Dropdown,
	      { trigger: 'click',
	        onVisibleChange: this.handleVisibleChange,
	        visible: this.state.visible,
	        closeOnSelect: false,
	        overlay: menu, animation: 'slide-up' },
	      React.createElement(
	        'button',
	        null,
	        'open'
	      )
	    );
	  }
	});
	
	React.render(React.createElement(
	  'div',
	  { style: { margin: 20 } },
	  React.createElement(Test, null)
	), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=multiple.js.map
webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(48);


/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Dropdown = __webpack_require__(2);
	var Menu = __webpack_require__(34);
	__webpack_require__(44);
	
	function onClick(_ref) {
	  var key = _ref.key;
	
	  console.log(key + ' selected');
	}
	
	var menu = React.createElement(
	  Menu,
	  { style: { width: 140 }, onClick: onClick },
	  React.createElement(
	    Menu.Item,
	    { disabled: true },
	    'disabled'
	  ),
	  React.createElement(
	    Menu.Item,
	    { key: '1' },
	    'one'
	  ),
	  React.createElement(Menu.Divider, null),
	  React.createElement(
	    Menu.Item,
	    { key: '2' },
	    'two'
	  )
	);
	
	React.render(React.createElement(
	  'div',
	  { style: { margin: 20 } },
	  React.createElement(
	    'div',
	    null,
	    React.createElement(
	      Dropdown,
	      { trigger: 'click', overlay: menu, animation: 'slide-up' },
	      React.createElement(
	        'button',
	        null,
	        'open'
	      )
	    )
	  )
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple.js.map
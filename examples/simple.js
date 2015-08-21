webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(55);


/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rcDropdown = __webpack_require__(2);
	
	var _rcDropdown2 = _interopRequireDefault(_rcDropdown);
	
	var _rcMenu = __webpack_require__(33);
	
	var _rcMenu2 = _interopRequireDefault(_rcMenu);
	
	__webpack_require__(54);
	
	function onSelect(_ref) {
	  var key = _ref.key;
	
	  console.log(key + ' selected');
	}
	
	var menu = React.createElement(
	  _rcMenu2['default'],
	  { style: { width: 140 }, onSelect: onSelect },
	  React.createElement(
	    _rcMenu2['default'].Item,
	    { disabled: true },
	    'disabled'
	  ),
	  React.createElement(
	    _rcMenu2['default'].Item,
	    { key: '1' },
	    'one'
	  ),
	  React.createElement(_rcMenu2['default'].Divider, null),
	  React.createElement(
	    _rcMenu2['default'].Item,
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
	      _rcDropdown2['default'],
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
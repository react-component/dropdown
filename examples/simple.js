webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(227);


/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcDropdown = __webpack_require__(2);
	
	var _rcDropdown2 = _interopRequireDefault(_rcDropdown);
	
	var _rcMenu = __webpack_require__(212);
	
	var _rcMenu2 = _interopRequireDefault(_rcMenu);
	
	__webpack_require__(226);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(162);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function onSelect(_ref) {
	  var key = _ref.key;
	
	  console.log(key + ' selected');
	} /* eslint-disable no-console */
	
	
	var menu = _react2["default"].createElement(
	  _rcMenu2["default"],
	  { onSelect: onSelect },
	  _react2["default"].createElement(
	    _rcMenu.Item,
	    { disabled: true },
	    'disabled'
	  ),
	  _react2["default"].createElement(
	    _rcMenu.Item,
	    { key: '1' },
	    'one'
	  ),
	  _react2["default"].createElement(_rcMenu.Divider, null),
	  _react2["default"].createElement(
	    _rcMenu.Item,
	    { key: '2' },
	    'two'
	  )
	);
	
	_reactDom2["default"].render(_react2["default"].createElement(
	  'div',
	  { style: { margin: 20 } },
	  _react2["default"].createElement('div', { style: { height: 100 } }),
	  _react2["default"].createElement(
	    'div',
	    null,
	    _react2["default"].createElement(
	      _rcDropdown2["default"],
	      { trigger: ['click'], overlay: menu, animation: 'slide-up' },
	      _react2["default"].createElement(
	        'button',
	        { style: { width: 100 } },
	        'open'
	      )
	    )
	  )
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple.js.map
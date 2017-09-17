webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcDropdown = __webpack_require__(2);
	
	var _rcDropdown2 = _interopRequireDefault(_rcDropdown);
	
	var _rcMenu = __webpack_require__(311);
	
	var _rcMenu2 = _interopRequireDefault(_rcMenu);
	
	__webpack_require__(331);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(43);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint-disable no-console */
	
	
	var Test = function (_Component) {
	  _inherits(Test, _Component);
	
	  function Test() {
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Test);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	      visible: false
	    }, _this.onVisibleChange = function (visible) {
	      _this.setState({
	        visible: visible
	      });
	    }, _this.selected = [], _this.saveSelected = function (_ref) {
	      var selectedKeys = _ref.selectedKeys;
	
	      _this.selected = selectedKeys;
	    }, _this.confirm = function () {
	      console.log(_this.selected);
	      _this.setState({
	        visible: false
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  Test.prototype.render = function render() {
	    var menu = _react2.default.createElement(
	      _rcMenu2.default,
	      {
	        style: { width: 140 },
	        multiple: true,
	        onSelect: this.saveSelected,
	        onDeselect: this.saveSelected
	      },
	      _react2.default.createElement(
	        _rcMenu.Item,
	        { key: '1' },
	        'one'
	      ),
	      _react2.default.createElement(
	        _rcMenu.Item,
	        { key: '2' },
	        'two'
	      ),
	      _react2.default.createElement(_rcMenu.Divider, null),
	      _react2.default.createElement(
	        _rcMenu.Item,
	        { disabled: true },
	        _react2.default.createElement(
	          'button',
	          {
	            style: {
	              cursor: 'pointer',
	              color: '#000',
	              pointerEvents: 'visible'
	            },
	            onClick: this.confirm
	          },
	          '\u786E\u5B9A'
	        )
	      )
	    );
	
	    return _react2.default.createElement(
	      _rcDropdown2.default,
	      {
	        trigger: ['click'],
	        onVisibleChange: this.onVisibleChange,
	        visible: this.state.visible,
	        closeOnSelect: false,
	        overlay: menu,
	        animation: 'slide-up'
	      },
	      _react2.default.createElement(
	        'button',
	        null,
	        'open'
	      )
	    );
	  };
	
	  return Test;
	}(_react.Component);
	
	_reactDom2.default.render(_react2.default.createElement(
	  'div',
	  { style: { margin: 20 } },
	  _react2.default.createElement(Test, null)
	), document.getElementById('__react-content'));

/***/ })
]);
//# sourceMappingURL=multiple.js.map
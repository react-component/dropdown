webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcDropdown = __webpack_require__(2);
	
	var _rcDropdown2 = _interopRequireDefault(_rcDropdown);
	
	var _rcMenu = __webpack_require__(210);
	
	var _rcMenu2 = _interopRequireDefault(_rcMenu);
	
	__webpack_require__(224);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(162);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Test = _react2.default.createClass({
	  displayName: 'Test',
	  getInitialState: function getInitialState() {
	    this.selected = [];
	    return {
	      visible: false
	    };
	  },
	  onVisibleChange: function onVisibleChange(visible) {
	    this.setState({
	      visible: visible
	    });
	  },
	  saveSelected: function saveSelected(_ref) {
	    var selectedKeys = _ref.selectedKeys;
	
	    this.selected = selectedKeys;
	  },
	  confirm: function confirm() {
	    console.log(this.selected);
	    this.setState({
	      visible: false
	    });
	  },
	  render: function render() {
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
	          '确定'
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
	  }
	}); /* eslint-disable no-console */
	
	
	_reactDom2.default.render(_react2.default.createElement(
	  'div',
	  { style: { margin: 20 } },
	  _react2.default.createElement(Test, null)
	), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=multiple.js.map
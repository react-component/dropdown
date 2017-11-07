webpackJsonp([1],{

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(83);


/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_dropdown__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rc_dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rc_menu__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_dropdown_assets_index_less__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_dropdown_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rc_dropdown_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-console */






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
    var menu = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_rc_menu__["c" /* default */],
      {
        style: { width: 140 },
        multiple: true,
        onSelect: this.saveSelected,
        onDeselect: this.saveSelected
      },
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_rc_menu__["b" /* Item */],
        { key: '1' },
        'one'
      ),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_rc_menu__["b" /* Item */],
        { key: '2' },
        'two'
      ),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_rc_menu__["a" /* Divider */], null),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_rc_menu__["b" /* Item */],
        { disabled: true },
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
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

    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_0_rc_dropdown___default.a,
      {
        trigger: ['click'],
        onVisibleChange: this.onVisibleChange,
        visible: this.state.visible,
        closeOnSelect: false,
        overlay: menu,
        animation: 'slide-up'
      },
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'button',
        null,
        'open'
      )
    );
  };

  return Test;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_4_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
  'div',
  { style: { margin: 20 } },
  __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Test, null)
), document.getElementById('__react-content'));

/***/ })

},[82]);
//# sourceMappingURL=multiple.js.map
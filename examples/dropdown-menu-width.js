webpackJsonp([3],{

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(178);


/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_dropdown__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rc_dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rc_menu__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_dropdown_assets_index_less__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_dropdown_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rc_dropdown_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-console */






var Example = function (_PureComponent) {
  _inherits(Example, _PureComponent);

  function Example() {
    var _temp, _this, _ret;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = { longList: false }, _this.short = function () {
      _this.setState({ longList: false });
    }, _this.long = function () {
      _this.setState({ longList: true });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Example.prototype.render = function render() {
    var menuItems = [__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_rc_menu__["b" /* Item */],
      { key: '1' },
      '1st item'
    ), __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_rc_menu__["b" /* Item */],
      { key: '2' },
      '2nd item'
    )];

    if (this.state.longList) {
      menuItems.push(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_rc_menu__["b" /* Item */],
        { key: '3' },
        '3rd LONG SUPER LONG item'
      ));
    }
    var menu = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_rc_menu__["c" /* default */],
      null,
      menuItems
    );
    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_0_rc_dropdown___default.a,
        { overlay: menu },
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          'button',
          null,
          'Actions'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'button',
        { onClick: this.long },
        'Long List'
      ),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'button',
        { onClick: this.short },
        'Short List'
      )
    );
  };

  return Example;
}(__WEBPACK_IMPORTED_MODULE_3_react__["PureComponent"]);

__WEBPACK_IMPORTED_MODULE_4_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Example, null), document.getElementById('__react-content'));

/***/ })

},[177]);
//# sourceMappingURL=dropdown-menu-width.js.map
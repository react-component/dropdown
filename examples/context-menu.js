webpackJsonp([4],{

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(81);


/***/ }),

/***/ 81:
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






var Demo = function (_Component) {
  _inherits(Demo, _Component);

  function Demo() {
    _classCallCheck(this, Demo);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Demo.prototype.render = function render() {
    var menu = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_rc_menu__["c" /* default */],
      {
        style: { width: 140 }
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
      )
    );

    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_0_rc_dropdown___default.a,
      {
        trigger: ['contextMenu'],
        overlay: menu,
        animation: 'slide-up',
        alignPoint: true
      },
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'div',
        {
          role: 'button',
          style: {
            border: '1px solid #000',
            padding: '100px 0',
            textAlign: 'center'
          }
        },
        'Right click me!'
      )
    );
  };

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_4_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[80]);
//# sourceMappingURL=context-menu.js.map
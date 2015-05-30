
var React = require('react');
var rcUtil = require('rc-util');
var joinClasses = rcUtil.joinClasses;
var classSet = rcUtil.classSet;
var createChainedFunction = rcUtil.createChainedFunction;
//var KeyCode = rcUtil.KeyCode;

var Dropdown = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool,
    dropup:    React.PropTypes.bool,
    title:     React.PropTypes.node,
    href:      React.PropTypes.string,
    onClick:   React.PropTypes.func,
    onSelect:  React.PropTypes.func,
    navItem:   React.PropTypes.bool,
    noCaret:   React.PropTypes.bool,
    buttonClassName: React.PropTypes.string
  },

  render: function () {
    let renderMethod = this.props.navItem ?
      'renderNavItem' : 'renderButtonGroup';

    let caret = this.props.noCaret ?
        null : (<span className="caret" />);

    return (
      <div>{this.props.children}</div>
    );
  }
})

module.exports = Dropdown;
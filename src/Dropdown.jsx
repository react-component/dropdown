'use strict';

var React = require('react');
var Tooltip = require('rc-tooltip');
var assign = require('object-assign');
var rcUtil = require('rc-util');

/*

 var MenuItem = Menu.Item;

 var menu = <Menu><MenuItem>1</MenuItem></Menu>;

 <DropDown trigger="click" animationName="" overlay={<>} onSelect={}>
 <button>open</button>
 </DropDown>
 */

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      visible: this.props.visible
    };
  }

  componentWillReceiveProps(props) {
    if ('visible' in props) {
      this.setState({
        visible: props.visible
      });
    }
  }

  handleClick() {
    if (this.props.closeOnSelect) {
      this.setState({
        visible: false
      });
    }
  }

  getMenuElement() {
    var props = this.props;
    return React.cloneElement(props.overlay, {
      prefixCls: `${props.prefixCls}-menu`,
      onClick: rcUtil.createChainedFunction(this.handleClick, props.overlay.props.onClick)
    });
  }

  render() {
    var props = assign({}, this.props);
    props.visible = this.state.visible;
    props.overlay = this.getMenuElement();
    return <Tooltip {...props}/>;
  }
}

Dropdown.defaultProps = {
  prefixCls: 'rc-dropdown',
  renderPopupToBody: false,
  closeOnSelect: true,
  placement: {
    points: ['tl', 'bl']
  }
};

module.exports = Dropdown;

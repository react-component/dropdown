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
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    if ('visible' in this.props) {
      this.state = {
        visible: this.props.visible
      };
    } else {
      this.state = {
        visible: this.props.defaultVisible
      };
    }
  }

  componentWillReceiveProps(props) {
    if ('visible' in props) {
      this.setState({
        visible: props.visible
      });
    }
  }

  handleClick() {
    if (!('visible' in this.props)) {
      this.setState({
        visible: false
      });
    }
  }

  handleVisibleChange(v) {
    if (!('visible' in this.props)) {
      this.setState({
        visible: v
      });
    }
  }

  getMenuElement() {
    var props = this.props;
    return React.cloneElement(props.overlay, {
      prefixCls: `${props.prefixCls}-menu`,
      onClick: rcUtil.createChainedFunction(props.overlay.props.onClick, this.handleClick)
    });
  }

  render() {
    var props = assign({}, this.props);
    props.visible = this.state.visible;
    props.onVisibleChange = rcUtil.createChainedFunction(props.onVisibleChange, this.handleVisibleChange);
    props.overlay = this.getMenuElement();
    return <Tooltip {...props}/>;
  }
}

Dropdown.defaultProps = {
  prefixCls: 'rc-dropdown',
  renderPopupToBody: false,
  defaultVisible: false,
  placement: {
    points: ['tl', 'bl']
  }
};

module.exports = Dropdown;

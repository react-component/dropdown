'use strict';

var React = require('react');
var rcUtil = require('rc-util');
var createChainedFunction = rcUtil.createChainedFunction;
var Popup = require('./Popup');
var domAlign = require('dom-align');
var utils = require('./utils');

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: !!props.defaultVisible
    };
    if ('visible' in props) {
      this.state.visible = !!props.visible;
    }
    ['toggle', 'show', 'hide'].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: !!nextProps.visible
      });
    }
  }

  getContainer() {
    if (!this.container) {
      this.container = document.createElement('div');
      if (this.props.trigger.indexOf('hover') !== -1) {
        React.findDOMNode(this).appendChild(this.container);
      } else {
        document.body.appendChild(this.container);
      }
    }
    return this.container;
  }

  renderDropdown(callback) {
    var props = this.props;
    var state = this.state;
    React.render(<Popup prefixCls={props.prefixCls}
        visible={state.visible}
        placement={props.placement}
        transitionName={props.transitionName}>
      {props.overlay}
      </Popup>,
      this.getContainer(), function () {
        callback(this);
      });
  }

  toggle() {
    if (this.state.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  setVisible(visible) {
    this.setState({
      visible: visible
    }, () => {
      this.props.onVisibleChange(this.state.visible);
    });
  }

  show() {
    this.setVisible(true);
  }

  hide() {
    this.setVisible(false);
  }

  componentDidMount() {
    document.body.onmouseover = (e) => {
      this.currentEle = e.target;
      if (this.props.trigger.indexOf('hover') !== -1) {
        if (!rcUtil.Dom.contains(React.findDOMNode(this), this.currentEle)) {
          this.hide();
        }
      }
    };
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    var state = this.state;
    this.renderDropdown((dropdown)=> {
      if (state.visible) {
        var rootNode = React.findDOMNode(this);
        var tipNode = dropdown.getRootNode();
        var placement = this.props.placement;
        var points;
        if (placement && placement.points) {
          var props = this.props;
          var align = domAlign(tipNode, rootNode, placement);
          tipNode.className = utils.getClassByPlacement(props.prefixCls, align);
        } else {
          points = ['cr', 'cl'];
          if (placement === 'right') {
            points = ['cl', 'cr'];
          } else if (placement === 'top') {
            points = ['bc', 'tc'];
          } else if (placement === 'bottom') {
            points = ['tl', 'bl'];
            //points = ['tc', 'bc'];
          }
          domAlign(tipNode, rootNode, {
            points: points
          });
        }
      }
    });
  }

  render() {
    var props = this.props;
    var children = props.children;
    var child = React.Children.only(children);
    var childProps = child.props || {};
    var newChildProps = {};
    var trigger = props.trigger;
    if (trigger.indexOf('click') !== -1) {
      newChildProps.onClick = createChainedFunction(this.toggle, childProps.onClick);
    }
    if (trigger.indexOf('hover') !== -1) {
      newChildProps.onMouseEnter = createChainedFunction(this.show, childProps.onMouseEnter);
      //newChildProps.onMouseLeave = createChainedFunction(this.hide, childProps.onMouseLeave);
      newChildProps.onMouseLeave = childProps.onMouseLeave;
    }
    if (trigger.indexOf('focus') !== -1) {
      newChildProps.onFocus = createChainedFunction(this.show, childProps.onFocus);
      newChildProps.onBlur = createChainedFunction(this.hide, childProps.onBlur);
    }
    return React.cloneElement(child, newChildProps);
  }
}

Dropdown.propTypes = {
  trigger: React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus'])),
  placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  onVisibleChange: React.PropTypes.func,
  overlay: React.PropTypes.node.isRequired
};

Dropdown.defaultProps = {
  prefixCls: 'rc-dropdown',
  onVisibleChange: function () {
  },
  placement: 'bottom',
  trigger: ['hover']
};

module.exports = Dropdown;

import React from 'react';
import Tooltip from 'rc-tooltip';

/*

 var MenuItem = Menu.Item;

 var menu = <Menu><MenuItem>1</MenuItem></Menu>;

 <DropDown trigger="click" animationName="" overlay={<>} onSelect={}>
 <button>open</button>
 </DropDown>
 */

const Dropdown = React.createClass({
  propTypes: {
    minOverlayWidthMatchTrigger: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      minOverlayWidthMatchTrigger: true,
      prefixCls: 'rc-dropdown',
      defaultVisible: false,
      onVisibleChange() {
      },
      placement: {
        points: ['tl', 'bl'],
      },
    };
  },

  getInitialState() {
    const props = this.props;
    if ('visible' in props) {
      return {
        visible: props.visible,
      };
    }
    return {
      visible: props.defaultVisible,
    };
  },

  componentWillReceiveProps(props) {
    if ('visible' in props) {
      this.setState({
        visible: props.visible,
      });
    }
  },

  onClick(e) {
    const props = this.props;
    const overlayProps = props.overlay.props;
    if (!('visible' in props)) {
      this.setState({
        visible: false,
      });
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  },

  onVisibleChange(v) {
    const props = this.props;
    if (!('visible' in props)) {
      this.setState({
        visible: v,
      });
    }
    props.onVisibleChange(v);
  },

  getMenuElement() {
    const props = this.props;
    return React.cloneElement(props.overlay, {
      prefixCls: `${props.prefixCls}-menu`,
      onClick: this.onClick,
    });
  },

  render() {
    return (<Tooltip {...this.props}
      ref="tooltip"
      visible={this.state.visible}
      afterVisibleChange={this.afterVisibleChange}
      overlay={this.getMenuElement()}
      onVisibleChange={this.onVisibleChange}
      />);
  },

  afterVisibleChange(visible) {
    if (visible && this.props.minOverlayWidthMatchTrigger) {
      const overlayNode = React.findDOMNode(this.refs.tooltip.popupInstance);
      const rootNode = React.findDOMNode(this);
      if (rootNode.offsetWidth > overlayNode.offsetWidth) {
        overlayNode.style.width = rootNode.offsetWidth + 'px';
      }
    }
  },
});

export default Dropdown;

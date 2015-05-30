var React = require('react');
var rcUtil = require('rc-util');
var joinClasses = rcUtil.joinClasses;
var classSet = rcUtil.classSet;
var KeyCode = rcUtil.KeyCode;

const MenuItem = React.createClass({
  propTypes: {
    header:    React.PropTypes.bool,
    divider:   React.PropTypes.bool,
    href:      React.PropTypes.string,
    title:     React.PropTypes.string,
    target:    React.PropTypes.string,
    onSelect:  React.PropTypes.func,
    eventKey:  React.PropTypes.any,
    active:    React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      href: '#',
      active: false
    };
  },

  handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();
      this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
    }
  },

  renderAnchor() {
    return (
      <a onClick={this.handleClick} href={this.props.href} target={this.props.target} title={this.props.title} tabIndex="-1">
        {this.props.children}
      </a>
    );
  },

  render() {
    let classes = {
        'dropdown-header': this.props.header,
        'divider': this.props.divider,
        'active': this.props.active
      };

    let children = null;
    if (this.props.header) {
      children = this.props.children;
    } else if (!this.props.divider) {
      children = this.renderAnchor();
    }

    return (
      <li {...this.props} role="presentation" title={null} href={null}
        className={joinClasses(this.props.className, classSet(classes))}>
        {children}
      </li>
    );
  }
});

module.exports = MenuItem;
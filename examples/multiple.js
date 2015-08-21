import Dropdown from 'rc-dropdown';
import Menu from 'rc-menu';
import 'rc-dropdown/assets/index.less';

var Test = React.createClass({
  getInitialState() {
    this.selected = [];
    return {
      visible: false
    };
  },

  onVisibleChange(visible) {
    this.setState({
      visible: visible
    });
  },

  saveSelected({selectedKeys}) {
    this.selected = selectedKeys;
  },

  confirm() {
    console.log(this.selected);
    this.setState({
      visible: false
    });
  },

  render() {
    var menu = <Menu style={{width: 140}} multiple={true} onSelect={this.saveSelected} onDeselect={this.saveSelected}>
      <Menu.Item key="1">one</Menu.Item>
      <Menu.Item key="2">two</Menu.Item>
      <Menu.Divider/>
      <Menu.Item disabled>
        <button
          style={{
            cursor: 'pointer',
            color: '#000',
            'pointerEvents': 'visible'
          }}
          onClick={this.confirm}>确定
        </button>
      </Menu.Item>
    </Menu>;

    return <Dropdown trigger="click"
                     onVisibleChange={this.onVisibleChange}
                     visible={this.state.visible}
                     closeOnSelect={false}
                     overlay={menu} animation="slide-up">
      <button>open</button>
    </Dropdown>;
  }
});

React.render(<div style={{margin: 20}}>
  <Test/>
</div>, document.getElementById('__react-content'));

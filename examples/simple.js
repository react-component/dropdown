import Dropdown from 'rc-dropdown';
import Menu from 'rc-menu';
import 'rc-dropdown/assets/index.less';

function onSelect({key}) {
  console.log(`${key} selected`);
}

var menu = <Menu style={{width:140}} onSelect={onSelect}>
  <Menu.Item disabled>disabled</Menu.Item>
  <Menu.Item key="1">one</Menu.Item>
  <Menu.Divider/>
  <Menu.Item key="2">two</Menu.Item>
</Menu>;

React.render(<div style={{margin:20}}>
  <div>
    <Dropdown trigger="click" overlay={menu} animation="slide-up">
      <button>open</button>
    </Dropdown>
  </div>
</div>, document.getElementById('__react-content'));

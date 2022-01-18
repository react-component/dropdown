import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Menu, { Item as MenuItem } from 'rc-menu';
import { sleep } from './utils';
import Dropdown from '../src';
import '../assets/index.less';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('accessible dropdown', () => {
  it('Keyboard navigation works', async () => {
    let trigger;

    act(() => {
      ReactDOM.render(
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <MenuItem key="1">
                <span className="my-menuitem">one</span>
              </MenuItem>
              <MenuItem key="2">two</MenuItem>
            </Menu>
          }
        >
          <button className="my-button">open</button>
        </Dropdown>,
        container,
      );
      trigger = container.querySelector('.my-button');
    });

    // Open menu
    act(() => trigger.dispatchEvent(new MouseEvent('click', { bubbles: true })));
    await sleep(200);
    expect(document.activeElement.className).toContain('rc-dropdown-menu');

    // Select menu item and confirm focus return to the trigger
    act(() => {
      const menuItem = container.querySelector('.my-menuitem');
      menuItem.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40, bubbles: true })); // Down arrow
      menuItem.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13, bubbles: true })); // Enter
    });
    await sleep(200);
    expect(document.activeElement.className).toContain('my-button');

    // Open menu
    act(() => trigger.dispatchEvent(new MouseEvent('click', { bubbles: true })));
    await sleep(200);
    expect(document.activeElement.className).toContain('rc-dropdown-menu');

    // Close menu with Esc
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))); // Esc
    await sleep(200);
    expect(document.activeElement.className).toContain('my-button');

    // Open menu
    act(() => trigger.dispatchEvent(new MouseEvent('click', { bubbles: true })));
    await sleep(200);
    expect(document.activeElement.className).toContain('rc-dropdown-menu');

    // Close menu with Tab
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 9 }))); // Tab
    await sleep(200);
    expect(document.activeElement.className).toContain('my-button');
  });
});

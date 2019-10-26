/* eslint-disable react/button-has-type,react/no-render-return-value */
import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '../src';
import placements from '../src/placements';
import { sleep, getPopupDomNode } from './utils';

describe('point', () => {
  let container;
  beforeEach(() => {
    container = global.document.createElement('div');
    global.document.body.appendChild(container);
  });

  afterEach(() => {
    global.document.body.removeChild(container);
  });

  it('click show', async () => {
    const overlay = (
      <div
        className="check-for-visible"
        style={{
          width: 10,
        }}
      >
        Test
      </div>
    );

    const dropdown = mount(
      <Dropdown
        trigger={['contextMenu']}
        overlay={overlay}
        alignPoint
        align={{
          points: ['tl'],
          overflow: {},
        }}
      >
        <button className="my-button">open</button>
      </Dropdown>,
      { attachTo: container },
    );

    const pageStyle = {
      pageX: 9,
      pageY: 3,
    };

    dropdown.find('.my-button').simulate('contextmenu', pageStyle);

    await sleep(500);

    expect(getPopupDomNode(dropdown).getAttribute('style')).toEqual(
      expect.stringContaining(
        `left: -${999 - pageStyle.pageX - placements.bottomLeft.offset[0]}px; top: -${999 -
          pageStyle.pageY -
          placements.bottomLeft.offset[1]}px;`,
      ),
    );
  });
});

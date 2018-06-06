import expect from 'expect.js';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils, { Simulate } from 'react-dom/test-utils';
import $ from 'jquery';
import Dropdown from '../src';
import { placements } from '../src/placements';

describe('point', () => {
  let div;
  beforeEach(() => {
    if (!div) {
      div = document.createElement('div');
      document.body.appendChild(div);
    }
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    $(div).remove();
  });

  it('click show', () => {
    const overlay = <div className="check-for-visible">Test</div>;
    const dropdown = ReactDOM.render(
      <Dropdown
        trigger={['click']}
        overlay={overlay}
        alignPoint
        align={{
          points: ['tl'],
          overflow: {},
        }}
      >
        <button className="my-button">open</button>
      </Dropdown>
      , div);

    Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(dropdown, 'my-button'),
      { pageX: 9, pageY: 3 },
    );

    const $popup = $(dropdown.getPopupDomNode());

    const popupOffset = $popup.offset();
    expect(popupOffset.left).to.be(9 + placements.bottomLeft.offset[0]);
    expect(popupOffset.top).to.be(3 + placements.bottomLeft.offset[1]);
  });
});

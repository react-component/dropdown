/* eslint-disable react/button-has-type,react/no-render-return-value */
import { fireEvent } from '@testing-library/react';
import React from 'react';
import Dropdown from '../src';
import placements from '../src/placements';
import { sleep, render } from './utils';

describe('point', () => {
  it.skip('click show', async () => {
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

    const { container, baseElement } = render(
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
    );

    const pageStyle = {
      pageX: 9,
      pageY: 3,
    };

    fireEvent.contextMenu(container.querySelector('.my-button'), pageStyle);

    await sleep(500);

    expect(baseElement.querySelector('.rc-dropdown').getAttribute('style')).toEqual(
      expect.stringContaining(
        `left: -${999 - pageStyle.pageX - placements.bottomLeft.offset[0]}px; top: -${
          999 - pageStyle.pageY - placements.bottomLeft.offset[1]
        }px;`,
      ),
    );
  });
});

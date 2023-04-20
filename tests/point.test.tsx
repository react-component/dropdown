/* eslint-disable react/button-has-type,react/no-render-return-value */
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import Dropdown from '../src';
import { render } from './utils';

// Fix prettier rm this
console.log(!!React);

async function waitForTime() {
  for (let i = 0; i < 10; i += 1) {
    await act(async () => {
      jest.runAllTimers();
    });
  }
}

describe('point', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
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

    const onPopupAlign = jest.fn();

    const { container } = render(
      <Dropdown
        onPopupAlign={onPopupAlign}
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

    fireEvent.contextMenu(container.querySelector('.my-button'));
    await waitForTime();

    expect(container.querySelector('.rc-dropdown')).toBeTruthy();
  });
});

import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import Dropdown from '../src';
import { render } from './utils';

describe('open API', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('keeps controlled state until open changes', () => {
    const onOpenChange = jest.fn();
    const dropdown = (open: boolean) => (
      <Dropdown
        open={open}
        onOpenChange={onOpenChange}
        trigger={['click']}
        overlay={<div>menu</div>}
      >
        <button type="button">trigger</button>
      </Dropdown>
    );
    const { getByRole, rerender } = render(dropdown(false));
    const button = getByRole('button');

    fireEvent.click(button);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(button).not.toHaveClass('rc-dropdown-open');

    rerender(dropdown(true));
    expect(button).toHaveClass('rc-dropdown-open');
    fireEvent.click(button);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(button).toHaveClass('rc-dropdown-open');

    rerender(dropdown(false));
    expect(button).not.toHaveClass('rc-dropdown-open');
  });

  it.each([27, 9])(
    'notifies onOpenChange and restores focus for key %s',
    (keyCode) => {
      const onOpenChange = jest.fn();
      const Overlay = () => <div>menu</div>;
      const { getByRole } = render(
        <Dropdown
          onOpenChange={onOpenChange}
          trigger={['click']}
          overlay={<Overlay />}
        >
          <button type="button">trigger</button>
        </Dropdown>,
      );
      const button = getByRole('button');
      fireEvent.click(button);
      expect(button).toHaveClass('rc-dropdown-open');
      expect(onOpenChange).toHaveBeenNthCalledWith(1, true);

      fireEvent.keyDown(window, { keyCode });
      expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
      expect(onOpenChange).toHaveBeenCalledTimes(2);
      expect(button).not.toHaveClass('rc-dropdown-open');
      expect(button).toHaveFocus();
    },
  );

  it('preserves overlay click callback behavior', () => {
    const onOpenChange = jest.fn();
    const onOverlayClick = jest.fn();
    const { getByRole, getByText } = render(
      <Dropdown
        onOpenChange={onOpenChange}
        onOverlayClick={onOverlayClick}
        trigger={['click']}
        overlay={<div>menu</div>}
      >
        <button type="button">trigger</button>
      </Dropdown>,
    );
    const button = getByRole('button');
    fireEvent.click(button);
    act(() => jest.runAllTimers());
    fireEvent.click(getByText('menu'));
    expect(button).not.toHaveClass('rc-dropdown-open');
    expect(onOverlayClick).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});

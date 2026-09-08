import type { TriggerRef } from '@rc-component/trigger';
import { supportRef } from '@rc-component/util';
import { fireEvent } from '@testing-library/react';
import * as React from 'react';
import Dropdown from '../src';
import { render } from './utils';

jest.mock('@rc-component/util', () => {
  const actual = jest.requireActual('@rc-component/util');
  return {
    ...actual,
    supportRef: jest.fn(actual.supportRef),
  };
});

it('wraps children without ref support and keeps click state in sync', () => {
  const LegacyButton = (props: React.HTMLAttributes<HTMLButtonElement>) => (
    <button {...props} type="button">
      trigger
    </button>
  );
  const actualSupportRef = jest.requireActual('@rc-component/util').supportRef;
  const mockSupportRef = supportRef as jest.MockedFunction<typeof supportRef>;

  // React 19 accepts refs on function components. Exercise the fallback used
  // by older React versions without changing ref support for other elements.
  mockSupportRef.mockImplementation((node) =>
    React.isValidElement(node) && node.type === LegacyButton
      ? false
      : actualSupportRef(node),
  );

  const ref = React.createRef<TriggerRef>();
  const onOpenChange = jest.fn();
  try {
    const { getByRole, unmount } = render(
      <Dropdown
        ref={ref}
        trigger={['click']}
        overlay={<div>menu</div>}
        onOpenChange={onOpenChange}
      >
        <LegacyButton />
      </Dropdown>,
    );
    const button = getByRole('button');
    const wrapper = button.parentElement;
    expect(wrapper.tagName).toBe('SPAN');
    expect(ref.current.nativeElement).toBe(wrapper);

    fireEvent.click(button);
    expect(onOpenChange).toHaveBeenNthCalledWith(1, true);
    expect(wrapper).toHaveClass('rc-dropdown-open');
    expect(button).toHaveClass('rc-dropdown-open');

    fireEvent.click(button);
    expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(wrapper).not.toHaveClass('rc-dropdown-open');
    expect(button).not.toHaveClass('rc-dropdown-open');
    unmount();
  } finally {
    mockSupportRef.mockImplementation(actualSupportRef);
  }
});

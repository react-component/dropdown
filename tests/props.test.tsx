import { render } from '@testing-library/react';
import * as React from 'react';
import Dropdown from '../src';

const mockTriggerRender = jest.fn();

jest.mock('@rc-component/trigger', () => {
  const ReactModule: typeof React = jest.requireActual('react');

  return {
    __esModule: true,
    default: ReactModule.forwardRef<HTMLElement, Record<string, unknown>>(
      (props, ref) => {
        mockTriggerRender(props);
        return ReactModule.createElement('div', { ref });
      },
    ),
  };
});

it('does not forward disabled to Trigger', () => {
  const runtimeProps = { disabled: true };

  render(
    <Dropdown {...runtimeProps} visible overlay={<div />}>
      <button type="button">open</button>
    </Dropdown>,
  );

  const triggerProps = mockTriggerRender.mock.calls[0][0];
  expect(triggerProps).not.toHaveProperty('disabled');
  expect(triggerProps).toHaveProperty('popupVisible', true);
});

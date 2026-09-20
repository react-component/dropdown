import { act, renderHook } from '@testing-library/react';
import useAccessibility from '../src/hooks/useAccessibility';

it('closes without consuming Tab when the overlay ref is omitted', () => {
  const trigger = document.createElement('button');
  document.body.appendChild(trigger);
  const onOpenChange = jest.fn();
  const { unmount } = renderHook(() =>
    useAccessibility({
      open: true,
      triggerRef: { current: trigger },
      onOpenChange,
    }),
  );
  try {
    const event = new KeyboardEvent('keydown', {
      keyCode: 9,
      cancelable: true,
    });
    act(() => {
      window.dispatchEvent(event);
    });
    expect(event.defaultPrevented).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(trigger);
  } finally {
    unmount();
    trigger.remove();
  }
});

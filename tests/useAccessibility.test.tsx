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

it.each([false, true])(
  'leaves a portaled nested menu Escape to its owner (wrapped: %s)',
  (wrapped) => {
    const trigger = document.createElement('button');
    const wrapper = document.createElement('div');
    const root = document.createElement('ul');
    const submenu = document.createElement('ul');
    const child = document.createElement('li');
    root.setAttribute('role', 'menu');
    submenu.setAttribute('role', 'menu');
    child.tabIndex = -1;
    submenu.appendChild(child);
    wrapper.appendChild(root);
    document.body.append(trigger, wrapper, submenu);
    const onOpenChange = jest.fn();
    const { unmount } = renderHook(() =>
      useAccessibility({
        open: true,
        triggerRef: { current: trigger },
        onOpenChange,
        overlayRef: { current: wrapped ? wrapper : { list: root } },
      }),
    );
    try {
      child.focus();
      act(() =>
        child.dispatchEvent(
          new KeyboardEvent('keydown', { keyCode: 27, bubbles: true }),
        ),
      );
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(child);
      act(() =>
        root.dispatchEvent(
          new KeyboardEvent('keydown', { keyCode: 27, bubbles: true }),
        ),
      );
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(document.activeElement).toBe(trigger);
    } finally {
      unmount();
      trigger.remove();
      wrapper.remove();
      submenu.remove();
    }
  },
);

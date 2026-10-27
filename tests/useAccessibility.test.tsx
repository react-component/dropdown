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

it('closes and returns focus to trigger on Escape key', () => {
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
      keyCode: 27,
      bubbles: true,
      cancelable: true,
    });
    act(() => {
      window.dispatchEvent(event);
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(trigger);
  } finally {
    unmount();
    trigger.remove();
  }
});

it('lets an overlay handle Tab before the window listener', () => {
  const trigger = document.createElement('button');
  const overlay = document.createElement('div');
  const input = document.createElement('input');
  overlay.tabIndex = -1;
  overlay.appendChild(input);
  document.body.append(trigger, overlay);
  const onOpenChange = jest.fn();
  input.addEventListener('keydown', (event) => event.stopPropagation());
  const { unmount } = renderHook(() =>
    useAccessibility({
      open: true,
      triggerRef: { current: trigger },
      overlayRef: { current: overlay },
      onOpenChange,
    }),
  );
  try {
    input.focus();
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      keyCode: 9,
      bubbles: true,
      cancelable: true,
    });
    act(() => {
      input.dispatchEvent(event);
    });
    expect(document.activeElement).toBe(input);
    expect(event.defaultPrevented).toBe(false);
    expect(onOpenChange).not.toHaveBeenCalled();
  } finally {
    unmount();
    trigger.remove();
    overlay.remove();
  }
});

it('restores focus before an earlier window bubble listener unmounts the hook', () => {
  const trigger = document.createElement('button');
  const item = document.createElement('button');
  document.body.append(trigger, item);
  item.focus();
  const onOpenChange = jest.fn();
  let teardown = () => {};
  const portalListener = () => teardown();
  window.addEventListener('keydown', portalListener);
  const { unmount } = renderHook(() =>
    useAccessibility({
      open: true,
      triggerRef: { current: trigger },
      onOpenChange,
    }),
  );
  teardown = unmount;
  try {
    act(() => {
      item.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          keyCode: 27,
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(trigger);
  } finally {
    window.removeEventListener('keydown', portalListener);
    unmount();
    trigger.remove();
    item.remove();
  }
});

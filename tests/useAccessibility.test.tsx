import * as React from 'react';
import Menu from '@rc-component/menu';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
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

it.each([
  [false, false],
  [true, false],
  [false, true],
  [true, true],
])(
  'leaves popup nested menu Escape to its owner (wrapped: %s, contained: %s)',
  (wrapped, contained) => {
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
    if (contained) root.appendChild(submenu);
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

it.each([false, true])(
  'closes for an inline nested menu (wrapped: %s)',
  (wrapped) => {
    const trigger = document.createElement('button');
    const wrapper = document.createElement('div');
    const root = document.createElement('ul');
    const submenu = document.createElement('ul');
    const child = document.createElement('li');
    root.setAttribute('role', 'menu');
    submenu.setAttribute('role', 'menu');
    submenu.className = 'custom-menu-sub custom-menu-inline';
    child.tabIndex = -1;
    submenu.appendChild(child);
    root.appendChild(submenu);
    wrapper.appendChild(root);
    document.body.append(trigger, wrapper);
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
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(document.activeElement).toBe(trigger);
    } finally {
      unmount();
      trigger.remove();
      wrapper.remove();
    }
  },
);

it('closes and restores focus from an actual rc-menu inline child', () => {
  const onOpenChange = jest.fn();
  const Fixture = () => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const overlayRef = React.useRef<any>(null);
    useAccessibility({ open: true, triggerRef, overlayRef, onOpenChange });
    return (
      <>
        <button ref={triggerRef}>Trigger</button>
        <Menu
          ref={overlayRef}
          mode="inline"
          defaultOpenKeys={['sub']}
          items={[
            {
              key: 'sub',
              label: 'Sub',
              children: [{ key: 'child', label: 'Child' }],
            },
          ]}
        />
      </>
    );
  };
  const { getByText, unmount } = render(<Fixture />);
  try {
    const child = getByText('Child').closest('li');
    child.focus();
    fireEvent.keyDown(child, { key: 'Escape', keyCode: 27, which: 27 });
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(getByText('Trigger')).toHaveFocus();
  } finally {
    unmount();
  }
});

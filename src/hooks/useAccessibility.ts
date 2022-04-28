import * as React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import raf from 'rc-util/lib/raf';

const { ESC, TAB } = KeyCode;

interface UseAccessibilityProps {
  visible: boolean;
  setTriggerVisible: (visible: boolean) => void;
  triggerRef: React.RefObject<any>;
  menuRef: React.RefObject<HTMLUListElement>;
  onVisibleChange?: (visible: boolean) => void;
  autoFocus?: boolean;
}

export default function useAccessibility({
  visible,
  setTriggerVisible,
  triggerRef,
  menuRef,
  onVisibleChange,
  autoFocus,
}: UseAccessibilityProps) {
  const focusMenuRef = React.useRef<boolean>(false);

  const handleCloseMenuAndReturnFocus = () => {
    if (visible && triggerRef.current) {
      triggerRef.current?.triggerRef?.current?.focus?.();
      setTriggerVisible(false);
      if (typeof onVisibleChange === 'function') {
        onVisibleChange(false);
      }
    }
  };

  const focusMenu = () => {
    menuRef.current?.focus?.();
    focusMenuRef.current = true;
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case ESC:
        handleCloseMenuAndReturnFocus();
        break;
      case TAB:
        if (!focusMenuRef.current && menuRef.current?.focus) {
          event.preventDefault();
          focusMenu();
        } else {
          handleCloseMenuAndReturnFocus();
        }
        break;
    }
  };

  React.useEffect(() => {
    if (visible) {
      window.addEventListener('keydown', handleKeyDown);
      if (autoFocus) {
        // FIXME: hack with raf
        raf(focusMenu, 3);
      }
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        focusMenuRef.current = false;
      };
    }
    return () => {
      focusMenuRef.current = false;
    };
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps
}

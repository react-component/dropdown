import * as React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';

const { ESC, TAB } = KeyCode;

interface UseAccessibilityProps {
  visible: boolean;
  setTriggerVisible: (visible: boolean) => void;
  triggerRef: React.RefObject<any>;
  menuRef: React.RefObject<HTMLUListElement>;
  onVisibleChange?: (visible: boolean) => void;
}

export default function useAccessibility({
  visible,
  setTriggerVisible,
  triggerRef,
  menuRef,
  onVisibleChange,
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

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case ESC:
        handleCloseMenuAndReturnFocus();
        break;
      case TAB:
        if (!focusMenuRef.current && menuRef.current?.focus) {
          event.preventDefault();
          menuRef.current.focus();
          focusMenuRef.current = true;
        } else {
          handleCloseMenuAndReturnFocus();
        }
        break;
    }
  };

  React.useEffect(() => {
    if (visible) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        focusMenuRef.current = false;
      };
    }
    return () => null;
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const returnFocus = () => {
    if (visible) {
      setTimeout(() => {
        triggerRef.current?.triggerRef?.current?.focus?.();
      }, 100);
    }
  };

  return {
    returnFocus,
  };
}

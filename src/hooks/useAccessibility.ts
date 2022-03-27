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
  const handleCloseMenuAndReturnFocus = () => {
    if (visible && triggerRef.current) {
      if (triggerRef.current.triggerRef.current) {
        triggerRef.current.triggerRef.current.focus();
      }
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
        handleCloseMenuAndReturnFocus();
        break;
    }
  };
  const focusOpenedMenu = () => {
    menuRef.current?.focus?.();
  };

  React.useEffect(() => {
    if (visible) {
      setTimeout(() => {
        focusOpenedMenu();
        window.addEventListener('keydown', handleKeyDown);
      }, 100);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    return () => null;
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const returnFocus = () => {
    if (visible && triggerRef.current) {
      if (triggerRef.current.triggerRef.current) {
        setTimeout(() => {
          triggerRef.current?.triggerRef?.current?.focus();
        }, 100);
      }
    }
  };

  return {
    returnFocus,
  };
}

import * as React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import raf from 'rc-util/lib/raf';
import { getFocusNodeList } from 'rc-util/lib/Dom/focus';

const { ESC, TAB } = KeyCode;

interface UseAccessibilityProps {
  visible: boolean;
  triggerRef: React.RefObject<any>;
  onVisibleChange?: (visible: boolean) => void;
  autoFocus?: boolean;
  overlayRef?: React.RefObject<any>;
}

export default function useAccessibility({
  visible,
  triggerRef,
  onVisibleChange,
  autoFocus,
  overlayRef,
}: UseAccessibilityProps) {
  const focusMenuRef = React.useRef<boolean>(false);

  const handleCloseMenuAndReturnFocus = () => {
    if (visible) {
      triggerRef.current?.focus?.();
      onVisibleChange?.(false);
    }
  };

  const focusMenu = () => {
    if (overlayRef.current?.focus) {
      overlayRef.current.focus();
      focusMenuRef.current = true;
      return true;
    }
    return false;
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case ESC:
        handleCloseMenuAndReturnFocus();
        break;
      case TAB: {
        let focusResult: boolean = false;
        if (!focusMenuRef.current) {
          focusResult = focusMenu();
        }

        if (focusResult) {
          event.preventDefault();
        } else {
          handleCloseMenuAndReturnFocus();
        }
        break;
      }
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

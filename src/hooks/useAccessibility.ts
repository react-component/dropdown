import { KeyCode, raf } from '@rc-component/util';
import * as React from 'react';

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
    const overlay = overlayRef.current;
    if (!overlay?.focus) {
      return false;
    }

    const activeElement = document.activeElement;
    overlay.focus();
    if (document.activeElement === activeElement) {
      const focusTarget = (overlay.querySelector?.('[role="menu"]') ??
        overlay.querySelector?.('[tabindex]')) as HTMLElement | null;
      focusTarget?.focus();
    }

    const focused = document.activeElement !== activeElement;
    focusMenuRef.current = focused;
    return focused;
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

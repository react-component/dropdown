import { KeyCode, raf } from '@rc-component/util';
import * as React from 'react';

const { ESC, TAB } = KeyCode;

interface UseAccessibilityProps {
  open: boolean;
  triggerRef: React.RefObject<any>;
  onOpenChange?: (open: boolean) => void;
  autoFocus?: boolean;
  overlayRef?: React.RefObject<any>;
}

export default function useAccessibility({
  open,
  triggerRef,
  onOpenChange,
  autoFocus,
  overlayRef,
}: UseAccessibilityProps) {
  const focusMenuRef = React.useRef<boolean>(false);

  const handleCloseMenuAndReturnFocus = () => {
    if (open) {
      triggerRef.current?.focus?.();
      onOpenChange?.(false);
    }
  };

  const focusMenu = (options?: FocusOptions) => {
    const overlay = overlayRef?.current;
    if (!overlay?.focus) {
      return false;
    }

    const activeElement = document.activeElement;
    overlay.focus(options);
    if (document.activeElement === activeElement) {
      for (const selector of ['[role="menu"]', '[tabindex]']) {
        const focusTarget = overlay.querySelector?.(
          selector,
        ) as HTMLElement | null;
        focusTarget?.focus(options);
        if (document.activeElement !== activeElement) {
          break;
        }
      }
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
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      if (autoFocus) {
        // FIXME: hack with raf
        raf(() => focusMenu({ preventScroll: true }), 3);
      }
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        focusMenuRef.current = false;
      };
    }
    return () => {
      focusMenuRef.current = false;
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
}

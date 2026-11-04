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

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case ESC: {
        // Portaled popup submenus own Escape. Inline mode submenus retain
        // outer close/focus, even when popup containers are customized.
        const overlay = overlayRef?.current;
        const overlayElement = overlay?.list || overlay;
        const rootMenu = overlayElement?.matches?.('[role="menu"]')
          ? overlayElement
          : overlayElement?.querySelector?.('[role="menu"]');
        const targetMenu =
          event.target instanceof Element
            ? event.target.closest('[role="menu"]')
            : null;
        const inlineSubmenu =
          rootMenu?.contains(targetMenu) &&
          Array.from(targetMenu?.classList || []).some((className) =>
            className.endsWith('-inline'),
          );
        if (
          rootMenu &&
          targetMenu &&
          targetMenu !== rootMenu &&
          !inlineSubmenu
        ) {
          break;
        }
        handleCloseMenuAndReturnFocus();
        break;
      }
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

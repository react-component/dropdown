import Trigger, {
  type ActionType,
  type AlignType,
  type BuildInPlacements,
  type TriggerProps,
  type TriggerRef,
} from '@rc-component/trigger';
import { composeRef, getNodeRef, supportRef } from '@rc-component/util';
import { clsx } from 'clsx';
import React from 'react';
import useAccessibility from './hooks/useAccessibility';
import Overlay from './Overlay';
import Placements from './placements';

export interface DropdownProps
  extends Pick<
    TriggerProps,
    | 'getPopupContainer'
    | 'children'
    | 'mouseEnterDelay'
    | 'mouseLeaveDelay'
    | 'onPopupAlign'
    | 'builtinPlacements'
    | 'autoDestroy'
  > {
  minOverlayWidthMatchTrigger?: boolean;
  arrow?: boolean;
  onOpenChange?: (open: boolean) => void;
  onOverlayClick?: (e: Event) => void;
  prefixCls?: string;
  transitionName?: string;
  overlayClassName?: string;
  openClassName?: string;
  animation?: string;
  align?: AlignType;
  overlayStyle?: React.CSSProperties;
  placement?: keyof typeof Placements;
  placements?: BuildInPlacements;
  overlay?: (() => React.ReactElement) | React.ReactElement;
  trigger?: ActionType | ActionType[];
  alignPoint?: boolean;
  showAction?: ActionType[];
  hideAction?: ActionType[];
  open?: boolean;
  autoFocus?: boolean;
}

const Dropdown = React.forwardRef<TriggerRef, DropdownProps>((props, ref) => {
  const {
    arrow = false,
    prefixCls = 'rc-dropdown',
    transitionName,
    animation,
    align,
    placement = 'bottomLeft',
    placements = Placements,
    getPopupContainer,
    showAction,
    hideAction,
    overlayClassName,
    overlayStyle,
    open,
    trigger = ['hover'],
    autoFocus,
    overlay,
    children,
    onOpenChange,
    disabled,
    ...otherProps
  } = props as DropdownProps & { disabled?: boolean };

  const [triggerOpen, setTriggerOpen] = React.useState<boolean>();
  const mergedOpen = 'open' in props ? open : triggerOpen;
  const mergedMotionName = animation
    ? `${prefixCls}-${animation}`
    : transitionName;

  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const childRef = React.useRef(null);
  React.useImperativeHandle(ref, () => triggerRef.current);

  const handleOpenChange = (newOpen: boolean) => {
    setTriggerOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  useAccessibility({
    open: mergedOpen,
    triggerRef: childRef,
    onOpenChange: handleOpenChange,
    autoFocus,
    overlayRef,
  });

  const onClick = (e) => {
    const { onOverlayClick } = props;
    setTriggerOpen(false);

    if (onOverlayClick) {
      onOverlayClick(e);
    }
  };

  const getMenuElement = () => (
    <Overlay
      ref={overlayRef}
      overlay={overlay}
      prefixCls={prefixCls}
      arrow={arrow}
    />
  );

  const getMenuElementOrLambda = () => {
    if (typeof overlay === 'function') {
      return getMenuElement;
    }
    return getMenuElement();
  };

  const getMinOverlayWidthMatchTrigger = () => {
    const { minOverlayWidthMatchTrigger, alignPoint } = props;
    if ('minOverlayWidthMatchTrigger' in props) {
      return minOverlayWidthMatchTrigger;
    }

    return !alignPoint;
  };

  const getOpenClassName = () => {
    const { openClassName } = props;
    if (openClassName !== undefined) {
      return openClassName;
    }
    return `${prefixCls}-open`;
  };

  const elementChild = children as React.ReactElement<
    React.HTMLAttributes<HTMLElement>
  >;
  const childClassName = clsx(
    elementChild.props?.className,
    mergedOpen && getOpenClassName(),
  );
  const triggerChildProps: React.HTMLAttributes<HTMLElement> &
    React.RefAttributes<HTMLElement> = {
    className: childClassName,
    ref: composeRef(childRef, getNodeRef(elementChild)),
  };

  const childrenNode = supportRef(elementChild) ? (
    React.cloneElement(
      elementChild as React.ReactElement<
        React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
      >,
      triggerChildProps,
    )
  ) : (
    <span className={childClassName} ref={childRef}>
      {React.cloneElement(elementChild, {
        className: childClassName,
      })}
    </span>
  );

  let triggerHideAction = hideAction;
  if (!triggerHideAction && trigger.indexOf('contextMenu') !== -1) {
    triggerHideAction = ['click'];
  }

  return (
    <Trigger
      builtinPlacements={placements}
      {...otherProps}
      prefixCls={prefixCls}
      ref={triggerRef}
      popupClassName={clsx(overlayClassName, {
        [`${prefixCls}-show-arrow`]: arrow,
      })}
      popupStyle={overlayStyle}
      action={trigger}
      showAction={showAction}
      hideAction={triggerHideAction}
      popupPlacement={placement}
      popupAlign={align}
      popupMotion={{ motionName: mergedMotionName }}
      popupVisible={mergedOpen}
      stretch={getMinOverlayWidthMatchTrigger() ? 'minWidth' : ''}
      popup={getMenuElementOrLambda()}
      onOpenChange={handleOpenChange}
      onPopupClick={onClick}
      getPopupContainer={getPopupContainer}
    >
      {childrenNode}
    </Trigger>
  );
});

export default Dropdown;

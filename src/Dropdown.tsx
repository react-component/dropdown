import type { TriggerProps } from '@rc-component/trigger';
import Trigger from '@rc-component/trigger';
import type {
  ActionType,
  AlignType,
  AnimationType,
  BuildInPlacements,
} from '@rc-component/trigger/lib/interface';
import { composeRef, getNodeRef, supportRef } from '@rc-component/util/lib/ref';
import classNames from 'classnames';
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
  onVisibleChange?: (visible: boolean) => void;
  onOverlayClick?: (e: Event) => void;
  prefixCls?: string;
  transitionName?: string;
  overlayClassName?: string;
  openClassName?: string;
  animation?: AnimationType;
  align?: AlignType;
  overlayStyle?: React.CSSProperties;
  placement?: keyof typeof Placements;
  placements?: BuildInPlacements;
  overlay?: (() => React.ReactElement) | React.ReactElement;
  trigger?: ActionType | ActionType[];
  alignPoint?: boolean;
  showAction?: ActionType[];
  hideAction?: ActionType[];
  visible?: boolean;
  autoFocus?: boolean;
}

function Dropdown(props: DropdownProps, ref) {
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
    visible,
    trigger = ['hover'],
    autoFocus,
    overlay,
    children,
    onVisibleChange,
    ...otherProps
  } = props;

  const [triggerVisible, setTriggerVisible] = React.useState<boolean>();
  const mergedVisible = 'visible' in props ? visible : triggerVisible;
  const mergedMotionName = animation
    ? `${prefixCls}-${animation}`
    : transitionName;

  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const childRef = React.useRef(null);
  React.useImperativeHandle(ref, () => triggerRef.current);

  const handleVisibleChange = (newVisible: boolean) => {
    setTriggerVisible(newVisible);
    onVisibleChange?.(newVisible);
  };

  useAccessibility({
    visible: mergedVisible,
    triggerRef: childRef,
    onVisibleChange: handleVisibleChange,
    autoFocus,
    overlayRef,
  });

  const onClick = (e) => {
    const { onOverlayClick } = props;
    setTriggerVisible(false);

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

  const childrenNode = React.cloneElement(children, {
    className: classNames(
      children.props?.className,
      mergedVisible && getOpenClassName(),
    ),
    ref: supportRef(children)
      ? composeRef(childRef, getNodeRef(children))
      : undefined,
  });

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
      popupClassName={classNames(overlayClassName, {
        [`${prefixCls}-show-arrow`]: arrow,
      })}
      popupStyle={overlayStyle}
      action={trigger}
      showAction={showAction}
      hideAction={triggerHideAction}
      popupPlacement={placement}
      popupAlign={align}
      popupMotion={{ motionName: mergedMotionName }}
      popupVisible={mergedVisible}
      stretch={getMinOverlayWidthMatchTrigger() ? 'minWidth' : ''}
      popup={getMenuElementOrLambda()}
      onPopupVisibleChange={handleVisibleChange}
      onPopupClick={onClick}
      getPopupContainer={getPopupContainer}
    >
      {childrenNode}
    </Trigger>
  );
}

export default React.forwardRef(Dropdown);

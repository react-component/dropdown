import * as React from 'react';
import Trigger from '@rc-component/trigger';
import type { TriggerProps } from '@rc-component/trigger';
import classNames from 'classnames';
import type {
  AnimationType,
  AlignType,
  BuildInPlacements,
  ActionType,
} from '@rc-component/trigger/lib/interface';
import Placements from './placements';
import useAccessibility from './hooks/useAccessibility';
import Overlay from './Overlay';
import { composeRef, supportRef } from 'rc-util/lib/ref';
import { ReactElement } from 'react';

export interface DropdownProps
  extends Pick<
    TriggerProps,
    | 'getPopupContainer'
    | 'children'
    | 'mouseEnterDelay'
    | 'mouseLeaveDelay'
    | 'onPopupAlign'
    | 'builtinPlacements'
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
  placement?: string;
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
    ...otherProps
  } = props;

  const [triggerVisible, setTriggerVisible] = React.useState<boolean>();
  const mergedVisible = 'visible' in props ? visible : triggerVisible;

  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const childRef = React.useRef(null);
  React.useImperativeHandle(ref, () => triggerRef.current);

  useAccessibility({
    visible: mergedVisible,
    setTriggerVisible,
    triggerRef: childRef,
    onVisibleChange: props.onVisibleChange,
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

  const onVisibleChange = (newVisible: boolean) => {
    const { onVisibleChange: onVisibleChangeProp } = props;
    setTriggerVisible(newVisible);
    if (typeof onVisibleChangeProp === 'function') {
      onVisibleChangeProp(newVisible);
    }
  };

  const getMenuElement = () => <Overlay ref={overlayRef} overlay={overlay} prefixCls={prefixCls} arrow={arrow} />

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
    className: classNames(children.props?.className, mergedVisible && getOpenClassName()),
    ref: supportRef(children) ? composeRef(childRef, (children as ReactElement & {ref: React.Ref<HTMLElement>}).ref) : undefined,
  })

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
      popupTransitionName={transitionName}
      popupAnimation={animation}
      popupVisible={mergedVisible}
      stretch={getMinOverlayWidthMatchTrigger() ? 'minWidth' : ''}
      popup={getMenuElementOrLambda()}
      onPopupVisibleChange={onVisibleChange}
      onPopupClick={onClick}
      getPopupContainer={getPopupContainer}
    >
      {childrenNode}
    </Trigger>
  );
}

export default React.forwardRef(Dropdown);

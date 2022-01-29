import * as React from 'react';
import Trigger from 'rc-trigger';
import type { TriggerProps } from 'rc-trigger';
import classNames from 'classnames';
import type {
  AnimationType,
  AlignType,
  BuildInPlacements,
  ActionType,
} from 'rc-trigger/lib/interface';
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
    ...otherProps
  } = props;

  const [triggerVisible, setTriggerVisible] = React.useState<boolean>();
  const mergedVisible = 'visible' in props ? visible : triggerVisible;

  const triggerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => triggerRef.current);

  const getOverlayElement = (): React.ReactElement => {
    const { overlay } = props;
    let overlayElement: React.ReactElement;
    if (typeof overlay === 'function') {
      overlayElement = overlay();
    } else {
      overlayElement = overlay;
    }
    return overlayElement;
  };

  const onClick = (e) => {
    const { onOverlayClick } = props;
    const overlayProps = getOverlayElement().props;
    setTriggerVisible(false);

    if (onOverlayClick) {
      onOverlayClick(e);
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  };

  const onVisibleChange = (newVisible: boolean) => {
    const { onVisibleChange: onVisibleChangeProp } = props;
    setTriggerVisible(newVisible);
    if (typeof onVisibleChangeProp === 'function') {
      onVisibleChangeProp(newVisible);
    }
  };

  const getMenuElement = () => {
    const overlayElement = getOverlayElement();
    const extraOverlayProps = {
      prefixCls: `${prefixCls}-menu`,
      onClick,
    };
    if (typeof overlayElement.type === 'string') {
      delete extraOverlayProps.prefixCls;
    }
    return (
      <>
        {arrow && <div className={`${prefixCls}-arrow`} />}
        {React.cloneElement(overlayElement, extraOverlayProps)}
      </>
    );
  };

  const getMenuElementOrLambda = () => {
    const { overlay } = props;
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

  const renderChildren = () => {
    const { children } = props;
    const childrenProps = children.props ? children.props : {};
    const childClassName = classNames(childrenProps.className, getOpenClassName());
    return mergedVisible && children
      ? React.cloneElement(children, {
          className: childClassName,
        })
      : children;
  };

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
      hideAction={triggerHideAction || []}
      popupPlacement={placement}
      popupAlign={align}
      popupTransitionName={transitionName}
      popupAnimation={animation}
      popupVisible={mergedVisible}
      stretch={getMinOverlayWidthMatchTrigger() ? 'minWidth' : ''}
      popup={getMenuElementOrLambda()}
      onPopupVisibleChange={onVisibleChange}
      getPopupContainer={getPopupContainer}
    >
      {renderChildren()}
    </Trigger>
  );
}

export default React.forwardRef(Dropdown);

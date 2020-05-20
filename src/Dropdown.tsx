import * as React from 'react';
import Trigger, { TriggerProps } from 'rc-trigger';
import classNames from 'classnames';
import { AnimationType, AlignType, BuildInPlacements, ActionType } from 'rc-trigger/lib/interface';
import Placements from './placements';

// Used for accessibility
let uuid = 0;

export interface DropdownProps extends Pick<TriggerProps, 'getPopupContainer' | 'children'> {
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
    children,
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

  const onClick = e => {
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

  const onVisibleChange = (visible: boolean) => {
    const { onVisibleChange } = props;
    setTriggerVisible(visible);
    if (typeof onVisibleChange === 'function') {
      onVisibleChange(visible);
    }
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

  // ======================= Children ========================
  let childNode: React.ReactElement = children;
  const childrenProps = children.props ? children.props : {};

  const [innerId, setInnerId] = React.useState<string>();
  const mergedId = childrenProps.id || innerId;
  const popupId = `${mergedId}-popup`;

  // Dynamic add id if needed
  React.useEffect(() => {
    setInnerId(`${prefixCls}-${uuid}`);
    uuid += 1;
  }, []);

  if (children) {
    const additionalProps: { className?: string } = {};

    if (triggerVisible) {
      additionalProps.className = classNames(childrenProps.className, getOpenClassName());
    }

    childNode = React.cloneElement(children, {
      'aria-haspopup': 'listbox',
      'aria-controls': popupId,
      'aria-expanded': triggerVisible,
      ...childrenProps,
      ...additionalProps,
      id: mergedId,
    });
  }

  // ========================= Popup =========================
  const getMenuElement = () => {
    const overlayElement = getOverlayElement();
    const extraOverlayProps = {
      prefixCls: `${prefixCls}-menu`,
      id: popupId,
      tabIndex: -1,
      role: 'listbox',
      // 'aria-activedescendant'
      onClick,
    };
    if (typeof overlayElement.type === 'string') {
      delete extraOverlayProps.prefixCls;
    }
    return (
      <React.Fragment>
        <div className={`${prefixCls}-arrow`}>{/* Insert the arrow element here */}</div>
        {React.cloneElement(overlayElement, extraOverlayProps)}
      </React.Fragment>
    );
  };

  const getMenuElementOrLambda = () => {
    const { overlay } = props;
    if (typeof overlay === 'function') {
      return getMenuElement;
    }
    return getMenuElement();
  };

  // ======================== Trigger ========================
  let triggerHideAction = hideAction;
  if (!triggerHideAction && trigger.indexOf('contextMenu') !== -1) {
    triggerHideAction = ['click'];
  }

  const overlayClass = arrow
    ? `${overlayClassName || ''} ${prefixCls}-show-arrow`
    : `${overlayClassName || ''}`;

  // ======================== Render =========================
  return (
    <Trigger
      {...otherProps}
      prefixCls={prefixCls}
      ref={triggerRef}
      popupClassName={overlayClass}
      popupStyle={overlayStyle}
      builtinPlacements={placements}
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
      {childNode}
    </Trigger>
  );
}

export default React.forwardRef(Dropdown);

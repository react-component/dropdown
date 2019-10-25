import * as React from 'react'
import Trigger, { TriggerProps } from 'rc-trigger'
import classNames from 'classnames'
import {
  AnimationType,
  AlignType,
  BuildInPlacements,
  ActionType,
} from 'rc-trigger/lib/interface'
import Placements from './placements'

export interface DropdownProps
  extends Pick<TriggerProps, 'getPopupContainer' | 'children'> {
  minOverlayWidthMatchTrigger: boolean
  onVisibleChange: (visible: boolean) => void
  onOverlayClick: (e: Event) => void
  prefixCls: string
  transitionName: string
  overlayClassName: string
  openClassName: string
  animation: AnimationType
  align: AlignType
  overlayStyle: React.CSSProperties
  placement: string
  placements: BuildInPlacements
  overlay: (() => React.ReactElement) | React.ReactElement
  trigger: ActionType | ActionType[]
  alignPoint: boolean
  showAction: ActionType[]
  hideAction: ActionType[]
  visible: boolean
  defaultVisible: boolean
}

function Dropdown(props: DropdownProps, ref) {
  const {
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
  } = props

  const [triggerVisible, setTriggerVisible] = React.useState(!!visible)
  React.useEffect(() => {
    setTriggerVisible(visible)
  }, [visible])

  const triggerRef = React.useRef(null)
  React.useImperativeHandle(ref, () => triggerRef.current)

  const getOverlayElement = (): React.ReactElement => {
    const { overlay } = props
    let overlayElement
    if (typeof overlay === 'function') {
      overlayElement = overlay()
    } else {
      overlayElement = overlay
    }
    return overlayElement
  }

  const onClick = e => {
    const overlayProps = getOverlayElement().props
    // do no call onVisibleChange, if you need click to hide, use onClick and control visible
    if (!('visible' in props)) {
      setTriggerVisible(false)
    }

    if (props.onOverlayClick) {
      props.onOverlayClick(e)
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e)
    }
  }

  const onVisibleChange = (visible: boolean) => {
    if (!('visible' in props)) {
      setTriggerVisible(visible)
    }
    if (typeof props.onVisibleChange === 'function') {
      props.onVisibleChange(visible)
    }
  }

  const getMenuElement = () => {
    const overlayElement = getOverlayElement()
    const extraOverlayProps = {
      prefixCls: `${prefixCls}-menu`,
      onClick,
    }
    if (typeof overlayElement.type === 'string') {
      delete extraOverlayProps.prefixCls
    }
    return React.cloneElement(overlayElement, extraOverlayProps)
  }

  const getMenuElementOrLambda = () => {
    const { overlay } = props
    if (typeof overlay === 'function') {
      return getMenuElement
    }
    return getMenuElement()
  }

  const getMinOverlayWidthMatchTrigger = () => {
    const { minOverlayWidthMatchTrigger, alignPoint } = props
    if ('minOverlayWidthMatchTrigger' in props) {
      return minOverlayWidthMatchTrigger
    }

    return !alignPoint
  }

  const afterVisibleChange = visible => {
    if (visible && getMinOverlayWidthMatchTrigger()) {
      const { current } = triggerRef
      const overlayNode = current.getPopupDomNode()
      if (
        current &&
        overlayNode &&
        current.offsetWidth > overlayNode.offsetWidth
      ) {
        overlayNode.style.minWidth = `${current.offsetWidth}px`
        // eslint-disable-next-line no-underscore-dangle
        if (current && current._component && current._component.alignInstance) {
          // eslint-disable-next-line no-underscore-dangle
          current._component.alignInstance.forceAlign()
        }
      }
    }
  }

  const getOpenClassName = () => {
    const { openClassName } = props
    if (openClassName !== undefined) {
      return openClassName
    }
    return `${prefixCls}-open`
  }

  const renderChildren = () => {
    const { children, visible } = props
    const childrenProps = children.props ? children.props : {}
    const childClassName = classNames(
      childrenProps.className,
      getOpenClassName(),
    )
    return visible && children
      ? React.cloneElement(children, { className: childClassName })
      : children
  }

  let triggerHideAction = hideAction
  if (!triggerHideAction && trigger.indexOf('contextMenu') !== -1) {
    triggerHideAction = ['click']
  }

  return (
    <Trigger
      {...otherProps}
      prefixCls={prefixCls}
      ref={triggerRef}
      popupClassName={overlayClassName}
      popupStyle={overlayStyle}
      builtinPlacements={placements}
      action={trigger}
      showAction={showAction}
      hideAction={triggerHideAction || []}
      popupPlacement={placement}
      popupAlign={align}
      popupTransitionName={transitionName}
      popupAnimation={animation}
      popupVisible={triggerVisible}
      afterPopupVisibleChange={afterVisibleChange}
      popup={getMenuElementOrLambda()}
      onPopupVisibleChange={onVisibleChange}
      getPopupContainer={getPopupContainer}
    >
      {renderChildren()}
    </Trigger>
  )
}

export default React.forwardRef(Dropdown)

import * as React from "react";

export interface Props {
  minOverlayWidthMatchTrigger: boolean,
    onVisibleChange: Function,
    onOverlayClick: Function,
    prefixCls: string,
    children: any,
    transitionName: string,
    overlayClassName: string,
    openClassName: string,
    animation: any,
    align: object,
    overlayStyle: object,
    placement: string,
    overlay: React.ReactNode,
    trigger: any[],
    alignPoint: boolean,
    showAction: any[],
    hideAction: any[],
    getPopupContainer: Function,
    visible: boolean,
    defaultVisible: boolean,
}

export default class Dropdown extends React.Component<Props> {}
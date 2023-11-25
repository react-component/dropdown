import React, { forwardRef, ReactElement, useMemo } from 'react';
import type { DropdownProps } from './Dropdown';
import { composeRef, supportRef } from 'rc-util/lib/ref';

export type OverlayProps = Pick<DropdownProps, 'overlay' | 'arrow' | 'prefixCls'>

const Overlay = forwardRef<HTMLElement, OverlayProps>((props, ref) => {
  const {overlay, arrow, prefixCls} = props;

  const overlayNode = useMemo(() => {
    let overlayElement: React.ReactElement;
    if (typeof overlay === 'function') {
      overlayElement = overlay();
    } else {
      overlayElement = overlay;
    }
    return overlayElement;
  }, [overlay]);

  const composedRef = composeRef(ref, (overlayNode as ReactElement & {ref: React.Ref<HTMLElement>})?.ref);

  return (
    <>
      {arrow && <div className={`${prefixCls}-arrow`} />}
      {React.cloneElement(overlayNode, { ref: supportRef(overlayNode) ? composedRef : undefined })}
    </>
  )
});

export default Overlay;
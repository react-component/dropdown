import { composeRef, getNodeRef, supportRef } from 'rc-util/lib/ref';
import React, { forwardRef, useMemo } from 'react';
import type { DropdownProps } from './Dropdown';

export type OverlayProps = Pick<
  DropdownProps,
  'overlay' | 'arrow' | 'prefixCls'
>;

const Overlay = forwardRef<HTMLElement, OverlayProps>((props, ref) => {
  const { overlay, arrow, prefixCls } = props;

  const overlayNode = useMemo(() => {
    let overlayElement: React.ReactElement;
    if (typeof overlay === 'function') {
      overlayElement = overlay();
    } else {
      overlayElement = overlay;
    }
    return overlayElement;
  }, [overlay]);

  const composedRef = composeRef(ref, getNodeRef(overlayNode));

  return (
    <>
      {arrow && <div className={`${prefixCls}-arrow`} />}
      {React.cloneElement(overlayNode, {
        ref: supportRef(overlayNode) ? composedRef : undefined,
      })}
    </>
  );
});

export default Overlay;

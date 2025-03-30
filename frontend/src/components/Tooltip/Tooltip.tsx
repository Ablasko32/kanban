import {
  flip,
  FloatingPortal,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
  arrow,
  FloatingArrow,
} from "@floating-ui/react";
import React, { useRef, useState } from "react";
import styles from "./tooltip.module.css";

const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: open,
    onOpenChange: setOpen,
    middleware: [flip(), offset(10), shift(), arrow({ element: arrowRef })],
    placement: "bottom",
  });

  const hover = useHover(context, {
    delay: {
      open: 500,
      close: 0,
    },
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([hover]);

  return (
    <>
      <span {...getReferenceProps()} ref={refs.setReference}>
        {children}
      </span>
      {open && (
        <FloatingPortal>
          <div
            className={styles.tooltipBody}
            {...getFloatingProps()}
            ref={refs.setFloating}
            style={floatingStyles}
          >
            {text}
            <FloatingArrow ref={arrowRef} context={context} />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;

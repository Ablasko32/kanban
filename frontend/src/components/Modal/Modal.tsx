import {
  FloatingFocusManager,
  FloatingOverlay,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import React, { useState } from "react";
import styles from "./modal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({
  children,
  trigger,
  triggerClassName,
}: {
  children: React.ReactNode;
  trigger: any;
  triggerClassName?: StyleSheet;
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
  });

  const click = useClick(context, { enabled: true });
  const dismiss = useDismiss(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <>
      <span
        className={`${styles.trigger} ${
          triggerClassName ? triggerClassName : ""
        }`}
        {...getReferenceProps()}
        ref={refs.setReference}
      >
        {trigger}
      </span>
      {isOpen && (
        <FloatingOverlay className={styles.overlay}>
          <FloatingFocusManager context={context}>
            <div
              className={styles.modal}
              {...getFloatingProps()}
              ref={refs.setFloating}
            >
              {children}

              <button
                onClick={() => setOpen(false)}
                className={styles.closeModal}
              >
                <IoIosCloseCircleOutline />
              </button>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </>
  );
};

export default Modal;

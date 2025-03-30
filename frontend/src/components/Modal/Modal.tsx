import {
  FloatingFocusManager,
  FloatingOverlay,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import styles from "./modal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ModalStore } from "../../stores/modalStore";
import { observer } from "mobx-react";

const Modal = observer(
  ({
    trigger,
    triggerClassName,
    modalStore,
  }: {
    trigger: any;
    triggerClassName?: string;
    modalStore: ModalStore;
  }) => {
    const { refs, context } = useFloating({
      open: modalStore.isOpen,
      onOpenChange: (open) => {
        if (!open) {
          modalStore.openModal(modalStore.content);
        }
      },
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
        {modalStore.isOpen && (
          <FloatingOverlay className={styles.overlay}>
            <FloatingFocusManager context={context}>
              <div
                className={styles.modal}
                {...getFloatingProps()}
                ref={refs.setFloating}
              >
                {modalStore.content}

                <button
                  onClick={() => modalStore.closeModal()}
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
  }
);

export default Modal;

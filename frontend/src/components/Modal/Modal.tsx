import {
  FloatingFocusManager,
  FloatingOverlay,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import styles from "./modal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { observer } from "mobx-react";
import { useStoreProvider } from "../../stores/StoreProvider";

const Modal = observer(() => {
  const { modalStore } = useStoreProvider();

  const { refs, context } = useFloating({
    open: modalStore.isOpen,
    onOpenChange: (open) => {
      if (!open) {
        modalStore.closeModal();
      }
    },
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([dismiss]);

  return (
    <>
      <span {...getReferenceProps()} ref={refs.setReference}></span>
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
});

export default Modal;

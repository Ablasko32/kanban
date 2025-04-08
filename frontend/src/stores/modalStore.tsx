import { action, makeObservable, observable } from "mobx";
import { ReactNode } from "react";
import styles from "../components/Modal/modal.module.css";

export class ModalStore {
  content: ReactNode = null;

  isOpen: boolean = false;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      openModal: action,
      closeModal: action,
    });
  }

  openModal(content: ReactNode) {
    this.isOpen = true;
    this.content = content;
  }

  closeModal() {
    this.content = null;
    this.isOpen = false;
  }

  showConfirm(message: string, onConfirm: () => void) {
    const ModalContent = () => {
      return (
        <div className={styles.showConfirmModal}>
          <p className={styles.message}>{message}</p>
          <div className={styles.confirmModalButtons}>
            <button
              className={styles.primaryBtn}
              onClick={() => {
                onConfirm();
                this.closeModal();
              }}
            >
              Confirm
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={() => this.closeModal()}
            >
              Close
            </button>
          </div>
        </div>
      );
    };
    this.openModal(ModalContent());
  }
}

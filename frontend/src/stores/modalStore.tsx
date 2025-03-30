import { action, makeObservable, observable } from "mobx";
import { ReactNode } from "react";

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
}
// Singelton
export const modalStore = new ModalStore();

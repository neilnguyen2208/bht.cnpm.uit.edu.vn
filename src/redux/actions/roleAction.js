import {
  CLOSE_MODAL,
  OPEN_MODAL
} from "./modalConstants";

export function openModal(modalType, modalProps) {
  return {
      type : OPEN_MODAL,
      payload : { modalType, modalProps}
  };
}

export function closeModal() {
  return {
      type : CLOSE_MODAL
  };
}
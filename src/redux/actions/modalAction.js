import {
  MODAL_CLOSE,
  MODAL_OPEN,

  //use another quere for bottom left modal
  MODAL_BL_OPEN,
  MODAL_BL_CLOSE,

  MODAL_BIG_OPEN,
  MODAL_BIG_CLOSE
} from "../constants";

export function openModal(modalType, modalProps) {
  //type: alert, confirmation, form
  return {
    type: MODAL_OPEN,
    payload: { modalType, modalProps }
  };
}

export function closeModal() {
  return {
    type: MODAL_CLOSE
  };
}

export function openBLModal(modalProps) {
  //type: alert, confirmation, form
  return {
    type: MODAL_BL_OPEN,
    payload: { modalProps }
  };
}

export function closeBLModal(data) {
  return {
    type: MODAL_BL_CLOSE,
    payload: data
  };
}

export function openBigModal(modalType, modalProps) {
  //type: alert, confirmation, form
  return {
    type: MODAL_BIG_OPEN,
    payload: { modalType, modalProps }
  };
}

export function closeBigModal(data) {
  return {
    type: MODAL_BIG_CLOSE,
    payload: data
  };
}
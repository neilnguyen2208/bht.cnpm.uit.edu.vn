import {
  MODAL_CLOSE,
  MODAL_OPEN,

  //use another quere for bottom left modal
  MODAL_BL_OPEN,
  MODAL_BL_CLOSE,

  MODAL_BIG_OPEN,
  MODAL_BIG_CLOSE
} from "../constants";

export function openModalAction(modalType, modalProps) {
  //type: alert, confirmation, form
  return {
    type: MODAL_OPEN,
    payload: { modalType, modalProps }
  };
}

export function closeModalAction() {
  return {
    type: MODAL_CLOSE
  };
}

export function openBLModalAction(modalProps) {
  //type: alert, confirmation, form
  return {
    type: MODAL_BL_OPEN,
    payload: { modalProps }
  };
}

export function closeBLModalAction(data) {
  return {
    type: MODAL_BL_CLOSE,
    payload: data
  };
}

export function openBigModalAction(modalType, modalProps) {
  //type: alert, confirmation, form
  return {
    type: MODAL_BIG_OPEN,
    payload: { modalType, modalProps }
  };
}

export function closeBigModalAction(data) {
  return {
    type: MODAL_BIG_CLOSE,
    payload: data
  };
}
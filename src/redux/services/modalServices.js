import store from 'redux/store/index'
import {
  openBLModalAction,
  closeBLModalAction,
  openModalAction,
  closeModalAction,
  openBigModalAction,
  closeBigModalAction,
  closeCommentModalAction,
  openCommentModalAction

} from 'redux/actions/modalAction'

export function openBLModal(modalProps) {
  return store.dispatch(openBLModalAction(modalProps));
}

export function closeBLModal(modalProps) {
  return store.dispatch(closeBLModalAction(modalProps));
}

export function closeBigModal(modalProps) {
  return store.dispatch(closeBigModalAction(modalProps));
}

export function openBigModal(type, ...modalProps) {
  return store.dispatch(openBigModalAction(type, ...modalProps));
}

export function openModal(type, ...modalProps) {
  return store.dispatch(openModalAction(type, ...modalProps));
}

export function closeModal(modalProps) {
  return store.dispatch(closeModalAction(modalProps));
}

export function closeCommentModal(modalProps) {
  //set animation
  // comment-modal-container
  return store.dispatch(closeCommentModalAction(modalProps));
}

export function openCommentModal(...modalProps) {
  return store.dispatch(openCommentModalAction(...modalProps));
}
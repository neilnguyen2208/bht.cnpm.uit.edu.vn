import {
  MODAL_CLOSE,
  MODAL_OPEN
} from "../constants.js";

const initialState = [];

function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN:
      {
        const { modalType, modalProps } = action.payload;
        //push modal vao stack
        return state.concat({ modalType, modalProps });
      }
    case MODAL_CLOSE:
      {
        //pop last modal ra khoi stack
        const newState = state.slice();
        newState.pop();
        return newState;
      }
    default:
      return state;
  }
}

export default ModalReducer;
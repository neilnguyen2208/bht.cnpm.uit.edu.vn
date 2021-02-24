import {
  MODAL_CLOSE,
  MODAL_OPEN,
  MODAL_BL_OPEN,
  MODAL_BL_CLOSE,
  MODAL_BIG_OPEN,
  MODAL_BIG_CLOSE
} from "../constants.js";

const initialState = { modal: [], blModal: [], bigModal: [] }

function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN:
      {
        const { modalType, modalProps } = action.payload;
        let newModalState = state.modal.concat({ modalType, modalProps })
        //push modal vao stack
        return { ...state, modal: newModalState };
      }
    case MODAL_CLOSE:
      {
        //pop last modal ra khoi stack
        const newModalState = state.modal.slice();
        newModalState.pop();
        return { ...state, modal: newModalState };

      }
    case MODAL_BL_OPEN:
      {
        const { modalProps } = action.payload;
        let newBLModalState = state.blModal.concat({ modalProps })

        //neu nhu 3 item da day => cap nhat vao item dau tien => cai nay lam sau di
        return { ...state, blModal: newBLModalState }
      }
    case MODAL_BL_CLOSE:
      {
        //use id sau nay
        // const { id } = action.payload;
        // let newBLModalState = state.blModal.filter(item => item.id !== id);//cho nay dang bug nhung ma bo qua :D
        // const newModalState = state.blModal.slice();
        // newModalState.pop();
        return { ...state, blModal: [] };

      }

    case MODAL_BIG_OPEN:
      {
        const { modalType, modalProps } = action.payload;
        let newBigModalState = state.bigModal.concat({ modalType, modalProps })

        //neu nhu 3 item da day => cap nhat vao item dau tien => cai nay lam sau di
        return { ...state, bigModal: newBigModalState }
      }
    case MODAL_BIG_CLOSE:
      {
        //use id sau nay
        // const { id } = action.payload;
        // let newBLModalState = state.blModal.filter(item => item.id !== id);//cho nay dang bug nhung ma bo qua :D
        const newBigModalState = state.bigModal.slice();
        newBigModalState.pop();
        return { ...state, bigModal: newBigModalState };

      }
    default:
      return state;
  }
}

export default ModalReducer;
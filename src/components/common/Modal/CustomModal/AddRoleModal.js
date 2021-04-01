import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal } from "redux/services/modalServices";
import store from 'redux/store/index.js'
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'

export default class AddRoleModal extends React.Component {
    closeModal = () => {
        store.dispatch(closeBigModal())
    }
    render() {
        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper form login-modal">
                    </div>
                </div>
            </div>
        );
    }

}


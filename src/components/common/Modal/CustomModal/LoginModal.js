import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal } from "redux/services/modalServices";
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import LoginForm from 'components/common/Login&Register/LoginForm'
import close_icon from 'assets/icons/24x24/red_delete_icon_24x24.png'

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper form login-modal">
                        {!this.props.hideClose && <img className="close-login-modal" alt="x" src={close_icon} onClick={closeBigModal} />}
                        < LoginForm />
                    </div>
                </div>
            </div>
        );
    }

}


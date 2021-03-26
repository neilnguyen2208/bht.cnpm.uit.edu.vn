import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal, closeModal, openModal } from "redux/actions/modalAction";
import store from 'redux/store/index.js'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import LoginForm from 'components/common/Login&Register/LoginForm'

class Login extends React.Component {
    closeModal = () => {
        store.dispatch(closeBigModal())
    }
    render() {
        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper form login-modal">
                        <div className="login-sidebar"></div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

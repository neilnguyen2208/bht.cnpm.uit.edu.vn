import React from 'react'
import './Titlebar.scss'
import store from 'redux/store/index.js'
import { closeBigModal, closeModal } from 'redux/services/modalServices'
import close_icon from 'assets/icons/24x24/red_delete_icon_24x24.png'

class ModalTitlebar extends React.Component {

    closeModal = () => {
        if (this.props.form)
            closeModal()
        else {
            if (window.location.pathname.substring(0, 13) === "/post-content")
                window.location.reload();
            store.dispatch(closeBigModal());
        }
    }
    render() {
        return (
            <div className="c-title-bar">
                <div className="main-title">{this.props.title}</div>
                <div className="modal-close-icon">
                    <img src={close_icon} alt="x" onClick={() => this.closeModal()} />
                </div>
            </div>
        );
    }
}
export default ModalTitlebar;
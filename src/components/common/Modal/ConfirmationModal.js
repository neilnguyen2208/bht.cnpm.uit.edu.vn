import React from "react";
import './Modal.scss'
import 'components/styles/Button.scss'
import red_delete_icon from 'assets/icons/24x24/red_delete_icon_24x24.png'
import confirmation_icon from 'assets/icons/300x300/confirmation_icon.png'
import { closeModal } from "redux/actions/modalAction";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class ConfirmationModal extends React.Component {
    constructor(props) {
        super(props);
    }

    closeModal = () => {
        this.props.closeModal()
    }

    onOKClick = () => {
        if (this.props.onOKClick)
            this.props.onOKClick();
    }

    onCancelClick = () => {
        this.props.closeModal();
        if (this.props.onCancelClick)
            this.props.onCancelClick();
    }

    render() {

        let { title, text, confirmText, cancelText } = this.props;

        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper">
                        <div className="modal-header">
                            <div> {title} </div>
                            <img className="modal-close-modal" alt="header" src={red_delete_icon}
                                onClick={() => this.closeModal()} />
                        </div>

                        <div className="modal-body">
                            <img className="modal-main-icon" src={confirmation_icon} alt="icon" />
                            <div className="modal-content-container">
                                <div className="modal-text">
                                    {text}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="blue-button mg-0px" onClick={() => this.onOKClick()} >{confirmText ? confirmText : "Xác nhận"}</div>
                            <div className="mg-left-5px white-button" onClick={() => this.onCancelClick()} >{cancelText ? cancelText : "Huỷ"}</div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentModals: state.modal
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    closeModal
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal));

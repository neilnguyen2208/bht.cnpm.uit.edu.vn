import React from "react";
import './Modal.scss'
import 'components/styles/Button.scss'
import confirmation_icon from 'assets/icons/300x300/confirmation_icon.png'
import { closeModal } from "redux/services/modalServices";
import question_icon from 'assets/icons/24x24/question_icon_24x24.png'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class ConfirmationModal extends React.Component {

    closeModal = () => {
        this.props.closeModal()
    }

    onConfirmClick = () => {
        if (this.props.onConfirm)
            this.props.onConfirm();
    }

    onCancelClick = () => {
        this.props.closeModal();
        if (this.props.onCancel)
            this.props.onCancel();
    }

    render() {

        let { title, text, confirmText, cancelText } = this.props;

        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper d-flex">
                        <div className="modal-body">
                            <img className="modal-main-icon" src={confirmation_icon} alt="icon" />
                            <div className="modal-content-c">
                                <div className="modal-text d-flex">
                                    <div> {this.props.title}</div>
                                    <img src={question_icon} alt="?" className="confirmation-icon"></img>
                                </div>
                                <div className="modal-hint">
                                    {this.props.text}
                                </div>
                                <div className="simple-modal-footer">

                                    <div className="blue-button mg-0px" onClick={() => this.onConfirmClick()} >{confirmText ? confirmText : "Xác nhận"}</div>
                                    <div className="mg-left-5px white-button" onClick={() => this.onCancelClick()} >{cancelText ? cancelText : "Huỷ"}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    closeModal
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal));

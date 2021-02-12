import React from "react";
import './Modal.scss'
import 'components/styles/SimpleButton.scss'
import red_delete_icon from 'assets/images/red_delete_icon.png'
import success_management_icon from 'assets/images/success_management_icon.png'
import fail_management_icon from 'assets/images/fail_management_icon.png'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { closeModal } from "redux/actions/modalAction";

const actions = { closeModal };

class AlertModal extends React.Component {
    constructor(props) {
        super(props);
    }

    closeModal = () => {
        this.props.closeModal();
    }

    onOKClick = () => {
        this.props.closeModal();
        if (this.props.onOKClick)
            this.props.onOKClick();
    }

    render() {
        let { type, title, text } = this.props;
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
                            {(type === "success") ?
                                <img className="modal-main-icon" src={success_management_icon} alt="icon" />
                                :
                                <img className="modal-main-icon" src={fail_management_icon} alt="icon" />
                            }
                            <div className="modal-content-container">
                                <div className="modal-text">
                                    {text}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="blue-button" onClick={() => this.onOKClick()} >OK</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        currentModals: state.modal
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    closeModal
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertModal));

import React from "react";
import './Modal.scss'
import 'components/styles/Button.scss'
import red_delete_icon from 'assets/icons/24x24/red_delete_icon_24x24.png'
import success_management_icon from 'assets/icons/300x300/success_icon.png'
import fail_management_icon from 'assets/icons/300x300/failure_icon.png'

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
        let { icon, text, linkText, internalLink } = this.props;
        return (
            <div className="modal-fixed-layout">
                <div className="bottom-left-modal">
                    {icon ? <img className="bl-modal-main-icon" src={icon} alt="icon" /> : <></>}
                    {/* bl is stand for bottom-left */}
                    <div className="modal-content-container">
                        <div className="bl-modal-text">
                            {text}
                        </div>
                        <div className="modal-text">
                            {text}
                        </div>
                    </div>
                    <img className="bl-modal-close-modal" alt="header" src={red_delete_icon}
                        onClick={() => this.closeModal()} />
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertModal));

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
import store from 'redux/store/index.js'

class AlertModal extends React.Component {
    constructor(props) {
        super(props);
    }

    closeModal = () => {
        store.dispatch(closeModal())
    }

    onOKClick = () => {
        store.dispatch(closeModal())
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
    return {
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
   
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertModal));

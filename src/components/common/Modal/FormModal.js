import React from "react";
import './Modal.scss'
import 'components/styles/Button.scss'
import red_delete_icon from 'assets/icons/24x24/red_delete_icon_24x24.png'
import { closeModal } from "redux/actions/modalAction";
import store from 'redux/store/index.js'

export default class FormModal extends React.Component {
    constructor(props) {
        super(props);
       
    }

    closeModal = () => {
        this.props.closeModal()
    }

    onSubmitClick = () => {
        this.props.closeModal();
        if (this.props.onSubmit)
            this.props.onSubmit();
    }

    onCancelClick = () => {
        if (this.props.onCancel)
            this.props.onCancel();
    }

    render() {

        let { submitText, cancelText, form } = this.props;

        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper">
                        <div className="modal-header">
                            <div> {this.props.title} </div>
                            <img className="modal-close-modal" alt="header" src={red_delete_icon}
                                onClick={() => this.closeModal()} />
                        </div>
                        {/* Tam thoi form se nhu the nay, sau nay su dung thi lam tiep */}
                        {this.props.form}
                        <div className="modal-footer">
                            <div className="blue-button" onClick={() => this.onSubmitClick()} >{submitText ? submitText : "Submit"}</div>
                            <div className="red-button" onClick={() => this.onCancelClick()} >{cancelText ? cancelText : "Cancel"}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
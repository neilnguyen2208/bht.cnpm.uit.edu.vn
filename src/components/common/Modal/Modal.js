import React from "react";
import './Modal.scss'
import 'components/styles/SimpleButton.scss'
import red_delete_icon from 'assets/images/red_delete_icon.png'
import confirmation_icon from 'assets/images/confirmation_management_icon.png'
import success_management_icon from 'assets/images/success_management_icon.png'
import fail_management_icon from 'assets/images/fail_management_icon.png'
import CourseSummaryItem from "components/course/CourseContentItem";
import { closeModal } from "redux/actions/modalAction";

const actions = { closeModal };

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: true }
    }

    closeModal = () => {
        this.setState({ isOpen: false });
    }

    onOKClick = () => {
        this.setState({ isOpen: false });
        if (this.props.onOKClick)
            this.props.onOKClick();
    }

    onCancelClick = () => {
        if (this.props.onCancelClick)
            this.props.onCancelClick();
    }

    render() {

        if (!this.state.isOpen) {
            return null;
        }

        if (!this.props.isOpen && this.props.isOpen !== undefined) {
            console.log(this.props.isOpen)
            return null;
        }

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
                        {!(this.props.type === "custom") ?
                            <>
                                <div className="modal-body">
                                    {(this.props.type === "alert_success") ?
                                        <img className="modal-main-icon" src={success_management_icon} alt="icon" />
                                        : <></>
                                    }
                                    {(this.props.type === "alert_failure") ?
                                        <img className="modal-main-icon" src={fail_management_icon} alt="icon" />
                                        : <></>
                                    }
                                    {(this.props.type === "confirmation") ?
                                        <img className="modal-main-icon" src={confirmation_icon} alt="icon" />
                                        : <></>
                                    }
                                    <div className="modal-content-container">
                                        <div className="modal-text">
                                            {this.props.text}
                                        </div>
                                    </div>
                                </div>

                                {(this.props.type === "confirmation") ?
                                    <div className="modal-footer">
                                        <div className="blue-button" onClick={() => this.onOKClick()} >Confirm</div>
                                        <div className="red-button" onClick={() => this.onCancelClick()} >Cancel</div>
                                    </div>
                                    : <></>
                                }

                                {(this.props.type === "alert_success" || this.props.type === "alert_failure") ?
                                    <div className="modal-footer">
                                        <div className="blue-button" onClick={() => this.onOKClick()} >OK</div>
                                    </div>
                                    : <></>
                                }
                            </>
                            :
                            <>
                                {this.props.children}
                            </>}
                    </div>
                </div>
            </div>
        );
    }
}
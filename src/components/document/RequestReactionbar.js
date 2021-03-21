import React, { Component } from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { approveADocument, rejectADocument, rejectAndFeedbackADocument } from 'redux/services/documentServices'
import { openModal, openBLModal, closeModal } from 'redux/actions/modalAction'
import store from 'redux/store/index'
import { validation } from 'utils/validationUtils'

class RequestedSummary extends Component {
    
    handleApprove = () => {
        store.dispatch(openModal("confirmation",
            {
                title: "Duyệt bài viết",
                text: "Bạn có chắc chắn muốn duyệt bài viết không?",
                onConfirm: () => this.onConfirmApprove(),
            }));

    }

    onConfirmApprove = () => {
        this.props.approveADocument(this.props.id);
    }

    handleReject = () => {
        store.dispatch(openModal("confirmation",
            {
                title: "Từ chối bài viết",
                text: "Bạn có chắc chắn muốn từ chối bài viết này không?",
                onConfirm: () => this.onConfirmReject(),
            }));
    }

    onConfirmReject = () => {
        this.props.rejectADocument(this.props.id);
    }

    handleRejectAndFeedback = () => {
        store.dispatch(openModal("form", {
            id: `rjafbdcm-form-modal`,//reject and feed back
            title: `TỪ CHỐI BÀI VIẾT`,
            formId: `rjafbdcm-form`,
            inputs:
                [
                    { //for rendering
                        id: `rjafbdcm-form-input`,
                        isRequired: true,
                        label: "Lý do từ chối:",
                        type: 'text-area',
                        placeHolder: "Nhập lý do từ chối ...",
                        validation: true,
                        key: "reason"
                    },
                ],
            append: { id: this.props.id },
            validationCondition: {
                form: `#rjafbdcm-form`,
                rules: [
                    //truyen vao id, loai component, message
                    validation.isRequired(`rjafbdcm-form-input`, 'text-area', 'Lý do không được để trống!'),
                    // validation.noSpecialChar(`rpp-form-input`, 'text-area', 'Lý do không được chứa ký tự đặc biệt!'),
                    validation.minLength(`rjafbdcm-form-input`, 'text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!'),
                ],

            },
            submitText: "Xác nhận",
            cancelText: "Huỷ",
            confirmBox: {
                title: "Từ chối bài viết?",
                text: "Bạn có chắc chắn muốn từ chối bài viết này không?",
                verifyText: "Xác nhận",
                cancelText: "Huỷ",
                onConfirm: DTO => this.onConfirmRejectAndFeedback(DTO)
            }
        }
        ));
    }

    handleReadMore = () => {

    }

    onConfirmRejectAndFeedback = (rejectDTO) => {
        this.props.rejectAndFeedbackADocument(rejectDTO.id, rejectDTO.reason)
    }

    render() {
  

        return (
            <div >
                {/* Metadata */}
                <div className="reaction-bar j-c-end pd-top-5px">
                    <button className="blue-button" onClick={() => this.handleApprove()}>Approve</button>
                    <button className="red-button mg-left-5px" onClick={() => this.handleReject()}>Reject</button>
                    <button className="white-button mg-left-5px" onClick={() => this.handleRejectAndFeedback()}>Reject & feedback</button>
                </div>
            </div >

        );
    }

}

const mapStateToProps = (state) => {
    return {
        isHaveApproved: state.document.isHaveApproved,
        isHaveRejected: state.document.isHaveRejected,
        isHaveRejectedAndFeedbacked: state.document.isHaveRejectedAndFeedbacked,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    approveADocument, rejectADocument, rejectAndFeedbackADocument
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestedSummary));
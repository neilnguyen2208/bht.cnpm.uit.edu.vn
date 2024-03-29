import React from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { approveADocument, rejectADocument, rejectAndFeedbackADocument } from 'redux/services/documentServices'
import { openModal } from 'redux/services/modalServices'
import { validation } from 'utils/validationUtils'

class RequestedSummary extends React.Component {

    handleApprove = () => {
        openModal("confirmation",
            {
                title: "Duyệt tài liệu",
                text: "Bạn có chắc chắn muốn duyệt tài liệu không?",
                onConfirm: () => this.onConfirmApprove(),
            });

    }

    onConfirmApprove = () => {
        this.props.approveADocument(this.props.documentID);
    }

    handleReject = () => {
        openModal("confirmation",
            {
                showIcon: true,
                title: "Từ chối tài liệu",
                text: "Bạn có chắc chắn muốn từ chối tài liệu này không?",
                onConfirm: () => this.onConfirmReject(),
            });
    }

    onConfirmReject = () => {
        this.props.rejectADocument(this.props.documentID);
    }

    handleRejectAndFeedback = () => {
        openModal("form", {
            id: `rjafbdcm-form-modal`,//reject and feed back
            title: `TỪ CHỐI TÀI LIỆU`,
            formId: `rjafbdcm-form`,
            inputs:
                [
                    { //for rendering
                        id: `rjafbdcm-form-input`,
                        isRequired: true,
                        label: "Lý do từ chối:",
                        type: 'text-area',
                        placeHolder: "Nhập lý do từ chối ",
                        validation: true,
                        key: "reason"
                    },
                ],
            append: { id: this.props.documentID },
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
                title: "Từ chối tài liệu?",
                text: "Bạn có chắc chắn muốn từ chối tài liệu này không?",
                verifyText: "Xác nhận",
                cancelText: "Huỷ",
                onConfirm: DTO => this.onConfirmRejectAndFeedback(DTO)
            }
        }
        );
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
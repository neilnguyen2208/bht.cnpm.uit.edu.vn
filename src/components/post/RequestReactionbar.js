import React from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { approveAPost, rejectAPost, rejectAndFeedbackAPost } from 'redux/services/postServices'
import { openModal } from 'redux/services/modalServices'
import { validation } from 'utils/validationUtils'

class RequestedSummary extends React.Component {

    handleApprove = () => {
        openModal("confirmation",
            {
                title: "Duyệt bài viết",
                text: "Bạn có chắc chắn muốn duyệt bài viết không?",
                onConfirm: () => this.onConfirmApprove(),
            });

    }

    onConfirmApprove = () => {
        this.props.approveAPost(this.props.id);
    }

    handleReject = () => {
        openModal("confirmation",
            {
                title: "Từ chối bài viết",
                text: "Bạn có chắc chắn muốn từ chối bài viết này không?",
                onConfirm: () => this.onConfirmReject(),
            });
    }

    onConfirmReject = () => {
        this.props.rejectAPost(this.props.id);
    }

    handleRejectAndFeedback = () => {
        openModal("form", {
            id: `rjafbp-form-modal`,//reject and feed back
            title: `TỪ CHỐI BÀI VIẾT`,
            formId: `rjafbp-form`,
            inputs:
                [
                    { //for rendering
                        id: `rjafbp-form-input`,
                        isRequired: true,
                        label: "Lý do từ chối:",
                        type: 'text-area',
                        placeHolder: "Nhập lý do từ chối ",
                        validation: true,
                        key: "reason"
                    },
                ],
            append: { id: this.props.id },
            validationCondition: {
                form: `#rjafbp-form`,
                rules: [
                    //truyen vao id, loai component, message
                    validation.isRequired(`rjafbp-form-input`, 'text-area', 'Lý do không được để trống!'),
                    // validation.noSpecialChar(`rpp-form-input`, 'text-area', 'Lý do không được chứa ký tự đặc biệt!'),
                    validation.minLength(`rjafbp-form-input`, 'text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!'),
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
        });
    }

    handleReadMore = () => {

    }

    onConfirmRejectAndFeedback = (rejectDTO) => {
        this.props.rejectAndFeedbackAPost(rejectDTO.id, rejectDTO.reason)
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
        isHaveApproved: state.post.isHaveApproved,
        isHaveRejected: state.post.isHaveRejected,
        isHaveRejectedAndFeedbacked: state.post.isHaveRejectedAndFeedbacked,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    approveAPost, rejectAPost, rejectAndFeedbackAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestedSummary));
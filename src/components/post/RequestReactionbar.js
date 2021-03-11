import React, { Component } from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { approveAPost, rejectAPost, rejectAndFeedbackAPost } from 'redux/services/postServices'
import { openModal, openBLModal, closeModal } from 'redux/actions/modalAction'
import store from 'redux/store/index'
import { post_ApproveAPostReset, delete_RejectAPostReset, delete_RejectAndFeedbackAPostReset } from 'redux/actions/postAction'
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
        this.props.approveAPost(this.props.id);
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
        this.props.rejectAPost(this.props.id);
    }

    handleRejectAndFeedback = () => {
        store.dispatch(openModal("form", {
            id: `rjafb-form-modal`,//reject and feed back
            title: `TỪ CHỐI BÀI VIẾT`,
            formId: `rjafb-form`,
            inputs:
                [
                    { //for rendering
                        id: `rjafb-form-input`,
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
                form: `#rjafb-form`,
                rules: [
                    //truyen vao id, loai component, message
                    validation.isRequired(`rjafb-form-input`, 'text-area', 'Lý do không được để trống!'),
                    // validation.noSpecialChar(`rpp-form-input`, 'text-area', 'Lý do không được chứa ký tự đặc biệt!'),
                    validation.minLength(`rjafb-form-input`, 'text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!'),
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
        this.props.rejectAndFeedbackAPost(rejectDTO.id, rejectDTO.reason)
    }

    render() {
        if (this.props.isHaveApproved) {
            store.dispatch(closeModal());
            store.dispatch(post_ApproveAPostReset());
            store.dispatch(openBLModal({ icon: done_icon, text: "Duyệt bài viết thành công!" }))
            this.props.reloadList();
        }

        if (this.props.isHaveRejectedAndFeedbacked) {
            store.dispatch(closeModal());
            store.dispatch(delete_RejectAndFeedbackAPostReset());
            store.dispatch(openBLModal({ icon: done_icon, text: "Từ chối bài viết thành công!" }))
            this.props.reloadList();
        }

        if (this.props.isHaveRejected) {
            store.dispatch(closeModal());
            store.dispatch(delete_RejectAPostReset());
            store.dispatch(openBLModal({ icon: done_icon, text: "Từ chối bài viết thành công!" }))
            this.props.reloadList();
        }

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
    // console.log(state);
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
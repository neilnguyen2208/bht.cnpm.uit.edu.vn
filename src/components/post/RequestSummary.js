import React, { Component } from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { approveAPost, rejectAPost, rejectAndFeedbackAPost } from 'redux/services/postServices'
import calendar_icon from 'assets/icons/24x24/calendar_icon_24x24.png'
import { openModal, openBLModal, closeModal } from 'redux/actions/modalAction'
import store from 'redux/store/index'
import { post_ApproveAPostReset, delete_RejectAPostReset } from 'redux/actions/postAction'
import { validation } from 'utils/validationUtils'

class RequestedSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    handleApprove = () => {
        store.dispatch(openModal("confirmation",
            {
                title: "Xác nhận duyệt bài viết?",
                text: "Bạn có chắc chắn muốn duyệt bài viết không?",
                onOKClick: this.onApproveButtonClick,

            }));

    }

    onApproveButtonClick = () => {
        this.props.approveAPost(this.props.id);
    }

    handleReject = () => {
        store.dispatch(openModal("confirmation",
            {
                title: "Xác nhận từ chối bài viết?",
                text: "Bạn có chắc chắn muốn từ chối bài viết này không?",
                onOKClick: this.onRejectButtonClick,
            }));
    }

    onRejectButtonClick = () => {

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
                onConfirm: DTO => this.onConfirmReject(DTO)
            }
        }
        ));
    }

    handleReadMore = () => {

    }

    onConfirmReject = (rejectDTO) => {
        this.props.rejectAndFeedbackAPost(rejectDTO.id, rejectDTO.reason)
    }

    render() {
        if (this.props.isApproveDone) {
            store.dispatch(closeModal());
            store.dispatch(post_ApproveAPostReset());
            store.dispatch(openBLModal({ icon: done_icon, text: "Duyệt bài viết thành công!" }))
            this.props.reloadList();
        }
        if (this.props.isRejectDone) {
            store.dispatch(closeModal());
            store.dispatch(delete_RejectAPostReset());
            store.dispatch(openBLModal({ icon: done_icon, text: "Từ chối bài viết thành công!" }))
            this.props.reloadList();
        }
        return (
            <div className="item-container">
                {/* Metadata */}
                <div className="metadata request">
                    <div className="j-c-space-between"  >
                        <Link className="link-label-m" to={/user/}>
                            {this.props.authorName}
                        </Link>
                        <div className="d-flex">
                            <img src={calendar_icon} alt="" className="calendar_icon" />
                            <div className="black-label-m">
                                {this.props.requestedDate}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="black-label-s">{`vào lúc ${this.props.requestedTime} đã yêu cầu duyệt một bài viết trong danh mục`}</div>
                        <div className="link-label-s"> {this.props.categoryName}</div>
                    </div>

                    {/* title */}
                    <div className="d-flex mg-top-5px">
                        {/* fake avatar */}
                        <img className="avatar" src={this.props.authorAvatarURL} alt="" />
                        <div className="mg-left-5px j-c-space-between d-flex-vertical">
                            <Link to={"/posts/" + this.id}>
                                <div className="title">
                                    {this.props.title}
                                </div>
                            </Link>

                            <div className="d-flex" style={{ marginTop: "-5px" }}>
                                <div className="d-flex"  >
                                    <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                        {Math.ceil(this.props.readingTime / 60) + " phút đọc"}
                                    </div>
                                </div>

                                <div className="d-flex" >
                                    <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                        {this.props.publishDtm.substring(0, 10)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.props.imageURL ?
                        <div>
                            <div className="decoration-line mg-top-10px" />
                            <img className="image" src={this.props.imageURL} alt="" />
                            <div className="summary-text mg-bottom-10px">
                                {this.props.summary}
                            </div>
                        </div>
                        :
                        <div className="summary-text">
                            {this.props.summary}
                        </div>
                    }

                    <div className="link-label-s mg-bottom-5px" onClick={() => this.handleReadMore()}>Đọc thêm ...</div>
                </div>


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
        postsList: state.post.pendingPosts.data,
        postCategories: state.post_category.categories.searchData,
        isListLoading: state.post.pendingPosts.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading,
        isApproveDone: state.post.approvePost.isLoadDone,
        isRejectDone: state.post.rejectPost.isLoadDone,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    approveAPost, rejectAPost, rejectAndFeedbackAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestedSummary));
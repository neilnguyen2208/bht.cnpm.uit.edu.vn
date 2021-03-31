import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources
import { reportAPost } from 'redux/services/postServices'
import { openModal, closeModal, openBLModal } from 'redux/services/modalServices'
import { post_ReportAPostReset } from 'redux/actions/postAction'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'
import store from 'redux/store/index'
import { validation } from 'utils/validationUtils'
import NormalReactionbar from 'components/post/NormalReactionbar'
import { wallPageAdminMenuItemList } from 'constants.js'
import { deleteHighlightAPost, stickAPostToTop } from 'redux/services/homeServices';

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
class WallpageItem extends React.Component {

    onPopupMenuItemClick = (selectedItem) => {
        if (selectedItem.value === "REPORT_POST") {
            openModal("form", {
                id: `hirpp-form-modal`,//high light item report post
                title: `REPORT BÀI VIẾT`,
                formId: `hirpp-form`,
                inputs:
                    [
                        { //for rendering
                            id: `hirpp-form-input`,
                            isRequired: true,
                            label: "Lý do tố cáo:",
                            type: 'text-area',
                            placeHolder: "Nhập lý do tố cáo ...",
                            validation: true,
                            key: "reason"
                        },
                    ],
                append: { id: this.props.id },
                validationCondition: {
                    form: `#hirpp-form`,
                    rules: [
                        //truyen vao id, loai component, message
                        validation.isRequired(`hirpp-form-input`, 'text-area', 'Lý do không được để trống!'),
                        validation.minLength(`hirpp-form-input`, 'text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!')
                    ],

                },
                submitText: "Report",
                cancelText: "Huỷ",
                confirmBox: {
                    title: "Report bài viết",
                    text: "Bạn có chắc chắn muốn tố cáo bài viết này không?",
                    confirmText: "Xác nhận",
                    cancelText: "Huỷ",
                    onConfirm: DTO => this.onConfirmReport(DTO)
                }
            });
        }

        if (selectedItem.value === "HIGHLIGHT_POST") {
            openModal("confirmation", {
                title: "Ghim bài viết",
                text: "Xác nhận ghim bài viết?",
                onConfirm: () => {
                    this.props.highlightAPost(this.props.id);
                    store.dispatch(closeModal());
                }
            });
        }

        if (selectedItem.value === "UNHIGHLIGHT_POST") {
            openModal("confirmation", {
                title: "Bỏ ghim bài viết",
                text: "Xác nhận bỏ ghim bài viết?",
                onConfirm: () => {
                    this.props.deleteHighlightAPost(this.props.id);
                    store.dispatch(closeModal());
                }
            });
        }

        if (selectedItem.value === "STICK_TO_TOP_POST") {
            openModal("confirmation", {
                title: "Ghim bài viết lên đầu",
                text: "Xác nhận ghim bài viết lên đâu?",
                onConfirm: () => {
                    this.props.stickAPostToTop(this.props.id);
                    store.dispatch(closeModal());
                }
            });
        }

    }

    onConfirmReport = (DTO) => {
        store.dispatch(closeModal());
        store.dispatch(closeModal());
        this.props.reportAPost(DTO.id, { "reason": DTO.reason });
    }

    render() {
        if (this.props.isHaveReported) {
            store.dispatch(openBLModal({ text: "Report bài viết thành công!", icon: done_icon }));
            store.dispatch(post_ReportAPostReset())
        }
        return (
            <div className="wallpage-item">
                <div className="left-container">
                    <img src={this.props.imageURL} className='image' alt="cover" />
                </div>

                <div className="right-container">
                    <div className="metadata">
                        <div className="j-c-space-between" >
                            <div className="d-flex">
                                <div className="d-flex">
                                    <div className="category">
                                        {this.props.categoryName}
                                    </div>
                                </div>
                                <div className="light-black-label">bởi</div>
                                <Link className="link-label-s" to={/user/}>
                                    {this.props.authorName}
                                </Link>
                            </div>

                            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={wallPageAdminMenuItemList} id={`hipm-${this.props.id}`} />

                        </div>

                        {/* title */}
                        <div className="d-flex mg-top-5px">
                            {/* fake avatar */}
                            <img className="avatar" src={this.props.authorAvatarURL} alt="" />
                            <div className="mg-left-5px j-c-space-between d-flex-vertical">
                                <Link to={"/post-content/" + this.props.id}>
                                    <div className="title title-hv">
                                        {this.props.title}
                                    </div>
                                    <div className="title-hv-c">
                                        <div className="title-hv-m">
                                            {this.props.title}
                                        </div>
                                    </div>
                                </Link>

                                <div className="d-flex" style={{ marginTop: "-5px" }}>
                                    <div className="d-flex"  >
                                        <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                            {Math.ceil(this.props.readingTime / 60) + " phút đọc"}
                                        </div>
                                    </div>

                                    <div className="d-flex" >
                                        {this.props.publishDtm ?
                                            <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                                {this.props.publishDtm.substring(0, 10)}
                                            </div>
                                            : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="summary-text">
                            {this.props.summary}
                        </div>
                    </div >
                    <div >
                        <NormalReactionbar
                            id={this.props.id}
                            likeCount={this.props.likeCount}
                            commentCount={this.props.commentCount}
                            likedStatus={this.props.likedStatus}
                            savedStatus={this.props.savedStatus}
                        />
                    </div>
                </div >
            </div >
        );
    }
}



const mapStateToProps = (state) => {
    return {
        //report
        isHaveReported: state.post.isHaveReported
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    stickAPostToTop,
    reportAPost,
    deleteHighlightAPost,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WallpageItem));


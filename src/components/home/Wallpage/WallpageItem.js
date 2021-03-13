import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'
import { deleteAPost, editAPost, reportAPost } from 'redux/services/postServices'
import { openBigModal, openModal, closeModal, openBLModal } from 'redux/actions/modalAction'
import { post_ReportAPostReset } from 'redux/actions/postAction'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'
import store from 'redux/store/index'
import { validation } from 'utils/validationUtils'
import NormalReactionbar from 'components/post/NormalReactionbar'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
class WallpageItem extends React.Component {

    constructor(props) {
        super(props);
        this.menuItemList = [
            { id: 3, text: "Report", icon: report_icon, value: "REPORT_POST" },
        ]
    }

    onPopupMenuItemClick = (selectedItem) => {
        if (selectedItem.value === "REPORT_POST") {
            store.dispatch(openModal("form", {
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
            }
            ));
        }
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
                            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={this.menuItemList} id={`hipm-${this.props.id}`} />

                        </div>

                        {/* title */}
                        <div className="d-flex mg-top-5px">
                            {/* fake avatar */}
                            <img className="avatar" src={this.props.authorAvatarURL} alt="" />
                            <div className="mg-left-5px j-c-space-between d-flex-vertical">
                                <Link to={"/posts/" + this.props.id}>
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
    reportAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WallpageItem));


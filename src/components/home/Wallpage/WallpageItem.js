import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources
import { reportAPost } from 'redux/services/postServices'
import { openModal, closeModal, openBLModal, openBigModal } from 'redux/services/modalServices'
import { post_ReportAPostReset } from 'redux/actions/postAction'
import store from 'redux/store/index'
import PostNormalReactionbar from 'components/post/NormalReactionbar'
import { deleteHighlightAPost, stickAPostToTop } from 'redux/services/homeServices';
import { wallpageMenu } from 'components/post/adapter/actionMenu';

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
class WallpageItem extends React.Component {

    onPopupMenuItemClick = (selectedItem) => {
        if (selectedItem.value === "REPORT_POST") {
            openBigModal("report-post", {
                id: this.props.wpPostId
            })
        }

        if (selectedItem.value === "HIGHLIGHT_POST") {
            openModal("confirmation", {
                title: "Ghim bài viết",
                text: "Xác nhận ghim bài viết?",
                onConfirm: () => {
                    this.props.highlightAPost(this.props.wpPostId);
                    closeModal();
                }
            });
        }

        if (selectedItem.value === "UNHIGHLIGHT_POST") {
            openModal("confirmation", {
                title: "Bỏ ghim bài viết",
                text: "Xác nhận bỏ ghim bài viết?",
                onConfirm: () => {
                    this.props.deleteHighlightAPost(this.props.wpPostId);
                    closeModal();
                }
            });
        }

        if (selectedItem.value === "STICK_TO_TOP_POST") {
            openModal("confirmation", {
                title: "Ghim bài viết lên đầu",
                text: "Xác nhận ghim bài viết lên đâu?",
                onConfirm: () => {
                    this.props.stickAPostToTop(this.props.wpPostId);
                    closeModal();
                }
            });
        }
    }

    onConfirmReport = (DTO) => {
        closeModal();
        closeModal();
        this.props.reportAPost(DTO.id, { "reasonIds": [1], "feedback": DTO.reason });
    }

    render() {
        if (this.props.isHaveReported) {
            openBLModal({ text: "Report bài viết thành công!", type: "success" });
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
                                <Link className="link-label-s" to={`/user/profile/${this.props.authorID}`}>
                                    {this.props.authorDisplayName}
                                </Link>
                            </div>
                            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} useAction={true} availableActions={this.props.availableActions} items={wallpageMenu} id={`hipm-${this.props.wpPostId}`} />
                        </div>

                        {/* title */}
                        <div className="d-flex mg-top-5px">
                            <Link to={`/user/profile/${this.props.authorID}`}>
                                <img className="avatar" src={this.props.authorAvatarURL} alt="" />
                            </Link>
                            <div className="mg-left-5px j-c-space-between d-flex-vertical">
                                <Link to={"/post-content/" + this.props.wpPostId}>
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
                        <PostNormalReactionbar
                            postID={this.props.wpPostId}
                            availableActions={this.props.availableActions}
                            likeCount={this.props.likeCount}
                            viewCount={this.props.viewCount}
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


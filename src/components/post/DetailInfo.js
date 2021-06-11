import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources
import { deleteAPost, editAPost, reportAPost } from 'redux/services/postServices'
import { openBigModal, openModal, closeModal, openBLModal } from 'redux/services/modalServices'
import { delete_APostReset, put_EditAPostReset, post_ReportAPostReset } from 'redux/actions/postAction'
import store from 'redux/store/index'
import { detailType } from 'constants.js'
import UserInfo from 'components/user/UserInfo'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import 'components/common/CustomCKE/CKEditorContent.scss'

//constants
import { basicMenu } from './adapter/allActionSummaryMenu'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';

class PostDetail extends React.Component {

  constructor(props) {
    super(props);
    this.id = this.props.postId;
    this.title = this.props.title;
    this.image = this.props.image;

  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_POST") {
      //show confirmation popup and detete id verify
      openModal("confirmation",
        {
          title: "Xoá bài viết",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => { this.props.deleteAPost(this.props.postId); closeModal(); }
        })
    }

    if (selectedItem.value === "EDIT_POST") {
      openBigModal("edit-post", { id: this.props.postId });
    }

    if (selectedItem.value === "REPORT_POST" && this.props.type !== detailType.preview) {
      openBigModal("report-post", { id: this.props.postId });
    }
  }

  onConfirmReport = (DTO) => {
    closeModal();
    closeModal();
    this.props.reportAPost(DTO.id, { "reasonIds": [1], "feedback": DTO.reason });
  }

  render() {
    styleCodeSnippet();

    //reload the list when any item has been deleted or edited:
    if (this.props.isHaveDeleted) {
      store.dispatch(delete_APostReset())
    }

    if (this.props.isHaveEdited) {
      store.dispatch(put_EditAPostReset())
    }

    if (this.props.isHaveReported) {
      openBLModal({ text: "Report bài viết thành công!", type: "success" });
      store.dispatch(post_ReportAPostReset())
    }

    return (
      <div className="metadata">

        {/* title */}
        <Link to={"/post-content/" + this.props.postId}>
          <div className="title">
            {this.props.title}
          </div>
        </Link>

        <div className="d-flex mg-top-5px"  >

          <div className="d-flex">
            <div className="category">
              {this.props.categoryName}
            </div>
          </div>
          <div className="mg-left-5px j-c-space-between d-flex-vertical">

            <div className="d-flex" style={{ marginTop: "-1px" }}>
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

        <div className="decoration-line mg-top-5px mg-bottom-5px" />
        <div className="d-flex mg-top-10px ">
          <UserInfo authorName={this.props.authorName} authorAvatarURL={this.props.authorAvatarURL} />
          <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} availableActions={this.props.availableActions} items={basicMenu} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.postId}`} />
        </div>
        {formatMathemicalFormulas()}
        {styleCodeSnippet()}
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //delete
    isHaveDeleted: state.post.isHaveDeleted,
    //edit
    isHaveEdited: state.post.isHaveEdited,
    //report
    isHaveReported: state.post.isHaveReported
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteAPost, editAPost, reportAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));


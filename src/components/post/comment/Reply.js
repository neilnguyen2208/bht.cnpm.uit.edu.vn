import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//constants
import commentMenu from './adapter/commentMenu'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { RequireLogin } from 'components/base_components/RequireLoginComponent';
import { Post, CommentAction } from 'authentication/permission.config';
import { formatNumber, timeAgo } from 'utils/miscUtils';

import liked_icon from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_icon from 'assets/icons/24x24/unliked_icon_24x24.png'
import { authRequest, request } from 'utils/requestUtils';
import { closeModal, openBigModal, openBLModal, openModal } from 'redux/services/modalServices';
import { validation } from 'utils/validationUtils';
import Editor from 'components/common/CustomCKE/CKEditor';
import { CommentCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration';
import { formatMathemicalFormulas, getCKEInstance, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import { likeAPostComment, unLikeAPostComment } from 'redux/services/postCommentServices'

//NOTE: reply relative components only use internal state, not use redux for handle any event, reply redux code will be delete in the future
class Reply extends React.Component {

  constructor(props) {
    super(props);
    this.likeCount = -1; //dummy for change
    this.state = { isLiked: 0 };
  }

  componentDidMount() {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    this.content = this.props.content;
    const clean = DOMPurify.sanitize(this.content);
    if (document.querySelector(`#rp-ctnt-${this.props.replyId}.comment-content`))
      document.querySelector(`#rp-ctnt-${this.props.replyId}.comment-content`).innerHTML = clean;
    this.setState({});
  }

  //make current reply's reply component show to UI
  createReplyReply = () => {
    console.log(this.state.isLiked, this.likeCount)
    this.props.createReplyReply(this.props.replyId);
  }

  toggleLikeImage = () => {
    let tmpLike = this.state.isLiked;

    if (tmpLike === 0)
      if (this.props.likeStatus) tmpLike = 1;
      else tmpLike = -1;

    tmpLike = - tmpLike;

    if (this.props.likeStatus) {
      if ((tmpLike === -1)) {
        this.likeCount = this.props.likeCount - 1;
        this.props.unLikeAPostComment(this.props.replyId);
      }
      else {
        this.likeCount = this.props.likeCount;
        this.props.likeAPostComment(this.props.replyId);
      }
    }
    else {
      if (tmpLike === 1) {
        this.likeCount = this.props.likeCount + 1
        this.props.likeAPostComment(this.props.replyId);
      } else {
        this.props.unLikeAPostComment(this.props.replyId);
        this.likeCount = this.props.likeCount;
      }
    }
    this.setState({ isLiked: tmpLike });
  }
  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "REPORT_COMMENT") {
      openBigModal("report-comment", { id: this.props.replyId })
    }

    if (selectedItem.value === "EDIT_COMMENT") {
      if (!this.isEditMode) {
        this.isEditMode = true;
        this.setState({});
      }
    }

    if (selectedItem.value === "DELETE_COMMENT") {
      openModal("confirmation",
        {
          title: "Xoá bình luận",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => { this.deleteAReply(this.props.replyId); closeModal(); }
        })
    }
  }

  deleteAReply = () => {
    this.isHaveDeleted = false;
    authRequest.delete(`/posts/comments/${this.props.replyId}`).then(response => {
      this.props.reloadList();
      openBLModal({ text: "Xoá bình luận thành công!", type: "success" });
      this.isHaveDeleted = true;
      this.setState({});
    }).catch(error => { console.log(error) })
  }

  onEditorReady = () => {
    getCKEInstance("edit-comment-" + this.props.replyId).setData(this.content);
  }

  onEditorChange = () => {

  }

  onSubmitReplyClick = () => {
    this.isHaveEdited = false;
    authRequest.put(`/posts/comments/${this.props.replyId}`, { "content": getCKEInstance("edit-comment-" + this.props.replyId).getData() })
      .then(response => {
        this.props.reloadList(this.props.replyId);
        openBLModal({ text: "Cập nhật bình luận thành công!", type: "success" });
        this.isHaveEdited = true;

        //new content after edit (unsync with props)
        this.content = response.data.content;
        this.changeViewMode(this.content);

        this.setState({});
      })
      .catch(error => {
        console.log(error)
      })
  }

  changeViewMode = (content) => {
    //if current mode is edit mode => view mode.
    if (this.isEditMode) {
      const window = new JSDOM('').window;
      const DOMPurify = createDOMPurify(window);
      const clean = DOMPurify.sanitize(content ? content : this.content);
      console.log(clean)

      if (document.querySelector(`#rp-ctnt-${this.props.replyId}.comment-content`))
        document.querySelector(`#rp-ctnt-${this.props.replyId}.comment-content`).innerHTML = clean;
      this.isEditMode = !this.isEditMode;
      this.setState({});
      return;
    }
    this.isEditMode = !this.isEditMode;
    this.setState({});
  }

  render() {

    //#region like, unlike buttons
    let likeBtn = <div></div>;

    //render likeBtn
    if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likeStatus)) {
      likeBtn = <img className="post-like-btn" alt="like" src={liked_icon}></img>
    }
    else {
      likeBtn = <img className="post-like-btn" alt="like" src={unliked_icon} ></img>
    }

    return (
      <div className="reply-item" id={`reply-item-${this.props.replyId}`}>
        <div className="d-flex">
          <img className="comment-avatar reply" src={this.props.authorAvatarURL} alt="" />

          {/* show on edit mode */}
          {this.isEditMode ?
            <div className="comment-box edit">
              <Editor editorId={"edit-comment-" + this.props.replyId}
                onChange={() => this.onEditorChange()}
                onInstanceReady={() => this.onEditorReady()}
                height={120}
                autoGrow_maxHeight={200}
                autoGrow_minHeight={120}
                config={CommentCKEToolbarConfiguration}
              />
              <div className="j-c-end mg-top-5px">
                <button className="white-button mg-right-5px" onClick={() => { this.changeViewMode() }}>Huỷ</button>
                <button className="blue-button" onClick={() => this.onSubmitReplyClick()}>Lưu</button>
              </div>
            </div>
            : <></>
          }
          <div className="comment-box"
            style=
            {this.isEditMode ?
              { display: "none" } :
              this.props.createdReplyId === this.props.replyId ? //this is not correct code, fix later
                { display: "block", border: "1px solid var(--blue)", boxShadow: "0px 0px 2px 0px var(--blue)" } :
                { display: "block" }
            }>
            <div className="comment-head">
              <div>
                <div className="d-flex" >
                  <Link className="comment-name" to={`/user/${this.props.authorID}`}>{this.props.authorDisplayName}</Link>
                  {this.props.isContentAuthor && <div className="by-author-label">
                    Tác giả
                  </div>}
                </div>
              </div>
              <PopupMenu onMenuItemClick={this.onPopupMenuItemClick}
                availableActions={this.props.availableActions} useAction={true}
                items={commentMenu} id={`${this.props.popUpMenuPrefix}-cipm-${this.props.replyId}`} />
            </div>
            {/* comment content */}
            <div>
              <div className="comment-content ck-editor-output" id={"rp-ctnt-" + this.props.replyId} />
              <div className="comment reaction-bar" >
                <div style={{ display: "flex" }}>
                  <RequireLogin permissions={[]}
                    expectedEvent={this.props.type !== "PREVIEW" && this.toggleLikeImage}
                    availableActions={this.props.availableActions}
                    requiredAction={CommentAction.Like}
                    useAction={true}
                  >
                    <div className="like-btn-container"  >
                      <div className="d-flex"> {likeBtn}</div>
                      <div className="like-count">{formatNumber(this.likeCount === -1 ? this.props.likeCount : this.likeCount)}</div>
                    </div>
                  </RequireLogin>
                  <RequireLogin permissions={[]}
                    expectedEvent={this.props.type !== "PREVIEW" && this.createReplyReply}
                    availableActions={this.props.availableActions}
                    requiredAction={CommentAction.Reply}
                    useAction={true}
                  >
                    <div className="comment-count-container">
                      <div className="comment-btn-text">
                        Trả lời
                      </div>
                    </div>
                  </RequireLogin>
                </div>
                <div className="comment-time">{timeAgo(this.props.submitDtm)}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "0px", width: "0px" }} >
          <div className="triangle-with-shadow reply" />
        </div>
        {formatMathemicalFormulas()}
        {styleCodeSnippet()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //report
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  likeAPostComment, unLikeAPostComment
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reply));


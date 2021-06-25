import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

import { closeModal, openBigModal, openModal } from 'redux/services/modalServices'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//components
import Reply from './Reply.js'
import CommentReactionbar from './CommentReactionbar';

import commentMenu from './adapter/commentMenu';
import PopupMenu from 'components/common/PopupMenu/PopupMenu.js';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import CreateReply from './CreateReply'
import down_arrow from 'assets/icons/12x12/dropdown_12x12.png'
import Editor from 'components/common/CustomCKE/CKEditor.js';
import { CommentCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration.js';
import { formatMathemicalFormulas, getCKEInstance, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils.js';
import { authRequest } from 'utils/requestUtils.js';
import { deleteAnExerciseComment, editAnExerciseComment } from 'redux/services/exerciseCommentServices'

// const validationCondition = {
//   form: '#create-comment-form',
//   rules: [
//     //truyen vao id, loai component, message
//     validation.isRequired('crt-cmmnt-cke', 'ckeditor', 'Nội dung bình luận không được để trống')
//   ],
// }

//TODO: Validation for multi-form 
//TODO: - sort current created reply to first

class Comment extends React.Component {
  constructor(props) {
    super(props);

    //if isReplying true && replyindId null or not valid
    this.replyId = null;
    this.isReplying = false;
    this.isEditMode = false;
    this.isReplyLoadDone = false;
    this.replyArray = [];
    this.isShowAllReply = false;

    this.commentMenu = commentMenu;
    this.commentMenu[0].expectedEvent = this.props.type !== "PREVIEW" && this.onPopupMenuItemClick
    this.commentMenu[1].expectedEvent = this.props.type !== "PREVIEW" && this.onPopupMenuItemClick
    this.commentMenu[2].expectedEvent = this.props.type !== "PREVIEW" && this.onPopupMenuItemClick
  }

  componentDidMount() {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(this.props.content);
    if (document.querySelector(`#cmt-ctnt-${this.props.commentId}.comment-content`))
      document.querySelector(`#cmt-ctnt-${this.props.commentId}.comment-content`).innerHTML = clean;

    //for unsynchonize reply count purpose 
    this.replyCount = this.props.replyCount;
    this.setState({})
  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "REPORT_COMMENT") {
      openBigModal("report-comment", { id: this.props.commentId })
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
          onConfirm: () => { this.props.deleteAnExerciseComment(this.props.commentId); closeModal(); }
        })
    }
  }

  createCommentReply = (replyId) => {
    this.replyId = replyId ? replyId : null;
    this.isReplying = true;
    this.setState({});
  }

  onEditorReady = () => {
    getCKEInstance("edit-comment-" + this.props.commentId).setData(this.props.content);
  }

  onEditorChange = () => {

  }

  onSubmitCommentClick = () => {
    // if (styleFormSubmit(validationCondition)) {
    this.props.editAnExerciseComment(this.props.commentId, { content: getCKEInstance("edit-comment-" + this.props.commentId).getData() });
    // }
  }

  changeViewMode = () => {
    //if current mode is edit mode => view mode.
    if (this.isEditMode) {
      const window = new JSDOM('').window;
      const DOMPurify = createDOMPurify(window);
      const clean = DOMPurify.sanitize(this.props.content);
      if (document.querySelector(`#cmt-ctnt-${this.props.commentId}.comment-content`))
        document.querySelector(`#cmt-ctnt-${this.props.commentId}.comment-content`).innerHTML = clean;
      this.isEditMode = !this.isEditMode;
      this.setState({});
      return;
    }
    this.isEditMode = !this.isEditMode;
    this.setState({});
  }

  onViewAllReplyClick = () => {

    //if all reply is load
    if (this.isReplyLoadDone) {
      this.isShowAllReply = true;
      this.setState({});
      return;
    }
    this.isShowAllReply = true;
    this.loadAllReply();
  }

  loadAllReply = (createdReplyId) => {  //not use redux in this case
    this.isReplyLoadDone = false;
    authRequest.get(`/exercises/comments/${this.props.commentId}/children`)
      .then(response_1 => {
        let result_1 = response_1.data;
        let IDarr = '';
        result_1.map(item => IDarr += item.id + ",") //tao ra mang id moi
        authRequest.get(`/exercises/comments/statistics?commentIDs=${IDarr}`)
          .then(response_2 => {
            //merge summary array and statistic array
            let result_2 = [];
            this.isReplyLoadDone = true;

            for (let i = 0; i < result_1.length; i++) {
              result_2.push({
                ...result_1[i],
                ...(response_2.data.find((itmInner) => itmInner.id === result_1[i].id)),
              }
              );
            }

            //update reply which has been created
            if (createdReplyId) {
              this.createdReplyId = createdReplyId;
            }

            authRequest.get(`/exercises/comments/actionAvailable?exerciseCommentIDs=${IDarr}`).then(response_3 => {
              let finalResult = [];
              for (let i = 0; i < result_2.length; i++) {
                finalResult.push({
                  ...result_2[i],
                  ...(response_3.data.find((itmInner) => itmInner.id === result_2[i].id)),
                });
              }

              this.replyArray = finalResult;
              //update reply count (unsynchonizew with props)
              this.replyCount = finalResult.length;

              this.setState({});
              return finalResult.length;
            })
            this.setState({});
          }).catch((error) => {
            this.isReplyLoadDone = false;
            this.setState({});
            return 0;
          })

      })
      .catch(error => {
        this.isReplyLoadDone = false;
        this.setState({});
        return 0;
      })

  }

  sortCreatedReplyToFirst = () => {
    // data.forEach(function (item, i) {
    // if (item.id === "kjfdhg87") {
    // data.splice(i, 1);
    // data.unshift(item);
    // }
    // });
  }

  //for child replies hide the create reply component
  setNotReplying = () => {
    this.isReplying = false;
    this.setState({});
  }

  render() {

    //cipm: comment item popup menu
    let replyList = <></>;

    //if replies has not been loaded && not click to show all reply
    if ((!this.isReplyLoadDone || !this.isShowAllReply) && this.replyCount > 0) {

      //if no reply is created 
      replyList = <div className="hs-label-container" onClick={() => { this.onViewAllReplyClick() }}>
        <div className="hs-label">Xem thêm {this.replyCount} câu trả lời</div>
        <img className="hs-label-img" src={down_arrow} alt="" />
      </div>

      //if any reply is created 

    }

    //if load done and show all => show all comment's replies
    // if (this.isShowAllReply && this.isReplyLoadDone) {
    if ((this.isShowAllReply || this.createdReplyId) && this.isReplyLoadDone) {

      //if first condition is true => show all reply
      //if ONLY second condition is true => only show created reply, it is not best case :(
      let subReplyList;

      subReplyList = <div> {this.replyArray.map(reply => {

        // if (this.createdReplyId && this.createdReplyId === reply.id) return <></>;
        // if user is creating a reply under this reply: show this reply and createReplyComponent under this reply
        return <div
          key={reply.id}>
          <Reply
            useAction={true}
            replyId={reply.id}
            authorDisplayName={reply.authorDisplayName}
            authorAvatarURL={reply.authorAvatarURL}
            authorID={reply.isauthorDisplayName}
            isContentAuthor={reply.isContentAuthor}
            submitDtm={reply.submitDtm}
            likeCount={reply.likeCount}
            likeStatus={reply.likeStatus}
            replyCount={reply.replyCount}
            replyArray={reply.replyArray}
            content={reply.content}
            createReplyReply={(replyId) => this.createCommentReply(replyId)}
            reloadList={(createdReplyId) => this.loadAllReply(createdReplyId)}
            createdReplyId={this.createdReplyId}
            availableActions={reply.availableActions}
          />
          {this.isReplying && this.replyId === reply.id &&

            <CreateReply
              useAction={true}
              replyId={reply.id}
              availableActions={reply.availableActions}
              commentId={this.props.commentId}
              reloadList={(createdReplyId) => this.loadAllReply(createdReplyId)}
              setNotReplying={() => this.setNotReplying()}
              componentId={"cr-rpl-" + this.props.commentId + "-idx" + reply.id}
            />}
        </div>
      })
      }
      </div>

      //SKIP: if is show all reply and reply array has length above 3
      if (this.replyArray.length > 3)
        replyList = <div>
          {/* {newReply} */}
          {subReplyList}
          <div className="hs-label-container" onClick={() => { this.isShowAllReply = false; this.setState({}); }}>
            <div className="hs-label"> Ẩn bớt {this.createdReplyId ? this.replyCount - 1 : this.replyCount} câu trả lời </div>
            <img className="hs-label-img" style={{ transform: "rotate(180deg)" }} src={down_arrow} alt="" />
          </div>
        </div>;
      else
        replyList = <div>
          {/* {newReply} */}
          {subReplyList}
        </div>;
    }

    return (
      <div className="comment-item" id={`comment-item-` + this.props.commentId}>
        <div className="comment-main-level">
          <img className="comment-avatar" src={this.props.authorAvatarURL} alt="" />
          {/* On view condition */}
          {this.isEditMode ?
            <div className="comment-box edit  exercise">
              <Editor editorId={"edit-comment-" + this.props.commentId}
                onChange={() => this.onEditorChange()}
                onInstanceReady={() => this.onEditorReady()}
                height={120}
                autoGrow_maxHeight={200}
                autoGrow_minHeight={120}
                config={CommentCKEToolbarConfiguration}
              />
              <div className="j-c-end mg-top-5px">
                <button className="white-button mg-right-5px" onClick={() => { this.changeViewMode() }}>Huỷ</button>
                <button className="blue-button" onClick={() => this.onSubmitCommentClick()}>Lưu</button>
              </div>
            </div>
            : <></>
          }

          <div className="comment-box  exercise"
            style={this.isEditMode ?
              { display: "none" } :
              this.props.createdCommentId === this.props.commentId ?
                {
                  display: "block",
                  border: "1px solid var(--blue)",
                  boxShadow: "0px 0px 2px 0px var(--blue)"
                } :
                { display: "block" }
            }>
            <div className="comment-head">
              <div className="d-flex" >
                <Link className="comment-name" to={`user/${this.props.authorID}`}>{this.props.authorDisplayName}</Link>
                {this.props.isContentAuthor && <div className="by-author-label">
                  Tác giả
                </div>}
              </div>
              <PopupMenu onMenuItemClick={this.onPopupMenuItemClick}
                useAction={true}
                availableActions={this.props.availableActions}
                items={this.commentMenu} id={`cipm-${this.props.commentId}`} />
            </div>
            <div>
              {/* comment content */}
              <div className="comment-content ck-editor-output" id={"cmt-ctnt-" + this.props.commentId} />

              {/* comment reaction bar */}
              <CommentReactionbar
                useAction={true}
                availableActions={this.props.availableActions}
                componentId={"cmmt-rctn-br" + this.props.commentId}
                commentId={this.props.commentId}
                likeCount={this.props.likeCount}
                submitDtm={this.props.submitDtm}
                likeStatus={this.props.likeStatus}
                createCommentReply={() => this.createCommentReply()}
                viewAllReply={() => { this.viewAllReply() }}
              />
            </div>
          </div>
          {/* On edit condition */}

        </div >

        {/* Replies of this comment */}
        {
          (this.isReplying && this.replyId === null) ?
            <div className="comments-list reply-list">
              <CreateReply
                setNotReplying={() => this.setNotReplying()}
                commentId={this.props.commentId}
                reloadList={(createdReplyId) => this.loadAllReply(createdReplyId)}
                componentId={"cr-rpl-" + this.props.commentId + "-idx0"}
                availableActions={this.props.availableActions}
              />
            </div>
            : <></>
        }
        <div className="comments-list reply-list">
          {replyList}
        </div>

        {formatMathemicalFormulas()}
        {styleCodeSnippet()}
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //report
    createdCommentId: state.exerciseComment.createdCommentId,

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteAnExerciseComment, editAnExerciseComment
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));


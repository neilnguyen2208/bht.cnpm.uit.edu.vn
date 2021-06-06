import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

import { closeModal, openBLModal, openModal } from 'redux/services/modalServices'
import { styleFormSubmit, validation } from 'utils/validationUtils'

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
import authService from 'authentication/authServices.js';
import { request } from 'utils/requestUtils.js';
import { deleteAPostComment, editAPostComment } from 'redux/services/commentServices'
import store from 'redux/store/index.js';
import { delete_APostCommentReset, put_EditAPostCommentReset } from 'redux/actions/commentAction.js';

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
      openModal("form", {
        id: `rpp-form-modal`,//report post
        title: `REPORT BÀI VIẾT`,
        formId: `rpp-form`,
        inputs:
          [
            { //for rendering
              id: `rpp-form-input`,
              isRequired: true,
              label: "Lý do chi tiết:",
              type: 'text-area',
              placeHolder: "Nhập lý do tố cáo ",
              validation: true,
              key: "reason"
            },
          ],
        append: { id: this.props.commentId },
        validationCondition: {
          form: `#rpp-form`,
          rules: [
            //truyen vao id, loai component, message
            validation.isRequired(`rpp-form-input`, 'text-area', 'Lý do không được để trống!'),
            validation.minLength(`rpp-form-input`, 'text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!')
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
          onConfirm: () => { this.props.deleteAPostComment(this.props.commentId); closeModal(); }
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
    this.props.editAPostComment(this.props.commentId, { content: getCKEInstance("edit-comment-" + this.props.commentId).getData() });
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
    request.get(`/posts/comments/${this.props.commentId}/children`)
      .then(response_1 => {
        let result_1 = response_1.data;
        let IDarr = '';
        result_1.map(item => IDarr += item.id + ",") //tao ra mang id moi
        request.get(`/posts/comments/statistics?commentIDs=${IDarr}`)
          .then(result_2 => {
            //merge summary array and statistic array
            let finalResult = [];
            this.isReplyLoadDone = true;

            for (let i = 0; i < result_1.length; i++) {
              finalResult.push({
                ...result_1[i],
                ...(result_2.data.find((itmInner) => itmInner.id === result_1[i].id)),
              }
              );
            }
            this.replyArray = finalResult;

            //update reply count (unsynchonizew with props)
            this.replyCount = finalResult.length;

            //update reply which has been created
            if (createdReplyId) {
              this.createdReplyId = createdReplyId;
            }

            this.setState({});
            return finalResult.length;
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
      // if (!this.isShowAllReply && this.createdReplyId) {
      //   let createdReply = this.replyArray.find(reply => reply.id = this.createdReplyId);
      //   subReplyList = < Reply
      //     replyId={createdReply.id}
      //     authorDisplayName={createdReply.authorDisplayName}
      //     authorAvatarURL={createdReply.authorAvatarURL}
      //     idCmtAuthor={createdReply.isauthorDisplayName}
      //     isContentAuthor={createdReply.isContentAuthor}
      //     submitDtm={createdReply.submitDtm}
      //     likeCount={createdReply.likeCount}
      //     likeStatus={createdReply.likeStatus}
      //     replyCount={createdReply.replyCount}
      //     replyArray={createdReply.replyArray}
      //     content={createdReply.content}
      //     createReplyReply={(replyId) => this.createCommentReply(replyId)}
      //     reloadList={(createdReplyId) => this.loadAllReply(createdReplyId)}
      //     createdReplyId={this.createdReplyId}
      //   />

      //   replyList = this.replyCount > 1 ?
      //     <div>
      //       {subReplyList}
      //       {/* if only have one reply */}
      //       {/* { */}
      //       <div className="hs-label-container" onClick={() => { this.onViewAllReplyClick() }}>
      //         <div className="hs-label">Xem thêm {this.replyCount - 1} câu trả lời</div>
      //         <img className="hs-label-img" src={down_arrow} alt="" />
      //       </div>
      //     </div>
      //     : <div>
      //       {subReplyList}
      //     </div>
      // }
      // // create a reply list on some condition
      // else {

      //   //if show all 
      //   //if createdReply => not show this reply in list, show first
      //   //else show this reply 

      //   let newReply = <></>;
      //   if (this.createdReplyId) {
      //     let createdReply = this.replyArray.find(reply => reply.id = this.createdReplyId);
      //     newReply = <Reply
      //       replyId={createdReply.id}
      //       key={createdReply.id}
      //       authorDisplayName={createdReply.authorDisplayName}
      //       authorAvatarURL={createdReply.authorAvatarURL}
      //       idCmtAuthor={createdReply.isauthorDisplayName}
      //       isContentAuthor={createdReply.isContentAuthor}
      //       submitDtm={createdReply.submitDtm}
      //       likeCount={createdReply.likeCount}
      //       likeStatus={createdReply.likeStatus}
      //       replyCount={createdReply.replyCount}
      //       replyArray={createdReply.replyArray}
      //       content={createdReply.content}
      //       reloadList={(replyId) => this.loadAllReply(replyId)}
      //       createReplyReply={(replyId) => this.createCommentReply(replyId)}
      //       createdReplyId={this.createdReplyId}
      //     />
      //   }

      subReplyList = <div> {this.replyArray.map(reply => {

        // if (this.createdReplyId && this.createdReplyId === reply.id) return <></>;
        // if user is creating a reply under this reply: show this reply and createReplyComponent under this reply
        if (this.isReplying && this.replyId === reply.id)
          return <div
            key={reply.id}>
            <Reply
              replyId={reply.id}
              authorDisplayName={reply.authorDisplayName}
              authorAvatarURL={reply.authorAvatarURL}
              idCmtAuthor={reply.isauthorDisplayName}
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
            />
            <CreateReply
              replyId={reply.id}
              commentId={this.props.commentId}
              reloadList={(createdReplyId) => this.loadAllReply(createdReplyId)}
              setNotReplying={() => this.setNotReplying()}
              componentId={"cr-rpl-" + this.props.commentId + "-idx" + reply.id}
            />
          </div>

        //if user is not creating a reply under this reply
        return <Reply
          replyId={reply.id}
          key={reply.id}
          authorDisplayName={reply.authorDisplayName}
          authorAvatarURL={reply.authorAvatarURL}
          idCmtAuthor={reply.isauthorDisplayName}
          isContentAuthor={reply.isContentAuthor}
          submitDtm={reply.submitDtm}
          likeCount={reply.likeCount}
          likeStatus={reply.likeStatus}
          replyCount={reply.replyCount}
          replyArray={reply.replyArray}
          content={reply.content}
          reloadList={(replyId) => this.loadAllReply(replyId)}
          createReplyReply={(replyId) => this.createCommentReply(replyId)}
          createdReplyId={this.createdReplyId}
        />
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
      // Ư
    }

    /*
    //if not show all reply and reply array has more than 3 replies
    // else {
    // if (this.isReplyLoadDone) {
    // let subReplyList = this.replyArray.slice(0, 3).map(reply => {
    //   if (this.isReplying && this.replyId === reply.id)
    //     return <div
    //       key={reply.id}>
    //       <Reply
    //         replyId={reply.id}
    //         authorDisplayName={reply.authorDisplayName}
    //         authorAvatarURL={reply.authorAvatarURL}
    //         idCmtAuthor={reply.isauthorDisplayName}
    //         isContentAuthor={reply.isContentAuthor}
    //         submitDtm={reply.submitDtm}
    //         likeCount={reply.likeCount}
    //         likeStatus={reply.likeStatus}
    //         replyCount={reply.replyCount}
    //         replyArray={reply.replyArray}
    //         content={reply.content}
    //         createReplyReply={(replyId) => this.createCommentReply(replyId)} />
    //       <CreateReply replyId={reply.id} commentId={this.props.commentId} reloadList={() => this.loadAllReply()} />
    //     </div>
    
    //   return <Reply
    //     replyId={reply.id}
    //     key={reply.id}
    //     authorDisplayName={reply.authorDisplayName}
    //     authorAvatarURL={reply.authorAvatarURL}
    //     idCmtAuthor={reply.isauthorDisplayName}
    //     isContentAuthor={reply.isContentAuthor}
    //     submitDtm={reply.submitDtm}
    //     likeCount={reply.likeCount}
    //     likeStatus={reply.likeStatus}
    //     replyCount={reply.replyCount}
    //     replyArray={reply.replyArray}
    //     content={reply.content}
    //     createReplyReply={(replyId) => this.createCommentReply(replyId)}
    //   />
    // })
    // replyList = <div>
    //   {subReplyList}
    //   <div className="hs-label-container" onClick={() => { this.isShowAllReply = true; this.setState() }}>
    //     <div className="hs-label">Xem thêm {this.props.replyCount - 3} câu trả lời</div>
    //     <img className="hs-label-img" src={down_arrow} alt="" />
    //   </div>
    // </div >
    // }
    // }
    */
    return (
      <div className="comment-item" id={`comment-item-` + this.props.commentId}>
        <div className="comment-main-level">
          <div className="comment-avatar"><img src={this.props.authorAvatarURL} alt="" /></div>
          {/* On view condition */}
          {this.isEditMode ?
            <div className="comment-box edit">
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

          <div className="comment-box"
            style=
            {this.isEditMode ?
              { display: "none" } :
              this.props.createdCommentId === this.props.commentId ?
                { display: "block", border: "1px solid var(--blue)", boxShadow: "0px 0px 2px 0px var(--blue)" } : { display: "block" }
            }>
            <div className="comment-head">
              <div className="d-flex" >
                <Link className="comment-name" to={`user/${this.props.authorID}`}>{this.props.authorDisplayName}</Link>
                {this.props.isContentAuthor && <div className="by-author-label">
                  Tác giả
                  </div>}
              </div>
              <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={this.commentMenu} id={`cipm-${this.props.commentId}`} />
            </div>
            <div>
              {/* comment content */}
              <div className="comment-content ck-editor-output" id={"cmt-ctnt-" + this.props.commentId} />

              {/* comment reaction bar */}
              <CommentReactionbar
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
              />
            </div>
            : <></>
        }
        <div className="comments-list reply-list">
          {replyList}
        </div>
        <div style={{ height: "0px", width: "0px" }} >
          <div className="triangle-with-shadow comment" />
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
    createdCommentId: state.comment.createdCommentId,

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteAPostComment, editAPostComment
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));


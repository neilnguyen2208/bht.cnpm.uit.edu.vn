import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

import { openModal } from 'redux/services/modalServices'
import { validation } from 'utils/validationUtils'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//components
import Reply from './Reply.js'
import CommentReactionbar from './CommentReactionbar';

import { commentMenuItems } from 'constants.js';
import PopupMenu from 'components/common/PopupMenu/PopupMenu.js';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAllReply: false
    }
  }
  componentDidMount() {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);

    const clean = DOMPurify.sanitize(this.props.content);
    if (document.querySelector(`#cmt-ctnt-${this.props.id}.comment-content`))
      document.querySelector(`#cmt-ctnt-${this.props.id}.comment-content`).innerHTML = clean;

  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "REPORT_POST") {
      openModal("form", {
        id: `rpp-form-modal`,//report post
        title: `REPORT BÀI VIẾT`,
        formId: `rpp-form`,
        inputs:
          [
            { //for rendering
              id: `rpp-form-input`,
              isRequired: true,
              label: "Lý do tố cáo:",
              type: 'text-area',
              placeHolder: "Nhập lý do tố cáo ",
              validation: true,
              key: "reason"
            },
          ],
        append: { id: this.props.id },
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
  }


  render() {

    //cipm: comment item popup menu

    let replyList = <></>;
    if (this.props.replyArray.lenght <= 3 || this.state.isShowAllReply)
      replyList = <div> {this.props.replyArray.map(reply => {
        return <Reply id={reply.id}
          cmtAuthorName={reply.cmtAuthorName}
          idCmtAuthor={reply.isCmtAuthorName}
          isContentAuthor={reply.isContentAuthor}
          createdTime={reply.createdTime}
          likeCount={reply.likeCount}
          isLiked={reply.isLiked}
          replyCount={reply.replyCount}
          replyArray={reply.replyArray}
          content={reply.content}
        />
      })}

      </div>
    else {
      let subReplyList = this.props.replyArray.slice(0, 3).map(reply => {
        return <Reply id={reply.id}
          cmtAuthorName={reply.cmtAuthorName}
          idCmtAuthor={reply.isCmtAuthorName}
          isContentAuthor={reply.isContentAuthor}
          createdTime={reply.createdTime}
          likeCount={reply.likeCount}
          isLiked={reply.isLiked}
          replyCount={reply.replyCount}
          replyArray={reply.replyArray}
          content={reply.content}
        />
      })

      replyList = <div>
        {subReplyList}
        <div className="link-label-s" onClick={() => { }}>Xem thêm {this.props.replyCount - 3} câu trả lời</div>
      </div>
    }


    return (
      <li>
        <div className="comment-main-level">
          <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>

          <div className="comment-box">
            <div className="comment-head">
              <div>
                <div className="d-flex" >
                  <Link className="comment-name">{this.props.cmtAuthorName}</Link>
                  {this.props.isContentAuthor && <div className="by-author-label">
                    Tác giả
                  </div>}
                </div>
                {/* <div className="comment-time">{timeAgo(this.props.createdTime)}</div> */}
              </div>
              <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={commentMenuItems} id={`${this.props.popUpMenuPrefix}-cipm-${this.props.id}`} />
            </div>
            <div>
              {/* comment content */}
              <div><div className="comment-content ck-editor-output" id={"cmt-ctnt-" + this.props.id} />
                <CommentReactionbar likeCount={this.props.likeCount} createdTime={this.props.createdTime} />
              </div>
            </div>
          </div>
          <div style={{ height: "0px", width: "0px" }} >
            <div className="triangle-with-shadow comment" />
          </div>
        </div>

        {/* Replies of this comment */}
        <ul className="comments-list reply-list">
          {replyList}
        </ul>
      </li >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //report
    // isHaveReported: state.post.isHaveReported
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));


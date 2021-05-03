import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

import { openModal} from 'redux/services/modalServices'
import { validation } from 'utils/validationUtils'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//components
import Reply from './Reply.js'
import CommentReactionbar from './CommentReactionbar';

import { commentMenuItems } from 'constants.js';
import PopupMenu from 'components/common/PopupMenu/PopupMenu.js';

class Comment extends Component {

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

    return (
      <li>
        <div className="comment-main-level">
          <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
          <div className="comment-box">
            <div className="comment-head">
              <div>
                <h6 className={this.props.isContentAuthor ? "comment-name by-author" : "comment-name"} >
                  <Link>{this.props.cmtAuthorName}</Link>
                </h6>
                <span>{this.props.createdTime}</span>
              </div>
              <div>
                <PopupMenu onMenuItemClick={this.onPopupMenuItemClick}  items={commentMenuItems} id={`${this.props.popUpMenuPrefix}-cipm-${this.props.id}`    }  />
              </div>
            </div>
            <div className="comment-content">
              {this.props.content}
            </div>

            <CommentReactionbar likeCount={this.props.likeCount} replyCount={this.props.replyCount} />
          </div>

        </div>

        {/* Replies of this comment */}
        <ul className="comments-list reply-list">
          <Reply likeCount={this.props.likeCount} replyCount={this.props.replyCount} />
          <Reply likeCount={this.props.likeCount} replyCount={this.props.replyCount} />
        </ul>
      </li>
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


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
import commentMenu from './adapter/commentMenu';
import PopupMenu from 'components/common/PopupMenu/PopupMenu.js';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { formatMathemicalFormulas, getCKEInstance, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils.js';
import PostReportedCommentReactionbar from './PostReportedCommentReactionbar'

class PostReportedComment extends React.Component {
  constructor(props) {
    super(props);

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
    //for unsynchonize reply count purpose 
    this.replyCount = this.props.replyCount;
    this.setState({})
  }

  onPopupMenuItemClick = (selectedItem) => {

    if (selectedItem.value === "EDIT_COMMENT") {

    }

    if (selectedItem.value === "DELETE_COMMENT") {

    }
  }

  render() {

    return (
      <div className="comments-list">
        <div className="comment-item report" id={`comment-item-` + this.props.commentId}>
          <div className="comment-main-level">
            <div className="comment-avatar"><img src={this.props.authorAvatarURL} alt="" /></div>
            {/* On view condition */}
              <div className="comment-head">
                <div className="d-flex" >
                  <Link className="comment-name" to={`user/${this.props.authorID}`}>{this.props.authorDisplayName}</Link>
                </div>
              </div>
              <div>
                {/* comment content */}
                <div className="comment-content ck-editor-output" id={"cmt-ctnt-" + this.props.commentId} />

                {/* comment reaction bar */}
                <PostReportedCommentReactionbar
                  componentId={"cmmt-rctn-br" + this.props.commentId}
                  commentId={this.props.commentId}
                  likeCount={this.props.likeCount}
                  submitDtm={this.props.submitDtm}
                  likeStatus={this.props.likeStatus}
                  createCommentReply={() => this.createCommentReply()}
                />
              </div>
            </div >
            {/* On edit condition */}

          </div >

          <div style={{ height: "0px", width: "0px" }} >
            <div className="triangle-with-shadow comment" />
          </div>
          {formatMathemicalFormulas()}
          {styleCodeSnippet()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostReportedComment));


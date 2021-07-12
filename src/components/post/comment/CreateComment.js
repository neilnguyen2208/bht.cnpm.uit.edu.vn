import React from 'react'

import 'components/styles/Button.scss'

import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import 'components/styles/Comment.scss'

//components
import Editor from 'components/common/CustomCKE/CKEditor.js'
import { CommentCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration'
import ShowOnPermission from 'components/base_components/ShowOnPermission';
import { Post } from 'authentication/permission.config';
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';

import { validation, styleFormSubmit } from 'utils/validationUtils'
import store from 'redux/store';
import { create_APostCommentReset } from 'redux/actions/postCommentAction'
import { createAPostComment, getAPostComments } from 'redux/services/postCommentServices'
import { openBLModal } from 'redux/services/modalServices';
import { getAPostStatisticByID } from 'redux/services/postServices';

const validationCondition = {
  form: '#create-comment-form',

  rules: [
    //truyen vao id, loai component, message
    validation.isRequired('crt-cmmnt-cke', 'ckeditor', 'Nội dung bình luận không được để trống')
  ],
}

class CreateComment extends React.Component {

  componentDidMount() {
    validation(validationCondition);
    if (window.location.hash === "#cr-cmt") {
      if (getCKEInstance('crt-cmmnt-cke'))
        getCKEInstance('crt-cmmnt-cke').on('instanceReady', function () {
          getCKEInstance('crt-cmmnt-cke').focus();
          document.getElementById("cr-cmt").scrollIntoView();
        })
    }
  }

  createComment = () => {
    if (styleFormSubmit(validationCondition))
      this.props.createAPostComment(this.props.postID, { content: getCKEInstance("crt-cmmnt-cke").getData() })
  }

  componentWillUnmount() {
    store.dispatch(create_APostCommentReset());
    if (getCKEInstance('crt-cmmnt-cke'))
      getCKEInstance('crt-cmmnt-cke').destroy();

  }

  reloadList = () => {
    openBLModal({ type: "success", text: "Tạo bình luận thành công!" });
    getCKEInstance("crt-cmmnt-cke").setData("");
    this.props.getAPostComments(this.props.postID);
    store.dispatch(create_APostCommentReset())
    this.setState({});
  }

  render() {

    if (this.props.isHaveCreated) {
      this.props.getAPostStatisticByID(this.props.postID)
      this.reloadList()
    }

    return (
      <div style={{ width: '100%', marginTop: "10px" }} className="comments-list cr">
        <div className="comment-main-level">
          <img className="comment-avatar" src={this.props.isSummaryLoaded && this.props.userSummaryData.avatarURL} alt="" />
          <div className="comment-box">
            <div id="create-comment-form" tabIndex="1">
              <div className="form-group">
                <div className="j-c-space-between">
                </div>
                <Editor
                  config={CommentCKEToolbarConfiguration}
                  editorId="crt-cmmnt-cke"
                  onChange={this.handleEditorChange}
                  height={120}
                  autoGrow_maxHeight={250}
                  validation
                  autoGrow_minHeight={120}
                />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
                <div className="j-c-end mg-top-5px">
                  <button className="white-button" onClick={() => { this.createComment() }}>Bình luận</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isHaveCreated: state.postComment.isHaveCreated,
    userSummaryData: state.auth.currentUserSummary.data,
    isSummaryLoaded: state.auth.currentUserSummary.isLoadDone
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createAPostComment, getAPostComments, getAPostStatisticByID
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateComment));


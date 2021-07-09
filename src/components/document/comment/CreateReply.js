import React from 'react'

import 'components/styles/Button.scss'

import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import store from 'redux/store/index'
// import { validation } from 'utils/validationUtils'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import 'components/styles/Comment.scss'

//components
import Editor from 'components/common/CustomCKE/CKEditor.js'
import { CommentCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration'
import ShowOnPermission from 'components/base_components/ShowOnPermission';
import { Post, CommentAction } from 'authentication/permission.config';
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';
import { authRequest, request } from 'utils/requestUtils';
import { RequireLogin } from 'components/base_components/RequireLoginComponent';

//TODO: - validation for multi-form => skip
//TODO: - sort current created reply to first
//BUG: after create a reply, not update current comment's replyCount.
//NOTE: this component is show or hide base on 3 conditions:
// - if current reply or comment is replied by someone.
// - if user granted enough permissions 
// - if no reply have created in this comment

class CreateReply extends React.Component {

  componentDidMount() {
  }

  createReply = () => {
    if (getCKEInstance(this.props.componentId))
      authRequest.post(`/documents/comments/${this.props.commentId}`, {
        content: getCKEInstance(this.props.componentId).getData()
      }).then(response => {

        // show new reply with blue border and show by pass new created reply id to parent comment.
        // reload current comment's replies list, this function is also update reply count in comment.
        this.props.reloadList(response.data.id);

        //make parent is not replying for hiding reply component.
        this.props.setNotReplying();

      })
        .catch(error => {
          console.log(error)

        })
    //after created => current comment will reload. 
  }

  render() {
    return (
      < RequireLogin availableActions={this.props.availableActions} requiredAction={CommentAction.Reply} showOnAction={true} >
        {/* check xem la reply hay comment */}
        {/* <div style={this.isShow ? { display: "block" } : { display: "none" }}> */}
        <div style={{ width: '100%', marginTop: "10px" }} className="reply-item cr">
          <div className="comment-main-level">
            <img className="comment-avatar reply" src={this.props.isSummaryLoaded && this.props.userSummaryData.avatarURL} alt="" />
            <div className="comment-box">
              <div className="form-group">
                <Editor
                  config={CommentCKEToolbarConfiguration}
                  editorId={this.props.componentId}
                  onChange={this.handleEditorChange}
                  data="<p>Nhập bình luận ...</p>"
                  height={100}
                  autoGrow_maxHeight={200}
                  autoGrow_minHeight={100}
                  onInstanceReady={() => { getCKEInstance(this.props.componentId).focus() }}
                />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
                <div className="j-c-end mg-top-5px">
                  <button className="white-button" onClick={() => { this.createReply() }}>Trả lời</button>
                </div>
              </div>
            </div>
          </div>
         

        </div>
      </RequireLogin >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSummaryData: state.auth.currentUserSummary.data,
    isSummaryLoaded: state.auth.currentUserSummary.isLoadDone
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateReply));


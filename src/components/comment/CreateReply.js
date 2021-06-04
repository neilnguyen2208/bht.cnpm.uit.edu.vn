import React from 'react'

import 'components/styles/Button.scss'

import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//services
import { getAPostComments } from "redux/services/commentServices"

// import store from 'redux/store/index'
// import { validation } from 'utils/validationUtils'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import './Comment.scss'

//components
import Editor from 'components/common/CustomCKE/CKEditor.js'
import { CommentCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration'
import ShowOnPermission from 'components/base_components/ShowOnPermission';
import { Post } from 'authentication/permission.config';
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';
class CreateReply extends React.Component {

  componentDidMount() {

  }

  createReply = () => {
    //
    //this.props.createComment(this.props.commentId, {commentContent})
  }

  render() {
    return (
      <ShowOnPermission permissions={[Post.Comment.Reply.Create]} >
        <div style={{ width: '100%', marginTop: "10px" }} className="reply-item cr">
          <div className="comment-main-level">
            <div className="comment-avatar reply"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
            <div className="comment-box">
              <div className="form-group">
                <Editor
                  config={CommentCKEToolbarConfiguration}
                  editorId={"crt-rply-" + this.props.replyId}
                  onChange={this.handleEditorChange}
                  data="<p>Nhập bình luận ...</p>"
                  height={100}
                  autoGrow_maxHeight={200}
                  autoGrow_minHeight={100}
                  onInstanceReady={() => { getCKEInstance("crt-rply-" + this.props.replyId).focus() }}
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
          <div style={{ height: "0px", width: "0px" }} >
            <div className="triangle-with-shadow reply" />
          </div>

        </div>
      </ShowOnPermission>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateReply));


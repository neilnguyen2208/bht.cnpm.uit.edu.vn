import React from 'react'

import 'components/styles/Button.scss'

import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

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


import { validation, styleFormSubmit } from 'utils/validationUtils'
import store from 'redux/store';
import { create_APostCommentReset } from 'redux/actions/commentAction'
import { createAPostComment } from 'redux/services/commentServices'

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

  }

  createComment = () => {
    if (styleFormSubmit(validationCondition))
      this.props.createAPostComment(this.props.postId, { content: getCKEInstance("crt-cmmnt-cke").getData() })
  }

  componentWillUnmount() {
    store.dispatch(create_APostCommentReset())
  }

  reloadList = () => {
    getCKEInstance("crt-cmmnt-cke").setData("");
    this.props.getAPostComments(this.props.postId);
    store.dispatch(create_APostCommentReset())
    this.setState({});
  }

  render() {

    if (this.props.isHaveCreated)
      this.reloadList()

    return (
      <ShowOnPermission permissions={[Post.Comment.Create]} >
        <div style={{ width: '100%', marginTop: "10px" }} className="comments-list cr">
          <div className="comment-main-level">
            <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
            <div className="comment-box">
              <div id="create-comment-form" tabIndex="1">
                <div className="form-group">
                  <div className="j-c-space-between">
                    {/* <label className="form-label-required">Nội dung:</label> */}
                    {/* <HoverHint message={`
                                - Sử dụng các Format Header để tạo ra mục lục. 
                                - Sử dụng Style Computer Code để style được tên biến, tên hàm.
                                - Sử dụng Format Formatted để style một đoạn code`}
                  /> */}
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
          <div style={{ height: "0px", width: "0px" }} >
            <div className="triangle-with-shadow comment" />
          </div>
        </div>
      </ShowOnPermission>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isHaveCreated: state.comment.currentPostComments.isHaveCreated
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createAPostComment
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateComment));


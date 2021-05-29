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
class AddComment extends React.Component {

  componentDidMount() {

  }

  render() {

    return (
      <ShowOnPermission permissions={[Post.CreateComment]} >
        <div style={{ width: '100%', marginTop: "10px" }} class="comments-list cr">
          <div className="comment-main-level">
            <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
            <div className="comment-box">

              <div className="form-group">
                <Editor
                  config={CommentCKEToolbarConfiguration}
                  editorId="crt-cmmnt-cke"
                  onChange={this.handleEditorChange}
                  data="<p>Nhập bình luận ...</p>"
                />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
                <div className="j-c-end mg-top-5px">
                  <button className="white-button">Bình luận</button>
                </div>
              </div>

            </div>
            <div style={{ height: "0px", width: "0px" }} >
              <div className="triangle-with-shadow comment" />
            </div>
          </div>
        </div >


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddComment));


import React from 'react'

import 'components/styles/Button.scss'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
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

class AddComment extends React.Component {

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <div className="form-group">
          <div className="j-c-space-between">
            {/* <label className="form-label-required">Nội dung:</label> */}
            {/* <HoverHint message={`
                                  - Sử dụng các Format Header để tạo ra mục lục. 
                                  - Sử dụng Style Computer Code để style được tên biến, tên hàm.
                                  - Sử dụng Format Formatted để style một đoạn code`}
                id="crphvh-1" /> */}
          </div>
          {/* Comment area */}
          <Editor inline
            // editorId="crt-cmmnt-cke"
            // placeholder='Start typing here...'
            // onChange={this.handleEditorChange}
            // data="<p>Nhập nội dung bài viết ...</p>"
            data="<p>Hello from CKEditor 4!</p>"
          />
          <div className="form-error-label-container">
            <span className="form-error-label" ></span>
          </div>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddComment));


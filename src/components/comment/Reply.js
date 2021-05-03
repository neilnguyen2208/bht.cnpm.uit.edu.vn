import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//constants
import { commentMenuItems } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu';
import ReplyReactionbar from './ReplyReactionbar';

class Reply extends Component {

  render() {

    return (
      <li>
        <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
        <div className="comment-box">
          <div className="comment-head">
            <div>
              <h6 className={this.props.isContentAuthor ? "comment-name by-author" : "comment-name"} >
                <Link>{this.props.cmtAuthorName}</Link>
              </h6>
              <span>{this.props.createdTime}</span>
            </div>
            <div>
              <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={commentMenuItems} id={`${this.props.popUpMenuPrefix}-cipm-${this.props.id}`} />
            </div>
          </div>
          <div className="comment-content">
            {this.props.content}
          </div>

          <ReplyReactionbar likeCount={this.props.likeCount} replyCount={this.props.replyCount} />
        </div>


      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //report
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reply));


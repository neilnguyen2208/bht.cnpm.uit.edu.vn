import React from 'react'

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
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

class Reply extends React.Component {
  componentDidMount() {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);

    const clean = DOMPurify.sanitize(this.props.content);
    if (document.querySelector(`#rp-ctnt-${this.props.id}.comment-content`))
      document.querySelector(`#rp-ctnt-${this.props.id}.comment-content`).innerHTML = clean;

  }
  render() {

    return (
      <li >
        <div className="d-flex">
          <div className="comment-avatar reply"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>

          <div className="comment-box">
            <div className="comment-head">
              <div>
                <div className="d-flex" >
                  <Link className="comment-name" to = {"user/1"}>{this.props.cmtAuthorName}</Link>
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
              <div><div className="comment-content ck-editor-output" id={"rp-ctnt-" + this.props.id} />
                <ReplyReactionbar likeCount={this.props.likeCount} isLiked={this.props.isLiked} createdTime={this.props.createdTime} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "0px", width: "0px" }} >
          <div className="triangle-with-shadow reply" />
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


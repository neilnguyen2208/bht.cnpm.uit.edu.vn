import React, { Component } from 'react'

import 'components/styles/Button.scss'
// import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

// import store from 'redux/store/index'
// import { validation } from 'utils/validationUtils'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import './Comment.scss'
//constants

//components

class CommentSection extends Component {

  constructor(props) {
    super(props);
    this.comments = [{

    }]
  }


  render() {

    return (

      <div class="comments-container">
        Bình luận

        <ul id="comments-list" class="comments-list">
          <li>
            <div class="comment-main-level">
              <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
              <div class="comment-box">
                <div class="comment-head">
                  <h6 class="comment-name by-author">
                    <Link>Tesla</Link>
                  </h6>
                  <span>20 phút trước</span>
                  <i class="fa fa-reply"></i>
                  <i class="fa fa-heart"></i>
                </div>
                <div class="comment-content">
                  Các bạn nên đọc bài tiếng Anh tại đây nhé!
						</div>
              </div>
            </div>
            <ul class="comments-list reply-list">
              <li>
                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
                <div class="comment-box">
                  <div class="comment-head">
                    <h6 class="comment-name">
                      <Link>Veg Knight
                      </Link>
                    </h6>
                    <span> 10 phút trước</span>
                    <i class="fa fa-reply"></i>
                    <i class="fa fa-heart"></i>
                  </div>
                  <div class="comment-content">
                    OK, bạn.
							</div>
                </div>
              </li>

              <li>
                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
                <div class="comment-box">
                  <div class="comment-head">
                    <h6 class="comment-name by-author"><Link>Tesla</Link></h6>
                    <span> 10 phút trước</span>
                    <i class="fa fa-reply"></i>
                    <i class="fa fa-heart"></i>
                  </div>
                  <div class="comment-content">
                    Mình có ý này
							</div>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <div class="comment-main-level">
              <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
              <div class="comment-box">
                <div class="comment-head">
                  <h6 class="comment-name"><Link>Veg Knight</Link></h6>
                  <span> 10 phút trước</span>
                  <i class="fa fa-reply"></i>
                  <i class="fa fa-heart"></i>
                </div>
                <div class="comment-content">
                  OK
                  </div>
              </div>
            </div>
          </li>
        </ul>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentSection));


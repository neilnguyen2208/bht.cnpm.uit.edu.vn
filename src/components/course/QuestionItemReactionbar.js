import React from 'react'

import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { likeAPost, unLikeAPost, saveAPost, unSaveAPost } from 'redux/services/postServices';

//resources
import liked_icon from 'assets/icons/24x24/blue_flag_icon_24x24.png'
import unliked_icon from 'assets/icons/24x24/gray_flag_icon_24x24.png'

//styles
import 'components/styles/Reactionbar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import { formatNumber } from 'utils/miscUtils.js'

class QuestionReactionbar extends React.Component {

  constructor(props) {
    super(props);

    this.likeCount = -1; //dummy for change
    this.state = { isLiked: 0, isSaved: 0 };
  }

  toggleLikeImage = () => {
    // let tmpLike = this.state.isLiked;

    // if (tmpLike === 0)
    //   if (this.props.likedStatus) tmpLike = 1;
    //   else tmpLike = -1;

    // tmpLike = - tmpLike;

    // if (this.props.likedStatus) {
    //   if ((tmpLike === -1)) {
    //     this.likeCount = this.props.likeCount - 1;
    //     this.props.unLikeAPost(this.props.postId);
    //   }
    //   else {
    //     this.likeCount = this.props.likeCount;
    //     this.props.likeAPost(this.props.postId);
    //   }
    // }
    // else {
    //   if (tmpLike === 1) {
    //     this.likeCount = this.props.likeCount + 1
    //     this.props.likeAPost(this.props.postId);
    //   } else {
    //     this.props.unLikeAPost(this.props.postId);
    //     this.likeCount = this.props.likeCount;
    //   }
    // }
    // this.setState({ isLiked: tmpLike });
  }

  render() {
    // 
    //#region like, unlike buttons
    let likeBtn = <div></div>;

    // render likeBtn
    if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likedStatus)) {
      likeBtn = <img className="post-like-btn" alt="like" src={liked_icon}></img>
    }
    else {
      likeBtn = <img className="post-like-btn" alt="like" src={unliked_icon} ></img>
    }

    return (

      <div className="reaction-bar" style={{ borderTop: "0px", borderBottom: "1px solid var(--gray)", paddingBottom: "5px" }}>
        <div className="d-flex mg-top-5px">
          <div className="like-btn-container" onClick={this.toggleLikeImage}>
            <div className="d-flex"> {likeBtn}</div>
          </div>
        </div>
      </div >
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // saveAPost, unSaveAPost, likeAPost, unLikeAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionReactionbar));


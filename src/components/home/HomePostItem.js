import React, { Component } from 'react'

//resource
import graySaveIcon from 'assets/icons/24x24/nb_gray_bookmark_icon_24x24.png'
import blueSaveIcon from 'assets/icons/24x24/bfbookmark_icon_24x24.png'

import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import { itemType } from 'constants.js'

//styles
import 'components/styles/Button.scss'
import './HomeItem.scss'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import Modal from 'components/common/Modal/AlertModal'

import Loader from 'components/common/Loader/Loader'
import { Link } from 'react-router-dom'
import gray_btn_element from 'assets/icons/24x24/gray_btn_element_24x24.png'
import liked_btn from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_btn from 'assets/icons/24x24/unliked_icon_24x24.png'
import full_blue_bookmark_btn from 'assets/icons/24x24/b_blue_bookmark_icon_24x24.png'
import gray_bookmark_btn from 'assets/icons/24x24/nb_gray_bookmark_icon_24x24.png'

class CourseSummaryItem extends Component {

  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.title = this.props.title;
    this.image = this.props.image;
    this.likeCount = -1; //dummy for change
    this.state = { isLiked: 0, isSaved: 0 }
  }

  toggleLikeImage = () => {

    let tmpLike = this.state.isLiked;

    if (tmpLike === 0)
      if (this.props.likedStatus) tmpLike = 1;
      else tmpLike = -1;

    tmpLike = - tmpLike;

    if (this.props.likeStatus) {
      this.likeCount = tmpLike === -1 ? this.props.likeCount - 1 : this.props.likeCount;
    }
    else {
      this.likeCount = tmpLike === -1 ? this.props.likeCount + 1 : this.props.likeCount;
    }
    console.log(this.state.isLiked);
    //call API
    this.setState({ isLiked: tmpLike });

    console.log(this.state.isLiked)
  }

  toggleSaveImage = () => {
    let tmp = this.state.isSaved;
    if (tmp === 0)
      tmp = this.props.savedStatus ? 1 : -1;
    tmp = -tmp;

    //call API
    this.setState({ isSaved: tmp });
  }

  componentDidMount() {

  }


  render() {
    let likeBtn = <div></div>;
    let saveBtn = <div></div>;

    //render likeBtn
    if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likedStatus)) {
      likeBtn = <img className="post-like-btn" alt="like" src={liked_btn} onClick={this.toggleLikeImage}></img>
    }
    else {
      likeBtn = <img className="post-like-btn" alt="like" src={unliked_btn} onClick={this.toggleLikeImage} ></img>
    }

    //render saveBtn
    if (this.state.isSaved === 1 || (this.state.isSaved === 0 && this.props.savedStatus)) {
      saveBtn = <div className="d-flex" onClick={this.toggleSaveImage} >
        <img className="save-btn" alt="like" src={full_blue_bookmark_btn} />
        <div>Huỷ</div>
      </div>
    }
    else {
      saveBtn = <div className="d-flex" onClick={this.toggleSaveImage} >
        <img className="save-btn" alt="dislike" src={gray_bookmark_btn} />
        <div>Lưu</div>
      </div >
    }
    return (
      <div className="home-item" >
        <img className="cover-image" alt='cover' src={this.props.imageURL} />
        <div className="home-item-metadata" >
          <div className="d-flex">
            <div className="d-flex">
              <div className="category">
                {this.props.categoryName}
              </div>
            </div>
            <div className="light-black-label">bởi</div>
            <Link className="link-label-s" to={/user/}>
              {this.props.authorName}
            </Link>
          </div>
        </div>
        {/* title */}
        <Link to={"/posts/" + this.props.id}>
          <div className="title">
            {this.props.title}
          </div>
        </Link>

        <div className="metadata-2" >
          <div className="d-flex"  >

            <div className="metadata-label" style={{ marginLeft: "2px" }}>
              {Math.ceil(this.props.readingTime / 60) + " phút đọc"}
            </div>
          </div>

          <div className="d-flex" >
            <div className="metadata-label" style={{ marginLeft: "2px" }}>
              {this.props.publishDtm.substring(0, 10)}
            </div>
          </div>
        </div>

        <div className="summary">
          {this.props.summary}
        </div>

        <div className="reaction-bar">
          <div className="d-flex">
            <div className="like-btn">  {likeBtn}</div>
            <div className="like-count">{this.likeCount !== -1 ? this.likeCount : this.props.likeCount}</div>
          </div>
          <div className="d-flex">
            <div className="d-flex save-btn-container mg-left-5px">
              <div>{saveBtn}</div>
            </div>
            <div className="comment-count-container">
              Bình luận
                <div style={{ paddingLeft: "5px" }}>
                {this.props.commentCount}
              </div>
            </div>
          </div>

        </div>
      </div >
    );
  }


}
export default CourseSummaryItem;
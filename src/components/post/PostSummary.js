import React, { Component } from 'react'

import 'components/styles/SimpleButton.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { approveAPost } from 'redux/services/postServices'
//resources
import gray_btn_element from 'assets/images/g_btn_element.png'
import liked_btn from 'assets/images/liked_btn.png'
import unliked_btn from 'assets/images/unliked_btn.png'
import full_blue_bookmark_btn from 'assets/images/full_blue_bookmark_btn.png'
import gray_bookmark_btn from 'assets/images/gray_bookmark_btn.png'
import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import 'components/styles/DocPostSummary.scss'

//styles
import 'components/styles/SimpleLabel.scss'

//constants
import { itemType } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

class PostSummary extends Component {

  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.authorName = this.props.authorName;
    this.authorID = this.props.authorID;

    this.publishDtm = this.props.publishDtm.substring(0, 10);
    this.category = this.props.category;
    this.requestedCategoryID = this.props.requestedCategoryID;

    this.title = this.props.title;
    this.content = this.props.content;
    this.image = this.props.image;
    this.tags = this.props.tags;

    this.isLiked = false;
    this.isSaved = false;

    this.normalMenuItemList = [
      { id: 3, name: "Báo cáo", icon: trash_icon },
    ]

    this.mySelfMenuItemList = [
      { id: 1, name: "Xoá", icon: trash_icon },
      { id: 2, name: "Chỉnh sửa", icon: trash_icon },
      { id: 3, name: "Báo cáo", icon: trash_icon },
    ]

  }

  //#region handle like, unlike buttons
  toggleLikeImage = () => {
    this.isLiked = !this.isLiked;
    this.setState({});
  }

  toggleSaveImage = () => {
    this.isSaved = !this.isSaved;
    this.setState({});
  }
  //#endregion

  //#region edit, delete button
  onDeleteBtnClick = () => {

  }

  onEditBtnClick = () => {

  }
  //#endregion

  render() {

    //#region like, unlike buttons

    //initiate some element
    let likeBtn = <div></div>;
    let saveBtn = <div></div>;
    let approveLabel = <div></div>

    // this.props.type === itemType.mySelf

    //render likeBtn
    if (!this.isLiked) {
      likeBtn = <img className="like-btn" alt="like" src={liked_btn} onClick={this.toggleLikeImage}></img>
    }
    else {
      likeBtn = <img className="like-btn" alt="like" src={unliked_btn} onClick={this.toggleLikeImage} ></img>
    }

    //render saveBtn
    if (!this.isSaved) {
      saveBtn = <img className="save-btn" alt="dislike" src={full_blue_bookmark_btn}></img>
    }
    else {
      saveBtn = <img className="save-btn" alt="dislike" src={gray_bookmark_btn} ></img>
    }

    //#endregion
    console.log(this.props.approveState)
    if (this.props.approveState === "PENDING_APPROVAL")
      approveLabel =
        <div className="d-flex" >
          <div className="metadata-light-black-label"> - </div>
          <div className="red-border-label">PENDING</div>
        </div >
    else if (this.props.approveState === "PENDING_FIX")
      approveLabel =
        <div className="d-flex">
          <div className="metadata-light-black-label"> - </div>
          <div className="blue-border-label">PENDING</div>
        </div>
    else if (this.props.approveState === "REJECTED")
      approveLabel =
        <div className="d-flex">
          <div className="metadata-light-black-label"> - </div>
          <div className="red-border-label">REJECTED</div>
        </div>
    else if (this.props.approveState === "APPROVED")
      approveLabel =
        <div className="d-flex">
          <div className="metadata-light-black-label"> - </div>
          <div className="blue-border-label">APPROVED</div>
        </div>

    return (
      <div className="item-container" >
        <div className="item-normal-metadata-container" >
          <div className="d-flex">

            <div className="d-flex">
              <div className="prefix-normal-category" />
              <div className="normal-category">
                {this.props.category}
              </div>
            </div>

            <div className="metadata-light-black-label">bởi</div>
            <Link className="link-label" to={/user/}>
              {this.props.authorName}
            </Link>

            {this.props.type === itemType.mySelf || this.props.type === itemType.approving ?
              <>{approveLabel}</> : <></>}
          </div>

          {this.props.type === itemType.mySelf &&
            <PopupMenu items={this.mySelfMenuItemList} id={`post-item-popup-menu-${this.props.id}`} />
          }
          {(this.props.type === itemType.normal || !this.props.type) &&
            <PopupMenu items={this.normalMenuItemList} id={`post-item-popup-menu-${this.props.id}`} />
          }

        </div>

        {/* title */}
        <div className="mg-left-10px">
          <Link to={"/posts/" + this.id}>
            <div className="item-title">
              {this.props.title}
            </div>
          </Link>

          <div className="d-flex" style={{ marginTop: "-8px" }}>
            <div className="d-flex"  >
              <img alt="*" className="metadata-icon" src={gray_btn_element} />
              <div className="metadata-light-black-label" style={{ marginLeft: "2px" }}>
                {Math.ceil(this.props.readingTime / 60) + " phút đọc"}
              </div>
            </div>

            <div className="d-flex" >
              <img alt="*" className="metadata-icon" src={gray_btn_element} />
              <div className="metadata-light-black-label" style={{ marginLeft: "2px" }}>
                {this.props.publishDtm.substring(0, 10)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="item-summary">
          {this.props.summary}
        </div>
        {this.props.type === itemType.approving ? <></> :
          <div className="item-reaction-bar">
            <div className="d-flex mg-top-5px">
              <div className="d-flex">
                <div> {likeBtn}</div>
                <div className="like-count">{this.props.likes}</div>
              </div>

              <div className="d-flex">
                <div className="save-text-container" onClick={this.toggleSaveImage}>
                  <div>{saveBtn}</div>
                  {this.isSaved ? "Lưu" : "Huỷ"}
                </div>
                <div className="post-comment-count-container">
                  Bình luận
                <div style={{ paddingLeft: "5px" }}>
                    {this.props.comments}
                  </div>
                </div>
              </div>
            </div>
            <div className="link-label mg-top-5px" onClick={() => { window.location.href = "/docs/category?id=" + this.props.id }}>
              Đọc tiếp ...
            </div>
          </div>
        }
        {/* for implement approve item */}
        <div className="j-c-space-between">
          {this.props.type === itemType.approving ?
            <div className="d-flex j-c-end" >
              <div className="white-button" style={{ marginRight: "5px" }} onClick={() => this.onEditBtnClick()}>Reject&feedback</div>
              <div className="blue-button" style={{ marginRight: "5px" }} onClick={() => this.onApproveBtnClick()}>Approve</div>
              <div className="red-button" onClick={() => { this.onDeleteBtnClick() }}>Reject</div>
            </div>
            :
            <></>
          }

        </div>
      </div >
    );
  }

}
const mapStateToProps = (state) => {
  return {
    isApprovingLoadDone: state.post.approvePost.isLoadDone,
    notification: state.post.approvePost.notification
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  approveAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSummary));


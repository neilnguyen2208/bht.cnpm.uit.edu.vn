import React, { Component } from 'react'

//resource
import gray_btn_element from 'assets/icons/24x24/gray_btn_element_24x24.png'
import liked_btn from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_btn from 'assets/icons/24x24/unliked_icon_24x24.png'
import dislike_btn from 'assets/icons/24x24/disliked_icon_24x24.png'
import undislike_btn from 'assets/icons/24x24/undisliked_icon_24x24.png'
import download_btn from 'assets/icons/24x24/gray_download_icon_24x24.png'
import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import { itemType } from 'constants.js'

//styles
import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

class DocSummary extends Component {

  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.authorName = this.props.authorName;
    this.authorID = this.props.authorID;

    this.publishDtm = this.props.publishDtm;
    this.category = this.props.category;
    this.requestedCategoryID = this.props.requestedCategoryID;

    this.title = this.props.title;
    this.content = this.props.content;
    this.image = this.props.image;
    this.tags = this.props.tags;

    this.normalMenuItemList = [
      { id: 3, name: "Báo cáo", icon: trash_icon },
    ]

    this.mySelfMenuItemList = [
      { id: 1, name: "Xoá", icon: trash_icon },
      { id: 2, name: "Chỉnh sửa", icon: trash_icon },
      { id: 3, name: "Báo cáo", icon: trash_icon },
    ]
  }

  onLikeBtnClick = () => {
    // this.props.likeDocument(this.id);
    this.dislikes = this.isDisliked ? this.dislikes-- : this.dislikes;
    this.isDisliked = false;
    this.isLiked = !this.isLiked;
    this.likes++;
    this.calculateBar();
    this.setState({});
  }

  onDislikeBtnClick = () => {
    // this.props.dislikeDocument(this.id);
    this.likes = this.isLiked ? this.likes-- : this.likes;
    this.isLiked = false;
    this.isDisliked = !this.isDisliked;
    this.dislikes++;
    this.calculateBar();
    this.setState({});
  }

  getFirstImage() {

  }

  onDeleteBtnClick = () => {

  }

  onEditBtnClick = () => { }


  render() {

    //initiate some element
    let likeBtn = <div></div>;
    let dislikeBtn = <div></div>;

    //render likeBtn
    if (!this.isLiked) {
      likeBtn = <img className="doc-like-dislike-btn" alt="like" src={liked_btn} onClick={this.onLikeBtnClick}></img>
    }
    else {
      likeBtn = <img className="doc-like-dislike-btn" alt="like" src={unliked_btn} onClick={this.onLikeBtnClick} ></img>
    }

    //render dislikeBtn
    if (!this.isDisliked) {
      dislikeBtn = <img className="doc-like-dislike-btn" alt="dislike" src={dislike_btn} onClick={this.onDislikeBtnClick}></img>
    }
    else {
      dislikeBtn = <img className="doc-like-dislike-btn" alt="dislike" src={undislike_btn} onClick={this.onDislikeBtnClick} ></img>
    }

    let approveLabel = <></>;

    if (this.props.approveState === "PENDING_APPROVAL")
      approveLabel =
        <div className="d-flex" >
          <div className="light-black-label"> - </div>
          <div className="red-border-label">PENDING</div>
        </div >
    else if (this.props.approveState === "PENDING_FIX")
      approveLabel =
        <div className="d-flex">
          <div className="light-black-label"> - </div>
          <div className="blue-border-label">PENDING</div>
        </div>
    else if (this.props.approveState === "REJECTED")
      approveLabel =
        <div className="d-flex">
          <div className="light-black-label"> - </div>
          <div className="red-border-label">REJECTED</div>
        </div>
    else if (this.props.approveState === "APPROVED")
      approveLabel =
        <div className="d-flex">
          <div className="light-black-label"> - </div>
          <div className="blue-border-label">APPROVED</div>
        </div>

    return (
      <div className="item-container" >
        <div className="metadata" >
          <div className="d-flex">

            <div className="d-flex">
              <div className="prefix-normal-category" />
              <div className="normal-category">
                {this.props.category}
              </div>
            </div>

            <div className="light-black-label">bởi</div>
            <div className="link-label-s" onClick={() => this.navigateToAuthorPersonalPage()}>
              {this.props.authorName}
            </div>

            {this.props.type === itemType.mySelf || this.props.type === itemType.approval ?
              <>{approveLabel}</> : <></>}
          </div>

          {this.props.type === itemType.mySelf &&
            <PopupMenu items={this.mySelfMenuItemList} id={`doc-item-popup-menu-${this.props.id}`} />
          }
          {(this.props.type === itemType.normal || !this.props.type) &&
            <PopupMenu items={this.normalMenuItemList} id={`doc-item-popup-menu-${this.props.id}`} />
          }

        </div>
        <div className="title">
          {this.props.title}
        </div>
        <div className="d-flex" style={{ marginTop: "-8px" }}>
          <div className="d-flex" >
             <div className="metadata-label" style={{ marginLeft: "2px" }}>
              {this.props.publishDtm.substring(0, 10)}
            </div>
          </div>
          <div className="d-flex" >
             <div className="metadata-label" style={{ marginLeft: "2px" }}>
              lượt xem
              <div style={{ marginLeft: "5px" }}>
                {this.props.views}
              </div>
            </div>
          </div>

        </div>

        <div className="summary-text">
          {this.props.description}
        </div>

        <div className="reaction-bar" style={{ right: "5px" }}>
          <div className="d-flex">
            <div className="like-dislike-bar">
              {/* 2 button */}
              <div className="j-c-space-between">
                <div className="d-flex">
                  <div> {likeBtn}</div>
                  <div className="doc-like-dislike-count">{this.props.likes}</div>
                </div>
                <div className="d-flex">
                  <div> {dislikeBtn}</div>
                  <div className="doc-like-dislike-count">{this.props.dislikes}</div>
                </div>
              </div>
              {/* rate bar */}
              <div className="rate-percent-bar">
                <div className="like-rate-percent" id={'document-item-like-percents-' + this.props.id} />
              </div>
            </div>
            <div className="d-flex">
              <div className="doc-comment-count-container">
                Bình luận
                <div className="comment-count">
                  {this.props.commentCount}
                </div>
              </div>
              <div className="download-count-layout">
                <img src={download_btn} alt="^" className="download-btn"></img>
                <div style={{ width: "2px" }}></div>
                {this.props.downloads}
              </div>
            </div>
          </div>

          <div className="link-label-s">
            Đọc tiếp ...
          </div>

        </div>

      </div >
    );
  }


  //Calculates bar widths
  calculateBar = () => {

    if (this.likes === this.dislikes) {
      if (document.getElementById('document-item-like-percents-' + this.props.id))
        document.getElementById('document-item-like-percents-' + this.props.id).style.width = "50%";
      return;
    }
    else {
      let percentageLikes;
      //Simple math to calculate percentages
      let total = this.likes + this.dislikes;
      percentageLikes = (this.likes / total) * 100;
      if (document.getElementById('document-item-like-percents-' + this.props.id))
        //We need to apply the widths to our elements
        document.getElementById('document-item-like-percents-' + this.props.id).style.width = percentageLikes.toString() + "%";
    }

  }

  navigateToAuthorPersonalPage = () => {
    window.location.href = "/user/" + this.authorID;
  }

  navigateToSameCategoryDocsPage = () => {
    window.location.href = "/docs/category?id=" + this.requestedCategoryID;
  }

  handlerPreviewRequestedPost = () => {
    if (window.location.pathname.substring(0, 6) === "/admin") {
      window.location.href = "/admin/doc-approving/" + this.id;
      return;
    }
    if (window.location.pathname.substring(0, 5) === "/user")
      window.location.href = "/user/doc-approving/" + this.id;

  }

  handlerRejectRequestedPost = () => {
    this.isRejectRequestedPopupOpen = true;
    this.setState({});
  }

  handleCancelRejectRequestedPostConfirmation = () => {
    this.isRejectRequestedPopupOpen = false;
    this.setState({});
  }

  handlerVerifyRejectRequestedPostConfirmation = () => {
    this.isRejectRequestedPopupOpen = false;
    this.setState({});
  }

  // likePost() { }

}
export default DocSummary;
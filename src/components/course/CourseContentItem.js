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
import Modal from 'components/common/Modal/AlertModal'


class CourseSummaryItem extends Component {

  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.content = this.props.content;
    this.image = this.props.image;

    this.normalMenuItemList = [
      { id: 3, name: "Report", icon: trash_icon },
    ]

    this.mySelfMenuItemList = [
      { id: 1, name: "Xoá", icon: trash_icon },
      { id: 2, name: "Chỉnh sửa", icon: trash_icon },
      { id: 3, name: "Report", icon: trash_icon },
    ]
  }


  render() {

    return (
      <></>

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


}
export default CourseSummaryItem;
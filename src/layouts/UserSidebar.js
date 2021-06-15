/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { NavLink } from "react-router-dom";

// import resource image, icon
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'
import account_management_icon from 'assets/icons/24x24/account_management_icon_24x24.png'
import gray_nb_write_icon from 'assets/icons/24x24/nb_gray_write_icon_24x24.png'

import 'layouts/LeftSidebarLayout.scss'
import 'components/styles/Label.scss'
import 'layouts/Layout.scss'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//import for permission
import {
  //suitable roles name 
} from 'authentication/permission.config'

import authServices from 'authentication/authenticationServices'

class UserSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.isTheFirstTimeLoaded = true;
    //bind check permission in PermissionManagement.js file
  }

  componentDidMount() {
    // this.props.getCurrentUser();
    window.addEventListener('scroll', this.scrollFunction)

  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction);
  }
  render() {

    return (
      <div className="left-sidebar-wrapper" >
        {/* Dung de gioi han lai khong gian cua cac component con khi scroll */}
        <div className="fake-left-sidebar" />
        {/* Left Sidebar */}
        <div className="left-sidebar" id="user-left-sidebar">
          {/* Hien thi avatar, thanh tich va ten role */}
          <div>

            {/* Role and achivement port */}
            <div className="user-role">
              User
            </div>

          </div>

          < div className="vertical-menu-container"  >
            <div style={{ display: "block" }}>
              {/* Quan ly tai khoan menu item*/}
              <div className="pr-drop-down-m-i" id="account-managent-parent-menu-item"
                onClick={(e) => this.handleDisplayBlockDefaultDropDownMenuClick(e, "account-managent-parent-menu-item", "account-managent-parent-menu-item-text", "account-admin-dropdown-btn-element", "account-admin-menu-item-container")
                }>
                <div className="d-flex">
                  <img alt="*" className="vertical-m-i-icon"
                    src={account_management_icon} />
                  <div className="side-bar-menu-item-text"
                    id="account-managent-parent-menu-item-text">
                    {"Tài khoản"}
                  </div>
                </div>
                <img alt="v" className="Dropdown_Btn_Element"
                  src={dropdown_btn}
                  id="account-admin-dropdown-btn-element" />
              </div >

              <div className="Vertical_Display_Block_Default_Dropdown_Menu_Item_Container"
                id="account-admin-menu-item-container">
                <div className="mg-bottom-5px"></div>
                <NavLink className="vertical-sub-m-i"
                  activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                  to={`/user/profile/${this.props.userSummaryData.id}`} exact
                  onClick={() => this.setState({})}> Trang cá nhân
                </NavLink>

                <NavLink className="vertical-sub-m-i"
                  activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                  to={"/user/account-management"} exact
                  onClick={() => this.setState({})}>Cập nhật thông tin
                </NavLink>

                <NavLink className="vertical-sub-m-i"
                  activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                  to={"/user/sercurity"}
                  exact
                  onClick={() => { authServices.accountManagement(); this.setState({}) }}>
                  Cài đặt bảo mật
                </NavLink>
                {/* 
                <NavLink className="vertical-sub-m-i"
                  activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                  to={"/user/notification"}
                  onClick={() => this.setState({})}>
                  Thông báo
                      </NavLink>
 */}

                {/* <NavLink className="vertical-sub-m-i"
                  activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                  to={"/user/email-management"}
                  onClick={() => this.setState({})}>
                  Quản lý email
                      </NavLink> */}

                <div className="decoration-underline" style={{ marginTop: "5px", marginBottom: "10px" }} />
              </div>


              {/* Bai viet*/}
              <div style={{ display: "block" }}>
                <div className="pr-drop-down-m-i" id="user-post-managent-parent-menu-item"
                  onClick={(e) => this.handleDisplayBlockDefaultDropDownMenuClick(e,
                    "user-post-management-parent-menu-item",
                    "user-post-management-parent-menu-item-text",
                    "user-post-management-dropdown-btn-element",
                    "user-post-management-menu-item-container")
                  }>
                  <div className="d-flex">
                    <img alt="*" className="vertical-m-i-icon"
                      src={gray_nb_write_icon} />
                    <div className="side-bar-menu-item-text"
                      id="user-post-managent-parent-menu-item-text">
                      {"Bài viết"}
                    </div>
                  </div>
                  <img alt="v" className="Dropdown_Btn_Element"
                    src={dropdown_btn}
                    id="user-post-managent-parent-menu-item-text" />
                </div >

                <div className="Vertical_Display_Block_Default_Dropdown_Menu_Item_Container"
                  id="user-post-management-menu-item-container">
                  <div className="mg-bottom-5px"></div>

                  <NavLink className="vertical-sub-m-i"
                    activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                    to={"/user/my-posts?page=1&category=0"}
                    onClick={() => this.setState({})}>
                    Bài viết của tôi
                  </NavLink>

                  <NavLink className="vertical-sub-m-i"
                    activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                    to={"/user/saved-posts?page=1"}
                    onClick={() => this.setState({})}>
                    Đã lưu
                  </NavLink>

                  <NavLink className="vertical-sub-m-i"
                    activeClassName="vertical-sub-m-i main-interactive-menu-item-active"

                    to={"/create-post"}
                    onClick={() => this.setState({})}>
                    Tạo bài viết mới
                  </NavLink>
                  <div className="decoration-underline" style={{ marginTop: "5px", marginBottom: "10px" }} />
                </div>
              </div>


              <div style={{ display: "block" }}>
                <div className="pr-drop-down-m-i" id="user-document-managent-parent-menu-item"
                  onClick={(e) => this.handleDisplayBlockDefaultDropDownMenuClick(e,
                    "user-document-management-parent-menu-item",
                    "user-document-management-parent-menu-item-text",
                    "user-document-management-dropdown-btn-element",
                    "user-document-management-menu-item-container")
                  }>
                  <div className="d-flex">
                    <img alt="*" className="vertical-m-i-icon"
                      src={gray_nb_write_icon} />
                    <div className="side-bar-menu-item-text"
                      id="user-document-managent-parent-menu-item-text">
                      {"Tài liệu"}
                    </div>
                  </div>
                  <img alt="v" className="Dropdown_Btn_Element"
                    src={dropdown_btn}
                    id="user-document-managent-parent-menu-item-text" />
                </div >

                <div className="Vertical_Display_Block_Default_Dropdown_Menu_Item_Container"
                  id="user-document-management-menu-item-container">
                  <div className="mg-bottom-5px"></div>

                  <NavLink className="vertical-sub-m-i"
                    activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                    to={"/user/my-documents?page=1&category=1"}
                    onClick={() => this.setState({})}>
                    Tài liệu của tôi
                  </NavLink>

                  <NavLink
                    activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                    className="vertical-sub-m-i"
                    to={"/upload-document"}>
                    Upload tài liệu
                  </NavLink>

                  <div className="decoration-underline" style={{ marginTop: "5px", marginBottom: "10px" }} />
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >

    );
  }

  //#region for UI/UX sidebar
  //code style for dropdown menu
  handleDisplayNoneDefaultDropDownMenuClick = (e, parent_id, show_text_id, dropdown_element_id, container_id) => {
    e.preventDefault();
    let dropdown_container = document.getElementById(container_id);
    if (dropdown_container.style.display === "block") {
      dropdown_container.style.display = "none";
    }
    else
      dropdown_container.style.display = "block"
  }

  handleDisplayBlockDefaultDropDownMenuClick = (e, parent_id, show_text_id, dropdown_element_id, container_id) => {
    e.preventDefault();
    let dropdown_container = document.getElementById(container_id);
    dropdown_container.style.display === "none"
      ?
      dropdown_container.style.display = "block"
      :
      dropdown_container.style.display = "none"
  }

  //code style for animation when change to account information

  handleOnNotAccountInformationMenuItemClick = () => {
    this.setState({});
  }

  //#endregion

  //#region for handle on scroll
  scrollFunction = () => {

    //   let left_sidebar = document.getElementById("left-sidebar");
    //   let footer = document.getElementById("footer");
    //   let header = document.getElementById("header");

    //   function getRectTop(el) {
    //     var rect = el.getBoundingClientRect();
    //     return rect.top;
    //   }

    //   function getRectBottom(el) {
    //     var rect = el.getBoundingClientRect();
    //     return rect.bottom;
    //   }

    //   if (getRectBottom(header) <= 0 - 21) {
    //     left_sidebar.classList.add("left-sidebar_After_Header");
    //     left_sidebar.classList.remove("left-sidebar_Reach_Footer");
    //   }
    //   if (getRectBottom(header) > 0 - 21) {
    //     left_sidebar.classList.replace("left-sidebar_After_Header", "left-sidebar_Before_Header");
    //     left_sidebar.classList.remove("left-sidebar_Reach_Footer");
    //   }

    //   //Handler for Footer
    //   if ((getRectBottom(left_sidebar)) >= getRectTop(footer) - 45) {
    //     left_sidebar.classList.replace("left-sidebar_After_Header", "left-sidebar_Reach_Footer");
    //   }
    // }
    //#endregion


  }
}

const mapStateToProps = (state) => {
  return {
    userSummaryData: state.auth.currentUserSummary.data,
    userSummaryDataLoaded: state.auth.currentUserSummary.isLoadDone
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserSidebar));

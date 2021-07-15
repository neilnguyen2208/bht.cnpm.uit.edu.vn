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

import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'
import gray_upload_icon from 'assets/icons/48x48/gray_upload_icon_48x48.png'
//import for permission
import {
  //suitable roles name 
} from 'authentication/permission.config'

import authServices from 'authentication/authenticationServices'
import { formatNumber } from 'utils/miscUtils';

class UserSidebar extends React.Component {

  componentDidMount() {
    window.addEventListener('scroll', this.scrollFunction)

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction);
  }

  render() {
    return (
      <div className="left-sidebar-wrapper" >
        {/* Dung de gioi han lai khong gian cua cac component con khi scroll */}

        <div className="left sidebar" id="user-left-sidebar">
          <div>

            {
              this.props.userSummaryData && this.props.userSummaryDataLoaded ?
                <div className="user-info-layout" >
                  <img alt="avatar" className="side-bar-avatar" src={this.props.userSummaryData.avatarURL} />
                  <div className="achivement-layout">
                    <div className="score" style={{}}>Scrore:{formatNumber(this.props.userSummaryData.reputationScore)}</div>
                    <div className="d-flex mg-bottom-5px" style={{ marginTop: "10px" }} >
                      <div className="reputation-sub-container" >
                        <img alt="" src={gray_write_icon} className="user-menu-icon" />
                        <div className="reputation-label">  {formatNumber(this.props.userSummaryData.postCount)}</div>
                      </div>
                      <div className="reputation-sub-container">
                        <img alt="" src={gray_upload_icon} className="user-menu-icon" />
                        <div className="reputation-label">   {formatNumber(this.props.userSummaryData.docCount)}</div>
                      </div>
                    </div>

                  </div>
                </div > : <></>
            }
          </div>

          < div className="vertical-menu-container"  >
            <div style={{ display: "block" }}>
              {/* Quan ly tai khoan menu item*/}
              <div className="pr-drop-down-m-i" id="account-managent-parent-menu-item"
                onClick={(e) => this.handleLevel1Click(e, "account-managent-parent-menu-item", "account-managent-parent-menu-item-text", "account-admin-dropdown-btn-element", "account-admin-menu-item-container")
                }>
                <div className="d-flex">
                  <img alt="*" className="vertical-m-i-icon"
                    src={account_management_icon} />
                  <div className="sd-br-lvl1-mi-text"
                    id="account-managent-parent-menu-item-text">
                    {"Tài khoản"}
                  </div>
                </div>
                <img alt="v" className="dropdown-element"
                  src={dropdown_btn}
                  id="account-admin-dropdown-btn-element" />
              </div >

              <div className="d-block-default"
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

                {/* chang to button */}
                <button
                  className="vertical-sub-m-i" style={{ background: "white", width: "100%" }}
                  // activeClassName="vertical-sub-m-i main-interactive-menu-item-active"
                  // to={"/user/sercurity"}
                  // exact
                  onClick={() => { authServices.accountManagement(); this.setState({}) }}>
                  Cài đặt bảo mật
                </button>

                <div className="decoration-underline" style={{ marginTop: "5px", marginBottom: "10px" }} />
              </div>

              {/* Bai viet*/}
              <div style={{ display: "block" }}>
                <div className="pr-drop-down-m-i" id="user-post-managent-parent-menu-item"
                  onClick={(e) => this.handleLevel1Click(e,
                    "user-post-management-parent-menu-item",
                    "user-post-management-parent-menu-item-text",
                    "user-post-management-dropdown-btn-element",
                    "user-post-management-menu-item-container")
                  }>
                  <div className="d-flex">
                    <img alt="*" className="vertical-m-i-icon"
                      src={gray_nb_write_icon} />
                    <div className="sd-br-lvl1-mi-text"
                      id="user-post-managent-parent-menu-item-text">
                      {"Bài viết"}
                    </div>
                  </div>
                  <img alt="v" className="dropdown-element"
                    src={dropdown_btn}
                    id="user-post-managent-parent-menu-item-text" />
                </div >

                <div className="d-block-default"
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
                  onClick={(e) => this.handleLevel1Click(e,
                    "user-document-management-parent-menu-item",
                    "user-document-management-parent-menu-item-text",
                    "user-document-management-dropdown-btn-element",
                    "user-document-management-menu-item-container")
                  }>
                  <div className="d-flex">
                    <img alt="*" className="vertical-m-i-icon"
                      src={gray_nb_write_icon} />
                    <div className="sd-br-lvl1-mi-text"
                      id="user-document-managent-parent-menu-item-text">
                      {"Tài liệu"}
                    </div>
                  </div>
                  <img alt="v" className="dropdown-element"
                    src={dropdown_btn}
                    id="user-document-managent-parent-menu-item-text" />
                </div >

                <div className="d-block-default"
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

  handleLevel1Click = (e, parent_id, show_text_id, dropdown_element_id, container_id) => {
    e.preventDefault();
    let dropdown_container = document.getElementById(container_id);
    dropdown_container.style.display === "none"
      ?
      dropdown_container.style.display = "block"
      :
      dropdown_container.style.display = "none"
  }
}

const mapStateToProps = (state) => {
  return {
    userSummaryData: state.auth.currentUserSummary.data,
    userSummaryDataLoaded: state.auth.currentUserSummary.isLoadDone,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserSidebar));

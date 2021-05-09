/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { NavLink } from "react-router-dom";

// import resource image, icon
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'
import gray_upload_icon from 'assets/icons/24x24/nb_gray_upload_icon_24x24.png'
import content_management_icon from 'assets/icons/24x24/content_management_icon_24x24.png'
import user_management_icon from 'assets/icons/24x24/user_management_icon_24x24.png'
import activity_management_icon from 'assets/icons/24x24/account_management_icon_24x24.png'
import user_role_management_icon from 'assets/icons/24x24/user_role_management_icon_24x24.png'
import statistic_management_icon from 'assets/icons/24x24/statistic_management_icon_24x24.png'

//import scss
import 'layouts/LeftSidebarLayout.scss'
import 'components/styles/Label.scss'

//import resource string

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//import for permission
import {
    getRoleNameByName,
    isGrantedPermissions
} from 'utils/authUtils'

import {
    Document,
    Post,
    ContentManagement,
    Notification,
    Category,
    User,
    Role
} from 'utils/authUtils'

class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.accountInformation = {
            roleName: "ADMIN",
            score: 1000, docCount: 20,
            postCount: 15,
            username: "dongnvsince1999",
            avatarURL: "https://i.imgur.com/SZJgL6C.png"
        }
        this.isGrantedPermissions = isGrantedPermissions.bind(this); //bind check permission in PermissionManagement.js file
    }

    componentDidMount() {
        // this.props.getCurrentUser();
    }

    render() {
        let { roleName, score, postCount, docCount, avatarURL } = this.accountInformation;
        /* {window.onscroll = () => this.scrollFunction()} */
        return (
            <div className="left-sidebar-wrapper" >
                {/* Dung de gioi han lai khong gian cua cac component con khi scroll */}
                <div className="fake-left-sidebar" />
                {/* Left Sidebar */}
                <div className="left-sidebar" id="admin-left-sidebar">
                    <div className="user-info-layout" >
                        <img alt="avatar" className="side-bar-avatar" src={avatarURL} />
                        <div className="achivement-layout">
                            <div className="score">Scrore: {score}</div>
                            <div className="d-flex j-c-space-between">
                                <div className="d-flex w-50-percents">
                                    <img alt="post count" src={gray_write_icon} className="user-item-icon" ></img>
                                    <div className="mg-left-5px">{postCount}</div>
                                </div>

                                <div className="d-flex w-50-percents">
                                    <img alt="upload count" src={gray_upload_icon} className="user-item-icon"></img>
                                    <div className="mg-left-5px"> {docCount}</div>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="user-role">
                        {getRoleNameByName(roleName)}
                    </div>

                    <div className="vertical-menu-container"  >
                        <div>
                            {/* Quản lý nội dung */}
                            <div hidden={!this.isGrantedPermissions(ContentManagement.Management)}>
                                <div className="pr-drop-down-m-i"
                                    id="page-managent-parent-menu-item"
                                    onClick={(e) => this.handleDisplayBlockDefaultDropDownMenuClick(e, "page-managent-parent-menu-item", "page-managent-parent-menu-item-text", "page-admin-dropdown-btn-element", "page-admin-menu-item-container")}>
                                    <div className="d-flex">
                                        <img alt="*" className="vertical-m-i-icon" src={content_management_icon} id="page-managent-btn-element" />
                                        <div className="side-bar-menu-item-text" id="page-managent-parent-menu-item-text">
                                            Quản lý nội dung
                                        </div>
                                    </div>
                                    <img alt="v" className="Dropdown_Btn_Element" src={dropdown_btn} id="page-admin-dropdown-btn-element" />
                                </div>

                                <div className="Vertical_Display_Block_Default_Dropdown_Menu_Item_Container" id="page-admin-menu-item-container">
                                    <div className="mg-bottom-5px" />
                                    {
                                        (this.isGrantedPermissions(ContentManagement.Management)
                                            && this.isGrantedPermissions(Post.Approve)) ?
                                            <NavLink className="vertical-sub-m-i"
                                                activeClassName="main-interactive-menu-item-active vertical-sub-m-i"
                                                to={"/admin/post-management"} >
                                                <div className="text" >
                                                    Quản lý bài viết
                                                </div>
                                            </NavLink>
                                            : <></>
                                    }
                                    {
                                        (this.isGrantedPermissions(ContentManagement.Management)
                                            && this.isGrantedPermissions(Document.Approve)) ?
                                            <NavLink activeClassName="main-interactive-menu-item-active vertical-sub-m-i" className="vertical-sub-m-i"
                                                to={"/admin/document-management"} >
                                                <div className="text">
                                                    Quản lý tài liệu
                                                </div>
                                            </NavLink>
                                            :
                                            <></>
                                    }

                                    {
                                        (this.isGrantedPermissions(ContentManagement.Management)
                                            && this.isGrantedPermissions(Notification.ViewAll)) ?
                                            <NavLink activeClassName="main-interactive-menu-item-active vertical-sub-m-i" className="vertical-sub-m-i"
                                                to={"/admin/page-notification"}    >
                                                <div className="text">
                                                    Thông báo trang
                                                </div>
                                            </NavLink>
                                            :
                                            <></>
                                    }
                                    {
                                        (this.isGrantedPermissions(ContentManagement.Management)
                                            && this.isGrantedPermissions(Category.View)) ?
                                            <NavLink activeClassName="main-interactive-menu-item-active vertical-sub-m-i" className="vertical-sub-m-i"
                                                to={"/admin/category-management"}
                                            >
                                                <div className="text">
                                                    Quản lý danh mục
                                                            </div>
                                            </NavLink>
                                            : <></>
                                    }
                                    <div className="mg-bottom-5px" />
                                    <div className="decoration-underline " />
                                    <div className="mg-bottom-5px" />
                                    <div className="mg-bottom-5px" />
                                </div >
                            </div >

                            {/* Quan ly nguoi dung */}
                            {
                                (this.isGrantedPermissions(ContentManagement.Management) && this.isGrantedPermissions(User.All))
                                    ?
                                    <NavLink
                                        className="vertical-m-i"
                                        activeClassName="main-interactive-menu-item-active"
                                        to={"/admin/user-management"}
                                    >
                                        <img alt="*"
                                            className="vertical-m-i-icon"
                                            src={user_management_icon}
                                            id="user-managent-btn-element" />
                                        <div className="side-bar-menu-item-text"  >
                                            Quản lý người dùng
                                    </div>
                                    </NavLink>
                                    :
                                    <></>
                            }

                            {/* Quan ly hoat dong: các báo cáo người dùng  */}
                            {
                                (this.isGrantedPermissions(ContentManagement.Management)
                                    && this.isGrantedPermissions(User.All)) ?
                                    <NavLink className="vertical-m-i"
                                        activeClassName="main-interactive-menu-item-active"
                                        to={"/admin/activity-management"}
                                    >
                                        <img alt="*" className="vertical-m-i-icon"
                                            src={activity_management_icon}
                                            id="activity-managent-btn-element" />
                                        <div className="side-bar-menu-item-text"  >
                                            Quản lý hoạt động
                                          </div>
                                    </NavLink>
                                    :
                                    <></>
                            }

                            {/* Quan lý quyền truy cập: role */}
                            {
                                (this.isGrantedPermissions(ContentManagement.Management)
                                    && this.isGrantedPermissions(Role.All))
                                    ?
                                    <NavLink className="vertical-m-i"
                                        activeClassName="main-interactive-menu-item-active"
                                        to={"/admin/user-role-management"}
                                    >
                                        <img alt="*" className="vertical-m-i-icon"
                                            src={user_role_management_icon}
                                        />
                                        <div className="side-bar-menu-item-text"  >
                                            Quản lý quyền truy cập
                                                    </div>
                                    </NavLink >
                                    :
                                    <></>
                            }

                            {/* Thong ke */}
                            {
                                (this.isGrantedPermissions(ContentManagement.Management)
                                    && this.isGrantedPermissions(Role.All))
                                    ?
                                    <NavLink className="vertical-m-i"
                                        activeClassName="main-interactive-menu-item-active"
                                        to={"/admin/statistic"}
                                    >
                                        <img alt="*" className="vertical-m-i-icon"
                                            src={statistic_management_icon} />
                                        <div className="side-bar-menu-item-text"  >
                                            Thống kê
                                        </div>
                                    </NavLink >
                                    :
                                    <></>
                            }
                        </div >
                    </div >
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

        let left_sidebar = document.getElementById("admin-left-sidebar");
        let footer = document.getElementById("footer");
        let header = document.getElementById("header");

        function getRectTop(el) {
            var rect = el.getBoundingClientRect();
            return rect.top;
        }

        function getRectBottom(el) {
            var rect = el.getBoundingClientRect();
            return rect.bottom;
        }

        if (getRectBottom(header) <= 0 - 21) {
            left_sidebar.classList.add("left-sidebar_After_Header");
            left_sidebar.classList.remove("left-sidebar_Reach_Footer");
        }
        if (getRectBottom(header) > 0 - 21) {
            left_sidebar.classList.replace("left-sidebar_After_Header", "left-sidebar_Before_Header");
            left_sidebar.classList.remove("left-sidebar_Reach_Footer");
        }

        //Handler for Footer
        if ((getRectBottom(left_sidebar)) >= getRectTop(footer) - 45) {
            left_sidebar.classList.replace("left-sidebar_After_Header", "left-sidebar_Reach_Footer");
        }
    }
    //#endregion
}

//#region for redux
const mapStateToProps = () => {
    // (state);
    return {
        // accountInformation: state.user.account
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    // getCurrentUser
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminSidebar));
//#endregion
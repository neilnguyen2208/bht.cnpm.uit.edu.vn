import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import "./UserMenu.scss";
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'
import gray_upload_icon from 'assets/icons/48x48/gray_upload_icon_48x48.png'

import { ClickAwayListener } from "@material-ui/core";
import authService from "authentication/authenticationServices.js";
import { formatNumber } from 'utils/miscUtils'

import upload_icon from 'assets/icons/48x48/blue_upload_icon_48x48.png';
import write_icon from 'assets/icons/48x48/blue_write_icon_48x48.png';
import add_exercise_btn from 'assets/icons/24x24/add_exercise_btn.png'

import store from "redux/store";
import { getUserDetailById } from "redux/services/authServices";
import { getPostsByFilter } from "redux/services/postServices";
import ShowOnPermission from "components/base_components/ShowOnPermission";
import { Access } from "authentication/permission.config";
// authServices.

const userMenuOptions = [
    { id: 1, text: "Trang cá nhân", value: "PROFILE", icon: '', tip: "", hasLine: true, to: `/user/profile/`, isLink: true },
    // { id: 2, text: "Thông báo", value: "NOTIFICATION", icon: '', tip: "" },
    {
        id: 3, text: "Bài viết của tôi", value: "MY_POST", icon: '', to: "/user/my-posts", isLink: true,
        style: {
            height: "26px",
            paddingTop: "3px",
            paddingBottom: "3px"
        }
    },
    {
        id: 4, text: "Tài liệu của tôi", value: "MY_DOCUMENT", icon: '', tip: "", hasLine: true, to: "/user/my-documents", isLink: true,
        style: {
            height: "26px",
            paddingTop: "1px",
            paddingBottom: "5px"
        }
    },
    {
        id: 5, text: "Đăng xuất", value: "LOGOUT", icon: '', tip: "",
        style: {
            height: "26px",
            paddingTop: "1px",
            paddingBottom: "5px"
        }
    },
]

class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDropdownOpen: false,
        }
    }

    componentDidMount() {
        this.setState({ isDropdownOpen: false });
    }

    closeMenu = () => {
        let parent_id = "h-um-btn";
        let parent_menu_item = document.getElementById(parent_id);
        if (this.state.isDropdownOpen) {
            parent_menu_item.style.background = "white";
        }
        this.setState({ isDropdownOpen: false })
    }

    handlePopupMenuClick = (e, user_menu_id, dropdown_id) => {
        e.preventDefault();
        let user_menu = document.getElementById(user_menu_id);
        let dropdown = document.getElementById(dropdown_id);
        user_menu.style.background = "var(--grayish)";
        dropdown.style.left = "-9rem";

        if (!this.state.isDropdownOpen) {
            document.getElementById("h-um-wrapper").style.background = "var(--grayish)";
        }
        else {
            document.getElementById("h-um-wrapper").style.background = "white";
        }

        this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
    }

    handleMenuItemClick = (menuItem) => {
        document.getElementById("h-um-wrapper").style.background = "white";
        this.setState({});
        if (menuItem.value === "PROFILE") {
            store.dispatch(getUserDetailById(this.props.userSummaryData.id));
            this.searchParamObject = {
                "paginator": 1,
                "author": this.props.userSummaryData.id,
                "sort": "publishDtm,desc"
            }
            store.dispatch(getPostsByFilter(this.searchParamObject));
        }
        if (menuItem.value === "LOGOUT")
            authService.doLogout();
    }

    render() {
        let items = userMenuOptions.map(menuItem => {
            return <div className="header-user-menu-item" style={menuItem.hasLine && { borderBottom: "1px solid var(--grayish)" }}
                id={"header-user-menuItem-" + menuItem.id}
                key={menuItem.id} >
                <div >
                    {menuItem.tip ?
                        <>{menuItem.isLink ?
                            <Link className='d-flex' to={menuItem.value !== "PROFILE" ? menuItem.to : `/user/profile/${this.props.userSummaryData.id}`} onClick={() => this.handleMenuItemClick(menuItem)} style={{ color: "var(--black)" }}>
                                {menuItem.icon ? <img className='user-menu-icon' style={{
                                    height: "27px",
                                    paddingTop: "7px"
                                }} alt="" src={menuItem.icon} /> : <></>}
                                < div >
                                    <div className='user-menu-text'>{menuItem.text}</div>
                                    <div className='user-menu-tip'>{menuItem.tip}</div>
                                </div>
                            </Link>
                            :
                            <div className='d-flex' onClick={() => this.handleMenuItemClick(menuItem)}>
                                {menuItem.icon ? <img className='user-menu-icon' style={{
                                    height: "27px",
                                    paddingTop: "7px"
                                }} alt="" src={menuItem.icon} /> : <></>}
                                < div >
                                    <div className='user-menu-text'>{menuItem.text}</div>
                                    <div className='user-menu-tip'>{menuItem.tip}</div>
                                </div>
                            </div>
                        }</> :
                        <>{menuItem.isLink ?
                            <Link className='d-flex' onClick={() => this.handleMenuItemClick(menuItem)} to={menuItem.value !== "PROFILE" ? menuItem.to : `/user/profile/${this.props.userSummaryData.id}`} style={{ color: "var(--black)" }}>
                                {menuItem.icon ? <img className='user-menu-icon' style={menuItem.style ? menuItem.style : {
                                    height: "23px",
                                    paddingTop: "0px",
                                    paddingBottom: "3px"
                                }} alt="" src={menuItem.icon} /> : <></>}
                                <div className='user-menu-text'>{menuItem.text}
                                </div>
                            </Link>
                            :
                            <div className='d-flex' onClick={() => this.handleMenuItemClick(menuItem)}>
                                {menuItem.icon ? <img className='user-menu-icon' style={menuItem.style ? menuItem.style : {
                                    height: "23px",
                                    paddingTop: "0px",
                                    paddingBottom: "3px"
                                }} alt="" src={menuItem.icon} /> : <></>}
                                <div className='user-menu-text'>{menuItem.text}</div>
                            </div>}
                        </>}
                </div>
            </div >
        })
        if (this.props.userSummaryData && this.props.isSummaryLoaded)
            return (
                <div className="header-end-lv2">
                    <Link to={"/upload-document"} className="d-flex">
                        <img className="header-image-button" alt="" src={upload_icon} />
                    </Link>
                    <Link to={"/create-post"} className="d-flex">
                        <img className="header-image-button" src={write_icon} alt="" />
                    </Link>
                    <ShowOnPermission permissions={[Access.Admin]}   >
                        <Link className="d-flex" to={"/create-exercise"}>
                            <img className="header-image-button" src={add_exercise_btn} alt="" />
                        </Link>
                    </ShowOnPermission>
                    <div id="h-um-wrapper" className="user-menu">
                        <div className="d-flex">
                            <Link to={`/user/profile/${this.props.userSummaryData.id}`}>
                                <img className="avatar" style={{ marginTop: "auto", marginBottom: "auto" }} src={this.props.userSummaryData.avatarURL} alt="" />
                            </Link>
                        </div>

                        <ClickAwayListener onClickAway={() => { this.closeMenu() }}>
                            <div className='d-flex pos-relative' >
                                <div>
                                    <div className="d-flex">
                                        <img className="user-menu-btn" id={"h-um-btn"} //h-um: header user menu
                                            onClick={(e) => this.handlePopupMenuClick(e, "h-um-btn", "h-um-dropdown")} alt=""
                                            src={dropdown_btn}
                                        />
                                    </div>
                                    <div>
                                        {this.state.isDropdownOpen ?
                                            <div className="user-menu-dropdown" id={"h-um-dropdown"}>
                                                <div className="display-name">{this.props.userSummaryData.displayName}</div>
                                                <div className="d-flex mg-bottom-5px" style={{ borderBottom: "1px solid var(--gray)", paddingBottom: "5px" }}>
                                                    <div className="reputation-sub-container">
                                                        <img alt="" src={gray_write_icon} className="user-menu-icon" />
                                                        <div className="reputation-label">  {formatNumber(this.props.userSummaryData.postCount)}</div>
                                                    </div>
                                                    <div className="reputation-sub-container">
                                                        <img alt="" src={gray_upload_icon} className="user-menu-icon" />
                                                        <div className="reputation-label">   {formatNumber(this.props.userSummaryData.docCount)}</div>
                                                    </div>
                                                    <div className="reputation-label"> Score: {formatNumber(this.props.userSummaryData.reputationScore)}</div>
                                                </div>

                                                {items}
                                            </div>
                                            : <div id={"h-um-dropdown"}></div>}
                                    </div>
                                </div>
                            </div>
                        </ClickAwayListener >
                    </div>
                </div>
            );
        return <></>;
    }

}

const mapStateToProps = (state) => {
    return {
        userSummaryData: state.auth.currentUserSummary.data,
        isSummaryLoaded: state.auth.currentUserSummary.isLoadDone
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UserMenu)
);
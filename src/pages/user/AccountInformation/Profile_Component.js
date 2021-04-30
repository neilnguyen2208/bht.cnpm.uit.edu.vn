/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar'

import gray_upload_icon from 'assets/icons/48x48/gray_upload_icon_48x48.png'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'

import './AccountInformation.scss'
import 'components/styles/Form.scss'
import 'components/styles/HomeItem.scss'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import UserSidebar from 'layouts/UserSidebar';
import tick_icon from 'assets/icons/svg/nb_tick_icon.svg'
import { ClickAwayListener } from '@material-ui/core'
import "components/user/UserMenu.scss";
import { formatNumber } from 'utils/miscUtils'

export const followMenu = [
    { id: 1, name: "Theo dõi", value: "FOLLOW" }
]

export const unfollowMenu = [
    { id: 1, name: "Huỷ theo dõi", value: "UNFOLLOW" }
]



//import for role config
class AccountInformation extends Component {
    constructor(props) {
        super(props);
        this.isFollowed = true;
        this.state = {
            isDropdownOpen: false,
        }
    }

    componentDidMount() {
        // document.querySelector(".user-profile.view").classList.add("d-block");
        // document.querySelector(".user-profile.edit").classList.add("d-none");

    }



    onPopupMenuItemClick = () => { }

    handlePopupMenuClick = (e, user_menu_id, dropdown_id) => {
        e.preventDefault();
        let user_menu = document.getElementById(user_menu_id);
        let dropdown = document.getElementById(dropdown_id);
        user_menu.style.background = "var(--grayish)";

        if (!this.state.isDropdownOpen) {
            document.getElementById("ai-follow-wrapper").style.background = "var(--grayish)";
        }
        else {
            this.closeMenu();
        }

        this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
    }

    closeMenu = () => {
        let parent_id = "ai-follow-btn";
        let parent_menu_item = document.getElementById(parent_id);
        parent_menu_item.style.background = "white";
        this.setState({ isDropdownOpen: false })

    }

    onUnfollowClick = () => {

    }

    render() {
        return (

            <div className="user-profile view">
                <div className="base-info-container">
                    <div className="profile-cover" />

                    <div className="base-info-sub-container" >
                        <div className="avatar-container view">
                            <img className="avatar" src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" alt="cover" />
                            {this.isFollowed ?
                                <div className="avatar-overlay" >Followed</div>
                                :
                                <></>}
                        </div>
                        <div className="info-sub-container">
                            <div className="info-sub-container-left" >
                                <div >
                                    <div className="j-c-space-between">
                                        <div className="display-name">Nguyễn Văn Đông</div>
                                    </div>
                                    <div className="email">dongnv.since1999@gmail.com</div>
                                </div>
                                <div className="d-flex-vertical j-c-space-between">
                                    {/* <div className="j-c-end"> */}
                                    <div className='d-flex pos-relative' >
                                        {this.isFollowed ?

                                            <div className="follow-btn">
                                                <div className="follow-btn-right">
                                                    Bỏ theo dõi
                                                            </div>
                                                <div className="follow-btn-left">
                                                    <img className="followed-icon" src={tick_icon} alt="v" />
                                                    <div className="follow-btn-left-text">  Đang theo dõi</div>
                                                </div>

                                            </div>
                                            :
                                            <button className="blue-button" >Theo dõi</button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="j-c-end">
                                <div className="achievement-bar" >
                                    <div style={{ borderBottom: "var(--gray) 1px solid" }}>
                                        <div className="d-flex">
                                            <div className="score">Score: {formatNumber(260)}</div>
                                            <div className="score">Followers: {formatNumber(2000)}</div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="score"> Bài viết: {formatNumber(2)} </div>
                                            <div className="score"> Tài liệu: {formatNumber(6)}</div>
                                        </div>
                                    </div>
                                    <div className="score" >

                                    </div>
                                </div>
                            </div>
                        </div >



                    </div>
                </div>

                <div className="about-me">
                    About me
                                    </div>
                <div className="about-me-detail">
                    Hi all!
                    I am a UIT - VNUHCM, Vietnam University student. Skepticism, nihilism, purism and communism are of special concern to me. Functional programming, quantum computing, generative model (GAN) are the fields in which I work. I really enjoyed Haskell, JavaScript, and Python.
                            </div>

                <div>
                    <div className="h-menu-bar">
                        <NavLink className={window.location.pathname !== "/user" ? "d-none" : "h-menu-item"} to={"/user"} exact activeClassName={window.location.pathname === "/user" ? 'h-menu-item active' : 'd-none'}>
                            Bài viết
                                     </NavLink>
                        <NavLink className={window.location.pathname === "/user" ? "d-none" : "h-menu-item"} to={"/user/post"} exact activeClassName='h-menu-item active'>
                            Bài viết
                                     </NavLink>
                        <NavLink className="h-menu-item" to={"/user/document"} exact activeClassName='h-menu-item active'>
                            Tài liệu
                                     </NavLink>
                        <NavLink className="h-menu-item" to={"/user/exercise"} exact activeClassName='h-menu-item active'>
                            Bài tập
                                    </NavLink>
                        <NavLink className="h-menu-item" to={"/user/achivement"} exact activeClassName='h-menu-item active'>
                            Thành tích
                                    </NavLink>
                    </div>



                    <div className="mg-top-10px" />
                </div >

            </div>

        );

    }



    //#region support initate value for rendering and handler image drop
    generatePassword = () => {

    }

    onDrop = (pictureFile) => {
        this.setState({
            pictures: this.state.pictures.concat(pictureFile),
        });
        this.updateInformation_DTO.avatarFile = pictureFile;
        this.isHaveAnyImageInFileLoader = true;
        if (this.updateInformation_DTO.avatarFile[0] === undefined || this.updateInformation_DTO.avatarFile[0] === null)
            this.isHaveAnyImageInFileLoader = false;
        this.setState({});
    }
}

const mapStateToProps = (state) => {
    return {
        roleList: state.user.allRoles,
        accountInformation: state.user.account,
        newPosts: state.home.newPosts.data,
        isNewPostsLoading: state.home.newPosts.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountInformation));
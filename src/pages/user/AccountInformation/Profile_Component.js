/* eslint-disable react/jsx-pascal-case */

import React from 'react'

import './AccountInformation.scss'
import 'components/styles/Form.scss'
import 'components/styles/HomeItem.scss'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { getUserDetailById } from 'redux/services/authServices'
import "components/user/UserMenu.scss";
import { formatNumber } from 'utils/miscUtils'

export const followMenu = [
    { id: 1, name: "Theo dõi", value: "FOLLOW" }
]

export const unfollowMenu = [
    { id: 1, name: "Huỷ theo dõi", value: "UNFOLLOW" }
]

//import for role config
class AccountInformation extends React.Component {
    constructor(props) {
        super(props);
        this.isFollowed = true;
        this.state = {
            isDropdownOpen: false,
        }
    }

    componentDidMount() {
        this.props.getUserDetailById(this.props.match.params.id);
    }

    handlePopupMenuClick = (e, user_menu_id, dropdown_id) => {
        e.preventDefault();
        let user_menu = document.getElementById(user_menu_id);
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

    render() {
        if (!this.props.userDetailLoading && this.props.userDetail)
            return (
                <div className="user-profile view">
                    <div className="base-info-container">
                        <div className="profile-cover" />
                        <div className="base-info-sub-container" >
                            <div className="avatar-container view">
                                <img className="avatar" style={{ background: "white" }} src={this.props.userDetail.avatarURL} alt="cover" />
                            </div>
                            <div className="info-sub-container">
                                <div className="info-sub-container-left" >
                                    <div >
                                        <div className="j-c-space-between">
                                            <div className="display-name">{this.props.userDetail.displayName}</div>
                                        </div>
                                        <div className="email">{this.props.userDetail.email}</div>
                                    </div>
                                    <div className="d-flex-vertical j-c-space-between">
                                    </div>
                                </div>
                                <div className="j-c-end">
                                    <div className="achievement-bar" >
                                        <div style={{ borderBottom: "var(--gray) 1px solid" }}>
                                            <div className="d-flex">
                                                <div className="score">Score:  {this.props.userDetail.reputationScore ? formatNumber(this.props.userDetail.reputationScore) : 0}</div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="score"> Bài viết:  {this.props.userDetail.postCount ? formatNumber(this.props.userDetail.postCount) : 0} </div>
                                                <div className="score"> Tài liệu: {this.props.userDetail.docCount ? formatNumber(this.props.userDetail.docCount) : 0}</div>
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
                    <div className="about-me-detail ">
                        <div className="ck-editor-output" dangerouslySetInnerHTML={{
                            __html:
                                this.props.userDetail.aboutMe
                        }} />
                    </div>
                    <div>
                        <div className="h-menu-bar">
                            <NavLink className={window.location.pathname.substring(0, 13) !== `/user/profile` ? "d-none" : "h-menu-item"} to={`/user/profile/${this.props.match.params.id}`} exact activeClassName={window.location.pathname.substring(0, 13) === "/user/profile" ? 'h-menu-item active' : 'd-none'}>
                                Bài viết
                            </NavLink>
                            <NavLink className={window.location.pathname.substring(0, 13) === "/user/profile" ? "d-none" : "h-menu-item"} to={`/user/posts/${this.props.match.params.id}`} exact activeClassName='h-menu-item active'>
                                Bài viết
                            </NavLink>
                            <NavLink className="h-menu-item" to={`/user/documents/${this.props.match.params.id}`} exact activeClassName='h-menu-item active'>
                                Tài liệu
                            </NavLink>
                            {/* <NavLink className="h-menu-item" to={"/user/achivement"} exact activeClassName='h-menu-item active'>
                            Thành tích
                                    </NavLink> */}
                        </div>
                        <div className="mg-top-10px" />
                    </div >

                </div>

            );
        return <></>;
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
        userDetail: state.auth.userDetail.data,
        userDetailLoading: state.auth.userDetail.isLoading,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getUserDetailById
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountInformation));
/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar'
import Modal from 'components/common/Modal/AlertModal'
import gray_upload_icon from 'assets/icons/24x24/nb_gray_upload_icon_24x24.png'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'

import './AccountInformation.scss'
import 'components/styles/Form.scss'
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'

import UpdatePassword from './UpdatePassword'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { management_getAllRoles } from 'redux/services/userServices'
import UserSidebar from 'layouts/UserSidebar'
//import for role config
class AccountInformation extends Component {
    constructor(props) {
        super(props);
        //initiate data from props:
        //if value been set by a string, db didn't match it.

        //from user API
        this.displayName = "Nguyễn Văn Đông";
        this.userID = "";
        this.password = "";
        this.avatarURL = "";
        this.email = "";
        this.score = "";
        this.postCount = 0;
        this.documentCount = 0;
        this.roleID = 2;
        this.roleName = "";

        this.passwordString = "";
        this.canClickSaveInformation = false;

        this.isAnyChangeRoleDropdownComboboxOpen = false;

        this.isHaveAnyImageInFileLoader = false;


        this.updateInformation_DTO = {
            username: "",
            oldPasword: "",
            displayname: "",
        }

        this.state = {
            pictures: []
        }

        this.roleList = [];
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="THÔNG TIN TÀI KHOẢN" />
                    <div className="content-container">
                        <div className="Show_Layout_Bounding_Layout">
                            <div className="Account_Information_Bounding_Layout">
                                <div className="Account_Information_Layout">
                                    <div className="Account_Information_Avatar_Layout">
                                        <img className="Account_Information_Avatar_Image" alt="avatar" src={this.avatarURL} />
                                    </div>

                                    <div className="blue-button mg-auto " style={{ marginBottom: "20px", marginTop: "10px" }} onClick={() => this.handlerClickUpdateAvatar()}>Cập nhật avatar</div>

                                    <div className="mg-top-10px" />

A
                                    {/* <A */}

                                    <div className="mg-top-5px" />

                                    <div className="Account_Information_achivement-layout">
                                        <div className="Account_Information_score">Scrore: {this.score}</div>
                                        <div className="Account_Information_Achivement_Post_Doc_Count_Layout">
                                            <div className="d-flex w-50-percents">
                                                <img alt="post count" src={gray_write_icon} className="user-item-icon" ></img>
                                                <div className="mg-left-5px">{this.postCount}</div>
                                            </div>
                                            <div className="d-flex w-50-percents">
                                                <img alt="upload count" src={gray_upload_icon} className="user-item-icon"></img>
                                                <div className="mg-left-5px"> {this.documentCount}</div>
                                            </div>
                                        </div>
                                    </div >
                                </div>
                            </div>
                            <div className="Account_Information_Bounding_Layout">

                                <div className="Account_Information_Layout">
                                    {(window.location.pathname === "/admin"
                                        || window.location.pathname === "/admin/"
                                        || window.location.pathname === "/user"
                                        || window.location.pathname === "/user/"
                                    ) ?
                                        <div>
                                            {/* Display name */}
                                            <div className="pos-relative">
                                                < div className="gray-label Is_Form_Label">
                                                    Họ tên:
                                                </div>
                                                <input type="text" className="text-input"
                                                    defaultValue={this.displayName} id="management-display-name-text-input"
                                                    onChange={(e) => this.handlerChangeUserDisplay(e)} />
                                                <div className="error-label" hidden={!this.isDisplayNameEmpty} >
                                                    *Tên không được để trống.
                                                </div>
                                                <div className="error-label" hidden={!this.isDisplayNameContainSpecialCharacters} >
                                                    *Tên không được chứa các ký tự đặc biệt.
                                                </div>
                                            </div>

                                            {/* Username */}
                                            <div className="gray-label Is_Form_Label">
                                                Username:
                                            </div>
                                            <input disabled type="text" className="text-input" defaultValue={this.username} />

                                            {/* Password */}
                                            <div className="gray-label Is_Form_Label">
                                                Password:
                                            </div>
                                            <input disabled type="text" className="text-input" value={this.generatePassword()} />

                                            {/* Email */}
                                            <div className="gray-label Is_Form_Label">
                                                Email:
                                            </div>
                                            <input disabled type="text" className="text-input" defaultValue={this.email} />

                                            <div className="d-flex mg-top-10px" >
                                                <button disabled={!this.canClickSaveInformation} className="blue-button mg-auto" onClick={() => this.handlerClickSaveInformation()} >
                                                    Lưu thay đổi
                                            </button>
                                            </div>
                                        </div>
                                        :
                                        < UpdatePassword oldPass={this.password} username={this.username} />
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div src={this.state.pictures[0]}></div>
                </div >
            </div >
        );

    }

    //#region support initate value for rendering and handler image drop
    generatePassword = () => {
        // let _passwordString = "";
        // (String(this.props.accountInformation.password));
        // if (this.props.accountInformation.password !== undefined) {
        //     for (let i = 0; i < this.props.accountInformation.password.length; i++) {
        //         _passwordString += "*";
        //     }
        // }
        // return _passwordString;
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
    //#endregion

    //#region handler combobox role and change role

    handleDropDownMenuClick = (e, parent_id, show_text_id, dropdown_element_id, container_id) => {
        e.preventDefault();

        let parent_menu_item = document.getElementById(parent_id);
        let dropdown_element = document.getElementById(dropdown_element_id);
        let show_text = document.getElementById(show_text_id);
        let dropdown_container = document.getElementById(container_id);

        if (dropdown_container.style.display === "block") {
            dropdown_container.style.display = "none";
            parent_menu_item.style.background = "white";
            parent_menu_item.style.paddingLeft = "0px";
            show_text.style.color = "var(--black)";
            dropdown_element.src = dropdown_btn;
        }
        else {
            parent_menu_item.style.background = "#5279DB"
            dropdown_container.style.display = "block";
            parent_menu_item.style.paddingLeft = "10px";
            show_text.style.color = "white";
            
        }

        this.isChangeRoleDropdownComboboxOpen = true;
        this.setState({});
    }

    handleDropDownMenuItemClick = (roleID) => {
        //change current UI
        let item_id = "user-role-dropdown-combobox-sub-item-" + roleID;
        let sub_dropdown_item = document.getElementById(item_id);

        for (let i = 0; i < this.roleList.length; i++) {
            let sub_dropdown_item_index_id = "user-role-dropdown-combobox-sub-item-" + i;
            // (sub_dropdown_item_index_id);
            let sub_dropdown_item_index = document.getElementById(sub_dropdown_item_index_id);
            sub_dropdown_item_index.className = "combox-option";
        }

        sub_dropdown_item.className = "activated-combox-option";
        this.props.accountInformation.roleID = roleID;

        // open a confirmation popup
        this.openChangeRoleConfirmationPopup(roleID);
    }

    closeAllChangeRoleDropdownCombobox = () => {

        if (this.isChangeRoleDropdownComboboxOpen === true) {
            let parent_id = "user-role-parent-dropdown-combobox";
            let show_text_id = "user-role-parent-dropdown-combobox-text";
            let dropdown_element_id = "user-role-dropdown-btn-element";
            let container_id = "user-role-dropdown-combobox-container";

            let parent_menu_item = document.getElementById(parent_id);
            let dropdown_element = document.getElementById(dropdown_element_id);
            let show_text = document.getElementById(show_text_id);
            let dropdown_container = document.getElementById(container_id);

            if (dropdown_container.style.display === "block") {
                dropdown_container.style.display = "none";
                parent_menu_item.style.background = "white";
                parent_menu_item.style.paddingLeft = "0px";
                show_text.style.color = "var(--black)";
                dropdown_element.src = dropdown_btn;
            }
            this.isChangeRoleDropdownComboboxOpen = false;
            this.setState({})
        }

    }

    //#endregion

    //#region validator for display name input
    handlerChangeStateOfSubmitButton = () => {
        this.canClickSaveInformation = true;
        this.isDisplayNameEmpty = false;
        this.isDisplayNameContainSpecialCharacters = false;

        if ((this.updateInformation_DTO.displayname === ""
            || this.updateInformation_DTO.displayname === null)) {
            this.canClickSaveInformation = false;
            this.isDisplayNameEmpty = true;
            this.setState({});
            return;
        }



        this.setState({});
    }

    handlerChangeUserDisplay = (e) => {
        this.updateInformation_DTO.displayname = e.target.value;
        this.handlerChangeStateOfSubmitButton();
    }

    //#endregion

    //#region main handler event and call APIs


    //#endregion
}

//#region for Redux
const mapStateToProps = (state) => {
    // (state);
    //;
    return {
        roleList: state.user.allRoles,
        accountInformation: state.user.account
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountInformation));
 //#endregion
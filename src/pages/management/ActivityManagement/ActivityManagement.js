/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import AdminLayout from 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import Modal from 'components/common/Modal/AlertModal'
import gray_upload_icon from 'assets/images/gray_upload_icon.png'
import gray_write_icon from 'assets/images/gray_write_icon.png'
import './ActivityManagement.scss'
import 'components/styles/Form.scss'
import { ClickAwayListener } from '@material-ui/core'
import dropdown_btn from 'assets/images/dropdown_icon.png'
import white_dropdown_btn from 'assets/images/white_dropdown_icon.png'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { isContainSpecialCharacter } from 'utils/stringUtils'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from 'redux/services/userServices'
import { management_getAllRoles } from 'redux/services/userServices'
import AdminSidebar from 'layouts/AdminSidebar'
//import for role config
import { getRoleNameFilterByName } from 'utils/permissionUtils'

class ActivityManagement extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {


        return (
            <div className="management-layout">
                <AdminSidebar />
                <div className="content-container">
                    <Titlebar title="QUẢN LÝ HOẠT ĐỘNG" />
                    <div className="content-container">
                        <div className="Show_Layout_Bounding_Layout">
                            <div className="Account_Information_Bounding_Layout">
                                <div className="Account_Information_Layout">


                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div >

        );
    }

    //#region handle for popup

    //for general alert popup
    openSuccessAlertPopup = () => {
        this.isAnySuccessAlertPopupOpen = true;
        this.setState();
    }

    openFailedSuccessAlertPopup = () => {
        this.isAnyFailedAlertPopupOpen = true;
        this.setState({});
    }

    //for change role
    closeChangeRoleConfirmationPopup = (roleID) => {
        this.isChangeRoleConfirmationPopupOpen = false;
        this.setState({});
    }

    closeUpdateInformationConfirmationPopup = () => {
        this.isUpdateInformationPopupOpen = false;
        this.setState({});
    }

    //for update avatar
    closeUpdateAvatarPopup = () => {
        this.isUpdateAvatarPopupOpen = false;
        this.setState({});
    }


    //for update information
    //#endregion


    //#region support initate value for rendering and handler image drop
    generatePassword = () => {
        let _passwordString = "";
        (String(this.props.accountInformation.password));
        if (this.props.accountInformation.password !== undefined) {
            for (let i = 0; i < this.props.accountInformation.password.length; i++) {
                _passwordString += "*";
            }
        }
        return _passwordString;
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
            dropdown_element.src = white_dropdown_btn;
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

    openChangeRoleConfirmationPopup = (roleID) => {
        this.closeAllChangeRoleDropdownCombobox();
        this.notifyHeader = "Xác nhận?";
        this.notifyContent = "Xác nhận thay đổi quyền người dùng?";
        this.setState({ isChangeRoleConfirmationPopupOpen: true });
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

        if (isContainSpecialCharacter(this.updateInformation_DTO.displayname)) {
            this.canClickSaveInformation = false;
            this.isDisplayNameContainSpecialCharacters = true;
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

    handlerClickSaveInformation = () => {
        this.notifyContent = "Xác nhận cập nhật thông tin?";
        this.notifyHeader = "Cập nhật thông tin";
        this.isUpdateInformationPopupOpen = true;
        this.setState({});
    }

    handlerVerifyUpdateInformation = () => {

        // console.log(this.updateInformation_DTO);

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", this.updateInformation_DTO.username);
        urlencoded.append("oldPasword", this.updateInformation_DTO.oldPasword);
        urlencoded.append("displayname", this.updateInformation_DTO.displayname);

        //call API


    }

    handlerCancelVerifyUpdateInformation = () => {
        document.getElementById("management-display-name-text-input").value = this.displayName;
        this.isUpdateInformationPopupOpen = false;
        this.canClickSaveInformation = false;
        this.setState({});
    }

    handlerVerifyChangeRoleConfirmation = (roleID) => {
        // send request to server   
        //...

        this.closeChangeRoleConfirmationPopup();
    }

    handlerCancelChangeRoleConfirmation = () => { //phai co popup thi moi test duoc
        this.roleID = this.recover_roleID;
        this.closeChangeRoleConfirmationPopup();
    }

    handlerClickUpdateAvatar = () => {
        this.isUpdateAvatarPopupOpen = true;
        this.notifyContent = "Chọn ảnh:";
        this.notifyHeader = "Cập nhật avatar";
        this.setState({});
    }

    handlerVerifyUpdateAvatarConfirmation = () => {

        //call API to update avatar.
        this.isUpdateAvatarPopupOpen = false;
        this.notifyContent = "Cập nhật ảnh đại diện thành công!";
        this.notifyHeader = "Thành công";
        this.isAnySuccessAlertPopupOpen = true;
        this.setState({});
    }

    //#endregion
}

//#region for Redux
const mapStateToProps = (state) => {
    // (state);
    //;
    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCurrentUser, management_getAllRoles
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivityManagement));
 //#endregion
import React, { Component } from 'react'
import './UserItem.scss'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'
import gray_upload_icon from 'assets/icons/24x24/nb_gray_upload_icon_24x24.png'
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'


//combobox
import 'components/common/Combobox/Combobox.scss'
import 'components/styles/Button.scss'
import 'components/styles/Label.scss'

//modal popup
import Modal from 'components/common/Modal/AlertModal'

import { ClickAwayListener } from '@material-ui/core';
import { getRoleNameByName, getRoleNamebyID } from 'utils/permissionUtils'

class UserItem extends Component {

    constructor(props) {
        super(props);


        this.roleID = "";
        this.role_post = "";
        this.roleName = "";
        this.userID = "";
        this.name = "";
        this.username = "";
        this.nickName = "";
        this.avatarUrl = "";
        this.email = "";
        this.postCount = "";
        this.docCount = "";
        this.score = "";
        this.roleList = [];

        //for cancel change roleID
        this.recover_roleID = { ...this.props.roleID };

        this.isAnyChangeRoleDropdownComboboxOpen = false;

        this.notifyContent = "";

        this.state = {

            isChangeRoleConfirmationPopupOpen: false,

        }

        this.isAnyFailedAlertPopupOpen = false;
        this.isAnySuccessAlertPopupOpen = false;
        this.isTheFirstTimeLoaded = true;

    }

    componentDidMount() {

    }

    render() {

        if (this.props.roleList !== null && this.props.roleList !== undefined
            && this.props.name) {

            if (this.isTheFirstTimeLoaded) {
                this.roleID = this.props.roleID;
                this.roleName = this.props.roleName;
                this.userID = this.props.userID;
                this.name = this.props.name;
                this.username = this.props.username;
                this.avatarUrl = this.props.avatarUrl;
                this.email = this.props.email;
                this.postCount = this.props.postCount;
                this.docCount = this.props.docCount;
                this.score = this.props.score;
                this.roleList = this.props.roleList;
                this.isTheFirstTimeLoaded = false;
            }

            let roles_Combobox = this.roleList.map(role =>
                this.roleID === role.UserGroupID ?
                    <div className="activated-combox-option"
                        id={"user-role-dropdown-combobox-sub-item-" + this.userID + "-" + role.UserGroupID}
                        value={getRoleNameByName(role.UserGroupName)}
                        key={role.UserGroupID}>
                        {getRoleNameByName(role.UserGroupName)}
                    </div>
                    :
                    <div className="combox-option"
                        id={"user-role-dropdown-combobox-sub-item-" + this.userID + "-" + role.UserGroupID}
                        value={role.UserGroupName}
                        key={role.UserGroupID}
                        onClick={() => this.handleDropDownMenuItemClick(role.UserGroupID)}>
                        {getRoleNameByName(role.UserGroupName)}
                    </div>

            )

            return (
                <div className="User_Item"  >

                    <img alt="avatar" src={"https://cfaevjuhwlpmr2dgadvijg-on.drv.tw/BHTWeb/Avatar/" +  this.username + '.png'} className="side-bar-avatar"></img>

                    <div style={{
                        paddingLeft: "10px", width: "100%"
                    }}>
                        < div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="User_Item_Name">{this.name}</div>
                            {/* <div className="User_Item_Edit_Btn" onClick={() => { window.location.href = "/management/users_management/" + this.userID }}>
                                <img alt="edit" className="User_Item_Edit_Btn_Element mg-right-5px" src={icon_write} />
                                <div className="gray-label" style={{ paddingTop: "2px" }}>Chỉnh sửa</div>
                            </div> */}
                        </div>
                        <div>
                            <div className="User_Item_Email">{this.email}</div>

                            {/* statusbar: score, docs count, posts count, role */}
                            <div className="User_Item_Statusbar" >

                                <div style={{ "display": "flex" }}>
                                    <div className="User_Item_Score">Scrore: {this.score}</div>
                                    <img alt="avatar" src={gray_write_icon} className="user-item-element" ></img>
                                    <div className="User_Item_Post_Count">{this.postCount}</div>
                                    <img alt="avatar" src={gray_upload_icon} className="user-item-element"></img>
                                    <div className="User_Item_Doc_Count"> {this.docCount}</div>
                                </div>

                                <ClickAwayListener onClickAway={() => { this.closeAllChangeRoleDropdownCombobox() }}>

                                    <div style={{ position: "relative", display: "flex", width: "100%", zIndex: 10000 - this.userID }}>
                                        <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                            <div style={{ position: "absolute", width: "140px" }}>
                                                <div className="combox" id={"user-role-parent-dropdown-combobox-" + this.userID}
                                                    onClick={(e) => this.handleDropDownMenuClick(e, "user-role-parent-dropdown-combobox-" + this.userID, "user-role-parent-dropdown-combobox-text-" + this.userID, "user-role-dropdown-btn-element-" + this.userID, "user-role-dropdown-combobox-container-" + this.userID)}>
                                                    <div className="d-flex">
                                                        <div className="side-bar-menu-item-text" id={"user-role-parent-dropdown-combobox-text-" + this.userID}>

                                                            {this.roleList ?
                                                                getRoleNamebyID(this.roleID)
                                                                : ""
                                                            }
                                                        </div>
                                                    </div>
                                                    <img alt="v" className="Dropdown_Btn_Element" src={dropdown_btn} id={"user-role-dropdown-btn-element-" + this.userID} />
                                                </div>

                                                {this.isAnyChangeRoleDropdownComboboxOpen ? (
                                                    <div className="combox-container" id={"user-role-dropdown-combobox-container-" + this.userID}>
                                                        {roles_Combobox}
                                                        <div className="mg-bottom-5px" />
                                                        <div className="mg-bottom-5px" />
                                                    </div>
                                                ) : <div id={"user-role-dropdown-combobox-container-" + this.userID}></div>}

                                            </div>
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            </div>
                        </div>
                    </div >

                    {/* modal for veritfy change role */}
                    <Modal
                        open={this.state.isChangeRoleConfirmationPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="confirmation"
                        closeModal={() => this.closeChangeRoleConfirmationPopup()}
                    >

                        {/* code footer to handler event in parent class (if you want to show a confirmation modal) */}
                        <button className="blue-button mg-right-5px" onClick={() => this.handlerVerifyChangeRoleConfirmation()}>OK</button>
                        <button className="white-button" onClick={() => this.closeChangeRoleConfirmationPopup()}>Cancel</button>
                    </Modal>


                    {/* modal success alert */}
                    <Modal
                        open={this.isAnySuccessAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_success"
                        closeModal={() => { this.isAnySuccessAlertPopupOpen = false; this.setState({}) }}
                    />

                    {/* modal failed alert */}
                    <Modal
                        open={this.isAnyFailedAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_failure"
                        closeModal={() => { this.isAnyFailedAlertPopupOpen = false; this.setState({}) }}
                    />


                </div >
            );
        }
        return <></>
    }

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

        this.isAnyChangeRoleDropdownComboboxOpen = true;
        this.setState({});
    }

    handleDropDownMenuItemClick = (roleID) => {
        //change current UI
        let item_id = "user-role-dropdown-combobox-sub-item-" + this.userID + "-" + roleID;
        let sub_dropdown_item = document.getElementById(item_id);

        for (let i = 1; i <= this.roleList.length; i++) {
            let sub_dropdown_item_index_id = "user-role-dropdown-combobox-sub-item-" + this.userID + "-" + i;
            let sub_dropdown_item_index = document.getElementById(sub_dropdown_item_index_id);
            sub_dropdown_item_index.className = "combox-option";
        }
        sub_dropdown_item.className = "activated-combox-option";
        this.role_post = roleID;

        //open a confirmation popup
        this.openChangeRoleConfirmationPopup();
    }

    //handler change role
    openChangeRoleConfirmationPopup = () => {
        this.closeAllChangeRoleDropdownCombobox();
        this.notifyHeader = "Xác nhận?";
        this.notifyContent = "Xác nhận thay đổi quyền người dùng?";
        this.setState({ isChangeRoleConfirmationPopupOpen: true });
    }

    closeChangeRoleConfirmationPopup = (roleID) => {
        this.setState({ isChangeRoleConfirmationPopupOpen: false });
    }

    handlerVerifyChangeRoleConfirmation = () => {

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", this.username);
        urlencoded.append("ruleId", this.role_post);
     
        //call api

        this.closeChangeRoleConfirmationPopup();
    }

    handleCancelChangeRoleConfirmation = () => { //phai co popup thi moi test duoc
        this.roleID = { ...this.recover_roleID };
        this.closeChangeRoleConfirmationPopup();

        // this.setState({});
    }

    closeAllChangeRoleDropdownCombobox = () => {

        let parent_id = "user-role-parent-dropdown-combobox-" + this.userID;
        let show_text_id = "user-role-parent-dropdown-combobox-text-" + this.userID;
        let dropdown_element_id = "user-role-dropdown-btn-element-" + this.userID;
        let container_id = "user-role-dropdown-combobox-container-" + this.userID;

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
        this.isAnyChangeRoleDropdownComboboxOpen = false;
        this.setState({})
    }

}
export default UserItem;
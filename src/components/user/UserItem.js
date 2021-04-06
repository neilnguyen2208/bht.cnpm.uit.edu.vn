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


import { ClickAwayListener } from '@material-ui/core';
import { getRoleNameByName, getRoleNamebyID } from 'utils/authUtils'

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
                <div className="user-item"  >

                    <img alt="avatar" src={"https://cfaevjuhwlpmr2dgadvijg-on.drv.tw/BHTWeb/Avatar/" + this.username + '.png'} className="side-bar-avatar"></img>

                    <div style={{
                        paddingLeft: "10px", width: "100%"
                    }}>
                        < div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="user-item-name">{this.name}</div>
                            {/* <div className="user-item_Edit_Btn" onClick={() => { window.location.href = "/management/users_management/" + this.userID }}>
                                <img alt="edit" className="user-item_Edit_Btn_Element mg-right-5px" src={icon_write} />
                                <div className="gray-label" style={{ paddingTop: "2px" }}>Chỉnh sửa</div>
                            </div> */}
                        </div>
                        <div>
                            <div className="user-item_Email">{this.email}</div>

                            {/* statusbar: score, documents count, posts count, role */}
                            <div className="user-item_Statusbar" >

                                <div style={{ "display": "flex" }}>
                                    <div className="user-item_Score">Scrore: {this.score}</div>
                                    <img alt="avatar" src={gray_write_icon} className="user-item-icon" ></img>
                                    <div className="post-count">{this.postCount}</div>
                                    <img alt="avatar" src={gray_upload_icon} className="user-item-icon"></img>
                                    <div className="document-count"> {this.docCount}</div>
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
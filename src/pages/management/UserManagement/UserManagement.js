/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import Paginator from 'components/common/Paginator/ClientPaginator'
import UserItem from 'components/user/UserItem'
// import { ClickAwayListener } from '@material-ui/core'
// import { getRoleNameByName, getRoleNameFilterByName } from 'utils/PermissionManagement'
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'


//import for redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { getAllUsers, getAllRoles } from 'redux/services/userServices'
import AdminSidebar from 'layouts/AdminSidebar'
class UserManagement extends Component {
    constructor(props) {
        super();
        this.maxItemPerPage = 10;
        this.usersList = [];
        this.roleList = [];

        this.roleNameFilter = "All";
        this.roleFilterList = [
            {
                UserGroupID: 0,
                UserGroupName: "All"
            }
        ]

        this.isTheFirstTimeLoad = true;

        this.isChangeRoleConfirmationPopupOpen = false;
        this.isAnyChangeRoleFilterDropdownComboboxOpen = false;

        this.state = {
            currentInteractList: []
        }
    }

    componentDidMount() {
        // this.props.management_getAllUsers();
        // this.props.management_getAllRoles();
    }

    //client
    // onPageChangeClient = (currentInteractList) => {
    //     this.setState({ currentInteractList: currentInteractList })
    // }

    render() {

        let userItemList = <></>;
        // let searchDropdown = <></>;

        if (this.props.userList !== null && this.props.userList !== undefined
            && this.props.roleList !== null && this.props.roleList !== undefined) {
            this.usersList = this.props.userList;
            this.roleList = this.props.roleList;


            if (this.isTheFirstTimeLoad && this.roleList) {
                this.usersList = [...this.usersList];
                this.roleFilterList = this.roleFilterList.concat(...this.roleList)
                this.isTheFirstTimeLoad = false;
            }

            // searchDropdown = this.roleFilterList.map(role =>
            //     this.roleNameFilter === role.UserGroupName ?
            //         <div className="activated-combox-option"
            //             name="User_Role_Filter_Combobox_Item"
            //             id={"role-filter-dropdown-combobox-sub-item-" + role.UserGroupName}
            //             value={getRoleNameFilterByName(role.UserGroupName)}
            //             onClick={() => this.handleDropDownMenuItemClick(role.UserGroupName)}
            //             key={role.UserGroupID}>
            //             {getRoleNameFilterByName(role.UserGroupName)}

            //         </div>
            //         :
            //         <div className="combox-option"
            //             name="User_Role_Filter_Combobox_Item"
            //             id={"role-filter-dropdown-combobox-sub-item-" + role.UserGroupName}
            //             value={getRoleNameFilterByName(role.UserGroupName)}
            //             key={role.UserGroupID}
            //             onClick={() => this.handleDropDownMenuItemClick(role.UserGroupName)}>
            //             {getRoleNameFilterByName(role.UserGroupName)}
            //         </div>
            // )
            this.isTheFirstTimeLoad = false;


            userItemList = this.state.currentInteractList.map((userItem) =>
                <UserItem
                    key={userItem.userID}
                    roleName={userItem.roleName}
                    roleID={userItem.roleId}
                    userID={userItem.id}
                    name={userItem.displayName}
                    username={userItem.username}
                    // nickName={userItem.displayName}
                    avatarUrl={userItem.avatar}
                    // avatarUrl='https://i.imgur.com/SZJgL6C.jpg'
                    email={userItem.email}
                    postCount={userItem.postCount}
                    docCount={userItem.documentCount}
                    score={userItem.score}

                    roleList={this.roleList}
                >
                </UserItem>
            )
        }

        return (


            <div className="management-layout">
                <AdminSidebar />
                <div className="content-container">
                    <Titlebar title="QUẢN LÝ NGƯỜI DÙNG" />
                    <div className="content-container">

                        <div className="d-flex j-c-space-between mg-top-10px"  >
                            <div className="number-of-item">
                                Tổng số:
                                &nbsp;
                            {this.usersList.length}
                            </div>
                            < div className="pos-relative d-flex">
                                {/* <div className="gray-label" style={{ paddingTop: "5px" }}>
                                Filter:
                            </div> */}
                                {/* &nbsp; */}
                                {/* <div style={{ position: "relative", display: "flex", width: "120px" }}>
                                <ClickAwayListener onClickAway={() => { this.closeChangeRoleFilterDropdownCombobox() }}>

                                    <div style={{ position: "relative", display: "flex", width: "100%", zIndex: 1000000 }}>
                                        <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                            <div style={{ position: "absolute", width: "140px" }}>
                                                <div className="combox" id={"role-filter-parent-dropdown-combobox"}
                                                    onClick={(e) => this.handleDropDownMenuClick(e, "role-filter-parent-dropdown-combobox", "role-filter-parent-dropdown-combobox-text", "role-filter-dropdown-btn-element", "role-filter-dropdown-combobox-container")}>
                                                    <div className="d-flex">
                                                        <div className="side-bar-menu-item-text" id={"role-filter-parent-dropdown-combobox-text"}>
                                                            {this.roleList ?
                                                                getRoleNameFilterByName(this.roleNameFilter)
                                                                : ""
                                                            }
                                                        </div>
                                                    </div>
                                                    <img alt="v" className="Dropdown_Btn_Element" src={dropdown_btn} id={"role-filter-dropdown-btn-element"} />
                                                </div>

                                                {this.isAnyChangeRoleFilterDropdownComboboxOpen ? (
                                                    <div className="combox-container" id={"role-filter-dropdown-combobox-container"}>
                                                        {searchDropdown}
                                                        <div className="mg-bottom-5px" />
                                                        <div className="mg-bottom-5px" />
                                                    </div>
                                                ) : <div id={"role-filter-dropdown-combobox-container"}></div>}

                                            </div>
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            </div> */}
                            </div>
                        </div>

                        {/* <div className="mg-bottom-20px" /> */}

                        {userItemList}

                        {/* <Paginator config={{
                        changePage: (currentInteractList) => this.onPageChangeClient(currentInteractList),
                        rawData: this.usersList,
                        maxItemPerPage: this.maxItemPerPage,
                        numShownPage: 5,
                        bottom: "31px"
                    }}
                    /> */}
                    </div>
                </div >
            </div>
        );
    }

    handleDropDownMenuItemClick = (roleName) => {
        let sub_dropdown_item_index = document.getElementsByName("User_Role_Filter_Combobox_Item");
        sub_dropdown_item_index.forEach.className = "combox-option";
        this.roleNameFilter = roleName;
        // if (roleName === "All") {
        //     this.currentInteractList = this.usersList;
        //     this.closeChangeRoleFilterDropdownCombobox();
        //     return;
        // }
        // this.currentInteractList.splice(0, this.currentInteractList.length);
        // for (let i = 0; i < this.usersList.length; i++) {
        //     if (this.usersList[i].roleName === roleName)
        //         
        //         this.currentInteractList.push(this.usersList[i])
        // }
        this.closeChangeRoleFilterDropdownCombobox();
    }

    closeChangeRoleFilterDropdownCombobox = () => {
        this.isAnyChangeRoleFilterDropdownComboboxOpen = false; this.setState({});
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
        if (dropdown_container.style.display !== "block") {
            parent_menu_item.style.background = "#5279DB"
            dropdown_container.style.display = "block";
            parent_menu_item.style.paddingLeft = "10px";
            show_text.style.color = "white";
            
        }

        this.isAnyChangeRoleFilterDropdownComboboxOpen = true;
        this.setState({});
    }
}

//#region for Redux
const mapStateToProps = (state) => {

    return {
        // userList: state.user.allUsers.accounts,
        // roleList: state.user.allRoles
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    // management_getAllUsers, management_getAllRoles
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManagement));
//#endregion

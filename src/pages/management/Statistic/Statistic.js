

import React, { Component } from 'react'
import 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import dropdown_btn from 'assets/images/dropdown_icon.png'
import white_dropdown_btn from 'assets/images/white_dropdown_icon.png'

//import for redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { management_getAllUsers, management_getAllRoles } from 'redux/services/userServices'
import AdminSidebar from 'layouts/AdminSidebar'
class Statistic extends Component {
    constructor(props) {
        super();

    }

    componentDidMount() {

    }


    render() {


        return (

             <div className="management-layout">
            <AdminSidebar />
            <div className="content-container">
                <Titlebar title="THỐNG KÊ" />
                <div className="content-container">

                    <div className="d-flex j-c-space-between mg-top-10px"  >
                        <div className="number-of-item">
                            Tổng số:
                            &nbsp;
                           
                        </div>

                        <div>
                         
                        </div>
                    </div >
                </div>
            </div>
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
            dropdown_element.src = white_dropdown_btn;
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
    management_getAllUsers, management_getAllRoles
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Statistic));
//#endregion

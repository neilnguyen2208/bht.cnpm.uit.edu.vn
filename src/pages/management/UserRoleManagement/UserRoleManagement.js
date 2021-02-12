/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import dropdown_btn from 'assets/images/dropdown_icon.png'
import './UserRoleManagement.scss'

import Modal from 'components/common/Modal/AlertModal'
import { ClickAwayListener } from '@material-ui/core';

//import for redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { management_getAllUsers, management_getAllRoles } from 'redux/services/userServices'

import { getRoleNameByName } from 'utils/permissionUtils'
import AdminSidebar from 'layouts/AdminSidebar'
class UserRoleManagement extends Component {
    constructor(props) {
        super();

        //Notify
        this.notifyHeader = "";
        this.notifyContent = "";
        this.isNotifySuccessOpen = false;
        this.isNotifyFailOpen = false;

        //for Edit and Delete, only choose 1 item in all table
        this.selected_category_id = "";
        this.selected_category_name = "";

        this.state = {
            canClickEditPostCategory: false,
            canClickDeletePostCategory: false,
            canClickEditDocCategory: false,
            canClickDeleteDocCategory: false,

        }
    }

    componentDidMount() {
        // this.props.management_getAllRoles();
    }


    render() {

        return (
            <div className="management-layout">
                <AdminSidebar />
                <div className="content-container">
                    <Titlebar title="QUẢN LÝ QUYỀN NGƯỜI DÙNG" />
                    <div className="content-container">
                        {/* Danh mục bài viết */}
                        <div className="Category_Type_Dropdown" id="management-post-categories-dropdown" onClick={() => this.handlerCategoryTypeDropDownClick("management-post-categories-dropdown", "management-post-categories-container")}>
                            <div>
                                CÁC QUYỀN TRONG HỆ THỐNG
                        </div>
                            <img alt="v" className="Dropdown_Btn_Element" src={dropdown_btn} id="page-management-dropdown-btn-element" />
                        </div>

                        <div className="mg-top-10px"></div>

                        <div className="Category_Type_Dropdown_Container" id="management-post-categories-container">
                            <div className="Category_Component_List">
                                <div className="Category_Component">
                                    {/* <div className="Category_Component_Title">
                                    Danh sách quyền:
                                </div> */}
                                    <ClickAwayListener onClickAway={() => { this.closeAllPostCategoryListItemActivated() }}>

                                        <div className="custom-table-layout">
                                            <div className="custom-table-header">
                                                <div className="custom-table-20percents-column">Mã quyền</div>
                                                <div className="custom-table-80percents-column">Tên quyền - Quyền tương ứng</div>
                                            </div>
                                            {this.props.roleList ?
                                                <> {
                                                    this.props.roleList.map(item =>
                                                        <div className="Custom_Table_Item" name="Post_Custom_Table_Item" key={item.UserGroupID} id={"management-post-category-item-" + item.id} onClick={(e) => this.handlerPostCategoryItemClick(e, item.UserGroupID, item.UserGroupName)} >
                                                            <div className="Custom_Table_Item_20percents">{item.UserGroupID}</div>
                                                            <div className="Custom_Table_Item_80percents">{getRoleNameByName(item.UserGroupName)}</div>
                                                        </div>
                                                    )
                                                }</>
                                                :
                                                <></>}

                                        </div>
                                    </ClickAwayListener>
                                    {/* <div className="Category_Buttons_Layout">
                                    <button className="blue-button mg-right-5px" onClick={() => this.handlerClickAddPostCategory()}>Thêm</button>
                                    <button className="white-button mg-right-5px" disabled={!this.state.canClickEditPostCategory} onClick={() => this.handlerClickEditPostCategory()}>Sửa</button>
                                    <button className="red-button" disabled={!this.state.canClickDeletePostCategory} onClick={() => this.handlerClickDeletePostCategory()}>Xóa</button>
                                </div> */}
                                </div>
                                <div style={{ height: "30px" }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Popup for add new post category */}
                    <Modal
                        shadow={true}
                        type="custom"
                        title="Thêm quyền bài viết"
                        open={this.isAddPostCategoryPopupOpen}
                        closeModal={() => { this.isAddPostCategoryPopupOpen = false; this.setState({}); }}
                    >
                        <div className="modal-body">
                            <div className="gray-label"> Tên quyền mới: </div>
                            <input type="text" className="form-input" placeholder="Nhập tên quyền ..." />
                        </div>

                        <div className="modal-footer">
                            <div className="gray-label">Xác nhận?</div>
                            <div style={{ display: "flex" }}>
                                <button className="blue-button mg-right-5px" onClick={() => this.handlerVerifyAddNewPostCategoryConfirmation()}>OK</button>
                                <button className="white-button" onClick={() => { this.isAddPostCategoryPopupOpen = false; this.setState({}) }}>Cancel</button>
                            </div>
                        </div>
                    </Modal>

                    {/* Popup for update a new post category */}
                    <Modal
                        shadow={true}
                        type="custom"
                        title="Cập nhật quyền bài viết"
                        open={this.isEditPostCategoryPopupOpen}
                        closeModal={() => { this.isEditPostCategoryPopupOpen = false; this.setState({}); }}
                    >
                        <div className="modal-body">
                            <div className="gray-label"> Tên quyền: </div>
                            <input type="text" className="form-input" defaultValue={this.selected_category_name} />
                        </div>

                        <div className="modal-footer">
                            <div className="gray-label">Xác nhận?</div>
                            <div style={{ display: "flex" }}>
                                <button className="blue-button mg-right-5px" onClick={() => this.handlerVerifyEditPostCategoryConfirmation()}>OK</button>
                                <button className="white-button" onClick={() => { this.isEditPostCategoryPopupOpen = false; this.setState({}) }}>Cancel</button>
                            </div>
                        </div>
                    </Modal>

                    {/* Popup for verifying delete post category */}
                    <Modal
                        shadow={true}
                        type="confirmation"
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        open={this.isVerifyDeletePostCategoryPopupOpen}
                        closeModal={() => { this.isVerifyDeletePostCategoryPopupOpen = false; this.setState({}); }}
                    >
                        <button className="blue-button mg-right-5px" onClick={() => this.handlerVerifyDeletePostCategoryConfirmation()}>OK</button>
                        <button className="white-button" onClick={() => { this.isVerifyDeletePostCategoryPopupOpen = false; this.setState({}) }}>Cancel</button>
                    </Modal>

                    {/* Custom for notifing success */}
                    <Modal
                        open={this.isNotifySuccessOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_success"
                        closeModal={() => { this.isNotifySuccessOpen = false; this.setState({}) }}
                    >
                    </Modal>

                    {/* Custom for notifing fail */}
                    <Modal
                        open={this.isNotifyFailOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_failure"
                        closeModal={() => { this.isNotifyFailOpen = false; this.setState({}) }}
                    >
                    </Modal>

                </div >
            </div >

        );
    }

    handlerCategoryTypeDropDownClick = (dropdown_id, container_id) => {
        let dropdown = document.getElementById(dropdown_id);
        let container = document.getElementById(container_id);

        if (container.style.display === "none") {
            container.style.display = "block";
            dropdown.style.width = "100%";
        }
        else {
            container.style.display = "none";
            dropdown.style.width = "30%";
        }
    }

    //post category area:
    handlerPostCategoryItemClick = (e, id, name) => {
        let all_item = document.getElementsByName("Post_Custom_Table_Item");

        for (let i = 0; i < all_item.length; i++) {
            all_item[i].className = "Custom_Table_Item";
        }

        let category_item = document.getElementById("management-post-category-item-" + id);
        category_item.className = "Custom_Table_Item_Activated";

        this.selected_category_id = id;
        this.selected_category_name = name;

        this.setState({
            canClickDeletePostCategory: true,
            canClickEditPostCategory: true
        });

    }

    closeAllPostCategoryListItemActivated = () => {
        let all_item = document.getElementsByName("Post_Custom_Table_Item");
        for (let i = 0; i < all_item.length; i++) {
            all_item[i].className = "Custom_Table_Item";
        }
        this.setState({
            canClickDeletePostCategory: false,
            canClickEditPostCategory: false
        });
    }

    //Add post category area:
    handlerClickAddPostCategory = () => {
        this.isAddPostCategoryPopupOpen = true;
        this.setState({});
    }

    handlerVerifyAddNewPostCategoryConfirmation = () => {
        this.notifyHeader = "Thành công";
        this.notifyContent = "Thêm quyền bài viết thành công!";
        this.isAddPostCategoryPopupOpen = false;
        this.isNotifySuccessOpen = true;
        this.setState({});
    }

    //Edit post category item
    handlerClickEditPostCategory = () => {
        this.isEditPostCategoryPopupOpen = true;
        this.setState({});
    }

    handlerVerifyEditPostCategoryConfirmation = () => {
        this.notifyHeader = "Thành công";
        this.notifyContent = "Cập nhật quyền bài viết thành công!";
        this.isEditPostCategoryPopupOpen = false;
        this.isNotifySuccessOpen = true;
        this.setState({});
    }

    //Delete post category item
    handlerClickDeletePostCategory = () => {
        this.notifyHeader = "Xác nhận?";
        this.notifyContent = "Xác nhận xóa quyền bài viết được chọn?";
        this.isVerifyDeletePostCategoryPopupOpen = true;
        this.setState({});
    }

    handlerVerifyDeletePostCategoryConfirmation = () => {
        this.notifyHeader = "Thành công";
        this.notifyContent = "Xóa quyền bài viết thành công!";
        this.isVerifyDeletePostCategoryPopupOpen = false;
        this.isNotifySuccessOpen = true;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserRoleManagement));
//#endregion

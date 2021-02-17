/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import dropdown_btn from 'assets/images/dropdown_icon.png'
import './NotificationManagement.scss'
// import done_icon from 'assets/images/done_icon.png'
import Modal from 'components/common/Modal/AlertModal'
import { ClickAwayListener } from '@material-ui/core';
import AdminSidebar from 'layouts/AdminSidebar'
class NotificationManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationList: [
                {
                    id: "0",
                    title: "THÔNG BÁO BẢO TRÌ SERVER TỪ NGÀY TỚI NGÀY",
                    isCurrentNotification: false,
                },
                {
                    id: "1",
                    title: "THÔNG BÁO BẢO TRÌ SERVER TỪ NGÀY TỚI NGÀY",
                    isCurrentNotification: true,
                }
            ],
        }

    }

    componentDidMount() {
        // console.log(process.env.path);
        this.fetchAllNotification();

    }

    fetchAllNotification = () => {
        //feta
    }

    fetchAllRole = () => {

    }

    onPageChange = () => {

    }

    render() {
        return (
            <div className="management-layout">
                <AdminSidebar />
                <div className="content-container">
                    <Titlebar title="QUẢN LÝ DANH MỤC" />
                    <div className="content-container">
                        {/* Danh mục bài viết */}

                        <div className="Category_Type_Dropdown" id="management-post-categories-dropdown" onClick={() => this.handlerCategoryTypeDropDownClick("management-post-categories-dropdown", "management-post-categories-container")}>
                            <div>
                                DANH SÁCH DANH MỤC
                        </div>
                            <img alt="v" className="Dropdown_Btn_Element" src={dropdown_btn} id="page-management-dropdown-btn-element" />
                        </div>

                        <div className="Category_Type_Dropdown_Container" id="management-post-categories-container" style={{ marginTop: "5px" }}>
                            <div className="Category_Component_List">
                                <div className="Category_Component">

                                    <ClickAwayListener onClickAway={() => { this.closeAllNotificationListItemActivated() }}>

                                        <div className="custom-table-layout">
                                            <div className="custom-table-header">
                                                <div className="custom-table-20percents-column">Mã thông báo</div>
                                                <div className="custom-table-80percents-column">Nội dung thông báo</div>
                                            </div>

                                            {this.state.notificationList.map(item =>
                                                <div className="Custom_Table_Item" name="Post_Custom_Table_Item" key={item.id} id={"management-post-category-item-" + item.id} onClick={(e) => this.handlerNotificationItemClick(e, item.id, item.title)} >
                                                    <div className="Custom_Table_Item_20percents">{item.id}</div>
                                                    <div className="Custom_Table_Item_80percents">
                                                        {item.title}


                                                    </div>

                                                </div>
                                            )}

                                        </div>
                                    </ClickAwayListener>
                                    <div className="Category_Buttons_Layout d-flex justify-content-md-between">
                                        <div>
                                            <button className="blue-button mg-right-5px" disabled={!this.state.canClickDeleteNotification} onClick={() => this.handlerSetCurrentNotification()}>Đặt làm thông báo hiện tại</button>
                                            <button className="white-button" onClick={() => this.handlerClickDeleteNotification()}>Không thông báo</button>
                                        </div>
                                        <div>
                                            <button className="blue-button mg-right-5px" onClick={() => this.handlerClickAddNotification()}>Thêm</button>
                                            <button className="white-button mg-right-5px" disabled={!this.state.canClickEditNotification} onClick={() => this.handlerClickEditNotification()}>Sửa</button>
                                            <button className="red-button" disabled={!this.state.canClickDeleteNotification} onClick={() => this.handlerClickDeleteNotification()}>Xóa</button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ height: "30px" }}></div>
                            </div>
                        </div>

                    </div>

                    {/* Popup for add new post category */}
                    <Modal
                        shadow={true}
                        type="custom"
                        title="Thêm thông báo"
                        open={this.isAddNotificationPopupOpen}
                        closeModal={() => { this.isAddNotificationPopupOpen = false; this.setState({}); }}
                    >
                        <div className="modal-body">
                            <div className="gray-label"> Nội dung thông báo: </div>
                            <input type="text" className="form-input" placeholder="Nhập tên thông báo ..." />
                        </div>

                        <div className="modal-footer">
                            <div className="gray-label">Xác nhận?</div>
                            <div className = "d-flex">
                                <button className="blue-button mg-right-5px" onClick={() => this.handlerVerifyAddNewNotificationConfirmation()}>OK</button>
                                <button className="white-button" onClick={() => { this.isAddNotificationPopupOpen = false; this.setState({}) }}>Cancel</button>
                            </div>
                        </div>
                    </Modal>

                    {/* Popup for update a new post category */}
                    <Modal
                        shadow={true}
                        type="custom"
                        title="Cập nhật thông báo"
                        open={this.isEditNotificationPopupOpen}
                        closeModal={() => { this.isEditNotificationPopupOpen = false; this.setState({}); }}
                    >
                        <div className="modal-body">
                            <div className="gray-label"> Tên thông báo: </div>
                            <input type="text" className="form-input" defaultValue={this.selected_category_name} />
                        </div>

                        <div className="modal-footer">
                            <div className="gray-label">Xác nhận?</div>
                            <div className = "d-flex">
                                <button className="blue-button mg-right-5px" onClick={() => this.handlerVerifyEditNotificationConfirmation()}>OK</button>
                                <button className="white-button" onClick={() => { this.isEditNotificationPopupOpen = false; this.setState({}) }}>Cancel</button>
                            </div>
                        </div>
                    </Modal>

                    {/* Popup for verifying delete post category */}
                    <Modal
                        shadow={true}
                        type="confirmation"
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        open={this.isVerifyDeleteNotificationPopupOpen}
                        closeModal={() => { this.isVerifyDeleteNotificationPopupOpen = false; this.setState({}); }}
                    >
                        <button className="blue-button mg-right-5px" onClick={() => this.handlerVerifyDeleteNotificationConfirmation()}>OK</button>
                        <button className="white-button" onClick={() => { this.isVerifyDeleteNotificationPopupOpen = false; this.setState({}) }}>Cancel</button>
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
    handlerNotificationItemClick = (e, id, name) => {
        let all_item = document.getElementsByName("Post_Custom_Table_Item");

        for (let i = 0; i < all_item.length; i++) {
            all_item[i].className = "Custom_Table_Item";
        }

        let category_item = document.getElementById("management-post-category-item-" + id);
        category_item.className = "Custom_Table_Item_Activated";

        this.selected_category_id = id;
        this.selected_category_name = name;

        this.setState({
            canClickDeleteNotification: true,
            canClickEditNotification: true
        });

    }

    closeAllNotificationListItemActivated = () => {
        let all_item = document.getElementsByName("Post_Custom_Table_Item");
        for (let i = 0; i < all_item.length; i++) {
            all_item[i].className = "Custom_Table_Item";
        }
        this.setState({
            canClickDeleteNotification: false,
            canClickEditNotification: false
        });
    }

    //Add post category area:
    handlerClickAddNotification = () => {
        this.isAddNotificationPopupOpen = true;
        this.setState({});
    }

    handlerVerifyAddNewNotificationConfirmation = () => {
        this.notifyHeader = "Thành công";
        this.notifyContent = "Thêm thông báo thành công!";
        this.isAddNotificationPopupOpen = false;
        this.isNotifySuccessOpen = true;
        this.setState({});
    }

    //Edit post category item
    handlerClickEditNotification = () => {
        this.isEditNotificationPopupOpen = true;
        this.setState({});
    }

    handlerVerifyEditNotificationConfirmation = () => {
        this.notifyHeader = "Thành công";
        this.notifyContent = "Cập nhật thông báo thành công!";
        this.isEditNotificationPopupOpen = false;
        this.isNotifySuccessOpen = true;
        this.setState({});
    }

    //Delete post category item
    handlerClickDeleteNotification = () => {
        this.notifyHeader = "Xác nhận?";
        this.notifyContent = "Xác nhận xóa thông báo được chọn?";
        this.isVerifyDeleteNotificationPopupOpen = true;
        this.setState({});
    }

    handlerVerifyDeleteNotificationConfirmation = () => {
        this.notifyHeader = "Thành công";
        this.notifyContent = "Xóa thông báo thành công!";
        this.isVerifyDeleteNotificationPopupOpen = false;
        this.isNotifySuccessOpen = true;
        this.setState({});
    }

    handlerSetCurrentNotification = () => {
        this.notifyHeader = "Thành công";
        this.notifyContent = "Thay đổi thông báo hiện tại thành công!";
        this.isVerifyDeleteNotificationPopupOpen = false;
        this.isNotifySuccessOpen = true;
        this.setState({});
    }


}
export default NotificationManagement;
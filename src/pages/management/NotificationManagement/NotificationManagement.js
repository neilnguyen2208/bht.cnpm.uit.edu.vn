/* eslint-disable react/jsx-pascal-case */

import React from 'react'
import 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'
import './NotificationManagement.scss'

import { ClickAwayListener } from '@material-ui/core';
import AdminSidebar from 'layouts/AdminSidebar'
class NotificationManagement extends React.Component {
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

                </div >
            </div >
        );
    }

    handlerCategoryTypeDropDownClick = (dropdown_id, container_id) => {
    }

    //post category area:
    handlerNotificationItemClick = (e, id, name) => {

    }

    closeAllNotificationListItemActivated = () => {
    }

    //Add post category area:
    handlerClickAddNotification = () => {
    }




}
export default NotificationManagement;
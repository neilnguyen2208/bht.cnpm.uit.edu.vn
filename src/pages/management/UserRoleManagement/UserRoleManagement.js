/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import './UserRoleManagement.scss'
import Table from 'components/common/Table/Table'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { management_getAllUsers, management_getAllRoles } from 'redux/services/userServices'
import AdminSidebar from 'layouts/AdminSidebar'
import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import edit_icon from 'assets/icons/24x24/nb_gray_write_icon_24x24.png'
import plus_icon from 'assets/icons/svg/plus_icon.svg'
import { closeModal, openBigModal, openModal } from 'redux/services/modalServices'
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

export const roleActionList = [
    { id: 1, text: "Xoá", value: "DELETE_ROLE", icon: trash_icon, hasLine: true },
    { id: 2, text: "Chỉnh sửa", icon: edit_icon, value: "EDIT_ROLE" },
]

export const setAsDefaultMenuItem = { id: 3, text: "Đặt làm mặc định.", icon: edit_icon, value: "SET_AS_DEFAULT" };


class UserRoleManagement extends Component {

    componentDidMount() {
    }

    onMenuItemClick = (item) => {
        if (item.value === "EDIT_ROLE") {
            openBigModal('edit-role', {});
            return;
        }
        if (item.value === "DELETE_ROLE") {
            openModal("confirmation",
                {
                    title: "Xoá phân quyền",
                    text: "Hành động này cần  refresh để có hiệu lực.",
                    confirmText: "Xác nhận",
                    cancelText: "Huỷ",
                    onConfirm: () => {
                        this.props.deleteARole(this.props.id, {});
                        closeModal(); //close confimation popup
                        this.closeModal(); //close edit document popup
                    }
                })
            return;
        }
        if (item.value === "SET_AS_DEFAULT") {
            openModal("confirmation",
                {
                    title: "Đặt phân quyền làm mặc định",
                    text: "Hành động này cần refresh để có hiệu lực.",
                    confirmText: "Xác nhận",
                    cancelText: "Huỷ",
                    onConfirm: () => {
                        this.props.setARoleAsDefault(this.props.id, {});
                        closeModal(); //close confimation popup
                        this.closeModal(); //close edit document popup
                    }
                })
            return;
        }

    }

    render() {
        let data = [
            { id: 1, roleName: "Admin", labels: ["Static"], creationTime: "4/1/2021, 8:07:33 AM" },
            { id: 2, roleName: "User", labels: ["Static", "Default"], creationTime: "4/1/2021, 8:07:33 AM" },
            { id: 3, roleName: "Moderator", labels: ["Static"], creationTime: "4/1/2021, 8:07:33 AM" }
        ]
        return (
            <div className="left-sidebar-layout">
                <AdminSidebar />
                <div className="content-layout" >
                    <Titlebar title="QUẢN LÝ PHÂN QUYỀN" />
                    <div className="content-container">
                        <div className="j-c-end">
                            <button className="blue-button " onClick={() => openBigModal("add-role", {})} >
                                <div className="d-flex">
                                    <img src={plus_icon} alt="" className="btn-icon" />
                                Thêm role
                                </div>
                            </button>
                        </div>
                        <div className="decoration-line mg-top-5px mg-bottom-10px" />
                        <Table>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ borderRight: "1px white solid" }}>Tên Role</th>
                                    <th scope="col">Ngày tạo</th>
                                    <th scope="col" className="dummy-th"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => {
                                    return <tr key={item.id}>
                                        <td data-label="Tên Role">
                                            <div className="j-c-space-between">
                                                <div className="mg-left-5px">
                                                    {item.roleName}
                                                </div>

                                                <PopupMenu id={"r-pu" + item.id} items={ //role popup
                                                    [...roleActionList, setAsDefaultMenuItem]
                                                } onMenuItemClick={this.onMenuItemClick} />

                                            </div>
                                            <div className="d-flex mg-top-5px">
                                                {item.labels.map(label => {
                                                    if (label === "Default")
                                                        return <div className="gray-table-label">
                                                            {label}
                                                        </div>
                                                    return <div className="table-label">
                                                        {label}
                                                    </div>
                                                })}
                                            </div>
                                        </td>
                                        <td data-label="Ngày tạo">
                                            {item.creationTime}
                                        </td>
                                        <td data-label="">
                                        </td>

                                    </tr>
                                })}


                            </tbody>
                        </Table >
                    </div >
                </div>
            </div >
        );
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

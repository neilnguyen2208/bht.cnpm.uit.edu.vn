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
import { openBigModal } from 'redux/services/modalServices'
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

export const roleActionList = [
    { id: 1, text: "Xoá", value: "DELETE_ROLE", icon: trash_icon, hasLine: true },
    { id: 2, text: "Chỉnh sửa", icon: edit_icon, value: "EDIT_ROLE" },
]

export const setAsDefaultMenuItem = { id: 3, text: "Đặt làm mặc định.", icon: edit_icon, value: "SET_AS_DEFAULT" };


class UserRoleManagement extends Component {

    componentDidMount() {

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
                                                } />

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

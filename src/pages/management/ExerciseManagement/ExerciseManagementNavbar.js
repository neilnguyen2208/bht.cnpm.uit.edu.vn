import React from 'react'
import { NavLink } from 'react-router-dom'

export default class PostManagementNavBar extends React.PureComponent {
    render() {
        return (
            < div className="h-menu-bar mg-top-10px" >
                {/* <NavLink exact to="/admin/courses-management" className="h-menu-item" activeClassName='h-menu-item active'> */}
                {/* Quản lý bài tập */}
                {/* </NavLink> */}
                {/* <NavLink exact to="/admin/courses-management/approval" className="h-menu-item " activeClassName='h-menu-item active'> */}
                {/* Duyệt bài tập */}
                {/* </NavLink> */}
                <NavLink exact to="/admin/courses-management/report" className="h-menu-item " activeClassName='h-menu-item active'>
                    Xử lý bài tập
                </NavLink>
                <NavLink exact to="/admin/courses-management/comment-report" className="h-menu-item " activeClassName='h-menu-item active'>
                    Xử lý bình luận
                </NavLink>
            </div>);
    }
}
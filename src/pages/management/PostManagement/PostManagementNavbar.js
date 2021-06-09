import React from 'react'
import { NavLink } from 'react-router-dom'

export default class PostManagementNavBar extends React.PureComponent {
    render() {
        return (
            < div className="h-menu-bar mg-top-10px" >
                <NavLink exact to="/admin/post-management" className="h-menu-item" activeClassName='h-menu-item active'>
                    Quản lý bài viết
                             </NavLink>
                <NavLink exact to="/admin/post-management/approval" className="h-menu-item " activeClassName='h-menu-item active'>
                    Duyệt bài viết
                            </NavLink>
                <NavLink exact to="/admin/post-management/report" className="h-menu-item " activeClassName='h-menu-item active'>
                    Xử lý bài viết
                            </NavLink>
                <NavLink exact to="/admin/post-management/comment-report" className="h-menu-item " activeClassName='h-menu-item active'>
                    Xử lý bình luận
                            </NavLink>
            </div>);
    }
}
import React from 'react'
import { NavLink } from 'react-router-dom'

export default class PostManagementNavBar extends React.PureComponent {
    render() {
        return (
            < div className="h-menu-bar mg-top-10px" >
                <NavLink exact to="/admin/post-management" className="h-menu-item" activeClassName='h-menu-item a-h-menu-item'>
                    Quản lý bài viết
                             </NavLink>
                <NavLink exact to="/admin/post-management/approval" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
                    Duyệt bài viết
                            </NavLink>
                <NavLink exact to="/admin/post-management/report" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
                    Xử lý report
                            </NavLink>

            </div>);
    }
}
import React from 'react'
import { NavLink } from 'react-router-dom'

export default class DocumentManagementNavBar extends React.PureComponent {
    render() {
        return (
            < div className="h-menu-bar mg-top-10px" >
                <NavLink exact to="/admin/document-management" className="h-menu-item" activeClassName='h-menu-item a-h-menu-item'>
                    Quản lý tài liệu
                             </NavLink>
                <NavLink exact to="/admin/document-management/approval" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
                    Duyệt tài liệu
                            </NavLink>
                <NavLink exact to="/admin/document-management/report" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
                    Xử lý report
                            </NavLink>

            </div>);
    }
}
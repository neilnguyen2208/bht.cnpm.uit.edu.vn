import React from 'react';
import { NavLink } from 'react-router-dom'
import 'layouts/Search.scss'

export default class SearchHorizontalMenubar extends React.Component {
  render() {
    return (
      <div>
        <div className="h-menu-bar">
          <NavLink to="/tags/posts" className="h-menu-item" activeClassName='h-menu-item active'>
            Bài viết
          </NavLink>
          <NavLink to="/tags/documents" className="h-menu-item " activeClassName='h-menu-item active'>
            Tài liệu
          </NavLink>
          <NavLink to="/tags/exercises" className="h-menu-item " activeClassName='h-menu-item active'>
            Bài tập
          </NavLink>
        </div>
        <div className="mg-top-10px" />
      </div >
    );
  }
}


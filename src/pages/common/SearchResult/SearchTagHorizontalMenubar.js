import React, { Component } from "react";
import { getQueryParamByName } from 'utils/urlUtils'
import { NavLink } from 'react-router-dom'
import 'layouts/Search.scss'

export default class SearchHorizontalMenubar extends Component {
  render() {
    return (
      <div>
        <div className="h-menu-bar">
          <NavLink to="/tags/posts" className="h-menu-item" activeClassName='h-menu-item a-h-menu-item'>
            Bài viết
          </NavLink>
          <NavLink to="/tags/documents" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
            Tài liệu
          </NavLink>
          <NavLink to="/tags/courses" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
            Bài tập
          </NavLink>
        </div>
        <div className="mg-top-10px" />
      </div >
    );
  }
}


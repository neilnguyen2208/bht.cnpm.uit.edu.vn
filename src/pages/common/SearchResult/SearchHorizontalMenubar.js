import React, { Component } from "react";
import { getQueryParamByName, } from 'utils/urlUtils'
import { NavLink } from 'react-router-dom'
export default class SearchHorizontalMenubar extends Component {
  render() {
    return (
      <div>
        <div className="d-flex mg-bottom-5px">
          <div className="gray-label">Kết quả tìm kiếm cho:  </div>
          <div className="gray-normal-label">'{decodeURIComponent(getQueryParamByName('q'))}'</div>
        </div>
        <div className="h-menu-bar">
          <NavLink to="/search/posts/" className="h-menu-item" activeClassName='h-menu-item a-h-menu-item'>
            Bài viết
          </NavLink>
          <NavLink to="/search/documents/" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
            Tài liệu
          </NavLink>
          <NavLink to="/search/courses/" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
            Khoá học
          </NavLink>
          <NavLink to="/search/tags/" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
            Tag
          </NavLink>
        </div>
        <div className="mg-top-10px" />
      </div >
    );
  }
}


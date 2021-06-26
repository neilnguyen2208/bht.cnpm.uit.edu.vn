import React from 'react';
import { getQueryParamByName, } from 'utils/urlUtils'
import { NavLink } from 'react-router-dom'
export default class SearchHorizontalMenubar extends React.Component {
  render() {
    return (
      <div>
        <div className="d-flex mg-bottom-5px">
          {decodeURIComponent(getQueryParamByName('q')) !== '' &&
            <div className="d-flex">
              <div className="gray-label">Kết quả tìm kiếm cho:  </div>
              <div className="gray-normal-label">'{decodeURIComponent(getQueryParamByName('q'))}'</div>
            </div>
          }
        </div>
        <div className="h-menu-bar">
          <NavLink to={`/search/posts?q=${getQueryParamByName('q')}`} className="h-menu-item" activeClassName='h-menu-item active'>
            Bài viết
          </NavLink>
          <NavLink to={`/search/documents?q=${getQueryParamByName('q')}`} className="h-menu-item " activeClassName='h-menu-item active'>
            Tài liệu
          </NavLink>
          <NavLink to={`/search/courses?q=${getQueryParamByName('q')}`} className="h-menu-item " activeClassName='h-menu-item active'>
            Khoá học
          </NavLink>
          <NavLink to={`/search/tags?q=${getQueryParamByName('q')}`} className="h-menu-item " activeClassName='h-menu-item active'>
            Tag
          </NavLink>
        </div>
        <div className="mg-top-10px" />
      </div >
    );
  }
}


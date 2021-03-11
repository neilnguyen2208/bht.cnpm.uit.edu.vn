import React, { Component } from 'react'
import './UserItem.scss'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'
import gray_upload_icon from 'assets/icons/48x48/gray_upload_icon_48x48.png'
import { Link } from 'react-router-dom'

//combobox

class UserInfo extends Component {

  render() {

    return (
      <div className="user-info"  >
        <img className="avatar" src={this.props.authorAvatarURL} alt="" />
        <div className="mg-left-5px j-c-space-between d-flex-vertical">
          <Link className="link-label-m" to={/user/}>
            {this.props.authorName}
          </Link>

          <div className="reputation-container">

            <div className="reputation-sub-container">
              <img alt="" src={gray_write_icon} className="user-info-icon" />
              <div className="reputaion-label">  2000</div>
            </div>
            <div className="reputation-sub-container">
              <img alt="" src={gray_upload_icon} className="user-info-icon" />
              <div className="reputaion-label">   2000</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserInfo;
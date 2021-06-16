import React from 'react'
import './UserItem.scss'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'
import gray_upload_icon from 'assets/icons/48x48/gray_upload_icon_48x48.png'
import { Link } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import store from 'redux/store'
import { get_UserStatisticByIdReset } from 'redux/actions/authAction'
import { getUserStatisticById } from 'redux/services/authServices'

class UserInfo extends React.Component {
  componentDidMount() {
    this.props.getUserStatisticById(this.props.authorID);
  }
  componentWillUnmount() {
    //reset statistic
    store.dispatch(get_UserStatisticByIdReset());
  }
  render() {

    return (
      <div className="user-info"  >
        <Link to={`/user/profile/${this.props.authorID}`}>
          <img className="avatar" src={this.props.authorAvatarURL} alt="" />
        </Link>
        <div className="mg-left-5px j-c-space-between d-flex-vertical">
          <Link className="link-label-m" style={{ fontSize: "20px" }} to={`/user/profile/${this.props.authorID}`}>
            {this.props.authorDisplayName}
          </Link>
          {this.props.isStatisticLoaded && this.props.statisticData ?
            <div className="reputation-container">
              <div className="reputation-sub-container">
                <img alt="" src={gray_write_icon} className="user-info-icon" />
                <div className="reputation-label">  {this.props.statisticData.postCount}</div>
              </div>
              <div className="reputation-sub-container">
                <img alt="" src={gray_upload_icon} className="user-info-icon" />
                <div className="reputation-label">   {this.props.statisticData.docCount}</div>
              </div>
            </div>
            : <></>}
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isStatisticLoaded: state.auth.userStatistic.isLoadDone,
    statisticData: state.auth.userStatistic.data

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserStatisticById
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));



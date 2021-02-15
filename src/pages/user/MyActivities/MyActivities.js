/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { management_getAllRoles } from 'redux/services/userServices'
import Titlebar from 'components/common/Titlebar/Titlebar'
import UserSidebar from 'layouts/UserSidebar'

//import for role config

class MyActivities extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="THÔNG BÁO CỦA TÔI" />
                    <div className="content-container">

                    </div>
                </div>
            </div>);
    }
}
//#region for Redux
const mapStateToProps = (state) => {

    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyActivities));
 //#endregion
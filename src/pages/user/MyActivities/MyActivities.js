/* eslint-disable react/jsx-pascal-case */

import React from 'react'
//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Titlebar from 'components/common/Titlebar/Titlebar'
import UserSidebar from 'layouts/UserSidebar'

//import for role config

class MyActivities extends React.Component {

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
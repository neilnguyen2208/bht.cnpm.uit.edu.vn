/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { management_getAllRoles } from 'redux/services/userServices'

//import for role config

class AccountInformation extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return (<> My activities</>);
    }
}
//#region for Redux
const mapStateToProps = (state) => {

    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountInformation));
 //#endregion
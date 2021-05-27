import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { logout } from 'redux/services/authServices'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (

            //Neu logout thanh cong thi chuyen huong, neu khong thanh cong thi thong bao roi chuyen huong
            <div>
                Logout component
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.authentication.isAuthenticated,
        isAuthenticating: state.auth.authentication.isAuthenticating,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    logout
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));




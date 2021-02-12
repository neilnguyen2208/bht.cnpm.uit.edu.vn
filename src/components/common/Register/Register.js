import React from "react";
import "./Register.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import logo from 'assets/images/round_logo.png';
import { bindActionCreators } from 'redux';
class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        //initiate
        this.state = {}
    }

    componentDidMount() {

    }

    changeUploadFileName(evt) {

    }

    handleUsernameChange() {

    }

    handlePasswordChange() {

    }

    handlePassword2Change() {

    }

    handleEmailChange() {

    }

    register() {

    }

    handleModal() {

    }
    handleClose() {
        this.setState({
            modalShow: false,
        });
    }
    render() {

        return (
            <div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
);
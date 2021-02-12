/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import Modal from 'components/common/Modal/AlertModal'
import { isContainSpecialCharacter } from 'utils/stringUtils'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { getCurrentUser, getLogout } from 'redux/services/userServices'

import Cookies from 'js-cookie'

class UpdatePassword extends Component {
    constructor(props) {
        super();

        //check condition to open popups
        this.isChangeRoleConfirmationPopupOpen = false;
        this.isAnyChangeRoleDropdownComboboxOpen = false;
        this.isAnyFailedAlertPopupOpen = false;
        this.isAnySuccessAlertPopupOpen = false;

        //check condition to disable update password button
        this.canClickSavePassword = false;

        //for show error labels
        this.isCurrentPasswordEmpty = false;
        this.isCurrentPasswordLessThan6Characters = false;
        this.isCurrentPasswordContainSpecialCharacters = false;

        this.isNewPasswordEmpty = false;
        this.isNewPasswordLessThan6Characters = false;
        this.isNewPasswordContainSpecialCharacters = false;

        this.isConfirmationPasswordEmpty = false;
        this.isConfirmationPasswordLessThan6Characters = false;
        this.isConfirmationPasswordContainSpecialCharacters = false;

        this.isAnySuccessLogoutAlertPopupOpen = false;

        this.updatePassword_DTO = {
            currentPassword: "",
            newPassword: "",
            confirmationPassword: "",
        }
        this.username = "";
    }


    componentDidMount() {
        this.props.getCurrentUser();
    }


    render() {
        if (this.props.accountInformation) {
            this.username = this.props.username;
            return (

                <div>
                    {/* <div className="Account_Information_Bounding_Layout"> */}
                    <form onSubmit={(e) => this.handlerUpdatePassword(e)} autoComplete="off" >

                        <div className="gray-label " style={{ textAlign: "center", color: "var(--blue)", fontSize: "1.3rem" }}>Cập nhật mật khẩu</div>

                        {/* Current password */}
                        <div className="pos-relative" >
                            <div className="gray-label mg-top-10px">
                                Mật khẩu hiện tại:
                                    </div>
                            <input type="password" autoComplete="new-password" defaultValue="" placeholder="Nhập mật khẩu hiện tại ..." className="form-input" onChange={(e) => this.handlerChangeCurrentPassword(e)} />
                            <div className="error-label" hidden={!this.isCurrentPasswordEmpty} >
                                *Mật khẩu hiện tại không được để trống.
                                    </div>
                        </div>

                        {/* New password */}
                        <div className="pos-relative" >
                            <div className="gray-label Is_Form_Label">
                                Mật khẩu mới:
                                    </div>
                            <input type="password" defaultValue="" autoComplete="off" placeholder="Nhập mật khẩu mới ..." className="form-input" onChange={(e) => this.handlerChangeNewPassword(e)} />
                            <div className="error-label" hidden={!this.isNewPasswordEmpty} >
                                *Mật khẩu mới không được để trống.
                                    </div>
                            <div className="error-label" hidden={!this.isNewPasswordLessThan6Characters} >
                                *Mật khẩu mới không được ít hơn 6 ký tự.
                                    </div>
                            <div className="error-label" hidden={this.isNewPasswordLessThan6Characters || !this.isNewPasswordContainSpecialCharacters} >
                                *Mật khẩu mới không được chứa các ký tự đặc biệt.
                                    </div>

                        </div>

                        {/* Confirm new password */}
                        <div className="pos-relative" >
                            <div className="gray-label Is_Form_Label">
                                Xác nhận mật khẩu:
                                </div>
                            <input type="password" autoComplete="off" defaultValue="" placeholder="Nhập lại mật khẩu mới ..." className="form-input" onChange={(e) => this.handlerChangeConfirmationPassword(e)} />
                            <div className="error-label" hidden={!this.isConfirmationPasswordEmpty} >
                                *Mật khẩu xác nhận không được để trống.
                                    </div>
                            <div className="error-label" hidden={!this.isConfirmationPasswordLessThan6Characters} >
                                *Mật khẩu xác nhận không được ít hơn 6 ký tự.
                                    </div>
                            <div className="error-label" hidden={this.isConfirmationPasswordLessThan6Characters || !this.isConfirmationPasswordContainSpecialCharacters} >
                                *Mật khẩu xác nhận không được chứa các ký tự đặc biệt.
                                    </div>

                        </div>
                        <div className="d-flex" >
                            <button className="blue-button Is_Form_Button" disabled={!this.canClickSavePassword} onClick={(e) => this.handlerUpdatePassword(e)}>
                                Xác nhận
                                    </button>
                        </div>

                    </form>
                    {/* </div> */}


                    {/* modal for verifing change role */}
                    <Modal
                        open={this.isChangeRoleConfirmationPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="confirmation"
                        closeModal={() => this.closeChangeRoleConfirmationPopup()}
                    >

                        {/* code footer to handler event in parent class (if you want to show a confirmation modal) */}
                        <button className="blue-button mg-right-5px" onClick={() => this.handlerVerifyChangeRoleConfirmation()}>OK</button>
                        <button className="white-button" onClick={() => this.handleCancelChangeRoleConfirmation()}>Cancel</button>
                    </Modal>

                    {/* modal for notification anything */}
                    <Modal
                        open={this.isAnyFailedAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_failure"
                        closeModal={() => this.closeFailedAlertPopup()}
                    >
                    </Modal>

                    <Modal
                        open={this.isAnySuccessAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_success"
                        closeModal={() => this.closeSuccessAlertPopup()}
                    >
                    </Modal>

                    {/* for popup and logout */}
                    <Modal
                        open={this.isAnySuccessLogoutAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_success"
                        closeModal={() => { this.props.getLogout(); this.isAnySuccessLogoutAlertPopupOpen = false; window.location.pathname = "/"; this.setState({}) }}
                    >
                    </Modal>

                </div >
            );
        }
        return <></>;
    }

    //#region handler popup region
    closeChangeRoleConfirmationPopup = () => {
        this.isChangeRoleConfirmationPopupOpen = false;
        this.setState({});
    }

    openFailedAlertPopup = () => {
        this.isAnyFailedAlertPopupOpen = true;
        this.setState({});
    }
    openSuccessAlertPopup = () => {
        this.isAnySuccessAlertPopupOpen = true;
        this.setState({});
    }
    closeFailedAlertPopup = () => {
        this.isAnyFailedAlertPopupOpen = false;
        this.setState({});
    }

    closeSuccessAlertPopup = () => {
        this.isAnySuccessAlertPopupOpen = false;
        this.setState({});
    }

    //#endregion

    //#region handler change text inputs
    handlerChangeCurrentPassword = (e) => {
        e.preventDefault();
        this.updatePassword_DTO.currentPassword = e.target.value;
        if (this.updatePassword_DTO.currentPassword === "" || this.updatePassword_DTO.currentPassword === null) {
            this.isCurrentPasswordEmpty = true;
        } else
            this.isCurrentPasswordEmpty = false;
        this.handlerChangeStateOfSubmitButton();
    }

    handlerChangeNewPassword = (e) => {
        e.preventDefault();
        this.updatePassword_DTO.newPassword = e.target.value;
        if (this.updatePassword_DTO.newPassword === ""
            || this.updatePassword_DTO.newPassword === null) {
            this.isNewPasswordEmpty = true;
            this.canClickSavePassword = false;

        }
        else
            this.isNewPasswordEmpty = false;

        if ((this.updatePassword_DTO.newPassword !== ""
            && this.updatePassword_DTO.newPassword !== null)
            && this.updatePassword_DTO.newPassword.length < 6) {
            this.isNewPasswordLessThan6Characters = true;
            this.canClickSavePassword = false;

        }
        else
            this.isNewPasswordLessThan6Characters = false;

        if (isContainSpecialCharacter(this.updatePassword_DTO.newPassword)) {
            this.isNewPasswordContainSpecialCharacters = true;
            this.canClickSavePassword = false;

        }
        else
            this.isNewPasswordContainSpecialCharacters = false;

        this.handlerChangeStateOfSubmitButton();
    }

    handlerChangeConfirmationPassword = (e) => {
        e.preventDefault();
        this.updatePassword_DTO.confirmationPassword = e.target.value;
        //check confirmation password
        if (this.updatePassword_DTO.confirmationPassword === ""
            || this.updatePassword_DTO.confirmationPassword === null) {
            this.isConfirmationPasswordEmpty = true;
            this.canClickSavePassword = false;
        }
        else
            this.isConfirmationPasswordEmpty = false;

        if ((this.updatePassword_DTO.confirmationPassword !== ""
            && this.updatePassword_DTO.confirmationPassword !== null)
            && this.updatePassword_DTO.confirmationPassword.length < 6) {
            this.isConfirmationPasswordLessThan6Characters = true;
            this.canClickSavePassword = false;
        }
        else
            this.isConfirmationPasswordLessThan6Characters = false;

        if (isContainSpecialCharacter(this.updatePassword_DTO.confirmationPassword)) {
            this.isConfirmationPasswordContainSpecialCharacters = true;
            this.canClickSavePassword = false;
        }
        else
            this.isConfirmationPasswordContainSpecialCharacters = false;

        this.handlerChangeStateOfSubmitButton();
    }

    handlerChangeStateOfSubmitButton = () => {
        this.canClickSavePassword = true;

        if (this.updatePassword_DTO.currentPassword === ""
            || this.updatePassword_DTO.currentPassword === null) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        //check new password
        if (this.updatePassword_DTO.newPassword === ""
            || this.updatePassword_DTO.newPassword === null) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        if ((this.updatePassword_DTO.newPassword !== ""
            && this.updatePassword_DTO.newPassword !== null)
            && this.updatePassword_DTO.newPassword.length < 6) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        if (isContainSpecialCharacter(this.updatePassword_DTO.newPassword)) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        //check confirmation password
        if (this.updatePassword_DTO.confirmationPassword === ""
            || this.updatePassword_DTO.confirmationPassword === null) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        if ((this.updatePassword_DTO.confirmationPassword !== ""
            && this.updatePassword_DTO.confirmationPassword !== null)
            && this.updatePassword_DTO.confirmationPassword.length < 6) {

            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        if (isContainSpecialCharacter(this.updatePassword_DTO.confirmationPassword)) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        this.setState({});
    }
    //#endregion

    //#region main handler to call APIs 
    handlerUpdatePassword = (e) => {
        e.preventDefault();
        //check if new password and confirmation pass word is the same?
        var urlencoded = new URLSearchParams();
      urlencoded.append("username", this.username);
        urlencoded.append("oldPasword", this.updatePassword_DTO.currentPassword);
        urlencoded.append("password", this.updatePassword_DTO.newPassword);
    }

    //#endregion

}

//#region for Redux
const mapStateToProps = (state) => {
    // (state);
    return {
        // accountInformation: state.user.account
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    // getCurrentUser, getLogout
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdatePassword));
 //#endregion
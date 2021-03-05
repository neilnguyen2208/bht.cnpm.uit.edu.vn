import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar'
//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSidebar from "layouts/UserSidebar"

class UpdatePassword extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="THÔNG TIN TÀI KHOẢN" />
                    <div className="content-container">

                        {/* <div className="Account_Information_Bounding_Layout"> */}
                        <form onSubmit={(e) => this.handlerUpdatePassword(e)} autoComplete="off" >

                            <div className="gray-label " style={{ textAlign: "center", color: "var(--blue)", fontSize: "1.3rem" }}>Cập nhật mật khẩu</div>

                            {/* Current password */}
                            <div className="pos-relative" >
                                <div className="gray-label mg-top-10px">
                                    Mật khẩu hiện tại:
                                    </div>
                                <input type="password" autoComplete="new-password" defaultValue="" placeholder="Nhập mật khẩu hiện tại ..." className="text-input" onChange={(e) => this.handlerChangeCurrentPassword(e)} />
                                <div className="error-label" hidden={!this.isCurrentPasswordEmpty} >
                                    *Mật khẩu hiện tại không được để trống.
                                    </div>
                            </div>

                            {/* New password */}
                            <div className="pos-relative" >
                                <div className="gray-label Is_Form_Label">
                                    Mật khẩu mới:
                                    </div>
                                <input type="password" defaultValue="" autoComplete="off" placeholder="Nhập mật khẩu mới ..." className="text-input" onChange={(e) => this.handlerChangeNewPassword(e)} />
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
                                <input type="password" autoComplete="off" defaultValue="" placeholder="Nhập lại mật khẩu mới ..." className="text-input" onChange={(e) => this.handlerChangeConfirmationPassword(e)} />
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



                    </div >
                </div >
            </div >
        );
    }

    //#endregion

    //#region main handler to call APIs
    handlerUpdatePassword = (e) => {
        e.preventDefault();
     
    }

}

//#region for Redux
const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdatePassword));
 //#endregion
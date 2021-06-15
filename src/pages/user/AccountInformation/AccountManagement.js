import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar'
//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSidebar from "layouts/UserSidebar"
import Editor from 'components/common/CustomCKE/CKEditor';
import { SimpleCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration';
import image_icon from 'assets/icons/svg/white_image_icon.svg';
import { getUserDetailByToken, updateUserDetailByToken } from 'redux/services/authServices'
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';
import { openBLModal } from 'redux/services/modalServices';

class AccountManagement extends React.Component {
    constructor(props) {
        super();
        this.state = {
            EDIT_USER_DETAIL_DTO: {
                displayName: "",
                aboutMe: "",
            }
        }

        //this var to prenvent infinite loop
        this.isTheFirstTimeLoaded = false;
    }

    componentDidMount() {
        //get current user detail by token.
        this.props.getUserDetailByToken();
    }

    onSubmit = () => {
        this.setState({
            EDIT_USER_DETAIL_DTO: {
                displayName: document.getElementById("edit-profile-displayname").value,
                aboutMe: getCKEInstance("edit-profile-about-me" + this.props.currentUserDetail.id).getData(),
            }
        })
        this.props.updateUserDetailByToken({
            displayName: document.getElementById("edit-profile-displayname").value,
            aboutMe: getCKEInstance("edit-profile-about-me" + this.props.currentUserDetail.id).getData(),
        })
    }

    handleDisplayNameChange = (value) => {
        this.setState({
            EDIT_USER_DETAIL_DTO: {
                ...this.state.EDIT_USER_DETAIL_DTO,
                displayName: value
            }
        })
    }

    render() {
        if (!this.props.isCurrentUserDetailLoading && this.props.currentUserDetail && !this.isTheFirstTimeLoaded) {
            this.isTheFirstTimeLoaded = true;
            this.setState({
                EDIT_USER_DETAIL_DTO: {
                    displayName: this.props.currentUserDetail.displayName,
                    aboutMe: this.props.currentUserDetail.aboutMe
                }
            })
        }

        if (this.props.isHaveUpdated) {
            openBLModal({ type: "success", text: "Cập nhật thông tin thành công!" });
        }

        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar />
                    <div className="content-container">
                        <div className="setting-title">Cập nhật thông tin</div>
                        <div style={{ marginTop: "2rem", marginLeft: "1rem", marginRight: "1rem", display: "flex" }} >
                            <div className="edit-profile-avatar-container">
                                <img className="edit-profile-avatar" src={this.props.currentUserDetail.avatarURL ? this.props.currentUserDetail.avatarURL : ""} alt="cover" />
                                <div className="overlay">
                                    <div className="mg-auto d-flex">
                                        <img style={{ width: "1.25rem", height: "1.65rem", paddingTop: "0.4rem", marginRight: "0.3rem" }} src={image_icon} alt="" />
                                        <div>
                                            Cập nhật avatar
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <form className="form-container" style={{ marginTop: "0px" }} id="edit-profile">
                                <div className="form-group" >
                                    <label className="form-label">Tên hiển thị:</label>
                                    <div className="d-flex">
                                        <input type="text" className="text-input"
                                            onChange={(e) => this.handleDisplayNameChange(e.target.value)}
                                            id="edit-profile-displayname"
                                            placeholder="Nhập tên hiển thị của bạn"
                                            defaultValue={this.props.currentUserDetail.displayName ? this.props.currentUserDetail.displayName : ""}
                                        />
                                    </div>
                                    <div className="form-error-label-container">
                                        <span className="form-error-label" ></span>
                                    </div>
                                </div>

                                {/* CKEditor */}
                                {!this.props.isCurrentUserDetailLoading && this.props.currentUserDetail.aboutMe ?

                                    <div className="form-group">
                                        <div className="form-label">Giới thiệu về tôi:</div>
                                        <Editor
                                            config={SimpleCKEToolbarConfiguration}
                                            editorId={"edit-profile-about-me" + this.props.currentUserDetail.id}
                                            onInstanceReady={() => { getCKEInstance("edit-profile-about-me" + this.props.currentUserDetail.id).setData(this.props.currentUserDetail.aboutMe) }}
                                            validation
                                            autoGrow_maxHeight={200}
                                        />
                                        <div className="form-error-label-container">
                                            <span className="form-error-label" ></span>
                                        </div>
                                    </div> : <></>
                                }
                            </form>
                        </div>

                        <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                            <div className="form-line pd-top-10px mg-bottom-10px" />
                            <div className="d-flex">
                                <button className="blue-button" onClick={this.onSubmit}>Lưu</button>
                                {/* <button className="white-button mg-left-10px" >Huỷ</button> */}
                            </div>
                        </div>

                    </div>
                </div >
            </div >
        );
    }
}

//#region for Redux
const mapStateToProps = (state) => {
    return {
        currentUserDetail: state.auth.currentUserDetail.data,
        isCurrentUserDetailLoading: state.auth.currentUserDetail.isLoading,
        isHaveUpdated: state.auth.isHaveUpdated,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getUserDetailByToken, updateUserDetailByToken
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountManagement));
 //#endregion
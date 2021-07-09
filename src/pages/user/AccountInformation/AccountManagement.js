import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar'
//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSidebar from "layouts/UserSidebar"
import Editor from 'components/common/CustomCKE/CKEditor';
import { SimpleCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration';
import {
    getUserDetailByToken,
    updateUserDetailByToken
} from 'redux/services/authServices'
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';
import { openBLModal } from 'redux/services/modalServices';
import {
    styleFormSubmit,
    validation
} from 'utils/validationUtils';
import ImageUploader from 'components/common/FormFileUploader/FormImageUploader';
import store from 'redux/store/index.js'
import { update_UserDetailByTokenReset } from 'redux/actions/authAction';

const validationCondition = {
    form: '#edit-profile-form',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('edit-profile-displayname', 'text-input', 'Tên hiển thị không được để trống.'),
        validation.noSpecialChar('edit-profile-displayname', 'text-input', 'Tên hiển thị không được chứa ký tự đặc biệt.'),
        validation.minLength('edit-profile-displayname', 'text-input', 6, 'Tên hiển thị không được dưới 6 ký tự.'),
        validation.isRequired('edit-profile-about-me', 'ckeditor', 'Giới thiệu không được để trống'),
        // validation.isRequired('cr-post-imgurl', 'text-input', 'Link ảnh bìa không được để trống'),
    ],
}

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
        this.activeSubmitButton = false;

    }

    componentDidMount() {
        //get current user detail by token.
        this.props.getUserDetailByToken();
        this.isNewAvatar = false;
        this.activeSubmitButton = false;
    }

    onSubmit = () => {
        this.setState({
            EDIT_USER_DETAIL_DTO: {
                displayName: document.getElementById("edit-profile-displayname").value,
                aboutMe: getCKEInstance("edit-profile-about-me").getData(),
            }
        })
        if (styleFormSubmit(validationCondition))
            this.props.updateUserDetailByToken({
                displayName: document.getElementById("edit-profile-displayname").value,
                aboutMe: getCKEInstance("edit-profile-about-me").getData(),
            }, this.imageFile, this.isNewAvatar);

        this.isNewAvatar = false;
        this.activeSubmitButton = false;
        this.setState({});

    }

    handleDisplayNameChange = (value) => {
        this.setState({
            EDIT_USER_DETAIL_DTO: {
                ...this.state.EDIT_USER_DETAIL_DTO,
                displayName: value
            }
        });
        this.activeSubmitButton = true;
        this.setState({});

    }

    handleImageFileChange = (file) => {
        this.imageFile = file;
        this.isNewAvatar = true;
        this.activeSubmitButton = true;
        this.setState({});
    }

    render() {
        if (!this.props.isCurrentUserDetailLoading && this.props.currentUserDetail && !this.isTheFirstTimeLoaded) {
            validation(validationCondition);
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
            store.dispatch(update_UserDetailByTokenReset());
        }

        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar />
                    <div className="content-container">
                        <div className="setting-title">Cập nhật thông tin</div>
                        <div style={{ marginTop: "2rem", marginLeft: "1rem", marginRight: "1rem", display: "flex" }} >

                            {!this.props.isCurrentUserDetailLoading && this.props.currentUserDetail.avatarURL &&
                                < ImageUploader
                                    id="account-information-imgurl"
                                    maxSize={512000}
                                    AVATAR_TYPE
                                    initialData={this.props.currentUserDetail.avatarURL ? this.props.currentUserDetail.avatarURL : null}
                                    onImageChange={this.handleImageFileChange}
                                    fileType={[".png, .jpg"]}
                                />
                            }

                            <form className="form-container" style={{ marginTop: "0px" }} id="edit-profile-form">
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
                                            editorId={"edit-profile-about-me"}
                                            onInstanceReady={() => { getCKEInstance("edit-profile-about-me").setData(this.props.currentUserDetail.aboutMe) }}
                                            onChange={() => { this.activeSubmitButton = true; this.setState({}); }}
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
                                {!this.activeSubmitButton ?
                                    <button className="blue-button mg-auto " disabled={!this.activeSubmitButton} onClick={e => { e.preventDefault(); }}>Lưu</button>
                                    : <button className="blue-button mg-auto" disabled={!this.activeSubmitButton} onClick={this.onSubmit}>Lưu</button>
                                }
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
    getUserDetailByToken,
    updateUserDetailByToken
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountManagement));
 //#endregion
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

class AccountManagement extends React.Component {
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
                    <Titlebar />
                    <div className="content-container">
                        <div className="setting-title">Cập nhật thông tin</div>
                        <div style={{ marginTop: "2rem", marginLeft: "1rem", marginRight: "1rem", display: "flex" }} >
                            <div className="edit-profile-avatar-container">
                                <img className="edit-profile-avatar" src="https://i.imgur.com/SZJgL6C.png" alt="cover" />
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
                                        <input type="text" className="text-input" onChange={() => this.setState({ isShowreCapcha: true })} id="register-form-confirm-email" placeholder="Email của bạn" />
                                    </div>
                                    <div className="form-error-label-container">
                                        <span className="form-error-label" ></span>
                                    </div>
                                </div>

                                {/* CKEditor */}
                                <div className="form-group">
                                    <div className="form-label">Giới thiệu về tôi:</div>
                                    <Editor
                                        config={SimpleCKEToolbarConfiguration}
                                        id="cr-document-description"
                                        placeholder='Start typing here...'
                                        onChange={this.handleEditorChange}
                                        data="<p>Nhập nội dung tài liệu ...</p>"
                                        validation
                                    />
                                    <div className="form-error-label-container">
                                        <span className="form-error-label" ></span>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                            <div className="form-line pd-top-10px mg-bottom-10px" />
                            <div className="d-flex">
                                <button className="blue-button">Lưu</button>
                                <button className="white-button mg-left-10px">Huỷ</button>
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
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountManagement));
 //#endregion
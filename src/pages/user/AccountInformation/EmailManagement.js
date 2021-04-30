/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';

//import for redux
import "components/common/Loader/Loader.scss";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserSidebar from 'layouts/UserSidebar'
import CustomReCAPTCHA from 'components/common/CustomReCAPTCHA/CustomReCAPTCHA';

class EmailManagement extends Component {
    constructor(props) {
        super();
        this.state = {
            isShowreCapcha: false,
        }
    }

    componentDidMount() {
        this.setState({
            isShowreCapcha: false,
        })
    }

    render() {
        return (
            <div className="left-sidebar-layout" >
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar />
                    <div className="content-container">
                        <form id="register-form-step-2">
                            <div className="setting-title">Cài đặt email</div>

                            <div className="form-container mg-top-10px" id="reg-step-2">

                                <div className="form-group">
                                    <label className="form-label">Địa chỉ email:</label>
                                    <div className="d-flex">
                                        <input type="text" className="text-input" onChange={() => this.setState({ isShowreCapcha: true })} id="register-form-confirm-email" placeholder="Email của bạn" />
                                    </div>
                                    <div className="form-error-label-container">
                                        <span className="form-error-label" ></span>
                                    </div>
                                </div>

                                <div className={this.state.isShowreCapcha ? "d-block" : "d-none"}>
                                    <div className="form-group pd-top-10px" >
                                        <CustomReCAPTCHA
                                            id="register-ReCAPTCHA"
                                            onTokenChange={value => this.onReCAPCHATokenChange(value)}
                                        />
                                        <div className="form-error-label-container">
                                            <span className="form-error-label" ></span>
                                        </div>
                                    </div>

                                    <div className="form-line pd-top-10px mg-bottom-10px" />

                                    <div className="form-group j-c-end">
                                        <button className="blue-button">Lưu</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailManagement));

import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar'
//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSidebar from "layouts/UserSidebar"
import { formatNumber } from 'utils/miscUtils'

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
                    <Titlebar title="CHỈNH SỬA THÔNG TIN " />
                    <div className="content-container">

                        <div className="base-info-container">
                            <div className="profile-cover" />

                            <div className="base-info-sub-container" >
                                <div className="avatar-container view">
                                    <img className="avatar" src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" alt="cover" />
                                    {this.isFollowed ?
                                        <div className="avatar-overlay" >Followed</div>
                                        :
                                        <></>}
                                </div>
                                <div className="info-sub-container">
                                    <div className="info-sub-container-left" >
                                        <div >
                                            <div className="j-c-space-between">
                                                <div className="display-name">Nguyễn Văn Đông</div>
                                            </div>
                                            <div className="email">dongnv.since1999@gmail.com</div>
                                        </div>
                                        <div className="d-flex-vertical j-c-space-between">

                                        </div>
                                    </div>
                                    <div className="j-c-end">
                                        <div className="achievement-bar" >
                                            <div style={{ borderBottom: "var(--gray) 1px solid" }}>
                                                <div className="d-flex">
                                                    <div className="score">Score: {formatNumber(260)}</div>
                                                    <div className="score">Followers: {formatNumber(2000)}</div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="score"> Bài viết: {formatNumber(2)} </div>
                                                    <div className="score"> Tài liệu: {formatNumber(6)}</div>
                                                </div>
                                            </div>
                                            <div className="score" >

                                            </div>
                                        </div>
                                    </div>
                                </div >



                            </div>
                        </div>


                        <div className="about-me">
                            About me
                                    </div>
                        <div className="about-me-detail">
                            Hi all!
                            I am a UIT - VNUHCM, Vietnam University student. Skepticism, nihilism, purism and communism are of special concern to me. Functional programming, quantum computing, generative model (GAN) are the fields in which I work. I really enjoyed Haskell, JavaScript, and Python.
                                    </div>
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
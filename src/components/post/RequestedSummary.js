import React, { Component } from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import Modal from 'components/common/Modal/AlertModal'
import gray_btn_element from 'assets/icons/24x24/gray_btn_element_24x24.png'

class RequestedPostSummary extends Component {

    constructor(props) {
        super(props);
        this.isRejectRequestedPopupOpen = false;
        this.state = {
            // isRejectRequestedPopupOpen: false,
        }
    }

    componentDidMount() {

    }

    getFirstImage() {

    }

    render() {

        return (

            <div className="item-container" >
                <div className="item-main-layout">
                    <div className="metadata">
                        <div className="author-linkauthor-link" onClick={() => this.navigateToAuthorPersonalPage()}>
                            {this.authorName}
                        </div>
                        <div className="requested-date">
                            {this.requestedDate}
                        </div>
                    </div>

                    <div className="item-request-metadata-container">
                        vào lúc {this.requestedTime} đã yêu cầu phê duyệt một tài liệu trong danh mục
                    <div className="requested-category" onClick={() => this.navigateToSameCategoryDocsPage()}>
                            {this.requestedCategory}
                        </div>
                    </div>

                    <div className="title">
                        {this.props.title}
                    </div>

                    <div className="summary-text">
                        {this.props.content}
                    </div>

                    <div className="author-image-link-layout">
                        <img alt="post" className="author-image-link" src={this.props.image}></img>
                    </div>

                </div>
                <div className="item-container_Footer">
                    <div className="blue-button" style={{ marginRight: "5px", fontSize: "16px" }} onClick={() => this.handlerPreviewRequestedPost()}>Xem trước</div>
                    <div className="red-button" style={{ fontSize: "16px" }} onClick={() => { this.handlerRejectRequestedPost() }}>Từ chối</div>
                </div>

                {/* Popup for reject requested post */}
                <Modal
                    shadow={true}
                    type="confirmation"
                    open={this.isRejectRequestedPopupOpen}
                    title="Xác nhận?"
                    text="Xác nhận từ chối tiếp nhận bài viết này?"
                    closeModal={() => { this.isRejectRequestedPopupOpen = false; this.setState({}); }}
                >
                    <button className="blue-button mg-right-5px" onClick={() => this.handlerVerifyRejectRequestedPostConfirmation()}>OK</button>
                    <button className="white-button" onClick={() => this.handleCancelRejectRequestedPostConfirmation()}>Cancel</button>

                </Modal>


            </div>
        );
    }

    navigateToAuthorPersonalPage = () => {
        if (window.location.pathname.substring(0, 6) === "/admin") {
            window.location.href = "/admin/user/" + this.authorID;
            return;
        }
        if (window.location.pathname.substring(0, 5) === "/user")
            window.location.href = "/user/" + this.authorID;
    }

    navigateToSameCategoryDocsPage = () => {
        window.location.href = "/docs/category?id=" + this.requestedCategoryID;
    }

    handlerPreviewRequestedPost = () => {
        if (window.location.pathname.substring(0, 6) === "/admin") {
            window.location.href = "/admin/doc-approving/" + this.id;
            return;
        }
        if (window.location.pathname.substring(0, 5) === "/user")
            window.location.href = "/user/doc-approving/" + this.id;

    }

    handlerRejectRequestedPost = () => {
        this.isRejectRequestedPopupOpen = true;
        this.setState({});
    }

    handleCancelRejectRequestedPostConfirmation = () => {
        this.isRejectRequestedPopupOpen = false;
        this.setState({});
    }

    handlerVerifyRejectRequestedPostConfirmation = () => {
        this.isRejectRequestedPopupOpen = false;
        this.setState({});
    }



}
export default RequestedPostSummary;
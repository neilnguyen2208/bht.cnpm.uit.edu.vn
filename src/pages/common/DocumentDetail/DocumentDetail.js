import React, { Component } from 'react'

import 'components/styles/DocPostSummary.scss'
import gray_btn_element from 'assets/images/g_btn_element.png'

import { isGrantedPermissions } from "utils/permissionUtils"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'components/styles/DocPostDetail.scss'
import PDFViewer from 'pdf-viewer-reactjs'
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import liked_btn from 'assets/images/liked_btn.png'
import unliked_btn from 'assets/images/unliked_btn.png'
import dislike_btn from 'assets/images/dislike_btn.png'
import undislike_btn from 'assets/images/undislike_btn.png'
import download_btn from 'assets/images/gray_download_icon.png'

//import for pdf viewer:


class DocumentDetail extends Component {

    constructor(props) {
        super(props);

        this.documentID = "";
        this.isGrantedPermissions = isGrantedPermissions.bind(this);

        this.id = "";
        this.authorName = "Huỳnh Thị Kim Thảo";
        this.authorID = "authorID";
        this.requestedDate = "requestedDate";
        this.requestedTime = "requestedTime";
        this.category = "category";
        this.categoryID = "categoryID";
        this.semesterName = "semesterName";
        this.year = "year";
        this.subject = "subject";
        this.title = "Sức mạnh của người hướng nội";
        this.content = `This book is so much more than I had originally anticipated when beginning to outline it
            in October 2007. It started out simple: I was going to talk about the 1980s and everything
        that influenced me like comics, television, movies and videogames.I started by writing
        down what videogames I felt were notable enough that I played in that decade and found
        out I had well over 100. I decided to keep going and write all of them down that were
        released through October 2007(when I started this book) and found out I had well over
        500 total.It dawned on me that the idea of covering comics, television and movies
        needed to be passed over.I also started planning on how to split all those games up and
        decided on doing so via decades.`;
        this.image = "image";
        this.tags = "tags";
        this.uploadedTime = "22-08-2020";
        this.viewCount = "1000";
        this.downloadCount = "200";
        this.avartarUrl = 'https://i.imgur.com/SZJgL6C.jpg';
        this.fileName = "Suy tưởng - Marcus Antonius Arellius.pdf";
        this.linkFile = ""

        this.isRejectRequestedPopupOpen = false;
        this.isApproveRequestedPopupOpen = false;
        this.isAnyFailedAlertPopupOpen = false;
        this.isAnySuccessAlertPopupOpen = false;

        this.normalMenuItemList = [
            // { id: 3, name: "Báo cáo", icon: trash_icon },
            { id: 3, name: "Báo cáo" },
        ]


    }

    componentDidMount() {
        // this.fetchCurrentNotApprovedDocument();
    }

    onLikeBtnClick = () => {

        // this.props.likeDocument(this.id);
        this.dislikes = this.isDisliked ? this.dislikes-- : this.dislikes;
        this.isDisliked = false;
        this.isLiked = !this.isLiked;
        this.likes++;
        this.calculateBar();
        this.setState({});
    }

    onDislikeBtnClick = () => {

        // this.props.dislikeDocument(this.id);
        this.likes = this.isLiked ? this.likes-- : this.likes;
        this.isLiked = false;
        this.isDisliked = !this.isDisliked;
        this.dislikes++;
        this.calculateBar();
        this.setState({});
    }


    render() {

        //initiate some element
        let likeBtn = <div></div>;
        let dislikeBtn = <div></div>;

        //render likeBtn
        if (!this.isLiked) {
            likeBtn = <img className="doc-like-dislike-btn" alt="like" src={liked_btn} onClick={this.onLikeBtnClick}></img>
        }
        else {
            likeBtn = <img className="doc-like-dislike-btn" alt="like" src={unliked_btn} onClick={this.onLikeBtnClick} ></img>
        }

        //render dislikeBtn
        if (!this.isDisliked) {
            dislikeBtn = <img className="doc-like-dislike-btn" alt="dislike" src={dislike_btn} onClick={this.onDislikeBtnClick}></img>
        }
        else {
            dislikeBtn = <img className="doc-like-dislike-btn" alt="dislike" src={undislike_btn} onClick={this.onDislikeBtnClick} ></img>
        }
        return (
            <div>
                <div className="doc-post-detail" >
                    <div>
                        <div className="main-layout">

                            <div className="title">
                                {this.title}
                            </div>

                            <div className="metadata-header">

                                <div className="prefix-normal-category"> </div>
                                <div className="normal-category">
                                    {this.category}
                                </div>
                                <img alt="*" className="metadata-icon" src={gray_btn_element} />
                                <div className="DocPost_Metadata_Text">
                                    Môn học: &nbsp;
                                            {this.subject}
                                </div>

                            </div>

                            <div className="user-infor-container">
                                <div className="d-flex">
                                    <img src={this.avartarUrl} alt="avatar" className="user-avatar" />
                                    <div style={{ flexDirection: "vertical" }}>
                                        <div className="display-name">{this.authorName}</div>
                                        <div className="posted-time">đã đăng vào ngày {this.uploadedTime}</div>
                                    </div>
                                </div>
                                <PopupMenu items={this.normalMenuItemList} id={`doc-item-popup-menu-${this.props.id}`} />

                            </div>

                            <div className="content">
                                {this.content}
                            </div>

                            <div className="doc-file-name"
                                onClick={() => window.open("https://drive.google.com/file/d/" + this.linkFile + "/preview")}>
                                {this.fileName}
                            </div>

                        </div>

                        <div className="d-flex j-c-space-between">

                            <div className="like-dislike-bar mg-top-10px pd-10px">

                                {/* 2 button */}
                                <div className="j-c-space-between">
                                    <div className="d-flex">
                                        <div> {likeBtn}</div>
                                        <div className="doc-like-dislike-count">{this.props.likes}</div>
                                    </div>

                                    <div className="d-flex">
                                        <div> {dislikeBtn}</div>
                                        <div className="doc-like-dislike-count">{this.props.dislikes}</div>
                                    </div>
                                </div>

                                {/* rate bar */}
                                <div className="rate-percent-bar">
                                    <div className="like-rate-percent" id={'document-item-like-percents-' + this.props.id} />
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="doc-comment-count-container">
                                    Bình luận
                                    <div className="comment-count">
                                        {this.props.commentCount}
                                    </div>
                                </div>

                                <div className="download-count-layout">
                                    <img src={download_btn} alt="^" className="download-btn"></img>
                                    <div style={{ width: "2px" }}></div>
                                    {this.props.downloads}
                                </div>
                            </div>
                        </div>
                        <div className="doc-live-preview">
                            <PDFViewer
                                document={{
                                    url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
                                }}
                            />
                            {/* <iframe src={"https://drive.google.com/file/d/" + this.linkFile + "/preview"} width="100%" height="100%"></iframe> */}
                            {/* <iframe src={"https://drive.google.com/file/d/0B1HXnM1lBuoqMzVhZjcwNTAtZWI5OS00ZDg3LWEyMzktNzZmYWY2Y2NhNWQx/preview?hl=en"} width="100%" height="100%"></iframe> */}
                        </div>
                    </div>
                </div>


                <div class="comments-container">
                    <ul id="comments-list" class="comments-list">
                        <li>
                            <div class="comment-main-level">
                                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>

                                <div class="comment-box">
                                    <div class="comment-head">
                                        <h6 class="comment-name by-author">Nguyễn Văn Đông</h6>

                                    </div>
                                    <div class="comment-content">
                                        Mọi người thấy bài viết này như thế nào?                                           </div>
                                </div>
                            </div>

                            <ul class="comments-list reply-list">
                                <li>
                                    <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
                                    <div class="comment-box">
                                        <div class="comment-head">
                                            <h6 class="comment-name">Lưu Biêu Nghị</h6>

                                        </div>
                                        <div class="comment-content">
                                            Hay nhưng mà nên có bản dịch nữa bạn, chưa ghi nguồn.
                                            </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
                                    <div class="comment-box">
                                        <div class="comment-head">
                                            <h6 class="comment-name by-author">Nguyễn Văn Đông</h6>

                                        </div>
                                        <div class="comment-content">
                                            Ok, bạn
                                                              </div>
                                    </div>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <div class="comment-main-level">
                                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" />

                                </div>
                                <div class="comment-box">
                                    <div class="comment-head">
                                        <h6 class="comment-name">Lưu Biêu Nghị</h6>
                                    </div>
                                    <div class="comment-content">
                                        À, có một chỗ sai kìa bạn
                                     </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div >

        );
    }

    // return<></>
    // }
    //#region navigate region
    navigateToAuthorPersonalPage = () => {

        //neu khong la admin => home
        if (window.location.pathname.substring(0, 6) === "/admin" && this.roleName === "ADMIN")
            return <>{window.location.pathname = "admin/user-management/" + this.authorID}</>;

        //neu la admin => admin
        if (window.location.pathname.substring(0, 5) === "/user" && this.roleName === "COLLABORATOR")
            return <>{window.location.pathname = "/user/" + this.authorID}</>;
        ;
    }

    navigateToSameCategoryDocsPage = () => {
        window.location.href = "/docs/category?id=" + this.categoryID;
    }
    //#endregion

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

    handlerApproveRequestedPost = () => {
        this.isApproveRequestedPopupOpen = true;
        this.setState({});
    }

    handlerVerifyApproveRequestedPostConfirmation = () => {
        //
    }

    handleCancelApproveRequestedPostConfirmation = () => {
        this.isApproveRequestedPopupOpen = false;
        this.setState({});
    }

    //Calculates bar widths
    calculateBar = () => {

        if (this.likes === this.dislikes) {
            if (document.getElementById('document-item-like-percents-' + this.props.id))
                document.getElementById('document-item-like-percents-' + this.props.id).style.width = "50%";
            return;
        }
        else {
            let percentageLikes;
            //Simple math to calculate percentages
            let total = this.likes + this.dislikes;
            percentageLikes = (this.likes / total) * 100;
            if (document.getElementById('document-item-like-percents-' + this.props.id))
                //We need to apply the widths to our elements
                document.getElementById('document-item-like-percents-' + this.props.id).style.width = percentageLikes.toString() + "%";
        }
    }
}
const mapStateToProps = (state) => {
    return {
        // document: state.document.document,
        // accountInformation: state.user.account
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    // getDocumentByID,
    // getCurrentUser
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentDetail));
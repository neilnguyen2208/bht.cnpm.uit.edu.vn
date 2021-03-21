import React, { Component } from 'react'

import 'components/styles/Metadata.scss'
import gray_btn_element from 'assets/icons/24x24/gray_btn_element_24x24.png'

import { isGrantedPermissions } from "utils/permissionUtils"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'components/styles/Detail.scss'
import PDFViewer from 'pdf-viewer-reactjs'
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import liked_btn from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_btn from 'assets/icons/24x24/unliked_icon_24x24.png'
import dislike_btn from 'assets/icons/24x24/disliked_icon_24x24.png'
import undislike_btn from 'assets/icons/24x24/undisliked_icon_24x24.png'
import download_btn from 'assets/icons/24x24/gray_download_icon_24x24.png'

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
            // { id: 3, name: "Report", icon: trash_icon },
            { id: 3, name: "Report" },
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
            likeBtn = <img className="document-like-dislike-btn" alt="like" src={liked_btn} onClick={this.onLikeBtnClick}></img>
        }
        else {
            likeBtn = <img className="document-like-dislike-btn" alt="like" src={unliked_btn} onClick={this.onLikeBtnClick} ></img>
        }

        //render dislikeBtn
        if (!this.isDisliked) {
            dislikeBtn = <img className="document-like-dislike-btn" alt="dislike" src={dislike_btn} onClick={this.onDislikeBtnClick}></img>
        }
        else {
            dislikeBtn = <img className="document-like-dislike-btn" alt="dislike" src={undislike_btn} onClick={this.onDislikeBtnClick} ></img>
        }
        return (
            <div>
                <div className="document-post-detail" >
                    <div>
                        <div >

                            <div className="title">
                                {this.title}
                            </div>

                            <div className="metadata-header">

                                <div className="prefix-normal-category"> </div>
                                <div className="normal-category">
                                    {this.category}
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
                                <PopupMenu items={this.normalMenuItemList} id={`document-item-popup-menu-${this.props.id}`} />

                            </div>

                            <div className="content">
                                {this.content}
                            </div>

                            <div className="document-file-name"
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
                                        <div className="document-like-dislike-count">{this.props.likes}</div>
                                    </div>

                                    <div className="d-flex">
                                        <div> {dislikeBtn}</div>
                                        <div className="document-like-dislike-count">{this.props.dislikes}</div>
                                    </div>
                                </div>

                                {/* rate bar */}
                                <div className="rate-percent-bar">
                                    <div className="like-rate-percent" id={'document-item-like-percents-' + this.props.id} />
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="document-comment-count-container">
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
                        <div className="document-live-preview">
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
            </div>


        );
    }
}
const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentDetail));
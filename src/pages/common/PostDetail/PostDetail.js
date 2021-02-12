import React, { Component } from 'react'

import 'components/styles/DocPostSummary.scss'
import 'components/styles/DocPostDetail.scss'
import Modal from 'components/common/Modal/AlertModal'
import gray_btn_element from 'assets/images/g_btn_element.png'
import { getPostByID } from "redux/services/postServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Metadata from "components/common/Metadata/Metadata"
import Tag from 'components/common/Tag/Tag'
import liked_btn from 'assets/images/liked_btn.png'
import unliked_btn from 'assets/images/unliked_btn.png'
import full_blue_bookmark_btn from 'assets/images/full_blue_bookmark_btn.png'
import gray_bookmark_btn from 'assets/images/gray_bookmark_btn.png'
import Loader from 'components/common/Loader/Loader'
// import Comment from 'components/common/Comment/Comment'

// import PDFViewer from 'pdf-viewer-reactjs'
//import for pdf viewer:


class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.isRejectRequestedPopupOpen = false;
        this.isApproveRequestedPopupOpen = false;
        this.isAnyFailedAlertPopupOpen = false;
        this.isAnySuccessAlertPopupOpen = false;

        this.likeCount = -1; //dummy for change
        this.state = { isLiked: 0, isSaved: 0 }
    }

    componentDidMount() {
        this.props.getPostByID(this.props.match.params.id);
    }

    toggleLikeImage = () => {

        let tmpLike = this.state.isLiked;

        if (tmpLike === 0)
            if (this.props.likedStatus) tmpLike = 1;
            else tmpLike = -1;

        tmpLike = - tmpLike;

        if (this.props.likeStatus) {
            this.likeCount = tmpLike === -1 ? this.props.likeCount - 1 : this.props.likeCount;
        }
        else {
            this.likeCount = tmpLike === -1 ? this.props.likeCount + 1 : this.props.likeCount;
        }
        console.log(this.state.isLiked);
        //call API
        this.setState({ isLiked: tmpLike });

        console.log(this.state.isLiked)
    }

    toggleSaveImage = () => {
        let tmp = this.state.isSaved;
        if (tmp === 0)
            tmp = this.props.savedStatus ? 1 : -1;
        tmp = -tmp;

        //call API
        this.setState({ isSaved: tmp });
    }

    render() {
        //initiate some element
        let likeBtn = <></>;
        let saveBtn = <></>;

        //render likeBtn
        if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likedStatus)) {
            likeBtn = <img className="like-btn" alt="like" src={liked_btn} onClick={this.toggleLikeImage}></img>
        }
        else {
            likeBtn = <img className="like-btn" alt="like" src={unliked_btn} onClick={this.toggleLikeImage} ></img>
        }

        //render saveBtn
        if (this.state.isSaved === 1 || (this.state.isSaved === 0 && this.props.savedStatus)) {
            saveBtn = <div className="d-flex" onClick={this.toggleSaveImage} >
                <img className="save-btn" alt="like" src={full_blue_bookmark_btn} />
                <div>Huỷ</div>
            </div>
        }
        else {
            saveBtn = <div className="d-flex" onClick={this.toggleSaveImage} >
                <img className="save-btn" alt="dislike" src={gray_bookmark_btn} />
                <div>Lưu</div>
            </div >
        }

        return (
            <div>
                <div className="cr-post-form-container doc-post-detail preview" >
                    {!this.props.isLoading ?
                        <div>
                            <Metadata title={this.props.currentPost.title}
                                category={this.props.currentPost.categoryName}
                                categoryID={this.props.currentPost.categoryID}
                                readingTime={this.props.currentPost.readingTime}
                                authorName={this.props.currentPost.authorName}
                                avartarURL={this.props.currentPost.avatarURL}
                                publishDtm={this.props.currentPost.publishDtm ? this.props.currentPost.publishDtm : ''}
                            />
                            <div className="ck-editor-output" dangerouslySetInnerHTML={{ __html: this.props.currentPost.content }} />

                            <div className="mg-top-10px pd-10px" >
                                {this.props.currentPost.tags ? this.props.currentPost.tags.map(item =>
                                    <Tag isReadOnly={true} tag={item} />) : <></>
                                }
                            </div>
                            <div className="post-reaction-bar">
                                <div className="d-flex mg-top-5px  mg-left-10px">
                                    <div className="d-flex">
                                        <div className="like-btn">  {likeBtn}</div>
                                        <div className="like-count">{this.props.currentPost.likeCount}</div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="save-text-container" onClick={this.toggleSaveImage}>
                                            <div>{saveBtn}</div>
                                        </div>
                                        <div className="post-comment-count-container">
                                            Bình luận
                                             <div style={{ paddingLeft: "5px" }}>
                                                {this.props.currentPost.commentCount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <Comment></Comment> */}
                        </div>
                        : <Loader />}
                </div>
            </div>
        );
    }
    //#region navigate region
    navigateToAuthorPersonalPage = () => {

    }

    navigateToSameCategoryDocsPage = () => {

    }
    //#endregion
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        currentPost: state.post.currentPost.data,
        isLoading: state.post.currentPost.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostByID,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
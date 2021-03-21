import React, { Component } from 'react'

import 'components/styles/Metadata.scss'
import gray_btn_element from 'assets/icons/24x24/gray_btn_element_24x24.png'

import { isGrantedPermissions } from "utils/permissionUtils"
import { getPostByID } from "redux/services/postServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'components/styles/Detail.scss'
import PDFViewer from 'pdf-viewer-reactjs'
import Metadata from "components/document/DetailInfo"
import Loader from 'components/common/Loader/Loader'
import Tag from 'components/post/Tag'

import DocumentNormalReactionbar from 'components/document/NormalReactionbar'
import store from 'redux/store/index.js';
import {
    get_PostByIDReset,
    get_RelativeSameAuthorPostsReset,
    get_RelativeSameCategoryPostsReset
} from 'redux/actions/postAction';
import 'components/common/CustomCKE/CKEditorContent.scss';
import RelativePosts from 'components/post/RelativePosts'

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
        this.linkFile = "";
    }

    componentDidMount() {
        this.props.getPostByID(this.props.match.params.id);

    }

    componentWillUnmount() {
        store.dispatch(get_PostByIDReset());
        store.dispatch(get_RelativeSameAuthorPostsReset());
        store.dispatch(get_RelativeSameCategoryPostsReset());
    }

    render() {

        return (
            <div className="d-flex">
                <div className="mg-auto">
                    <div className="d-flex">
                        <div className="post-detail-container" >
                            {this.props.isLoadDone ?
                                <div>
                                    <Metadata
                                        id={this.props.currentPost.id}
                                        title={this.props.currentPost.title}
                                        categoryName={this.props.currentPost.categoryName}
                                        categoryID={this.props.currentPost.categoryID}
                                        readingTime={this.props.currentPost.readingTime}
                                        authorName={this.props.currentPost.authorName}
                                        authorAvatarURL={this.props.currentPost.authorAvatarURL}
                                        publishDtm={this.props.currentPost.publishDtm}

                                    />

                                    {/* content here */}
                                    <div className="ck-editor-output" dangerouslySetInnerHTML={{
                                        __html:
                                            this.props.currentPost.content
                                    }} />

                                    <div className="mg-top-10px mg-bottom-10px" >
                                        {this.props.currentPost.tags.map(item =>
                                            <Tag isReadOnly={true} tag={item} />
                                        )}
                                    </div>
                                    <div className="d-flex mg-bottom-10px">
                                        <iframe style={{ height: "500px", width: "80%", margin: "auto" }}
                                            src={"https://drive.google.com/file/d/0B1HXnM1lBuoqMzVhZjcwNTAtZWI5OS00ZDg3LWEyMzktNzZmYWY2Y2NhNWQx/preview"}
                                            width="100%" height="100%"></iframe>
                                    </div>
                                    <DocumentNormalReactionbar
                                        id={this.props.id}
                                        likeCount={this.props.likeCount ? this.props.likeCount : 2}
                                        dislikeCount={this.props.dislikeCount ? this.props.dislikeCount : 3}
                                        docReactionType={this.props.docReactionType ? this.props.docReactionType : "NONE"}
                                        commentCount={this.props.commentCount ? this.props.commentCount : 10}
                                        downloadCount={this.props.downloadCount ? this.props.downloadCount : 21}
                                        viewCount={this.props.viewCount ? this.props.viewCount : 1200}
                                    />
                                    {/* <Comment></Comment> */}
                                </div>
                                : <Loader />}
                        </div>
                        <div>
                            {this.props.isSameAuthorLoadDone && this.props.sameAuthor ?
                                <RelativePosts title={"CÙNG TÁC GIẢ"} items={
                                    this.props.sameAuthor} />
                                : <Loader />}
                            {this.props.isSameCategoryLoadDone && this.props.sameCategory ?
                                <RelativePosts title={"CÙNG DANH MỤC"}
                                    items={this.props.sameCategory} /> : <Loader />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currentPost: state.post.currentPost.data,
        isLoadDone: state.post.currentPost.isLoadDone,
        sameCategory: state.post.sameCategory.data,
        isSameCategoryLoadDone: state.post.sameCategory.isLoadDone,
        sameAuthor: state.post.sameAuthor.data,
        isSameAuthorLoadDone: state.post.sameCategory.isLoadDone,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostByID
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentDetail));

// <div className="document-live-preview">
// <PDFViewer
//     document={{
//         url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
//     }}
// />
// {/* <iframe src={"https://drive.google.com/file/d/" + this.linkFile + "/preview"} width="100%" height="100%"></iframe> */}
// {/* <iframe src={"https://drive.google.com/file/d/0B1HXnM1lBuoqMzVhZjcwNTAtZWI5OS00ZDg3LWEyMzktNzZmYWY2Y2NhNWQx/preview?hl=en"} width="100%" height="100%"></iframe> */}
// </div>
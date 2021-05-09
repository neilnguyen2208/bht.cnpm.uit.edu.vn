import React from 'react'

import 'components/styles/Metadata.scss'
import { getPostByID } from "redux/services/postServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'components/styles/Detail.scss'
import Metadata from "components/document/DetailInfo"
import Loader from 'components/common/Loader/Loader'
import Tag from 'components/document/Tag'

import DocumentNormalReactionbar from 'components/document/NormalReactionbar'
import store from 'redux/store/index.js';
import {
    get_PostByIDReset,
    get_RelativeSameAuthorPostsReset,
    get_RelativeSameCategoryPostsReset
} from 'redux/actions/postAction';
import 'components/common/CustomCKE/CKEditorContent.scss';
import RelativePosts from 'components/post/RelativePosts'
import { itemType } from 'constants.js';

class DocumentDetail extends React.Component {

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
                        <div className="document-detail-container" >
                            {this.props.isLoadDone ?
                                <div>
                                    <Metadata
                                        type={itemType.normal}
                                        id={this.props.currentDocument.id}
                                        authorName={this.props.currentDocument.authorName}
                                        authorID={this.props.currentDocument.authorID}
                                        publishDtm={this.props.currentDocument.publishDtm}
                                        categoryName={this.props.currentDocument.categoryName}
                                        categoryID={this.props.currentDocument.categoryID}
                                        subjectName={this.props.currentDocument.docSubject ? this.props.currentDocument.docSubject : "Cấu trúc dữ liệu & giải thuật"}
                                        subjectID={this.props.currentDocument.docSubjectID}

                                        title={this.props.currentDocument.title}
                                        fileName={this.props.currentDocument.fileName ? this.props.currentDocument.fileName : "Tài liệu Cấu trúc dữ liệu và giải thuật nâng cao."}
                                        description={this.props.currentDocument.description}
                                        imageURL={this.props.currentDocument.imageURL}
                                        readingTime={this.props.currentDocument.readingTime}
                                        approveState={this.props.currentDocument.docState}
                                        popUpMenuPrefix="mdpu"   //stand for my doc popup 
                                        authorAvatarURL={"https://i.imgur.com/b6F1E7f.png"}
                                        //
                                        reloadList={() => this.reloadList()}

                                    />

                                    {/* content here */}
                                    <div className="ck-editor-output" dangerouslySetInnerHTML={{
                                        __html:
                                            this.props.currentDocument.content
                                    }} />

                                    <div className="mg-top-10px mg-bottom-10px" >
                                        {this.props.currentDocument.tags.map(item =>
                                            <Tag isReadOnly={true} tag={item} />
                                        )}
                                    </div>
                                    <div className="file-name-container">
                                        <div className="file-name">{this.props.currentDocument.fileName ? this.props.currentDocument.fileName : "Tài liệu giải thuật nâng cao.pdf"}</div>
                                        <button className="white-button">Tải xuống</button>
                                    </div>
                                    <div className="d-flex">
                                        <iframe className="if-container"
                                            src={"https://drive.google.com/file/d/0B1HXnM1lBuoqMzVhZjcwNTAtZWI5OS00ZDg3LWEyMzktNzZmYWY2Y2NhNWQx/preview"}
                                            title={`doc-if-${this.props.match.params.id}`}
                                            sandbox="allow-scripts allow-same-origin"
                                        ></iframe>
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
                                <RelativePosts title={"TÀI LIỆU LIÊN QUAN"} items={
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
        currentDocument: state.post.currentPost.data,
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
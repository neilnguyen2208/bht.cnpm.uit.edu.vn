import React from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import { getAPostByID, getAPostStatisticByID } from "redux/services/postServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DetailInfo from "components/post/DetailInfo"
import Tag from 'components/post/Tag'
import Loader from 'components/common/Loader/Loader'
import PostNormalReactionbar from 'components/post/NormalReactionbar'
import store from 'redux/store/index.js';
import {
    get_PostByIDReset,
    get_RelativeSameAuthorPostsReset,
    get_RelativeSameCategoryPostsReset,
    put_EditAPostReset
} from 'redux/actions/postAction';
import 'components/common/CustomCKE/CKEditorContent.scss';
import RelativePosts from 'components/post/RelativePosts';
import RelativeToPost from 'components/post/RelativeToPost';
import CommentSection from 'components/post/comment/CommentSection'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import DocPostDetailLoader from 'components/common/Loader/DocPostDetailLoader'

class PostDetail extends React.Component {
    componentDidMount() {
        this.props.getAPostStatisticByID(this.props.match.params.id);
        this.props.getAPostByID(this.props.match.params.id);
    }

    componentWillUnmount() {
        store.dispatch(get_PostByIDReset());
        store.dispatch(get_RelativeSameAuthorPostsReset());
        store.dispatch(get_RelativeSameCategoryPostsReset());
    }

    renderTableOfContent = () => {
        let ToC = "<div>";
        document.querySelectorAll(".ck-editor-output h1, .ck-editor-output h2, .ck-editor-output h3  ").forEach((item) => {
            if (item.tagName === "H1")
                ToC += `<div className="lv1-toc" > ${item.innerText}</div>`;
            if (item.tagName === "H2")
                ToC += `<div className="lv2-toc" > ${item.innerText}</div>`;
            if (item.tagName === "H3")
                ToC += `<div className="lv3-toc" > ${item.innerText}</div>`;
        })

        ToC = ToC + "</div>";
        return ToC;
    }

    render() {
        if (this.props.isHaveEdited) {
            store.dispatch(put_EditAPostReset());
            this.props.getAPostByID(this.props.match.params.id);
        }

        return (
            <div>
                <div className="d-flex">
                    <div className="mg-auto">
                        <div className="d-flex">
                            <div className="post-detail-container" >
                                {this.props.isLoadDone ?
                                    <div>
                                        <DetailInfo
                                            postID={this.props.currentPost.id}
                                            title={this.props.currentPost.title}
                                            categoryName={this.props.currentPost.categoryName}
                                            categoryID={this.props.currentPost.categoryID}
                                            readingTime={this.props.currentPost.readingTime}
                                            authorDisplayName={this.props.currentPost.authorDisplayName}
                                            authorAvatarURL={this.props.currentPost.authorAvatarURL}
                                            publishDtm={this.props.currentPost.publishDtm}
                                            availableActions={this.props.currentPost.availableActions}
                                            imageURL={this.props.currentPost.imageURL}
                                            authorID={this.props.currentPost.authorID}
                                        />

                                        {/* content here */}
                                        <div className="ck-editor-output" dangerouslySetInnerHTML={{
                                            __html:
                                                this.props.currentPost.content
                                        }} />

                                        <div className="mg-top-10px mg-bottom-10px" >
                                            {this.props.currentPost.tags.map(item =>
                                                <Tag isReadOnly={true} key={item.id} clickable tag={item} />
                                            )}
                                        </div>

                                        {/* Use a fisrt load var to render first statistic. */}
                                        {/* Create statistic services, callback after create reply, create comment and delete comment */}

                                        {this.props.isPostStatisticLoadDone && Object.keys(this.props.postStatistic).length > 0 ?
                                            <div>
                                                <PostNormalReactionbar
                                                    useAction={true}
                                                    availableActions={this.props.currentPost.availableActions}
                                                    postID={this.props.currentPost.id}
                                                    likeCount={this.props.currentPost.likeCount}
                                                    commentCount={this.props.postStatistic.commentCount}
                                                    likedStatus={this.props.currentPost.likeStatus}
                                                    savedStatus={this.props.currentPost.savedStatus}
                                                    viewCount={this.props.currentPost.viewCount}
                                                />

                                                <div id="cr-cmt" />
                                                <CommentSection
                                                    useAction={true}
                                                    // create comment will show if you have action create comment
                                                    postAvailableActions={this.props.currentPost.availableActions}
                                                    id={this.props.currentPost.id}
                                                    commentCount={this.props.postStatistic.commentCount}
                                                />
                                            </div>
                                            :
                                            <div>
                                                <PostNormalReactionbar
                                                    useAction={true}
                                                    availableActions={this.props.currentPost.availableActions}
                                                    postID={this.props.currentPost.id}
                                                    likeCount={this.props.currentPost.likeCount}
                                                    commentCount={this.props.currentPost.commentCount}
                                                    likedStatus={this.props.currentPost.likeStatus}
                                                    savedStatus={this.props.currentPost.savedStatus}
                                                    viewCount={this.props.currentPost.viewCount}
                                                />
                                                <div className="d-flex" >
                                                    {!this.props.isRelativeDocumentsLoading && this.props.relativeDocuments ?
                                                        <RelativeToPost title={"TÀI LIỆU LIÊN QUAN"} items={
                                                            this.props.relativeDocuments} type="DOCUMENT" />
                                                        : <Loader />}
                                                    {!this.props.isRelativeExercisesLoading && this.props.relativeExercises ?
                                                        <RelativeToPost title={"BÀI TẬP LIÊN QUAN"}
                                                            items={this.props.relativeExercises} /> : <Loader />
                                                    }
                                                </div>
                                                <div id="cr-cmt" />
                                                <CommentSection
                                                    useAction={true}
                                                    // create comment will show if you have action create comment
                                                    postAvailableActions={this.props.currentPost.availableActions}
                                                    id={this.props.currentPost.id}
                                                    commentCount={this.props.currentPost.commentCount}
                                                />
                                            </div>
                                        }
                                        {formatMathemicalFormulas()}
                                        {styleCodeSnippet()}
                                    </div>
                                    : <div><DocPostDetailLoader />
                                        <div id="cr-cmt" />
                                    </div>
                                }
                            </div>
                            <div>
                                {/* <div className="relative-sidebar">
                                <div className="relative-title">
                                    MỤC LỤC
                                </div>
                                <div style={{ padding: "5px" }} id="toc-container" dangerouslySetInnerHTML={{
                                    __html:
                                        this.renderTableOfContent()
                                }}>
                                </div >
                            </div > */}

                                <div className="fake-relative-sidebar"></div>
                                <div style={{ position: "fixed" }}>
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
                </div>
                {formatMathemicalFormulas()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.post.relativeDocuments.data);

    return {
        currentPost: state.post.currentPost.data,
        isLoadDone: state.post.currentPost.isLoadDone,
        sameCategory: state.post.sameCategory.data,
        isSameCategoryLoadDone: state.post.sameCategory.isLoadDone,
        sameAuthor: state.post.sameAuthor.data,
        isSameAuthorLoadDone: state.post.sameCategory.isLoadDone,
        postStatistic: state.post.postStatistic.data,
        isPostStatisticLoadDone: state.post.postStatistic.isLoadDone,
        isHaveEdited: state.post.isHaveEdited,
        relativeDocuments: state.post.relativeDocuments.data,
        isRelativeDocumentsLoading: state.post.relativeDocuments.isLoading,
        relativeExercises: state.post.relativeExercises.data,
        isRelativeExercisesLoading: state.post.relativeExercises.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAPostByID, getAPostStatisticByID
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
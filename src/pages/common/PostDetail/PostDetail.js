import React, { Component } from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import { getPostByID } from "redux/services/postServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Metadata from "components/post/DetailInfo"
import Tag from 'components/post/Tag'
import Loader from 'components/common/Loader/Loader'
import NormalReactionbar from 'components/post/NormalReactionbar'
import store from 'redux/store/index.js';
import {
    get_PostByIDReset,
    get_RelativeSameAuthorPostsReset,
    get_RelativeSameCategoryPostsReset
} from 'redux/actions/postAction';
import 'components/common/CustomCKE/CKEditorContent.scss';
import RelativePosts from 'components/post/RelativePosts'

class PostDetail extends Component {


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
                                    <NormalReactionbar
                                        id={this.props.currentPost.id}
                                        likeCount={this.props.currentPost.likeCount}
                                        commentCount={this.props.currentPost.commentCount}
                                        likedStatus={this.props.currentPost.likeStatus}
                                        savedStatus={this.props.currentPost.savedStatus}
                                    // type="PREVIEW"
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
    getPostByID,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
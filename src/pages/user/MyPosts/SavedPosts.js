import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import Paginator from 'components/common/Paginator/ServerPaginator';

//import for redux
import { getSavedPosts } from "redux/services/postServices";
import "components/common/Loader/Loader.scss";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import { delete_UnSaveAPostReset } from 'redux/actions/postAction'
import UserSidebar from 'layouts/UserSidebar'
import PostNormalReactionbar from 'components/post/NormalReactionbar'
import PostSummaryMetadata from 'components/post/SummaryInfo'
import store from 'redux/store/index'

//Sample URL: http://localhost:3000/user/my-posts?page=3&category=1
class SavedPosts extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.searchParamObject = {
            "page": 1,
            "userID": "8460c6d8-d2c7-46b9-a64d-87f76fcf8b18"

        }

        this.queryParamObject = {
            "page": 1,

        }

        //force default properties, can't access by querry param
        setQueryParam(this.queryParamObject);

        this.props.getSavedPosts(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        this.queryParamObject = {
            ...this.queryParamObject,
            "page": pageNumber
        }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page')
        }
        this.props.getSavedPosts(this.searchParamObject);
        this.setState({});
    }

    render() {

        if (this.props.isHaveUnSaved) {
            this.reloadList();
            store.dispatch(delete_UnSaveAPostReset())
        }

        if (!this.props.isListLoading) {
            if (this.props.savedPosts.length !== 0)
                this.savedPosts = this.props.savedPosts.map((item) => {
                    return <div className="item-container">
                        <PostSummaryMetadata
                            postId={item.id}
                            authorName={item.authorName}
                            authorID={item.authorID}
                            publishDtm={item.publishDtm}
                            categoryName={item.categoryName}
                            categoryID={item.categoryID}
                            title={item.title}
                            summary={item.summary}
                            imageURL={item.imageURL}
                            readingTime={item.readingTime}
                            approveState={item.postState}
                            popUpMenuPrefix="svppu"   //stand for my post popup 
                            authorAvatarURL={item.authorAvatarURL}
                        />
                        <PostNormalReactionbar
                            postId={item.id}
                            likeCount={item.likeCount}
                            commentCount={item.commentCount}
                            likedStatus={item.likeStatus}
                            savedStatus={item.savedStatus}
                            viewCount={item.viewCount}
                        />
                    </div >
                })
            else
                this.savedPosts = <div style={{ width: "100%", margin: "auto" }}>Bạn chưa lưu bài viết nào</div>;
        }
        else
            this.savedPosts = <div>
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
            </div>

        return (
            <div className="left-sidebar-layout" >
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="BÀI VIẾT ĐÃ LƯU" />
                    <div className="content-container">
                        {this.comboboxGroup}

                        {!this.props.isListLoading && this.props.savedPosts ?
                            <>
                                <div >{this.savedPosts}</div>

                                {this.props.savedPosts.length !== 0 ?
                                    <Paginator config={{
                                        changePage: (pageNumber) => this.onPageChange(pageNumber),
                                        pageCount: this.props.totalPages,
                                        currentPage: getQueryParamByName('page')
                                    }}
                                    />
                                    : <></>
                                }
                            </>
                            :
                            <div>
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                            </div>
                        }
                    </div>
                </div >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        savedPosts: state.post.savedPosts.data,
        totalPages: state.post.savedPosts.totalPages,
        totalElements: state.post.savedPosts.totalElements,
        isListLoading: state.post.savedPosts.isLoading,

        isHaveUnsaved: state.post.isHaveUnsaved,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getSavedPosts,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SavedPosts));

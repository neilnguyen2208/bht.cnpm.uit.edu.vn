import React, { Component } from "react";
import Tag from "components/common/Tag/Tag"
import { getMyPostsList } from "redux/services/postServices"
import { getPostCategories } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js'

import PostSummaryReactionBar from 'components/post/SummaryReactionBar'
import PostSummaryMetadata from 'components/post/SummaryMetadata'
class SearchPostByTag extends Component {
    constructor(props) {
        super(props);

        this.postsList = <></>
    }

    async componentDidMount() {

        let page = getQueryParamByName('page');
        this.props.getMyPostsList(page); //api khác, tìm bằng tag
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam("page", pageNumber);
        let page = getQueryParamByName('page');
        let category = getQueryParamByName('category');
        this.props.getMyPostsList(page, category);
        this.setState({});
    }
    render() {

        if (!this.props.isListLoading) {
            this.myPostsList = this.props.myPostsList.map((postItem) => (
                <div className="item-container">
                   <PostSummaryMetadata
                        type={postItem.type}
                        id={postItem.id}
                        authorName={postItem.authorName}
                        authorID={postItem.authorID}
                        publishDtm={postItem.publishDtm}
                        categoryName={postItem.categoryName}
                        categoryID={postItem.categoryID}
                        title={postItem.title}
                        summary={postItem.summary}
                        imageURL={postItem.imageURL}
                        readingTime={postItem.readingTime}
                        approveState={postItem.postState} />
                    <PostSummaryReactionBar
                        id={postItem.id}
                        likes={postItem.likeCount}
                        comments={postItem.commentCount}
                        likeStatus={postItem.likeStatus}
                        savedStatus={postItem.savedStatus}
                    />
                </div >)
            )
        }
        return (
            <div>
                {
                    this.props.isListLoading ?
                        < Loader /> :
                        <>{this.myPostsList}</>
                }

                < Paginator config={{
                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                    pageCount: 7,
                    currentPage: getQueryParamByName('page')
                }} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    ;
    return {
        myPostsList: state.post.myPosts.data,
        postCategories: state.post_category.categories.data,
        isListLoading: state.post.myPosts.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyPostsList, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPostByTag));

import React from 'react';
import { getPostSearch } from "redux/services/postServices"
import { getPostCategoriesHaveAll } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'

import Loader from 'components/common/Loader/Loader'
import PostNormalReactionbar from 'components/post/NormalReactionbar'
import PostSummaryMetadata from 'components/post/SummaryInfo'

import { publishedTimeOptions, itemType } from 'constants.js';
import HomePostItem from 'components/post/HomeFullInfo'
class PostsList extends React.Component {

    componentDidMount() {
        this.queryParamObject = {
            "category": 0,
            "page": 1,
        }

        this.searchParamObject = {
            "page": 1,
            "postCategoryID": null,
            "sortByPublishDtm": "publishDtm,desc",
            searchTerm: ''
        }

        setQueryParam(this.queryParamObject)
        this.props.getPostCategoriesHaveAll();
        this.props.getPostSearch(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ ...this.queryParamObject, "page": pageNumber });
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        this.props.getPostSearch(this.searchParamObject);
        this.setState({});
    }

    onTimeOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, "page": 1 });
        this.searchParamObject = {
            ...this.searchParamObject,
            sortByPublishDtm: selectedOption.sort
        }
        this.props.getPostSearch(this.searchParamObject);
        this.setState({});
    }

    onCategoryOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, "page": 1, "category": selectedOption.id });
        this.searchParamObject = {
            ...this.searchParamObject,
            "postCategoryID": selectedOption.id,
            "page": 1
        }
        this.props.getPostSearch(this.searchParamObject);
        this.setState({});
    }

    render() {
        let postSearchResult = <></>;
        if (!this.props.isListLoading) {
            postSearchResult = this.props.postSearchResult.map((postItem) => {
                return < div className="home-item-container" key={postItem.id} >

                    <HomePostItem
                        authorAvatarURL={postItem.authorAvatarURL}
                        key={postItem.id}
                        id={postItem.id}
                        authorDisplayName={postItem.authorDisplayName}
                        authorID={postItem.authorID}
                        publishDtm={postItem.publishDtm}
                        categoryName={postItem.categoryName}
                        categoryID={postItem.categoryID}
                        title={postItem.title}
                        summary={postItem.summary}
                        imageURL={postItem.imageURL}
                        likeStatus={postItem.likeStatus}
                        savedStatus={postItem.savedStatus}
                        readingTime={postItem.readingTime}
                        likeCount={postItem.likeCount}
                        viewCount={postItem.viewCount}
                        commentCount={postItem.commentCount}
                    ></HomePostItem>
                </div >
            })
        }
        else
            postSearchResult = <Loader />

        return (
            <div className="home-layout">
                <div className="mg-top-10px" />
                <div className="nm-bl-layout-router-outlet" >
                    <div>
                        <div className="filter-container" >
                        </div>
                        {!this.props.isListLoading &&
                            <div>
                                {postSearchResult}
                            </div>
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postCategories: state.post_category.categories.searchData,
        isListLoading: state.post.postsList.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading,
        postSearchResult: state.post.postsList.data,

        totalPages: state.post.postsList.totalPages,
        totalElements: state.post.postsList.totalElements,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostSearch, getPostCategoriesHaveAll
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));

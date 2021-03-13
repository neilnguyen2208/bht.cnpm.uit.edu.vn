import React, { Component } from "react";
import Tag from "components/common/tag/Tag"
import { getMyPostsList, getPostSearch } from "redux/services/postServices"
import { getPostCategories } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js'

import PostNormalReactionbar from 'components/post/NormalReactionbar'
import SearchTagHorizontalMenubar from './SearchTagHorizontalMenubar';
import PostSummaryMetadata from 'components/post/SummaryInfo';

class SearchPostByTag extends Component {
    componentDidMount() {
        this.queryParamObject = {
            "page": 1,
            tag: getQueryParamByName('tag')

        }

        this.searchParamObject = {
            "page": 1,
            tags: getQueryParamByName('tag'),
            searchTerm: ''
        }

        setQueryParam(this.queryParamObject)
        //   this.props.getPostCategoriesHaveAll();
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

    render() {

        let postSearchResult = <></>
        if (!this.props.isListLoading) {
            postSearchResult = this.props.postSearchResult.map((item) => {
                return < div className="item-container" >
                    <PostSummaryMetadata
                        type={itemType.normal}
                        id={item.id}
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
                        popUpMenuPrefix="pmpu"   //stand for my post popup 
                        authorAvatarURL={item.authorAvatarURL}
                        //
                        reloadList={() => this.reloadList()}
                    />
                    {/* <PostNormalReactionbar
                        id={item.id}
                        likeCount={item.likeCount}
                        commentCount={item.commentCount}
                        likedStatus={item.likeStatus}
                        savedStatus={item.savedStatus}
                    /> */}
                </div >

            })
        }
        else
            postSearchResult = <Loader />

        return (
            <div>
                <SearchTagHorizontalMenubar />
                {
                    this.props.isListLoading ?
                        < Loader /> :
                        <>{postSearchResult}</>
                }

                < Paginator config={{
                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                    pageCount: 1,
                    currentPage: getQueryParamByName('page')
                }} />
            </div>
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
    // getMyPostsList
    getPostSearch
    // , getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPostByTag));

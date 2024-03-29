import React from 'react';
import { getPostSearch } from "redux/services/postServices"
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js';

import PostNormalReactionbar from 'components/post/NormalReactionbar'
import SearchTagHorizontalMenubar from './SearchTagHorizontalMenubar';
import PostSummaryMetadata from 'components/post/SummaryInfo';
import RelativeTagSidebar from 'layouts/RelativeTagSidebar';
import SearchTagTopbar from 'layouts/SearchTagTopbar'

class SearchPostByTag extends React.Component {
    componentDidMount() {
        this.queryParamObject = {
            "page": 1,
            tag: getQueryParamByName('tag') ? getQueryParamByName('tag') : 1

        }

        this.searchParamObject = {
            "page": 1,
            tags: getQueryParamByName('tag'),
            searchTerm: ''
        }

        setQueryParam(this.queryParamObject);
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
                        postID={item.id}
                        authorDisplayName={item.authorDisplayName}
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
                    <PostNormalReactionbar
                        postID={item.id}
                        likeCount={item.likeCount}
                        viewCount = {item.viewCount}
                        commentCount={item.commentCount}
                        likedStatus={item.likeStatus}
                        savedStatus={item.savedStatus}
                    />
                </div >

            })
        }

        return (
            <div className="search-layout">
                <SearchTagTopbar />
                <div className="d-flex">
                    <RelativeTagSidebar />
                    <div className="w-100-percents" >
                        <SearchTagHorizontalMenubar />
                        {
                            this.props.isListLoading ?
                                < Loader /> :
                                <>
                                    <div className="sum-item-label">
                                        <div className="mg-right-5px">Tổng số:</div>
                                        <div> {this.props.totalElements}</div>
                                    </div>
                                    {postSearchResult}
                                    < Paginator config={{
                                        changePage: (pageNumber) => this.onPageChange(pageNumber),
                                        pageCount: this.props.totalPages,
                                        currentPage: getQueryParamByName('page')
                                    }} />
                                </>
                        }


                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postCategories: state.postCategory.categories.searchData,
        isListLoading: state.post.postsList.isLoading,
        isCategoryLoading: state.postCategory.categories.isLoading,
        postSearchResult: state.post.postsList.data,
        totalPages: state.post.postsList.totalPages,
        totalElements: state.post.postsList.totalElements,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostSearch
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPostByTag));

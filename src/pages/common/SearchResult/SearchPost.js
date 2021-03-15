import React, { Component } from "react";
import { getPostSearch } from "redux/services/postServices"
import { getPostCategoriesHaveAll } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'

import Loader from 'components/common/Loader/Loader'
import SearchHorizontalMenubar from './SearchHorizontalMenubar'

import PostNormalReactionbar from 'components/post/NormalReactionbar'
import PostSummaryMetadata from 'components/post/SummaryInfo'

import { publishedTimeOptions, itemType } from 'constants.js';
class SearchPost extends Component {


    componentDidMount() {
        this.queryParamObject = {
            "category": 0,
            "page": 1,
            "q": getQueryParamByName('q') ? getQueryParamByName('q') : ' '

        }

        this.searchParamObject = {
            "page": 1,
            "category": null,
            "postState": '',
            "searchTerm": getQueryParamByName('q') ? getQueryParamByName('q') : ' '
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
            sort: selectedOption.sort
        }
        this.props.getPostSearch(this.searchParamObject);
        this.setState({});
    }

    onCategoryOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, "page": 1, "category": selectedOption.id });
        this.searchParamObject = {
            ...this.searchParamObject,
            "category": selectedOption.id,
            "page": 1
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
                    <PostNormalReactionbar
                        id={item.id}
                        likeCount={item.likeCount}
                        commentCount={item.commentCount}
                        likedStatus={item.likeStatus}
                        savedStatus={item.savedStatus}
                    />
                </div >
            })
        }
        else
            postSearchResult = <Loader />
        let combobox = <></>;
        if (!this.props.isCategoryLoading && this.props.postCategories.length !== 0)
            combobox = <div className="j-c-space-between">
                <div className="d-flex">
                    <div className="filter-label t-a-right mg-right-5px">Thời gian:</div>
                    <div className="mg-left-5px">
                        <ComboBox
                            options={publishedTimeOptions}
                            selectedOptionID={1}
                            placeHolder="Tất cả"
                            onOptionChanged={(selectedOption) => this.onTimeOptionChange(selectedOption)}
                            id="pstf-combobox" //post seacrh time filter 
                        ></ComboBox>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                    <div className="mg-left-5px">
                        <ComboBox
                            selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 0}
                            options={this.props.postCategories}
                            onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                            id="spcf-combobox" //post search category filter
                        ></ComboBox>
                    </div>
                </div>
            </div>

        return (
            <div className="pr-layout" >
                <div className="search-layout">
                    <SearchHorizontalMenubar></SearchHorizontalMenubar>
                    <div className="mg-top-10px" />
                    <div className="nm-bl-layout-router-outlet" >
                        <div>
                            <div className="filter-container" >
                                {combobox}
                            </div>
                            {this.props.isListLoading ?
                                < Loader /> :
                                <div>


                                    <div className="gray-label margin-bottom-10px"> Tổng số kết quả: {this.props.totalElements}  </div>
                                    <div >{postSearchResult}</div>

                                    < Paginator config={{
                                        changePage: (pageNumber) => this.onPageChange(pageNumber),
                                        pageCount: this.props.totalPages,
                                        currentPage: getQueryParamByName('page') ? getQueryParamByName('page') : 1
                                    }} />
                                </div>
                            }
                        </div>
                    </div>
                </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPost));

import React, { Component } from "react";
import Tag from "components/common/Tag/Tag"
import { getPostSearch } from "redux/services/postServices"
import { getPostCategories } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'

import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js'
import { NavLink } from 'react-router-dom'
import SearchHorizontalMenubar from './SearchHorizontalMenubar'

import PostSummaryReactionBar from 'components/post/SummaryReactionBar'
import PostSummaryMetadata from 'components/post/SummaryMetadata'

class SearchPost extends Component {
    constructor(props) {
        super(props);

        this.timeFilters = [
            { id: 1, name: "Mới nhất" },
            { id: 2, name: "Cũ nhất" }
        ]

        this.state = {
            searchParam: getQueryParamByName('q')
        }
    }

    async componentDidMount() {
        let page = !getQueryParamByName('page') ? '' : getQueryParamByName('page');
        let searchParam = !getQueryParamByName('q') ? '' : getQueryParamByName('q');

        setQueryParam('page', page);
        setQueryParam('q', searchParam);
        setQueryParam('category', 1);


        this.props.getPostCategories();
        this.props.getPostSearch(page - 1, 1, searchParam, 'publishDtm,desc');
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam("page", pageNumber);
        let page = !getQueryParamByName('page') ? '' : getQueryParamByName('page');
        let category = !getQueryParamByName('category') ? '' : getQueryParamByName('category')
        let searchParam = !getQueryParamByName('q') ? '' : getQueryParamByName('q');
        this.props.getPostSearch(page - 1, category, searchParam, 'publishDtm,desc');

        this.setState({});
    }

    onTimeFilterOptionChanged = (selectedOption) => {
        let page = !getQueryParamByName('page') ? '' : getQueryParamByName('page');
        let category = !getQueryParamByName('category') ? '' : getQueryParamByName('category')
        let searchParam = !getQueryParamByName('q') ? '' : getQueryParamByName('q');
        this.props.getPostSearch(page - 1, category, searchParam, selectedOption.id === 1 ? 'publishDtm,desc' : 'publishDtm,asc');
    }

    onCategoryFilterOptionChanged = (selectedOption) => {
        setQueryParam("category", selectedOption.id);
        let page = !getQueryParamByName('page') ? '' : getQueryParamByName('page');
        let category = !getQueryParamByName('category') ? '' : getQueryParamByName('category')
        let searchParam = !getQueryParamByName('q') ? '' : getQueryParamByName('q');
        this.props.getPostSearch(page - 1, category, searchParam, 'publishDtm,desc');
    }

    render() {
        let postSearchResult = <></>
        if (!this.props.isListLoading) {
            postSearchResult = this.props.postSearchResult.map((postItem) => {
                return < div className="item-container" >
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
                </div >

            })
        }
        else
            postSearchResult = <Loader />
        let combobox = <></>;
        if (!this.props.isCategoryLoading) combobox =
            <div className="d-flex">
                <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                <div style={{ marginLeft: "5px" }}>
                    <ComboBox
                        // selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 1}
                        options={this.props.postCategories}
                        placeHolder="Chọn danh mục"
                        onOptionChanged={(selectedOption) => this.onCategoryFilterOptionChanged(selectedOption)}
                        id="search-post-category-filter-combobox"
                    ></ComboBox>
                </div>
            </div>

        return (
            <div className="pr-layout" >
                <div className="search-layout">
                    <SearchHorizontalMenubar></SearchHorizontalMenubar>
                    <div className="mg-top-10px" />
                    <div className="nm-bl-layout-router-outlet" >
                        <div>
                            {this.props.isListLoading ?
                                < Loader /> :
                                <div>
                                    <div>
                                        <div className="filter-container">
                                            <div className="d-flex">
                                                <div className="filter-label t-a-right mg-right-5px">Thời gian:</div>
                                                <div style={{ marginLeft: "5px" }}>
                                                    <ComboBox
                                                        options={this.timeFilters}
                                                        placeHolder="Chọn thời gian"
                                                        onOptionChanged={(selectedOption) => this.onTimeFilterOptionChanged(selectedOption)}
                                                        id="search-post-time-filter-combobox"
                                                    ></ComboBox>
                                                </div>
                                            </div>
                                            {combobox}
                                        </div>

                                        <div className="gray-label margin-bottom-10px"> Tổng số kết quả: {this.props.postSearchResult.length}  </div>
                                        <div className="list-item-container">{postSearchResult}</div>
                                    </div>
                                    < Paginator config={{
                                        changePage: (pageNumber) => this.onPageChange(pageNumber),
                                        pageCount: 1,
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
        postSearchResult: state.post.postsList.data,
        postCategories: state.post_category.categories.data,
        isListLoading: state.post.postsList.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostSearch, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPost));

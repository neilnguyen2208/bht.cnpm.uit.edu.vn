import React, { Component } from "react";
import Tag from "components/common/Tag/Tag"
import { getPostSearchResult } from "redux/services/postServices"
import { getPostCategories } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getSearchParamByName, isContainSpecialCharacter, setSearchParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import PostSummary from 'components/post/PostSummary'
import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js'
import SearchHorizontalMenubar from './SearchHorizontalMenubar'
class SearchCourses extends Component {
    constructor(props) {
        super(props);
        this.postSearchResult = [];
        this.timeFilters = [
            { id: 1, name: "Mới nhất" },
            { id: 2, name: "Cũ nhất" }
        ]

        this.state = {
            searchTerm: getSearchParamByName('q')
        }
    }

    async componentDidMount() {
        let page = !getSearchParamByName('page') ? '' : getSearchParamByName('page');
        let category = !getSearchParamByName('category') ? '' : getSearchParamByName('category')
        let searchTerm = !getSearchParamByName('q') ? '' : getSearchParamByName('q');
        this.props.getPostCategories();
        this.props.getPostSearchResult(page, category, searchTerm, 'publishDtm,desc'); //api khác, tìm bằng tag
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setSearchParam("page", pageNumber);
        let page = getSearchParamByName('page') === '' ? '' : `page = ${getSearchParamByName('page')} `;
        let category = getSearchParamByName('category');
        let searchTerm = decodeURIComponent(getSearchParamByName('q')); //querry

        // this.props.getPostSearchResult(query); //api khác, tìm bằng tag
        this.setState({});
    }

    onTimeFilterOptionChanged = (selectedOption) => {
        if (selectedOption.id === 1) {
            this.setState({ time: 'publishDtm,asc' })
        }
        else {
            this.setState({ time: 'publishDtm,desc' })
        }
    }

    onCategoryFilterOptionChanged = (selectedOption) => {
        setSearchParam("category", selectedOption.id);
    }

    render() {
        console.log(this.props);
        if (!this.props.isListLoading) {
            this.postSearchResult = this.props.postSearchResult.map((postItem) => (
                <PostSummary
                    type={itemType.normal}
                    key={postItem.id}
                    id={postItem.id}
                    authorName={postItem.authorName}
                    authorID={postItem.authorID}
                    publishDtm={postItem.publishDtm}
                    category={postItem.categoryName}
                    categoryID={postItem.categoryID}
                    title={postItem.title}
                    summary={postItem.summary}
                    imageURL={postItem.imageURL}
                    // likedStatus={postItem.likedStatus}
                    // savedStatus={postItem.savedStatus}
                    readingTime={postItem.readingTime}
                    // likes={postItem.likes}
                    // comments={postItem.commentCount}
                    approveStatus={false}
                ></PostSummary >)
            )
        }

        if (!this.isCategoryLoading) {
            this.categoryFilters = this.props.postCategories;
        }

        return (
            <div className="pr-layout" >
                <div className="search-layout">
                    <SearchHorizontalMenubar></SearchHorizontalMenubar>
                    <div className="mg-top-10px" />
                    <div className="nm-bl-layout-router-outlet" >
                        Search courses ...
                        {/* <div>
                            {
                                this.props.isListLoading || this.props.isCategoryLoading ?
                                    < Loader /> :
                                    <div>
                                        <div>
                                            <div className="two-element-filter-container">
                                                <div className = "d-flex">
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
                                                <div className = "d-flex">
                                                    <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                                                    <div style={{ marginLeft: "5px" }}>
                                                        <ComboBox
                                                            // selectedOptionID={getSearchParamByName('category') ? getSearchParamByName('category') : 1}
                                                            options={this.categoryFilters}
                                                            placeHolder="Chọn danh mục"
                                                            onOptionChanged={(selectedOption) => this.onCategoryFilterOptionChanged(selectedOption)}
                                                            id="search-post-category-filter-combobox"
                                                        ></ComboBox>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="gray-label margin-bottom-10px"> Tổng số kết quả: {this.props.postSearchResult.length}  </div>
                                            <div className="list-item-container">{this.postSearchResult}</div>
                                        </div>
                                        < Paginator config={{
                                            changePage: (pageNumber) => this.onPageChange(pageNumber),
                                            pageCount: 1,
                                            currentPage: getSearchParamByName('page') ? getSearchParamByName('page') : 1
                                        }} />
                                    </div>
                            }
                        </div> */}
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
    getPostSearchResult, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchCourses));

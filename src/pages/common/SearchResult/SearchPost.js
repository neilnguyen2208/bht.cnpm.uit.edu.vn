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
import SearchHorizontalMenubar from './SearchHorizontalMenubar'

import PostNormalReactionbar from 'components/post/NormalReactionbar'
import PostSummaryMetadata from 'components/post/SummaryInfo'

import { itemType } from 'constants.js';
class SearchPost extends React.Component {


    componentDidMount() {
        //TODO: change initiate category
        this.queryParamObject = {
            "category": getQueryParamByName('category') ? getQueryParamByName('category') : 0,
            "page": 1,
            "tab": 'REVELANT',
            "q": getQueryParamByName('q') ? getQueryParamByName('q') : '',
        }

        this.searchParamObject = {
            "page": 1,
            "advancedSort": null,
            "postCategoryID": getQueryParamByName('category'),
            "sortByPublishDtm": "desc",
            "searchTerm": getQueryParamByName('q') ? getQueryParamByName('q') : ''
        }

        setQueryParam(this.queryParamObject);
        this.props.getPostCategoriesHaveAll();
        this.props.getPostSearch(this.searchParamObject);
    }

    componentWillUnmount() {
        // if()
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
            "sortByPublishDtm": selectedOption.sort
        }
        this.props.getPostSearch(this.searchParamObject);
        this.setState({});
    }

    onCategoryOptionChange = (selectedOption) => {
        setQueryParam({
            ...this.queryParamObject,
            "q": getQueryParamByName("q"),
            "page": 1,
            "category": selectedOption.id
        });
        this.searchParamObject = {
            ...this.searchParamObject,
            "postCategoryID": selectedOption.id,
            "searchTerm": getQueryParamByName("q"),
            "page": 1
        }
        this.props.getPostSearch(this.searchParamObject);
        this.setState({});
    }

    onFilterClick = (filter) => {
        switch (filter) {
            case "HOT": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    "page": 1,
                    tab: "HOT",
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    q: getQueryParamByName("q"),

                }
                setQueryParam(this.queryParamObject);
                this.searchParamObject = {
                    "page": 1,
                    "searchTerm": getQueryParamByName("q"),
                    "advancedSort": "HOT",
                    "postCategoryID": getQueryParamByName('category') ? getQueryParamByName('category') : 0
                }
                this.props.getPostSearch(this.searchParamObject)
                this.setState({});
                return;
            }
            case "BEST": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    "page": 1,
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    tab: "BEST",
                    q: getQueryParamByName("q"),

                }
                setQueryParam(this.queryParamObject);
                this.searchParamObject = {
                    "page": 1,
                    "searchTerm": getQueryParamByName("q"),
                    "advancedSort": "BEST",
                    "postCategoryID": getQueryParamByName('category') ? getQueryParamByName('category') : 0
                }
                this.props.getPostSearch(this.searchParamObject)
                this.setState({});
                return;
            }
            case "NEWEST": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    "page": 1,
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    tab: "NEWEST",
                    q: getQueryParamByName("q"),

                }
                setQueryParam(this.queryParamObject);
                this.searchParamObject = {
                    "page": 1,
                    "searchTerm": getQueryParamByName("q"),
                    "advancedSort": "NEWEST",
                    "postCategoryID": getQueryParamByName('category') ? getQueryParamByName('category') : 0
                }
                this.props.getPostSearch(this.searchParamObject)
                this.setState({});
                return;
            }
            case "TOP": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    page: 1,
                    tab: "TOP",
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    q: getQueryParamByName("q"),

                }
                setQueryParam(this.queryParamObject);
                this.searchParamObject = {
                    "page": 1,
                    "searchTerm": getQueryParamByName("q"),
                    "advancedSort": "TOP",
                    "postCategoryID": getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                }
                this.props.getPostSearch(this.searchParamObject);
                this.setState({});
                return;
            }
            default: {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    page: 1,
                    q: getQueryParamByName("q") ? getQueryParamByName("q") : '',
                    tab: "REVELANT",
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0
                }
                this.searchParamObject = {
                    ...this.searchParamObject,
                    "advancedSort": null,
                    "searchTerm": getQueryParamByName("q"),
                    "postCategoryID": getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    "page": 1,
                }
                setQueryParam(this.queryParamObject);
                this.props.getPostSearch(this.searchParamObject);
                this.setState({});
                return;
            }
        }
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
                        popUpMenuPrefix="srchppu"   //stand for search post popup 
                        authorAvatarURL={item.authorAvatarURL}
                        //
                        reloadList={() => this.reloadList()}
                    />
                    <PostNormalReactionbar
                        postID={item.id}
                        likeCount={item.likeCount}
                        viewCount={item.viewCount}
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
            combobox = <div className="j-c-space-between" style={{ marginTop: "50px" }}>
                <div className="d-flex">
                    <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                    <div className="mg-left-5px">
                        <ComboBox
                            selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 0}
                            options={this.props.postCategories}
                            onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                            comboboxId="spcf-combobox" //post search category filter
                        ></ComboBox>
                    </div>
                </div>
                <div className="r-h-filter-c" style={{ marginTop: "-63px" }}>
                    <div className="h-filter">
                        <div className={!getQueryParamByName("tab") ||
                            (getQueryParamByName("tab") !== "TOP"
                                && getQueryParamByName("tab") !== "BEST"
                                && getQueryParamByName("tab") !== "NEWEST"
                                && getQueryParamByName("tab") !== "HOT"
                            )
                            ? "h-filter-item active first" : "h-filter-item first"}
                            onClick={() => this.onFilterClick("REVELANT")}
                        > Liên quan</div>

                        <div className={getQueryParamByName("tab") === "HOT" ?
                            "h-filter-item active" : "h-filter-item"}
                            onClick={() => this.onFilterClick("HOT")}
                        > Đang hot</div>

                        <div className={getQueryParamByName("tab") === "BEST"
                            ? "h-filter-item active" : "h-filter-item"}
                            onClick={() => this.onFilterClick("BEST")}
                        >Tốt nhất</div>

                        <div className={getQueryParamByName("tab") === "NEWEST"
                            ? "h-filter-item active" : "h-filter-item"}
                            onClick={() => this.onFilterClick("NEWEST")}
                        >Mới nhất</div>

                        <div className={getQueryParamByName("tab") === "TOP"
                            ? "h-filter-item last active" : "h-filter-item last"}
                            onClick={() => this.onFilterClick("TOP")}
                        >Lượt thích</div>
                    </div>
                </div>

            </div >

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
                                    <div className="gray-label" style={{ marginBottom: "20px" }}>  Tổng số kết quả: {this.props.totalElements}  </div>
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
        postCategories: state.postCategory.categories.searchData,
        isListLoading: state.post.postsList.isLoading,
        isCategoryLoading: state.postCategory.categories.isLoading,
        postSearchResult: state.post.postsList.data,

        totalPages: state.post.postsList.totalPages,
        totalElements: state.post.postsList.totalElements,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostSearch, getPostCategoriesHaveAll
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPost));

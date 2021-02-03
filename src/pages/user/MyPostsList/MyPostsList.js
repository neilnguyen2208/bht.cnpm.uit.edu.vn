/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import PostSummary from 'components/post/PostSummary';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';

//import for redux
import { getMyPostsList } from "redux/services/postServices";
import { getPostCategories } from "redux/services/postCategoryServices";

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getSearchParamByName, isContainSpecialCharacter, setSearchParam } from 'utils/urlUtils'

import Loader from 'components/common/Loader/Loader'
import UserSidebar from 'layouts/UserSidebar'

//Sample URL: http://localhost:3000/user/my-posts?page=3&category=1
class MyPostsList extends Component {
    constructor(props) {
        super();

        this.filter = [
            { id: 1, name: "Tất cả" },
            { id: 2, name: "Chưa phê duyệt" },
            { id: 3, name: "Đã phê duyệt" },
            { id: 4, name: "Cần xem lại" }
        ]

        this.myPostsList = <></>
    }

    async componentDidMount() {
        this.props.getPostCategories()

        //get filter
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');

        this.props.getMyPostsList(page, category);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setSearchParam("page", pageNumber);
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getMyPostsList(page, category);
        this.setState({});
    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setSearchParam("category", selectedOption.id);
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getMyPostsList(page, category);
        this.setState({});
    }

    render() {

        if (!this.props.isListLoading) {
            this.myPostsList = this.props.myPostsList.map((postItem) => (
                <PostSummary
                    type={itemType.mySelf}
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
                    likedStatus={postItem.likedStatus}
                    savedStatus={postItem.savedStatus}
                    readingTime={postItem.readingTime}
                    likes={postItem.likeCount}
                    comments={postItem.commentCount}
                    approveState={postItem.postState}
                ></PostSummary >)
            )
        }

        if (!this.props.isCategoryLoading && this.props.postCategories.length !== 0) {


            this.filter = this.props.postCategories;
        }


        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="BÀI VIẾT CỦA TÔI" />
                    <div className="content-container">
                        <div className="two-element-filter-container">
                            <div style={{ display: "flex" }}>
                                <div className="filter-label t-a-right mg-right-5px">Bộ lọc:</div>
                                <div style={{ marginLeft: "5px" }}>
                                    <ComboBox
                                        selectedOptionID={getSearchParamByName('category') ? getSearchParamByName('category') : 1}
                                        options={this.filter}
                                        placeHolder="Chọn danh mục"
                                        onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                        id="my-post-list-search-filter-combobox"
                                    ></ComboBox>
                                </div>
                            </div>

                            <div className="filter-label d-flex">
                                <div className="mg-right-5px">Tổng số:</div>

                                {!this.props.isListLoading ?
                                    <div> {this.props.myPostsList.length}</div>
                                    : <div>0</div>
                                }
                            </div>
                        </div>

                        {this.props.isListLoading ?
                            < Loader /> :
                            <>{this.myPostsList}</>
                        }

                        <Paginator config={{
                            changePage: (pageNumber) => this.onPageChange(pageNumber),
                            pageCount: 1,
                            currentPage: getSearchParamByName('page')
                        }}
                        />
                    </div>
                </div >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPostsList));

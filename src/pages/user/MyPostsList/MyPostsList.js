/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import PostSummary from 'components/post/PostSummary';
import { itemType, approveStatusOptions } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';

//import for redux
import { getMyPostsList } from "redux/services/postServices";
import { getPostCategoriesHaveAll } from "redux/services/postCategoryServices";
import "components/common/Loader/Loader.scss";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getSearchParamByName, setSearchParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import UserSidebar from 'layouts/UserSidebar'

//Sample URL: http://localhost:3000/user/my-posts?page=3&category=1
class MyPostsList extends Component {
    constructor(props) {
        super();
        this.myPostsList = <div>
            {DocPostSummaryLoader()}
            {DocPostSummaryLoader()}
            {DocPostSummaryLoader()}
        </div>

        this.searchTermObject = {
            page: 0,
            "category.id": '',
            sort: 'publishDtm,desc',
            postState: ''
        }
    }

    componentDidMount() {
        this.props.getPostCategoriesHaveAll();
        this.searchTermObject = {
            page: getSearchParamByName('page') - 1,
            "category.id": getSearchParamByName('category') && getSearchParamByName('category') !== "0" ? getSearchParamByName('category') : null,
            sort: 'publishDtm,desc',
            postState: ''
        }
        this.props.getMyPostsList(this.searchTermObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setSearchParam("page", pageNumber);
        this.searchTermObject = {
            ...this.searchTermObject,
            page: getSearchParamByName('page') - 1
        }
        this.props.getMyPostsList(this.searchTermObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        setSearchParam("category", selectedOption.id);
        this.searchTermObject = {
            ...this.searchTermObject,
            "category.id": selectedOption.id,
        }
        this.props.getMyPostsList(this.searchTermObject);
        this.setState({});
    }

    onApproveOptionChange = (selectedOption) => {
        this.searchTermObject = {
            ...this.searchTermObject,
            postState: selectedOption.postState
        }
        this.props.getMyPostsList(this.searchTermObject);
        this.setState({});
    }

    render() {
        if (!this.props.isCategoryLoading && this.props.postCategories.length !== 0) {
            this.comboboxsGroup =
                <div className="two-element-filter-container">
                    <div className="d-flex">
                        <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                selectedOptionID={getSearchParamByName('category') ? getSearchParamByName('category') : 0}
                                options={this.props.postCategories}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                                id="my-post-list-category-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="filter-label t-a-right mg-right-5px">Trạng thái duyệt:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                options={approveStatusOptions}
                                placeHolder="Tất cả"
                                onOptionChanged={(selectedOption) => this.onApproveOptionChange(selectedOption)}
                                id="my-post-list-approve-status-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                </div>
        }
        else this.comboboxsGroup = <div className="two-element-filter-container">
            <div className="d-flex">
                <div className="timeline-item d-flex">
                    <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
                </div>
            </div>
            <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
            </div>
        </div>

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
        else
            this.myPostsList = <div>
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
            </div>

        return (
            <div className="left-sidebar-layout" >
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="BÀI VIẾT CỦA TÔI" />
                    <div className="content-container">
                        {this.comboboxsGroup}

                        <div className="filter-label d-flex">
                            {!this.props.isListLoading ? <div className="d-flex">
                                <div className="mg-right-5px mg-bottom-5px">Tổng số:</div>
                                <div> {this.props.myPostsList.length}</div>
                            </div>
                                :
                                <div className="d-flex">
                                    <div className="timeline-item d-flex">
                                        <div className="animated-background" style={{ width: "120px", height: "20px" }}></div>
                                    </div>
                                </div>
                            }
                        </div>

                        {this.myPostsList}

                        {!this.props.isListLoading ?
                            <Paginator config={{
                                changePage: (pageNumber) => this.onPageChange(pageNumber),
                                pageCount: this.props.totalPages,
                                currentPage: parseInt(getSearchParamByName('page'))
                            }}
                            /> :
                            <div className="d-flex">
                                <div className="timeline-item d-flex">
                                    <div className="animated-background" style={{ width: "120px", height: "20px" }}></div>
                                </div>
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
        myPostsList: state.post.myPosts.data,
        postCategories: state.post_category.categories.searchData,
        totalPages: state.post.myPosts.totalPages,
        isListLoading: state.post.myPosts.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyPostsList, getPostCategoriesHaveAll
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPostsList));

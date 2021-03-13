
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
import { NavLink } from 'react-router-dom'
//import for redux
import { getPendingPosts } from "redux/services/postServices";
import { getPostCategoriesHaveAll } from "redux/services/postCategoryServices";
import RequestInfo from 'components/post/RequestInfo'
import SummaryInfo from 'components/post/SummaryInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
import PostManagementNavbar from './PostManagementNavbar'
import RequestReactionbar from 'components/post/RequestReactionbar'

class PostApproving extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {

        this.queryParamObject = {
            category: 0,
            page: 1
        }

        this.props.getPostCategoriesHaveAll();
        setQueryParam(this.queryParamObject);

        this.searchParamObject = {
            paginator: getQueryParamByName('page'),
            category: getQueryParamByName('category') && getQueryParamByName('category') !== "0" ? getQueryParamByName('category') : null,
            postState: 'PENDING_APPROVAL',
        }

        this.props.getPendingPosts(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ ...this.queryParamObject, page: pageNumber });
        this.searchParamObject = {
            ...this.searchParamObject,
            paginator: getQueryParamByName('page'),
        }
        this.props.getPendingPosts(this.searchParamObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, page: 1, "category": selectedOption.id });
        this.searchParamObject = {
            ...this.searchParamObject,
            "category": selectedOption.id,
            postState: 'PENDING_APPROVAL',
            paginator: 1
        }
        this.props.getPendingPosts(this.searchParamObject);
        this.setState({});
    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.postsList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                paginator: this.searchParamObject.page, //vl chua => do trong db luu page tu 0 con trong fe luu tu 1
            }
        setQueryParam(this.queryParamObject);

        this.props.getPendingPosts(this.searchParamObject);
    }

    render() {
        //combobox
        if (!this.props.isCategoryLoading && this.props.postCategories.length !== 0) {
            this.comboboxGroup =
                <div className="filter-container">
                    <div className="d-flex">
                        <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 0}
                                options={this.props.postCategories}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                                id="post-approving-category-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                </div>
        }
        else this.comboboxGroup = <div className="filter-container">
            <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
            </div>
        </div>

        if (!this.props.isListLoading && this.props.postsList) {
            this.postsList = this.props.postsList.map((item) => (
                <div className="item-container">
                    <RequestInfo
                        id={item.id}
                        authorName={item.authorName}
                        authorID={item.authorID}
                        categoryName={item.categoryName}
                        categoryID={item.categoryID}
                        requestedTime={"20:20:20"}
                        requestedDate={"1/3/2021"}
                        title={item.title}
                    />
                    <SummaryInfo
                        type={itemType.approval}
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
                        popUpMenuPrefix="papu"   //stand for post approving popup 
                        authorAvatarURL={item.authorAvatarURL}
                        //
                        reloadList={() => this.reloadList()}
                    />
                    <RequestReactionbar
                        id={item.id}
                        reloadList={() => this.reloadList()} />
                </div>
            ))
        }

        if (!this.props.isCategoryLoading && this.props.postCategories.length !== 0) {

            this.filter = this.props.postCategories;
        }
        return (
            <div className="left-sidebar-layout">
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ BÀI VIẾT" />
                    <div className="content-container">
                        <PostManagementNavbar />

                        {this.comboboxGroup}
                        {!this.props.isListLoading && this.props.postsList ?
                            <>
                                <div className="filter-label d-flex mg-bottom-10px">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> {this.props.totalElements}</div>
                                </div>
                                <>{this.postsList}</>
                                <Paginator config={{
                                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                                    pageCount: this.props.totalPages,
                                    currentPage: getQueryParamByName('page')
                                }}
                                />
                            </>
                            :
                            <div>
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                            </div>
                        }
                    </div>
                </div >
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state.post.pendingPosts)
    return {
        //pending posts list
        postsList: state.post.pendingPosts.data,
        isListLoading: state.post.pendingPosts.isLoading,
        totalPages: state.post.pendingPosts.totalPages,
        totalElements: state.post.pendingPosts.totalElements,

        //category
        postCategories: state.post_category.categories.searchData,
        isCategoryLoading: state.post_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPendingPosts, getPostCategoriesHaveAll
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostApproving));
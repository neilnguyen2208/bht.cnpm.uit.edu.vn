
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
import { NavLink } from 'react-router-dom'
//import for redux
import { getPendingPosts } from "redux/services/postServices";
import { getPostCategoriesHaveAll } from "redux/services/postCategoryServices";
import RequestSummary from 'components/post/RequestSummary'
import Modal from "components/common/Modal/AlertModal"
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import Loader from 'components/common/Loader/Loader'
import AdminSidebar from 'layouts/AdminSidebar'

class PostApproving extends Component {
    constructor(props) {
        super();





    }

    componentDidMount() {
        this.searchParamObject = {
            "page": 0,
            "category": null,
            "postState": ''
        }
        
        this.queryParamObject = {
            "category": 0,
            "page": 1
        }

        this.props.getPostCategoriesHaveAll();
        if (!getQueryParamByName('category') || !getQueryParamByName('page'))
            setQueryParam(this.queryParamObject);
        else if (getQueryParamByName('page') <= 0) {
            setQueryParam({ ...this.queryParamObject, "page": 1 });
        }

        this.searchParamObject = {
            paginator: getQueryParamByName('page') - 1,
            "category": getQueryParamByName('category') && getQueryParamByName('category') !== "0" ? getQueryParamByName('category') : null,
            postState: 'PENDING_APPROVAL',
        }
        console.log()
        this.props.getPendingPosts(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ "page": pageNumber });
        this.searchParamObject = {
            ...this.searchParamObject,
            paginator: getQueryParamByName('page') - 1,
            postState: 'PENDING_APPROVAL'
        }
        this.props.getPendindPosts(this.searchParamObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        setQueryParam({ "category": selectedOption.id });
        this.searchParamObject = {
            ...this.searchParamObject,
            "category": selectedOption.id,
            postState: 'PENDING_APPROVAL'
        }
        this.props.getPendingPosts(this.searchParamObject);
        this.setState({});
    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.postsList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                paginator: this.searchParamObject.page - 1, //vl chua => do trong db luu page tu 0 con trong fe luu tu 1
            }
        setQueryParam({ "page": this.searchParamObject.page });

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
                <RequestSummary
                    type={itemType.mySelf}
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
                    avatarURL={item.avatarURL}
                    requestedTime={"20:20:20"}
                    requestedDate={"1/3/2021"}
                    //
                    reloadList={() => this.reloadList()}
                />))
        }

        if (!this.props.isCategoryLoading && this.props.postCategories.length !== 0) {

            this.filter = this.props.postCategories;
        }
        return (
            <div className="left-sidebar-layout">
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="DUYỆT BÀI VIẾT" />
                    <div className="content-container">
                        <div className="h-menu-bar mg-top-10px">
                            <NavLink to="/admin/post-management/" className="h-menu-item" activeClassName='h-menu-item a-h-menu-item'>
                                Quản lý bài viết
                             </NavLink>
                            <NavLink to="/admin/post-approving/" className="h-menu-item " activeClassName='h-menu-item a-h-menu-item'>
                                Duyệt bài viết
                            </NavLink>
                        </div>

                        {this.comboboxGroup}
                        {!this.props.isListLoading && this.props.postsList ?
                            <div className="filter-label d-flex mg-bottom-10px">
                                <div className="mg-right-5px">Tổng số:</div>
                                <div> {this.props.postsList.length}</div>
                            </div> : <></>
                        }

                        {this.props.isListLoading ?
                            <div>
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                            </div> :
                            <>{this.postsList}</>
                        }

                        <Paginator config={{
                            changePage: (pageNumber) => this.onPageChange(pageNumber),
                            pageCount: 1,
                            currentPage: getQueryParamByName('page')
                        }}
                        />
                    </div>
                </div >
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        postsList: state.post.pendingPosts.data,
        postCategories: state.post_category.categories.searchData,
        isListLoading: state.post.pendingPosts.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPendingPosts, getPostCategoriesHaveAll
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostApproving));
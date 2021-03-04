
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
import { getSearchParamByName, setSearchParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import Loader from 'components/common/Loader/Loader'
import AdminSidebar from 'layouts/AdminSidebar'

class PostApproving extends Component {
    constructor(props) {
        super();





    }

    componentDidMount() {
        this.searchTermObject = {
            "page": 0,
            "category": null,
            "postState": ''
        }
        
        this.searchParamObject = {
            "category": 0,
            "page": 1
        }

        this.props.getPostCategoriesHaveAll();
        if (!getSearchParamByName('category') || !getSearchParamByName('page'))
            setSearchParam(this.searchParamObject);
        else if (getSearchParamByName('page') <= 0) {
            setSearchParam({ ...this.searchParamObject, "page": 1 });
        }

        this.searchTermObject = {
            paginator: getSearchParamByName('page') - 1,
            "category": getSearchParamByName('category') && getSearchParamByName('category') !== "0" ? getSearchParamByName('category') : null,
            postState: 'PENDING_APPROVAL',
        }
        console.log()
        this.props.getPendingPosts(this.searchTermObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setSearchParam({ "page": pageNumber });
        this.searchTermObject = {
            ...this.searchTermObject,
            paginator: getSearchParamByName('page') - 1,
            postState: 'PENDING_APPROVAL'
        }
        this.props.getPendindPosts(this.searchTermObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        setSearchParam({ "category": selectedOption.id });
        this.searchTermObject = {
            ...this.searchTermObject,
            "category": selectedOption.id,
            postState: 'PENDING_APPROVAL'
        }
        this.props.getPendingPosts(this.searchTermObject);
        this.setState({});
    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.postsList.length === 1 && this.searchTermObject.page > 1)
            this.searchTermObject = {
                ...this.searchTermObject,
                paginator: this.searchTermObject.page - 1, //vl chua => do trong db luu page tu 0 con trong fe luu tu 1
            }
        setSearchParam({ "page": this.searchTermObject.page });

        this.props.getPendingPosts(this.searchTermObject);
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
                                selectedOptionID={getSearchParamByName('category') ? getSearchParamByName('category') : 0}
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
                            currentPage: getSearchParamByName('page')
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
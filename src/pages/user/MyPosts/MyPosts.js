/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType, userPostApproveStatusOptions } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';

//import for redux
import { getMyPosts } from "redux/services/postServices";
import { getPostCategoriesHaveAll } from "redux/services/postCategoryServices";
import "components/common/Loader/Loader.scss";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import UserSidebar from 'layouts/UserSidebar'
import PostNormalReactionbar from 'components/post/NormalReactionbar'
import PostSummaryMetadata from 'components/post/SummaryInfo'
import store from 'redux/store/index'
import { delete_APostReset, put_EditAPostReset } from 'redux/actions/postAction'

//Sample URL: http://localhost:3000/user/my-posts?page=3&category=1
class MyPosts extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.searchParamObject = {
            "page": 1,
            "category.id": null,
            "postState": ''
        }

        this.queryParamObject = {
            "category": 0,
            "page": 1
        }

        //force default properties, can't access by querry param
        setQueryParam(this.queryParamObject);

        this.props.getPostCategoriesHaveAll();
        this.props.getMyPosts(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        this.queryParamObject = {
            ...this.queryParamObject,
            "page": pageNumber
        }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page')
        }
        this.props.getMyPosts(this.searchParamObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        this.queryParamObject = { ...this.queryParamObject, category: selectedOption.id, page: 1 }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            "category.id": selectedOption.id,
            page: 1
        }
        this.props.getMyPosts(this.searchParamObject);
        this.setState({});
    }

    onApproveOptionChange = (selectedOption) => {
        this.queryParamObject = { ...this.queryParamObject, page: 1 };
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            page: 1,
            postState: selectedOption.postState
        }
        this.props.getMyPosts(this.searchParamObject);
        this.setState({});
    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.myPostsList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                page: this.searchParamObject.page, //vl chua => do trong db luu page tu 0 con trong fe luu tu 1
            }
        setQueryParam(this.queryParamObject);

        this.props.getMyPosts(this.searchParamObject);
    }

    render() {

        //reload the list when any item has been deleted or edited:
        if (this.props.isHaveDeleted) {
            this.reloadList();
            store.dispatch(delete_APostReset())
        }

        if (this.props.isHaveEdited) {
            this.reloadList();
            store.dispatch(put_EditAPostReset())
        }

        if (!this.props.isCategoryLoading && this.props.postCategories.length !== 0) {
            this.comboboxGroup =
                <div className="filter-container j-c-space-between">
                    <div className="d-flex">
                        <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : "0"}
                                options={this.props.postCategories}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                                comboboxId="my-post-list-category-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="filter-label t-a-right mg-right-5px">Trạng thái duyệt:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                options={userPostApproveStatusOptions}
                                placeHolder="Tất cả"
                                onOptionChanged={(selectedOption) => this.onApproveOptionChange(selectedOption)}
                                comboboxId="my-post-list-approve-status-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                </div>
        }
        else this.comboboxGroup = <div className="filter-container j-c-space-between ">
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
            if (this.props.myPostsList.length !== 0)
                this.myPostsList = this.props.myPostsList.map((item) => {
                    return <div className="item-container" key={item.id}>
                        <PostSummaryMetadata
                            type={itemType.mySelf}
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
                            popUpMenuPrefix="mppu"   //stand for my post popup 
                            authorAvatarURL={item.authorAvatarURL}
                            availableActions={item.availableActions}
                            feedback={item.feedback}
                            reloadList={() => this.reloadList()}
                            useAction={true}
                            postBusinessState={item.postBusinessState}
                        />
                        <PostNormalReactionbar
                            postID={item.id}
                            availableActions={item.availableActions}
                            likeCount={item.likeCount}
                            commentCount={item.commentCount}
                            likedStatus={item.likeStatus}
                            savedStatus={item.savedStatus}
                            useAction={true}
                            viewCount={item.viewCount}
                        />
                    </div >
                })
            else
                this.myPostsList = <div>Không có kết quả nào!</div>;
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
                        {this.comboboxGroup}

                        {!this.props.isListLoading && this.props.myPostsList ?
                            <>
                                <div className="sum-item-label">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> {this.props.totalElements}</div>
                                </div>
                                <div >{this.myPostsList}</div>
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
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myPostsList: state.post.myPosts.data,
        postCategories: state.postCategory.categories.searchData,
        totalPages: state.post.myPosts.totalPages,
        totalElements: state.post.myPosts.totalElements,
        isListLoading: state.post.myPosts.isLoading,
        isCategoryLoading: state.postCategory.categories.isLoading,

        //handle 2 actions: delete and edit
        isHaveDeleted: state.post.isHaveDeleted,
        isHaveEdited: state.post.isHaveEdited,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyPosts, getPostCategoriesHaveAll,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPosts));

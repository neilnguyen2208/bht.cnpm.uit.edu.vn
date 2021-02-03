/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'layouts/Layout.scss'

//utils
import { itemType } from 'constants.js'
import { getSearchParamByName, setSearchParam } from 'utils/urlUtils'
//services
import { getPostsList } from "redux/services/postServices"
import { getPostCategories } from "redux/services/postCategoryServices"

//components
import ComboBox from 'components/common/Combobox/Combobox';
import Titlebar from 'components/common/Titlebar/Titlebar'
import PostSummary from 'components/post/PostSummary'
import Paginator from 'components/common/Paginator/ServerPaginator'
import Loader from 'components/common/Loader/Loader'

class PostsList extends Component {
    constructor(props) {
        super();

        this.maxItemPerPage = 5;
        this.postsList = [];

        this.categoryFilter = [
            { id: 1, name: "Tất cả" },
            { id: 2, name: "Chưa phê duyệt" },
            { id: 3, name: "Đã phê duyệt" },
            { id: 4, name: "Cần xem lại" }
        ]

        this.timeFilter = [
            { id: 1, name: "Mới nhất" },
            { id: 2, name: "Cũ nhất" }
        ]

    }

    componentDidMount() {
        this.props.getPostCategories()

        //get filter
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');

        this.props.getPostsList(page, category);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setSearchParam("page", pageNumber);
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getPostsList(page, category);
        this.setState({});
    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setSearchParam("category", selectedOption.id);
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getPostsList(page, category);
        this.setState({});
    }

    render() {

        let postsList;
        if (this.props.postsList) {

            this.postsList = this.props.postsList;

            postsList = this.props.postsList.map((postItem) => (
                <PostSummary
                    type={itemType.normal}
                    key={postItem.id}
                    id={postItem.id}
                    authorName={postItem.authorName}
                    authorID={postItem.authorID}
                    publishDtm={postItem.publishDtm}
                    category={postItem.category}
                    categoryID={postItem.categoryID}
                    title={postItem.title}
                    summary={postItem.summary}
                    imageURL={postItem.imageURL}
                    likedStatus={postItem.likedStatus}
                    savedStatus={postItem.savedStatus}
                    readingTime={postItem.readingTime}
                    likes={3} //
                    commentCount={4} //
                    approveStatus={false}

                ></PostSummary >)
            )
        }
        return (
            <div className="nm-bl-layout">
                <Titlebar title="BÀI VIẾT" />
                <div className="layout-decoration">
                    <div className="mg-top-10px" />
                    <div className = "mg-bottom-10px j-c-space-between">
                        <div style={{ display: "flex" }}>
                            <div className="filter-label t-a-right mg-right-5px">Thời gian:</div>
                            <div style={{ marginLeft: "5px" }}>
                                <ComboBox
                                    options={this.timeFilter}
                                    placeHolder="Chọn bộ lọc"
                                    onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                    id="post-list-time-filter-combobox"
                                ></ComboBox></div>
                        </div>

                        <div style={{ display: "flex" }}>
                            <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                            <div style={{ marginLeft: "5px" }}>
                                <ComboBox
                                    options={this.categoryFilter}
                                    placeHolder="Chọn danh mục"
                                    onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                    id="my-post-list-category-filter-combobox"
                                ></ComboBox></div>
                        </div>

                    </div>
                    <div className="mg-top-10px" />

                    {this.props.isListLoading ?
                        < Loader /> :
                        <>{postsList}</>
                    }


                    <Paginator config={{
                        changePage: (pageNumber) => this.onPageChange(pageNumber),
                        pageCount: 30,
                        currentPage: getSearchParamByName('page')
                    }}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        postsList: state.post.postsList.data,
        postCategories: state.post_category.categories.data,
        isListLoading: state.post.postsList.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostsList, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));

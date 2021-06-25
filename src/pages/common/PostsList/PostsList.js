import React from 'react';
import { getPostSearch } from "redux/services/postServices"
import { getPostCategoriesHaveAll } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'

import Loader from 'components/common/Loader/Loader'

import HomeFirstInfo from 'components/post/HomeFirstInfo';
import HomeTextInfo from 'components/post/HomeTextInfo';
import highlight_icon from 'assets/icons/48x48/highlights_icon_48x48.png'

class PostsList extends React.Component {

    componentDidMount() {
        this.queryParamObject = {
            "category": 0,
            "page": 1,
        }

        this.searchParamObject = {
            "page": 1,
            "postCategoryID": null,
            "sortByPublishDtm": "publishDtm,desc",
            searchTerm: ''
        }

        setQueryParam(this.queryParamObject)
        this.props.getPostCategoriesHaveAll();
        this.props.getPostSearch(this.searchParamObject);
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
            sortByPublishDtm: selectedOption.sort
        }
        this.props.getPostSearch(this.searchParamObject);
        this.setState({});
    }

    onCategoryOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, "page": 1, "category": selectedOption.id });
        this.searchParamObject = {
            ...this.searchParamObject,
            "postCategoryID": selectedOption.id,
            "page": 1
        }
        this.props.getPostSearch(this.searchParamObject);
        this.setState({});
    }

    renderThreeItem = (items) => { }

    render() {
        let postSearchResult = <></>;
        if (!this.props.isListLoading) {
            postSearchResult = this.props.postSearchResult.map((postItem, index) => {
                if (index === 1)
                    return < div className="home-item-container" key={postItem.id} >
                        <HomeTextInfo
                            authorAvatarURL={postItem.authorAvatarURL}
                            key={postItem.id}
                            id={postItem.id}
                            authorDisplayName={postItem.authorDisplayName}
                            authorID={postItem.authorID}
                            publishDtm={postItem.publishDtm}
                            categoryName={postItem.categoryName}
                            categoryID={postItem.categoryID}
                            title={postItem.title}
                            summary={postItem.summary}
                            imageURL={postItem.imageURL}
                            likeStatus={postItem.likeStatus}
                            savedStatus={postItem.savedStatus}
                            readingTime={postItem.readingTime}
                            likeCount={postItem.likeCount}
                            viewCount={postItem.viewCount}
                            commentCount={postItem.commentCount}
                        ></HomeTextInfo>
                    </div >
                if (index === 2)
                    return < div className="home-item-container" key={postItem.id} style={{ marginTop: "20px" }}>
                        <HomeTextInfo
                            authorAvatarURL={postItem.authorAvatarURL}
                            key={postItem.id}
                            id={postItem.id}
                            authorDisplayName={postItem.authorDisplayName}
                            authorID={postItem.authorID}
                            publishDtm={postItem.publishDtm}
                            categoryName={postItem.categoryName}
                            categoryID={postItem.categoryID}
                            title={postItem.title}
                            summary={postItem.summary}
                            imageURL={postItem.imageURL}
                            likeStatus={postItem.likeStatus}
                            savedStatus={postItem.savedStatus}
                            readingTime={postItem.readingTime}
                            likeCount={postItem.likeCount}
                            viewCount={postItem.viewCount}
                            commentCount={postItem.commentCount}
                        ></HomeTextInfo>
                    </div >
                return <></>
            })
        }
        else
            postSearchResult = <Loader />

        return (
            <div className="home-layout">
                <div className="mg-top-10px" />
                <div className="nm-bl-layout-router-outlet" >
                    <div className="posts-list-container">
                        {!this.props.isListLoading &&
                            <div>
                                <div className="trending-title" >
                                    <img className="trending-icon" src={highlight_icon} alt="*" />
                                    TRENDINGS
                                </div>
                                <div style={{ height: "3px", background: "var(--blue)", marginLeft: "10px", marginRight: "10px", marginBottom: "5px" }} />
                                <div className="d-flex">
                                    {this.props.postSearchResult[0] &&
                                        < div className="home-item-container" key={this.props.postSearchResult[0].id} >
                                            <HomeFirstInfo
                                                authorAvatarURL={this.props.postSearchResult[0].authorAvatarURL}
                                                key={this.props.postSearchResult[0].id}
                                                id={this.props.postSearchResult[0].id}
                                                authorDisplayName={this.props.postSearchResult[0].authorDisplayName}
                                                authorID={this.props.postSearchResult[0].authorID}
                                                publishDtm={this.props.postSearchResult[0].publishDtm}
                                                categoryName={this.props.postSearchResult[0].categoryName}
                                                categoryID={this.props.postSearchResult[0].categoryID}
                                                title={this.props.postSearchResult[0].title}
                                                summary={this.props.postSearchResult[0].summary}
                                                imageURL={this.props.postSearchResult[0].imageURL}
                                                likeStatus={this.props.postSearchResult[0].likeStatus}
                                                savedStatus={this.props.postSearchResult[0].savedStatus}
                                                readingTime={this.props.postSearchResult[0].readingTime}
                                                likeCount={this.props.postSearchResult[0].likeCount}
                                                viewCount={this.props.postSearchResult[0].viewCount}
                                                commentCount={this.props.postSearchResult[0].commentCount}
                                            ></HomeFirstInfo>
                                        </div >
                                    }
                                    <div style={{ borderLeft: "1px solid var(--grayish)" }} >{postSearchResult}</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));

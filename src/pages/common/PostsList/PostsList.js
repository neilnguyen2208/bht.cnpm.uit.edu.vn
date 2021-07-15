import React from 'react';
import { getTrendingPosts, getPostsByCategoryId } from "redux/services/postServices"
import { getPostCategoriesHaveAll } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import HomeFirstInfo from 'components/post/HomeFirstInfo';
import HomeTextInfo from 'components/post/HomeTextInfo';
import HomeInfo from 'components/post/HomeInfo';
import bg from 'assets/images/white_bg.jpg'
import highlight_icon from 'assets/icons/48x48/highlights_icon_48x48.png'
import { authRequest, request } from 'utils/requestUtils';

class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { allResult: [] }
        this.allResult = [];
        this.allRenderResult = <></>;
    }

    componentDidMount() {

        //fake for trending
        this.props.getTrendingPosts();
        this.renderByCategory();

    }

    renderByCategory = () => {
        this.allResult = [];
        request.get(`/posts/categories`).then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                request.get(`/posts/searchFilter?searchTerm=&page=0&postCategoryID=${response.data[i].id}`).then(response_1 => {
                    let result_1 = response_1.data;
                    let IDarr = '';
                    response_1.data.postSummaryDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi

                    authRequest.get(`/posts/statistics?postIDs=${IDarr}`)
                        .then(response_2 => {
                            //merge summary array and statistic array
                            let finalResult = [];

                            for (let j = 0; j < result_1.postSummaryDTOs.length; j++) {
                                finalResult.push({
                                    ...result_1.postSummaryDTOs[j],
                                    ...(response_2.data.find((itmInner) => itmInner.id === result_1.postSummaryDTOs[j].id)),
                                });
                            }
                            this.allResult = [...this.allResult, { id: response.data[i].id, categoryName: response.data[i].name, posts: finalResult }];
                            this.setState({});

                        })
                })
            }
        })
    }

    renderGridThreeItems = (items) => {
        return <div className="d-flex">
            {/* //item 0 */}
            {items[0] && <div className="home-item-container grid" style={{ marginRight: "10px" }} key={items[0].id} >
                <HomeFirstInfo
                    authorAvatarURL={items[0].authorAvatarURL}
                    key={items[0].id}
                    postID={items[0].id}
                    authorDisplayName={items[0].authorDisplayName}
                    authorID={items[0].authorID}
                    publishDtm={items[0].publishDtm}
                    categoryName={items[0].categoryName}
                    categoryID={items[0].categoryID}
                    title={items[0].title}
                    summary={items[0].summary}
                    imageURL={items[0].imageURL}
                    likeStatus={items[0].likeStatus}
                    savedStatus={items[0].savedStatus}
                    readingTime={items[0].readingTime}
                    likeCount={items[0].likeCount}
                    viewCount={items[0].viewCount}
                    commentCount={items[0].commentCount}
                ></HomeFirstInfo>
            </div >
            }

            <div style={{ borderLeft: "1px solid var(--grayish)", paddingLeft: "10px" }} >
                {items[1] && < div className="home-item-container grid" style={{ marginRight: "0px" }} key={items[1].id} >
                    <HomeTextInfo
                        authorAvatarURL={items[1].authorAvatarURL}
                        key={items[1].id}
                        postID={items[1].id}
                        authorDisplayName={items[1].authorDisplayName}
                        authorID={items[1].authorID}
                        publishDtm={items[1].publishDtm}
                        categoryName={items[1].categoryName}
                        categoryID={items[1].categoryID}
                        title={items[1].title}
                        summary={items[1].summary}
                        imageURL={items[1].imageURL}
                        likeStatus={items[1].likeStatus}
                        savedStatus={items[1].savedStatus}
                        readingTime={items[1].readingTime}
                        likeCount={items[1].likeCount}
                        viewCount={items[1].viewCount}
                        commentCount={items[1].commentCount}
                    ></HomeTextInfo>
                </div >}

                {items[2] && < div className="home-item-container grid" key={items[2].id} style={{ marginTop: "20px", marginRight: "0px" }}>
                    <HomeTextInfo
                        authorAvatarURL={items[2].authorAvatarURL}
                        key={items[2].id}
                        postID={items[2].id}
                        authorDisplayName={items[2].authorDisplayName}
                        authorID={items[2].authorID}
                        publishDtm={items[2].publishDtm}
                        categoryName={items[2].categoryName}
                        categoryID={items[2].categoryID}
                        title={items[2].title}
                        summary={items[2].summary}
                        imageURL={items[2].imageURL}
                        likeStatus={items[2].likeStatus}
                        savedStatus={items[2].savedStatus}
                        readingTime={items[2].readingTime}
                        likeCount={items[2].likeCount}
                        viewCount={items[2].viewCount}
                        commentCount={items[2].commentCount}
                    ></HomeTextInfo>
                </div >
                }
            </div >
        </div>
    }

    renderRowThreeItems = (items) => {
        return <div className="d-flex">
            {items[0] && <div className="home-item-container _row" key={items[0].id} >
                <HomeInfo
                    authorAvatarURL={items[0].authorAvatarURL}
                    key={items[0].id}
                    postID={items[0].id}
                    authorDisplayName={items[0].authorDisplayName}
                    authorID={items[0].authorID}
                    publishDtm={items[0].publishDtm}
                    categoryName={items[0].categoryName}
                    categoryID={items[0].categoryID}
                    title={items[0].title}
                    summary={items[0].summary}
                    imageURL={items[0].imageURL}
                    likeStatus={items[0].likeStatus}
                    savedStatus={items[0].savedStatus}
                    readingTime={items[0].readingTime}
                    likeCount={items[0].likeCount}
                    viewCount={items[0].viewCount}
                    commentCount={items[0].commentCount}
                ></HomeInfo>
            </div >}
            {items[1] && <div className="home-item-container _row" key={items[1].id} >
                <HomeInfo
                    authorAvatarURL={items[1].authorAvatarURL}
                    key={items[1].id}
                    postID={items[1].id}
                    authorDisplayName={items[1].authorDisplayName}
                    authorID={items[1].authorID}
                    publishDtm={items[1].publishDtm}
                    categoryName={items[1].categoryName}
                    categoryID={items[1].categoryID}
                    title={items[1].title}
                    summary={items[1].summary}
                    imageURL={items[1].imageURL}
                    likeStatus={items[1].likeStatus}
                    savedStatus={items[1].savedStatus}
                    readingTime={items[1].readingTime}
                    likeCount={items[1].likeCount}
                    viewCount={items[1].viewCount}
                    commentCount={items[1].commentCount}
                ></HomeInfo>
            </div >}
            {items[2] && <div className="home-item-container _row" key={items[2].id} >
                <HomeInfo
                    authorAvatarURL={items[2].authorAvatarURL}
                    key={items[2].id}
                    postID={items[2].id}
                    authorDisplayName={items[2].authorDisplayName}
                    authorID={items[2].authorID}
                    publishDtm={items[2].publishDtm}
                    categoryName={items[2].categoryName}
                    categoryID={items[2].categoryID}
                    title={items[2].title}
                    summary={items[2].summary}
                    imageURL={items[2].imageURL}
                    likeStatus={items[2].likeStatus}
                    savedStatus={items[2].savedStatus}
                    readingTime={items[2].readingTime}
                    likeCount={items[2].likeCount}
                    viewCount={items[2].viewCount}
                    commentCount={items[2].commentCount}
                ></HomeInfo>
            </div >}
        </div >
    }

    render() {
        return (
            <div>
                <div style={{ backgroundImage: "url(" + bg + ")", padding: "10px", borderBottom: "2px solid var(--gray)" }}>
                    <div className="home-layout">
                        <div className="posts-list-container trending">
                            {!this.props.isTrendingLoading && this.props.trendingPosts &&
                                <div>
                                    <div className="trending-title" >
                                        <img className="trending-icon" src={highlight_icon} alt="*" />
                                        <div style={{ paddingTop: "2px" }}>
                                            MỚI NHẤT
                                        </div>
                                    </div>

                                    <div style={{ height: "3px", background: "var(--blue)", marginBottom: "5px" }} />
                                    <div className="d-flex">
                                        {this.renderGridThreeItems(this.props.trendingPosts)}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="home-layout">
                    <div className="posts-list-container">
                        {/* render trending posts */}
                        {this.allResult.map((item, index) => {
                            if (item.posts.length > 0)
                                return <div>
                                    <div className="j-c-space-between" style={{ marginTop: "30px", borderBottom: "1px solid var(--gray)", paddingBottom: "5px" }}>
                                        <div className="part-title" style={{ textTransform: "uppercase" }} >
                                            {item.categoryName}
                                        </div>
                                        <Link className="link-label-s" to={`/search/posts?category=${item.id}&page=1&q=`}>
                                            Xem tất cả >>
                                        </Link>
                                    </div>

                                    <div style={{ marginTop: "10px" }}>
                                        {index % 2 === 0 && item.posts.length > 0 && this.renderGridThreeItems(item.posts)}
                                        {index % 2 === 1 && item.posts.length > 0 && this.renderRowThreeItems(item.posts)}
                                    </div>
                                </div>
                            return <></>;
                        })}
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
        trendingPosts: state.post.trendingPosts.data,
        isTrendingLoading: state.post.trendingPosts.isLoading,

        totalPages: state.post.postsList.totalPages,
        totalElements: state.post.postsList.totalElements,
        postByCategoryId: state.post.postByCategoryId,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getTrendingPosts, getPostCategoriesHaveAll, getPostsByCategoryId
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));

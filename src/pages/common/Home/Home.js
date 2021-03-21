/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'layouts/Layout.scss'
import './Home.scss'

//utils
import { itemType } from 'constants.js'
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import HomePostItem from 'components/post/HomeInfo'
import HomeDocumentItem from 'components/document/HomeInfo'

import Wallpage from 'components/home/Wallpage/Wallpage'

//services
import {
    getTrendingDocuments,
    getNewestPosts,
    getHighlightPosts,
    getNewestActivities
}
    from 'redux/services/homeServices'

//components
import Loader from 'components/common/Loader/Loader'

class Home extends Component {
    constructor(props) {
        super();
        this.state = {

            slider: ["first", "second", "third", "fourth", "fifth"],
            activeIndex: 1,
            left: 0
        }

    }

    componentDidMount() {
        this.props.getNewestActivities();
        this.props.getNewestPosts();
        this.props.getTrendingDocuments();
        this.props.getHighlightPosts();
    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setQueryParam("category", selectedOption.id);

    }

    render() {

        let newestPosts = <></>;
        let TrendingDocuments = <></>;
        let newestActivitiesList = <></>;
        // let allSubjectList = <></>;

        if (!this.props.isNewPostsLoading) {
            newestPosts =
                //  <div className="home-item-container-wrapper">
                // <div className="home-item-container">
                // {
                this.props.newPosts.map(postItem => {
                    return <HomePostItem
                        authorAvatarURL={postItem.authorAvatarURL}
                        key={postItem.id}
                        id={postItem.id}
                        authorName={postItem.authorName}
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
                        commentCount={postItem.commentCount}
                    ></HomePostItem>
                })
            // }
            // </div>
            // </div>
        }
        else {
            newestPosts = <Loader />
        }

        if (!this.props.isTrendingDocumentLoading)
            TrendingDocuments = this.props.trendingDocuments.map(item => {
                return <HomeDocumentItem
                    id={item.id}
                    authorID={item.authorID}
                    authorName={item.authorName}
                    categoryID={item.categoryID}
                    categoryName={item.category}
                    imageURL={item.imageURL}
                    publishDtm={item.publishDtm}
                    description={item.description}
                    title={item.title}
                    downloadCount={item.downloads}
                    viewCount={item.views}
                    subjectName={item.docSubject}
                    subjectID={item.docSubjectID}
                ></HomeDocumentItem>
            })
        else {
            TrendingDocuments = <Loader></Loader>
        }

        if (!this.props.isNewActivitiesLoading) {
            newestActivitiesList = this.props.newActivities.map(postItem => {
                return <HomePostItem
                    key={postItem.id}
                    id={postItem.id}
                    authorName={postItem.authorName}
                    authorID={postItem.authorID}
                    authorAvatarURL={postItem.authorAvatarURL}
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
                    commentCount={postItem.commentCount}
                ></HomePostItem>
            })
        }
        else {
            newestActivitiesList = <Loader />
        }

        return (
            <div className="pr-layout">
                <Wallpage sliderWidth="1000" sliderHeight="250" />
                <div className="home-layout" >

                    {/* bài viết mới nhất */}
                    <div className="part-title" >
                        BÀI VIẾT MỚI NHẤT
                    </div>
                    <div className="mg-top-5px" />
                    <div className="flipped-container flipped home-item-container">
                        <div className="flipped-content">
                            {newestPosts}
                        </div>
                    </div>

                    {/* Cơ sở nhóm ngành */}
                    <div className="part-title">
                        TÀI LIỆU HAY:
                    </div>
                    <div className="mg-top-5px" />
                    <div className="flipped-container flipped home-item-container">
                        <div className="flipped-content">
                            {TrendingDocuments}
                        </div>
                    </div>

                    {/* Danh sách môn học */}
                    <div className="part-title">
                        HOẠT ĐỘNG MỚI:
                    </div>
                    <div className="mg-top-5px" />
                    <div className="flipped-container flipped home-item-container">
                        <div className="flipped-content">
                            {newestActivitiesList}
                        </div >
                    </div >
                    <div className="mg-top-10px" />
                </div >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trendingDocuments: state.home.trendingDocuments.data,
        isTrendingDocumentLoading: state.home.trendingDocuments.isLoading,
        highlightPosts: state.home.highlightPosts.data,
        isHightlightPostsLoading: state.home.highlightPosts.isLoading,
        newPosts: state.home.newPosts.data,
        isNewPostsLoading: state.home.newPosts.isLoading,
        newActivities: state.home.newActivities.data,
        isNewActivitiesLoading: state.home.newActivities.isLoading,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getTrendingDocuments,
    getNewestPosts,
    getHighlightPosts,
    getNewestActivities
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

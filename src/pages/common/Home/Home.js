/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'layouts/Layout.scss'
import './Home.scss'

//utils
import { setQueryParam } from 'utils/urlUtils'
import HomePostItem from 'components/post/HomeInfo'
import HomeExerciseItem from 'components/course/HomeInfo'

import HomeDocumentItem from 'components/document/HomeInfo'

import Wallpage from 'components/home/Wallpage/Wallpage'

//services
import {
    getTrendingDocuments,
    getNewestPosts,
    getHighlightPosts,
    getNewestActivities,
    getNewestExercises

}
    from 'redux/services/homeServices'

//components
import Loader from 'components/common/Loader/Loader'
import Header from 'components/common/Header/Header';

class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {

            slider: ["first", "second", "third", "fourth", "fifth"],
            activeIndex: 1,
            left: 0
        }

    }

    componentDidMount() {
        this.props.getNewestExercises();
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
        let newestExercisesList = <></>;


        if (!this.props.isNewPostsLoading) {
            newestPosts = this.props.newPosts.map(postItem => {
                return <HomePostItem
                    authorAvatarURL={postItem.authorAvatarURL}
                    key={postItem.id}
                    postID={postItem.id}
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
                ></HomePostItem>
            })
        }
        else {
            newestPosts = <Loader />
        }

        if (!this.props.isTrendingDocumentLoading)
            TrendingDocuments = this.props.trendingDocuments.map(item => {

                return <HomeDocumentItem
                    key={item.id}
                    documentID={item.id}
                    authorID={item.authorID}
                    authorDisplayName={item.authorDisplayName}
                    categoryID={item.categoryID}
                    categoryName={item.categoryName}
                    imageURL={item.imageURL}
                    authorAvatarURL={item.authorAvatarURL}
                    publishDtm={item.publishDtm}
                    description={item.description}
                    title={item.title}
                    likeCount={item.likeCount}
                    dislikeCount={item.dislikeCount}
                    downloadCount={item.downloadCount}
                    viewCount={item.viewCount}
                    subjectName={item.subjectName}
                    subjectID={item.subjectID}
                ></HomeDocumentItem>
            })
        else {
            TrendingDocuments = <Loader></Loader>
        }

        if (!this.props.isNewActivitiesLoading) {
            newestActivitiesList = this.props.newActivities.map(postItem => {
                return <HomePostItem
                    key={postItem.id}
                    postID={postItem.id}
                    authorDisplayName={postItem.authorDisplayName}
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
                    viewCount={postItem.viewCount}
                    commentCount={postItem.commentCount}
                ></HomePostItem>
            })
        }
        else {
            newestActivitiesList = <Loader />
        }

        if (!this.props.isNewExercisesLoading) {
            newestExercisesList = this.props.newExercises.map(exerciseItem => {
                return <HomeExerciseItem
                    key={exerciseItem.id}
                    id={exerciseItem.id}
                    authorDisplayName={exerciseItem.author.displayName}
                    authorID={exerciseItem.author.id}
                    authorAvatarURL={exerciseItem.author.avatarURL}
                    publishDtm={exerciseItem.publishDtm}
                    categoryName={exerciseItem.category.name}
                    categoryID={exerciseItem.category.id}
                    title={exerciseItem.title}
                    description={exerciseItem.description}
                    summary={exerciseItem.summary}
                    subjectName={exerciseItem.subject.name}
                    subjectID={exerciseItem.subject.id}
                ></HomeExerciseItem>
            })
        }
        else {
            newestActivitiesList = <Loader />
        }

        return (

            <div className="pr-layout">
                <Header />
                <Wallpage sliderWidth="1000" sliderHeight="250" />
                <div className="home-layout" >

                    <div className="part-title">
                        BÀI TẬP MỚI:
                    </div>
                    <div className="mg-top-5px" />
                    <div className="flipped-container flipped home-item-container-wrapper">
                        <div className="flipped-content">
                            <div className="home-item-container _row">
                                {newestExercisesList}
                            </div >
                        </div >
                    </div >
                    <div className="mg-top-10px" />

                    <div className="part-title" >
                        BÀI VIẾT MỚI NHẤT
                    </div>
                    <div className="mg-top-5px" />
                    <div className="flipped-container flipped home-item-container-wrapper">
                        <div className="flipped-content">
                            <div className="home-item-container _row">
                                {newestPosts}
                            </div>
                        </div>
                    </div>

                    <div className="part-title">
                        TÀI LIỆU HAY:
                    </div>
                    <div className="mg-top-5px" />
                    <div className="flipped-container flipped home-item-container-wrapper">
                        <div className="flipped-content">
                            <div className="home-item-container _row">
                                {TrendingDocuments}
                            </div>
                        </div>
                    </div>


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
        newExercises: state.home.newExercises.data,
        isNewExercisesLoading: state.home.newExercises.isLoading,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getTrendingDocuments,
    getNewestPosts,
    getHighlightPosts,
    getNewestActivities,
    getNewestExercises

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

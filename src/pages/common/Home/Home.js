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
import { getSearchParamByName, setSearchParam } from 'utils/urlUtils'
import HomePostItem from 'components/home/HomePostItem'
import HomeDocumentItem from 'components/home/HomeDocumentItem'
import Wallpage from 'components/home/Wallpage/Wallpage'

//services
import {
    getTrendingDocumentsList,
    getNewestPostsList,
    getHighlightPostsList,
    getNewestActivities
}
    from 'redux/services/homeServices'

//components
import Loader from 'components/common/Loader/Loader'
import SubjectItem from 'components/course/SubjectItem'

class Home extends Component {
    constructor(props) {
        super();

        this.newPosts = [
            {
                "id": 51,
                "authorID": 1,
                "authorName": "alex",
                "categoryID": 7,
                "categoryName": "Hoạt động",
                "imageURL": "https://i.imgur.com/LnHFl0h.png",
                "publishDtm": "2020-01-26T00:00:00",
                "readingTime": 300,
                "summary": "etNullam ut nisi a odio semper cursus.",
                "title": "magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante."
            },
            {
                "id": 151,
                "authorID": 1,
                "authorName": "alex",
                "categoryID": 4,
                "categoryName": "Post Category 02",
                "imageURL": "https://i.imgur.com/LnHFl0h.png",
                "publishDtm": "2020-01-26T00:00:00",
                "readingTime": 300,
                "summary": "Đây là tóm tắt của bài post",
                "title": "Đây là tiêu đề của bài post"
            },
            {
                "id": 1,
                "authorID": 1,
                "authorName": "alex",
                "categoryID": 1,
                "categoryName": "Post Category 01",
                "imageURL": "https://i.imgur.com/LnHFl0h.png",
                "publishDtm": "2020-01-26T00:00:00",
                "readingTime": 300,
                "summary": "Summary of post 01",
                "title": "Post 01 title"
            },
            {
                "id": 101,
                "authorID": 1,
                "authorName": "alex",
                "categoryID": 7,
                "categoryName": "Hoạt động",
                "imageURL": "https://i.imgur.com/LnHFl0h.png",
                "publishDtm": "2020-01-26T00:00:00",
                "readingTime": 300,
                "summary": "Nullam scelerisque neque sed sem egestas blandit. Vestibulum",
                "title": "mvel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras"
            }

        ]
        this.state = {

            slider: ["first", "second", "third", "fourth", "fifth"],
            activeIndex: 1,
            left: 0
        }

    }

    componentDidMount() {
        this.props.getNewestActivities();
        this.props.getNewestPostsList();
        this.props.getTrendingDocumentsList();
        this.props.getHighlightPostsList();
    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setSearchParam("category", selectedOption.id);

    }

    render() {

        let newestPostsList = <></>;
        let trendingDocumentsList = <></>;
        let newestActivitiesList = <></>;
        let allSubjectList = <></>;

        if (!this.props.isNewPostsLoading) {
            newestPostsList = <div className="home-item-container-wrapper">
                <div className="home-item-container">
                    {this.props.newPosts.map(postItem => {
                        return <HomePostItem
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
                    })}
                </div>
            </div>
        }
        else {
            newestPostsList = <Loader />
        }

        if (!this.props.isTrendingDocumentLoading)
            trendingDocumentsList = <div className="home-item-container-wrapper">
                <div className="home-item-container">
                    {this.props.trendingDocuments.map(item => {
                        return <HomeDocumentItem
                            id={item.id}
                            authorID={item.authorID}
                            authorName={item.authorName}
                            categoryID={item.categoryID}
                            categoryName={item.categoryName}
                            imageURL={item.imageURL}
                            publishDtm={item.publishDtm}
                            readingTime={item.readingTime}
                            summary={item.summary}
                            title={item.title}
                            downloads = {item.downloads}
                            views = {item.views}
                            docSubject={item.docSubject}
                            docSubjectID = {item.docSubjectID}
                        ></HomeDocumentItem>
                    })}
                </div>
            </div>
        else {
            trendingDocumentsList = <Loader></Loader>
        }

        if (!this.props.isNewActivitiesLoading) {
            newestActivitiesList = <div className="home-item-container-wrapper">
                <div className="home-item-container">
                    {this.props.newActivities.map(postItem => {
                        return <HomePostItem
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
                    })}
                </div>
            </div>
        }
        else {
            newestActivitiesList = <Loader />
        }

        return (
            <div className="pr-layout">
                <Wallpage sliderWidth="1000" sliderHeight="250" />
                <div className="home-layout" >
                    <div className="decoration-line mg-bottom-10px" />
                    {/* Đại cương */}
                    <div className="course-type-title" >
                        <div className="d-flex">
                            <div className="rect-decoration" />
                            <div>
                                <div className="title">
                                    BÀI VIẾT MỚI NHẤT:
                            </div>
                            </div>
                        </div>
                    </div>
                    {newestPostsList}
                    {/* Cơ sở nhóm ngành */}
                    <div className="course-type-title">
                        <div className="d-flex">
                            <div className="rect-decoration" />
                            <div className="title">
                                TÀI LIỆU HAY:
                        </div>
                        </div>
                    </div>
                    {trendingDocumentsList}
                    {/* Danh sách môn học */}
                    <div className="course-type-title">
                        <div className="d-flex">
                            <div className="rect-decoration" />
                            <div className="title">
                                HOẠT ĐỘNG MỚI:
                            </div>
                        </div>
                    </div>
                    <div>
                        {newestActivitiesList}
                    </div>
                    <div className="mg-top-10px" />
                </div >
            </div>
        );
    }
}

const mapStateToProps = (state) => {
   ;
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
    getTrendingDocumentsList,
    getNewestPostsList,
    getHighlightPostsList,
    getNewestActivities
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

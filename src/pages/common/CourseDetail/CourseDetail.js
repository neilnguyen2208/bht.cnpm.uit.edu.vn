/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'layouts/Layout.scss';
import './CourseDetail.scss';
import dropdownIcon from 'assets/icons/12x12/dropdown_12x12.png'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { getCourseTopicsWithExercisesBySubjectId, getCourseDetailById } from 'redux/services/courseServices'
import Loader from 'components/common/Loader/Loader_S';
import homework_icon from 'assets/icons/24x24/homework_icon_gray_24x24.png'
import { authRequest } from 'utils/requestUtils';
import 'components/user/UserItem.scss';

class PostsList extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.props.getCourseTopicsWithExercisesBySubjectId(this.props.match.params.id);
        this.props.getCourseDetailById(this.props.match.params.id);
        authRequest.get(`/subjects/${this.props.match.params.id}/exerciseScoreBoard`).then(response => {
            this.scoresList = response.data;
            this.setState({});
        }).catch(this.scoresList = {
            "exerciseScoreboard": [],
            "userRank": null
        });
    }

    renderRankingItem = (item, index) => {
        return <div className="j-c-space-between" style={{ padding: "10px", borderBottom: "1px solid var(--gray)" }} >
            <div style={{ borderRight: "1px solid var(--gray)", width: "20px" }}>
                <div style={{ fontSize: "16px", marginTop: "5px" }}> {index + 1}</div>
            </div>
            <Link to={`/user/profile/${item.userID}`}>
                <img className="avatar ranking mg-right-5px" style={{ border: "none" }} src={item.userAvatarURL} alt="" />
            </Link>
            <Link className="displayname" style={{ fontSize: "18px", lineHeight: "24px" }} to={`/user/profile/${item.userID}`}>
                {item.userDisplayName}
            </Link>
            <div >
                <div style={{ fontSize: "16px", marginTop: "5px" }}> {item.totalScore}</div>
            </div>
        </div >
    }

    onTopicClick = (topicId) => {
        let topic = document.getElementById("topic-content-dropdown-" + topicId);
        if (topic.classList.contains("d-block")) {
            topic.classList.remove("d-block");
            topic.classList.add("d-none");
        }
        else {
            topic.classList.remove("d-none");
            topic.classList.add("d-block");
        }
    }

    render() {

        //List of topics
        let topicsList = <></>;
        if (!this.props.isTopicsLoading && this.props.topicsData.length > 0)
            topicsList = <div style={{ borderLeft: "3px var(--blue) solid" }}>
                {this.props.topicsData.map((topicItem, index) => {
                    return <div className="topic-container">
                        <div className="topic-title">
                            <div className="d-flex">
                                Nội dung {index + 1}<div className="two-dots">: </div><p>&nbsp;</p>
                                {topicItem.name}
                            </div>
                            <div className="dropdown-btn" id={"topic-dropdown-" + topicItem.id} onClick={() => this.onTopicClick(topicItem.id)}>
                                <img className="show-all-icon icon-10x10" alt="" src={dropdownIcon} ></img>
                            </div>
                        </div>
                        <div id={"topic-content-dropdown-" + topicItem.id} className="d-block">
                            {/* Exercises list of an  */}
                            {topicItem.exerciseSummaryDTOs
                                && topicItem.exerciseSummaryDTOs.map(exercise => {

                                    return <div className={exercise.attempted ? "exercise-title-container" : "exercise-title-container"}>
                                        {/* icon decoration */}
                                        <div className="d-flex">
                                            <div style={{ width: "26px", height: "26px", marginTop: "5px", marginRight: "5px", marginLeft: "10px" }}>
                                                <img className={
                                                    exercise.maxCorrectAnsweredQuestions === exercise.totalQuestions && exercise.attempted ?
                                                        "exercise-prefix max" :
                                                        exercise.maxCorrectAnsweredQuestions < exercise.totalQuestions
                                                            && exercise.maxCorrectAnsweredQuestions
                                                            ? "exercise-prefix attempted" :
                                                            "exercise-prefix"
                                                } src={homework_icon} alt="" />
                                            </div>
                                            <Link className="exercise-title" to={`/courses/exercise/${exercise.id}`} >
                                                {exercise.title}
                                            </Link>
                                        </div>
                                        {exercise.attempted && exercise.maxCorrectAnsweredQuestions ?
                                            <div className="exercise-title" style={{ minWidth: "fit-content" }}>
                                                {exercise.maxCorrectAnsweredQuestions + "/" + exercise.totalQuestions}
                                            </div>
                                            : <></>
                                        }
                                    </div>
                                })}
                        </div>
                    </div>
                })
                }
            </div >

        return (
            <div className="nm-bl-layout">
                <Titlebar title="" />
                <div className="content-container">
                    <div className="course-detail">
                        {!this.props.isCourseDetailLoading && this.props.courseDetailData[0] ?
                            < div className="d-flex" >
                                <img className="cover-image" src={this.props.courseDetailData[0].imageURL} alt="" />
                                <div style={{ marginLeft: "10px" }}>
                                    <div className="title">
                                        {this.props.courseDetailData[0].name}
                                    </div>
                                    <div className="description">
                                        {this.props.courseDetailData[0].description}
                                    </div>
                                </div>
                            </div >
                            : <Loader />}

                        {/* <div className="main-content-text">NỘI DUNG CHÍNH:</div> */}
                        <div className="course-detail-container">
                            <div className="j-c-space-between">
                                {topicsList}
                                <div className="score-board">
                                    <div style={{ width: "100%", textAlign: "center", fontSize: "18px", marginTop: "5px", fontWeight: "700", borderBottom: "1px solid var(--gray)", paddingBottom: "5px" }}>XẾP HẠNG</div>
                                    {this.scoresList && this.scoresList.exerciseScoreboard.length === 0 && <div style={{ margin: "auto" }}>Chưa có người dùng tham gia.</div>}
                                    {
                                        this.scoresList && this.scoresList.exerciseScoreboard.map((item, index) => {
                                            return <div>{this.renderRankingItem(item, index)}</div>
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {

    return {
        //course detail
        isCourseDetailLoading: state.course.courseDetailById.isLoading,
        courseDetailData: state.course.courseDetailById.data,

        //topics & excercises list
        isTopicsLoading: state.course.courseTopicsExercises.isLoading,
        topicsData: state.course.courseTopicsExercises.data,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCourseTopicsWithExercisesBySubjectId, getCourseDetailById
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));

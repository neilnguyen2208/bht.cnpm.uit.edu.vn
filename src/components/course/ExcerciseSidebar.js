/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { NavLink } from "react-router-dom";
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'

//import scss
import 'layouts/LeftSidebarLayout.scss'
import 'components/styles/Label.scss'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCourseTopicsWithExercisesByExerciseId, getExerciseById, getExerciseQuestions } from 'redux/services/courseServices'
import homework_icon from 'assets/icons/24x24/homework_icon_gray_24x24.png'
import { check_ExerciseQuestionsRequest, update_QuestionsToCReset, update_QuestionsToCSucess } from 'redux/actions/courseAction';
import store from 'redux/store';

class ExerciseSidebar extends React.Component {

  componentDidMount() {
    this.props.getCourseTopicsWithExercisesByExerciseId(this.props.match.params.id);
  }

  //2 cases: on excercise detail, on exercise content. 
  renderLevel1 = (topicsExercisesDTOs) => {
    //neu khong co child => d-none default
    return <div> {topicsExercisesDTOs.map((topic, index) => {
      return <div>
        <div className="pr-drop-down-m-i"
          id={"xrcs-vmi-lvl1-sdbr" + topic.id}
          onClick={(e) => topic.exerciseSummaryDTOs ? this.onFisrtLevelClick(e, "xrcs-vmi-lvl1-dropdown-container" + topic.id) : () => { }}>
          <div className="d-flex">
            <div className="sd-br-lvl1-mi-text" id={"lvl1-mi-text" + topic.id}>
              {index + 1 + ". "}  {topic.name}
            </div>
          </div>
          <img alt="" className="dropdown-element" src={dropdown_btn} id="xrcs-dropdown-btn-element" />

        </div>
        <div className="d-block" style={{ marginLeft: "15px", marginTop: "5px" }} id={"xrcs-vmi-lvl1-dropdown-container" + topic.id}>
          {topic.exerciseSummaryDTOs && topic.exerciseSummaryDTOs.map(excercise => {
            return this.renderLevel2(topic.id, excercise)
          })}
          {topic.exerciseSummaryDTOs &&
            <div>
              <div className="mg-bottom-5px" />
              <div className="decoration-underline " />
              <div className="mg-bottom-5px" />
              <div className="mg-bottom-5px" />
            </div >
          }
        </div >
      </div >
    })}
    </div >
  }

  renderLevel2 = (level1Id, level2Item) => {
    return <NavLink className="vertical-sub-m-i" style={{ marginLeft: "0px", paddingLeft: "5px", paddingBottom: "5px" }}
      activeClassName="main-interactive-menu-item-active vertical-sub-m-i"
      to={window.location.pathname.substring(0, 26) === "/courses/exercise-content/" ?
        "/courses/exercise-content/" + level2Item.id
        : "/courses/exercise/" + level2Item.id}
      onClick={() => this.loadContent(level2Item.id)}>
      <img className="exercise-prefix" style={{ width: "26px", height: "26px", marginTop: "5px", marginRight: "5px" }} src={homework_icon} alt="" />
      <div className="text" style={{ marginTop: "5px" }} >
        {level2Item.title}
      </div>
    </NavLink>
  }

  loadContent = (exerciseId) => {

    //if not in exercise questions  
    if (window.location.pathname.substring(0, 26) !== "/courses/exercise-content/") {
      this.props.getExerciseById(exerciseId);
      return;
    }
    this.props.getExerciseById(exerciseId);
    this.props.getExerciseQuestions(exerciseId);

    //reset questions
    store.dispatch(check_ExerciseQuestionsRequest());

    //reset array DTO: questions.length => new array ToC


  }

  render() {

    //after questions loaded.
    if (window.location.pathname.substring(0, 26) === "/courses/exercise-content/" && !this.props.isQuestionsLoading && this.props.questionsData) {
      this.questionToC = [];
      for (let i = 0; i < this.props.questionsData.length; i++) {
        this.questionToC.push({ id: this.props.questionsData[i].id, isChecked: false, isAnswered: false, isFlagged: false, isCorrect: false })
      }
      store.dispatch(update_QuestionsToCSucess(this.questionToC))

    }
    return (
      <div className="left-sidebar-wrapper" >
        {/* Dung de gioi han lai khong gian cua cac component con khi scroll */}
        < div className="fake-left-sidebar" />

        <div className="sidebar left">
          <div className="sidebar-subject-name">
            {this.props.topicsExercises.name && this.props.topicsExercises.name}
          </div>
          <div className="vertical-menu-container"  >
            {(!this.props.isTopicsExercisesLoading && this.props.topicsExercises.exerciseTopicWithExerciseListDTOs) && (
              this.renderLevel1(this.props.topicsExercises.exerciseTopicWithExerciseListDTOs))
            }
          </div >
        </div >
      </div >
    );
  }

  onFisrtLevelClick = (e, container_id) => {
    e.preventDefault();
    let dropdown_container = document.getElementById(container_id);
    dropdown_container.style.display === "none"
      ?
      dropdown_container.style.display = "block"
      :
      dropdown_container.style.display = "none"
  }
}

//#region for redux
const mapStateToProps = (state) => {
  return {
    userSummaryData: state.auth.currentUserSummary.data,
    isUserSummaryLoadDone: state.auth.currentUserSummary.isLoadDone,
    topicsExercises: state.course.courseTopicsExercisesByExerciseId.data,
    isTopicsExercisesLoading: state.course.courseTopicsExercisesByExerciseId.isLoading,
    isQuestionsLoading: state.course.exerciseQuestions.isLoading,
    questionsData: state.course.exerciseQuestions.data,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCourseTopicsWithExercisesByExerciseId,
  getExerciseById,
  getExerciseQuestions
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExerciseSidebar));
//#endregion
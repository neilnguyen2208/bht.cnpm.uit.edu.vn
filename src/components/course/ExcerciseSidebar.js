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
import { getCourseTopicsWithExercisesByExerciseId } from 'redux/services/courseServices'

class ExerciseSidebar extends React.Component {

  componentDidMount() {
    this.props.getCourseTopicsWithExercisesByExerciseId(this.props.match.params.id);
  }

  renderLevel1 = (level1Id) => {
    //neu khong co child => d-none default
    return <div className="pr-drop-down-m-i"
      id={"xrlcs-lvl-sdbr" + level1Id}
      onClick={(e) => this.onFisrtLevelClick(e, "xrlcs-lvl1-sdbr" + level1Id)}>
      <div className="d-flex">
        <div className="sd-br-lvl1-mi-text" id={"lvl1-mi-text" + level1Id}>
          Chủ đề 1
        </div>
      </div>
      <img alt="v" className="dropdown-element" src={dropdown_btn} id="xrlcs-dropdown-btn-element" />
    </div>
  }

  renderLevel2 = (level1Id, level2Id) => {
    return <div className="d-block-default" id="page-admin-menu-item-container">
      <div className="mg-bottom-5px" />
      <NavLink className="vertical-sub-m-i"
        activeClassName="main-interactive-menu-item-active vertical-sub-m-i"
        to={"/courses/exercise-content/1"} >
        <div className="text" >
          Bài 1
        </div>
      </NavLink>
      <div className="mg-bottom-5px" />
      <div className="decoration-underline " />
      <div className="mg-bottom-5px" />
      <div className="mg-bottom-5px" />
    </div >
  }

  render() {
    return (
      <div className="left-sidebar-wrapper" >
        {/* Dung de gioi han lai khong gian cua cac component con khi scroll */}
        <div className="fake-left-sidebar" />
        {/* Left Sidebar */}
        <div className="sidebar left">
          <div className="vertical-menu-container"  >
            {!this.props.isTopicsExerciesLoading && this.props.topicsExercises && console.log(this.props.topicsExercises)}
            
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
    topicsExercises: state.course.courseTopicsExercises.data,
    isTopicsExerciesLoading: state.course.courseTopicsExercises.isLoading,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCourseTopicsWithExercisesByExerciseId
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExerciseSidebar));
//#endregion
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'layouts/Layout.scss';
import './CourseDetail.scss';
import dropdownIcon from 'assets/icons/12x12/dropdown_12x12.png'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { getCourseTopicsWithExercisesById, getCourseDetailById } from 'redux/services/courseServices'

class PostsList extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.props.getCourseTopicsWithExercisesById(this.props.match.params.id);
        this.props.getCourseDetailById(this.props.match.params.id);
    }

    render() {

        let topicsList = <></>;
        if (!this.props.isTopicsLoading && this.props.topicsData.length > 0)
            topicsList = this.props.topicsData.map((contentHeading, index) => {
                return <div className="heading-content-container">  <div>
                    <div className="heading-content-title">
                        Nội dung {index}
                        <div className="two-dots">: </div>
                        <p>&nbsp;</p>

                        {/* {contentHeading.name} */}
                    </div>
                    <div>
                        {[{}, {}].map(partHeading => {
                            return <div className="part-heading"></div>
                        })}
                    </div>
                </div>
                    <div className="dropdown-btn" id={"heading-content-dropdown-" + contentHeading.id}>
                        <img className="show-all-icon icon-10x10" alt="" src={dropdownIcon} ></img>
                    </div>
                </div>;
            }
            )

        return (
            <div className="nm-bl-layout">
                <Titlebar title="" />
                <div className="content-container">
                    <div className="heading-list">
                        < div className="subject-description" >
                            <img className="image" src={this.image} alt="*" />
                            <div className="title">
                                {this.title}
                            </div>
                            <div className="description">
                                {this.description}
                            </div>
                            <div className="save-btn-container">
                                <div className="save-btn blue-button">
                                    {!this.isSave ?
                                        "Lưu" : "Huỷ lưu"
                                    }
                                </div>
                            </div>
                        </div >
                        <div className="main-content-text">NỘI DUNG CHÍNH</div>
                        <div className="heading-list-container">
                            {topicsList}
                        </div>
                    </div>
                </div>
            </div>
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
    getCourseTopicsWithExercisesById, getCourseDetailById
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));

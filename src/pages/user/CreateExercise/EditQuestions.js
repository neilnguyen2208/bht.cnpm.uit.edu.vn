import React from "react";

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import AddQuestionItem from "components/course/AddQuestionItem";
import ExerciseInfo from "components/course/ExerciseInfo";
import { formatMathemicalFormulas, styleCodeSnippet } from "components/common/CustomCKE/CKEditorUtils";
import { getExerciseById, getExerciseQuestions } from 'redux/services/courseServices';

class CreateExercise extends React.Component {

    constructor(props) {
        super(props);
        this.questionsList = [];
    }

    componentDidMount() {
        //get data
        this.props.getExerciseById(this.props.match.params.id);
        this.props.getExerciseQuestions(this.props.match.params.id);
    }

    componentWillUnmount() {

    }

    render() {

        //check if questions's first time load => assign data to view

        return (
            <div className="">
                <div className="content-layout">
                    <div className="content-container">
                        {!this.props.isLoading && this.props.exerciseContent ?
                            <div>
                                <ExerciseInfo
                                    exerciseId={this.props.exerciseContent.id}
                                    title={this.props.exerciseContent.title}
                                    categoryName={this.props.exerciseContent.categoryName}
                                    categoryID={this.props.exerciseContent.categoryID}
                                    authorDisplayName={this.props.exerciseContent.authorDisplayName}
                                    authorAvatarURL={this.props.exerciseContent.authorAvatarURL}
                                    publishDtm={this.props.exerciseContent.publishDtm}
                                    availableActions={this.props.exerciseContent.availableActions}
                                    imageURL={this.props.exerciseContent.imageURL}
                                    authorID={this.props.exerciseContent.authorID}
                                    subjectName={this.props.exerciseContent.subjectName}
                                    totalQuestions={this.props.exerciseContent.totalQuestions}
                                    attemptCount={this.props.exerciseContent.attemptCount}
                                    EDIT_MODE
                                />
                                <div className="j-c-space-between" style={{ marginTop: "10px", marginBottom: "20px" }}>
                                    <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                        Tổng số câu hỏi: {this.props.exerciseContent.totalQuestions} </div>
                                    <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                        Tổng số lượt giải: {this.props.exerciseContent.attemptCount} </div>
                                </div>

                                {formatMathemicalFormulas()}
                                {styleCodeSnippet()}
                            </div> : <div>

                            </div>
                        }

                        {/* List of questions */}
                        <AddQuestionItem />
                        <AddQuestionItem />

                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        exerciseContent: state.course.currentExercise.data,
        isExerciseLoading: state.course.currentExercise.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

    getExerciseById, getExerciseQuestions

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateExercise));


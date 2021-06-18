import React from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import ExerciseInfo from 'components/course/ExerciseInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ExerciseSidebar from 'components/course/ExcerciseSidebar'
import 'components/common/CustomCKE/CKEditorContent.scss';
import { getExerciseById, getExerciseQuestions } from 'redux/services/courseServices'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import DocPostDetailLoader from 'components/common/Loader/DocPostDetailLoader';
import QuestionsToC from 'components/course/QuestionsToC';
import QuestionItem from 'components/course/QuestionItem';

class PostDetail extends React.Component {
    componentDidMount() {
        this.props.getExerciseById(this.props.match.params.id);
        this.props.getExerciseQuestions(this.props.match.params.id);
    }

    render() {
        return (
            <div className="left-sidebar-layout exercise">
                <div className="j-c-space-between" style={{ width: "100%" }}>
                    <div className="d-flex">
                        <ExerciseSidebar />
                        <div className="exercise-detail-container" >
                            {/* Render intro */}
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
                                    />
                                    <div className="j-c-space-between" style={{ marginTop: "10px", marginBottom: "20px" }}>
                                        <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                            Tổng số câu hỏi: {this.props.exerciseContent.totalQuestions} </div>
                                        <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                            Tổng số lượt giải: {this.props.exerciseContent.attemptCount} </div>
                                    </div>

                                    {formatMathemicalFormulas()}
                                    {styleCodeSnippet()}
                                </div>
                                : <div><DocPostDetailLoader />
                                </div>
                            }

                            {/* Render questions */}
                            {!this.props.isQuestionsLoading && this.props.questions &&
                                this.props.questions.map((question, index) => {
                                    return <QuestionItem
                                        index={index}
                                        key={index}
                                        questionId={question.id}
                                        content={question.content}
                                        rank={question.rank}
                                        answers={question.exerciseAnswerDTOs}
                                    />
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <div className="fake-relative-sidebar exercise"></div>
                        <div style={{ position: "fixed" }}>
                            {!this.props.isQuestionsLoading && this.props.questions &&
                                <QuestionsToC title={"Mục lục"} items={this.props.questions} />
                            }
                            <div className="relative-sidebar" style={{ border: "0px" }}>
                                <div className="form-group">
                                    <div className="form-label">Ghi chú:</div>
                                    <textarea className="text-area" style={{ height: "200px" }}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {formatMathemicalFormulas()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        exerciseContent: state.course.exercise.data,
        isExerciseLoading: state.course.exercise.isLoading,
        questions: state.course.exerciseQuestions.data,
        isQuestionsLoading: state.course.exerciseQuestions.isLoading,
        correctAnswers: state.course.correctAnswers.data,
        isAnswersLoading: state.course.correctAnswers.isLoading

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getExerciseById,
    getExerciseQuestions

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
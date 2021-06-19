import React from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import ExerciseInfo from 'components/course/ExerciseInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ExerciseSidebar from 'components/course/ExcerciseSidebar'
import 'components/common/CustomCKE/CKEditorContent.scss';
import { getExerciseById, getExerciseQuestions, checkExerciseAnswers } from 'redux/services/courseServices'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import DocPostDetailLoader from 'components/common/Loader/DocPostDetailLoader';
import QuestionsToC from 'components/course/QuestionsToC';
import QuestionItem from 'components/course/QuestionItem';
import store from 'redux/store';
import { update_QuestionsToCSucess } from 'redux/actions/courseAction';
class PostDetail extends React.Component {
    constructor(props) {
        super(props);
        this.ANSWERS_DTO = [

        ];

        this.questionToC = [
            //questionId, isAnswered, 
        ];

        this.isFirstTimeQuestionLoaded = false;
        this.isFirstTimeAnswerChecked = false;
        this.finalResult = null;
    }

    componentDidMount() {
        this.props.getExerciseById(this.props.match.params.id);
        this.props.getExerciseQuestions(this.props.match.params.id);

        //create questionToC from question result.
    }

    //create submit DTO.
    //When choose an answer => update current DTO.
    updateAnswerDTO = (questionId, answerId) => {

    }

    updateQuestionToC = (questionId, answerId, state) => {

    }

    onAnswerChecked = (questionId, answer) => {
        //update questionToC DTO => 
        for (let i = 0; i < this.questionToC.length; i++) {
            if (this.questionToC[i].id === questionId) {
                this.questionToC[i].isAnswered = true;
            }
        }
        store.dispatch(update_QuestionsToCSucess([...this.questionToC]))

        //update answer dto
        for (let i = 0; i < this.ANSWERS_DTO.length; i++) {
            if (this.ANSWERS_DTO[i].id === questionId) {
                this.ANSWERS_DTO[i].answersSelected = [answer.id];
            }
        }
    }

    onQuestionFlagged = (questionId, state) => {
        //update questionToC DTO => 
        console.log(state)
        for (let i = 0; i < this.questionToC.length; i++) {
            if (this.questionToC[i].id === questionId) {
                this.questionToC[i].isFlagged = state;
            }
        }
        store.dispatch(update_QuestionsToCSucess([...this.questionToC]))
    }

    checkAnswer = () => {
        this.props.checkExerciseAnswers(this.props.match.params.id, this.ANSWERS_DTO);
    }

    render() {

        // if props.questions && firstLoadQuestion (when questions data is loaded the first time)
        if (!this.isFirstTimeQuestionLoaded && this.props.questions.length > 0 && !this.props.isQuestionsLoading) {
            this.isFirstTimeQuestionLoaded = true;

            //init toc dto: 
            for (let i = 0; i < this.props.questions.length; i++) {
                this.questionToC.push({ id: this.props.questions[i].id, isAnswered: false, isFlagged: false, isCorrect: false })
            }

            //init answer dto:
            for (let i = 0; i < this.props.questions.length; i++) {
                this.ANSWERS_DTO.push({ id: this.props.questions[i].id, answersSelected: [] })
            }
            store.dispatch(update_QuestionsToCSucess(this.questionToC))
            this.setState({});
        }

        if (!this.isFirstTimeAnswerChecked && this.props.questions.length > 0 && !this.props.isQuestionsLoading && this.props.isAnswerChecked) {
            this.isFirstTimeAnswerChecked = true;
            this.finalResult = [];

            for (let i = 0; i < this.props.questions.length; i++) {
                this.finalResult.push({
                    ...this.props.questions[i],
                    ...(this.props.correctAnswers.find((itmInner) => itmInner.id === this.props.questions[i].id)),
                });
            }
            this.setState({});
        }

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
                            {!this.props.isAnswerChecked && !this.props.isQuestionsLoading && this.props.questions &&
                                this.props.questions.map((question, index) => {
                                    return <QuestionItem
                                        index={index}
                                        key={index}
                                        questionId={question.id}
                                        content={question.content}
                                        rank={question.rank}
                                        answers={question.exerciseAnswerDTOs}
                                        updateQuestionToC={this.updateQuestionToC}
                                        updateAnswerDTO={this.updateAnswerDTO}
                                        onAnswerChecked={this.onAnswerChecked}
                                        onQuestionFlagged={this.onQuestionFlagged}
                                    />
                                })
                            }
                            {this.props.isAnswerChecked && !this.props.isAnswersLoading && this.finalResult &&
                                this.finalResult.map((question, index) => {
                                    return <QuestionItem
                                        isChecked
                                        isCorrect = {question.isCorrect}
                                        index={index}
                                        key={index}
                                        questionId={question.id}
                                        content={question.content}
                                        rank={question.rank}
                                        answers={question.exerciseAnswerDTOs}
                                        updateQuestionToC={this.updateQuestionToC}
                                        updateAnswerDTO={this.updateAnswerDTO}
                                        onAnswerChecked={this.onAnswerChecked}
                                        onQuestionFlagged={this.onQuestionFlagged}
                                    />
                                })
                            }
                            <button className="blue-button" onClick={() => this.checkAnswer()} >Kiểm tra kết quả</button>
                        </div>
                    </div>
                    <div>
                        <div className="fake-relative-sidebar exercise"></div>
                        <div style={{ position: "fixed" }}>
                            {!this.props.isQuestionsLoading && this.questionToC &&
                                <QuestionsToC title={"Mục lục"} items={this.questionToC} />
                            }
                            {/* <Countdown /> */}
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
        isAnswersLoading: state.course.correctAnswers.isLoading,
        isAnswerChecked: state.course.correctAnswers.isChecked

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getExerciseById,
    getExerciseQuestions,
    checkExerciseAnswers

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
import React from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import ExerciseInfo from 'components/course/ExerciseInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ExerciseSidebar from 'components/course/ExcerciseSidebar'
import 'components/common/CustomCKE/CKEditorContent.scss';
import { getExerciseById, getExerciseQuestions, checkExerciseAnswers, getExerciseNote, updateExerciseNote } from 'redux/services/courseServices'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import DocPostDetailLoader from 'components/common/Loader/DocPostDetailLoader';
import QuestionsToC from 'components/course/QuestionsToC';
import QuestionItem from 'components/course/QuestionItem';
import store from 'redux/store';
import { update_QuestionsToCSucess, update_QuestionsToCReset, update_ExerciseNoteReset, check_ExerciseQuestionsRequest } from 'redux/actions/courseAction';
import authService from 'authentication/authenticationServices';
import Countdown from 'components/course/Countdown';
import { closeModal, openCommentModal, openModal } from 'redux/services/modalServices';

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
        this.correctAnswerCount = 0;
    }

    componentDidMount() {
        this.props.getExerciseById(this.props.match.params.id);
        this.props.getExerciseQuestions(this.props.match.params.id);
        authService.isLoggedIn() && this.props.getExerciseNote(this.props.match.params.id);
    }

    //create submit DTO.
    //When choose an answer => update current DTO.
    updateAnswerDTO = (questionId, answerId) => {

    }

    updateQuestionToC = (questionId, answerId, state) => {

    }

    componentWillUnmount() {
        store.dispatch(update_QuestionsToCReset());
        store.dispatch(update_ExerciseNoteReset());
    }

    //when user check an answer
    onAnswerChecked = (questionId, answer) => {
        //update questionToC DTO => 
        for (let i = 0; i < this.questionToC.length; i++) {
            if (this.questionToC[i].id === questionId) {
                this.questionToC[i].isAnswered = true;
                this.questionToC[i].isChecked = false;
                this.questionToC[i].isCorrect = false;
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
        for (let i = 0; i < this.questionToC.length; i++) {
            if (this.questionToC[i].id === questionId) {
                this.questionToC[i].isFlagged = state;
            }
        }
        store.dispatch(update_QuestionsToCSucess([...this.questionToC]))
    }

    checkAllAnswers = () => {
        if (this.ANSWERS_DTO)
            this.props.checkExerciseAnswers(this.props.match.params.id, this.ANSWERS_DTO);
    }

    saveNote = (e) => {
        e.preventDefault();
        if (document.getElementById("cr-xcrs-nt-txtr")) {
            this.props.updateExerciseNote(this.props.match.params.id, { note: document.getElementById("cr-xcrs-nt-txtr").value });
        }
    }

    render() {

        // if props.questions && firstLoadQuestion (when questions data is loaded the first time)
        if (!this.isFirstTimeQuestionLoaded && this.props.questions.length > 0 && !this.props.isQuestionsLoading) {
            this.isFirstTimeQuestionLoaded = true;

            //init toc dto: 
            for (let i = 0; i < this.props.questions.length; i++) {
                this.questionToC.push({ id: this.props.questions[i].id, isAnswered: false, isFlagged: false, isCorrect: false })
            }
            store.dispatch(update_QuestionsToCSucess(this.questionToC))

            //init answer dto:
            for (let i = 0; i < this.props.questions.length; i++) {
                this.ANSWERS_DTO.push({ id: this.props.questions[i].id, answersSelected: [] })
            }
            this.setState({});
        }

        //when check all answer
        if (!this.isFirstTimeAnswerChecked && this.props.questions.length > 0 && !this.props.isQuestionsLoading && this.props.isAnswerChecked) {
            this.isFirstTimeAnswerChecked = true;
            this.finalResult = [];
            this.correctAnswerCount = 0;
            //update current question array
            for (let i = 0; i < this.props.questions.length; i++) {
                this.finalResult.push({
                    ...this.props.questions[i],
                    ...(this.props.correctAnswers.find((itmInner) => itmInner.id === this.props.questions[i].id)),
                });
            }

            //update ToC array
            this.tmpQuestionToC = this.questionToC;
            this.questionToC = [];
            for (let i = 0; i < this.tmpQuestionToC.length; i++) {
                this.questionToC.push({
                    ...this.tmpQuestionToC[i],
                    isChecked: true,
                    ...(this.props.correctAnswers.find((itmInner) => itmInner.id === this.tmpQuestionToC[i].id)),
                });
                if (this.props.correctAnswers[i].isCorrect) {
                    this.correctAnswerCount++;
                }

            }

            //reset answer
            for (let i = 0; i < this.props.questions.length; i++) {
                this.ANSWERS_DTO.push({ id: this.props.questions[i].id, answersSelected: [] })
            }
            store.dispatch(check_ExerciseQuestionsRequest());
            openModal("confirmation", {
                title: "Kết quả",
                showIcon: false,
                text: "Số câu trả lời đúng: " + this.correctAnswerCount,
                confirmText: "Xem đáp án",
                onConfirm: () => {
                    closeModal();
                }
            })
            store.dispatch(update_QuestionsToCSucess([...this.questionToC]));
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
                                </div> : <div>
                                    <DocPostDetailLoader />
                                </div>
                            }

                            {/* Render questions */}
                            {!this.props.isAnswerChecked && !this.props.isQuestionsLoading && this.props.questions &&
                                this.props.questions.map((question, index) => {
                                    return <QuestionItem
                                        index={index}
                                        exerciseId={this.props.match.params.id}
                                        key={index}
                                        questionId={question.id}
                                        content={question.content}
                                        rank={question.rank}
                                        answers={question.exerciseAnswerDTOs}
                                        updateQuestionToC={this.updateQuestionToC}
                                        updateAnswerDTO={this.updateAnswerDTO}
                                        onAnswerChecked={this.onAnswerChecked}
                                        onQuestionFlagged={this.onQuestionFlagged} />
                                })}
                            {this.props.isAnswerChecked && !this.props.isAnswersLoading && this.finalResult &&
                                this.finalResult.map((question, index) => {
                                    return <QuestionItem
                                        isChecked
                                        isCorrect={question.isCorrect}
                                        isAnswered={question.isAnswered}
                                        explaination={question.explanation}
                                        answersSelected={question.answersSelected}
                                        index={index}
                                        key={index}
                                        questionId={question.id}
                                        content={question.content}
                                        rank={question.rank}
                                        answers={question.exerciseAnswerDTOs}
                                        updateQuestionToC={this.updateQuestionToC}
                                        updateAnswerDTO={this.updateAnswerDTO}
                                        onAnswerChecked={this.onAnswerChecked}
                                        onQuestionFlagged={this.onQuestionFlagged} />
                                })}
                            <button className="blue-button" onClick={() => this.checkAllAnswers()} >Kiểm tra kết quả</button>
                        </div>
                    </div>
                    <div>
                        <div className="fake-relative-sidebar exercise"></div>
                        <div style={{ position: "fixed" }}>
                            {!this.props.isQuestionsLoading && this.questionToC &&
                                <QuestionsToC title={"MỤC LỤC"} items={this.questionToC} />
                            }
                            <div className="relative-sidebar" style={{ border: "0px" }}>
                                <Countdown checkAnswer={() => this.checkAllAnswers()} />
                                <form id="cr-xcrs-note">
                                    <div className="form-group">
                                        <div className="form-label">Ghi chú:</div>
                                        <textarea id="cr-xcrs-nt-txtr" className="text-area" style={{ height: "200px" }} defaultValue={authService.isLoggedIn() ? !this.props.isNoteLoading && this.props.noteData : ""}>
                                        </textarea>
                                    </div>
                                    <div className="d-flex j-c-end">
                                        {authService.isLoggedIn() && <button className="blue-button" onClick={(e) => this.saveNote(e)}>Lưu</button>}
                                    </div>
                                </form>
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
        exerciseContent: state.course.currentExercise.data,
        isExerciseLoading: state.course.currentExercise.isLoading,
        questions: state.course.exerciseQuestions.data,
        isQuestionsLoading: state.course.exerciseQuestions.isLoading,
        correctAnswers: state.course.correctAnswers.data,
        isAnswersLoading: state.course.correctAnswers.isLoading,
        isAnswerChecked: state.course.correctAnswers.isChecked,
        noteData: state.course.exerciseNote.data,
        isNoteLoading: state.course.exerciseNote.isLoading,
        isNoteHaveUpdated: state.course.exerciseNote.isHaveUpdated,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getExerciseById,
    getExerciseQuestions,
    checkExerciseAnswers,
    getExerciseNote,
    updateExerciseNote

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
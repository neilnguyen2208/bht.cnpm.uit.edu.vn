import React from "react";

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import AddOrEditQuestionItem from "components/course/AddOrEditQuestionItem";
import ExerciseInfo from "components/course/ExerciseInfo";
import {
    formatMathemicalFormulas,
    styleCodeSnippet
} from "components/common/CustomCKE/CKEditorUtils";
import {
    getAnExerciseInfoByID,
    getAnExerciseQuestionsWithAnswers,
    editAnExerciseQuestionWithAnswers,
    getExerciseQuestionDifficultyTypes
} from 'redux/services/courseServices';
import { authRequest } from "utils/requestUtils";
import store from "redux/store";
import { edit_ExerciseQuestionsWithAnswersReset } from "redux/actions/courseAction";
import { closeModal, openBLModal, openModal } from "redux/services/modalServices";
import ButtonFileUploader from "components/common/FormFileUploader/ButtonFileUploader";
import XLSX from 'xlsx';

class CreateExercise extends React.Component {

    constructor(props) {
        super(props);
        this.defaultQuestion = {
            id: "null-question",
            "content": "<p>Nội dung câu hỏi</p>",
            "rank": -1,
            "explanation": "Giải thích",
            "suggestedDuration": 60,
            "publishDtm": "2021-07-09T21:49:20.062Z",
            "difficultyID": "1",
            "exerciseAnswerRequestDTOs": [
                {
                    id: "null-answer",
                    "content": "<p>Đáp án </p>",
                    "rank": 1,
                    "isCorrect": true
                }
            ]
        }

        this.EXERCISE_QUESTIONS_DTO = [];
        this.isCloseAllCKEInstance = false;
        this.isFirstTimeLoaded = false;
        this.excelFile = null;
    }

    componentDidMount() {
        //get data
        this.props.getAnExerciseInfoByID(this.props.match.params.id);
        this.props.getExerciseQuestionDifficultyTypes();

        //this API is using for update an questions
        authRequest.get(`/exercises/${this.props.match.params.id}/questions`)
            .then(response => {
                if (response.data.length > 0) {
                    this.EXERCISE_QUESTIONS_DTO = response.data;
                    this.EXERCISE_QUESTIONS_DTO.forEach((question, index) => {
                        // question.exerciseAnswerRequestDTOs = response.data[index].exerciseAnswerDTOs ? response.data[index].exerciseAnswerDTOs : [];
                        question.exerciseAnswerRequestDTOs = response.data[index].answers ? response.data[index].answers : [];
                        question.difficultyID = question.difficultyType.id;
                        question.suggestedDuration = question.suggestedDuration === null ? 60 : question.suggestedDuration;
                        question.rank = index;
                        delete question.exerciseAnswerDTOs;
                        delete question.difficultyType;
                    })
                }
                else {
                    // this.EXERCISE_QUESTIONS_DTO = [this.defaultQuestion];
                }
            })
    }

    componentWillUnmount() {
        store.dispatch(edit_ExerciseQuestionsWithAnswersReset());
    }

    addQuestion = () => {
        this.EXERCISE_QUESTIONS_DTO.push({
            ...this.defaultQuestion,
            "exerciseAnswerRequestDTOs": [
                {
                    id: "null-answer",
                    "content": "<p>Đáp án </p>",
                    "rank": 1,
                    "isCorrect": false
                }
            ],
            id: "null-question" + this.EXERCISE_QUESTIONS_DTO.length,
            rank: this.EXERCISE_QUESTIONS_DTO.length
        });
        this.setState({});
    }

    //questionIdentify = questionID if old question, index if new question. 
    deleteQuestion = (questionIdentify) => {
        this.EXERCISE_QUESTIONS_DTO.splice(questionIdentify, 1);
        this.setState({});
    }

    setQuestionContent = (questionIdentify, questionContent, isNewQuestion) => {
        //update view and DTO
        if (isNewQuestion) { //base on index to render

            //update an element in questions list
            this.EXERCISE_QUESTIONS_DTO.forEach((question, index) => {
                if (index === questionIdentify) {
                    this.EXERCISE_QUESTIONS_DTO[index] = questionContent;
                }
            });

            this.setState({});
        }
        else {

        }
    }

    onSaveQuestionsClick = () => {
        let tmp = this.EXERCISE_QUESTIONS_DTO;
        tmp.forEach((question => {

            question.exerciseAnswerRequestDTOs.forEach(answer => {
                if (answer.id === "null-answer") { answer.id = null }
            })

            if (isNaN(question.id) && question.id.substring(0, 13) === "null-question") {
                question.id = null;
            }

            console.log(question.id);
        }))

        openModal("confirmation", {
            title: "Cập nhật bài tập",
            text: "Xác nhận cập nhật bài tập này",
            showIcon: true,
            onConfirm: () => {
                this.props.editAnExerciseQuestionWithAnswers(this.props.match.params.id, tmp);
                closeModal()
            }
        })
    }

    closeAllCKEInstance = () => {
        this.isCloseAllCKEInstance = true;
    }

    render() {
        if (this.props.questionsData && !this.isQuestionsLoading && !this.isFirstTimeLoaded) {
            // this.EXERCISE_QUESTIONS_DTO = this.props.questionsData;
            this.EXERCISE_QUESTIONS_DTO.exerciseAnswerRequestDTOs = this.props.questionsData.exerciseAnswerDTOs;
            this.isFirstTimeLoaded = true;
            this.setState({});
        }

        if (this.props.isHaveEdited) {
            store.dispatch(edit_ExerciseQuestionsWithAnswersReset());
            authRequest.get(`/exercises/${this.props.match.params.id}/questions`)
                .then(response => {
                    if (response.data.length > 0) {
                        this.EXERCISE_QUESTIONS_DTO = response.data;
                        this.EXERCISE_QUESTIONS_DTO.forEach((question, index) => {
                            question.exerciseAnswerRequestDTOs = response.data[index].answers ? response.data[index].answers : [];
                            question.difficultyID = question.difficultyType.id;
                            delete question.exerciseAnswerDTOs;
                            delete question.difficultyType;
                        })
                        this.setState({})
                    }
                    else {
                        // this.EXERCISE_QUESTIONS_DTO = [...this.defaultQuestion];
                    }
                })
            openBLModal({ type: "success", text: "Cập nhật thành công" });

        }

        return (
            <div className="content-layout" >
                <div className="content-container" style={{ borderTop: "5px var(--blue) solid", paddingTop: "2vh" }}>
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
                    {!this.props.isQuestionsLoading && !this.props.isDifficultyTypesLoading && this.EXERCISE_QUESTIONS_DTO.map((questionItem, index) =>
                        <AddOrEditQuestionItem
                            questionData={questionItem}
                            key={index}
                            index={index}
                            deleteQuestion={this.deleteQuestion}
                            setQuestionContent={this.setQuestionContent}
                        />)
                    }

                    <div className="decoration-line" />

                    <div className="j-c-space-between mg-top-10px" >
                        <div className="d-flex">
                            <button className="white-button mg-right-5px" onClick={() => this.addQuestion()}>Thêm câu hỏi</button>
                            <ButtonFileUploader id="ed-ex-question" onFileChange={this.onFileChange} fileType=".xlsx" />
                        </div>
                        <button className="blue-button mg-left-10px" onClick={() => this.onSaveQuestionsClick()}>Lưu</button>
                    </div>

                </div>
            </div>

        );
    }

    onFileChange = (file) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            var data = e.target.result;
            data = new Uint8Array(data);
            var workbook = XLSX.read(data, { type: 'array' });
            var questionSheet = {};
            let newQuestionsList = [];

            var roa = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
            if (roa.length) questionSheet[workbook.SheetNames[0]] = roa;

            console.log(questionSheet);
            // see the result, caution: it works after reader event is done.

            questionSheet[workbook.SheetNames[0]].forEach((row, index) => {

                let newQuestion = {
                    id: "null-question" + this.EXERCISE_QUESTIONS_DTO.length + index,
                    "content": "<p>Nội dung câu hỏi</p>",
                    "rank": -1,
                    "explanation": "Giải thích",
                    "suggestedDuration": 60,
                    "publishDtm": "2021-07-09T21:49:20.062Z",
                    "difficultyID": "1",
                    "exerciseAnswerRequestDTOs": [

                    ]
                }

                newQuestion.rank = this.EXERCISE_QUESTIONS_DTO.length + index;

                //question content 
                if (row[0] && row[0].substring(0, 3) === "Câu") {
                    newQuestion.content = "<p>" + row[1] + "</p>";

                    //difficult type
                    if ((row[2])) {
                        newQuestion.difficultyID = row[2];
                    }

                    //duration
                    if ((row[3])) {
                        console.log(row[3] * 60)
                        newQuestion.suggestedDuration = row[3] * 60;

                    }

                    //browser on next rows until reach Giaỉ thích or undefine
                    for (let j = index; j <= index + 6; j++) {

                        if (questionSheet[workbook.SheetNames[0]][j] && questionSheet[workbook.SheetNames[0]][j][0] && questionSheet[workbook.SheetNames[0]][j][0].length === 1) {
                            //
                            let newAnswer = {
                                id: "null-answer",
                                "content": "<p>Đáp án </p>",
                                "rank": newQuestion.exerciseAnswerRequestDTOs.length,
                                "isCorrect": false
                            }

                            //content
                            if (questionSheet[workbook.SheetNames[0]][j][1])
                                newAnswer.content = "<p>" + questionSheet[workbook.SheetNames[0]][j][1] + "</p>";

                            if (questionSheet[workbook.SheetNames[0]][j][2])
                                newAnswer.isCorrect = true;

                            newQuestion.exerciseAnswerRequestDTOs.push(newAnswer);
                        }

                        //explanation
                        if (questionSheet[workbook.SheetNames[0]][j]
                            && questionSheet[workbook.SheetNames[0]][j][0]
                            && (questionSheet[workbook.SheetNames[0]][j][0] === "Giải thích:"
                                || questionSheet[workbook.SheetNames[0]][j][0] === "Giải thích")) {
                            //content
                            if (questionSheet[workbook.SheetNames[0]][j][1])
                                newQuestion.explanation = "<p>" + questionSheet[workbook.SheetNames[0]][j][1] + "</p>";

                            newQuestionsList.push(newQuestion);
                        }
                    }
                }
            })

            this.EXERCISE_QUESTIONS_DTO = this.EXERCISE_QUESTIONS_DTO.concat(newQuestionsList);
            console.log(this.EXERCISE_QUESTIONS_DTO)
            this.setState({});
        };

        reader.readAsArrayBuffer(file);
    }
}

const mapStateToProps = (state) => {
    return {
        exerciseContent: state.course.currentExercise.data,
        isExerciseLoading: state.course.currentExercise.isLoading,
        questionsData: state.course.exerciseQuestions.data,
        isQuestionsLoading: state.course.exerciseQuestions.isLoading,
        isDifficultyTypesLoading: state.course.difficultyTypes.isLoading,
        isHaveEdited: state.course.isHaveEdited
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAnExerciseInfoByID,
    getAnExerciseQuestionsWithAnswers,
    editAnExerciseQuestionWithAnswers,
    getExerciseQuestionDifficultyTypes
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateExercise));


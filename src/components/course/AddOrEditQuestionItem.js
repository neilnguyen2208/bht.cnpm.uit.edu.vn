import React from 'react'

import 'components/styles/Button.scss'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import './QuestionItem.scss';
import 'components/common/CustomCKE/CKEditorContent.scss';
import correct_icon from 'assets/icons/24x24/correct_icon_24x24.png';
import delete_btn from 'assets/icons/24x24/delete_btn.png';
import Editor from 'components/common/CustomCKE/CKEditor';
import { CommentCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration';
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';
import { styleCodeSnippet, formatMathemicalFormulas } from 'components/common/CustomCKE/CKEditorUtils';

import edit_btn from 'assets/icons/24x24/edit_btn.png';
import Combobox from 'components/common/Combobox/Combobox';

//components
class QuestionItem extends React.Component {

  constructor(props) {
    super(props);
    this.isEditQuestion = false;
    this.isNewQuestion = true;
    this.QUESTION_DTO = {};
    this.defaultAnswer = {
      id: null,
      "content": "<p>Đáp án</p>",
      "rank": 0,
      "isCorrect": false
    };
    this.editingAnswerID = null;
    this.isEditExplaination = false;
    this.isEditDuration = false
    this.isEditDifficulty = false;
    this.difficultyTypesList = [{ id: 0, name: "Chọn độ khó" }]
  }

  componentDidMount() {
    this.isFirstTimeDifficultyListLoaded = false;
  }

  componentDidUpdate() {
    styleCodeSnippet();
  }

  //#region relative to question region 
  deleteQuestion = (itemIndex, isNewQuestion) => {
    if (isNewQuestion) {
      this.props.deleteQuestion(itemIndex);
    }
  }

  onQuestionEditorReady = () => {
    getCKEInstance("question-content-cke-" + this.props.index).setData(this.QUESTION_DTO.content);
  }

  onQuestionEditorChange = (questionContent) => {
    //set data to parent
    this.QUESTION_DTO = { ...this.QUESTION_DTO, content: getCKEInstance("question-content-cke-" + this.props.index).getData() }
    this.props.setQuestionContent(this.props.index, this.QUESTION_DTO, true);
  }

  onEditQuestionClick = () => {
    this.isEditQuestion = true;
    this.onAnswerPreviewClick();
    this.setState({});
  }

  onQuestionPreviewBtnClick = () => {
    this.isEditQuestion = false;
    formatMathemicalFormulas();
    this.setState({});
  }
  //#endregion

  //#region relative to answer item
  onAddAnswerClick = () => {
    this.QUESTION_DTO.exerciseAnswerRequestDTOs.push(this.defaultAnswer);
    this.props.setQuestionContent(this.props.index, this.QUESTION_DTO, true);
    this.setState({});
  }

  onEditAnswerClick = (answerItem, index) => {
    //replace content by ckeditor
    this.editingAnswerIndex = index;
    this.onQuestionPreviewBtnClick();
    this.setState({});
  }

  onAnswerChecked = (index) => {
    //set value of this answer is true in parent component, set new correct anser
    this.QUESTION_DTO.exerciseAnswerRequestDTOs.forEach((item, _index) => {
      item.isCorrect = false;
      console.log(index)
      if (_index === index) item.isCorrect = true;
    })
    this.props.setQuestionContent(this.props.index, this.QUESTION_DTO, true);
    this.setState({});
  }

  onDeleteAnswerClick = (answerItem, index) => {
    this.QUESTION_DTO.exerciseAnswerRequestDTOs.splice(index, 1);
    this.props.setQuestionContent(this.props.index, this.QUESTION_DTO, true);
    this.setState({});
    return;
  }

  onAnswerEditorReady = (answer, index) => {
    getCKEInstance("answer-content-cke-" + this.props.index + "-" + index).setData(answer.content);
  }

  onAnswerEditorChange = (answer, index) => {
    this.QUESTION_DTO.exerciseAnswerRequestDTOs[index].content = getCKEInstance("answer-content-cke-" + this.props.index + "-" + index).getData();
    this.props.setQuestionContent(this.props.index, this.QUESTION_DTO, true);
    this.setState({});
  }

  onAnswerPreviewClick = (index) => {
    this.editingAnswerIndex = null;
    this.setState({});
  }
  //#endregion

  //#region relative to explanation 
  onExplainationEditorChange = () => {
    this.QUESTION_DTO.explanation = getCKEInstance("explanation-cke-" + this.props.index).getData();
    this.props.setQuestionContent(this.props.index, this.QUESTION_DTO, true);
    this.setState({});
  }

  onExplainationEditorReady = () => {
    getCKEInstance("explanation-cke-" + this.props.index).setData(this.QUESTION_DTO.explanation);
  }

  onEditExplainationClick = () => {
    this.isEditExplaination = true;
    this.setState({});
  }

  onPreviewExplainationClick = () => {
    this.isEditExplaination = false;
    this.setState({});
  }
  //#endregion

  //for update difficulty ID 
  onDifficultyOptionChanged = (selectedOption) => {
    this.QUESTION_DTO.difficultyID = selectedOption.id;
    this.props.setQuestionContent(this.props.index, this.QUESTION_DTO, true);
  }

  //for update suggested duration
  onTimeDurationChange = (e) => {
    this.QUESTION_DTO.suggestedDuration = e.target.value * 60;
    this.props.setQuestionContent(this.props.index, this.QUESTION_DTO, true);
  }

  render() {
    styleCodeSnippet();
    formatMathemicalFormulas();

    //when data is loaded
    if (this.props.questionData) {
      this.QUESTION_DTO = this.props.questionData;
    }

    if (!this.props.isDifficultyTypesLoading && this.props.difficultyTypesList.length && !this.isFirstTimeDifficultyListLoaded) {
      this.difficultyTypesList = this.props.difficultyTypesList;
      this.isFirstTimeDifficultyListLoaded = true;
      this.setState({});
    }
    console.log(this.props.index)
    return (
      //add id for navigation
      <div className="question-item-container">
        <div className="question-item-top-bar">
          {/* {!this.isNewQuestion && <button className="white-button ">Chỉnh sửa</button>} */}
          <img className="delete-imgbtn mg-left-5px" src={delete_btn} alt="x" onClick={() => { this.deleteQuestion(this.props.index, true) }} />
        </div>
        <div className="question-item" id={"qsitm-" + this.props.index} style={{ scrollMarginTop: "80px" }}>
          <div className="w-100-percents">
            <div className="j-c-space-between w-100-percents">
              <div className="d-flex">
                <div className="question-index">
                  Câu {this.props.index}:
                </div>
              </div>
            </div>
          </div>

          {!this.isEditQuestion ?
            <div className="j-c-space-between">
              <div className="ck-editor-output question-content" style={{ fontSize: "15px" }}
                dangerouslySetInnerHTML={{
                  __html:
                    this.QUESTION_DTO.content
                }}
              />
              <img src={edit_btn} alt="" className="question-item-btn" onClick={() => this.onEditQuestionClick()} />
            </div>
            :
            <div className="mg-top-10px mg-bottom-10px">
              <Editor editorId={"question-content-cke-" + this.props.index}
                onChange={() => this.onQuestionEditorChange()}
                onInstanceReady={() => this.onQuestionEditorReady()}
                height={120}
                autoGrow_maxHeight={200}
                autoGrow_minHeight={120}
                config={CommentCKEToolbarConfiguration}
              />

              <div className="j-c-end mg-top-10px">
                <button className="white-button " onClick={() => { this.onQuestionPreviewBtnClick() }}>Xong</button>
              </div>
            </div>

          }

          {/* answer items */}
          {
            this.QUESTION_DTO.exerciseAnswerRequestDTOs.map((answer, index) => {
              return <div className="answer-item" key={answer.id + index} style={{ fontSize: "15px" }}  >
                <div className="j-c-space-between">
                  <label className="container">
                    <input type="radio" checked={answer.isCorrect}
                      onClick={() => this.onAnswerChecked(index)}
                      name={"fieldset-" + this.props.index} />


                    {this.editingAnswerIndex !== index ?
                      <div className="d-flex">
                        <div className="question-content ck-editor-output" style={{ fontSize: "15px", marginBottom: " 5px", lineHeight: "20px" }}
                          dangerouslySetInnerHTML={{
                            __html: answer.content
                          }} />
                      </div> :

                      <div>
                        <Editor editorId={"answer-content-cke-" + this.props.index + "-" + index}
                          onChange={() => this.onAnswerEditorChange(answer, index)}
                          onInstanceReady={() => this.onAnswerEditorReady(answer, index)}
                          height={120}
                          autoGrow_maxHeight={200}
                          autoGrow_minHeight={120}
                          config={CommentCKEToolbarConfiguration}
                        />
                        <div className="j-c-end mg-top-10px" style={{ marginBottom: "15px" }}>
                          <button className="white-button " onClick={() => { this.onAnswerPreviewClick(index) }}>Xong</button>
                        </div>
                      </div>}

                    <span className="checkmark"></span>
                  </label>

                  {this.editingAnswerIndex !== index &&
                    <div className="d-flex">
                      <img src={edit_btn} alt="" className="question-item-btn" onClick={() => this.onEditAnswerClick(answer, index)} />
                      <img src={delete_btn} alt="" className="question-item-btn mg-left-5px" onClick={() => this.onDeleteAnswerClick(answer, index)} />
                    </div>
                  }

                </div>
              </div>
            })
          }

          < div className=" mg-bottom-10px" >
            <button className="white-button " onClick={() => { this.onAddAnswerClick() }}>Thêm đáp án</button>
          </div>

          {/* explanation */}
          {!this.isEditExplaination ?
            this.QUESTION_DTO.explanation && <div className="mg-bottom-10px">
              <div className="exercise-explanation j-c-space-between" id={"xrcs-xplntn" + this.QUESTION_DTO.id}>
                <div className="question-content ck-editor-output" style={{ fontSize: "15px" }}
                  dangerouslySetInnerHTML={{
                    __html: this.QUESTION_DTO.explanation
                  }} />
                <div className="d-flex">
                  <img src={edit_btn} alt="" className="question-item-btn" onClick={() => this.onEditExplainationClick()} />
                </div>
              </div>

            </div> :
            this.QUESTION_DTO.explanation && <div className="mg-bottom-10px">
              <div className="exercise-explanation" id={"xrcs-xplntn" + this.QUESTION_DTO.id}>
                <Editor editorId={"explanation-cke-" + this.props.index}
                  onChange={() => this.onExplainationEditorChange()}
                  onInstanceReady={() => this.onExplainationEditorReady()}
                  height={120}
                  autoGrow_maxHeight={200}
                  autoGrow_minHeight={120}
                  config={CommentCKEToolbarConfiguration}
                />
                <div className="j-c-end mg-top-10px">
                  <button className="white-button " onClick={() => { this.onPreviewExplainationClick() }}>Xong</button>
                </div>
              </div>
            </div>
          }

          {/* difficulty and duration time */}

          <div className="j-c-start">
            <div className="form-group" style={{ width: "300px" }}>
              <label className="form-label">Độ khó:</label>
              <Combobox comboboxId={"ed-question-difficulty-combobox" + this.props.index}
                selectedOptionID={!this.props.isDifficultyTypesLoading ? this.QUESTION_DTO.difficultyID : 0}
                options={this.difficultyTypesList}
                onOptionChanged={(selectedOption) => this.onDifficultyOptionChanged(selectedOption)}
                placeHolder="Chọn độ khó" >
              </Combobox>
              <div className="form-error-label-container">
                <span className="form-error-label" ></span>
              </div>
            </div>
            <div className="form-group" style={{ width: "fit-content" }}>
              <label className="form-label">Thời gian đề xuất:</label>
              <div className="j-c-start">
                <input type="number" className="text-input"
                  style={{ width: "50px", minWidth: "50px", marginLeft: "0px", marginRight: "5px" }}
                  defaultValue={this.QUESTION_DTO.suggestedDuration ? this.QUESTION_DTO.suggestedDuration / 60 : 1}
                  onChange={(e) => this.onTimeDurationChange(e)} />
                <div style={{ marginTop: "3px" }}>phút</div>
              </div>
            </div>
          </div>
        </div >
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDifficultyTypesLoading: state.course.difficultyTypes.isLoading,
    difficultyTypesList: state.course.difficultyTypes.data,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionItem));


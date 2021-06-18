import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import QuestionReactionbar from 'components/course/QuestionItemReactionbar'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import './QuestionItem.scss'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';

//components
class QuestionItem extends React.Component {

  onAnswerChecked = (questionId, answer) => {
    //Create current answer object and replace in parent.
    this.props.onAnswerChecked(questionId, answer);
  }

  render() {

    return (
      //add id for navigation
      <div className="question-item" id={"qsitm-" + this.props.questionId} style={{ scrollMarginTop: "80px" }}>
        <div className="question-index">
          Câu {this.props.index + 1}:
        </div>
        <div className="ck-editor-output question-content" style={{ fontSize: "15px" }}>
          {this.props.content}
        </div>
        <div className="answer-container ck-editor-output" style={{ fontSize: "15px" }} >
          {this.props.answers.map(answer => {
            return <div className="answer-item" style={{ fontSize: "15px" }}  >
              {/* <fieldset id={"fieldset" + answer.id} style={{ border: "none", padding: "0px", paddingLeft: "10px" }}> */}
              <label class="container">
                {answer.content}
                <input type="radio" onClick={() => this.onAnswerChecked(this.props.questionId, answer)} name={"fieldset" + answer.id} />
                <span class="checkmark"></span>
              </label>
              {/* </fieldset> */}
            </div>
          })}
        </div>
        <QuestionReactionbar />
        {formatMathemicalFormulas()}
        {styleCodeSnippet()}
      </div >);
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionItem));


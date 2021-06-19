import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import flaged_icon from 'assets/icons/24x24/blue_flag_icon_24x24.png';
import unflaged_icon from 'assets/icons/24x24/gray_flag_icon_24x24.png';

//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import './QuestionItem.scss'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';

//components
class QuestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.isFlagged = false;
  }

  toggleFlagImage = () => {
    this.isFlagged = !this.isFlagged;
    this.setState({});
    this.props.onQuestionFlagged(this.props.questionId, this.isFlagged);
  }

  onAnswerChecked = (questionId, answer) => {
    //Create current answer object and replace in parent.
    this.props.onAnswerChecked(questionId, answer);
  }

  render() {
    // 
    //#region like, unlike buttons
    let flagBtn = <div></div>;

    // render flagBtn
    if (this.isFlagged) {
      flagBtn = <div className="d-flex">
        <img className="save-btn" alt="like" src={flaged_icon} />
        <div className="save-btn-text" style={{ marginLeft: "5px" }}>Huỷ</div>
      </div>
    }
    else {
      flagBtn = <div className="d-flex" >
        <img className="save-btn" alt="dislike" src={unflaged_icon} />
        <div className="save-btn-text" style={{ marginLeft: "5px" }}>Đặt cờ</div>
      </div >
    }
    return (
      //add id for navigation
      <div className="question-item" id={"qsitm-" + this.props.questionId} style={{ scrollMarginTop: "80px" }}>
        <div className="question-index">
          Câu {this.props.index + 1}:
        </div>
        <div className="ck-editor-output question-content" style={{ fontSize: "15px" }}
          dangerouslySetInnerHTML={{
            __html:
              this.props.content
          }}
        />

        {this.props.answers.map(answer => {
          return <div className="answer-item" style={{ fontSize: "15px" }}  >
            <label class="container">
              <div className="answer-container ck-editor-output" style={{ fontSize: "15px" }}
                dangerouslySetInnerHTML={{
                  __html: answer.content
                }} />
              <input type="radio" onClick={() => this.onAnswerChecked(this.props.questionId, answer)} name={"fieldset" + this.props.questionId} />
              <span class="checkmark"></span>
            </label>
          </div>
        })}
        <div className="reaction-bar" style={{ borderTop: "0px", borderBottom: "1px solid var(--gray)", paddingBottom: "5px" }}>
          <div className="d-flex mg-top-5px">
            <div className="flag-btn-container" onClick={this.toggleFlagImage}>
              <div className="d-flex"> {flagBtn}</div>
            </div>
          </div>
        </div >
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


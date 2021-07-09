import React from 'react'

import 'components/styles/Button.scss'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import './QuestionItem.scss'
import correct_icon from 'assets/icons/24x24/correct_icon_24x24.png'
import PopupMenu from 'components/common/PopupMenu/PopupMenu';
import { guestMenu } from './adapter/actionMenu';

//components
class QuestionItem extends React.Component {

  constructor(props) {
    super(props);
    this.answers = [];
    this.explaination = "";
  }

  renderAnswerItem = () => {

  }

  render() {

    return (
      //add id for navigation
      <div className = "question-item-container">
        <div className="question-item-top-bar">
          <button className="white-button">Xem trước</button>

        </div>
        <div className="question-item" id={"qsitm-" + "this.props.questionId"} style={{ scrollMarginTop: "80px" }}>
          <div className="w-100-percents">
            <div className="j-c-space-between w-100-percents">
              <div className="d-flex">
                <div className="question-index">
                  Câu {this.props.index + 1}:
                </div>
              </div>
            </div>

          </div>
          <div className="ck-editor-output question-content" style={{ fontSize: "15px" }}
            dangerouslySetInnerHTML={{
              __html:
                "this.props.content"
            }}
          />

          {/* answer items */}
          {
            this.answers.map(answer => {
              return <div className="answer-item" key={answer.id} style={{ fontSize: "15px" }}  >
                <label className="container">
                  <input type="radio" checked={this.props.isChecked && this.props.answersSelected.includes(answer.id)}
                    onClick={!this.props.isChecked ? () => this.onAnswerChecked(this.props.questionId, answer) : (e) => { e.preventDefault() }}
                    name={"fieldset" + "this.props.questionId"} />

                  <div className="d-flex">
                    <div className="answer-container ck-editor-output" style={{ fontSize: "15px" }}
                      dangerouslySetInnerHTML={{
                        __html: answer.content
                      }} />

                  </div>
                  <span className="checkmark"></span>
                </label>
              </div>
            })
          }

          {
            this.explaination && <div className="mg-bottom-10px">
              <div className="exercise-explaination d-none" id={"xrcs-xplntn" + this.props.questionId}>
                {this.explaination}
              </div>
            </div>
          }

        </div >
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionItem));


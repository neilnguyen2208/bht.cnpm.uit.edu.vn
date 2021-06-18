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

//components
class QuestionItem extends React.Component {
  render() {

    return (
      //add id for navigation
      <div className="question-item">
        <div className="question-index">
          Câu {this.props.index}:
        </div>
        <div className="ck-editor-output question-content" style={{ fontSize: "15px" }}>
          {this.props.content}
        </div>
        <div className="answer-container ck-editor-output" style={{ fontSize: "15px" }} >
          {this.props.answers.map(answer => {
            return <div className="answer-item" style={{ fontSize: "15px" }}  >
              <label class="container">
                {answer.content}
                <input type="radio" name="radio" />
                <span class="checkmark"></span>
              </label>
            </div>
          })}
        </div>
        <QuestionReactionbar />
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


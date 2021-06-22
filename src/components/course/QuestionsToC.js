import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import { update_QuestionsToCReset } from 'redux/actions/courseAction';
import store from 'redux/store';
import flag_icon from 'assets/icons/24x24/gray_flag_icon_24x24.png';

//components
class QuestionToC extends React.Component {

  render() {

    if (this.props.isQuestionSet) {
      store.dispatch(update_QuestionsToCReset())
    }

    return (
      <div className="relative-sidebar">
        <div className="relative-title" style={{ fontFamily: "BarlowCondensed-Medium", fontWeight: "400" }}>
          {this.props.title}{this.props.isQuestionSet}
        </div>
        <div className="d-flex">
          <div className="grid-question-items-container">
            {!this.props.isQuestionSet && this.props.questionsToC.length > 0 && this.props.questionsToC.map((item, index) =>
              <div key={index}>
                <div style={{ poistion: "relative" }}>
                  {item.isFlagged && <img src={flag_icon} alt="" style={{ width: "auto", height: "16px", position: "absolute", marginTop: "18px", marginLeft: "23px" }} />}
                </div>
                <div className={!item.isChecked && item.isAnswered ? "question-toc-item answered" :
                  item.isChecked && item.isCorrect ? "question-toc-item correct" : item.isChecked && !item.isCorrect ? "question-toc-item wrong" :
                    "question-toc-item"}

                  key={item.id} id={"qstn-tocitm-" + item.id}
                  onClick={() => {
                    if (document.getElementById("qsitm-" + item.id))
                      (document.getElementById("qsitm-" + item.id)).scrollIntoView(50)
                  }}
                >
                  {index + 1}
                </div>
              </div>
            )
            }
          </div>
        </div>
      </div >);

  }
}

const mapStateToProps = (state) => {
  return {
    questionsToC: state.course.questionsToC.data,
    isQuestionSet: state.course.questionsToC.isSet,

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionToC));


import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'

//components
class RelativePosts extends React.Component {



  render() {
    return (
      <div className="relative-sidebar">
        <div className="relative-title" style={{ fontFamily: "BarlowCondensed-Medium", color: "var(--black)" }}>
          {this.props.title}
        </div>
        <div className="d-flex">
          <div className="grid-question-items-container">
            {this.props.items.map((item, index) =>
              <div className={item.isAnswered ? "question-toc-item answered" :
                "question-toc-item"}

                key={item.id} id={"qstn-tocitm-" + item.id}
                onClick={() => {
                  console.log(document.getElementById("qsitm-" + item.id).style.top)
                  if (document.getElementById("qsitm-" + item.id))
                    (document.getElementById("qsitm-" + item.id)).scrollIntoView(50)
                }}
              >
                {index + 1}
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
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RelativePosts));


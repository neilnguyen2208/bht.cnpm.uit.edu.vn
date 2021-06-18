import React from 'react'

import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Reactionbar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'

class NormalReactionbar extends React.Component {
  render() {

    return (
      <div className="reaction-bar" style={this.props.type === "DETAIL" ? { borderTop: "none", borderBottom: "1px var(--grayish) solid" } : {}}>
        <div className=" mg-top-10px j-c-end">
          <Link className="blue-button" to={"/courses/exercise-content/" + this.props.exerciseId}>Giải bài tập</Link>
        </div>
      </div >

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NormalReactionbar));


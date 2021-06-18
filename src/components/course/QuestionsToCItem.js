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
        <div className="relative-title">
          {this.props.title}
        </div>
        <div style={{ padding: "5px" }}>
          {this.props.items.map(item =>
            <Link to={"/post-content/" + item.id} className="relative-item" key={item.id} onClick={() => this.props.getPostByID(item.id)} >
              <div className="relative-item-icon" />
              <div className="relative-item-title">{item.title}</div>
            </Link>
          )
          }
        </div >
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


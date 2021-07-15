import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import { getAPostByID } from 'redux/services/postServices';
import { getADocumentByID } from 'redux/services/documentServices';
import { getAnExerciseInfoByID } from 'redux/services/courseServices';

//constants

//components
class BottomRelativeItems extends React.Component {
  render() {
    if (this.props.items.length > 0)

      return (
        <div className="relative-to-post">
          <div className="relative-title">
            {this.props.title}
          </div>
          <div style={{ flexWrap: "wrap", display: "flex", justifyContent: "space-between" }}>
            {this.props.items.map(item =>
              <div className="relative-item-container bottom">
                <div className="d-flex">
                  <img className="avatar _50x50 round border mg-top-5px mg-right-5px" src={item.author.avatarURL} alt="" />
                  <div>
                    <div className="d-flex">
                      {this.props.type === "DOCUMENT" &&
                        <Link to={"/document-content/" + item.id} className="relative-item" key={item.id} onClick={() => this.props.getADocumentByID(item.id)} >
                          <div className="relative-item-title">{item.title}</div>
                        </Link>
                      }

                      {this.props.type === "EXERCISE" &&
                        <Link to={"/courses/exercise/" + item.id} className="relative-item" key={item.id} onClick={() => this.props.getAnExerciseInfoByID(item.id)} >
                          <div className="relative-item-title">{item.title}</div>
                        </Link>
                      }

                      {this.props.type === "POST" &&
                        <Link to={"/post-content/" + item.id} className="relative-item" key={item.id} onClick={() => this.props.getAPostByID(item.id)} >
                          <div className="relative-item-title">{item.title}</div>
                        </Link>
                      }

                    </div>
                    {item.description && <div className="summary-text">{item.description}</div>}
                    {item.summary && <div className="summary-text">{item.summary}</div>}
                  </div>
                </div>
              </div>
            )}
          </div >
        </div >);
    return <div>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAPostByID,
  getADocumentByID,
  getAnExerciseInfoByID
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BottomRelativeItems));


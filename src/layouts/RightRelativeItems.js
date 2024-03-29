import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'components/styles/Metadata.scss'
//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import { getAPostByID } from 'redux/services/postServices';
import { getADocumentByID } from 'redux/services/documentServices';
import { getAnExerciseInfoByID } from 'redux/services/courseServices';
//constants

//components
class RelativeRight extends React.Component {
  render() {
    if (this.props.items.length > 0)

      return (
        <div className="relative-sidebar">
          <div className="relative-title">
            {this.props.title}
          </div>
          <div style={{ padding: "5px" }}>
            {this.props.items.map(item => <div className="relative-item-container">
              <div className="d-flex">
                <img className="avatar _35x35 corner border mg-top-5px mg-right-5px" src={item.author.avatarURL} alt="" />
                {this.props.type === "DOCUMENT" &&
                  <div style={{ display: "table", height: "44px", overflow: "hidden" }}>
                    <div style={{
                      display: "table-cell", verticalAlign: "middle"
                    }}>
                      <Link to={"/document-content/" + item.id} className="relative-item" key={item.id} onClick={() => this.props.getADocumentByID(item.id)} >
                        <div className="relative-item-title">{item.title}</div>
                      </Link>
                    </div>
                  </div>
                }

                {this.props.type === "EXERCISE" &&
                  <div style={{ display: "table", height: "44px", overflow: "hidden" }}>
                    <div style={{
                      display: "table-cell", verticalAlign: "middle"
                    }}>
                      <Link to={"/courses/exercise/" + item.id} className="relative-item" key={item.id} onClick={() => this.props.getAnExerciseInfoByID(item.id)} >
                        <div className="relative-item-title">{item.title}</div>
                      </Link>
                    </div>
                  </div>
                }

                {this.props.type === "POST" &&
                  <div style={{ display: "table", height: "44px", overflow: "hidden" }}>
                    <div style={{
                      display: "table-cell", verticalAlign: "middle"
                    }}>
                      <Link to={"/post-content/" + item.id} className="relative-item" key={item.id} onClick={() => this.props.getAPostByID(item.id)} >
                        <div className="relative-item-title">{item.title}</div>
                      </Link>
                    </div>
                  </div>
                }

              </div>
            </div>)
            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RelativeRight));


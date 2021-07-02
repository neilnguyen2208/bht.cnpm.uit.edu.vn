import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import { getDocumentById } from 'redux/services/documentServices'
//constants

//components
class RelativeDocuments extends React.Component {
  render() {
    if (this.props.items.length > 0)

      return (
        <div className="relative-sidebar">
          <div className="relative-title">
            {this.props.title}
          </div>
          <div style={{ padding: "5px" }}>
            {this.props.items.map(item =>
              <Link to={"/document-content/" + item.id} className="relative-item" key={item.id} onClick={() => this.props.getDocumentById(item.id)} >
                <div className="relative-item-icon" />
                <div className="relative-item-title">{item.title}</div>
              </Link>
            )
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
  getDocumentById
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RelativeDocuments));


import React, { Component } from 'react'

import 'components/styles/SimpleButton.scss'
//resources
import './Metadata.scss'

//styles
import 'components/styles/SimpleLabel.scss'

//constants
import { componentType } from 'constants.js'

//components
class Metadata extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="metadata" >
        <div className="title">
          {this.props.title}
        </div>

        <div className="d-flex">
          <div className="category">
            {this.props.category}
          </div>
          <div className="metadata-label">
            {`${Math.ceil(this.props.readingTime / 60)} phút đọc`}
          </div>
        </div>

        <div className="d-flex mg-top-10px" >
          <img className="avatar" src=
            {this.props.avartarURL} alt="avatar" />
          <div className="mg-left-5px d-flex-vertical">
            <div className="author-name">
              {this.props.authorName}
            </div>
            <div className="published-time">{`đã đăng vào ngày ${this.props.publishDtm.substring(0, 10)} `}</div>
          </div>
        </div>

      </div >
    );
  }


}
export default Metadata;


import React from 'react'
import 'components/styles/Button.scss'
import 'components/styles/HomeItem.scss'
import { Link } from 'react-router-dom'
import createDOMPurify from 'dompurify';

class HomeFirstInfo extends React.Component {

  componentDidMount() {
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(this.props.description);
    if (document.querySelector(`#rprt-pst-ctnt-${this.props.id}`))
      document.querySelector(`#rprt-pst-ctnt-${this.props.id}`).innerHTML = clean;
  }

  render() {

    return (
      <div className="home-item" style={{
        border: '1px solid var(--gray)',
        padding: "10px",
        paddingTop: "0px",
        boxShadow: "0px 0px 3px 0px"
      }} >
        <div className="metadata" >
          <div className="j-c-space-between mg-top-10px">
            <div className="d-flex">
              <div className="category">
                {this.props.categoryName}
              </div>
            </div>
            <div className="d-flex" >
              <div className="metadata-label" style={{ marginLeft: "2px" }}>
                {this.props.subjectName}
              </div>
              <div className="metadata-label" style={{ marginLeft: "2px" }}>
                {this.props.publishDtm.substring(0, 10)}
              </div>
            </div>

          </div>
        </div>

        {/* title */}
        <Link to={"/courses/exercise/" + this.props.id}>
          <div className="title title-hv">
            {this.props.title}
          </div>
          <div className="title-hv-c">
            <div className="title-hv-m">
              {this.props.title}
            </div>
          </div>
        </Link>

        <div className="d-flex mg-top-5px" >
          <Link to={`/user/profile/${this.props.authorID}`}>
            <img style={{ marginLeft: "5px" }} className="avatar" src={this.props.authorAvatarURL} alt="" />
          </Link>
          <Link className="link-label-s mg-left-5px" style={{ lineHeight: "25px" }} to={`/user/profile/${this.props.authorID}`}>
            {this.props.authorDisplayName}
          </Link>
        </div>

        <div className="summary-text" style={{ height: "48px", }}>
          <div className="ck-editor-output" style={{ marginTop: "10px" }} id={"rprt-pst-ctnt-" + this.props.id} />
        </div>

      </div>
    );
  }
}
export default HomeFirstInfo;
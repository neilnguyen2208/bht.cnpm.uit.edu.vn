import React from 'react'
import 'components/styles/Button.scss'
import 'components/styles/HomeItem.scss'
import { Link } from 'react-router-dom'
import HomeReactionbar from 'components/document/HomeReactionbar'
import createDOMPurify from 'dompurify';

class HomeTextInfo extends React.Component {

  componentDidMount() {
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(this.props.description);
    if (document.querySelector(`#rprt-pst-ctnt-${this.props.documentID}`))
      document.querySelector(`#rprt-pst-ctnt-${this.props.documentID}`).innerHTML = clean;
  }

  render() {

    return (
      <div className="home-item text" >
        <div className="metadata" >
          <div className="j-c-space-between">
            <div className="d-flex">
              <div className="d-flex">
                <div className="category">
                  {this.props.categoryName}
                </div>
              </div>
              <div className="light-black-label">bởi</div>
              <Link className="link-label-s" to={`/user/profile/${this.props.authorID}`}>
                {this.props.authorDisplayName}
              </Link>
            </div>
          </div>
        </div>

        {/* title */}
        <div className="d-flex mg-top-10px" >
          <Link to={`/user/profile/${this.props.authorID}`}>
            <img className="avatar" src={this.props.authorAvatarURL} alt="" />
          </Link>
          <div style={{ marginLeft: "10px" }}>
            <Link to={"/document-content/" + this.props.documentID}>
              <div className="title title-hv" style={{ marginTop: "-2px" }}>
                {this.props.title}
              </div>
              <div className="title-hv-c">
                <div className="title-hv-m">
                  {this.props.title}
                </div>
              </div>
            </Link>

            <div className="d-flex">
              <div className="d-flex"  >
                <div className="metadata-label" style={{ marginLeft: "2px" }}>
                  {this.props.subjectName}
                </div>
              </div>
              <div className="d-flex" >
                <div className="metadata-label" style={{ marginLeft: "2px" }}>
                  {this.props.publishDtm.substring(0, 10)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-text" style={{ height: "48px", }}>
          <div className="ck-editor-output" style={{ marginTop: "10px" }} id={"rprt-pst-ctnt-" + this.props.documentID} />
        </div>

        <HomeReactionbar
          documentID={this.props.documentID}
          likeCount={this.props.likeCount}
          dislikeCount={this.props.dislikeCount}
          docReactionType={this.props.docReactionType}
          commentCount={this.props.commentCount}
          downloadCount={this.props.downloadCount}
          viewCount={this.props.viewCount}
        />
      </div>


    );
  }


}
export default HomeTextInfo;
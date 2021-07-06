import React from 'react'
import 'components/styles/Button.scss'
import 'components/styles/HomeItem.scss'
import { Link } from 'react-router-dom'
import HomeReactionbar from 'components/document/HomeReactionbar'

class HomeTextInfo extends React.Component {
  componentDidMount() {
  }

  render() {

    return (
      <div className="home-item" >
        <img className="cover-image" alt='Tài liệu này không có hình ảnh.' src={this.props.imageURL} />
        <div className="metadata" >
          <div className="j-c-space-between mg-top-10px">
            <div className="d-flex">
              <div className="category">
                {this.props.categoryName}
              </div>
            </div>
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

        {/* title */}
        <Link to={"/document-content/" + this.props.documentID}>
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
            <img className="avatar" src={this.props.authorAvatarURL} alt="" />
          </Link>
          <Link className="link-label-s mg-left-5px" style={{ lineHeight: "25px" }} to={`/user/profile/${this.props.authorID}`}>
            {this.props.authorDisplayName}
          </Link>
        </div>

        <div className="summary-text">
          {this.props.description}
        </div>
        <HomeReactionbar
          documentID={this.props.documentID}
          likeCount={this.props.likeCount}
          dislikeCount={this.props.dislikeCount}
          docReactionType={this.props.docReactionType ? this.props.docReactionType : "NONE"}
          commentCount={this.props.commentCount}
          downloadCount={this.props.downloadCount}
          viewCount={this.props.viewCount}
        />
      </div>
    );
  }
}
export default HomeTextInfo;
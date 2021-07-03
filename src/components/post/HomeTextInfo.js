import React from 'react'
import 'components/styles/Button.scss'
import 'components/styles/HomeItem.scss'
import { Link } from 'react-router-dom'
import HomeReactionbar from 'components/post/HomeReactionbar'

class HomeTextInfo extends React.Component {
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

        <div className="d-flex mg-top-10px" >
          <Link to={`/user/profile/${this.props.authorID}`}>
            <img className="avatar" src={this.props.authorAvatarURL} alt="" />
          </Link>
          <div style={{ marginLeft: "10px" }}>
            <Link to={"/post-content/" + this.props.id} >
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
                  {Math.ceil(this.props.readingTime / 60) + " phút đọc"}
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

        <div className="summary-text">
          {this.props.summary}
        </div >
        
        <div className="reaction-padding-by-wrapper">
          <HomeReactionbar
            id={this.props.id}
            likeStatus={this.props.likeStatus}
            savedStatus={this.props.savedStatus}
            readingTime={this.props.readingTime}
            likeCount={this.props.likeCount}
            commentCount={this.props.commentCount}
            viewCount={this.props.viewCount}
          /></div>
      </div>
    );
  }


}
export default HomeTextInfo;
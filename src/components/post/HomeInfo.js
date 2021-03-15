import React, { Component } from 'react'
import 'components/styles/Button.scss'
import 'components/styles/HomeItem.scss'
import { Link } from 'react-router-dom'
import HomeReactionbar from 'components/post/HomeReactionbar'

class HomeInfo extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="home-item" >
        <img className="cover-image" alt='cover' src={this.props.imageURL} />
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


        {/* title */}
        <Link to={"/post-content/" + this.props.id}>
          <div className="title">
            {this.props.title}
          </div>
        </Link>

        <div className="d-flex mg-top-5px" >
          <img className="avatar" src={this.props.authorAvatarURL} alt="" />
          <Link className="link-label-s mg-left-5px" style={{ lineHeight: "25px" }} to={/user/}>
            {this.props.authorName}
          </Link>
        </div>

        <div className="summary-text">
          {this.props.summary}
        </div>
        <HomeReactionbar
          id={this.props.id}
          likeStatus={this.props.likeStatus}
          savedStatus={this.props.savedStatus}
          readingTime={this.props.readingTime}
          likeCount={this.props.likeCount}
          commentCount={this.props.commentCount}
        />
      </div>


    );
  }


}
export default HomeInfo;
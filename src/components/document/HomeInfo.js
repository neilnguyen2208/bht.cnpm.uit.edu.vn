import React from 'react'
import 'components/styles/Button.scss'
import 'components/styles/HomeItem.scss'
import { Link } from 'react-router-dom'
import HomeReactionbar from 'components/document/HomeReactionbar'

class HomeInfo extends React.Component {
  componentDidMount() {

  }
  render() {

    return (
      <div className="home-item" >
        <img className="document-cover-image" alt='cover' src={this.props.imageURL} />
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
        <Link to={"/document-content/" + this.props.id}>
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
          <img className="avatar" src={this.props.authorAvatarURL} alt="" />
          <Link className="link-label-s mg-left-5px" style={{ lineHeight: "25px" }} to={/user/}>
            {this.props.authorName}
          </Link>
        </div>

        <div className="summary-text">
          {this.props.description}
        </div>
        <HomeReactionbar
          id={this.props.id}
          likeCount={this.props.likeCount ? this.props.likeCount : 2}
          dislikeCount={this.props.dislikeCount ? this.props.dislikeCount : 3}
          docReactionType={this.props.docReactionType ? this.props.docReactionType : "NONE"}
          commentCount={this.props.commentCount ? this.props.commentCount : 10}
          downloadCount={this.props.downloadCount ? this.props.downloadCount : 21}
          viewCount={this.props.viewCount ? this.props.viewCount : 1200}
        />
      </div>


    );
  }


}
export default HomeInfo;
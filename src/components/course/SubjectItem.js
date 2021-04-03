import React, { Component } from 'react'

//resource
import graySaveIcon from 'assets/icons/24x24/nb_gray_bookmark_icon_24x24.png'
import blueSaveIcon from 'assets/icons/24x24/bfbookmark_icon_24x24.png'

import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'

//styles
import 'components/styles/Button.scss'
import './SubjectItem.scss'

//components
import { Link } from 'react-router-dom'

class CourseSummaryItem extends Component {

  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.title = this.props.title;
    this.image = this.props.image;



  }

  onSaveBtnClick = () => {

  }

  onUnSaveBtnClick = () => {

  }

  componentDidMount() {

  }

  render() {

    //initiate some element
    let saveBtn = <div></div>;

    //render likeBtn
    if (!this.props.isSaved) {
      saveBtn = <img className="" alt="like" src={graySaveIcon} onClick={this.onUnSaveBtnClick}></img>
    }
    else {
      saveBtn = <img className="" alt="like" src={blueSaveIcon} onClick={this.onSaveBtnClick} ></img>
    }

    return (
      <div className="subject-item" >
        <div className="image-container">
          <img className="image" alt={"...loading"} src={this.props.image} />
        </div>
        <div className="c-title-bar">
          <Link className="title" to={"/courses/:id"}>
            {this.props.name}
          </Link>
          <div className="save-btn-container">
            <div className="save-btn">
              {!this.props.isSaved ?
                <img alt="save_btn" className="save-btn-img" src={graySaveIcon} /> :
                <img alt="save_btn" className="save-btn-img" src={blueSaveIcon} />
              }
            </div>
          </div>
        </div>
      </div >
    );
  }


}
export default CourseSummaryItem;
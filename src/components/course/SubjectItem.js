import React from 'react'

//styles
import 'components/styles/Button.scss'
import './SubjectItem.scss'

//components
import { Link } from 'react-router-dom'

class CourseSummaryItem extends React.Component {

  constructor(props) {
    super(props);
    this.id = this.props.id;
    this.title = this.props.title;
    this.image = this.props.image;
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="course-item" >
        <div className="cover-image-container">
          <img className="cover-image" alt='Môn học này không có hình ảnh.' src={this.props.imageURL} />
        </div>
        <div className="metadata" >

          <div className="j-c-space-between mg-top-10px">
            <div className="d-flex">
              {/* <div className="category">
                {this.props.category}
              </div> */}
            </div>
            <div className="d-flex">
              {/* <div className="metadata-label" style={{ marginLeft: "2px" }}>
                {2}
              </div> */}
            </div>
          </div>
        </div>

        {/* title */}
        <Link to={"/course-content/" + this.props.subjectId}>
          <div className="title title-hv">
            {this.props.subjectName}
          </div>
          {/* <div className="title-hv-c">
            <div className="title-hv-m">
              {this.props.subjectName}
            </div>
          </div> */}
        </Link>
        <div className="summary-text mg-bottom-10px">
          {this.props.description}
        </div>
      </div>
    );
  }


}
export default CourseSummaryItem;
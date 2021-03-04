import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources
import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import edit_icon from 'assets/icons/24x24/nb_gray_write_icon_24x24.png'
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'
import { deleteAPost, editAPost } from 'redux/services/postServices'

import { openBigModal, openModal } from 'redux/actions/modalAction'
import store from 'redux/store/index'
import { validation } from 'utils/validationUtils'
// import 'components/styles/Metadata.scss'
import 'components/styles/Metadata.scss'

//styles
import 'components/styles/Label.scss'

//constants
import { itemType } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

class PostSummary extends Component {

  constructor(props) {
    super(props);
    this.normalMenuItemList = [
      { id: 3, name: "Báo cáo", icon: report_icon },
    ]

    this.mySelfMenuItemList = [
      { id: 1, text: "Xoá", value: "DELETE_POST", icon: trash_icon, tip: "Không cần duyệt.", hasLine: true },
      { id: 2, text: "Chỉnh sửa", value: "EDIT_POST", icon: edit_icon, tip: "Cần chờ kiểm duyệt." },
      { id: 3, text: "Báo cáo", value: "REPORT_POST", icon: report_icon },
    ]

    this.id = this.props.id;
    this.title = this.props.title;
    this.image = this.props.image;

  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_POST") {
      this.props.deleteAPost(this.props.id); //chi goi API, sau do nho component cha reload
      if (this.props.reloadList)
        this.props.reloadList();
    }

    if (selectedItem.value === "EDIT_POST") {
      store.dispatch(openBigModal("edit-post", { id: this.props.id }));
    }

    if (selectedItem.value === "REPORT_POST") {
      store.dispatch(openModal("form", {
        id: `rpp-${this.props.id}`,
        title: `Tố cáo bài viết.`,
        formId: `#rpp-${this.props.id}-form`,
        inputs: [
          { //for rendering
            id: `rpp-${this.props.id}-post-reason`,
            isRequired: true,
            type: 'form-text-area',
          },
          {
            id: `rpp-${this.props.id}-post-reason-1`,
            isRequired: true,
            type: 'form-input',
          },
          {
            id: `rpp-${this.props.id}-post-reason-2`,
            isRequired: true,
            type: 'form-file-input',
          },
          {
            id: `rpp-${this.props.id}-post-reason-3`,
            isRequired: true,
            type: 'text-input',
          }

        ],
        validationOptions: //for validation
        {
          form: `#rpp-${this.props.id}-form`,
          rules: [
            //truyen vao id, loai component, message
            validation.isRequired(`rpp-${this.props.id}-post-reason`, 'form-text-area', 'Lý do không được để trống!'),
            validation.noSpecialChar(`rpp-${this.props.id}-post-reason`, 'form-text-area', 'Lý do không được chứa ký tự đặc biệt!'),
            validation.minLength(`rpp-${this.props.id}-post-reason`, 'form-text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!')
          ],
        },
        onVerifyBtnClick: this.onVerifyReport(),
        submitText: "Tố cáo",
        cancelText: "Huỷ"

      }
      ));
    }
  }

  onVerifyReport = () => {
    //handle report
  }

  render() {
    return (
      <div className="metadata">
        <div className="j-c-space-between"  >
          <div className="d-flex">
            <div className="d-flex">
              <div className="category">
                {this.props.categoryName}
              </div>
            </div>
            <div className="light-black-label">bởi</div>
            <Link className="link-label-s" to={/user/}>
              {this.props.authorName}
            </Link>

            {this.props.type === itemType.mySelf ?
              <>{this.props.approveState === "PENDING_APPROVAL" ?
                <div className="d-flex" >
                  <div className="light-black-label"> - </div>
                  <div className="red-border-label">PENDING</div>
                </div >
                : <>
                  {this.props.approveState === "PENDING_FIX" ?
                    <div className="d-flex">
                      <div className="light-black-label"> - </div>
                      <div className="blue-border-label">PENDING</div>
                    </div> : <>
                      {this.props.approveState === "REJECTED" ?
                        <div className="d-flex">
                          <div className="light-black-label"> - </div>
                          <div className="red-border-label">REJECTED</div>
                        </div> :
                        <>
                          <div className="d-flex">
                            <div className="light-black-label"> - </div>
                            <div className="blue-border-label">APPROVED</div>
                          </div>
                        </>
                      }
                    </>
                  }
                </>
              }
              </>
              :
              <></>
            }
          </div>

          {this.props.type === itemType.mySelf &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={this.mySelfMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} /> //stand for post item poupup menu
          }
          {(this.props.type === itemType.normal || !this.props.type) &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={this.normalMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} />
          }
        </div>

        {/* title */}
        <div className="d-flex mg-top-5px">
          {/* fake avatar */}
          <img className="avatar" src={this.props.imageURL} alt="" />
          <div className="mg-left-5px j-c-space-between d-flex-vertical">
            <Link to={"/posts/" + this.id}>
              <div className="title">
                {this.props.title}
              </div>
            </Link>

            <div className="d-flex" style={{ marginTop: "-5px" }}>
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

        {this.props.imageURL ?
          <div>
            <div className="decoration-line mg-top-10px" />
            <img className="image" src={this.props.imageURL} alt="" />
            <div className="summary-text mg-bottom-10px">
              {this.props.summary}
            </div>
          </div>
          :
          <div className="summary-text">
            {this.props.summary}
          </div>
        }
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteAPost, editAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSummary));


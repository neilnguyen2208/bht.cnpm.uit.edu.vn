import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

import { deleteAPost, editAPost, reportAPost } from 'redux/services/postServices'
import { openBigModal, openModal, closeModal, openBLModal } from 'redux/actions/modalAction'
import { post_ReportAPostReset } from 'redux/actions/postAction'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'
import store from 'redux/store/index'
import { validation } from 'utils/validationUtils'
import danger_icon from 'assets/icons/24x24/nb_orange_danger_icon_24x24.png'
import { mySelfMenuItemList, normalMenuItemList } from 'constants.js'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//constants
import { itemType } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

class PostSummary extends Component {

  constructor(props) {
    super(props);


    this.id = this.props.id;
    this.title = this.props.title;
    this.image = this.props.image;

  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_POST") {
      //show confirmation popup and detete id verify
      store.dispatch(openModal("confirmation",
        {
          title: "Xoá bài viết",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => { this.props.deleteAPost(this.props.id); store.dispatch(closeModal()); }
        }))
    }

    if (selectedItem.value === "EDIT_POST") {
      store.dispatch(openBigModal("edit-post", { id: this.props.id }));
    }

    if (selectedItem.value === "REPORT_POST") {
      store.dispatch(openModal("form", {
        id: `rpp-form-modal`,//report post
        title: `REPORT BÀI VIẾT`,
        formId: `rpp-form`,
        inputs:
          [
            { //for rendering
              id: `rpp-form-input`,
              isRequired: true,
              label: "Lý do tố cáo:",
              type: 'text-area',
              placeHolder: "Nhập lý do tố cáo ...",
              validation: true,
              key: "reason"
            },
          ],
        append: { id: this.props.id },
        validationCondition: {
          form: `#rpp-form`,
          rules: [
            //truyen vao id, loai component, message
            validation.isRequired(`rpp-form-input`, 'text-area', 'Lý do không được để trống!'),
            validation.minLength(`rpp-form-input`, 'text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!')
          ],

        },
        submitText: "Report",
        cancelText: "Huỷ",
        confirmBox: {
          title: "Report bài viết",
          text: "Bạn có chắc chắn muốn tố cáo bài viết này không?",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: DTO => this.onConfirmReport(DTO)
        }
      }
      ));
    }
  }

  onConfirmReport = (DTO) => {
    store.dispatch(closeModal());
    store.dispatch(closeModal());
    this.props.reportAPost(DTO.id, { "reason": DTO.reason });
  }

  render() {

    //only set for report.
    if (this.props.isHaveReported) {
      store.dispatch(openBLModal({ text: "Report bài viết thành công!", icon: done_icon }));
      store.dispatch(post_ReportAPostReset())
    }

    let summary = <></>;
    if (this.props.imageURL && this.props.imageURL !== "null" && this.props.imageURL !== null && this.props.imageURL !== undefined) {
      summary = <div>
        <div className="decoration-line mg-top-10px" />
        <img className="image" src={this.props.imageURL} alt="" />
        <div className="summary-text mg-bottom-10px">
          {this.props.summary}
        </div>
      </div>
    }
    else
      if (this.props.summary && this.props.summary !== "null")
        summary = <div className="summary-text" >
          {this.props.summary}
        </div >
      else
        summary = <div className="ck-editor-output" dangerouslySetInnerHTML={{
          __html:
            this.props.content
        }} />


    return (
      <div className="metadata" >
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

            {this.props.type === itemType.mySelf || this.props.type === itemType.approval ?
              <>{this.props.approveState === "PENDING_APPROVAL" ?
                <div className="d-flex" >
                  <div className="light-black-label"> - </div>
                  <div className="gray-border-label">PENDING</div>
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
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={mySelfMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} /> //stand for post item poupup menu
          }
          {(this.props.type === itemType.normal || !this.props.type) &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={normalMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} />
          }
        </div>

        {/* title */}
        <div className="d-flex mg-top-5px" >
          {/* fake avatar */}
          < img className="avatar" src={this.props.authorAvatarURL} alt="" />
          <div className="mg-left-5px j-c-space-between d-flex-vertical">
            <Link to={"/post-content/" + this.props.id}>
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
                {this.props.publishDtm ?
                  <div className="metadata-label" style={{ marginLeft: "2px" }}>
                    {this.props.publishDtm.substring(0, 10)}
                  </div>
                  : <></>}
              </div>
            </div>
          </div>
        </div>
        {this.props.approveState === "PENDING_FIX" ?
          <div className="feedback-container">
            <div className="d-flex">
              <img className="danger-icon" src={danger_icon} alt="!" />
              <div>Feedback:</div>
            </div>
            <div className="feedback-reason">
              {this.props.feedback}
            </div>
          </div> : <></>}

        {summary}
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //report
    isHaveReported: state.post.isHaveReported
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteAPost, editAPost, reportAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSummary));


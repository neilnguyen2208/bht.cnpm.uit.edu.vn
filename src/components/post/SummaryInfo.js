import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

import { deleteAPost, editAPost, reportAPost } from 'redux/services/postServices'
import { openBigModal, openModal, closeModal, openBLModal } from 'redux/services/modalServices'
import { highlightAPost, deleteHighlightAPost, stickAPostToTop } from 'redux/services/homeServices';
import { post_ReportAPostReset } from 'redux/actions/postAction'
import store from 'redux/store/index'
import { validation } from 'utils/validationUtils'
import danger_icon from 'assets/icons/24x24/nb_orange_danger_icon_24x24.png'
import {
  mySelfMenuItemList,
  normalMenuItemList,
  highlightAdminMenuItemList,
  unHighlightAdminMenuItemList
} from 'constants.js'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//constants
import { itemType } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';

class PostSummary extends React.Component {

  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.title = this.props.title;
    this.image = this.props.image;
  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_POST") {
      //show confirmation popup and detete id verify
      openModal("confirmation",
        {
          title: "Xoá bài viết",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => {
            this.props.deleteAPost(this.props.id);
            closeModal();
          }
        })
    }

    if (selectedItem.value === "EDIT_POST") {
      openBigModal("edit-post", { id: this.props.id });
    }

    if (selectedItem.value === "REPORT_POST") {

      //call API to get all post report reason 
      //if success => open report modal

      //map to array of reasons in UI
      // this.props.getReportReasons();

      //create new type of input un modal and validation for it

      openModal("form", {
        id: `rpp-form-modal`,//report post
        title: `REPORT BÀI VIẾT`,
        formId: `rpp-form`,
        inputs:
          [
            // {
            //   id: `rpp-checkbox-array-input`,
            //   isRequired: true,
            //   label: "Nguyên nhân tố cáo:",
            //   type: 'array-checkbox',
            //   placeHolder: "Lý do:",
            //   validation: true,
            //   key: "reason"
            // }
            // ,
            { //for rendering
              id: `rpp-form-input`,
              isRequired: true,
              label: "Mô tả vi phạm:",
              type: 'text-area',
              placeHolder: "Nhập lý do tố cáo ",
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
            validation.minLength(`rpp-form-input`, 'text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!'),
            // validation.RequiredExact(`rpp-checkbox-array-input`, 'checkbox-array', 1, 'Cần chọn một lý do input')

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
      });
    }

    if (selectedItem.value === "HIGHLIGHT_POST") {
      openModal("confirmation", {
        title: "Ghim bài viết",
        text: "Xác nhận ghim bài viết?",
        onConfirm: () => {
          this.props.highlightAPost(this.props.id);
          closeModal();
        }
      });
    }

    if (selectedItem.value === "UNHIGHLIGHT_POST") {
      openModal("confirmation", {
        title: "Bỏ ghim bài viết",
        text: "Xác nhận bỏ ghim bài viết?",
        onConfirm: () => {
          this.props.deleteHighlightAPost(this.props.id);
          closeModal();
        }
      });
    }

    if (selectedItem.value === "STICK_TO_TOP_POST") {
      openModal("confirmation", {
        title: "Ghim bài viết lên đầu",
        text: "Xác nhận ghim bài viết lên đâu?",
        onConfirm: () => {
          this.props.stickAPostToTop(this.props.id);
          closeModal();
        }
      });
    }
  }

  onConfirmReport = (DTO) => {
    closeModal();
    closeModal();
    this.props.reportAPost(DTO.id, { "reason": DTO.reason });
  }

  render() {
    styleCodeSnippet();
    //only set for report.
    if (this.props.isHaveReported) {
      openBLModal({ text: "Report bài viết thành công!", type: "success" });
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
          {this.props.type === itemType.management && this.props.isHighlighted &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={unHighlightAdminMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} /> //stand for post item poupup menu
          }

          {this.props.type === itemType.management && !this.props.isHighlighted &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={highlightAdminMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} /> //stand for post item poupup menu
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
        {   formatMathemicalFormulas()}

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
  deleteAPost,
  editAPost,
  reportAPost,
  highlightAPost,
  deleteHighlightAPost,
  stickAPostToTop
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSummary));


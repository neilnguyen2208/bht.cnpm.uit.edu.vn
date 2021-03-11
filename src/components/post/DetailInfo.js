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
import { deleteAPost, editAPost, reportAPost } from 'redux/services/postServices'
import { openBigModal, openModal, closeModal, openBLModal } from 'redux/actions/modalAction'
import { delete_APostReset, put_EditAPostReset, post_ReportAPostReset } from 'redux/actions/postAction'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'
import store from 'redux/store/index'
import { validation } from 'utils/validationUtils'
import { detailType } from 'constants.js'
import UserInfo from 'components/user/UserInfo'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import 'components/common/CustomCKE/CKEditorContent.scss'

//constants
import { itemType } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

class PostSummary extends Component {

  constructor(props) {
    super(props);
    this.normalMenuItemList = [
      {
        id: 3, text: "Report", value: "REPORT_POST", icon: report_icon,
        style: {
          height: "26px",
          paddingTop: "3px",
          paddingBottom: "3px"
        }
      },
    ]

    this.mySelfMenuItemList = [
      { id: 1, text: "Xoá", value: "DELETE_POST", icon: trash_icon, tip: "Không cần duyệt.", hasLine: true },
      { id: 2, text: "Chỉnh sửa", value: "EDIT_POST", icon: edit_icon, tip: "Cần chờ kiểm duyệt." },
      {
        id: 3, text: "Report", value: "REPORT_POST", icon: report_icon,
        style: {
          height: "26px",
          paddingTop: "3px",
          paddingBottom: "3px"
        }
      },
    ]

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

    //reload the list when any item has been deleted or edited:
    if (this.props.isHaveDeleted) {
      store.dispatch(delete_APostReset())
    }

    if (this.props.isHaveEdited) {
      store.dispatch(put_EditAPostReset())
    }

    if (this.props.isHaveReported) {
      store.dispatch(openBLModal({ text: "Report bài viết thành công!", icon: done_icon }));
      store.dispatch(post_ReportAPostReset())
    }

    return (
      <div className="metadata">

        {/* title */}
        <Link to={"/posts/" + this.props.id}>
          <div className="title">
            {this.props.title}
          </div>
        </Link>

        <div className="d-flex mg-top-5px"  >

          <div className="d-flex">
            <div className="category">
              {this.props.categoryName}
            </div>
          </div>
          <div className="mg-left-5px j-c-space-between d-flex-vertical">

            <div className="d-flex" style={{ marginTop: "-1px" }}>
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

        <div className="decoration-line mg-top-5px mg-bottom-5px" />
        <div className="d-flex mg-top-10px ">
          <UserInfo authorName={this.props.authorName} authorAvatarURL={this.props.authorAvatarURL} />
          <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={this.normalMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} />
        </div>

      </div >

    );
  }
}

const mapStateToProps = (state) => {
  return {
    //delete
    isHaveDeleted: state.post.isHaveDeleted,
    //edit
    isHaveEdited: state.post.isHaveEdited,
    //report
    isHaveReported: state.post.isHaveReported
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteAPost, editAPost, reportAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSummary));


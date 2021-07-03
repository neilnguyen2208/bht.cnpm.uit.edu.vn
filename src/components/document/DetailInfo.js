import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources
import {
  deleteADocument,
  editADocument,
  reportADocument
} from 'redux/services/documentServices'
import {
  openBigModal,
  openModal,
  closeModal,
  openBLModal
} from 'redux/services/modalServices'
import {
  delete_ADocumentReset,
  put_EditADocumentReset,
  post_ReportADocumentReset
} from 'redux/actions/documentAction'
import store from 'redux/store/index'
import { detailType } from 'constants.js'
import UserInfo from 'components/user/UserInfo'
import { basicMenu } from 'components/document/adapter/actionMenu'
//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import 'components/common/CustomCKE/CKEditorContent.scss'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import {
  formatMathemicalFormulas,
  styleCodeSnippet
} from 'components/common/CustomCKE/CKEditorUtils';
import Tag from './Tag';
import { imageExists } from 'utils/urlUtils';

class PostDetail extends React.Component {

  constructor(props) {
    super(props);

    this.isLoadedImage = false;
    this.state = { isLoadedImage: false }
  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_DOCUMENT") {
      //show confirmation popup and detete id verify
      openModal("confirmation",
        {
          title: "Xoá tài liệu",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => { this.props.deleteADocument(this.props.id); closeModal(); }
        })
    }

    if (selectedItem.value === "EDIT_DOCUMENT") {
      openBigModal("edit-document", { id: this.props.id });
    }

    if (selectedItem.value === "REPORT_DOCUMENT" && this.props.type !== detailType.preview) {
      openBigModal("report-document", {
        id: this.props.id
      })
    }
  }

  onConfirmReport = (DTO) => {
    closeModal();
    closeModal();
    this.props.reportADocument(DTO.id, { "reasonIds": [1], "feedback": DTO.reason });
  }

  setImageURL = (isExist) => {
    this.cover = <></>;
    if (isExist) {
      this.cover = <div style={{ border: "1px solid var(--gray)" }}>
        <div className="mg-top-20px" />
        <img className="image" src={this.props.imageURL} alt="" />
      </div>
    };
    this.setState({ isLoadedImage: true });
  }

  render() {

    //reload the list when any item has been deleted or edited:
    if (this.props.isHaveDeleted) {
      store.dispatch(delete_ADocumentReset())
    }

    if (this.props.isHaveEdited) {
      store.dispatch(put_EditADocumentReset())
    }

    if (this.props.isHaveReported) {
      openBLModal({ text: "Report tài liệu thành công!", type: "success" });
      store.dispatch(post_ReportADocumentReset())
    }

    if (this.props.imageURL
      && !this.state.isLoadedImage
    ) {
      imageExists(this.props.imageURL, this.setImageURL)
    }

    return (
      <div className="metadata">

        {/* title */}
        <Link to={"/document-content/" + this.props.id}>
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
                  {this.props.subjectName}
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
          <UserInfo authorDisplayName={this.props.authorDisplayName} authorAvatarURL={this.props.authorAvatarURL} authorID={this.props.authorID} />
          <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={basicMenu} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} />
        </div>

        <div style={{ width: "100%", marginTop: "20px", maxWidth: "600px", margin: "auto", marginBottom: "20px" }}>
          {/* content here */}
          <div className="ck-editor-output" dangerouslySetInnerHTML={{
            __html:
              this.props.description
          }} />

          {this.state.isLoadedImage && this.cover}

          <div className="mg-top-10px mg-bottom-10px" >
            {this.props.tags.map(item =>
              <Tag isReadOnly={true} tag={item} />
            )}
          </div>
        </div>

        {formatMathemicalFormulas()}
        {styleCodeSnippet()}
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //delete
    isHaveDeleted: state.document.isHaveDeleted,
    //edit
    isHaveEdited: state.document.isHaveEdited,
    //report
    isHaveReported: state.document.isHaveReported,

    isStatisticLoaded: state.auth.userStatistic.isLoadDone,
    statisticData: state.auth.userStatistic.data

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteADocument, editADocument, reportADocument
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));


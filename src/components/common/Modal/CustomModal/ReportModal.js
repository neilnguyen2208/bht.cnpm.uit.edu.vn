import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal, closeModal, openModal } from "redux/services/modalServices";
import ModalTitlebar from "components/common/Titlebar/ModalTitlebar";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getReportReasons } from 'redux/services/reportServices'
import { reportAPost } from 'redux/services/postServices'
import { reportAPostComment } from 'redux/services/commentServices'

class ReportModal extends React.Component {

  componentDidMount() {
    this.REPORT_DTO = {
      "reasonIds": [],
      "feedback": "string"
    }

    this.props.getReportReasons();
  }

  handleSubmit = () => {
    this.REPORT_DTO.reasonIds = [];
    document.querySelectorAll("#rpmd-rsns .form-checkbox-container input:checked").forEach(item =>
      this.REPORT_DTO.reasonIds.push(item.value)
    )
    console.log(this.REPORT_DTO)
    if (this.REPORT_DTO.reasonIds.length === 0) {
      //set error message and return
      document.querySelector("#rpmd-rsns .form-error-label-container .form-error-label").innerText = "Chọn ít nhất một lý do."
      return;
    }
    openModal("confirmation",
      {
        title: this.props.type === "POST" ?
          "Báo cáo tài liệu"
          : this.props.type === "DOCUMENT" ? "Báo cáo tài liệu" : "Báo cáo bình luận",
        text: this.props.type === "POST" ?
          "Xác nhận báo cáo bài viết"
          : this.props.type === "DOCUMENT" ? "Xác nhận báo cáo tài liệu" : "Xác nhận báo cáo bình luận",
        confirmText: "Xác nhận",
        cancelText: "Huỷ",
        onConfirm: () => {

          if (this.props.type === "POST")
            this.props.reportAPost(this.props.id, this.REPORT_DTO)
          else
            if (this.props.type === "DOCUMENT") { }
            else
              if (this.props.type === "COMMENT") {
                this.props.reportAPostComment(this.props.id, this.REPORT_DTO)
              }
          closeModal(); //close confimation popup
          closeBigModal(); //close edit post popup
        }
      })
  }

  handleStyle = () => {
    //if any checkbox is checked
    if (document.querySelectorAll("#rpmd-rsns .form-checkbox-container input:checked").length !== 0)
      document.querySelector(".form-error-label-container .form-error-label").innerText = ""
  }

  updateFeedback = (e) => {
    this.REPORT_DTO = {
      ...this.REPORT_DTO,
      "feedback": e.target.value
    }
  }

  render() {
    return (
      <div>
        <div className="modal-overlay-shadow" />
        <div className="modal-fixed-layout">
          <div className="modal-wrapper form o-f-hidden pd-top-5px">
            <ModalTitlebar title={this.props.type === "POST" ?
              "TỐ CÁO BÀI VIẾT"
              : this.props.type === "DOCUMENT" ? "TỐ CÁO TÀI LIỆU" : "TỐ CÁO BÌNH LUẬN"} />
            <div className="form-container pd-10px" id="rpmd-rsns">
              <div className="form-group"
                style={{ borderBottom: "1px solid var(--gray)", paddingBottom: "8px", marginBottom: "16px" }}>
                <label className="form-label-required">Chọn ít nhất một lý do:</label>
                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                  {this.props.reportReasons.length > 0 && !this.props.isLoading ?
                    this.props.reportReasons.map(reason => {
                      return <div style={{ width: "50%" }}>
                        <div className="d-flex mg-top-5px">
                          <label className="form-checkbox-container" >
                            <input type="checkbox" className="form-checkbox" onClick={(e) => this.handleStyle()} value={reason.id} />
                            <span className="form-checkbox-style"></span>
                            <div className="form-tip-label" style={{ fontSize: "0.9rem" }} >{reason.reason}</div>
                          </label>
                        </div>
                      </div>
                        ;
                    })
                    : <div style={{ height: "1rem" }} />
                  }
                </div>
                <div className="form-error-label-container">
                  <span className="form-error-label mg-top-10px" ></span>
                </div>
              </div>
              <div className="form-group" style={{ marginTop: "3px" }}>
                <label className="form-label">Bạn có thể làm rõ lý do báo cáo không?</label>
                <textarea className="text-area" onChange={(e) => this.updateFeedback(e)} id="rpmd-txtr" placeholder="Thông tin thêm ... " />
              </div>

              {/* Button */}
              <div className="j-c-end">
                <button className="white-button form-submit-btn" onClick={() => closeBigModal()}>Huỷ</button>
                <button className="blue-button form-submit-btn mg-left-10px" onClick={() => this.handleSubmit()}>Tố cáo</button>
              </div>
            </div>
          </div >
        </div >
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.comment.reportReasons.data)
  return {
    reportReasons: state.report.data,
    isLoading: state.report.isLoading,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getReportReasons, reportAPost,
  reportAPostComment
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportModal));

import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import {
  closeBigModal,
  closeModal,
  openModal
} from "redux/services/modalServices";
import ModalTitlebar from "components/common/Titlebar/ModalTitlebar";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getReportReasons } from 'redux/services/reportServices'
import { reportAPost } from 'redux/services/postServices'
import { reportADocument } from 'redux/services/documentServices'
import { reportAPostComment } from 'redux/services/postCommentServices'
import { reportAnExercise } from 'redux/services/courseServices';
import info_icon from 'assets/icons/24x24/info_icon_24x24.png'

class ReportModal extends React.Component {

  componentDidMount() {
    this.REPORT_DTO = {
      "reasonIds": [],
      "feedback": "string"
    }

    switch (this.props.type) {
      case "POST":
        this.reportTitle = "Báo cáo bài viết";
        this.reportService = this.props.reportAPost;
        this.bigModalTitle = "BÁO CÁO BÀI VIẾT";
        break;
      case "DOCUMENT": {
        this.reportTitle = "Báo cáo tài liệu";
        this.bigModalTitle = "BÁO CÁO TÀI LIỆU";
        this.reportService = this.props.reportADocument;
        break;
      }
      case "EXERCISE": {
        this.reportTitle = "Báo cáo bài tập";
        this.bigModalTitle = "BÁO CÁO BÀI TẬP";
        this.reportService = this.props.reportAnExercise;
        break;
      }
      case "COMMENT":
        this.reportTitle = "Báo cáo bình luận";
        this.reportTitle = "BÁO CÁO BÌNH LUẬN";
        this.reportService = this.props.reportAPostComment;
        break;
      default: {
      }
    }

    this.props.getReportReasons();
  }

  handleSubmit = () => {
    this.REPORT_DTO.reasonIds = [];
    document.querySelectorAll("#rpmd-rsns .form-checkbox-container input:checked").forEach(item =>
      this.REPORT_DTO.reasonIds.push(item.value)
    )
    if (this.REPORT_DTO.reasonIds.length === 0) {
      //set error message and return
      document.querySelector("#rpmd-rsns .form-error-label-container .form-error-label").innerText = "Chọn ít nhất một lý do."
      return;
    }

    openModal("confirmation",
      {
        title: this.reportTitle,
        text: "Xác nhận báo cáo nội dung bài tập này",
        confirmText: "Xác nhận",
        cancelText: "Huỷ",
        onConfirm: () => {
          this.reportService(this.props.id, this.REPORT_DTO);
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
            <ModalTitlebar title={this.bigModalTitle} />

            {/* exercise report */}


            <div className="form-container pd-10px" id="rpmd-rsns">
              {this.props.type === "EXERCISE"
                && <div style={{
                  marginBottom: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid var(--gray)",
                  lineHeight: "20px",
                }}>
                  {<img src={info_icon} alt="" className="confirmation-icon mg-right-5px" style={{ float: "left" }}></img>}
                  <span> Bạn đang thực hiện gửi góp ý cho bài tập: <br />
                  </span>
                  <strong style={{ margin: "auto", marginBottom: "10px" }}> {this.props.exerciseTitle} </strong>
                  <span><br /> Hãy làm rõ thông tin câu hỏi hoặc câu trả lời muốn góp ý nhé. </span>

                </div>
              }
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
                      </div>;
                    }) : <div style={{ height: "1rem" }} />}
                </div>
                <div className="form-error-label-container">
                  <span className="form-error-label mg-top-10px" ></span>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "3px" }}>
                <label className="form-label">Bạn có thể làm rõ lý do báo cáo không?</label>
                <textarea className="text-area"
                  defaultValue={this.props.type === "EXERCISE" ? "Câu " + this.props.rank + ": " : ""}
                  onChange={(e) => this.updateFeedback(e)}
                  id="rpmd-txtr"
                  placeholder="Thông tin thêm ... " />
              </div>

              {/* Button */}
              <div className="j-c-end">
                <button className="white-button form-submit-btn" onClick={() => closeBigModal()}>Huỷ</button>
                <button className="blue-button form-submit-btn mg-left-10px" onClick={() => this.handleSubmit()}>Báo cáo</button>
              </div>
            </div>
          </div >
        </div >
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reportReasons: state.report.data,
    isLoading: state.report.isLoading,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getReportReasons,
  reportAPost,
  reportADocument,
  reportAPostComment,
  reportAnExercise

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportModal));

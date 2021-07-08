
import React from 'react'
import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import calendar_icon from 'assets/icons/24x24/calendar_icon_24x24.png'
import clock_icon from 'assets/icons/24x24/clock_icon_24x24.png'
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'
import { resolveStatus } from 'constants.js'

import { Link } from 'react-router-dom'
import danger_icon from 'assets/icons/24x24/nb_orange_danger_icon_24x24.png'
import createDOMPurify from 'dompurify';

export default class ReportInfo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isShowMore: false
        }
    }

    componentDidMount() {
        const DOMPurify = createDOMPurify(window);
        const clean = DOMPurify.sanitize(this.props.description);
        if (document.querySelector(`#rprt-dcmnt-ctnt-${this.props.documentID}`))
            document.querySelector(`#rprt-dcmnt-ctnt-${this.props.documentID}`).innerHTML = clean;
    }

    onFileCollapseIconClick = (fileId) => {
        let ele = document.getElementById("dcm-file-preview-" + fileId);
        let btnEle = document.getElementById("dcm-file-preview-btn-" + fileId);
        if (ele.style.display === "none") {
            ele.style.display = "block";
            btnEle.innerText = "Ẩn xem trước";
        }
        else
            if (ele.style.display === "block") {
                ele.style.display = "none";
                btnEle.innerText = "Xem trước";
            }
    }

    render() {

        let reportersName = <></>;
        if (this.props.reporters.length === 1)
            reportersName = <Link className="link-label-s" to={`/user/profile/${this.props.reporters[0].id}`}>
                {this.props.reporters[0].displayName}
            </Link>
        else if (this.props.reporters.length === 2)
            reportersName = <div className="d-flex">
                <Link className="link-label-s" to={`/user/profile/${this.props.reporters[0].id}`}>
                    {this.props.reporters[0].displayName} và
                </Link>
                <Link className="link-label-s" to={`/user/profile/${this.props.reporters[1].id}`}>
                    {this.props.reporters[1].displayName}
                </Link>
            </div>
        else if (this.props.reporters.length > 2)
            reportersName = <div className="d-flex">
                <Link className="link-label-s" to={`/user/profile/${this.props.reporters[0].id}`}>
                    {this.props.reporters[0].displayName},
                </Link>
                <Link className="link-label-s" to={`/user/profile/${this.props.reporters[1].id}`}>
                    {this.props.reporters[1].displayName}
                </Link>
                và {this.props.reporters.length - 2} người khác
            </div>

        if (this.props.resolvedTime)
            this.type = resolveStatus.resolved
        else
            this.type = resolveStatus.notResolved;
        return (
            <div className="report-info metadata">
                <div className="activity-metadata"  >
                    <div>
                        <div className="d-flex">
                            <img src={report_icon} alt="" className="icon" />
                            {reportersName}
                            <div className="black-label-s">{`đã báo cáo tài liệu của `}
                            </div>
                            <Link to={`/user/profile/${this.props.author.id}`} style={{ fontSize: "17px", lineHeight: "18px", fontFamily: "BarlowCondensed-SemiBold" }}>
                                {this.props.author.displayName + " "}
                            </Link>
                            <div className="black-label-s" style={{ marginLeft: "3px" }}>{" - "}</div>
                            {this.type === resolveStatus.resolved ?
                                <div className="blue-border-label">RESOLVED</div>
                                :
                                <div className="red-border-label">PENDING</div>
                            }
                        </div>

                        <div className="d-flex">
                            <img className="avatar mg-top-10px" style={{ marginRight: "10px" }} src={this.props.author.avatarURL} alt="" />
                            <Link className="activity-title" to={`/document-content/${this.props.documentID}`} >{this.props.title}</Link>
                        </div>

                    </div>
                    <div>
                        {this.props.reportTime ?
                            <div>
                                <div className="d-flex">
                                    <img src={calendar_icon} alt="" className="calendar-icon" />
                                    <div className="black-label-m">
                                        {this.props.reportTime.substring(0, 10)}
                                    </div>
                                </div>
                                <div className="d-flex mg-top-5px">
                                    <img src={clock_icon} alt="" className="calendar-icon" />
                                    <div className="black-label-m">
                                        {this.props.reportTime.substring(11, 21)}
                                    </div>
                                </div>
                            </div> :
                            <></>
                        }
                    </div>
                </div>

                <div className="report-container">
                    <div className="d-flex">
                        <img className="danger-icon" src={danger_icon} alt="!" />
                        <div>Lý do báo cáo:</div>
                    </div>
                    <div className="report-reason">
                        {this.props.reportReasons.map(feedback => {
                            return <div>{feedback.reason}</div>
                        })}
                    </div>

                    {this.props.feedbacks && this.props.feedbacks.length > 0 ? <div>
                        <div className="d-flex mg-top-10px">
                            <div>Nội dung báo cáo:</div>
                        </div>
                        <div className="report-reason">
                            {this.props.feedbacks.map(feedback => {
                                return <div style={{ width: "100%" }}>{feedback}</div>
                            })}
                        </div>
                    </div>
                        : <></>
                    }
                </div>

                <label className="form-label mg-top-10px" >Nội dung tài liệu:</label>

                <div className="post-summary-show">
                    {
                        this.props.imageURL ?
                            <div >
                                <div className="decoration-line mg-top-10px" />
                                <img className="image" src={this.props.imageURL} alt="" />
                                <div className="ck-editor-output" id={"rprt-dcmnt-ctnt-" + this.props.documentID} />
                            </div>
                            :
                            <div className="summary-text">
                                <div className="ck-editor-output" id={"rprt-dcmnt-ctnt-" + this.props.documentID} />
                            </div>
                    }
                </div>
                {this.props.docFileUploadDTOs.map(file => {
                    return <div key={file.id}>
                        <div className="file-name-container">
                            <div className="d-flex" style={{ lineHeight: "24px" }}>
                                <strong style={{ marginRight: "5px" }}>{file.fileName ? file.fileName : "Tài liệu giải thuật nâng cao.pdf"}</strong> -
                                <div style={{ marginLeft: "5px" }}> {Math.round(file.fileSize / 1048576 * 100) / 100 + "MB"}
                                </div>
                            </div>
                            <div>
                                {/* <button className="blue-button" onClick={() => this.onDownloadButtonClick(file.id)}>Tải xuống</button> */}
                                <button className="white-button mg-left-5px" id={"dcm-file-preview-btn-" + file.id} onClick={() => this.onFileCollapseIconClick(file.id)}>Xem trước</button>
                            </div>
                        </div>

                        <div style={{ display: "none" }} id={"dcm-file-preview-" + file.id}>
                            <div className="d-flex">
                                <iframe className="if-container"
                                    src={file.previewURL}
                                    title={`doc-if-${file.id}`}
                                    sandbox="allow-scripts allow-same-origin"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                })}
            </div >

        );
    }

}
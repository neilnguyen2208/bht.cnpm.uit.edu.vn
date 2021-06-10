
import React from 'react'
import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import 'components/comment/Comment.scss'

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
        const clean = DOMPurify.sanitize(this.props.content);
        if (document.querySelector(`#rprt-pst-ctnt-${this.props.id}`))
            document.querySelector(`#rprt-pst-ctnt-${this.props.id}`).innerHTML = clean;
    }

    render() {

        let reportersName = <></>;
        if (this.props.reporters.length === 1)
            reportersName = <Link className="link-label-s" to={`/user/${this.props.reporters[0].id}`}>
                {this.props.reporters[0].displayName}
            </Link>
        else if (this.props.reporters.length === 2)
            reportersName = <div className="d-flex">
                <Link className="link-label-s" to={`/user/${this.props.reporters[0].id}`}>
                    {this.props.reporters[0].displayName} và
            </Link>
                <Link className="link-label-s" to={`/user/${this.props.reporters[0].id}`}>
                    {this.props.reporters[0].displayName} và
            </Link>
            </div>
        else if (this.props.reporters.length > 2)
            reportersName = <div className="d-flex">
                <Link className="link-label-s" to={`/user/${this.props.reporters[0].id}`}>
                    {this.props.reporters[0].displayName},
                </Link>
                <Link className="link-label-s" to={`/user/${this.props.reporters[0].id}`}>
                    {this.props.reporters[0].displayName}
                </Link>
              và {this.props.reporters.length - 2} người khác
            </div>

        if (this.props.resolvedTime)
            this.type = resolveStatus.resolved
        else
            this.type = resolveStatus.notResolved;
        return (
            <div className="report-info metadata">
                <div className="activity-metadata" style={{ borderBottom: "none", paddingBottom: "0px" }}  >
                    <div>
                        <div className="d-flex">
                            <img src={report_icon} alt="" className="icon" />
                            {reportersName}
                            <div className="black-label-s">{`đã tố một bình luận`}</div>
                            <div className="black-label-s" style={{ marginLeft: "3px" }}>{" - "}</div>
                            {this.type === resolveStatus.resolved ?
                                <div className="blue-border-label">RESOLVED</div>
                                :
                                <div className="red-border-label">PENDING</div>
                            }
                        </div>
                        <div className="black-label-s">thuộc bài viết:</div>
                    </div>
                    <div>
                        {this.props.reportTime ?
                            <div style={{ minWidth: "fit-content", display: "block" }}>
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
                <Link className="activity-title" style={{ borderBottom: "1px solid var(--gray)", paddingTop: "0px", paddingBottom: "10px" }} to={`/post-content/${this.props.id}`} >{this.props.postTitle}</Link>

                {/*  */}
                <div className="report-container">
                    <div className="d-flex">
                        <img className="danger-icon" src={danger_icon} alt="!" />
                        <div>Lý do tố cáo:</div>
                    </div>
                    <div className="report-reason">
                        {this.props.reportReasons.map(feedback => {
                            return <div>{feedback.reason}</div>
                        })}
                    </div>

                    {this.props.feedbacks.length > 0 ? <div>
                        <div className="d-flex mg-top-10px">
                            <div>Nội dung tố cáo:</div>
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

                <div className="comments-list">
                    <div className="comment-item mg-top-10px">
                        <div className="comment-main-level" style={{ width: "fit-content" }}>
                            <div className="comment-avatar report"><img src={this.props.authorAvatarURL} alt="" /></div>
                            <div style={{ marginLeft: "10px" }}>
                                <Link className="comment-name" to={`user/${this.props.authorID}`}>{this.props.authorDisplayName}</Link>
                                <div className="post-summary-show show-less">
                                    {
                                        this.props.imageURL ?
                                            <div >
                                                <div className="decoration-line mg-top-10px" />
                                                <img className="image" src={this.props.imageURL} alt="" />
                                                <div className="ck-editor-output comment-content report" id={"rprt-pst-ctnt-" + this.props.id} />
                                            </div>
                                            :
                                            <div>
                                                <div className="ck-editor-output comment-content report" id={"rprt-pst-ctnt-" + this.props.id} />
                                            </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div >
        );
    }

}
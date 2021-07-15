
import React from 'react'
import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import calendar_icon from 'assets/icons/24x24/calendar_icon_24x24.png'
import clock_icon from 'assets/icons/24x24/clock_icon_24x24.png'
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'
import { exerciseResolveStatus } from 'constants.js'

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
        if (document.querySelector(`#rprt-pst-ctnt-${this.props.exerciseId}`))
            document.querySelector(`#rprt-pst-ctnt-${this.props.exerciseId}`).innerHTML = clean;
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

        if (this.props.actionTaken === exerciseResolveStatus.fixed)
            this.type = exerciseResolveStatus.fixed
        else
            if (this.props.actionTaken === exerciseResolveStatus.inProgress)
                this.type = exerciseResolveStatus.inProgress
            else if (this.props.actionTaken === exerciseResolveStatus.rejected)
                this.type = exerciseResolveStatus.rejected
        return (
            <div className="report-info metadata">
                <div className="activity-metadata"  >
                    <div>
                        <div className="d-flex">
                            <img src={report_icon} alt="" className="icon" />
                            {reportersName}
                            <div className="black-label-s">{`đã báo cáo bài tập của `}
                            </div>
                            <Link to={`/user/profile/${this.props.author.id}`} style={{ fontSize: "17px", lineHeight: "18px", fontFamily: "BarlowCondensed-SemiBold" }}>
                                {this.props.author.displayName + " "}
                            </Link>
                            <div className="black-label-s" style={{ marginLeft: "3px" }}>{" - "}</div>
                            {this.type === exerciseResolveStatus.fixed ?
                                <div className="green-border-label">FIXED</div> :
                                this.type === exerciseResolveStatus.inProgress ?
                                    <div className="blue-border-label">IN PROGRESS</div> :
                                    this.type === exerciseResolveStatus.rejected ?
                                        <div className="red-border-label">REJECTED</div> :
                                        <div className="black-border-label">PENDING</div>
                            }
                        </div>

                        <div className="d-flex">
                            <img className="avatar mg-top-10px" style={{ marginRight: "10px" }} src={this.props.author.avatarURL} alt="" />
                            <Link className="activity-title" to={`/courses/exercise-content/${this.props.exerciseId}`} >{this.props.title}</Link>
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
                            <></>}
                    </div>
                </div>

                {/*  */}

                <div className="report-container">
                    <div className="d-flex">
                        <img className="danger-icon" src={danger_icon} alt="" />
                        <div>Lý do báo cáo:</div>
                    </div>
                    <div className="report-reason">
                        {this.props.reportReasons.map(feedback => {
                            return <div>{feedback.reason}</div>
                        })}
                    </div>

                    {this.props.feedbacks.length > 0 ? <div>
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
            </div >

        );
    }

}
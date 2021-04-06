
import React from 'react'
import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import calendar_icon from 'assets/icons/24x24/calendar_icon_24x24.png'
import clock_icon from 'assets/icons/24x24/clock_icon_24x24.png'
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'
import { resolveStatus } from 'constants.js'

import danger_icon from 'assets/icons/24x24/nb_orange_danger_icon_24x24.png'
import { Link } from 'react-router-dom'

export default class ReportInfo extends React.PureComponent {

    render() {

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
                            <Link className="link-label-s" to={`/user/${this.props.reporterID}`}>
                                {this.props.reporterName} dong
                            </Link>
                            <div className="black-label-s">{`đã tố cáo tài liệu - `}</div>
                            {this.type === resolveStatus.resolved ?
                                <div className="blue-border-label">RESOLVED</div>
                                :
                                <div className="red-border-label">PENDING</div>
                            }
                        </div>
                        <Link className="activity-title" to={`/document-content/${151}`} >{this.props.title}</Link>

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
                                        {this.props.reportTime.substring(10, 21)}
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
                        <div>Lý do tố cáo:</div>
                    </div>
                    <div className="report-reason">
                        {this.props.reason}
                    </div>
                </div>
                <label className="form-label" >Mô tả tài liệu:</label>

                {
                    this.props.imageURL ?
                        <div>
                            <div className="decoration-line mg-top-10px" />
                            <img className="image" src={this.props.imageURL} alt="" />
                            <div className="summary-text mg-bottom-10px">
                                {this.props.content}
                            </div>
                        </div>
                        :
                        <div className="summary-text">
                            {this.props.content}
                            This profile does not specify how many digits may be used to represent the decimal fraction of a second. An adopting standard that permits fractions of a second must specify both the minimum number of digits (a number greater than or equal to one)
                        </div>
                }
                <div className="file-name mg-bottom-5px">{this.props.fileName}File name.pdf</div>
            </div >
        );
    }

}
import React from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import calendar_icon from 'assets/icons/24x24/calendar_icon_24x24.png'
import clock_icon from 'assets/icons/24x24/clock_icon_24x24.png'
import post_approve_icon from 'assets/icons/24x24/post_approve_icon_24x24.png'

export default class RequestedSummary extends React.PureComponent {
    render() {
        return (
            <div className="activity-metadata"  >
                <div>
                    <div className="d-flex">
                        <img src={post_approve_icon} alt="" className="icon" />
                        <Link className="link-label-s" to={`/user/profile/${this.props.authorID}`}>
                            {this.props.authorDisplayName}
                        </Link>
                        <div className="black-label-s">{`đã yêu cầu duyệt một tài liệu`}</div>
                    </div>

                    <Link className="activity-title" to={`/document-content/${this.props.documentID}`}>{this.props.title}</Link>

                </div>
                <div>
                    <div className="d-flex">
                        <img src={calendar_icon} alt="" className="calendar-icon" />
                        <div className="black-label-m">
                            {this.props.submitDtm.substring(0, 10)}
                        </div>
                    </div>
                    <div className="d-flex mg-top-5px">
                        <img src={clock_icon} alt="" className="calendar-icon" />
                        <div className="black-label-m">
                            {this.props.submitDtm.substring(12, this.props.submitDtm.length - 4)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

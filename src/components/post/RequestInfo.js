import React, { Component } from 'react'

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
                        <Link className="link-label-m" to={`/user/${this.props.authorID}`}>
                            {this.props.authorName}
                        </Link>
                        <div className="black-label-s">{`đã yêu cầu duyệt một bài viết`}</div>
                    </div>

                    <Link className="activity-title" to={`/posts/${this.props.id}`}>{this.props.title}</Link>
                </div>
                <div>
                    <div className="d-flex">
                        <img src={calendar_icon} alt="" className="calendar-icon" />
                        <div className="black-label-m">
                            {this.props.requestedDate}
                        </div>
                    </div>
                    <div className="d-flex mg-top-5px">
                        <img src={clock_icon} alt="" className="calendar-icon" />
                        <div className="black-label-m">
                            {this.props.requestedTime}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

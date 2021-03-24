/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import resource image, icon

//import resource string

//import scss
import 'layouts/LeftSidebarLayout.scss'
import 'components/styles/Label.scss'

//import components

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from 'redux/services/userServices'

import PostTag from 'components/post/Tag'
import DocumentTag from 'components/document/Tag'
import "components/common/Titlebar/Titlebar.scss"
import "layouts/Layout.scss"
import "layouts/Search.scss"

export default class RelativeTagSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags:
                [
                    {
                        id: 1,
                        content: "no_luc"
                    },
                    {
                        id: 51,
                        content: "no_luc_2"
                    },
                    {
                        id: 101,
                        content: "no_luc_3"
                    }
                ],
        }
    }

    componentDidMount() {
        //get danh sách các tag liên quan.

    }

    renderTag = () => {
        if (window.location.pathname === "/tags/posts") {
            return this.tags = this.state.tags.map(item =>
                <PostTag isReadOnly={true} tag={item} />
            )
        }
        if (window.location.pathname === "/tags/documents") {
            return this.state.tags.map(item =>
                <DocumentTag isReadOnly={true} tag={item} />
            )
        }
    }

    render() {
        return (
            <div className="d-flex">
                <div className="search-tag-side-bar">
                    Tag liên quan:
                            <div className="mg-top-10px">
                        {this.renderTag()}
                    </div>
                </div>
            </div>
        );
    }


}


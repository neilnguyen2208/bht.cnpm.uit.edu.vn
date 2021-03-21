/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import resource image, icon

//import resource string

//import scss
import 'layouts/LeftSidebarLayout.scss'
import 'components/styles/Label.scss'

//import components
import SearchPostByTag from 'pages/common/SearchResult/SearchPostByTag'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from 'redux/services/userServices'

import Tag from 'components/post/Tag'
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

    render() {
        return (
            <div className="d-flex">
                <div className="search-tag-side-bar">
                    Tag liên quan:
                            <div className="mg-top-10px">
                        {this.state.tags.map(item =>
                            <Tag isReadOnly={true} tag={item} />
                        )
                        }
                    </div>
                </div>
            </div>
        );
    }


}


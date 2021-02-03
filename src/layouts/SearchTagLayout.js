/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import resource image, icon

//import resource string

//import scss
import 'layouts/LeftSidebarLayout.scss'
import 'components/styles/SimpleLabel.scss'

//import components
import SearchPostByTag from 'pages/common/SearchResult/SearchPostByTag'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from 'redux/services/userServices'

import Tag from 'components/common/Tag/Tag'
import "components/common/Titlebar/Titlebar.scss"
import "layouts/Layout.scss"
import "layouts/SearchPage.scss"
import "layouts/SearchTagLayout.scss"

export default class SearchTagLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags:
                [
                    {
                        id: 1,
                        content: "tag1"
                    },
                    {
                        id: 2,
                        content: "tag2"
                    },
                    {
                        id: 3,
                        content: "tag2"
                    }
                ],
        }

    }

    render() {
        return (
            <Router>
                <div className="pr-layout" >
                    <div className="search-layout">
                        <div className="Searching_Tag">
                            Tag: Đại học
                            </div>
                        <div className="d-flex">
                            <div className="search-tag-side-bar">
                                Tag liên quan:
                            <div className="mg-top-10px">
                                    {this.state.tags.map(item =>
                                        <Tag isReadOnly={true} tag={item} onTagClick={(id) => this.navigateToSeachByTag(id)} />
                                    )
                                    }
                                </div>
                            </div>
                            <div style={{ position: 'relative', width: "100%" }}>

                                <div className="h-menu-bar">
                                    <div className="h-menu-item">Bài viết</div>
                                    <div className="h-menu-item">Tài liệu</div>
                                    <div className="h-menu-item">Học tập</div>
                                </div>

                                <div className="search-tag-router-outlet" >
                                    {this.props.children}
                                    {/* <Switch>
                                        <Route exact path="/tags/:id/post" component={SearchPostByTag} />
                                    </Switch> */}
                                    {/* <Route exact path="/search-tag/:id/docs" component={SearchTag} /> */}
                                </div>

                            </div >
                        </div>
                    </div>
                </div>
            </Router>

        );
    }


}



// //#region for redux
// const mapStateToProps = (state) => {
//     // (state);
//     return {
//         accountInformation: state.user.account
//     };
// }

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     getCurrentUser
// }, dispatch);

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlankLayout));
// //#endregion
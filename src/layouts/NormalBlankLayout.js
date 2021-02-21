/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import resource image, icon

//import resource string

//import scss
import 'components/styles/Label.scss'

//import components
import PostsList from "pages/common/PostsList/PostsList"
import DocumentsList from "pages/common/DocumentsList/DocumentsList"
import DocumentDetail from "pages/common/DocumentDetail/DocumentDetail"
import PostDetail from "pages/common/PostDetail/PostDetail"

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from 'redux/services/userServices'

class BlankLayout extends Component {
    constructor(props) {
        super(props);
        this.isTheFirstTimeLoaded = true;

    }

    componentDidMount() {
        this.props.getCurrentUser();
    }

    render() {
        return (
            <div className="pr-layout">
                <Router>
                    <div className="nm-bl-layout-router-outlet" >
                        <Switch>
                            <Route exact path="/posts" component={PostsList} />
                            <Route exact path="/documents" component={DocumentsList} />
                            <Route exact path="/documents/:id" component={DocumentDetail} />
                            <Route exact path="/posts/:id" component={PostDetail} />

                        </Switch>
                    </div>
                </Router>
            </div >
        );
    }

}

//#region for redux
const mapStateToProps = (state) => {
    // (state);
    return {
        accountInformation: state.user.account
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCurrentUser
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlankLayout));
//#endregion
/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import resource image, icon

//import resource string

//import scss
import 'layouts/LeftSidebarLayout.scss'
import 'components/styles/SimpleLabel.scss'

//import components

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

        if (this.props.accountInformation !== null && this.props.accountInformation !== undefined) {

            return (
                <div className="pr-layout">
                    <Router>
                        <div className="nm-bl-layout-router-outlet" >
                            <Switch>
                              
                            </Switch>
                        </div>
                    </Router>
                </div >
            );
        }
        return <> </>

    }

    //#region for handle on scroll
    scrollFunction = () => {

    }
    //#endregion

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
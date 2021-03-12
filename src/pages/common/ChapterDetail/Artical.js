/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'layouts/Layout.scss'
import Titlebar from 'components/common/Titlebar/Titlebar'
import Loader from 'components/common/Loader/Loader'

class Artical extends Component {
    constructor(props) {
        super();



    }

    componentDidMount() {
    }


    render() {

        let artical;
        if (this.props.artical) {

        }
        return (
            <div className="nm-bl-layout">
                <Titlebar title="" />
                <div className="layout-decoration">
                    <div className="mg-top-10px" />

                </div>
                <div className="mg-top-10px" />

                {this.props.isListLoading ?
                    < Loader /> :
                    <>{artical}</>
                }

            </div>

        );
    }
}

const mapStateToProps = (state) => {

    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artical));

/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'layouts/Layout.scss'

//utils
import { itemType } from 'constants.js'
import { getSearchParamByName, setSearchParam } from 'utils/urlUtils'
//services
//components
class PostsList extends Component {
    constructor(props) {
        super();

        this.maxItemPerPage = 5;
        this.postsList = [];


    }

    componentDidMount() {

    }

    //server paginator
    onPageChange = (pageNumber) => {

    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {

    }

    render() {
        if (this.props.postsList) {
            this.postsList = this.props.postsList;
        }
        return (
            <div className="nm-bl-layout">

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));

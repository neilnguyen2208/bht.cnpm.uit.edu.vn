/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'layouts/Layout.scss'

//utils
import { itemType } from 'constants.js'
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
//services
import { getPostsList } from "redux/services/postServices"
import { getPostCategories } from "redux/services/postCategoryServices"

//components
import ComboBox from 'components/common/Combobox/Combobox';
import Titlebar from 'components/common/Titlebar/Titlebar'
import Paginator from 'components/common/Paginator/ServerPaginator'
import Loader from 'components/common/Loader/Loader'

class PostsList extends Component {
    constructor(props) {
        super();

        this.maxItemPerPage = 5;
        this.postsList = [];


    }

    componentDidMount() {
        this.props.getPostCategories()

        //get filter
        let page = getQueryParamByName('page');
        let category = getQueryParamByName('category');

        this.props.getPostsList(page, category);
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
    getPostsList, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));

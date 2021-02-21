/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';

//import for redux
import { getMyPostsList } from "redux/services/postServices";
import { getPostCategories } from "redux/services/postCategoryServices";
import AdminSidebar from "layouts/AdminSidebar"
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getSearchParamByName, isContainSpecialCharacter, setSearchParam } from 'utils/urlUtils'

import Loader from 'components/common/Loader/Loader'

class CoursesManagement extends Component {
    constructor(props) {
        super();

    }

    async componentDidMount() {

    }


    render() {

        return (
            <div className="management-layout">
                <AdminSidebar />
                <div className="content-container">
                    <Titlebar title="QUẢN LÝ KHOÁ HỌC" />
                    <div className="content-container">

                    </div>
                </div >
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyPostsList, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesManagement));
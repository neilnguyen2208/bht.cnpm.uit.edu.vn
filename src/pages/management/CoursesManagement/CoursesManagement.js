/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';

//import for redux
import { getMyPosts } from "redux/services/postServices";
import { getPostCategories } from "redux/services/postCategoryServices";
import AdminSidebar from "layouts/AdminSidebar"
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class CoursesManagement extends React.Component {
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
    getMyPosts, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesManagement));
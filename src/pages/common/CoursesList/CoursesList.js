/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'layouts/Layout.scss'
import './CoursesList.scss'

//utils
import { itemType } from 'constants.js'
import { getSearchParamByName, setSearchParam } from 'utils/urlUtils'

//services
import { getCoursesList } from "redux/services/courseServices"
import { getCourseFalcutyCategories } from "redux/services/courseCategoryServices"

//components
import ComboBox from 'components/common/Combobox/Combobox';
import Loader from 'components/common/Loader/Loader'
import SubjectItem from 'components/course/SubjectItem'

//resource
import dropdownIcon from 'assets/icons/12x12/dropdown_12x12.png'


class CoursesList extends Component {
    constructor(props) {
        super();

        this.maxItemPerPage = 5;
        // this.daiCuongSubjectList = [];
        // this.coSoNhomNganhSubjectList = [];
        // this.allSubjectList = [];

        this.falcutyFilter = [
            { id: 1, name: "Tất cả" },
            { id: 2, name: "Công nghệ phần mềm" },
            { id: 3, name: "Bộ môn toán/lý" }
        ]



    }

    componentDidMount() {

        //kiem tra xem seach param co category hay khong, neu khong thi thay bang 1
        let category = getSearchParamByName('category');
        if (!category) { setSearchParam('category', '1') }

        this.props.getCoursesList(category);
        this.props.getCourseFalcutyCategories();

    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setSearchParam("category", selectedOption.id);
        // let category = getSearchParamByName('category');

        // co mot API de goi danh sach cac mon hoc theo danh muc

        // this.setState({});
    }

    render() {

        let daiCuongSubjectList = <></>;
        let coSoNhomNganhSubjectList = <></>;
        let allSubjectList = <></>;

        if (!this.props.isDaiCuongSubjectLoading) {
            console.log(this.props.daiCuongSubjectList)
            daiCuongSubjectList =
                <div className="subject-item-container">
                    {this.props.daiCuongSubjectList.map(subjectItem => {
                        return <SubjectItem
                            id={subjectItem.id}
                            image={subjectItem.image}
                            name={subjectItem.name}
                            type={itemType.normal}
                        ></SubjectItem>

                    }
                    )}
                </div>
        }
        else {
            daiCuongSubjectList = <Loader />
        }

        if (!this.props.isCoSoNhomNganhSubjectLoading) {
            coSoNhomNganhSubjectList =
                <div className="subject-item-container">
                    {this.props.coSoNhomNganhSubjectList.map(subjectItem => {
                        return <SubjectItem
                            id={subjectItem.id}
                            image={subjectItem.image}
                            name={subjectItem.name}
                            type={itemType.normal}
                        ></SubjectItem>

                    }
                    )}
                </div>
        }
        else {
            coSoNhomNganhSubjectList = <Loader />
        }

        if (!this.props.isAllSubjectLoading) {

            allSubjectList =
                <div className="all-subject-item-container">
                    {this.props.allSubjectList.map(subjectItem => {
                        return <SubjectItem
                            id={subjectItem.id}
                            image={subjectItem.image}
                            name={subjectItem.name}
                            type={itemType.normal}
                        ></SubjectItem>

                    }
                    )}
                </div>
        }
        else {
            allSubjectList = <Loader />
        }


        return (
            <div className="nm-bl-layout" >

                <div className="course-description">
                    <p>
                        Các khoá học  MIỄN PHÍ được biên soạn và cập nhật liên tục bởi các thành viên và cộng tác viên Ban học tập Đoàn khoa Công nghệ phần mềm. Nếu có bất kỳ góp ý nào cho các Khoá học hoặc có nguyên vọng đóng góp, tài trợ cho các khoá học,
                        vui lòng liên hệ email:&nbsp;
                    </p>
                    <a href="bht.cnpm.uit@gmail.com" className="margin-aut">bht.cnpm.uit@gmail.com</a>
                </div>

                <div className="decoration-line mg-bottom-10px" />
                {/* Đại cương */}
                <div className="course-type-title" >
                    <div className="d-flex">
                        <div className="rect-decoration" />
                        <div>
                            <div className="title">
                                ĐẠI CƯƠNG:
                            </div>
                            <div className="sub-title">
                                Các năm học năm nhất, năm 2
                            </div>
                        </div>
                    </div>
                    <div className="show-all-button-container">
                        <div className="white-button">
                            <div className="d-flex">
                                <div className="show-all-text">
                                    Xem tất cả
                                </div>
                                <img className="show-all-icon icon-10x10" alt="*" src={dropdownIcon} ></img>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {daiCuongSubjectList}
                </div>

                {/* Cơ sở nhóm ngành */}
                <div className="course-type-title">
                    <div className="d-flex">
                        <div className="rect-decoration" />
                        <div>
                            <div className="title">
                                CƠ SỞ NHÓM NGÀNH:
                            </div>
                            <div className="sub-title">
                                Các năm học năm nhất, năm 2
                            </div>
                        </div>
                    </div>
                    <div className="show-all-button-container">
                        <div className="white-button">
                            <div className="d-flex">
                                <div className="show-all-text">
                                    Xem tất cả
                        </div>
                                <img className="show-all-icon icon-10x10" alt="" src={dropdownIcon} ></img>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    {coSoNhomNganhSubjectList}
                </div>


                {/* Danh sách môn học */}
                <div className="course-type-title">
                    <div className="d-flex">
                        <div className="rect-decoration" />
                        <div>
                            <div className="title">
                                DANH SÁCH MÔN HỌC:
                            </div>
                            <div className="sub-title">
                                Danh sách tất cả các môn học đã được biên soạn khoá học
                            </div>
                        </div>
                    </div>
                    <div className="show-all-combobox-container">
                        <div className="d-flex">
                            <div className="filter-label t-a-right mg-right-5px">Khoa/bộ môn:</div>
                            <div style={{ marginLeft: "5px" }}>
                                <ComboBox
                                    options={this.falcutyFilter}
                                    placeHolder="Chọn khoa/bộ môn"
                                    onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                    id="courses-list-falcuty-filter-combobox"
                                ></ComboBox></div>
                        </div>
                    </div>
                </div>

                <div>
                    {allSubjectList}
                </div>

                <div className="mg-top-10px" />

            </div >
        );
    }
}

const mapStateToProps = (state) => {
   
    return {

        //Cac data
        daiCuongSubjectList: state.course.coursesList.data,
        coSoNhomNganhSubjectList: state.course.coursesList.data,
        allSubjectList: state.course.coursesList.data,
        falcutyCategories: state.course_category.falcutyCategories.data,


        //Cac thong tin loading
        isDaiCuongSubjectLoading: state.course.coursesList.isLoading,
        isFalcutyCategoriesLoading: state.course_category.falcutyCategories.isLoading,
        isCoSoNhomNganhSubjectLoading: state.course.coursesList.isLoading,
        isAllSubjectLoading: state.course.coursesList.isLoading,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCoursesList, getCourseFalcutyCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesList));

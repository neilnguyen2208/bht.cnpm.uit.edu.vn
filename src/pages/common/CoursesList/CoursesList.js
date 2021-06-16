/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'layouts/Layout.scss'
import './CoursesList.scss'

//utils
import { itemType } from 'constants.js'
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'

//services
import { getCoursesList, getCSNNCoursesList, getDCCoursesList } from "redux/services/courseServices"
import { getCourseFaculties } from "redux/services/courseCategoryServices"

//components
import ComboBox from 'components/common/Combobox/Combobox';
import Loader from 'components/common/Loader/Loader'
import SubjectItem from 'components/course/SubjectItem'

//resource
import dropdownIcon from 'assets/icons/12x12/dropdown_12x12.png'

class CoursesList extends React.Component {
    constructor(props) {
        super();
        this.falcutyFilter = [
            { id: 1, name: "Tất cả" }
        ]

    }

    componentDidMount() {
        this.searchParamObject = {

        }
        //kiem tra xem seach param co category hay khong, neu khong thi thay bang 1
        this.props.getCoursesList(this.searchParamObject);
        this.props.getCSNNCoursesList();
        this.props.getDCCoursesList();
        this.props.getCourseFaculties();

    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        if (selectedOption.id !== 0) {
            this.searchParamObject = { subjectGroup: selectedOption.id }
            this.props.getCoursesList(this.searchParamObject);
            return;
        }
        this.props.getCoursesList({});
    }

    render() {

        let dcCoursesList = <></>;
        let csnnCoursesList = <></>;
        let allCoursesList = <></>;

        if (!this.props.isDCLoading) {
            dcCoursesList = this.props.dcCoursesList.map(subjectItem => {
                return <SubjectItem
                    subjetId={subjectItem.id}
                    imageURL={subjectItem.imageURL}
                    subjectName={subjectItem.name}
                    type={itemType.normal}
                    description={subjectItem.description}
                ></SubjectItem>
            })
        } else dcCoursesList = <Loader />

        if (!this.props.isCSNNLoading) {
            csnnCoursesList = this.props.csnnCoursesList.map(subjectItem => {
                return <SubjectItem
                    subjetId={subjectItem.id}
                    imageURL={subjectItem.imageURL}
                    subjectName={subjectItem.name}
                    type={itemType.normal}
                    description={subjectItem.description}
                ></SubjectItem>
            })
        }
        else csnnCoursesList = <Loader />

        if (!this.props.isCoursesLoading) {
            if (this.props.allCoursesList.length === 0)
                allCoursesList = <div className="grid-course-item-container"> Chưa có dữ liệu</div >
            else allCoursesList = <div className="grid-course-item-container">
                {this.props.allCoursesList.map(subjectItem => {
                    return <SubjectItem
                        subjectId={subjectItem.id}
                        imageURL={subjectItem.imageURL}
                        subjectName={subjectItem.name}
                        type={itemType.normal}
                        description={subjectItem.description}
                    ></SubjectItem>
                })}
            </div>
        }
        else allCoursesList = <div className="grid-course-item-container">
            <Loader />
        </div>
        return (
            <div className="courses-layout" >
                <div className="course-description">
                    <p>
                        Các khoá học  MIỄN PHÍ được biên soạn và cập nhật liên tục bởi các thành viên và cộng tác viên Ban học tập Đoàn khoa Công nghệ phần mềm. Nếu có bất kỳ góp ý nào cho các Khoá học hoặc có nguyên vọng đóng góp, tài trợ cho các khoá học,
                        vui lòng liên hệ email:&nbsp;
                    </p>
                    <a href="bht.cnpm.uit@gmail.com">bht.cnpm.uit@gmail.com</a>
                </div>
                <div className="decoration-line mg-bottom-10px" />

                {/* bài viết mới nhất */}
                <div className="part-title-container" style={{ marginTop: "20px" }}>
                    <div className="part-title" >
                        ĐẠI CƯƠNG
                    </div>
                    <div className="part-sub-title">
                        Các năm học năm nhất, năm 2
                    </div>
                </div>
                <div className="flipped-container flipped course-item-container-wrapper">
                    <div className="flipped-content">
                        <div className="course-item-container">
                            {dcCoursesList}
                        </div>
                    </div>
                </div>

                {/* bài viết mới nhất */}
                <div className="part-title-container">
                    <div className="part-title" >
                        CƠ SỞ NHÓM NGÀNH
                    </div>
                    <div className="part-sub-title">
                        Các năm học năm nhất, năm 2
                    </div>
                </div>
                <div className="flipped-container flipped course-item-container-wrapper">
                    <div className="flipped-content">
                        <div className="course-item-container">
                            {csnnCoursesList}
                        </div>
                    </div>
                </div>

                {/* Danh sách môn học */}
                <div className="part-title-container j-c-space-between">
                    <div>
                        <div className="part-title" >
                            DANH SÁCH MÔN HỌC
                        </div>
                        <div className="part-sub-title">
                            Các năm học năm nhất, năm 2
                        </div>
                    </div>
                    <div className="show-all-combobox-container">
                        <div className="d-flex">
                            <div className="filter-label t-a-right mg-right-5px">Khoa/bộ môn:</div>
                            <div style={{ marginLeft: "5px" }}>
                                {!this.props.isFalcutyLoading && this.props.falcutyCategories &&
                                    <ComboBox
                                        options={this.props.falcutyCategories}
                                        placeHolder="Chọn khoa/bộ môn"
                                        onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                        comboboxId="clfcfcb-"//courses list falcuty category filter combobox
                                    ></ComboBox>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flipped-container flipped course-item-container-wrapper">
                    <div className="flipped-content">
                        <div className="course-item-container">
                            {allCoursesList}
                        </div>
                    </div>
                </div>

                <div className="mg-top-10px" />
            </div >
        );
    }
}

const mapStateToProps = (state) => {

    return {
        dcCoursesList: state.course.dcCoursesList.data,
        csnnCoursesList: state.course.csnnCoursesList.data,
        allCoursesList: state.course.coursesList.data,
        falcutyCategories: state.course_category.falcutyCategories.data,

        //Cac thong tin loading
        isDCLoading: state.course.dcCoursesList.isLoading,
        isFalcutyLoading: state.course_category.falcutyCategories.isLoading,
        isCSNNLoading: state.course.csnnCoursesList.isLoading,
        isCoursesLoading: state.course.coursesList.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCoursesList, getCourseFaculties, getCSNNCoursesList, getDCCoursesList
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesList));

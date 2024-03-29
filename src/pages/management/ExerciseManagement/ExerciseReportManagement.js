import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
//import for redux
import { getReportedExercises } from "redux/services/courseServices";
import ReportInfo from 'components/course/ReportInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
import CourseManagementNavbar from './ExerciseManagementNavbar'
import ReportReactionbar from 'components/course/ReportReactionbar'
import store from 'redux/store/index'
import { post_ResolveAnExerciseReset } from 'redux/actions/courseAction'
import { closeModal, openBLModal } from 'redux/services/modalServices.js';
import Combobox from 'components/common/Combobox/Combobox';
import { exerciseResolveStateOptions } from 'constants.js'

class PostReportManagement extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.queryParamObject = {
            page: 1
        }
        setQueryParam(this.queryParamObject);

        this.searchParamObject = {
            page: getQueryParamByName('page')
        }

        this.props.getReportedExercises(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ page: pageNumber })
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        this.props.getReportedExercises(this.searchParamObject);
        this.setState({});
    }

    onStateOptionChange = (selectedOption) => {
        setQueryParam({
            ...this.queryParamObject, "page": 1
        });

        //
        switch (selectedOption.id) {
            case 2:
                this.searchParamObject = {
                    ...this.searchParamObject,
                    isResolvedReport: false
                }
                break;
            case 3:
                this.searchParamObject = {
                    ...this.searchParamObject,
                    isResolvedReport: true
                }
                break;
            default:
                this.searchParamObject = {
                    page: "1"
                }
        }
        this.props.getReportedExercises(this.searchParamObject);
        this.setState({});
    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.exercisesList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                paginator: this.searchParamObject.page, //vl chua => do trong db luu page tu 0 con trong fe luu tu 1
            }
        setQueryParam(this.queryParamObject);

        this.props.getReportedExercises(this.searchParamObject);
    }

    render() {

        if (this.props.isHaveResolved) {
            closeModal();
            closeModal();
            this.reloadList();
            store.dispatch(post_ResolveAnExerciseReset());
            openBLModal({ type: "success", text: "Xử lý bài viết thành công!" });
        }
        if (!this.props.isListLoading && this.props.exercisesList) {
            this.exercisesList = this.props.exercisesList.map((item) => {
                console.log(item);
                return (
                    <div className="item-container">
                        <ReportInfo
                            exerciseId={item.id}
                            reporters={item.reporters}
                            author={item.author}
                            reportReasons={item.reportReasons}
                            title={item.title}
                            content={item.content}
                            reportTime={item.reportTime}
                            resolvedTime={item.resolvedTime}
                            resolvedNote={item.resolvedNote}
                            actionTaken={item.actionTaken}
                            feedbacks={item.feedbacks}
                        />

                        <ReportReactionbar type={itemType.mySelf}
                            id={item.id}
                        />
                    </div>
                )
            })
        }

        return (
            <div className="left-sidebar-layout" >
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ BÀI TẬP" />
                    <div className="content-container">
                        <CourseManagementNavbar />
                        <div className="filter-container j-c-space-between">
                            {!this.props.isListLoading ?
                                <div className="sum-item-label">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> {this.props.totalElements}</div>
                                </div> :
                                <div className="sum-item-label mg-top-10px">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> </div>
                                </div>
                            }
                            <div className="d-flex">
                                <div className="filter-label t-a-right mg-right-5px">Trạng thái xử lý:</div>
                                <div className="mg-left-5px">
                                    <Combobox
                                        options={exerciseResolveStateOptions}
                                        placeHolder="Tất cả"
                                        onOptionChanged={(selectedOption) => this.onStateOptionChange(selectedOption)}
                                        comboboxId="prmrsf-combobox" //post report management resolve state filter 
                                    ></Combobox>
                                </div>
                            </div>
                        </div>

                        {!this.props.isListLoading ?
                            <>
                                <>{this.exercisesList}</>
                                <Paginator config={{
                                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                                    pageCount: this.props.totalPages,
                                    currentPage: getQueryParamByName('page')
                                }}
                                />
                            </>
                            :
                            <div>
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                                {DocPostSummaryLoader()}
                            </div>
                        }
                    </div>
                </div >
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state.course.reportedExercises.data);
    return {
        //pending exercises list
        exercisesList: state.course.reportedExercises.data,
        isListLoading: state.course.reportedExercises.isLoading,
        totalPages: state.course.reportedExercises.totalPages,
        totalElements: state.course.reportedExercises.totalElements,

        //handle action resolve a report
        isHaveResolved: state.course.isHaveResolved

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getReportedExercises
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostReportManagement));
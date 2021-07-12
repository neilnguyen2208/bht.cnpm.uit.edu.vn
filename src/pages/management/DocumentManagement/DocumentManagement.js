
import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';
//import for redux
import { getManagementDocuments } from "redux/services/documentServices";
import { getDocumentCategoriesHaveAll } from "redux/services/documentCategoryServices";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import AdminSidebar from 'layouts/AdminSidebar'
import { postAdminApproveStatusOptions, publishedTimeOptions } from 'constants.js';
import DocumentNormalReactionbar from 'components/document/NormalReactionbar'
import DocumentSummaryMetadata from 'components/document/SummaryInfo'
import DocumentManagementNavbar from './DocumentManagementNavbar'
import { getSubjectsListHaveAll } from "redux/services/subjectServices";

import 'layouts/Layout.scss'
import store from 'redux/store';
import { delete_ADocumentReset, put_EditADocumentReset } from 'redux/actions/documentAction';

class DocumentManagement extends React.Component {

    componentDidMount() {

        this.queryParamObject = {
            "category": getQueryParamByName('category') ? getQueryParamByName('category') : 0,
            "page": 1,
        }

        this.searchParamObject = {
            "page": 1,
            "categoryID": null,
            // "documentState": '',
            // "searchTerm": '',
        }

        setQueryParam(this.queryParamObject);
        this.props.getDocumentCategoriesHaveAll();
        this.props.getSubjectsListHaveAll();

        this.props.getManagementDocuments(this.searchParamObject);
    }

    //server page
    onPageChange = (pageNumber) => {
        setQueryParam({ ...this.queryParamObject, "page": pageNumber });
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        this.props.getManagementDocuments(this.searchParamObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        setQueryParam({
            ...this.queryParamObject, "page": 1, "category": selectedOption.id
        });
        this.searchParamObject = {
            ...this.searchParamObject,
            "categoryID": selectedOption.id,
            page: 1
        }
        this.props.getManagementDocuments(this.searchParamObject);
        this.setState({});
    }

    onApproveOptionChange = (selectedOption) => {
        setQueryParam({
            ...this.queryParamObject, "page": 1
        });
        this.searchParamObject = {
            ...this.searchParamObject,
            documentState: selectedOption.documentState,
            "page": 1
        }
        this.props.getManagementDocuments(this.searchParamObject);
        this.setState({});
    }

    onTimeOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, "page": 1 });
        this.searchParamObject = {
            ...this.searchParamObject,
            sort: selectedOption.sort,
            "page": 1
        }
        this.props.getManagementDocuments(this.searchParamObject);
        this.setState({});
    }

    onSearchTermChange = () => {

        this.searchParamObject = { ...this.searchParamObject, page: 1, searchTerm: document.querySelector('.dm.p-searchbar-input').value };
        this.props.getManagementDocuments(this.searchParamObject);
        this.setState({});
    }

    onSubjectOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, page: 1, "subject": selectedOption.id });
        this.searchParamObject = {
            ...this.searchParamObject,
            "subjectID": selectedOption.id,
            page: 1
        }
        this.props.getManagementDocuments(this.searchParamObject);
        this.setState({});
    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.documentsList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                page: this.searchParamObject.page,
            }
        setQueryParam(this.queryParamObject);

        this.props.getManagementDocuments(this.searchParamObject);
    }

    render() {

        // reload the list when any item has been deleted or edited:
        if (this.props.isHaveDeleted) {
            this.reloadList();
            store.dispatch(delete_ADocumentReset())
        }

        if (this.props.isHaveEdited) {
            this.reloadList();
            store.dispatch(put_EditADocumentReset())
        }
        //combobox
        if (!this.props.isCategoryLoading && this.props.documentCategories.length !== 0) {
            this.comboboxGroup =
                <div>
                    <div className="p-searchbar-container">
                        {/* page search bar */}
                        <div className="filter-label t-a-right mg-right-5px">Từ khoá tìm kiếm:</div>
                        <div className="d-flex">
                            <input type="text" className="p-searchbar-input mg-left-5px dm" placeholder="Nhập từ khoá " />
                            <button className="p-searchbar-btn" onClick={() => { this.onSearchTermChange() }}>
                                <div className="d-flex">
                                    Tìm kiếm
                                    {/* <img src={search_icon} className="p-searchbar-icon" alt=""></img> */}
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="j-c-space-between">
                        <div>
                            <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                            <div className="mg-left-5px">
                                <ComboBox
                                    selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 0}
                                    options={this.props.documentCategories}
                                    onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                                    comboboxId="dmcf-combobox" //document management category filter
                                ></ComboBox>
                            </div>
                        </div>
                        <div>
                            <div className="filter-label t-a-right mg-right-5px">Trạng thái duyệt:</div>
                            <div className="mg-left-5px">
                                <ComboBox
                                    options={postAdminApproveStatusOptions}
                                    placeHolder="Tất cả"
                                    onOptionChanged={(selectedOption) => this.onApproveOptionChange(selectedOption)}
                                    comboboxId="dmasf-combobox" //document management approval status filter 
                                ></ComboBox>
                            </div>
                        </div>
                    </div>


                </div >
        }
        else this.comboboxGroup = <div className="filter-container">
            <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
            </div>
        </div>

        if (!this.props.isSubjectLoading)
            this.subjectCombobox = <div className="j-c-space-between">
                < div  >
                    <div className="filter-label t-a-right mg-right-5px">Môn học: </div>
                    <div className="mg-left-5px">
                        <ComboBox
                            options={this.props.subjects}
                            placeHolder="Tất cả"
                            onOptionChanged={(selectedOption) => this.onSubjectOptionChange(selectedOption)}
                            comboboxId="dmlsf-combobox" //document management subject filter 
                        ></ComboBox>
                    </div>
                </div >
                <div className="mg-top-10px">
                    <div className="filter-label t-a-right mg-right-5px">Thời gian:</div>
                    <div className="mg-left-5px">
                        <ComboBox
                            options={publishedTimeOptions}
                            selectedOptionID={1}
                            placeHolder="Tất cả"
                            onOptionChanged={(selectedOption) => this.onTimeOptionChange(selectedOption)}
                            comboboxId="dmtf-combobox" //document management time filter 
                        ></ComboBox>
                    </div>
                </div>
            </div>

        else this.categoryCombobox = <div className="filter-container">
            <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
            </div>
        </div>

        if (!this.props.isListLoading && this.props.documentsList) {
            this.documentsList = this.props.documentsList.map((item) => {
                return <div className="item-container" key={item.id}>
                    <DocumentSummaryMetadata
                        type={itemType.management}
                        documentID={item.id}
                        authorDisplayName={item.authorDisplayName}
                        authorID={item.authorID}
                        publishDtm={item.publishDtm}
                        categoryName={item.categoryName}
                        categoryID={item.categoryID}
                        subjectName={item.subjectName}
                        subjectID={item.subjectID}
                        useAction
                        title={item.title}
                        description={item.description}
                        imageURL={item.imageURL}
                        readingTime={item.readingTime}
                        approveState={item.docState}
                        popUpMenuPrefix="mdpu"   //stand for my doc popup 
                        authorAvatarURL={item.authorAvatarURL}
                        availableActions={item.availableActions}
                        reloadList={() => this.reloadList()}
                    />
                    <DocumentNormalReactionbar
                        documentID={item.id}
                        likeCount={item.likeCount ? item.likeCount : 0}
                        dislikeCount={item.dislikeCount ? item.dislikeCount : 0}
                        docReactionType={item.docReactionType ? item.docReactionType : "NONE"}
                        commentCount={item.commentCount ? item.commentCount : 0}
                        downloadCount={item.downloadCount ? item.downloadCount : 0}
                        viewCount={item.viewCount ? item.viewCount : 0}
                        availableActions={item.availableActions ? item.availableActions : []}
                        useAction
                    />
                </div >
            })
        }
        if (!this.props.isCategoryLoading && this.props.documentCategories.length !== 0) {
            this.filter = this.props.documentCategories;
        }

        return (
            <div className="left-sidebar-layout">
                <AdminSidebar />
                <div className="content-layout">
                    <Titlebar title="QUẢN LÝ TÀI LIỆU" />
                    <div className="content-container">
                        <DocumentManagementNavbar />

                        <div className="filter-container">
                            {this.comboboxGroup}
                            {this.subjectCombobox}
                        </div>
                        {!this.props.isListLoading && this.props.documentsList ?
                            <>
                                <div className="sum-item-label">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> {this.props.totalElements}</div>
                                </div>
                                <div>{this.documentsList}</div>
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
    return {
        //pending documents list
        documentsList: state.document.managementDocuments.data,
        isListLoading: state.document.managementDocuments.isLoading,
        totalPages: state.document.managementDocuments.totalPages,
        totalElements: state.document.managementDocuments.totalElements,

        //subject
        subjects: state.subject.subjects.searchData,
        isSubjectLoading: state.subject.subjects.isLoading,

        //category
        documentCategories: state.documentCategory.categories.searchData,
        isCategoryLoading: state.documentCategory.categories.isLoading,

        //handle 2 actions: delete and edit
        isHaveDeleted: state.document.isHaveDeleted,
        isHaveEdited: state.document.isHaveEdited,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getSubjectsListHaveAll,
    getManagementDocuments,
    getDocumentCategoriesHaveAll,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentManagement));
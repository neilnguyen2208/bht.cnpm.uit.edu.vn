/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType, userDocumentApproveStatusOptions } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';

//import for redux
import { getMyDocuments } from "redux/services/documentServices";
import { getDocumentCategoriesHaveAll } from "redux/services/documentCategoryServices";
import { getSubjectsListHaveAll } from "redux/services/subjectServices";
import "components/common/Loader/Loader.scss";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import UserSidebar from 'layouts/UserSidebar'
import DocumentNormalReactionbar from 'components/document/NormalReactionbar'
import DocumentSummaryMetadata from 'components/document/SummaryInfo'
import store from 'redux/store/index'

import { delete_ADocumentReset, put_EditADocumentReset } from 'redux/actions/documentAction'

//Sample URL: http://localhost:3000/user/my-documents?page=3&category=1
class MyDocuments extends React.Component {

    componentDidMount() {
        this.searchParamObject = {
            "page": 1,
            "categoryID": null,
            // "docState": ''
            sort: "Dtm,asc"
        }

        this.queryParamObject = {
            "category": 0,
            "page": 1
        }

        //force default properties, can't access by querry param
        setQueryParam(this.queryParamObject);
        this.props.getDocumentCategoriesHaveAll();
        this.props.getSubjectsListHaveAll();
        this.props.getMyDocuments(this.searchParamObject);
    }

    //server page
    onPageChange = (pageNumber) => {
        this.queryParamObject = {
            ...this.queryParamObject,
            "page": pageNumber
        }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page')
        }
        this.props.getMyDocuments(this.searchParamObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        this.queryParamObject = { ...this.queryParamObject, category: selectedOption.id, page: 1 }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            "categoryID": selectedOption.id,
            page: 1
        }
        this.props.getMyDocuments(this.searchParamObject);
        this.setState({});
    }

    onApproveOptionChange = (selectedOption) => {
        this.queryParamObject = { ...this.queryParamObject, page: 1 };
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            page: 1,
            docState: selectedOption.docState
        }
        this.props.getMyDocuments(this.searchParamObject);
        this.setState({});
    }

    onSubjectOptionChange = (selectedOption) => {
        this.queryParamObject = { ...this.queryParamObject, category: selectedOption.id, page: 1 }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            "subjectID": selectedOption.id, // => change subject
            page: 1
        }
        this.props.getMyDocuments(this.searchParamObject);
        this.setState({});

    }

    reloadList = () => {
        //neu con 1 item thi phai goi ve trang truoc
        if (this.props.myDocumentsList.length === 1 && this.searchParamObject.page > 1)
            this.searchParamObject = {
                ...this.searchParamObject,
                page: this.searchParamObject.page, //vl chua => do trong db luu page tu 0 con trong fe luu tu 1
            }
        setQueryParam(this.queryParamObject);

        this.props.getMyDocuments(this.searchParamObject);
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

        if (!this.props.isCategoryLoading && this.props.categories) {
            this.comboboxGroup =
                <div className="j-c-space-between">
                    <div>
                        <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                        <div className="mg-left-5px">

                            <ComboBox
                                selectedOptionID={"0"}
                                options={this.props.categories}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                                comboboxId="my-document-list-category-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                    <div>
                        <div className="filter-label t-a-right mg-right-5px">Trạng thái duyệt:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                options={userDocumentApproveStatusOptions}
                                placeHolder="Tất cả"
                                onOptionChanged={(selectedOption) => this.onApproveOptionChange(selectedOption)}
                                comboboxId="my-document-list-approve-status-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                </div>

        }
        else this.comboboxGroup = <div className="filter-container j-c-space-between ">
            <div className="d-flex">
                <div className="timeline-item d-flex">
                    <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
                </div>
            </div>
            <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
            </div>
        </div>

        if (!this.props.isSubjectLoading && this.props.subjects)
            this.subjectCombobox = < div className="mg-top-10px" >
                <div className="filter-label t-a-right mg-right-5px">Môn học: </div>
                <div className="mg-left-5px">
                    <ComboBox
                        options={this.props.subjects}
                        placeHolder="Tất cả"
                        onOptionChanged={(selectedOption) => this.onSubjectOptionChange(selectedOption)}
                        comboboxId="my-document-list-subject-filter-combobox"
                    ></ComboBox>
                </div>
            </div >

        if (!this.props.isListLoading) {
            if (this.props.myDocumentsList.length !== 0)
                this.myDocumentsList = this.props.myDocumentsList.map((item) => {
                    return <div className="item-container" key={item.id}>
                        <DocumentSummaryMetadata
                            type={itemType.mySelf}
                            documentID={item.id}
                            authorDisplayName={item.authorDisplayName}
                            authorID={item.authorID}
                            publishDtm={item.publishDtm}
                            categoryName={item.categoryName}
                            categoryID={item.categoryID}
                            subjectName={item.subjectName}
                            subjectID={item.subjectID}
                            availableActions={item.availableActions}
                            title={item.title}
                            useAction
                            feedback={item.feedback}
                            description={item.description}
                            imageURL={item.imageURL}
                            readingTime={item.readingTime}
                            approveState={item.docState}
                            popUpMenuPrefix="mdpu"   //stand for my doc popup 
                            authorAvatarURL={item.authorAvatarURL}
                            reloadList={() => this.reloadList()}
                        />
                        <DocumentNormalReactionbar
                            documentID={item.id}
                            availableActions={item.availableActions}
                            useAction
                            likeCount={item.likeCount ? item.likeCount : 0}
                            dislikeCount={item.dislikeCount ? item.dislikeCount : 0}
                            docReactionType={item.docReactionType ? item.docReactionType : "NONE"}
                            commentCount={item.commentCount ? item.commentCount : 0}
                            downloadCount={item.downloadCount ? item.downloadCount : 0}
                            viewCount={item.viewCount ? item.viewCount : 0}
                        />
                    </div >
                })
            else
                this.myDocumentsList = <div>Không có kết quả nào!</div>;
        }
        else
            this.myDocumentsList = <div>
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
            </div>

        return (
            <div className="left-sidebar-layout" >
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="TÀI LIỆU CỦA TÔI" />
                    <div className="content-container">
                        <div className="filter-container">
                            {this.comboboxGroup}
                            {this.subjectCombobox}
                        </div>
                        {!this.props.isListLoading && this.props.myDocumentsList ?
                            <>
                                <div className="sum-item-label">
                                    <div className="mg-right-5px">Tổng số:</div>
                                    <div> {this.props.totalElements}</div>
                                </div>
                                <div >{this.myDocumentsList}</div>
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
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        //
        myDocumentsList: state.document.myDocuments.data,
        categories: state.documentCategory.categories.searchData,
        subjects: state.documentSubject.subjects.searchData,
        totalPages: state.document.myDocuments.totalPages,
        totalElements: state.document.myDocuments.totalElements,
        isListLoading: state.document.myDocuments.isLoading,
        isCategoryLoading: state.documentCategory.categories.isLoading,
        isSubjectLoading: state.documentSubject.subjects.isLoading,

        //handle 2 actions: delete and edit
        isHaveDeleted: state.document.isHaveDeleted,
        isHaveEdited: state.document.isHaveEdited,


    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyDocuments,
    getDocumentCategoriesHaveAll,
    getSubjectsListHaveAll,

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyDocuments));

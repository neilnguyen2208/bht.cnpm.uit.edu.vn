/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType, userApproveStatusOptions } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';

//import for redux
import { getMyDocuments } from "redux/services/documentServices";
import { getDocumentCategoriesHaveAll } from "redux/services/documentCategoryServices";
import { getDocumentSubjectsHaveAll } from "redux/services/documentSubjectServices";
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
class MyDocuments extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.searchParamObject = {
            "paginator": 1,
            "category.id": null,
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
        this.props.getDocumentSubjectsHaveAll();
        this.props.getMyDocuments(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        this.queryParamObject = {
            ...this.queryParamObject,
            "page": pageNumber
        }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            paginator: getQueryParamByName('page')
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
            "category.id": selectedOption.id,
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

        //reload the list when any item has been deleted or edited:
        // if (this.props.isHaveDeleted) {
        //     this.reloadList();
        //     store.dispatch(delete_ADocumentReset())
        // }

        // if (this.props.isHaveEdited) {
        //     this.reloadList();
        //     store.dispatch(put_EditADocumentReset())
        // }

        if (!this.props.isCategoryLoading) {
            this.comboboxGroup =
                <div className="j-c-space-between">
                    <div>
                        <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                        <div className="mg-left-5px">

                            <ComboBox
                                selectedOptionID={"0"}
                                options={this.props.categories}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                                id="my-document-list-category-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                    <div>
                        <div className="filter-label t-a-right mg-right-5px">Trạng thái duyệt:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                options={userApproveStatusOptions}
                                placeHolder="Tất cả"
                                onOptionChanged={(selectedOption) => this.onApproveOptionChange(selectedOption)}
                                id="my-document-list-approve-status-filter-combobox"
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

        if (!this.props.isSubjectLoading)
            this.subjectCombobox = < div className="mg-top-10px" >
                <div className="filter-label t-a-right mg-right-5px">Môn học: </div>
                <div className="mg-left-5px">
                    <ComboBox
                        options={this.props.subjects}
                        placeHolder="Tất cả"
                        onOptionChanged={(selectedOption) => this.onApproveOptionChange(selectedOption)}
                        id="my-document-list-subject-filter-combobox"
                    ></ComboBox>
                </div>
            </div >

        if (!this.props.isListLoading) {
            if (this.props.myDocumentsList.length !== 0)
                this.myDocumentsList = this.props.myDocumentsList.map((item) => {
                    return <div className="item-container" key = {item.id}>
                        <DocumentSummaryMetadata
                            type={itemType.mySelf}
                            id={item.id}
                            authorName={item.authorName}
                            authorID={item.authorID}
                            publishDtm={item.publishDtm}
                            categoryName={item.categoryName}
                            categoryID={item.categoryID}
                            subjectName={item.documentSubject}
                            subjectID={item.documentSubjectID}

                            title={item.title}
                            // fileName={item.fileName}
                            fileName={"Demo file name.pdf"}
                            description={item.description}
                            imageURL={item.imageURL}
                            readingTime={item.readingTime}
                            approveState={item.docState}
                            popUpMenuPrefix="mdpu"   //stand for my doc popup 
                            authorAvatarURL={"https://i.imgur.com/b6F1E7f.png"}
                            //
                            reloadList={() => this.reloadList()}
                        />
                        <DocumentNormalReactionbar
                            id={item.id}
                            likeCount={item.likeCount ? item.likeCount : 2}
                            dislikeCount={item.dislikeCount ? item.dislikeCount : 3}
                            docReactionType={item.docReactionType ? item.docReactionType : "NONE"}
                            commentCount={item.commentCount ? item.commentCount : 10}
                            downloadCount={item.downloadCount ? item.downloadCount : 21}
                            viewCount={item.viewCount ? item.viewCount : 1200}
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
                                <div className="filter-label d-flex mg-bottom-10px">
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
        categories: state.document_category.categories.searchData,
        subjects: state.document_subject.subjects.searchData,
        totalPages: state.document.myDocuments.totalPages,
        totalElements: state.document.myDocuments.totalElements,
        isListLoading: state.document.myDocuments.isLoading,
        isCategoryLoading: state.document_category.categories.isLoading,
        isSubjectLoading: state.document_subject.subjects.isLoading,

        //handle 2 actions: delete and edit
        isHaveDeleted: state.document.isHaveDeleted,
        isHaveEdited: state.document.isHaveEdited,


    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyDocuments,
    getDocumentCategoriesHaveAll,
    getDocumentSubjectsHaveAll,

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyDocuments));

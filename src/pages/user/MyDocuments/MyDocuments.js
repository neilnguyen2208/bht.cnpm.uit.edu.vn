/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar';
import { itemType, userApproveStatusOptions } from 'constants.js';
import Paginator from 'components/common/Paginator/ServerPaginator';

//import for redux
import { getMyDocuments } from "redux/services/docServices";
import { getDocCategoriesHaveAll } from "redux/services/docCategoryServices";
import "components/common/Loader/Loader.scss";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import UserSidebar from 'layouts/UserSidebar'
import DocumentsNormalReactionbar from 'components/doc/NormalReactionbar'
import DocumentsSummaryMetadata from 'components/doc/SummaryInfo'
import store from 'redux/store/index'

import { delete_ADocumentReset, put_EditADocumentReset } from 'redux/actions/docAction'

//Sample URL: http://localhost:3000/user/my-docs?page=3&category=1
class MyDocuments extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.searchParamObject = {
            "page": 1,
            "category.id": null,
            "docState": ''
        }

        this.queryParamObject = {
            "category": 0,
            "page": 1
        }

        //force default properties, can't access by querry param
        setQueryParam(this.queryParamObject);

        this.props.getDocCategoriesHaveAll();
        this.searchParamObject = {
            page: getQueryParamByName('page'),
            "category.id": getQueryParamByName('category') && getQueryParamByName('category') !== "0" ? getQueryParamByName('category') : null,
            sort: 'publishDtm,desc',
            docState: ''
        }
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

        if (!this.props.isCategoryLoading && this.props.docCategories.length !== 0) {
            this.comboboxGroup =
                <div className="filter-container j-c-space-between">
                    <div className="d-flex">
                        <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 0}
                                options={this.props.docCategories}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                                id="my-doc-list-category-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="filter-label t-a-right mg-right-5px">Trạng thái duyệt:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                options={userApproveStatusOptions}
                                placeHolder="Tất cả"
                                onOptionChanged={(selectedOption) => this.onApproveOptionChange(selectedOption)}
                                id="my-doc-list-approve-status-filter-combobox"
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

        if (!this.props.isListLoading) {
            if (this.props.myDocumentsList.length !== 0)
                this.myDocumentsList = this.props.myDocumentsList.map((item) => {
                    return <div className="item-container">
                        <DocumentsSummaryMetadata
                            type={itemType.mySelf}
                            id={item.id}
                            authorName={item.authorName}
                            authorID={item.authorID}
                            publishDtm={item.publishDtm}
                            categoryName={item.categoryName}
                            categoryID={item.categoryID}
                            title={item.title}
                            summary={item.summary}
                            imageURL={item.imageURL}
                            readingTime={item.readingTime}
                            approveState={item.docState}
                            popUpMenuPrefix="mppu"   //stand for my doc popup 
                            authorAvatarURL={item.authorAvatarURL}
                            //
                            reloadList={() => this.reloadList()}
                        />
                        <DocumentsNormalReactionbar
                            id={item.id}
                            likeCount={item.likeCount}
                            commentCount={item.commentCount}
                            likedStatus={item.likeStatus}
                            savedStatus={item.savedStatus}
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
                    <Titlebar title="BÀI VIẾT CỦA TÔI" />
                    <div className="content-container">
                        {this.comboboxGroup}

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
        myDocumentsList: state.doc.myDocuments.data,
        docCategories: state.doc_category.categories.searchData,
        totalPages: state.doc.myDocuments.totalPages,
        totalElements: state.doc.myDocuments.totalElements,
        isListLoading: state.doc.myDocuments.isLoading,
        isCategoryLoading: state.doc_category.categories.isLoading,

        //handle 2 actions: delete and edit
        isHaveDeleted: state.doc.isHaveDeleted,
        isHaveEdited: state.doc.isHaveEdited,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyDocuments,
    getDocCategoriesHaveAll,
    // getDocCategories,

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyDocuments));

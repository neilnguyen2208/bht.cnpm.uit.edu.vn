/* eslint-disable react/jsx-pascal-case */
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React from 'react'

//services
import { getDocumentSearch } from "redux/services/documentServices"
import { getDocumentCategoriesHaveAll } from "redux/services/documentCategoryServices"
import { getDocumentSubjectsHaveAll } from "redux/services/documentSubjectServices"

//utils
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'

//components
import Paginator from 'components/common/Paginator/ServerPaginator';
import ComboBox from 'components/common/Combobox/Combobox';
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import DocumentNormalReactionbar from 'components/document/NormalReactionbar'
import DocumentSummaryMetadata from 'components/document/SummaryInfo'
import { publishedTimeOptions, itemType } from 'constants.js';
import SearchHorizontalMenubar from './SearchHorizontalMenubar';
import Loader from 'components/common/Loader/Loader';


class DocumentsList extends React.Component {

    componentDidMount() {
        this.queryParamObject = {
            "category": 0,
            "page": 1,
            "q": getQueryParamByName('q') ? getQueryParamByName('q') : ' '

        }

        this.searchParamObject = {
            "paginator": 1,
            "categoryID": null,
            // "sortByPublishDtm": "desc",
            // "searchTerm": getQueryParamByName('q') ? getQueryParamByName('q') : ' '

        }

        //force default properties, can't access by querry param
        setQueryParam(this.queryParamObject);
        this.props.getDocumentCategoriesHaveAll();
        this.props.getDocumentSubjectsHaveAll();
        this.props.getDocumentSearch(this.searchParamObject);
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
        this.props.getDocumentSearch(this.searchParamObject);
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
        this.props.getDocumentSearch(this.searchParamObject);
        this.setState({});
    }

    onSubjectOptionChange = (selectedOption) => {
        this.queryParamObject = { ...this.queryParamObject, category: selectedOption.id, page: 1 }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            "category.id": selectedOption.id, // => change subject
            page: 1
        }
        this.props.getDocumentSearch(this.searchParamObject);
        this.setState({});

    }

    onTimeOptionChange = (selectedOption) => {
        setQueryParam({ ...this.queryParamObject, "page": 1 });
        this.searchParamObject = {
            ...this.searchParamObject,
            sortByPublishDtm: selectedOption.sort
        }
        this.props.getDocumentSearch(this.searchParamObject);
        this.setState({});
    }

    render() {

        if (!this.props.isSubjectLoading && this.props.subjects)
            this.subjectCombobox = < div className="mg-top-10px" >
                <div className="filter-label t-a-right mg-right-5px">Môn học: </div>
                <div className="mg-left-5px">
                    <ComboBox
                        options={this.props.subjects}
                        placeHolder="Tất cả"
                        onOptionChanged={(selectedOption) => this.onSubjectOptionChange(selectedOption)}
                        id="my-document-list-subject-filter-combobox"
                    ></ComboBox>
                </div>
            </div >

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
                                id="my-document-list-category-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                    <div>
                        <div className="filter-label t-a-right mg-right-5px">Thời gian:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                options={publishedTimeOptions}
                                selectedOptionID={1}
                                placeHolder="Tất cả"
                                onOptionChanged={(selectedOption) => this.onTimeOptionChange(selectedOption)}
                                id="pltf-combobox" //post list time filter 
                            ></ComboBox>
                        </div>
                    </div>
                </div >

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
            if (this.props.documentsList.length !== 0)
                this.documentsList = this.props.documentsList.map((item) => {
                    return <div className="item-container" key={item.id}>
                        <DocumentSummaryMetadata
                            type={itemType.normal}
                            id={item.id}
                            authorDisplayName={item.authorDisplayName}
                            authorID={item.authorID}
                            publishDtm={item.publishDtm}
                            categoryName={item.category}
                            categoryID={item.categoryID}
                            subjectName={item.subject}
                            subjectID={item.subjectID}

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
                this.documentsList = <div>Không có kết quả nào!</div>;
        }

        else
            this.documentsList = <div>
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
            </div>

        return (
            <div className="search-layout">
                <SearchHorizontalMenubar></SearchHorizontalMenubar>
                <div className="mg-top-10px" />
                <div className="nm-bl-layout-router-outlet" >
                    <div>
                        <div className="filter-container" >
                            {this.comboboxGroup}
                            {this.subjectCombobox}
                        </div>
                        {this.props.isListLoading ?
                            < Loader /> :
                            <div>
                                <div className="gray-label margin-bottom-10px"> Tổng số kết quả: {this.props.totalElements}  </div>
                                <div >{this.documentsList}</div>

                                < Paginator config={{
                                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                                    pageCount: this.props.totalPages,
                                    currentPage: getQueryParamByName('page') ? getQueryParamByName('page') : 1
                                }} />
                            </div>
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {

    return {
        documentsList: state.document.documentsList.data,
        isListLoading: state.document.documentsList.isLoading,

        //category
        isCategoryLoading: state.document_category.categories.isLoading,
        categories: state.document_category.categories.searchData,

        //pages and elements
        totalPages: state.document.documentsList.totalPages,
        totalElements: state.document.documentsList.totalElements,

        //subject
        isSubjectLoading: state.document_subject.subjects.isLoading,
        subjects: state.document_subject.subjects.searchData

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentSearch, getDocumentCategoriesHaveAll, getDocumentSubjectsHaveAll
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentsList));

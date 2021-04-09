import React, { Component } from "react";
import { getDocumentSearch } from "redux/services/documentServices"
import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js';

import DocumentNormalReactionbar from 'components/document/NormalReactionbar'
import SearchTagHorizontalMenubar from './SearchTagHorizontalMenubar';
import DocumentSummaryMetadata from 'components/document/SummaryInfo';
import RelativeTagSidebar from 'layouts/RelativeTagSidebar';
import search_icon from 'assets/icons/24x24/bg_search_icon_24x24.png'
import SearchTagTopbar from "layouts/SearchTagTopbar";

class SearchDocumentByTag extends Component {

    componentDidMount() {
        this.queryParamObject = {
            "page": 1,
            tag: getQueryParamByName('tag') !== "null" && getQueryParamByName('tag') ? getQueryParamByName('tag') : 1

        }

        this.searchParamObject = {
            "paginator": 1,
            // tags: getQueryParamByName('tag') !== "null" && getQueryParamByName('tag') ? getQueryParamByName('tag') : 1,
            searchTerm: ''
        }

        setQueryParam(this.queryParamObject);
        this.props.getDocumentSearch(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ ...this.queryParamObject, "page": pageNumber });
        this.searchParamObject = {
            ...this.searchParamObject,
            paginator: getQueryParamByName('page'),
        }
        this.props.getDocumentSearch(this.searchParamObject);
        this.setState({});
    }

    render() {

        let documentSearchResult = <></>
        if (!this.props.isListLoading) {
            documentSearchResult = this.props.documentSearchResult.map((item) => {
                return < div className="item-container" >
                    <DocumentSummaryMetadata
                        type={itemType.mySelf}
                        id={item.id}
                        authorName={item.authorName}
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
        }

        return (
            <div className="search-layout">
                <SearchTagTopbar />
                <div className="d-flex">
                    <RelativeTagSidebar />
                    <div className="w-100-percents" >
                        <SearchTagHorizontalMenubar />
                        {
                            this.props.isListLoading ?
                                < Loader /> :
                                <>
                                    <div className="sum-item-label">
                                        <div className="mg-right-5px">Tổng số:</div>
                                        <div> {this.props.totalElements}</div>
                                    </div>
                                    {documentSearchResult}
                                    < Paginator config={{
                                        changePage: (pageNumber) => this.onPageChange(pageNumber),
                                        pageCount: this.props.totalPages,
                                        currentPage: getQueryParamByName('page')
                                    }} />
                                </>
                        }


                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.document_category.categories.searchData,
        isListLoading: state.document.documentsList.isLoading,
        isCategoryLoading: state.document_category.categories.isLoading,
        documentSearchResult: state.document.documentsList.data,
        totalPages: state.document.documentsList.totalPages,
        totalElements: state.document.documentsList.totalElements,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentSearch
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchDocumentByTag));

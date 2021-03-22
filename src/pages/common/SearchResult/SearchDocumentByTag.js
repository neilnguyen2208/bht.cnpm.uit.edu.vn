import React, { Component } from "react";
import { getDocumentSearch } from "redux/services/documentServices"
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js';

import DocumentNormalReactionbar from 'components/document/NormalReactionbar'
import SearchTagHorizontalMenubar from './SearchTagHorizontalMenubar';
import DocumentSummaryMetadata from 'components/document/SummaryInfo';
import RelativeTagSidebar from 'layouts/RelativeTagSidebar';

class SearchDocumentByTag extends Component {
    
    componentDidMount() {
        this.queryParamObject = {
            "page": 1,
            tag: getQueryParamByName('tag')

        }

        this.searchParamObject = {
            "paginator": 1,
            tags: getQueryParamByName('tag'),
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
                        type={itemType.normal}
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
                        approveState={item.documentState}
                        popUpMenuPrefix="pmpu"   //stand for my document popup 
                        authorAvatarURL={item.authorAvatarURL}
                        //
                        reloadList={() => this.reloadList()}
                    />
                    <DocumentNormalReactionbar
                        id={item.id}
                        likeCount={item.likeCount}
                        commentCount={item.commentCount}
                        likedStatus={item.likeStatus}
                        savedStatus={item.savedStatus}
                    />
                </div >

            })
        }

        return (
            <div className="search-layout">
                <div className="current-tag">
                    Tag:
                </div>
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
            </div>
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

import React, { Component } from "react";
import Tag from "components/common/Tag/Tag"
import { getDocumentSearchResult } from "redux/services/docServices"
import { getDocCategories } from "redux/services/docCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getSearchParamByName, isContainSpecialCharacter, setSearchParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import DocSummary from 'components/doc/DocSummary'
import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js'
import SearchHorizontalMenubar from './SearchHorizontalMenubar'

class SearchDocument extends Component {
    constructor(props) {
        super(props);

        this.documentSearchResult = [];

        this.categoryFilters = [
            { id: 1, name: "Tất cả" },
            { id: 2, name: "Danh mục 1" },
            { id: 3, name: "Danh mục 2" },
            { id: 4, name: "Danh mục 3" }
        ]
        this.timeFilters = [
            { id: 1, name: "Mới nhất" },
            { id: 2, name: "Cũ nhất" },
            { id: 3, name: "7 ngày qua" },
            { id: 4, name: "Hôm nay" }
        ]
    }

    componentDidMount() {
        this.props.getDocCategories();
        let searchTerm = getSearchParamByName('q'); //querry
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');

        this.props.getDocumentSearchResult(page, category, searchTerm) //api khác, tìm bằng tag
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setSearchParam("page", pageNumber);
        let searchTerm = getSearchParamByName('q'); //querry
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getDocumentSearchResult(page ? page : 1, category ? category : "", searchTerm ? searchTerm : "");
        this.setState({});
    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setSearchParam("category", selectedOption.id);
        let searchTerm = getSearchParamByName('q'); //querry
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getDocumentsSearchResult(page ? page : 1, category ? category : "", searchTerm ? searchTerm : "");
        this.setState({});
    }
    render() {

        if (!this.props.isListLoading) {
            this.documentSearchResult = this.props.documentsList.map((documentItem) => (
                <DocSummary
                    type={itemType.normal}
                    key={documentItem.id}
                    id={documentItem.id}
                    authorName={documentItem.authorName}
                    authorID={documentItem.authorID}
                    publishDtm={documentItem.publishDtm}
                    category={documentItem.categoryName}
                    categoryID={documentItem.categoryID}
                    title={documentItem.title}
                    summary={documentItem.summary}
                    imageURL={documentItem.imageURL}
                    likeStatus={documentItem.likeStatus}
                    savedStatus={documentItem.savedStatus}
                    readingTime={documentItem.readingTime}
                    likes={documentItem.likes}
                    comments={documentItem.commentCount}
                    approveStatus={false}
                ></DocSummary >)
            )
        }
        return (
            <div className="pr-layout" >
                <div className="search-layout">
                    <SearchHorizontalMenubar></SearchHorizontalMenubar>
                    <div className="mg-top-10px" />
                    <div className="nm-bl-layout-router-outlet" >
                        <div className="filter-container">
                            <div className = "d-flex">
                                <div className="filter-label t-a-right mg-right-5px">Thời gian:</div>
                                <div style={{ marginLeft: "5px" }}>
                                    <ComboBox
                                        // selectedOptionID={getSearchParamByName('category') ? getSearchParamByName('category') : 1}
                                        options={this.timeFilters}
                                        placeHolder="Chọn thời gian"
                                        onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                        id="search-doc-time-filter-combobox"
                                    ></ComboBox>
                                </div>
                            </div>
                            <div className = "d-flex">
                                <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                                <div style={{ marginLeft: "5px" }}>
                                    <ComboBox
                                        // selectedOptionID={getSearchParamByName('category') ? getSearchParamByName('category') : 1}
                                        options={this.categoryFilters}
                                        placeHolder="Chọn danh mục"
                                        onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                        id="search-doc-category-filter-combobox"
                                    ></ComboBox>
                                </div>
                            </div>
                        </div>

                        <div>
                            {
                                this.props.isListLoading ?
                                    < Loader /> :
                                    <div>
                                        <div className="gray-label margin-bottom-10px"> Tổng số kết quả: {"20"}  </div>
                                        <div className="list-item-container">{this.documentSearchResult}</div>
                                    </div>
                            }

                            < Paginator config={{
                                changePage: (pageNumber) => this.onPageChange(pageNumber),
                                pageCount: 1,
                                currentPage: getSearchParamByName('page')
                            }} />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
   ;
    return {
        documentsList: state.document.documentSearchResult.data,
        docCategories: state.doc_category.categories.data,
        isListLoading: state.document.documentSearchResult.isLoading,
        isCategoryLoading: state.doc_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentSearchResult, getDocCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchDocument));

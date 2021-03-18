import React, { Component } from "react";
import Tag from "components/post/Tag"
import { getDocumentSearch } from "redux/services/documentServices"
import { getDocCategories } from "redux/services/documentCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getQueryParamByName, isContainSpecialCharacter, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import SummaryInfo from 'components/document/SummaryInfo'
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
        let searchParam = getQueryParamByName('q'); //querry
        let page = getQueryParamByName('page');
        let category = getQueryParamByName('category');

        this.props.getDocumentSearch(page, category, searchParam) //api khác, tìm bằng tag
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam("page", pageNumber);
        let searchParam = getQueryParamByName('q'); //querry
        let page = getQueryParamByName('page');
        let category = getQueryParamByName('category');
        this.props.getDocumentSearch(page ? page : 1, category ? category : "", searchParam ? searchParam : "");
        this.setState({});
    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setQueryParam("category", selectedOption.id);
        let searchParam = getQueryParamByName('q'); //querry
        let page = getQueryParamByName('page');
        let category = getQueryParamByName('category');
        this.props.getDocumentsSearchResult(page ? page : 1, category ? category : "", searchParam ? searchParam : "");
        this.setState({});
    }
    render() {

        if (!this.props.isListLoading) {
            this.documentSearchResult = this.props.documentsList.map((documentItem) => (
                <SummaryInfo
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
                ></SummaryInfo >)
            )
        }
        return (
            <div className="pr-layout" >
                <div className="search-layout">
                    <SearchHorizontalMenubar></SearchHorizontalMenubar>
                    <div className="mg-top-10px" />
                    <div className="nm-bl-layout-router-outlet" >
                        <div className="filter-container">
                            <div className="d-flex">
                                <div className="filter-label t-a-right mg-right-5px">Thời gian:</div>
                                <div style={{ marginLeft: "5px" }}>
                                    <ComboBox
                                        // selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 1}
                                        options={this.timeFilters}
                                        placeHolder="Chọn thời gian"
                                        onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                        id="search-document-time-filter-combobox"
                                    ></ComboBox>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                                <div style={{ marginLeft: "5px" }}>
                                    <ComboBox
                                        // selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 1}
                                        options={this.categoryFilters}
                                        placeHolder="Chọn danh mục"
                                        onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                        id="search-document-category-filter-combobox"
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
                                        <div >{this.documentSearchResult}</div>
                                    </div>
                            }

                            < Paginator config={{
                                changePage: (pageNumber) => this.onPageChange(pageNumber),
                                pageCount: 1,
                                currentPage: getQueryParamByName('page')
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
    getDocumentSearch, getDocCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchDocument));

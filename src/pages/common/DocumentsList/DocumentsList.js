/* eslint-disable react/jsx-pascal-case */
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from 'react'

//services
import { getDocumentsList } from "redux/services/docServices"
import { getDocCategories } from "redux/services/docCategoryServices"

//utils
import { getQueryParamByName, isContainSpecialCharacter, setQueryParam } from 'utils/urlUtils'
import { itemType } from 'constants.js'

//components
import Loader from "components/common/Loader/Loader"
import Titlebar from 'components/common/Titlebar/Titlebar'
import SummaryInfo from 'components/doc/SummaryInfo'
import Paginator from 'components/common/Paginator/ServerPaginator';
import ComboBox from 'components/common/Combobox/Combobox';

class DocumentsList extends Component {
    constructor(props) {
        super();
        this.maxItemPerPage = 5;

        this.documentsList = [];

        this.filter = [
            { id: 1, name: "Tất cả" },
            { id: 2, name: "Chưa phê duyệt" },
            { id: 3, name: "Đã phê duyệt" },
            { id: 4, name: "Cần xem lại" }
        ]
    }

    componentDidMount() {
        this.props.getDocCategories()

        //get filter
        let page = getQueryParamByName('page');
        let category = getQueryParamByName('category');

        this.props.getDocumentsList(page, category);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam("page", pageNumber);
        let page = getQueryParamByName('page');
        let category = getQueryParamByName('category');
        this.props.getDocumentsList(page, category);
        this.setState({});
    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setQueryParam("category", selectedOption.id);
        let page = getQueryParamByName('page');
        let category = getQueryParamByName('category');
        this.props.getDocumentsList(page, category);
        this.setState({});
    }

    render() {

        let documentsList = <></>;

        if (!this.props.isListLoading) {
            if (this.props.documentsList) {
                this.documentsList = this.props.documentsList;

                documentsList = this.documentsList.map((documentItem) => (
                    < SummaryInfo
                        type={itemType.normal}
                        key={documentItem.id}
                        id={"document-item" + documentItem.id}
                        authorName={documentItem.authorName}
                        authorID={documentItem.authorID}
                        publishDtm={documentItem.publishDtm}
                        category={documentItem.category}
                        categoryID={documentItem.categoryID}
                        title={documentItem.title}
                        views={documentItem.views}
                        downloads={documentItem.downloads}
                        subject={documentItem.subject}
                        subjectID={documentItem.subjectID}
                        likes={documentItem.likes}
                        dislikes={documentItem.dislikes}
                        description={documentItem.description}
                        imageURL={documentItem.imageURL}

                    ></SummaryInfo >)
                )
            }
        }
        return (
            <div className="nm-bl-layout">
                <Titlebar title="TÀI LIỆU" />
                <div className="content-container">
                    <div className = "mg-bottom-10px j-c-space-between">

                        <div className="filter-label d-flex">
                            <div className="mg-right-5px">Tổng số:</div>
                            <div>{this.documentsList.length}</div>
                        </div>

                        <div className = "d-flex">
                            <div className="filter-label t-a-right mg-right-5px">Bộ lọc:</div>
                            <div style={{ marginLeft: "5px" }}>
                                <ComboBox
                                    options={this.filter}
                                    selectedOptionID={1}
                                    onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                    id="my-doc-list-search-filter-combobox"
                                ></ComboBox></div>
                        </div>

                    </div>
                    {this.props.isListLoading ?
                        < Loader /> :
                        <>  {documentsList}
                        </>
                    }

                    <Paginator config={{
                        changePage: (pageNumber) => this.onPageChange(pageNumber),
                        pageCount: 20,
                        currentPage: getQueryParamByName('page')
                    }}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        documentsList: state.document.documentSearchResult.data,
        isListLoading: state.document.documentSearchResult.isLoading,
        isCategoryLoading: state.doc_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentsList, getDocCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentsList));

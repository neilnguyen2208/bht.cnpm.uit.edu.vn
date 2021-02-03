/* eslint-disable react/jsx-pascal-case */
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from 'react'

//services
import { getMyDocumentsList } from "redux/services/docServices"
import { getDocCategories } from "redux/services/docCategoryServices"

//utils
import { getSearchParamByName, isContainSpecialCharacter, setSearchParam } from 'utils/urlUtils'
import { itemType } from 'constants.js'

//components
import Loader from "components/common/Loader/Loader"
import Titlebar from 'components/common/Titlebar/Titlebar'
import DocSummary from 'components/doc/DocSummary'
import Paginator from 'components/common/Paginator/ServerPaginator';
import ComboBox from 'components/common/Combobox/Combobox';
import AdminSidebar from 'layouts/AdminSidebar'

class DocumentApproving extends Component {
    constructor(props) {
        super();
        this.maxItemPerPage = 5;

        this.documents = [];

        this.filter = [
            { id: 1, name: "Tất cả" },
            { id: 2, name: "Chưa phê duyệt" },
            { id: 3, name: "Đã phê duyệt" },
            { id: 4, name: "Cần xem lại" }
        ]
    }

    async componentDidMount() {
        this.props.getDocCategories()

        //get filter
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');

        this.props.getMyDocumentsList(page, category);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setSearchParam("page", pageNumber);
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getMyDocumentsList(page, category);
        this.setState({});
    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setSearchParam("category", selectedOption.id);
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getMyDocumentsList(page, category);
        this.setState({});
    }

    render() {

        let documentsList = <></>;

        if (!this.props.isListLoading) {
            this.documents = this.props.documents;

            documentsList = this.documents.map((documentItem => (
                < DocSummary
                    type={itemType.approving}
                    key={documentItem.id}
                    id={documentItem.id}
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

                ></DocSummary >)
            ))
        }


        return (
            <div className="management-layout">
                <AdminSidebar />
                <div className="content-container">

                    <div className="content-container"></div>
                    <Titlebar title="QUẢN LÝ TÀI LIỆU" />
                    <div className="content-container">
                        <div className="mg-bottom-10px j-c-space-between">

                            <div className="filter-label d-flex">
                                <div className="mg-right-5px">Tổng số:</div>
                                <div>{this.documents.length}</div>
                            </div>

                            <div style={{ display: "flex" }}>
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
                            pageCount: 10,
                            currentPage: getSearchParamByName('page')
                        }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        documents: state.document.myDocuments.data,
        isListLoading: state.document.myDocuments.isLoading,
        isCategoryLoading: state.doc_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyDocumentsList, getDocCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentApproving));

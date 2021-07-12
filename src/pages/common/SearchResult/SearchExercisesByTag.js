import React from 'react';
import { getExerciseSearch } from "redux/services/courseServices"
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js';

import SearchTagHorizontalMenubar from './SearchTagHorizontalMenubar';
import SummaryMetadata from 'components/course/SummaryInfo';
import RelativeTagSidebar from 'layouts/RelativeTagSidebar';
import SearchTagTopbar from 'layouts/SearchTagTopbar'

class SearchPostByTag extends React.Component {
    componentDidMount() {
        this.queryParamObject = {
            "page": 1,
            tag: getQueryParamByName('tag') ? getQueryParamByName('tag') : 1

        }

        this.searchParamObject = {
            "page": 1,
            tags: getQueryParamByName('tag'),
            searchTerm: ''
        }

        setQueryParam(this.queryParamObject);
        this.props.getExerciseSearch(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setQueryParam({ ...this.queryParamObject, "page": pageNumber });
        this.searchParamObject = {
            ...this.searchParamObject,
            page: getQueryParamByName('page'),
        }
        this.props.getExerciseSearch(this.searchParamObject);
        this.setState({});
    }

    render() {

        let exerciseSearchResult = <></>
        if (!this.props.isListLoading) {
            exerciseSearchResult = this.props.exerciseSearchResult.map((item) => {
                return < div className="item-container" >
                    <SummaryMetadata
                        type={itemType.normal}
                        exerciseID={item.id}
                        authorDisplayName={item.author.displayName}
                        authorID={item.author.id}
                        publishDtm={item.publishDtm}
                        categoryName={item.category.name}
                        categoryID={item.category.id}
                        subjectName={item.subject.name}
                        subjectID={item.subject.id}
                        title={item.title}
                        description={item.description}
                        imageURL={item.imageURL}
                        approveState={item.postState}
                        popUpMenuPrefix="pmpu"   //stand for my post popup 
                        authorAvatarURL={item.authorAvatarURL}
                        //
                        reloadList={() => this.reloadList()}
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
                                    {exerciseSearchResult}
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
        isListLoading: state.course.exercisesList.isLoading,
        exerciseSearchResult: state.course.exercisesList.data,
        totalPages: state.course.exercisesList.totalPages,
        totalElements: state.course.exercisesList.totalElements,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getExerciseSearch
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPostByTag));

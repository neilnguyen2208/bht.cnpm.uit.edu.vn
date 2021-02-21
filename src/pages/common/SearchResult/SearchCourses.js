import React, { Component } from "react";
import Tag from "components/common/Tag/Tag"
import { getPostSearchResult } from "redux/services/postServices"
import { getPostCategories } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getSearchParamByName, isContainSpecialCharacter, setSearchParam } from 'utils/urlUtils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import Loader from 'components/common/Loader/Loader'
import { itemType } from 'constants.js'
import SearchHorizontalMenubar from './SearchHorizontalMenubar'
class SearchCourses extends Component {
    constructor(props) {
        super(props);
        this.postSearchResult = [];
        this.timeFilters = [
            { id: 1, name: "Mới nhất" },
            { id: 2, name: "Cũ nhất" }
        ]

        this.state = {
            searchTerm: getSearchParamByName('q')
        }
    }

     componentDidMount() {
      
    }

    //server paginator
    onPageChange = (pageNumber) => {
      
    }

    onTimeFilterOptionChanged = (selectedOption) => {
      
    }

    onCategoryFilterOptionChanged = (selectedOption) => {
        setSearchParam("category", selectedOption.id);
    }

    render() {
        console.log(this.props);
        if (!this.props.isListLoading) {
          
        }

        if (!this.isCategoryLoading) {
            this.categoryFilters = this.props.postCategories;
        }

        return (
            <div className="pr-layout" >
                <div className="search-layout">
                    <SearchHorizontalMenubar></SearchHorizontalMenubar>
                    <div className="mg-top-10px" />
                    <div className="nm-bl-layout-router-outlet" >
                        Search courses ...
                      
                    </div>
                </div >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostSearchResult, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchCourses));

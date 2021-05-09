import React from 'react';
import { getPostSearch } from "redux/services/postServices"
import { getPostCategories } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName,  setQueryParam } from 'utils/urlUtils'
import SearchHorizontalMenubar from './SearchHorizontalMenubar'
class SearchCourses extends React.Component {
    constructor(props) {
        super(props);
        this.postSearchResult = [];
        this.timeFilters = [
            { id: 1, name: "Mới nhất" },
            { id: 2, name: "Cũ nhất" }
        ]

        this.state = {
            searchParam: getQueryParamByName('q')
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
        setQueryParam("category", selectedOption.id);
    }

    render() {
        
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
    getPostSearch, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchCourses));

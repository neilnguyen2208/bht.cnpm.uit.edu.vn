import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

//
import { getQueryParamByName } from 'utils/urlUtils';
import { getTagSearchResult } from 'redux/services/tagServices'
import Tag from "components/common/Tag/Tag"
import Loader from "components/common/Loader/Loader";
import 'components/styles/Label.scss';
import SearchHorizontalMenubar from "pages/common/SearchResult/SearchHorizontalMenubar"

class SearchTag extends Component {
    constructor(props) {
        super(props);
        this.tagSearchResult = [];
    }

    componentDidMount() {
        let searchParam = getQueryParamByName('q');
        this.props.getTagSearchResult(searchParam);
    }
    render() {

        return (
            <div className="pr-layout" >
                <div className="search-layout">
                    <SearchHorizontalMenubar></SearchHorizontalMenubar>
                    <div className="mg-top-10px" />
                    <div className="nm-bl-layout-router-outlet" >
                        <div className="mg-top-10px">

                            {!this.props.isListLoading ?
                                <div>
                                    <div className="gray-label" >Tổng số kết quả: {this.props.itemCount}</div>
                                    <div className="decoration-line margin-bottom-10px"></div>
                                    {
                                        this.props.tagsList.map(item =>
                                            <Link to={`/tags/${item.id}/post`} >
                                                <Tag isReadOnly={true} tag={item} />
                                            </Link>
                                        )
                                    }

                                </div>
                                :
                                <Loader />
                            }
                        </div>
                    </div>
                </div >
            </div >

        );
    }
}

const mapStateToProps = (state) => {
   ;
    return {
        tagsList: state.tag.tagSearchResult.data,
        itemCount: state.tag.tagSearchResult.itemCount,
        isListLoading: state.tag.tagSearchResult.isLoading,
        error: state.tag.tagSearchResult.error
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getTagSearchResult
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchTag));

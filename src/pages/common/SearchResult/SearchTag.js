import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

//
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils';
import { getTagSearchResult } from 'redux/services/tagServices'
import Tag from "components/post/Tag"
import Loader from "components/common/Loader/Loader";
import 'components/styles/Label.scss';
import SearchHorizontalMenubar from "pages/common/SearchResult/SearchHorizontalMenubar"

class SearchTag extends React.Component {
    constructor(props) {
        super(props);
        this.tagSearchResult = [];
    }

    componentDidMount() {
        this.queryParamObject = {
            "q": getQueryParamByName('q') ? getQueryParamByName('q') : ' '
        }

        this.searchParamObject = {
            "searchTerm": getQueryParamByName('q') ? getQueryParamByName('q') : ' '
        }

        setQueryParam(this.queryParamObject)
        this.props.getTagSearchResult(this.searchParamObject);
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
                                        //Kiểm tra cho document.
                                        this.props.tagsList.map(item =>
                                            <Link to={`/tags/posts?tag=${item.id}`} >
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

import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { getTagByID } from 'redux/services/tagServices'
import search_icon from 'assets/icons/24x24/bg_search_icon_24x24.png'

class SearchTagTopbar extends Component {
  componentDidMount() {
    if (Number.isNaN(getQueryParamByName('tag')) || getQueryParamByName('tag') === null) {
      setQueryParam({ tag: 1, page: 1 });
    }
    this.props.getTagByID(getQueryParamByName('tag'));
  }

  render() {
    return (

      <div className="current-tag-container">
        <Link to={"/search/tags"}>
          <img className="back-to-search-btn" src={search_icon} alt="" />
        </Link>
        <div className="current-tag">
          Tag:
          {!this.props.isLoading && this.props.currentTag ?
            <div className="tag-name">{this.props.currentTag.content}</div> :
            <></>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTag: state.tag.currentTag.data,
    isLoading: state.tag.currentTag.isLoading,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTagByID
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchTagTopbar));

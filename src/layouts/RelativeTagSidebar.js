/* eslint-disable react/jsx-pascal-case */
import React from 'react'
// import resource image, icon

//import resource string

//import scss
import 'layouts/LeftSidebarLayout.scss'
import 'components/styles/Label.scss'

//import components

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getRelativeTags } from 'redux/services/tagServices'
import PostTag from 'components/post/Tag'
import DocumentTag from 'components/document/Tag'
import ExerciseTag from 'components/course/Tag'
import "components/common/Titlebar/Titlebar.scss"
import "layouts/Layout.scss"
import "layouts/Search.scss"
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'


class RelativeTagSidebar extends React.Component {
    componentDidMount() {
        //get danh sách các tag liên quan.
        if (Number.isNaN(getQueryParamByName('tag')))
            setQueryParam({ tag: 1, page: 1 });
        this.props.getRelativeTags(getQueryParamByName('tag'));
    }

    renderTag = () => {
        if (window.location.pathname === "/tags/posts") {
            return this.props.relativeTags.map(item =>
                <PostTag isReadOnly={true} clickable tag={item} />
            )
        }
        if (window.location.pathname === "/tags/documents") {
            return this.props.relativeTags.map(item =>
                <DocumentTag isReadOnly={true} clickable tag={item} />
            )
        }
        if (window.location.pathname === "/tags/exercises") {
            return this.props.relativeTags.map(item =>
                <ExerciseTag isReadOnly={true} tag={item} clickable />
            )
        }
    }

    render() {
        return (
            <div className="d-flex">
                <div className="search-tag-side-bar">
                    Tag liên quan:
                    <div className="mg-top-10px">
                        {(!this.props.isLoading && this.props.relativeTags) && this.renderTag()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        relativeTags: state.tag.relativeTags.data,
        isLoading: state.tag.relativeTags.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getRelativeTags
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RelativeTagSidebar));

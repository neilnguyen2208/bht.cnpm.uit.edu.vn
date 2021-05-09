import React from 'react';
import 'components/styles/Tag.scss';
import { Link } from 'react-router-dom'
import { setQueryParam } from 'utils/urlUtils';
import { getPostSearch } from 'redux/services/postServices';
import { getTagByID, getRelativeTags } from 'redux/services/tagServices'
import store from 'redux/store/index'

//Set text props for this component
export default class Tag extends React.Component {

    //onDelete, tag: dmID, id, name/content

    onDelete = (e) => {
        e.preventDefault();
        this.props.onDeleteTag(this.props.tag);
    }

    onTagClick = () => {

        //if the location is tags/... => recall API 

        if (window.location.pathname.substring(0, 5) === "/tags") {

            let queryParamObject = {
                "page": 1,
                tag: this.props.tag.id
            }

            let searchParamObject = {
                "page": 1,
                tags: this.props.tag.id,
                searchTerm: ''
            }

            setQueryParam(queryParamObject);
            store.dispatch(getPostSearch(searchParamObject));
            store.dispatch(getTagByID(this.props.tag.id));
            store.dispatch(getRelativeTags(this.props.tag.id));
        }

        if (this.props.onTagClick)
            this.props.onTagClick(this.props.tag.id);
    }
    render() {
        if (!this.props.tag.id && !this.props.tag.name && !this.props.tag.content) return <></>;
        return (
            <Link to={`/tags/posts?page=1&tag=${this.props.tag.id}`}
                className="simple-tag" onClick={this.onTagClick} >
                <div className="d-flex">
                    {!this.props.isReadOnly && <div onClick={e => this.onDelete(e)} className="tag-delete-btn"><div className="close_8x8" /> </div>}
                    <div className="mg-left-5px"> {this.props.tag.content} </div>
                </div>
            </Link >
        )
    }
}


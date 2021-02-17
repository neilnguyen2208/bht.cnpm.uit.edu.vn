import React, { Component } from 'react';
import './Tag.scss';

//Set text props for this component
class Tag extends Component {

    //onDelete, tag: dmID, id, name/content

    onDelete = () => {
        this.props.onDeleteTag(this.props.tag);
    }

    onTagClick = () => {
        if (this.props.onTagClick)
            this.props.onTagClick(this.props.tag.id);
    }
    render() {
        if (!this.props.tag.id && !this.props.tag.name && !this.props.tag.content) return <></>;
        return (
            <div className="simple-tag" onClick={this.onTagClick}>
                <div className = "d-flex">
                    {!this.props.isReadOnly && <div onClick={this.onDelete} className="tag-delete-btn"><div className="close_8x8" /> </div>}
                    <div style={{ paddingLeft: "5px" }}> {this.props.tag.name}{this.props.tag.content} </div>
                </div>
            </div>
        )
    }


}

export default Tag;

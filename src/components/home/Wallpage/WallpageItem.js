import React from 'react';
import './Wallpage.scss'

import gray_btn_element from 'assets/images/g_btn_element.png'
import liked_btn from 'assets/images/liked_btn.png'
import unliked_btn from 'assets/images/unliked_btn.png'
import full_blue_bookmark_btn from 'assets/images/full_blue_bookmark_btn.png'
import gray_bookmark_btn from 'assets/images/gray_bookmark_btn.png'
import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'

import { Link } from 'react-router-dom'
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

export default class WallpageItem extends React.Component {
    constructor(props) {
        super(props);
        this.normalMenuItemList = [
            { id: 3, name: "Báo cáo", icon: trash_icon },
        ]

        this.likeCount = -1; //dummy for change
        this.state = { isLiked: 0, isSaved: 0 }
    }

    toggleLikeImage = () => {

        let tmpLike = this.state.isLiked;

        if (tmpLike === 0)
            if (this.props.likedStatus) tmpLike = 1;
            else tmpLike = -1;

        tmpLike = - tmpLike;

        if (this.props.likeStatus) {
            this.likeCount = tmpLike === -1 ? this.props.likeCount - 1 : this.props.likeCount;
        }
        else {
            this.likeCount = tmpLike === -1 ? this.props.likeCount + 1 : this.props.likeCount;
        }
        console.log(this.state.isLiked);
        //call API
        this.setState({ isLiked: tmpLike });

        console.log(this.state.isLiked)
    }

    toggleSaveImage = () => {
        let tmp = this.state.isSaved;
        if (tmp === 0)
            tmp = this.props.savedStatus ? 1 : -1;
        tmp = -tmp;

        //call API
        this.setState({ isSaved: tmp });
    }

    render() {
        //initiate some element
        let likeBtn = <></>;
        let saveBtn = <></>;

        //render likeBtn
        if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likedStatus)) {
            likeBtn = <img className="like-btn" alt="like" src={liked_btn} onClick={this.toggleLikeImage}></img>
        }
        else {
            likeBtn = <img className="like-btn" alt="like" src={unliked_btn} onClick={this.toggleLikeImage} ></img>
        }

        //render saveBtn
        if (this.state.isSaved === 1 || (this.state.isSaved === 0 && this.props.savedStatus)) {
            saveBtn = <div className="d-flex" onClick={this.toggleSaveImage} >
                <img className="save-btn" alt="like" src={full_blue_bookmark_btn} />
                <div>Huỷ</div>
            </div>
        }
        else {
            saveBtn = <div className="d-flex" onClick={this.toggleSaveImage} >
                <img className="save-btn" alt="dislike" src={gray_bookmark_btn} />
                <div>Lưu</div>
            </div >
        }

        return <div className="wallpage-item">
            <div className="left-container">
                <img src={this.props.imageURL} className='image' alt="loading cover" />
            </div>

            <div className="right-container">

                <div>
                    {/* content */}
                    <div className="item-normal-metadata-container" >
                        <div className="d-flex">
                            <div className="d-flex">
                                <div className="prefix-normal-category" />
                                <div className="normal-category">
                                    {this.props.categoryName}
                                </div>
                            </div>
                            <div className="metadata-light-black-label">bởi</div>
                            <Link className="link-label" to={/user/}>
                                {this.props.authorName}
                            </Link>
                        </div>
                        <PopupMenu items={this.normalMenuItemList} id={`wallpage-item-popup-menu-${this.props.id}`} />
                    </div>

                    {/* title */}
                    <Link to={"/posts/" + this.id}>
                        <div className="item-title">
                            {this.props.title}
                        </div>
                    </Link>

                    <div className="d-flex" style={{ marginTop: "-8px" }}>
                        <div className="d-flex"  >
                            <img alt="*" className="metadata-icon" src={gray_btn_element} />
                            <div className="metadata-light-black-label" style={{ marginLeft: "2px" }}>
                                {Math.ceil(this.props.readingTime / 60) + " phút đọc"}
                            </div>
                        </div>

                        <div className="d-flex" >
                            <img alt="*" className="metadata-icon" src={gray_btn_element} />
                            <div className="metadata-light-black-label" style={{ marginLeft: "2px" }}>
                                {this.props.publishDtm.substring(0, 10)}
                            </div>
                        </div>
                    </div>

                    <div className="item-summary">
                        {this.props.summary}
                    </div>
                </div>

                <div className="j-c-end">
                    <div className="post-reaction-bar">
                        <div className="d-flex mg-top-5px">
                            <div className="d-flex">
                                <div className="like-btn">  {likeBtn}</div>
                                <div className="like-count">{this.likeCount !== -1 ? this.likeCount : this.props.likeCount}</div>
                            </div>
                            <div className="d-flex">
                                <div className="save-text-container" onClick={this.toggleSaveImage}>
                                    <div>{saveBtn}</div>
                                </div>
                                <div className="post-comment-count-container">
                                    Bình luận
                                <div style={{ paddingLeft: "5px" }}>
                                        {this.props.commentCount}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="link-label mg-top-5px"
                            onClick={() => { window.location.href = "/posts/id=" + this.props.id }}>
                            Đọc tiếp ...
                        </div>
                    </div>
                </div>
            </div >
        </div >
    }
}



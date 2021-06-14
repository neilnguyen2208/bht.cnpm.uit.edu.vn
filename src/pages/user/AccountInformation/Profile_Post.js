/* eslint-disable react/jsx-pascal-case */

import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar'

import './AccountInformation.scss'
import 'components/styles/Form.scss'
import 'components/styles/HomeItem.scss'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSidebar from 'layouts/UserSidebar';
import "components/user/UserMenu.scss";
import ProfileComponent from './Profile_Component'
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'
import { getMyPosts } from 'redux/services/postServices'
import Paginator from 'components/common/Paginator/ServerPaginator'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import PostNormalReactionbar from 'components/post/NormalReactionbar'
import PostSummaryMetadata from 'components/post/SummaryInfo'
import { itemType } from 'constants.js';

//import for role config
class ProfilePost extends React.Component {

    componentDidMount() {

        this.searchParamObject = {
            "page": 1,
            "category.id": null,
            "postState": ''
        }

        this.queryParamObject = {
            "tab": "newest",
            "page": 1
        }

        //force default properties, can't access by querry param
        setQueryParam(this.queryParamObject);
        this.props.getMyPosts(this.searchParamObject);
    }

    onFilterClick = (filter) => {
        switch (filter) {
            case "most-likes": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    tab: "most-likes"
                }
                setQueryParam(this.queryParamObject);
                this.setState({});
                return;
            }
            case "most-views": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    tab: "most-views"
                }
                setQueryParam(this.queryParamObject);
                this.setState({});
                return;
            }
            default: {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    tab: "newest"
                }
                setQueryParam(this.queryParamObject);
                this.setState({});
                return;
            }

        }
    }

    render() {
        if (!this.props.isListLoading) {
            if (this.props.userPostList.length !== 0)
                this.userPostList = this.props.userPostList.map((item) => {
                    return <div className="item-container">
                        <PostSummaryMetadata
                            type={itemType.normal}
                            postId={item.id}
                            authorName={item.authorName}
                            authorID={item.authorID}
                            publishDtm={item.publishDtm}
                            categoryName={item.categoryName}
                            categoryID={item.categoryID}
                            title={item.title}
                            summary={item.summary}
                            imageURL={item.imageURL}
                            readingTime={item.readingTime}
                            approveState={item.postState}
                            popUpMenuPrefix="mppu"   //stand for my post popup 
                            authorAvatarURL={item.authorAvatarURL}
                            //
                            feedback={item.feedback}
                            reloadList={() => this.reloadList()}
                        />
                        <PostNormalReactionbar
                            postId={item.id}
                            likeCount={item.likeCount}
                            commentCount={item.commentCount}
                            likedStatus={item.likeStatus}
                            savedStatus={item.savedStatus}
                            viewCount= {item.viewCount}
                        />
                    </div >
                })
            else
                this.userPostList = <div>Không có bài viết nào!</div>;
        }
        else
            this.userPostList = <div>
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
            </div>

        return (
            <div className="left-sidebar-layout">
                <UserSidebar />

                <div className="content-layout">
                    <Titlebar />
                    <div className="content-container" >
                        <div className="pos-relative">
                            <ProfileComponent />

                            {/* filter area */}
                            <div className="h-filter-c">
                                <div className="h-filter">
                                    <div className={!getQueryParamByName("tab") ||
                                        (getQueryParamByName("tab") !== "most-likes"
                                            && getQueryParamByName("tab") !== "most-views")
                                        ? "h-filter-item active first" : "h-filter-item first"}
                                        onClick={() => this.onFilterClick("newest")}
                                    > Mới nhất</div>

                                    <div className={getQueryParamByName("tab") === "most-likes"
                                        ? "h-filter-item active" : "h-filter-item"}
                                        onClick={() => this.onFilterClick("most-likes")}
                                    >Lượt thích</div>

                                    <div className={getQueryParamByName("tab") === "most-views"
                                        ? "h-filter-item last active" : "h-filter-item last"}
                                        onClick={() => this.onFilterClick("most-views")}
                                    >Lượt xem</div>

                                </div>
                            </div>
                            <div>
                                {!this.props.isListLoading && this.props.userPostList ?
                                    <>

                                        <div >{this.userPostList}</div>
                                        <Paginator config={{
                                            changePage: (pageNumber) => this.onPageChange(pageNumber),
                                            pageCount: this.props.totalPages,
                                            currentPage: getQueryParamByName('page')
                                        }}
                                        />
                                    </>
                                    :
                                    <div>
                                        {DocPostSummaryLoader()}
                                        {DocPostSummaryLoader()}
                                        {DocPostSummaryLoader()}
                                    </div>
                                }
                            </div>
                        </div>
                    </div >
                </div >
            </div >

        );

    }

}

const mapStateToProps = (state) => {
    return {
        userPostList: state.post.myPosts.data,
        postCategories: state.post_category.categories.searchData,
        totalPages: state.post.myPosts.totalPages,
        totalElements: state.post.myPosts.totalElements,
        isListLoading: state.post.myPosts.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading,

        //handle 2 actions: delete and edit
        isHaveDeleted: state.post.isHaveDeleted,
        isHaveEdited: state.post.isHaveEdited,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyPosts
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePost));

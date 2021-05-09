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
import { getMyDocuments } from 'redux/services/documentServices'
import Paginator from 'components/common/Paginator/ServerPaginator'
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import DocumentNormalReactionbar from 'components/document/NormalReactionbar'
import DocumentSummaryMetadata from 'components/document/SummaryInfo'
import { itemType } from 'constants.js';

//import for role config
class ProfileDocument extends React.Component {

    componentDidMount() {

        this.searchParamObject = {
            "page": 1,
            "category.id": null,
            // "documentState": ''
        }

        this.queryParamObject = {
            "tab": "newest",
            "page": 1
        }

        //force default properties, can't access by querry param
        setQueryParam(this.queryParamObject);
        this.props.getMyDocuments(this.searchParamObject);
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
            if (this.props.userDocumentsList.length !== 0)
                this.userDocumentsList = this.props.userDocumentsList.map((item) => {
                    return <div className="item-container">
                        <DocumentSummaryMetadata
                            type={itemType.mySelf}
                            id={item.id}
                            authorName={item.authorName}
                            authorID={item.authorID}
                            publishDtm={item.publishDtm}
                            categoryName={item.category}
                            categoryID={item.categoryID}
                            subjectName={item.subject}
                            subjectID={item.subjectID}

                            title={item.title}
                            // fileName={item.fileName}
                            fileName={"Demo file name.pdf"}
                            description={item.description}
                            imageURL={item.imageURL}
                            readingTime={item.readingTime}
                            approveState={item.docState}
                            popUpMenuPrefix="mdpu"   //stand for my doc popup 
                            authorAvatarURL={"https://i.imgur.com/b6F1E7f.png"}
                            //
                            reloadList={() => this.reloadList()}
                        />
                        <DocumentNormalReactionbar
                            id={item.id}
                            likeCount={item.likeCount ? item.likeCount : 2}
                            dislikeCount={item.dislikeCount ? item.dislikeCount : 3}
                            docReactionType={item.docReactionType ? item.docReactionType : "NONE"}
                            commentCount={item.commentCount ? item.commentCount : 10}
                            downloadCount={item.downloadCount ? item.downloadCount : 21}
                            viewCount={item.viewCount ? item.viewCount : 1200}
                        />
                    </div >
                })
            else
                this.userDocumentsList = <div>Không có bài viết nào!</div>;
        }
        else
            this.userDocumentsList = <div>
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
                                {!this.props.isListLoading && this.props.userDocumentsList ?
                                    <>

                                        <div >{this.userDocumentsList}</div>
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
        userDocumentsList: state.document.myDocuments.data,
        documentCategories: state.document_category.categories.searchData,
        totalPages: state.document.myDocuments.totalPages,
        totalElements: state.document.myDocuments.totalElements,
        isListLoading: state.document.myDocuments.isLoading,

        //handle 2 actions: delete and edit
        isHaveDeleted: state.document.isHaveDeleted,
        isHaveEdited: state.document.isHaveEdited,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyDocuments
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDocument));
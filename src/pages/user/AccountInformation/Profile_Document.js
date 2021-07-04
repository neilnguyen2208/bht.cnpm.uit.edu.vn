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
import { getDocumentsByFilter } from 'redux/services/documentServices'
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
            "author": this.props.match.params.id,
            "sort": "publishDtm,desc"
        }

        this.queryParamObject = {
            "tab": "newest",
            "page": 1
        }

        //force default properties, can't access by querry param
        setQueryParam(this.queryParamObject);
        this.props.getDocumentsByFilter(this.searchParamObject);
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
                this.props.getDocumentsByFilter(this.searchParamObject)

                return;
            }
            case "most-views": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    tab: "most-views"
                }
                setQueryParam(this.queryParamObject);
                this.props.getDocumentsByFilter(this.searchParamObject)

                this.setState({});
                return;
            }
            case "most-downloads": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    tab: "most-downloads"
                }
                setQueryParam(this.queryParamObject);
                this.props.getDocumentsByFilter(this.searchParamObject)

                this.setState({});
                return;
            }
            default: {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    tab: "newest"
                }
                setQueryParam(this.queryParamObject);
                this.props.getDocumentsByFilter(this.searchParamObject)

                this.setState({});
                return;
            }

        }
    }

    render() {
        if (!this.props.isListLoading) {
            if (this.props.userDocumentsList.length !== 0)
                this.userDocumentsList = this.props.userDocumentsList.map((item) => {
                    return <div className="item-container" key={item.id}>
                        <DocumentSummaryMetadata
                            type={itemType.normal}
                            documentID={item.id}
                            authorDisplayName={item.authorDisplayName}
                            authorID={item.authorID}
                            publishDtm={item.publishDtm}
                            categoryName={item.categoryName}
                            categoryID={item.categoryID}
                            subjectName={item.subjectName}
                            subjectID={item.subjectID}

                            title={item.title}
                            // fileName={item.fileName}
                            fileName={"Demo file name.pdf"}
                            description={item.description}
                            imageURL={item.imageURL}
                            readingTime={item.readingTime}
                            approveState={item.docState}
                            popUpMenuPrefix="prfdpu"   //stand for profile doc popup 
                            authorAvatarURL={"https://i.imgur.com/b6F1E7f.png"}
                            //
                            reloadList={() => this.reloadList()}
                        />
                        <DocumentNormalReactionbar
                            documentID={item.id}
                            likeCount={item.likeCount}
                            dislikeCount={item.dislikeCount}
                            docReactionType={item.docReactionType ? item.docReactionType : "NONE"}
                            commentCount={item.commentCount}
                            downloadCount={item.downloadCount}
                            viewCount={item.viewCount}
                        />
                    </div >
                })
            else
                this.userDocumentsList = <div>Không có tài liệu nào!</div>;
        }
        else
            this.userDocumentsList = <div>
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
            </div>

        return (
            <div className="left-sidebar-layout">
                {
                    this.props.userSummaryDataLoaded && this.props.userSummaryData && this.props.userSummaryData.id === this.props.match.params.id &&
                    < UserSidebar />
                }

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
                                            && getQueryParamByName("tab") !== "most-views"
                                            && getQueryParamByName("tab") !== "most-downloads"
                                        )
                                        ? "h-filter-item active first" : "h-filter-item first"}
                                        onClick={() => this.onFilterClick("newest")}
                                    > Mới nhất</div>
                                    <div className={getQueryParamByName("tab") === "most-downloads"
                                        ? "h-filter-item active" : "h-filter-item"}
                                        onClick={() => this.onFilterClick("most-downloads")}
                                    >Lượt tải</div>
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
            </div >);
    }
}

const mapStateToProps = (state) => {
    return {
        userDocumentsList: state.document.documentsByFilter.data,
        documentCategories: state.documentCategory.categories.searchData,
        totalPages: state.document.documentsByFilter.totalPages,
        totalElements: state.document.documentsByFilter.totalElements,
        isListLoading: state.document.documentsByFilter.isLoading,

        //handle 2 actions: delete and edit
        isHaveDeleted: state.document.isHaveDeleted,
        isHaveEdited: state.document.isHaveEdited,
        userSummaryData: state.auth.currentUserSummary.data,
        userSummaryDataLoaded: state.auth.currentUserSummary.isLoadDone
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentsByFilter
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDocument));
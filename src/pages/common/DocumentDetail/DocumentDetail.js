import React from 'react'

import 'components/styles/Metadata.scss'
import { getADocumentByID, getDownloadURL } from "redux/services/documentServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'components/styles/Detail.scss'
import DetailInfo from "components/document/DetailInfo"
import DocPostDetailLoader from 'components/common/Loader/DocPostDetailLoader'
import RelativeLoader from 'components/common/Loader/RelativeLoader';

import DocumentNormalReactionbar from 'components/document/NormalReactionbar'
import store from 'redux/store/index.js';
import 'components/common/CustomCKE/CKEditorContent.scss';
import RightRelativeItems from 'layouts/RightRelativeItems';
import BottomRelativeItems from 'layouts/BottomRelativeItems';

import { itemType } from 'constants.js';
import {
    delete_ADocumentReset,
    get_DocumentByIDReset,
    post_ReportADocumentReset,
    put_EditADocumentReset,
    get_RelativeDocumentsReset,
    get_SameSubjectDocumentsReset
} from 'redux/actions/documentAction';
import { styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import { openBLModal } from 'redux/services/modalServices';
import CommentSection from 'components/document/comment/CommentSection';
import Tag from 'components/document/Tag';

//lack services: userStatistic, related Document.
class DocumentDetail extends React.Component {

    componentDidMount() {
        this.props.getADocumentByID(this.props.match.params.id);
    }

    componentWillUnmount() {
        store.dispatch(get_DocumentByIDReset());
        store.dispatch(get_RelativeDocumentsReset());
        store.dispatch(get_SameSubjectDocumentsReset());
    }

    onFileCollapseIconClick = (fileId) => {
        let ele = document.getElementById("dcm-file-preview-" + fileId);
        let btnEle = document.getElementById("dcm-file-preview-btn-" + fileId);
        if (ele.style.display === "none") {
            ele.style.display = "block";
            btnEle.innerText = "Ẩn xem trước";
        }
        else
            if (ele.style.display === "block") {
                ele.style.display = "none";
                btnEle.innerText = "Xem trước";
            }

    }

    onDownloadButtonClick = (documentId) => {
        this.props.getDownloadURL(documentId);
    }

    compoenentDidUpdate = () => {
        styleCodeSnippet();
    }

    render() {

        if (this.props.isHaveEdited) {
            store.dispatch(put_EditADocumentReset());
            this.props.getADocumentByID(this.props.match.params.id);
        }

        //reload the list when any item has been deleted or edited:
        if (this.props.isHaveDeleted) {
            store.dispatch(delete_ADocumentReset())
        }

        if (this.props.isHaveReported) {
            openBLModal({ text: "Report tài liệu thành công!", type: "success" });
            store.dispatch(post_ReportADocumentReset())
        }

        return (
            <div className="d-flex">
                <div className="mg-auto">
                    <div className="d-flex">
                        <div className="document-detail-container" >
                            {this.props.isLoadDone ?
                                <div>
                                    <DetailInfo
                                        type={itemType.normal}
                                        documentID={this.props.currentDocument.id}
                                        authorDisplayName={this.props.currentDocument.authorDisplayName}
                                        authorAvatarURL={this.props.currentDocument.authorAvatarURL}
                                        authorID={this.props.currentDocument.authorID}
                                        publishDtm={this.props.currentDocument.publishDtm}
                                        categoryName={this.props.currentDocument.categoryName}
                                        categoryID={this.props.currentDocument.categoryID}
                                        subjectName={this.props.currentDocument.subjectName ? this.props.currentDocument.subjectName : "Cấu trúc dữ liệu & giải thuật"}
                                        subjectID={this.props.currentDocument.subjectID}
                                        availableActions={this.props.currentDocument.availableActions}
                                        title={this.props.currentDocument.title}
                                        docFileUploadDTOs={this.props.currentDocument.docFileUploadDTOs}
                                        description={this.props.currentDocument.description}
                                        imageURL={this.props.currentDocument.imageURL}
                                        readingTime={this.props.currentDocument.readingTime}
                                        approveState={this.props.currentDocument.docState}
                                        popUpMenuPrefix="ddpu"   //stand for document detail popup 
                                        reloadList={() => this.reloadList()}
                                        tags={this.props.currentDocument.tags}
                                    />

                                    {this.props.currentDocument.docFileUploadDTOs.map(file => {
                                        return <div key={file.id}>
                                            <div className="file-name-container">
                                                <div className="d-flex" style={{ lineHeight: "24px" }}>
                                                    <strong style={{ marginRight: "5px" }}>{file.fileName ? file.fileName : "Tài liệu giải thuật nâng cao.pdf"}</strong> -
                                                    <div style={{ marginLeft: "5px" }}> {Math.round(file.fileSize / 1048576 * 100) / 100 + "MB"}
                                                    </div>
                                                </div>
                                                <div>
                                                    <button className="blue-button" onClick={() => this.onDownloadButtonClick(file.id)}>Tải xuống</button>
                                                    <button className="white-button mg-left-5px" id={"dcm-file-preview-btn-" + file.id} onClick={() => this.onFileCollapseIconClick(file.id)}>Xem trước</button>
                                                </div>
                                            </div>

                                            <div style={{ display: "none" }} id={"dcm-file-preview-" + file.id}>
                                                <div className="d-flex">
                                                    <iframe className="if-container"
                                                        src={file.previewURL}
                                                        title={`doc-if-${this.props.match.params.id}`}
                                                        sandbox="allow-scripts allow-same-origin"
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    })}

                                    <div style={{ marginTop: "50px" }} />

                                    <DocumentNormalReactionbar
                                        documentID={this.props.currentDocument.id}
                                        likeCount={this.props.currentDocument.likeCount ? this.props.currentDocument.likeCount : 0}
                                        dislikeCount={this.props.currentDocument.dislikeCount ? this.props.currentDocument.dislikeCount : 0}
                                        docReactionType={this.props.currentDocument.docReactionType}
                                        commentCount={this.props.currentDocument.commentCount ? this.props.currentDocument.commentCount : 0}
                                        downloadCount={this.props.currentDocument.downloadCount ? this.props.currentDocument.downloadCount : 0}
                                        viewCount={this.props.currentDocument.viewCount ? this.props.currentDocument.viewCount : 0}
                                        availableActions={this.props.currentDocument.availableActions}
                                        useAction
                                    />
                                    {!this.props.isRelativePostsLoading && this.props.relativePosts ?
                                        <BottomRelativeItems title={"BÀI VIẾT LIÊN QUAN"} items={
                                            this.props.relativePosts} type="POST" />
                                        : <DocPostDetailLoader />
                                    }
                                    {!this.props.isRelativeExercisesLoading && this.props.relativeExercises ?
                                        <BottomRelativeItems title={"BÀI TẬP LIÊN QUAN"}
                                            items={this.props.relativeExercises} type="EXERCISE" /> : <DocPostDetailLoader />
                                    }
                                    <div id="cr-cmt" />
                                    <CommentSection
                                        useAction={true}
                                        // create comment will show if you have action create comment
                                        docAvailableActions={this.props.currentDocument.availableActions}
                                        id={this.props.match.params.id}
                                        commentCount={this.props.currentDocument.commentCount}
                                    />
                                </div>
                                : <div>
                                    <DocPostDetailLoader />
                                </div>
                            }
                        </div>
                        <div>
                            <div className="fake-relative-sidebar"></div>
                            <div style={{ position: "fixed" }}>
                                {this.props.isRelativeDocLoadDone && this.props.relativeDocuments ?
                                    <RightRelativeItems title={"TÀI LIỆU LIÊN QUAN"} type="DOCUMENT" items={
                                        this.props.relativeDocuments} />
                                    : <></>
                                }
                                {this.props.isSameSubjectLoadDone && this.props.sameSubjectDocument ?
                                    <RightRelativeItems title={"CÙNG MÔN HỌC"} type="DOCUMENT"
                                        items={this.props.sameSubjectDocument} />
                                    : <></>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isHaveEdited: state.document.isHaveEdited,
        currentDocument: state.document.currentDocument.data,
        isLoadDone: state.document.currentDocument.isLoadDone,
        sameSubjectDocument: state.document.sameSubjectDocuments.data,
        isSameSubjectLoadDone: state.document.sameSubjectDocuments.isLoadDone,
        relativeDocuments: state.document.relativeDocuments.data,
        isRelativeDocLoadDone: state.document.relativeDocuments.isLoadDone,
        relativePosts: state.document.relativePosts.data,
        isRelativePostsLoading: state.document.relativePosts.isLoading,
        relativeExercises: state.document.relativeExercises.data,
        isRelativeExercisesLoading: state.document.relativeExercises.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getADocumentByID, getDownloadURL
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentDetail));

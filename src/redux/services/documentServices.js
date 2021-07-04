import {
    //my documents
    get_MyDocumentsRequest,
    get_MyDocumentsSuccess,
    get_MyDocumentsFailure,

    //my documents
    get_PendingDocumentsRequest,
    get_PendingDocumentsSuccess,
    get_PendingDocumentsFailure,

    //document search result
    get_DocumentSearchRequest,
    get_DocumentSearchSuccess,
    get_DocumentSearchFailure,

    post_UploadDocumentRequest,
    post_UploadDocumentSuccess,
    post_UploadDocumentFailure,
    post_ReactionADocumentRequest,
    post_ReactionADocumentSuccess,
    post_ReactionADocumentFailure,

    get_ReportedDocumentsSuccess,
    get_ReportedDocumentsRequest,
    get_ReportedDocumentsFailure,
    post_ApproveADocumentReset,
    post_ApproveADocumentSuccess,
    post_ApproveADocumentFailure,
    delete_RejectADocumentReset,
    delete_RejectADocumentSuccess,
    delete_RejectADocumentFailure,
    post_ResolveADocumentReset,
    post_ResolveADocumentSuccess,
    post_ResolveADocumentFailure,
    delete_ADocumentReset,
    delete_ADocumentSuccess,
    delete_ADocumentFailure,
    put_EditADocumentReset,
    put_EditADocumentSuccess,
    put_EditADocumentFailure,
    post_ReportADocumentReset,
    post_ReportADocumentSuccess,
    post_ReportADocumentFailure,
    get_DocumentByIDReset,
    get_ManagementDocumentsRequest,
    get_ManagementDocumentsSuccess,
    get_ManagementDocumentsFailure,
    get_DocumentByIDSuccess,
    get_DocumentByIDFailure,
    get_DocumentSubjectsListRequest,
    get_DocumentSubjectsListSuccess,
    get_DocumentSubjectsListFailure,
    get_DCDocumentSubjectsListRequest,
    get_DCDocumentSubjectsListSuccess,
    get_DCDocumentSubjectsListFailure,
    get_CSNNDocumentSubjectsListRequest,
    get_CSNNDocumentSubjectsListSuccess,
    get_CSNNDocumentSubjectsListFailure,
    get_RelativeDocumentsFailure,
    get_RelativeDocumentsSuccess,
    get_RelativeDocumentsReset,
    get_SameSubjectDocumentsReset,
    get_SameSubjectDocumentsSuccess,
    get_SameSubjectDocumentsFailure,
    get_DocumentsByFilterRequest,
    get_DocumentsByFilterSuccess,
    get_DocumentsByFilterFailure,
    post_RejectAndFeedbackADocumentFailure,
    post_RejectAndFeedbackADocumentSuccess,
} from "redux/actions/documentAction.js";
import FormData from 'form-data';
import { generateSearchParam, openInNewTab } from 'utils/urlUtils';
import { openModal, openBLModal, closeModal } from 'redux/services/modalServices'

//upload new document

import { authRequest, multipartRequest } from 'utils/requestUtils'
import { getUserStatisticById } from "./authServices";

export function getManagementDocuments(searchParamObject) {
    return dispatch => {
        dispatch(get_ManagementDocumentsRequest());
        authRequest.get(`/documents/getManagementDoc?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                response.data.docSummaryWithStateDTOs.map(item => IDarr += item.docSummary.id + ",") //tao ra mang id moi
                authRequest.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result_2 => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docSummaryWithStateDTOs.length; i++) {
                            finalResult.push({
                                ...result_1.docSummaryWithStateDTOs[i].docState,
                                ...result_1.docSummaryWithStateDTOs[i].docSummary,
                                ...(result_2.data.find((itmInner) => itmInner.docID === result_1.docSummaryWithStateDTOs[i].docSummary.id)),
                            });
                        }

                        dispatch(get_ManagementDocumentsSuccess({
                            docSummaryWithStateDTOs: finalResult,
                            totalPages: result_1.totalPages,
                            totalElements: result_1.totalElements
                        }))
                    }).catch(() => get_ManagementDocumentsFailure())
            })
            .catch(error => {
                dispatch(get_ManagementDocumentsFailure(error))
            })
    }
}

export function getDocumentSearch(searchParamObject) {
    return dispatch => {
        dispatch(get_DocumentSearchRequest());
        authRequest.get(`/documents/searchFilter?${generateSearchParam(searchParamObject)}`)
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                response.data.docSummaryDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi
                authRequest.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docSummaryDTOs.length; i++) {
                            finalResult.push({
                                ...result_1.docSummaryDTOs[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docSummaryDTOs[i].id)),
                            });
                        }
                        dispatch(get_DocumentSearchSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_DocumentSearchFailure())
            })
            .catch(error => {
                dispatch(get_DocumentSearchFailure(error))
            })
    }
}

export function getPendingDocuments(searchParamObject) {
    return dispatch => {
        dispatch(get_PendingDocumentsRequest());
        authRequest.get(`/documents/pendingApproval?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                let result_1 = response.data;
                let IDarr = '';
                response.data.docSummaryWithStateDTOs.map(item => IDarr += item.docSummary.id + ",") //tao ra mang id moi
                authRequest.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result_2 => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docSummaryWithStateDTOs.length; i++) {
                            finalResult.push({
                                ...result_1.docSummaryWithStateDTOs[i].docState,
                                ...result_1.docSummaryWithStateDTOs[i].docSummary,
                                ...(result_2.data.find((itmInner) => itmInner.docID === result_1.docSummaryWithStateDTOs[i].docSummary.id)),
                            });
                        }

                        dispatch(get_PendingDocumentsSuccess({
                            docSummaryWithStateDTOs: finalResult,
                            totalPages: result_1.totalPages,
                            totalElements: result_1.totalElements
                        }))
                    }).catch(() => get_PendingDocumentsFailure())
            })
            .catch(error => {
                dispatch(get_PendingDocumentsFailure(error))
            })
    }
}

export function getReportedDocuments(searchParamObject) {
    return dispatch => {
        dispatch(get_ReportedDocumentsRequest());
        authRequest.get(`/documents?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                response.data.docDetails.map(item => IDarr += item.id + ",") //tao ra mang id moi
                authRequest.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docDetails.length; i++) {
                            finalResult.push({
                                ...result_1.docDetails[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docDetails[i].id)),
                            });
                        }

                        dispatch(get_ReportedDocumentsSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_ReportedDocumentsFailure())
                // dispatch(get_MyDocumentsSuccess({ docSummaryWithStateDTOs: response.data.docDetails, totalPages: response.data.totalPages, totalElements: response.data.totalElements }))
            })
            .catch(error => {
                dispatch(get_PendingDocumentsFailure(error))
            })
    }
}

export function getMyDocuments(searchParamObject) { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_MyDocumentsRequest());
        authRequest.get(`/documents/myDocuments?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                result_1.docSummaryWithStateDTOs.map(item => IDarr += item.docSummary.id + ",") //tao ra mang id moi
                authRequest.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docSummaryWithStateDTOs.length; i++) {
                            finalResult.push({
                                ...result_1.docSummaryWithStateDTOs[i],
                                ...result_1.docSummaryWithStateDTOs[i].docSummary,
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docSummaryWithStateDTOs[i].id)),

                            });
                        }
                        dispatch(get_MyDocumentsSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_MyDocumentsFailure())
            })
            .catch(error => {
                dispatch(get_MyDocumentsFailure(error))
            })
    }
}

export function uploadADocument(data, filesList) {
    return dispatch => {
        dispatch(post_UploadDocumentRequest());
        openModal("loader", { text: "Đang upload tài liệu " });

        let uploadResponses = [];

        //response for appending to current array
        for (let i = 0; i < filesList.length; i++) {

            let fileData = new FormData();
            fileData.append('file', filesList[i]);

            multipartRequest.post(`/documents/upload`, { file: fileData })
                .then(response => {
                    uploadResponses.push({ rank: i, id: response.data.id, success: true });
                })
                .catch(error => uploadResponses.push({ rank: i, id: "", success: false }))
        }

        console.log(uploadResponses);

        // multipartRequest.post(`/documents/upload`, fileData)
        //     .then(response => {
        //         // data.fileCode = response.data.code; //assign secret code.
        //         // authRequest.post('/documents', JSON.stringify(data)).then(response => {
        //         //     dispatch(post_UploadDocumentSuccess(response));
        //         //     dispatch(closeModal());
        //         //     openBLModal({ type: "success", text: "Tài liệu được tạo thành công!" });
        //         // }).catch(error => {
        //         //     dispatch(post_UploadDocumentFailure(error));
        //         // })
        //     }).catch(error => {
        //         dispatch(post_UploadDocumentFailure(error));
        //     })
    }
}

export function reactionADocument(docID, reactionType) {
    return dispatch => {
        dispatch(post_ReactionADocumentRequest());
        authRequest.put("/documents/reactions", JSON.stringify({ docID: docID, docReactionType: reactionType }))
            .then(response => {
                openBLModal({ type: "success", text: "Cảm ơn bạn đã đưa cảm nhận về tài liệu!" });
                dispatch(post_ReactionADocumentSuccess(response))
            })
            .catch(error => {
                dispatch(post_ReactionADocumentFailure(error));
            })
    }
}

export function getDocumentById(id) {
    return dispatch => {
        dispatch(get_DocumentByIDReset())
        authRequest.get(`/documents/${id}`)
            .then(response_1 => {
                let result_1 = response_1.data;//response without statistic

                //get relative documents
                dispatch(getRelativeDocuments(result_1.id, result_1.authorID));
                dispatch(getSameSubjectDocuments(result_1.id, result_1.subjectID));

                //get user statistic
                dispatch(getUserStatisticById(result_1.authorID));

                authRequest.get(`/documents/statistics?docIDs=${result_1.id}`)
                    .then(response_2 => {
                        // authRequest.get(`/documents/actionAvailable?documentIDs=${result_1.id}`).then(response_3 => {

                        console.log({ ...result_1, ...response_2.data[0] });
                        dispatch(get_DocumentByIDSuccess({
                            ...result_1, ...response_2.data[0],
                            //  ...response_3.data[0]
                        })
                            // )}).catch(error => { dispatch(get_DocumentByIDFailure(error)) }
                        ).catch(error => { dispatch(get_DocumentByIDFailure(error)) })
                    }).catch(error => { dispatch(get_DocumentByIDFailure(error)) })
            })
    }
}

export function reportAPost(id, reason) { //
    return dispatch => {
        dispatch(post_ReportADocumentReset())
        authRequest.post(`/documents/${id}/report`, JSON.stringify(reason))
            .then(response => {
                dispatch(post_ReportADocumentSuccess());
            }).catch(() => dispatch(post_ReportADocumentFailure()))
    }
}

export function approveADocument(id) {
    return dispatch => {
        dispatch(post_ApproveADocumentReset());
        authRequest.post(`/documents/${id}/approval`)
            .then(result => {
                dispatch(post_ApproveADocumentSuccess());
            })
            .catch(error => post_ApproveADocumentFailure())
    }
}

export function rejectADocument(id) {
    return dispatch => {
        dispatch(delete_RejectADocumentReset());
        authRequest.delete(`/documents/${id}/approval`)
            .then(result => {
                dispatch(delete_RejectADocumentSuccess());
            })
            .catch(error => delete_RejectADocumentFailure())
    }
}

export function rejectAndFeedbackADocument(id, reason) { //
    return dispatch => {
        dispatch(closeModal());
        openModal("loader", { text: "Đang xử lý" })
        authRequest.post(`/documents/${id}/rejection`, JSON.stringify(reason))
            .then(response => {
                dispatch(closeModal());
                dispatch(post_RejectAndFeedbackADocumentSuccess());
                dispatch(closeModal());
                openBLModal({ text: "Từ chối tài liệu thành công!", type: "success" });

            }).catch((error) => dispatch(post_RejectAndFeedbackADocumentFailure(error)))
    }
}

export function resolveADocument(id, resolveDTO) {
    return dispatch => {
        dispatch(post_ResolveADocumentReset());
        authRequest.post(`/documents/resolveReport/${id}`, JSON.stringify(resolveDTO))
            .then(result => {
                dispatch(post_ResolveADocumentSuccess());
            })
            .catch(error => post_ResolveADocumentFailure())
    }
}

export function deleteADocument(id) { //maybe use modal later
    return dispatch => {
        dispatch(delete_ADocumentReset(id))
        authRequest.delete(`/documents/${id}`).then(response => {
            dispatch(delete_ADocumentSuccess())
            openBLModal({ text: "Xoá tài liệu thành công!", type: "success" });
        }).catch(error => { dispatch(delete_ADocumentFailure(id)) })
    }
}

export function editADocument(id, newDocumentContent, reloadList) { //
    return dispatch => {
        dispatch(put_EditADocumentReset())
        openModal("loader", { text: "Đang xử lý" });
        authRequest.put(`/documents/${id}`, JSON.stringify(newDocumentContent))
            .then(response => {
                dispatch(closeModal());
                openBLModal({ text: "Chỉnh sửa tài liệu thành công!", type: "success" });
                dispatch(put_EditADocumentSuccess(id, newDocumentContent));
            }
            ).catch(() => dispatch(put_EditADocumentFailure()))
    }
}

export function reportADocument(id, reason) { //
    return dispatch => {
        dispatch(post_ReportADocumentReset())
        authRequest.post(`/documents/${id}/report`, JSON.stringify(reason))
            .then(response => {
                dispatch(post_ReportADocumentSuccess());
            }
            ).catch(() => dispatch(post_ReportADocumentFailure()))
    }
}

//
export function getDocumentSubjectsList(searchParamObject) {
    return dispatch => {
        dispatch(get_DocumentSubjectsListRequest());
        authRequest.get(`/subjects?${generateSearchParam(searchParamObject)}`).then(response => {
            dispatch(get_DocumentSubjectsListSuccess(response.data))
        }).catch(error => dispatch(get_DocumentSubjectsListFailure(error)))
    }
}

export function getDCDocumentSubjectsList() {
    return dispatch => {
        dispatch(get_DCDocumentSubjectsListRequest());
        authRequest.get(`/subjects?subjectGroup=1`).then(response => {
            dispatch(get_DCDocumentSubjectsListSuccess(response.data))
        }).catch(error => dispatch(get_DCDocumentSubjectsListFailure(error)))
    }
}

export function getCSNNDocumentSubjectsList() {
    return dispatch => {
        dispatch(get_CSNNDocumentSubjectsListRequest());
        authRequest.get(`/subjects?subjectGroup=2`).then(response => {
            dispatch(get_CSNNDocumentSubjectsListSuccess(response.data))
        }).catch(error => dispatch(get_CSNNDocumentSubjectsListFailure(error)))
    }
}

export function getRelativeDocuments(documentID) {
    return dispatch => {
        dispatch(get_RelativeDocumentsReset());
        authRequest.get(`/documents/related?docID=${documentID}`).then(response => {
            dispatch(get_RelativeDocumentsSuccess(response.data))
        }).catch(error => dispatch(get_RelativeDocumentsFailure(error)))
    }
}

export function getSameSubjectDocuments(documentID, subjectID) {
    return dispatch => {
        dispatch(get_SameSubjectDocumentsReset());
        authRequest.get(`/documents/related?docID=${documentID}&subjectID=${subjectID}`).then(response => {
            dispatch(get_SameSubjectDocumentsSuccess(response.data))
        }).catch(error => dispatch(get_SameSubjectDocumentsFailure(error)))
    }
}

export function getDownloadURL(documentID) {
    return dispatch => {
        dispatch(get_SameSubjectDocumentsReset());
        authRequest.get(`/documents/downloadURL?id=${documentID}`).then(response => {
            openInNewTab(response.data.downloadURL);
            // dispatch(get_SameSubjectDocumentsSuccess(response.data))
        }).catch(error => dispatch(get_SameSubjectDocumentsFailure(error)))
    }
}

//for sorting.
export function getDocumentsByFilter(searchParamObject) { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_DocumentsByFilterRequest());
        authRequest.get(`/documents?${generateSearchParam(searchParamObject)}`).then(
            response_1 => {
                let result_1 = response_1.data;
                let IDarr = '';
                result_1.docSummaryDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi

                //get statistic
                authRequest.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(response_2 => {
                        //merge summary array and statistic array
                        let result_2 = [];
                        for (let i = 0; i < result_1.docSummaryDTOs.length; i++) {
                            result_2.push({
                                ...result_1.docSummaryDTOs[i],
                                ...(response_2.data.find((itmInner) => itmInner.id === result_1.docSummaryDTOs[i].id)),
                            });
                        }

                        dispatch(get_DocumentsByFilterSuccess({
                            docSummaryWithStateDTOs: result_2,
                            totalPages: result_1.totalPages,
                            totalElements: result_1.totalElements
                        }))
                    }).catch((error) => dispatch(get_DocumentsByFilterFailure(error)))
            }).catch((error) => dispatch(get_DocumentsByFilterFailure(error)))
    }
}


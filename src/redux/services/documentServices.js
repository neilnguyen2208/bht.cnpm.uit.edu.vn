import {
    //my documents
    get_MyDocumentsRequest,
    get_MyDocumentsSuccess,
    get_MyDocumentsFailure,

    //my documents
    get_PendingDocumentsRequest,
    get_PendingDocumentsSuccess,
    get_PendingDocumentsFailure,

    //documents list
    get_DocumentsListRequest,
    get_DocumentsListSuccess,
    get_DocumentsListFailure,

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
    get_DocumentByIDSuccess,
    get_DocumentByIDFailure,
} from "redux/actions/documentAction.js";
import FormData from 'form-data';
import { generateSearchParam } from 'utils/urlUtils';
import { openModal, openBLModal, closeModal } from 'redux/actions/modalAction'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'

//upload new document

import { request, multipartRequest } from 'utils/requestUtils'

export function getNotApprovedDocumentsList() {
    return dispatch => {
    }
}

export function management_approveADocument(docID) {
    return dispatch => {

    }
}

export function getDocumentSearch(searchParamObject) { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_DocumentSearchRequest());
        request.get(`/documents?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                // response.data.docDetails.map(item => IDarr += item.id + ",") //tao ra mang id moi
                IDarr = "1,151";
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docDetails.length; i++) {
                            finalResult.push({
                                ...result_1.docDetails[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docDetails[i].id)),
                            }
                            );
                        }

                        dispatch(get_DocumentSearchSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_DocumentSearchFailure())
                // dispatch(get_MyDocumentsSuccess({ docSummaryWithStateDTOs: response.data.docDetails, totalPages: response.data.totalPages, totalElements: response.data.totalElements }))
            })
            .catch(error => {
                dispatch(get_DocumentSearchFailure(error))
            })
    }
}

export function getPendingDocuments(searchParamObject) {
    return dispatch => {
        dispatch(get_PendingDocumentsRequest());
        request.get(`/documents?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                // response.data.docDetails.map(item => IDarr += item.id + ",") //tao ra mang id moi
                IDarr = "1,151";
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docDetails.length; i++) {
                            finalResult.push({
                                ...result_1.docDetails[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docDetails[i].id)),
                            }
                            );
                        }

                        dispatch(get_PendingDocumentsSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_PendingDocumentsFailure())
                // dispatch(get_MyDocumentsSuccess({ docSummaryWithStateDTOs: response.data.docDetails, totalPages: response.data.totalPages, totalElements: response.data.totalElements }))
            })
            .catch(error => {
                dispatch(get_PendingDocumentsFailure(error))
            })
    }
}


export function getReportedDocuments(searchParamObject) {
    return dispatch => {
        dispatch(get_ReportedDocumentsRequest());
        request.get(`/documents?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                // response.data.docDetails.map(item => IDarr += item.id + ",") //tao ra mang id moi
                IDarr = "1,151";
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docDetails.length; i++) {
                            finalResult.push({
                                ...result_1.docDetails[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docDetails[i].id)),
                            }
                            );
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
        request.get(`/documents?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                // response.data.docDetails.map(item => IDarr += item.id + ",") //tao ra mang id moi
                IDarr = "1,151";
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docDetails.length; i++) {
                            finalResult.push({
                                ...result_1.docDetails[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docDetails[i].id)),
                            }
                            );
                        }

                        dispatch(get_MyDocumentsSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_MyDocumentsFailure())
                // dispatch(get_MyDocumentsSuccess({ docSummaryWithStateDTOs: response.data.docDetails, totalPages: response.data.totalPages, totalElements: response.data.totalElements }))
            })
            .catch(error => {
                dispatch(get_MyDocumentsFailure(error))
            })
    }
}

export function uploadADocument(data, files) {
    return dispatch => {
        dispatch(post_UploadDocumentRequest());
        dispatch(openModal("loader", { text: "Đang upload tài liệu ..." }));

        let fileData = new FormData();
        // files.forEach(file => {
        fileData.append('file', files);
        // })
        console.log(fileData);
        console.log(data);

        multipartRequest.post(`/documents/upload`, fileData)
            .then(response => {
                console.log(response)
                data.fileCode = response.data.code; //assign secret code.
                request.post('/documents', JSON.stringify(data)).then(response => {
                    dispatch(post_UploadDocumentSuccess(response));
                    dispatch(closeModal());
                    dispatch(openBLModal({ icon: done_icon, text: "Tài liệu được tạo thành công!" }))
                })
                    .catch(error => {
                        dispatch(post_UploadDocumentFailure(error)); //
                    })
            }
            )
            .catch(error => {
                dispatch(post_UploadDocumentFailure(error)); //
            })



    }
}

export function reactionADocument(docID, reactionType) {
    return dispatch => {
        dispatch(post_ReactionADocumentRequest());
        request.put("/documents/reactions", JSON.stringify({ docID: docID, docReactionType: reactionType }))
            .then(response => {
                dispatch(openBLModal({ icon: done_icon, text: "Cảm ơn bạn đã đưa cảm nhận về tài liệu!" }));
                dispatch(post_ReactionADocumentSuccess(response))
            })
            .catch(error => {
                dispatch(post_ReactionADocumentFailure(error));
            })
    }
}

export function getDocumentByID(id) {
    return dispatch => {
        dispatch(get_DocumentByIDReset())
        // request.get(`/documents/${id}`)
        //     .then(response => {
        //         let _response = response; //response without statistic
        //         request.get(`/documents/statistic?docIDs=${_response.data.id}`)
        //             .then(response => {
        //                 dispatch(get_DocumentByIDSuccess({ ..._response.data, ...response.data[0] }))
        //             })
        //     }
        //     )
        //     .catch(error => { dispatch(get_DocumentByIDFailure(error)) })
    }
}



export function approveADocument(id) {
    return dispatch => {
        dispatch(post_ApproveADocumentReset());
        request.post(`/documents/${id}/approval`)
            .then(result => {
                dispatch(post_ApproveADocumentSuccess());
            })
            .catch(error => post_ApproveADocumentFailure())
    }
}

export function rejectADocument(id) {
    return dispatch => {
        dispatch(delete_RejectADocumentReset());
        request.delete(`/documents/${id}/approval`)
            .then(result => {
                dispatch(delete_RejectADocumentSuccess());
            })
            .catch(error => delete_RejectADocumentFailure())
    }
}

export function rejectAndFeedbackADocument(id, reason) { //
    return dispatch => {
        dispatch(closeModal());
        dispatch(openModal("loader", { text: "Đang xử lý" }))
        request.post(`/documents/${id}/rejection`, JSON.stringify(reason))
            .then(response => {
                dispatch(closeModal());
                //             dispatch(post_RejectAndFeedbackADocumentSuccess());
                dispatch(closeModal());
                dispatch(openBLModal({ text: "Từ chối tài liệu thành công!", icon: done_icon }));

            }
            ).catch(() => {
                // dispatch(post_RejectAndFeedbackADocumentFailure())
            }
            )
    }
}

export function resolveADocument(id, resolveDTO) {
    return dispatch => {
        dispatch(post_ResolveADocumentReset());
        request.post(`/documents/resolveReport/${id}`, JSON.stringify(resolveDTO))
            .then(result => {
                dispatch(post_ResolveADocumentSuccess());
            })
            .catch(error => post_ResolveADocumentFailure())
    }
}


//chua co API cho viec xoa bai post
export function deleteADocument(id) { //maybe use modal later
    return dispatch => {
        dispatch(delete_ADocumentReset(id))
        request.delete(`/posts/${id}`).then(response => {
            dispatch(delete_ADocumentSuccess())
            dispatch(openBLModal({ text: "Xoá tài liệu thành công!", icon: done_icon }))

        }).catch(error => { dispatch(delete_ADocumentFailure(id)) })
    }
}

export function editADocument(id, newDocumentContent, reloadList) { //
    return dispatch => {
        dispatch(put_EditADocumentReset())
        dispatch(openModal("loader", { text: "Đang xử lý" }))
        request.put(`/posts/${id}`, JSON.stringify(newDocumentContent))
            .then(response => {
                dispatch(closeModal());
                dispatch(openBLModal({ text: "Chỉnh sửa tài liệu thành công!", icon: done_icon }));
                dispatch(put_EditADocumentSuccess(id, newDocumentContent));
            }
            ).catch(() => dispatch(put_EditADocumentFailure()))
    }
}

export function reportADocument(id, reason) { //
    return dispatch => {
        dispatch(post_ReportADocumentReset())
        request.post(`/post/${id}/report`, JSON.stringify(reason))
            .then(response => {
                dispatch(post_ReportADocumentSuccess());
            }
            ).catch(() => dispatch(post_ReportADocumentFailure()))
    }
}
import {
    //my documents
    get_MyDocumentsRequest,
    get_MyDocumentsSuccess,
    get_MyDocumentsFailure,

    //documents list
    get_DocumentsListRequest,
    get_DocumentsListSuccess,
    get_DocumentsListFailure,

    //document search result
    get_DocumentSearchResultRequest,
    get_DocumentSearchResultSuccess,
    get_DocumentSearchResultFailure,

    post_UploadDocumentRequest,
    post_UploadDocumentSuccess,
    post_UploadDocumentFailure,
    post_ReactionADocumentRequest,
    post_ReactionADocumentSuccess,
    post_ReactionADocumentFailure,
} from "redux/actions/documentAction.js";
import FormData from 'form-data';
import { generateSearchParam } from 'utils/urlUtils';
import { openModal, openBLModal, closeModal } from 'redux/actions/modalAction'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'

//upload new document

import { request, multipartRequest } from 'utils/requestUtils'
import { responsiveFontSizes } from "@material-ui/core";

export function getDocumentByID(id) {
    return dispatch => {

    }
}

export function getNotApprovedDocumentsList() {
    return dispatch => {
    }
}

export function management_approveADocument(docID) {
    return dispatch => {

    }
}


export function getDocumentsList(page = 1, category = "", searchParam = "") { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_DocumentsListRequest());
        request.get(`https://5fca2bc63c1c220016441d27.mockapi.io/myDocuments`)
            .then(
                result => {
                    dispatch(get_DocumentsListSuccess(JSON.parse(result)));
                }
            )
            .catch(error => {
                dispatch(get_DocumentsListFailure(JSON.parse(error))); //
            })

    }
}

export function getDocumentSearch(searchParamObject) { //this API to get all approved document of a specific user.
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
        let fileData = new FormData();
        // files.forEach(file => {
        fileData.append('file', files);
        // })
        console.log(fileData);
        console.log(data);

        multipartRequest.post(`/documents/upload`, fileData)
            .then(response => {
                // console.log(response)
                // data.code = response.data.code; //assign secret code.
            }
            )
            .catch(error => {
                dispatch(post_UploadDocumentFailure(error)); //
            })


        // request.post('/documents', JSON.stringify(data)).then(response => {
        //     dispatch(post_UploadDocumentSuccess(response));
        //     dispatch(openBLModal())
        // })
        //     .catch(error => {
        //         dispatch(post_UploadDocumentFailure(error)); //
        //     })
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
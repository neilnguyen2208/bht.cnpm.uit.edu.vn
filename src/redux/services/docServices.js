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
} from "redux/actions/docAction.js";
import FormData from 'form-data';
import { openModal, openBLModal, closeModal } from 'redux/actions/modalAction'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'

//upload new document

import { request, multipartRequest } from 'utils/requestUtils'

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

export function getDocumentSearchResult(page = 1, category = "", searchParam = "") { //this API to get all approved document of a specific user.
    return dispatch => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        dispatch(get_DocumentSearchResultRequest());
        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/myDocuments`, requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    dispatch(get_DocumentSearchResultSuccess(JSON.parse(result)));
                    dispatch(openBLModal({ text: "Tạo tài liệu mới thành công!", icon: done_icon }));

                }
            )
            .catch(error => {

                dispatch(get_DocumentSearchResultFailure(JSON.parse(error))); //
            })
    }
}

export function getMyDocuments(page = 1, category = "") { //this API to get all approved document of a specific user.
    return dispatch => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        dispatch(get_MyDocumentsRequest());

        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/myDocuments`, requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    dispatch(get_MyDocumentsSuccess(JSON.parse(result)));
                }
            )
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

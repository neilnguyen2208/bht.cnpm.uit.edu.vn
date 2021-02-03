
import {
    get_QuickSearchResultRequest,
    get_QuickSearchResultSuccess,
    get_QuickSearchResultFailure,
} from "redux/actions/commonAction.js";
import { remoteServiceBaseUrl } from 'utils/httpServices'

export function getQuickSearchResult(searchTerm) {

    return dispatch => {

        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        dispatch(get_QuickSearchResultRequest());

        console.log("request")
        fetch(`${remoteServiceBaseUrl}quicksearch/queries?searchTerm=${searchTerm}`, requestOptions)
            .then(response => response.json())
            .then(result =>
                dispatch(get_QuickSearchResultSuccess(result))
            )
            .catch(error => {
                dispatch(get_QuickSearchResultFailure(error)); //
            })
    }


}

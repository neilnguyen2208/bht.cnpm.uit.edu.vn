
import {
    get_QuickSearchResultRequest,
    get_QuickSearchResultSuccess,
    get_QuickSearchResultFailure,
} from "redux/actions/commonAction.js";
import { request } from 'utils/requestUtils'

export function getQuickSearchResult(query) {
    return dispatch => {
        request.get(`/quicksearch/queries?searchParam=${query}`)
            .then(response => {
                dispatch(get_QuickSearchResultSuccess(response.data))
            })
            .catch(error => {
                dispatch(get_QuickSearchResultFailure()); //
            })
    }
}

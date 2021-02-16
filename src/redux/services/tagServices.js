
import {
  get_TagSearchResultRequest,
  get_TagSearchResultSuccess,
  get_TagSearchResultFailure,
  get_tagQuickQueryResultRequest,
  get_tagQuickQueryResultSuccess,
  get_tagQuickQueryResultFailure

} from '../actions/tagAction.js'
import { request } from 'utils/requestUtils'
export function getTagSearchResult(searchTerm = "") {
  return dispatch => {
    dispatch(get_TagSearchResultRequest());
    request.get(`https://5fe871c82e12ee0017ab46ef.mockapi.io/tags`)
      .then(response => {
        dispatch(get_TagSearchResultSuccess(response.data))
      })
      .catch(dispatch(get_tagQuickQueryResultFailure()))
  }
}

export function getTagQuickQueryResult(searchTerm = "") {
  return dispatch => {

    //tao ra timeout va huy timeout cho moi lan go o day.
    request.get(`/tags/quickQuery?query=${searchTerm}`).then(response => {
      dispatch(get_tagQuickQueryResultSuccess(response.data))
    })
      .catch(dispatch(get_tagQuickQueryResultFailure()))
  }
}


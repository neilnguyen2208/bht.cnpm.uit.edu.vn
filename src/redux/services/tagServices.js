
import {
  get_TagSearchResultRequest,
  get_TagSearchResultSuccess,
  get_TagSearchResultFailure,

  get_tagQuickQueryResultRequest,
  get_tagQuickQueryResultSuccess,
  get_tagQuickQueryResultFailure

} from '../actions/tagAction.js'
import { remoteServiceBaseUrl } from 'utils/httpServices'

export function getTagSearchResult(searchTerm = "") {
  return dispatch => {
    dispatch(get_TagSearchResultRequest());

    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://5fe871c82e12ee0017ab46ef.mockapi.io/tags`, requestOptions)
      .then(response => response.text())
      .then(
        result => {
          dispatch(get_TagSearchResultSuccess(JSON.parse(result)));
        }
      )
      .catch(error => {
        
        dispatch(get_TagSearchResultFailure(JSON.parse(error))); //
      })
  }
}

export function getTagQuickQueryResult(searchTerm = "") {
  return dispatch => {
    dispatch(get_tagQuickQueryResultRequest());

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${remoteServiceBaseUrl}/tags/quickQuery?query=${searchTerm}`, requestOptions)
      .then(response => response.json())
      .then(
        result => {
          dispatch(get_tagQuickQueryResultSuccess(result));
        }
      )
      .catch(error => {
     
        dispatch(get_tagQuickQueryResultFailure(error)); //
      })
  }
}


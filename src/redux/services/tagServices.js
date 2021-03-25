
import {
  get_TagSearchResultRequest,
  get_TagSearchResultSuccess,
  get_tagQuickQueryResultSuccess,
  get_tagQuickQueryResultFailure,

  get_TagByIDRequest,
  get_TagByIDSuccess,
  get_TagByIDFailure,

  get_RelativeTagsRequest,
  get_RelativeTagsSuccess,
  get_RelativeTagsFailure

} from '../actions/tagAction.js'
import { request } from 'utils/requestUtils'
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'

export function getTagSearchResult(searchParam = "") {
  return dispatch => {
    dispatch(get_TagSearchResultRequest());
    request.get(`https://5fe871c82e12ee0017ab46ef.mockapi.io/tags`)
      .then(response => {
        dispatch(get_TagSearchResultSuccess(response.data))
      })
      .catch(dispatch(get_tagQuickQueryResultFailure()))
  }
}

export function getTagQuickQueryResult(searchParam = "") {
  return dispatch => {

    //tao ra timeout va huy timeout cho moi lan go o day.
    request.get(`/tags/quickQuery?query=${searchParam}`).then(response => {
      dispatch(get_tagQuickQueryResultSuccess(response.data))
    })
      .catch(dispatch(get_tagQuickQueryResultFailure()))
  }
}

export function getTagByID(id) {
  return dispatch => {
    dispatch(get_TagByIDRequest());
    //tao ra timeout va huy timeout cho moi lan go o day.
    request.get(`/tags/${id}`).then(response => {
      dispatch(get_TagByIDSuccess(response.data));
      if (!response.data) {
        setQueryParam({ tag: 1, page: 1 });
        getTagByID(getQueryParamByName('tag'));
      }
    })
      .catch(dispatch(get_TagByIDFailure()));
  }
}

export function getRelativeTags(id) {
  return dispatch => {
    dispatch(get_RelativeTagsRequest());
    //tao ra timeout va huy timeout cho moi lan go o day.
    request.get(`/tags/relatedTags?tagID=${id}`).then(response => {
      dispatch(get_RelativeTagsSuccess(response.data))
      // if (!response.data) {
      //   setQueryParam({ tag: 1, page: 1 });
      //   getTagByID(getRelativeTags('tag'));
      // }
    })
      .catch(dispatch(get_RelativeTagsFailure()));
  }
}


import { authRequest } from 'utils/requestUtils';
import {
  get_CurrentUserSummaryFailure,
  get_CurrentUserSummaryReset,
  get_CurrentUserSummarySuccess
} from '../actions/authAction';

export function getCurrentUserSummary() {
  return dispatch => {
    dispatch(get_CurrentUserSummaryReset());
    authRequest.get(`/user/summary`)
      .then(response => {
        dispatch(get_CurrentUserSummarySuccess(response.data));
      }).catch(error => {
        dispatch(get_CurrentUserSummaryFailure());
      })
  }
}


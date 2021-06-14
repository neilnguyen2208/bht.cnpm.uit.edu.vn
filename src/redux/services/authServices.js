import { authRequest } from 'utils/requestUtils';
import {
  get_CurrentUserSummaryFailure,
  get_CurrentUserSummaryReset,
  get_CurrentUserSummarySuccess,
  get_UserStatisticByIdFailure,
  get_UserStatisticByIdReset,
  get_UserStatisticByIdSuccess
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

export function getUserStatisticById(userId) {
  return dispatch => {
    dispatch(get_UserStatisticByIdReset())
    authRequest.get(`/user/${userId}​/statistics`)
      .then(response => {
        dispatch(get_UserStatisticByIdSuccess(response.data))
      }).catch(error => {
        dispatch(get_UserStatisticByIdFailure());
      })
  }
}

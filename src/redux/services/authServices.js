import { authRequest } from 'utils/requestUtils';
import {
  get_CurrentUserSummaryFailure,
  get_CurrentUserSummaryReset,
  get_CurrentUserSummarySuccess,
  get_UserDetailByIdFailure,
  get_UserDetailByIdRequest,
  get_UserDetailByIdSuccess,
  get_UserDetailByTokenFailure,
  get_UserDetailByTokenRequest,
  get_UserDetailByTokenSuccess,
  get_UserStatisticByIdFailure,
  get_UserStatisticByIdReset,
  get_UserStatisticByIdSuccess,
  update_UserDetailByTokenFailure,
  update_UserDetailByTokenReset,
  update_UserDetailByTokenSuccess
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
    authRequest.get(`/user/${userId}/statistics`)
      .then(response => {
        dispatch(get_UserStatisticByIdSuccess(response.data))
      }).catch(error => {
        dispatch(get_UserStatisticByIdFailure());
      })
  }
}

export function getUserDetailById(userId) {
  return dispatch => {
    dispatch(get_UserDetailByIdRequest())
    authRequest.get(`/user/${userId}`)
      .then(response => {
        dispatch(get_UserDetailByIdSuccess(response.data))
      }).catch(error => {
        dispatch(get_UserDetailByIdFailure());
      })
  }
}

export function getUserDetailByToken() {
  return dispatch => {
    dispatch(get_UserDetailByTokenRequest())
    authRequest.get(`/user/details`)
      .then(response => {
        dispatch(get_UserDetailByTokenSuccess(response.data))
      }).catch(error => {
        dispatch(get_UserDetailByTokenFailure(error));
      })
  }
}

export function updateUserDetailByToken(data) {
  return dispatch => {
    dispatch(update_UserDetailByTokenReset())
    authRequest.put(`/user/details`, JSON.stringify(data))
      .then(response => {
        dispatch(update_UserDetailByTokenSuccess(response.data))
      }).catch(error => {
        dispatch(update_UserDetailByTokenFailure(error));
      })
  }
}

export function getAccountManagementAvailableActions(userId){
  
}
import { authRequest } from 'utils/requestUtils';
import {
  get_CurrentUserSummaryRequest
} from '../actions/authAction';

export function login() {
  return dispatch => {
    dispatch(get_CurrentUserSummaryRequest());
    authRequest.get()
  }
}


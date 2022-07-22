import { GET_USERS } from './constants';
import * as api from '../API/users-api';

// get users from api, if offset is not 0 concat with existing users
export const getUsers = (offset) => async (dispatch, getState) => {
  let res = await api.getUsers(6, offset);
  if (offset != 0) {
    res = { ...res, users: [...getState().users, ...res.users] };
  }
  dispatch({
    type: GET_USERS,
    payload: res
  });

}

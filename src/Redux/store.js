import { configureStore } from '@reduxjs/toolkit';
import { GET_USERS } from './constants';

const initState = {
  users: [],
  totalUsers: 0
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users: action.payload.users,
        totalUsers: action.payload.totalUsers
      }
    }
    default: return state;
  }
}

const store = configureStore({ reducer: rootReducer });

export default store;

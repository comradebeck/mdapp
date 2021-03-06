import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.accounts, action) {
  switch (action.type) {
    case types.GET_ACCOUNT_LIST_SUCCESS:
      return Object.assign({}, state, action.payload);

    case types.CLEAR_ACCOUNT_LIST:
      state = {};
      return state;

    case types.CREATE_USER_ACCOUNT_MESSAGE:
      let newState = Object.assign({}, state);
      newState.message = action.payload;
      state = newState;
      return state;

    case types.CREATE_USER_ACCOUNT_CLEAR_MESSAGE:
      let _newState = Object.assign({}, state);
      _newState.message = {};
      state = _newState;
      return state;

    case types.GET_ACCOUNT_DETAILS_SUCCESS:
      let accountState = Object.assign({}, state);
      accountState.details = action.payload;
      state = accountState;
      return state;

    case types.CLEAR_ACCOUNT_DETAILS:
      let _accountState = Object.assign({}, state);
      _accountState.details = {};
      state = _accountState;
      return state;

    default:
      return state;
  }
}

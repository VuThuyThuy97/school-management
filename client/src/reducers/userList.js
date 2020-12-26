import {
  LOAD_USER_LIST,
  LOAD_USER_LIST_SUCCESS,
  LOAD_USER_LIST_FAIL,
  HIDE_ALL_USER_MODAL,
  OPEN_EDIT_USER_MODAL,
  OPEN_CREATE_USER_MODAL,
  EDIT_USER_FAIL,
  CREATE_NEW_USER_FAIL

} from '../utils/constants';

export default (state = Object.assign({}), action) => {
  switch (action.type) {
    case (LOAD_USER_LIST):
      return Object.assign({}, state, {
        message: null,
        error: null
      });
    case (LOAD_USER_LIST_SUCCESS):
      return Object.assign({}, state, {
        message: null,
        userList: action.data,
        error: null
      });
    case (LOAD_USER_LIST_FAIL):
      return Object.assign({}, state, {
        message: null,
        error: action.data
      });
    case (EDIT_USER_FAIL):
      return Object.assign({}, state, {
        message: null,
        error: action.data
      });
    case (CREATE_NEW_USER_FAIL):
      return Object.assign({}, state, {
        message: null,
        error: action.data
      });
    case (HIDE_ALL_USER_MODAL):
      return Object.assign({}, state, {
        message: null,
        error: null,
        showCreateUserModal: false,
        showEditUserModal: false,
      });
    case (OPEN_EDIT_USER_MODAL):
      return Object.assign({}, state, {
        message: null,
        error: null,
        showCreateUserModal: false,
        showEditUserModal: true,
      });
    case (OPEN_CREATE_USER_MODAL):
      return Object.assign({}, state, {
        message: null,
        error: null,
        showCreateUserModal: true,
        showEditUserModal: false,
      });
    default:
      return state;
  }
};

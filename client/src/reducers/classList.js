import {
  LOAD_CLASS_LIST,
  LOAD_CLASS_LIST_SUCCESS,
  LOAD_CLASS_LIST_FAIL,
  HIDE_ALL_CLASS_MODAL,
  CREATE_NEW_CLASS_FAIL,
  EDIT_CLASS_FAIL,
  OPEN_EDIT_CLASS_MODAL,
  OPEN_CREATE_CLASS_MODAL

} from '../utils/constants';

export default (state = Object.assign({}), action) => {
  switch (action.type) {
    case (LOAD_CLASS_LIST):
      return Object.assign({}, state, {
        message: null,
        error: null
      });
    case (LOAD_CLASS_LIST_SUCCESS):
      return Object.assign({}, state, {
        message: null,
        classList: action.data,
        error: null
      });
    case (LOAD_CLASS_LIST_FAIL):
      return Object.assign({}, state, {
        message: null,
        error: action.data
      });
      case (EDIT_CLASS_FAIL):
        return Object.assign({}, state, {
          message: null,
          error: action.data
        });
      case (CREATE_NEW_CLASS_FAIL):
        return Object.assign({}, state, {
          message: null,
          error: action.data
        });
      case (HIDE_ALL_CLASS_MODAL):
        return Object.assign({}, state, {
          message: null,
          error: null,
          showCreateClassModal: false,
          showEditClassModal: false,
        });
      case (OPEN_EDIT_CLASS_MODAL):
        return Object.assign({}, state, {
          message: null,
          error: null,
          showCreateClassModal: false,
          showEditClassModal: true,
        });
      case (OPEN_CREATE_CLASS_MODAL):
        return Object.assign({}, state, {
          message: null,
          error: null,
          showCreateClassModal: true,
          showEditClassModal: false,
        });
    default:
      return state;
  }
};

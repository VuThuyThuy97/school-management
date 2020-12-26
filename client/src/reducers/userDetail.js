import {
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL
} from '../utils/constants';

export default (state = Object.assign({}), action) => {
  switch (action.type) {
    case (UPDATE_USER_INFO):
      return Object.assign({}, state, {
        message: null,
        error: null
      });
    case (UPDATE_USER_INFO_SUCCESS):
      return Object.assign({}, state, {
        message: null,
        userDetail: { ... action.data, showEditUserModal: false, showCreateUserModal: false },
        error: null
      });
    case (UPDATE_USER_INFO_FAIL):
      return Object.assign({}, state, {
        message: null,
        error: action.data
      });
    default:
      return state;
  }
};

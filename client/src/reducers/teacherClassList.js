import {
  GET_ALL_CLASS_BY_USER,
  GET_ALL_CLASS_BY_USER_SUCCESS,
  GET_ALL_CLASS_BY_USER_FAIL
} from '../utils/constants';

export default (state = Object.assign({}), action) => {
  switch (action.type) {
    case (GET_ALL_CLASS_BY_USER):
      return Object.assign({}, state, {
        message: null,
        error: null
      });
    case (GET_ALL_CLASS_BY_USER_SUCCESS):
      return Object.assign({}, state, {
        message: null,
        teacherClassList: action.data,
        error: null
      });
    case (GET_ALL_CLASS_BY_USER_FAIL):
      return Object.assign({}, state, {
        message: null,
        error: action.data
      });
    default:
      return state;
  }
};

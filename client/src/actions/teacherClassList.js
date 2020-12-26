import {
  GET_ALL_CLASS_BY_USER,
  GET_ALL_CLASS_BY_USER_SUCCESS,
  GET_ALL_CLASS_BY_USER_FAIL
} from '../utils/constants';

export const getAllClassByUser = () => {
  return { type: GET_ALL_CLASS_BY_USER };
};

export const getAllClassByUserSuccess = (message) => {
  return { type: GET_ALL_CLASS_BY_USER_SUCCESS, data: message };
};

export const getAllClassByUserFailed = (error) => {
  return { type: GET_ALL_CLASS_BY_USER_FAIL, data: error };
};
import {
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL
} from '../utils/constants';

export const updateUserInfo = () => {
  return { type: UPDATE_USER_INFO };
};

export const updateUserInfoSuccess = (message) => {
  return { type: UPDATE_USER_INFO_SUCCESS, data: message };
};

export const updateUserInfoFailed = (error) => {
  return { type: UPDATE_USER_INFO_FAIL, data: error };
};
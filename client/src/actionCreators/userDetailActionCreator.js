import api from '../utils/api';
import * as userDetail from '../actions/userDetail';
import * as authActionCreator from './authActionCreator';
import History from '../utils/history'

export const updateUserInfo = (userId, info) => {
  return (dispatch) => {
    dispatch(userDetail.updateUserInfo());
    api.editUser(userId, info)
      .then((response, err) => {
        if (response.error) {
          dispatch(userDetail.updateUserInfoFailed(response.error));
        } else {
          authActionCreator.getUserInfo()(dispatch);
          History.push('/classes');
        }
      }).catch(err => { 
        dispatch(userDetail.updateUserInfoFailed(err.message))
      } );
  };
};

export default { updateUserInfo };
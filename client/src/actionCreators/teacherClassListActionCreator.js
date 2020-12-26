import api from '../utils/api';
import * as teacherClassList from '../actions/teacherClassList.js';

export const getAllClassByUser = () => {
  return (dispatch) => {
    dispatch(teacherClassList.getAllClassByUser());
    api.getAllClassByUser()
      .then((response) => {
        if (response.error) {
          dispatch(teacherClassList.getAllClassByUserFailed(response.error));
        } else {
          dispatch(teacherClassList.getAllClassByUserSuccess(response));
        }
      });
  };
};

export default { getAllClassByUser };
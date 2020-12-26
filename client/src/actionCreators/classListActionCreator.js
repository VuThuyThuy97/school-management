import api from '../utils/api';
import * as classList from '../actions/classList';

export const getClassList = () => {
  return (dispatch) => {
    dispatch(classList.getClassList());
    api.getClassList()
      .then((response) => {
        if (response.error) {
          dispatch(classList.getClassListFailed(response.error));
        } else {
          dispatch(classList.getClassListSuccess(response));
        }
      });
  };
};

export const editClass = (classId, info) => {
  return (dispatch) => {
    api.editClass(classId, info)
      .then((response) => {
        if (response.error) {
          dispatch(classList.editClassFailed(response.error));
        } else {
          dispatch(classList.hideAllClassModal());
          getClassList()(dispatch);
        }
      });
  };
};

export const createNewClass = (info) => {
  return (dispatch) => {
    api.createNewClass(info)
      .then((response) => {
        if (response.error) {
          dispatch(classList.createNewClassFailed(response.error));
        } else {
          dispatch(classList.hideAllClassModal());
          getClassList()(dispatch);
        }
      });
  };
};

export const deleteClass = (classId) => {
  return (dispatch) => {
    api.deleteClass(classId)
      .then((response) => {
        if (response.error) {
          dispatch(classList.deleteClassFailed(response.error));
        } else {
          getClassList()(dispatch);
        }
      });
  };
};

export const openCreateClassModal = () => {
  return (dispatch) => {
    dispatch(classList.openCreateClassModal());
  };
};

export const openEditClassModal = () => {
  return (dispatch) => {
    dispatch(classList.openEditClassModal());
  };
};

export const hideAllClassModal = () => {
  return (dispatch) => {
    dispatch(classList.hideAllClassModal());
  };
};

export default { getClassList, editClass, createNewClass, openCreateClassModal, openEditClassModal, hideAllClassModal };
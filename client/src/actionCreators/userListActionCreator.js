import api from '../utils/api';
import * as userList from '../actions/userList';

export const getUserList = () => {
  return (dispatch) => {
    dispatch(userList.getUserList());
    api.getUserList()
      .then((response) => {
        if (response.error) {
          dispatch(userList.getUserListFailed(response.error));
        } else {
          dispatch(userList.getUserListSuccess(response));
        }
      });
  };
};

export const editUser = (userId, info) => {
  return (dispatch) => {
    api.editUser(userId, info)
      .then((response) => {
        if (response.error) {
          dispatch(userList.editUserFailed(response.error));
        } else {
          dispatch(userList.hideAllUserModal());
          getUserList()(dispatch);
        }
      });
  };
};

export const createNewUser = (info) => {
  return (dispatch) => {
    api.createNewUser(info)
      .then((response) => {
        if (response.error) {
          dispatch(userList.createNewUserFailed(response.error));
        } else {
          dispatch(userList.hideAllUserModal());
          getUserList()(dispatch);
        }
      });
  };
};

export const deleteUser = (userId) => {
  return (dispatch) => {
    api.deleteUser(userId)
      .then((response) => {
        if (response.error) {
          dispatch(userList.deleteUserFailed(response.error));
        } else {
          getUserList()(dispatch);
        }
      });
  };
};

export const openCreateUserModal = () => {
  return (dispatch) => {
    dispatch(userList.openCreateUserModal());
  };
};

export const openEditUserModal = () => {
  return (dispatch) => {
    dispatch(userList.openEditUserModal());
  };
};

export const hideAllUserModal = () => {
  return (dispatch) => {
    dispatch(userList.hideAllUserModal());
  };
};

export default { getUserList, editUser, createNewUser, deleteUser, openCreateUserModal, openEditUserModal, hideAllUserModal };
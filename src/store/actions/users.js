import * as types from "../action-types";
import { addDoc, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { db, collection, getDocs } from "../../config/firebase.js"
import { notification, } from 'antd';

const userCollection = collection(db, 'users');


export const addUser = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_USER_LOADING,
    loading: { userModal: true }
  });

  addDoc(collection(db, "users"), payload).then(response => {
    dispatch({
      type: types.ADD_USER,
      response: { ...payload, id: response.id },
    });
    notification.success({ message: 'Record Add Successfully!' })
    callback && callback()
  }).catch(error => {
    notification.error({ message: 'Something went wrong, try again later!' })
    callback && callback(false)
    console.log(error);
  })
};

export const editUser = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_USER_LOADING,
    loading: { userModal: true }
  });

  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  const id = payload.id;
  delete payload.id;

  setDoc(doc(db, "users", id), payload).then(response => {
    dispatch({
      type: types.EDIT_USER,
      response: { ...payload, id },
    });
    notification.success({ message: 'Record Updated Successfully!' })
    callback && callback()
  }).catch(error => {
    callback && callback(false)
    notification.error({ message: 'Something went wrong, try again later!' })
    console.log(error);
  })
};

export const deleteUser = (id, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_USER_LOADING,
    loading: { userModal: true }
  });

  deleteDoc(doc(db, "users", id)).then(response => {
    dispatch({
      type: types.DELETE_USER,
      id,
    });
    notification.success({ message: 'Record Deleted Successfully!' })
    callback && callback()
  }).catch(error => {
    callback && callback(false)
    notification.error({ message: 'Something went wrong, try again later!' })
    console.log(error);
  })
};


export const getUsersList = () => async (dispatch) => {

  try {
    dispatch({
      type: types.TOGGLE_USER_LOADING,
      loading: { listing: true }
    });

    const userDocs = await getDocs(userCollection);
    const usersList = userDocs.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    });

    dispatch({
      type: types.GET_USER_LIST,
      response: usersList
    });

  } catch (error) {
    console.log(error, 'error');
    notification.error({ message: 'Something went wrong, try again later!' })
  }

};
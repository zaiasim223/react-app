import * as types from "../action-types";
import { addDoc, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { db, collection, getDocs } from "../../config/firebase.js"
import { notification, } from 'antd';

const bookCollection = collection(db, 'books');


export const addBook = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_BOOK_LOADING,
    loading: { bookModal: true }
  });

  addDoc(collection(db, "books"), payload).then(response => {
    dispatch({
      type: types.ADD_BOOK,
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

export const editBook = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_BOOK_LOADING,
    loading: { bookModal: true }
  });

  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  const id = payload.id;
  delete payload.id;

  console.log(payload, 'values of te ');
  setDoc(doc(db, "books", id), payload).then(response => {
    dispatch({
      type: types.EDIT_BOOK,
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

export const deleteBook = (id, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_BOOK_LOADING,
    loading: { bookModal: true }
  });

  deleteDoc(doc(db, "books", id)).then(response => {
    dispatch({
      type: types.DELETE_BOOK,
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


export const getBooksList = () => async (dispatch) => {

  try {
    dispatch({
      type: types.TOGGLE_BOOK_LOADING,
      loading: { listing: true }
    });

    const bookDocs = await getDocs(bookCollection);
    const booksList = bookDocs.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    });

    dispatch({
      type: types.GET_BOOK_LIST,
      response: booksList
    });

  } catch (error) {
    console.log(error, 'error');
    notification.error({ message: 'Something went wrong, try again later!' })
  }

};
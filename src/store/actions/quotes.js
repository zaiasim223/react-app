import * as types from "../action-types";
import { addDoc, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { db, collection, getDocs } from "../../config/firebase.js"
import { notification, } from 'antd';

const quoteCollection = collection(db, 'quotes');


export const addQuote = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_QUOTE_LOADING,
    loading: { quoteModal: true }
  });

  addDoc(collection(db, "quotes"), payload).then(response => {
    dispatch({
      type: types.ADD_QUOTE,
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

export const editQuote = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_QUOTE_LOADING,
    loading: { quoteModal: true }
  });

  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  const id = payload.id;
  delete payload.id;

  setDoc(doc(db, "quotes", id), payload).then(response => {
    dispatch({
      type: types.EDIT_QUOTE,
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

export const deleteQuote = (id, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_QUOTE_LOADING,
    loading: { quoteModal: true }
  });

  deleteDoc(doc(db, "quotes", id)).then(response => {
    dispatch({
      type: types.DELETE_QUOTE,
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


export const getQuotesList = () => async (dispatch) => {

  try {
    dispatch({
      type: types.TOGGLE_QUOTE_LOADING,
      loading: { listing: true }
    });

    const quoteDocs = await getDocs(quoteCollection);
    const quotesList = quoteDocs.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    });

    dispatch({
      type: types.GET_QUOTE_LIST,
      response: quotesList
    });

  } catch (error) {
    console.log(error, 'error');
    notification.error({ message: 'Something went wrong, try again later!' })
  }

};
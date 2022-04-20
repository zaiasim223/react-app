import * as types from "../action-types";
import { addDoc, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { db, collection, getDocs } from "../../config/firebase.js"
import { notification, } from 'antd';

const newsCollection = collection(db, 'news');


export const addNews = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_NEWS_LOADING,
    loading: { newsModal: true }
  });

  addDoc(collection(db, "news"), payload).then(response => {
    dispatch({
      type: types.ADD_NEWS,
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

export const editNews = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_NEWS_LOADING,
    loading: { newsModal: true }
  });

  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  const id = payload.id;
  delete payload.id;

  setDoc(doc(db, "news", id), payload).then(response => {
    dispatch({
      type: types.EDIT_NEWS,
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

export const deleteNews = (id, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_NEWS_LOADING,
    loading: { newsModal: true }
  });

  deleteDoc(doc(db, "news", id)).then(response => {
    dispatch({
      type: types.DELETE_NEWS,
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


export const getNewsList = () => async (dispatch) => {

  try {
    dispatch({
      type: types.TOGGLE_NEWS_LOADING,
      loading: { listing: true }
    });

    const newsDocs = await getDocs(newsCollection);
    const newsList = newsDocs.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    });

    dispatch({
      type: types.GET_NEWS_LIST,
      response: newsList
    });

  } catch (error) {
    console.log(error, 'error');
    notification.error({ message: 'Something went wrong, try again later!' })
  }

};
import * as types from "../action-types";
import { addDoc, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { db, collection, getDocs } from "../../config/firebase.js"
import { notification, } from 'antd';

const movieCollection = collection(db, 'movies');


export const addMovie = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_MOVIE_LOADING,
    loading: { movieModal: true }
  });

  addDoc(collection(db, "movies"), payload).then(response => {
    dispatch({
      type: types.ADD_MOVIE,
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

export const editMovie = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_MOVIE_LOADING,
    loading: { movieModal: true }
  });

  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  const id = payload.id;
  delete payload.id;

  console.log(payload, 'values of te ');
  setDoc(doc(db, "movies", id), payload).then(response => {
    dispatch({
      type: types.EDIT_MOVIE,
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

export const deleteMovie = (id, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_MOVIE_LOADING,
    loading: { movieModal: true }
  });

  deleteDoc(doc(db, "movies", id)).then(response => {
    dispatch({
      type: types.DELETE_MOVIE,
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


export const getMoviesList = () => async (dispatch) => {

  try {
    dispatch({
      type: types.TOGGLE_MOVIE_LOADING,
      loading: { listing: true }
    });

    const movieDocs = await getDocs(movieCollection);
    const moviesList = movieDocs.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    });

    dispatch({
      type: types.GET_MOVIE_LIST,
      response: moviesList
    });

  } catch (error) {
    console.log(error, 'error');
    notification.error({ message: 'Something went wrong, try again later!' })
  }

};
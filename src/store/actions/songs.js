import * as types from "../action-types";
import { addDoc, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { db, collection, getDocs } from "../../config/firebase.js"
import { notification, } from 'antd';

const songCollection = collection(db, 'songs');


export const addSong = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_SONG_LOADING,
    loading: { songModal: true }
  });

  addDoc(collection(db, "songs"), payload).then(response => {
    dispatch({
      type: types.ADD_SONG,
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

export const editSong = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_SONG_LOADING,
    loading: { songModal: true }
  });

  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  const id = payload.id;
  delete payload.id;

  console.log(payload, 'values of te ');
  setDoc(doc(db, "songs", id), payload).then(response => {
    dispatch({
      type: types.EDIT_SONG,
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

export const deleteSong = (id, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_SONG_LOADING,
    loading: { songModal: true }
  });

  deleteDoc(doc(db, "songs", id)).then(response => {
    dispatch({
      type: types.DELETE_SONG,
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


export const getSongsList = () => async (dispatch) => {

  try {
    dispatch({
      type: types.TOGGLE_SONG_LOADING,
      loading: { listing: true }
    });

    const songDocs = await getDocs(songCollection);
    const songsList = songDocs.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    });

    dispatch({
      type: types.GET_SONG_LIST,
      response: songsList
    });

  } catch (error) {
    console.log(error, 'error');
    notification.error({ message: 'Something went wrong, try again later!' })
  }

};
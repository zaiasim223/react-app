import * as types from "../action-types";
import { addDoc, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { db, collection, getDocs } from "../../config/firebase.js"
import { notification, } from 'antd';

const rewardCollection = collection(db, 'rewards');


export const addReward = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_REWARD_LOADING,
    loading: { rewardModal: true }
  });

  payload.claimed_by=[]

  addDoc(collection(db, "rewards"), payload).then(response => {
    dispatch({
      type: types.ADD_REWARD,
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

export const editReward = (payload, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_REWARD_LOADING,
    loading: { rewardModal: true }
  });

  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  const id = payload.id;
  delete payload.id;

  setDoc(doc(db, "rewards", id), payload).then(response => {
    dispatch({
      type: types.EDIT_REWARD,
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

export const deleteReward = (id, callback) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_REWARD_LOADING,
    loading: { rewardModal: true }
  });

  deleteDoc(doc(db, "rewards", id)).then(response => {
    dispatch({
      type: types.DELETE_REWARD,
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


export const getRewardsList = () => async (dispatch) => {

  try {
    dispatch({
      type: types.TOGGLE_REWARD_LOADING,
      loading: { listing: true }
    });

    const rewardDocs = await getDocs(rewardCollection);
    const rewardsList = rewardDocs.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    });

    dispatch({
      type: types.GET_REWARD_LIST,
      response: rewardsList
    });

  } catch (error) {
    console.log(error, 'error');
    notification.error({ message: 'Something went wrong, try again later!' })
  }

};
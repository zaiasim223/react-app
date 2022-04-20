import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
var firebaseConfig = {
  apiKey: "AIzaSyBG78N2CA0cj7-Mr293Y6DT2Qh8XH-2ysk",
  authDomain: "innercity-3a92d.firebaseapp.com",
  databaseURL: "https://innercity-3a92d-default-rtdb.firebaseio.com",
  projectId: "innercity-3a92d",
  storageBucket: "innercity-3a92d.appspot.com",
  messagingSenderId: "489819368551",
  appId: "1:489819368551:web:a03b7bba1376e6b09ff8c2",
  measurementId: "G-XN5DNGCJF5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const db = firebase.firestore();
// const auth = firebase.auth();

export { db, collection, getDocs };
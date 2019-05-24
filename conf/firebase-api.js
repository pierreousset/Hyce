import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkYYqau2JlUUdLKvLc_9G3XCzlaY4_wlw",
  authDomain: "hyce-234514.firebaseapp.com",
  databaseURL: "https://hyce-234514.firebaseio.com",
  storageBucket: "hyce-234514.appspot.com",
  messagingSenderId: "82693289710",
  appId: "1:82693289710:web:b048f9526d85f4cf",
  projectId: "hyce-234514"
};

export default firebase.initializeApp(firebaseConfig);


export const db = firebase.database();
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkTaHgO9bmSySQ9IR7Iq5YdMGxeMqc5B8",
  authDomain: "final-project-8d1d3.firebaseapp.com",
  projectId: "final-project-8d1d3",
  storageBucket: "final-project-8d1d3.appspot.com",
  messagingSenderId: "481886256211",
  appId: "1:481886256211:web:0fe79ef32bb9bd3f9d5aa6",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default firebase;
export { storage };

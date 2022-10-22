import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoFX9i5y-tEctFjGL8cYdTPmlCQUEqPm8",
  authDomain: "netflix-91f4e.firebaseapp.com",
  projectId: "netflix-91f4e",
  storageBucket: "netflix-91f4e.appspot.com",
  messagingSenderId: "668574008977",
  appId: "1:668574008977:web:ce2e2b724b3cc5ee6be130",
};

// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

// const auth = getAuth(firebaseApp);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };

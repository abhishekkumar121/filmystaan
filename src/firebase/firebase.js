import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore';
// import * as firebase from "./firebase"

const firebaseConfig = {
  apiKey: "AIzaSyD0RiT1mkGpt5ASVVF-CmpMfhKQgAosutI",
  authDomain: "filmystaan-5066c.firebaseapp.com",
  projectId: "filmystaan-5066c",
  storageBucket: "filmystaan-5066c.appspot.com",
  messagingSenderId: "558229125333",
  appId: "1:558229125333:web:66e2cfe067bd9f3a530a5c"
};

// Initialize Firebase
const app =initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef=collection(db,"movies")
//here my database name is "movies " , so I am accessing it and giving reference name.
export const reviewsRef =collection(db,"reviews")
export const usersRef =collection(db,"users")



export default app;

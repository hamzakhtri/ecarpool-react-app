import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZQCCLxkLODfJdUoS0MeGZZcn1f6uNvHs",
  authDomain: "e-carpool-71cc9.firebaseapp.com",
  projectId: "e-carpool-71cc9",
  storageBucket: "e-carpool-71cc9.appspot.com",
  messagingSenderId: "361063637997",
  appId: "1:361063637997:web:3a6a6831e18c9e9261fde4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


export {auth, db, storage};
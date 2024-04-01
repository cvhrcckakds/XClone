// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
//!1
import {getAuth, GoogleAuthProvider} from "firebase/auth" //hesaba google ve mail ile giriş yapabilmeyi aktifleştir

//!2
import {getFirestore} from "firebase/firestore"

//!3 
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkqHsh3aol5kJTzD3NNuk1wPlXIeb4Bsg",
  authDomain: "xclone-c2bae.firebaseapp.com",
  projectId: "xclone-c2bae",
  storageBucket: "xclone-c2bae.appspot.com",
  messagingSenderId: "87366123074",
  appId: "1:87366123074:web:a91c2423bba552847df7db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//!1 auth yapısının referansını alma
export const auth=getAuth(app);

//!1 google sağlayıcısının refransını alma
export const provider = new GoogleAuthProvider()

//!2 veri tabanı referansını al
export const db=getFirestore(app)

//!3 storage referansı al
export const storage = getStorage(app);
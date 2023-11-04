// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrn9H749YaQgzYRNR-ZPlZIRCLQVJtCng",
  authDomain: "rajeshgpt-5cda3.firebaseapp.com",
  projectId: "rajeshgpt-5cda3",
  storageBucket: "rajeshgpt-5cda3.appspot.com",
  messagingSenderId: "783004553044",
  appId: "1:783004553044:web:3c2a006a9f1e9c313282c1",
  measurementId: "G-N28XDZH5C1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

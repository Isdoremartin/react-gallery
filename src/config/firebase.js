// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrUa_J5Vj8NhDcjT1ZTjWTAQKqTStAOec",
  authDomain: "in-dept-react-1.firebaseapp.com",
  projectId: "in-dept-react-1",
  storageBucket: "in-dept-react-1.appspot.com",
  messagingSenderId: "135471701402",
  appId: "1:135471701402:web:a247ac9568169f86d7ee23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)
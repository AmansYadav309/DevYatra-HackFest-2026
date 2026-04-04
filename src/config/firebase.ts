// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY59r8bJew74LivXy_bSiv2YWQK04ZO3s",
  authDomain: "devyatra-hackfest.firebaseapp.com",
  projectId: "devyatra-hackfest",
  storageBucket: "devyatra-hackfest.firebasestorage.app",
  messagingSenderId: "435383225425",
  appId: "1:435383225425:web:44a79c77e4086a3bd1bc70",
  measurementId: "G-55YJ8MLHBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app); // Analytics optionally if needed, omit it to avoid SSR issues

export { db, app };

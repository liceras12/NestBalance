// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3_-PNNaq0YN0yZ3FvnJ-ScReMNNhZHrI",
  authDomain: "nestbalance-9b1ef.firebaseapp.com",
  projectId: "nestbalance-9b1ef",
  storageBucket: "nestbalance-9b1ef.firebasestorage.app",
  messagingSenderId: "725712821042",
  appId: "1:725712821042:web:193f440f542acdb22e152b",
  //measurementId: "G-WR61JE6THF",
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export default app;
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

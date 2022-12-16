import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDI8mRKcxVbDX113gwqwVyB39NHxWNus3k",
  authDomain: "ephemer-gaming1337.firebaseapp.com",
  projectId: "ephemer-gaming1337",
  storageBucket: "ephemer-gaming1337.appspot.com",
  messagingSenderId: "841562121490",
  appId: "1:841562121490:web:a5925e0a565e4294d83fcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
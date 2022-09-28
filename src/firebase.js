import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMLqQnSocwSwvrm1CAUnuAB1f592bCAkY",
  authDomain: "chat-a14c0.firebaseapp.com",
  projectId: "chat-a14c0",
  storageBucket: "chat-a14c0.appspot.com",
  messagingSenderId: "347774631261",
  appId: "1:347774631261:web:eff6309cd3b79329a3fcb4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

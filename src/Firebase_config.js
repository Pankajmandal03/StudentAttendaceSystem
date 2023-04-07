import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyD8GbFJxydJ9etVjNDPhvJV395rL69jOHc",
	authDomain: "attendance-system-326a0.firebaseapp.com",
	projectId: "attendance-system-326a0",
	storageBucket: "attendance-system-326a0.appspot.com",
	messagingSenderId: "8668698927",
	appId: "1:8668698927:web:1f3367887093ba6a76e9da"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
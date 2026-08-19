import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB55uNeHcx2xYSlqPIjmMQgXpfgQg5bomk",
  authDomain: "nikitascozyproject.firebaseapp.com",
  projectId: "nikitascozyproject",
  storageBucket: "nikitascozyproject.firebasestorage.app",
  messagingSenderId: "812688468987",
  appId: "1:812688468987:web:5cacd5d614773b69fbf95e",
  measurementId: "G-60FBX6PDK7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
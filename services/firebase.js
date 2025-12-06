
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRT9wDfG9cLPx6w1kD_Ku34fY7DYxxxno",
  authDomain: "inicio-sesion-firebase-2d131.firebaseapp.com",
  databaseURL: "https://inicio-sesion-firebase-2d131-default-rtdb.firebaseio.com",
  projectId: "inicio-sesion-firebase-2d131",
  storageBucket: "inicio-sesion-firebase-2d131.firebasestorage.app",
  messagingSenderId: "82554372018",
  appId: "1:82554372018:web:56806843c6930c0501aeab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app)
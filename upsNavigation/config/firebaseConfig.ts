import {initializeApp} from "firebase/app"
import { getFirestore } from "firebase/firestore";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9HThkN4Dh1VgUdw1wTLbMsURKGpGeNBA",
  authDomain: "semestralne-zadanie.firebaseapp.com",
  projectId: "semestralne-zadanie",
  storageBucket: "semestralne-zadanie.appspot.com",
  messagingSenderId: "1006003642315",
  appId: "1:1006003642315:web:a6d32c44109fdd704de04e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export default app;

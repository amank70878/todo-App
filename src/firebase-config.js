import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8N--192a84Mjf-zc7NQwp0Q_Rt1wXc_g",
  authDomain: "todo-app-89525.firebaseapp.com",
  projectId: "todo-app-89525",
  storageBucket: "todo-app-89525.appspot.com",
  messagingSenderId: "700712001505",
  appId: "1:700712001505:web:cd560baf67a10fd2ebfca0",
  measurementId: "G-HQB1W4GV4K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
 
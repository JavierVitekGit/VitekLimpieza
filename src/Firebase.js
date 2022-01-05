
import { initializeApp } from 'firebase/app';
import {getDatabase} from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyBmZRACI4lPavlz-2N0NyIvTIW9j2DOJhY",
  authDomain: "androidbrinsk.firebaseapp.com",
  databaseURL: "https://androidbrinsk-default-rtdb.firebaseio.com",
  projectId: "androidbrinsk",
  storageBucket: "androidbrinsk.appspot.com",
  messagingSenderId: "1038423598895",
  appId: "1:1038423598895:web:ddfe2d9c575506d192a3da"
};




 export const app = initializeApp(firebaseConfig);

 export const database = getDatabase();





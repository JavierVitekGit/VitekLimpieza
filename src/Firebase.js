
import { initializeApp } from 'firebase/app';
import {getDatabase} from "firebase/database";




let config = {
  apiKey: "AIzaSyDnedHTB9yMEPhZTQDzI08rA7yDXAJq84I",
  authDomain: "vitek-c65e5.firebaseapp.com",
  databaseURL: "https://vitek-c65e5-default-rtdb.firebaseio.com",
  projectId: "vitek-c65e5",
  storageBucket: "vitek-c65e5.appspot.com",
  messagingSenderId: "1:180537252076:web:278e4849024501aaa52dc9",
  appId: "1:180537252076:web:278e4849024501aaa52dc9",
};




 export const app = initializeApp(config);

 export const database = getDatabase();





// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,addDoc,collection } from 'firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsF1rZ8aKqGs44cmIQwBRIlP9thQwVCgg",
  authDomain: "mind-map-95c8e.firebaseapp.com",
  projectId: "mind-map-95c8e",
  storageBucket: "mind-map-95c8e.appspot.com",
  messagingSenderId: "315021948677",
  appId: "1:315021948677:web:d11708d5081c14da67296c",
  measurementId: "G-FYDKVNM27P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// iife
// (async function () {
//    const citiesCol = collection(db, 'cities');
//  const citySnapshot = await getDocs(citiesCol);
//  console.log({citySnapshot})
//  const cityList = citySnapshot.docs.map(doc => doc.data());
// console.log({cityList});
// })();
// (async function () {
  




// })();


export { app,db}
import firebase from 'firebase/app'
import 'firebase/firestore'


var firebaseConfig = {
  apiKey: "AIzaSyBiOls0zGETE9_Ok3y7lSrlk9wZ3aw4myE",
  authDomain: "ecommerce-aruguete-la-vegana.firebaseapp.com",
  projectId: "ecommerce-aruguete-la-vegana",
  storageBucket: "ecommerce-aruguete-la-vegana.appspot.com",
  messagingSenderId: "346356126283",
  appId: "1:346356126283:web:154dfdb684f180553d33ce"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
console.log('fb:', fb)

export const dataBase = fb.firestore()
console.log('dataBase:', dataBase)
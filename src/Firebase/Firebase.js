// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getDatabase } from "firebase/database";

// // import "firebase/database"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from 'firebase/compat/firestore';
// // import 'firebase/compat/auth';
// // import 'firebase/compat/firestore';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyApZ3UTOoVj1OUPbLp1MGExiTAhrFLO-6c",
//   authDomain: "patholabs-24x7.firebaseapp.com",
//   projectId: "patholabs-24x7",
//   storageBucket: "patholabs-24x7.appspot.com",
//   messagingSenderId: "491868787112",
//   appId: "1:491868787112:web:574af1bb98bf48b2f7cd9d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // export const db = getDatabase(app);
// export default app;
// // const firebaseApp = firebase.initializeApp(firebaseConfig);
// // const db = firebaseApp.firestore();
// // export { db };

// Firebase.js
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, push } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyApZ3UTOoVj1OUPbLp1MGExiTAhrFLO-6c",
//   authDomain: "patholabs-24x7.firebaseapp.com",
//   projectId: "patholabs-24x7",
//   storageBucket: "patholabs-24x7.appspot.com",
//   messagingSenderId: "491868787112",
//   appId: "1:491868787112:web:574af1bb98bf48b2f7cd9d"
// };


// const firebaseApp = initializeApp(firebaseConfig);
// const db = getDatabase(firebaseApp);

// export { db, ref, push };


import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyApZ3UTOoVj1OUPbLp1MGExiTAhrFLO-6c",
  authDomain: "patholabs-24x7.firebaseapp.com",
  projectId: "patholabs-24x7",
  storageBucket: "patholabs-24x7.appspot.com",
  messagingSenderId: "491868787112",
  appId: "1:491868787112:web:574af1bb98bf48b2f7cd9d"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

export { db, ref, push, onValue };

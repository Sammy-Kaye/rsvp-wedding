// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8MOc9EQYtIaQZDRJpPkQryOudQC4Bsiw",
  authDomain: "wedding-rsvp-12345.firebaseapp.com",
  projectId: "wedding-rsvp-12345",
  storageBucket: "wedding-rsvp-12345.firebasestorage.app",
  messagingSenderId: "531969671313",
  appId: "1:531969671313:web:cb143efde641d92fecff30"
};

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Enable offline persistence (optional but recommended)
db.enablePersistence()
  .catch((err) => {
    console.error("Firebase persistence error: ", err);
  });

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8MOc9EQYtIaQZDRJpPkQryOudQC4Bsiw",
  authDomain: "wedding-rsvp-12345.firebaseapp.com",
  projectId: "wedding-rsvp-12345",
  storageBucket: "wedding-rsvp-12345.firebasestorage.app",
  messagingSenderId: "531969671313",
  appId: "1:531969671313:web:cb143efde641d92fecff30"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Configure Firestore with modern cache settings
db.settings({
  cache: {
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  },
  experimentalForceLongPolling: true  // Helps with some network issues
});

// Enable offline persistence with error handling
if (typeof window !== 'undefined') {  // Only run in browser
  firebase.firestore().enablePersistence()
    .catch(err => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support offline persistence.');
      }
      console.error('Firebase persistence error:', err);
    });
}

// make db available everywhere
window.db = db;

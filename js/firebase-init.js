// Check if Firebase is already initialized
if (!firebase.apps.length) {
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
  firebase.initializeApp(firebaseConfig);
  
  // Get Firestore instance
  const db = firebase.firestore();
  
  // Configure Firestore settings (only call settings() once!)
  db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    experimentalForceLongPolling: true
  });
  
  // Make db available globally
  window.db = db;
  
  // Configure offline persistence (this is the correct v8 way)
  if (typeof window !== 'undefined') {
    db.enablePersistence({ synchronizeTabs: true })
      .catch(err => {
        if (err.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
          console.warn('The current browser does not support offline persistence.');
        } else {
          console.error('Firebase persistence error:', err);
        }
      });
  }
} else {
  // If Firebase is already initialized, just get the existing db instance
  window.db = firebase.firestore();
}
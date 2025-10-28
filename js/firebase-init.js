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
  const app = firebase.initializeApp(firebaseConfig);
  
  // Configure Firestore with modern cache settings
  const firestoreSettings = {
    cache: {
      // Use the new cache configuration
      kind: 'persistent',
      tabManager: 'multi-tab',
      cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    },
    experimentalForceLongPolling: true
  };
  
  // Initialize Firestore with settings
  const db = firebase.firestore();
  
  // Apply settings with merge: true to avoid host override warning
  db.settings(firestoreSettings, { merge: true });
  
  // Make db available globally
  window.db = db;
  
  // Configure offline persistence using the new approach
  if (typeof window !== 'undefined') {
    // The persistence is now handled by the cache settings above
    // This is just for backward compatibility and error handling
    db.enablePersistence()
      .catch(err => {
        if (err.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
          console.warn('The current browser does not support offline persistence.');
        }
        console.error('Firebase persistence error:', err);
      });
  }
} else {
  // If Firebase is already initialized, just get the existing db instance
  window.db = firebase.firestore();
}

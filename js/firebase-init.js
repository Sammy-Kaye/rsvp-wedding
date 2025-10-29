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
  
  // Initialize Firestore with settings
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  
  // Make db available globally
  window.db = db;
  
  // Only set up persistence if in browser environment
  if (typeof window !== 'undefined') {
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

// Firestore helpers
window.firebaseHelpers = {
  // Search for a guest by first+last name (case-insensitive)
  async getGuest(first, last) {
    const snap = await window.db.collection('guests')
                     .where('first', '==', first.trim().toLowerCase())
                     .where('last', '==', last.trim().toLowerCase())
                     .limit(1)
                     .get();
    return snap.empty ? null : snap.docs[0].data();
  },

  // Save or update an RSVP document
  async submitRsvp(data) {
    // data = {name:string, attending:bool, plusOne:bool, diet:string}
    const id = data.name.toLowerCase().replace(/\s+/g,'-');  // simple key
    await window.db.collection('rsvps').doc(id).set(data);
    return id;
  }
};
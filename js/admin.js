// Admin Panel JS
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logoutBtn');
const refreshBtn = document.getElementById('refreshBtn');
const exportBtn = document.getElementById('exportBtn');
const searchInput = document.getElementById('searchGuest');
const guestsTableBody = document.getElementById('guestsTableBody');

// Add Guest Modal Elements
const addGuestBtn = document.getElementById('addGuestBtn');
const addGuestModal = document.getElementById('addGuestModal');
const addGuestForm = document.getElementById('addGuestForm');
const guestNameInput = document.getElementById('guestName');
const guestEmailInput = document.getElementById('guestEmail');
const guestNotesInput = document.getElementById('guestNotes');
const closeModalBtn = document.querySelector('.close-modal');
const cancelAddGuestBtn = document.getElementById('cancelAddGuest');

// Stats elements
const totalGuestsEl = document.getElementById('totalGuests');
const attendingCountEl = document.getElementById('attendingCount');
const notAttendingCountEl = document.getElementById('notAttendingCount');
const pendingCountEl = document.getElementById('pendingCount');

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', () => {
    // Listen for auth state changes
    if (window.auth) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                showDashboard();
            } else {
                // User is signed out
                showLogin();
            }
        });
    } else {
        console.error('Firebase Auth not initialized. Make sure firebase-init.js loads before admin.js');
    }
});

// Login button click
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            showLoginError('Please enter both email and password.');
            return;
        }

        if (!window.auth) {
            showLoginError('Authentication service not available. Please refresh the page.');
            return;
        }

        try {
            // Show loading state
            loginBtn.disabled = true;
            loginBtn.textContent = 'Logging in...';
            loginError.style.display = 'none';

            // Sign in with Firebase Auth
            await auth.signInWithEmailAndPassword(email, password);
            
            // onAuthStateChanged will handle showing the dashboard
            // Clear form
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        } catch (error) {
            console.error('Login error:', error);
            
            // Handle different error types
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed login attempts. Please try again later.';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection and try again.';
            }
            
            showLoginError(errorMessage);
            loginBtn.disabled = false;
            loginBtn.textContent = 'Login';
        }
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        if (confirm('Are you sure you want to log out?')) {
            try {
                if (window.auth) {
                    await auth.signOut();
                    // onAuthStateChanged will handle showing the login form
                } else {
                    // Fallback if auth is not available
                    showLogin();
                }
            } catch (error) {
                console.error('Logout error:', error);
                alert('Failed to log out. Please try again.');
            }
        }
    });
}

// Refresh data
if (refreshBtn) {
    refreshBtn.addEventListener('click', loadGuestData);
}

// Export to CSV
if (exportBtn) {
    exportBtn.addEventListener('click', exportToCSV);
}

// Search functionality
if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

// Show login form
function showLogin() {
    if (document.getElementById('loginSection')) {
        document.getElementById('loginSection').classList.remove('hidden');
    }
    if (dashboard) {
        dashboard.classList.add('hidden');
    }
}

// Show dashboard and load data
function showDashboard() {
    if (document.getElementById('loginSection')) {
        document.getElementById('loginSection').classList.add('hidden');
    }
    if (dashboard) {
        dashboard.classList.remove('hidden');
        loadGuestData();
    }
}

// Show login error
function showLoginError(message) {
    if (loginError) {
        loginError.textContent = message;
        loginError.style.display = 'block';
        if (document.getElementById('password')) {
            document.getElementById('password').focus();
        }
    }
}

// Load guest data from Firestore
async function loadGuestData() {
    try {
        const querySnapshot = await db.collection('guests').orderBy('name').get();
        const guests = [];
        
        querySnapshot.forEach((doc) => {
            guests.push({
                id: doc.id,
                ...doc.data(),
                lastUpdated: doc.data().lastUpdated?.toDate() || new Date()
            });
        });
        
        updateGuestList(guests);
        updateStats(guests);
    } catch (error) {
        console.error('Error loading guest data:', error);
        alert('Failed to load guest data. Please try again.');
    }
}

// Update guest list in the table
function updateGuestList(guests) {
    guestsTableBody.innerHTML = '';
    
    if (guests.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                No guests found
            </td>
        `;
        guestsTableBody.appendChild(row);
        return;
    }
    
    guests.forEach(guest => {
        const row = document.createElement('tr');
        
        // Format last updated date
        const lastUpdated = guest.lastUpdated ? 
            new Date(guest.lastUpdated).toLocaleDateString() : 'N/A';
        
        // Determine status class and text
        let statusClass = 'status-pending';
        let statusText = 'Pending';
        
        if (guest.rsvp === 'attending') {
            statusClass = 'status-attending';
            statusText = 'Attending';
        } else if (guest.rsvp === 'not_attending') {
            statusClass = 'status-not_attending';
            statusText = 'Not Attending';
        }
        
        row.innerHTML = `
            <td>${guest.name}</td>
            <td>${guest.email || 'N/A'}</td>
            <td><span class="status ${statusClass}">${statusText}</span></td>
            <td><code>${guest.code || 'N/A'}</code></td>
            <td>${lastUpdated}</td>
            <td class="actions">
                <button class="action-btn reset-rsvp" data-id="${guest.id}" title="Reset RSVP">
                    <i class="fas fa-undo"></i>
                </button>
                <button class="action-btn view-details" data-id="${guest.id}" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        guestsTableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.reset-rsvp').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const guestId = e.currentTarget.getAttribute('data-id');
            resetGuestRSVP(guestId);
        });
    });
    
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const guestId = e.currentTarget.getAttribute('data-id');
            viewGuestDetails(guestId);
        });
    });
}

// Update statistics
function updateStats(guests) {
    const couples = guests.filter(g => g.partySize === 2).length;
    const singles = guests.filter(g => g.partySize === 1).length;
    const totalPeople = guests.reduce((sum, g) => sum + g.partySize, 0);
    const attendingPeople = guests.filter(g => g.rsvp === 'attending').reduce((sum, g) => sum + g.partySize, 0);
    const notAttendingPeople = guests.filter(g => g.rsvp === 'not_attending').reduce((sum, g) => sum + g.partySize, 0);
    const pendingPeople = guests.filter(g => g.rsvp === 'pending').reduce((sum, g) => sum + g.partySize, 0);

    totalGuestsEl.textContent = `${totalPeople} Total (${couples} Couples, ${singles} Singles)`;
    attendingCountEl.textContent = attendingPeople;
    notAttendingCountEl.textContent = notAttendingPeople;
    pendingCountEl.textContent = pendingPeople;
}

// Reset a guest's RSVP
async function resetGuestRSVP(guestId) {
    if (!confirm('Are you sure you want to reset this guest\'s RSVP? They will be able to RSVP again.')) {
        return;
    }
    
    try {
        await db.collection('guests').doc(guestId).update({
            rsvp: 'pending',
            code: null,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Reload the guest data
        loadGuestData();
        alert('RSVP has been reset. The guest can now RSVP again.');
    } catch (error) {
        console.error('Error resetting RSVP:', error);
        alert('Failed to reset RSVP. Please try again.');
    }
}

// View guest details
async function viewGuestDetails(guestId) {
    try {
        const doc = await db.collection('guests').doc(guestId).get();
        if (!doc.exists) {
            alert('Guest not found.');
            return;
        }
        
        const guest = { id: doc.id, ...doc.data() };
        const lastUpdated = guest.lastUpdated?.toDate() || 'N/A';
        
        const details = `
            <strong>Name:</strong> ${guest.name}\n
            <strong>Email:</strong> ${guest.email || 'N/A'}\n
            <strong>Status:</strong> ${guest.rsvp || 'Pending'}\n
            <strong>RSVP Code:</strong> ${guest.code || 'N/A'}\n
            <strong>Last Updated:</strong> ${lastUpdated}\n
            <strong>Additional Notes:</strong> ${guest.notes || 'None'}
        `;
        
        alert(details);
    } catch (error) {
        console.error('Error viewing guest details:', error);
        alert('Failed to load guest details. Please try again.');
    }
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const rows = guestsTableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const email = row.cells[1].textContent.toLowerCase();
        const status = row.cells[2].textContent.toLowerCase();
        const code = row.cells[3].textContent.toLowerCase();
        
        if (name.includes(searchTerm) || 
            email.includes(searchTerm) || 
            status.includes(searchTerm) ||
            code.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Export to CSV
async function exportToCSV() {
    try {
        const querySnapshot = await db.collection('guests').orderBy('name').get();
        let csvContent = 'Name,Email,RSVP Status,RSVP Code,Last Updated\n';
        
        querySnapshot.forEach((doc) => {
            const guest = doc.data();
            const lastUpdated = guest.lastUpdated?.toDate()?.toLocaleString() || 'N/A';
            
            // Escape any commas in the data
            const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
            
            csvContent += [
                escapeCsv(guest.name),
                escapeCsv(guest.email),
                escapeCsv(guest.rsvp || 'pending'),
                escapeCsv(guest.code || ''),
                escapeCsv(lastUpdated)
            ].join(',') + '\n';
        });
        
        // Create a download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.setAttribute('href', url);
        link.setAttribute('download', `wedding-rsvps-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (error) {
        console.error('Error exporting to CSV:', error);
        alert('Failed to export data. Please try again.');
    }
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show a message to the user
function showMessage(title, message) {
    alert(`${title}\n\n${message}`);
}

// Add Guest Modal Functions
if (addGuestBtn) {
    addGuestBtn.addEventListener('click', () => {
        addGuestModal.classList.remove('hidden');
        guestNameInput.focus();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeAddGuestModal);
}

if (cancelAddGuestBtn) {
    cancelAddGuestBtn.addEventListener('click', closeAddGuestModal);
}

if (addGuestForm) {
    addGuestForm.addEventListener('submit', handleAddGuest);
}

// Close modal when clicking outside
if (addGuestModal) {
    addGuestModal.addEventListener('click', (e) => {
        if (e.target === addGuestModal) {
            closeAddGuestModal();
        }
    });
}

function closeAddGuestModal() {
    addGuestModal.classList.add('hidden');
    addGuestForm.reset();
}

async function handleAddGuest(e) {
    e.preventDefault();

    const name = guestNameInput.value.trim();
    const email = guestEmailInput.value.trim();
    const notes = guestNotesInput.value.trim();

    if (!name) {
        alert('Please enter a guest name.');
        guestNameInput.focus();
        return;
    }

    try {
        // Check if guest already exists
        const existingGuest = await db.collection('guests')
            .where('name', '==', name)
            .get();

        if (!existingGuest.empty) {
            alert('A guest with this name already exists.');
            guestNameInput.focus();
            return;
        }

        // Add new guest to Firestore
        const guestData = {
            name: name,
            email: email || null,
            notes: notes || null,
            rsvp: 'pending',
            code: generateUniqueCode(),
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('guests').add(guestData);

        alert('Guest added successfully!');
        closeAddGuestModal();
        loadGuestData(); // Refresh the table

    } catch (error) {
        console.error('Error adding guest:', error);
        alert('Failed to add guest. Please try again.');
    }
}

function generateUniqueCode() {
    const prefix = 'WED';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const timestamp = Date.now().toString().slice(-4);
    return `${prefix}${randomNum}${timestamp}`;
}

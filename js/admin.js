// Admin Panel JS
const loginForm = document.getElementById('loginForm');
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

// Admin credentials (in a real app, use Firebase Authentication)
const ADMIN_PASSWORD = 'wedding2025'; // Change this to a secure password

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }
});

// Login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value.trim();
        
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            showDashboard();
        } else {
            loginError.style.display = 'block';
            document.getElementById('password').focus();
        }
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'admin.html';
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

// Show dashboard and load data
function showDashboard() {
    document.getElementById('loginSection').classList.add('hidden');
    dashboard.classList.remove('hidden');
    loadGuestData();
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
    const total = guests.length;
    const attending = guests.filter(g => g.rsvp === 'attending').length;
    const notAttending = guests.filter(g => g.rsvp === 'not_attending').length;
    const pending = guests.filter(g => g.rsvp === 'pending').length;
    
    totalGuestsEl.textContent = total;
    attendingCountEl.textContent = attending;
    notAttendingCountEl.textContent = notAttending;
    pendingCountEl.textContent = pending;
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

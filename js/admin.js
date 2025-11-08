// Admin Panel JS
const loginSection = document.getElementById('loginSection');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logoutBtn');
const refreshBtn = document.getElementById('refreshBtn');
const exportBtn = document.getElementById('exportBtn');
const searchInput = document.getElementById('searchGuest');
const guestsTableBody = document.getElementById('guestsTableBody');

// Notification System (defined early so it can be used throughout)
function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notificationContainer');
    if (!container) {
        alert(message);
        return;
    }

    const notification = document.createElement('div');
    notification.style.cssText = `
        background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : type === 'warning' ? '#ffc107' : '#007bff'};
        color: white;
        padding: 16px 20px;
        margin-bottom: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation: slideIn 0.3s ease-out;
        font-size: 14px;
        line-height: 1.5;
    `;

    const messageText = document.createElement('div');
    messageText.textContent = message;
    messageText.style.flex = '1';
    notification.appendChild(messageText);

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        margin-left: 15px;
        width: 24px;
        height: 24px;
        line-height: 1;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
    closeBtn.onmouseout = () => closeBtn.style.opacity = '0.8';
    closeBtn.onclick = () => removeNotification(notification);
    notification.appendChild(closeBtn);

    container.appendChild(notification);

    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Add CSS animations if not already in stylesheet
if (!document.getElementById('notificationStyles')) {
    const style = document.createElement('style');
    style.id = 'notificationStyles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add Guest Modal Elements
const addGuestBtn = document.getElementById('addGuestBtn');
const addGuestModal = document.getElementById('addGuestModal');
const addGuestForm = document.getElementById('addGuestForm');
const guestNameInput = document.getElementById('guestName');
const guestEmailInput = document.getElementById('guestEmail');
const guestNotesInput = document.getElementById('guestNotes');
const partySizeInput = document.getElementById('partySize');

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.auth) {
        window.auth.onAuthStateChanged((user) => {
            if (user) {
                showDashboard();
            } else {
                showLogin();
            }
        });
    }
});

// Login button click
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await window.auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            loginError.textContent = error.message;
            loginError.style.display = 'block';
        }
    });
}

// Logout button click
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await window.auth.signOut();
        } catch (error) {
            console.error('Logout error:', error);
        }
    });
}

function showLogin() {
    loginSection.style.display = 'block';
    dashboard.style.display = 'none';
}

function showDashboard() {
    loginSection.style.display = 'none';
    dashboard.style.display = 'block';
    loadGuestData();
}

// Load guest data from Firestore
async function loadGuestData() {
    try {
        const querySnapshot = await db.collection('guests').orderBy('createdAt', 'desc').get();
        const guests = [];

        querySnapshot.forEach((doc) => {
            guests.push({ id: doc.id, ...doc.data() });
        });

        displayGuests(guests);
        updateStats(guests);
    } catch (error) {
        console.error('Error loading guest data:', error);
        showNotification('Failed to load guest data.', 'error', 5000);
    }
}

// Display guests in the table
function displayGuests(guests) {
    const tbody = document.getElementById('guestsTableBody');
    tbody.innerHTML = '';

    if (guests.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="6" style="text-align: center; padding: 40px; color: #666;">No guests found.</td>';
        tbody.appendChild(emptyRow);
        return;
    }

    guests.forEach(guest => {
        const row = document.createElement('tr');

        const statusClass = guest.rsvp === 'attending' ? 'status-attending' :
                           guest.rsvp === 'not_attending' ? 'status-not_attending' : 'status-pending';

        const lastUpdated = guest.lastUpdated ? new Date(guest.lastUpdated.toDate()).toLocaleDateString() : 'Never';

        row.innerHTML = `
            <td>${guest.name}</td>
            <td>${guest.email || '-'}</td>
            <td><span class="status ${statusClass}">${guest.rsvp.replace('_', ' ')}</span></td>
            <td>${guest.code || '-'}</td>
            <td>${lastUpdated}</td>
            <td>
                <button class="action-btn" onclick="editGuest('${guest.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" onclick="deleteGuest('${guest.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Update statistics cards
function updateStats(guests) {
    const totalGuests = guests.length;
    const attendingCount = guests.filter(g => g.rsvp === 'attending').length;
    const notAttendingCount = guests.filter(g => g.rsvp === 'not_attending').length;
    const pendingCount = guests.filter(g => g.rsvp === 'pending').length;

    document.getElementById('totalGuests').textContent = totalGuests;
    document.getElementById('attendingCount').textContent = attendingCount;
    document.getElementById('notAttendingCount').textContent = notAttendingCount;
    document.getElementById('pendingCount').textContent = pendingCount;
}

// Search functionality
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#guestsTableBody tr');

        rows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const email = row.cells[1].textContent.toLowerCase();

            if (name.includes(searchTerm) || email.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Refresh button
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        loadGuestData();
        showNotification('Data refreshed!', 'success', 3000);
    });
}

// Export to CSV
if (exportBtn) {
    exportBtn.addEventListener('click', async () => {
        try {
            const querySnapshot = await db.collection('guests').orderBy('createdAt', 'desc').get();
            const guests = [];

            querySnapshot.forEach((doc) => {
                guests.push(doc.data());
            });

            if (guests.length === 0) {
                showNotification('No data to export.', 'warning', 4000);
                return;
            }

            const csvContent = generateCSV(guests);
            downloadCSV(csvContent, 'wedding-guests.csv');
            showNotification('Data exported successfully!', 'success', 4000);
        } catch (error) {
            console.error('Export error:', error);
            showNotification('Failed to export data.', 'error', 5000);
        }
    });
}

function generateCSV(guests) {
    const headers = ['Name', 'Email', 'Party Size', 'RSVP Status', 'Code', 'Notes', 'Last Updated'];
    const rows = guests.map(guest => [
        guest.name,
        guest.email || '',
        guest.partySize || 1,
        guest.rsvp || 'pending',
        guest.code || '',
        guest.notes || '',
        guest.lastUpdated ? guest.lastUpdated.toDate().toLocaleString() : ''
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

    return csvContent;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Edit guest (placeholder - would need modal implementation)
function editGuest(guestId) {
    showNotification('Edit functionality coming soon!', 'info', 4000);
}

// Delete guest
async function deleteGuest(guestId) {
    if (!confirm('Are you sure you want to delete this guest?')) {
        return;
    }

    try {
        await db.collection('guests').doc(guestId).delete();
        showNotification('Guest deleted successfully!', 'success', 4000);
        loadGuestData();
    } catch (error) {
        console.error('Delete error:', error);
        showNotification('Failed to delete guest.', 'error', 5000);
    }
}

// Modal functionality for add guest
if (addGuestBtn) {
    addGuestBtn.addEventListener('click', () => {
        addGuestModal.classList.remove('hidden');
    });
}

if (addGuestForm) {
    addGuestForm.addEventListener('submit', handleAddGuest);
}

// Close modal functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-modal') || e.target.id === 'cancelAddGuest') {
        closeAddGuestModal();
    }
});

function closeAddGuestModal() {
    addGuestModal.classList.add('hidden');
    addGuestForm.reset();
}

async function handleAddGuest(e) {
    e.preventDefault();

    const name = guestNameInput.value.trim();
    const email = guestEmailInput.value.trim();
    const notes = guestNotesInput.value.trim();
    const partySize = parseInt(partySizeInput.value, 10);

    if (!name) {
        showNotification('Please enter a guest name.', 'warning', 4000);
        guestNameInput.focus();
        return;
    }

    if (isNaN(partySize) || partySize < 1) {
        showNotification('Please enter a valid party size.', 'warning', 4000);
        partySizeInput.focus();
        return;
    }

    try {
        // Check if guest already exists
        const existingGuest = await db.collection('guests')
            .where('name', '==', name)
            .get();

        if (!existingGuest.empty) {
            showNotification('A guest with this name already exists.', 'warning', 4000);
            guestNameInput.focus();
            return;
        }

        // Add new guest to Firestore
        const guestData = {
            name: name,
            email: email || null,
            notes: notes || null,
            partySize: partySize,
            rsvp: 'pending',
            code: null,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('guests').add(guestData);

        showNotification('Guest added successfully!', 'success', 4000);
        closeAddGuestModal();
        loadGuestData(); // Refresh the table

    } catch (error) {
        console.error('Error adding guest:', error);
        showNotification('Failed to add guest. Please try again.', 'error', 5000);
    }
}

function generateUniqueCode() {
    const prefix = 'WED';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const timestamp = Date.now().toString().slice(-4);
    return `${prefix}${randomNum}${timestamp}`;
}

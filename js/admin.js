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

// Reset Guest Modal Elements
const resetGuestModal = document.getElementById('resetGuestModal');
const resetGuestForm = document.getElementById('resetGuestForm');
const resetGuestNameInput = document.getElementById('resetGuestName');

// Edit Guest Modal Elements
const editGuestModal = document.getElementById('editGuestModal');
const editGuestForm = document.getElementById('editGuestForm');
const editGuestNameInput = document.getElementById('editGuestName');
const editGuestEmailInput = document.getElementById('editGuestEmail');
const editGuestNotesInput = document.getElementById('editGuestNotes');
const editPartySizeInput = document.getElementById('editPartySize');
let currentEditingGuestId = null;

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
    dashboard.classList.add('hidden');
}

function showDashboard() {
    loginSection.style.display = 'none';
    dashboard.classList.remove('hidden');
    loadGuestData();
}

// Load guest data from Firestore
async function loadGuestData() {
    try {
        console.log('Loading guest data...');
        const querySnapshot = await db.collection('guests').get();
        const guests = [];

        querySnapshot.forEach((doc) => {
            guests.push({ id: doc.id, ...doc.data() });
        });

        console.log('Loaded guests:', guests.length);
        displayGuests(guests);
        updateStats(guests);
    } catch (error) {
        console.error('Error loading guest data:', error);
        showNotification('Failed to load guest data: ' + error.message, 'error', 5000);
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
                <button class="action-btn" onclick="resetGuest('${guest.id}')" title="Reset Code">
                    <i class="fas fa-refresh"></i>
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
    const totalGuests = guests.reduce((sum, guest) => sum + (guest.partySize || 1), 0);
    const attendingCount = guests.filter(g => g.rsvp === 'attending').reduce((sum, guest) => sum + (guest.partySize || 1), 0);
    const notAttendingCount = guests.filter(g => g.rsvp === 'not_attending').reduce((sum, guest) => sum + (guest.partySize || 1), 0);
    const pendingCount = guests.filter(g => g.rsvp === 'pending').reduce((sum, guest) => sum + (guest.partySize || 1), 0);

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
            const querySnapshot = await db.collection('guests').get();
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
    // Filter to only attending guests
    const attendingGuests = guests.filter(guest => guest.rsvp === 'attending');

    const headers = ['Name', 'Code', 'Party Number'];
    const rows = attendingGuests.map(guest => [
        guest.name,
        guest.code || '',
        guest.partySize || 1
    ]);

    // Properly escape CSV fields
    const escapeCSVField = (field) => {
        if (field == null) return '';
        const stringField = String(field);
        // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
        if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
            return '"' + stringField.replace(/"/g, '""') + '"';
        }
        return stringField;
    };

    const csvContent = [headers, ...rows]
        .map(row => row.map(escapeCSVField).join(','))
        .join('\r\n'); // Use \r\n for better Excel compatibility

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

// Edit guest
function editGuest(guestId) {
    // Find the guest data
    db.collection('guests').doc(guestId).get().then((doc) => {
        if (doc.exists) {
            const guest = doc.data();
            currentEditingGuestId = guestId;

            // Populate the edit form
            editGuestNameInput.value = guest.name || '';
            editGuestEmailInput.value = guest.email || '';
            editGuestNotesInput.value = guest.notes || '';
            editPartySizeInput.value = guest.partySize || 1;

            // Show the modal
            editGuestModal.classList.remove('hidden');
        } else {
            showNotification('Guest not found.', 'error', 4000);
        }
    }).catch((error) => {
        console.error('Error getting guest:', error);
        showNotification('Failed to load guest data.', 'error', 5000);
    });
}

// Reset guest code
async function resetGuest(guestId) {
    if (!confirm('Are you sure you want to reset this guest\'s RSVP code? This will clear their code and reset their RSVP status to pending. A new code will be generated when they RSVP again.')) {
        return;
    }

    try {
        await db.collection('guests').doc(guestId).update({
            code: null,
            rsvp: 'pending',
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification('Guest code reset successfully! They can now RSVP again to receive a new code.', 'success', 6000);
        loadGuestData();

    } catch (error) {
        console.error('Error resetting guest:', error);
        showNotification('Failed to reset guest code.', 'error', 5000);
    }
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

// Modal functionality for reset guest
if (resetGuestForm) {
    resetGuestForm.addEventListener('submit', handleResetGuest);
}

// Modal functionality for edit guest
if (editGuestForm) {
    editGuestForm.addEventListener('submit', handleEditGuest);
}

// Close modal functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-modal')) {
        closeAllModals();
    }
    if (e.target.id === 'cancelResetGuest') {
        closeResetGuestModal();
    }
    if (e.target.id === 'cancelEditGuest') {
        closeEditGuestModal();
    }
});

function closeAllModals() {
    resetGuestModal.classList.add('hidden');
    editGuestModal.classList.add('hidden');
    resetGuestForm.reset();
    editGuestForm.reset();
    currentEditingGuestId = null;
}

function closeResetGuestModal() {
    resetGuestModal.classList.add('hidden');
    resetGuestForm.reset();
}

function closeEditGuestModal() {
    editGuestModal.classList.add('hidden');
    editGuestForm.reset();
    currentEditingGuestId = null;
}

async function handleResetGuest(e) {
    e.preventDefault();

    const name = resetGuestNameInput.value.trim();

    if (!name) {
        showNotification('Please enter a guest name.', 'warning', 4000);
        resetGuestNameInput.focus();
        return;
    }

    try {
        // Find the guest by name
        const guestQuery = await db.collection('guests')
            .where('name', '==', name)
            .limit(1)
            .get();

        if (guestQuery.empty) {
            showNotification('Guest not found with that name.', 'warning', 4000);
            resetGuestNameInput.focus();
            return;
        }

        const guestDoc = guestQuery.docs[0];
        const guestId = guestDoc.id;

        // Clear code and reset status to pending
        await db.collection('guests').doc(guestId).update({
            code: null,
            rsvp: 'pending',
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification('Guest code reset successfully! They can now RSVP again to receive a new code.', 'success', 6000);
        closeResetGuestModal();
        loadGuestData();

    } catch (error) {
        console.error('Error resetting guest:', error);
        showNotification('Failed to reset guest code.', 'error', 5000);
    }
}

async function handleEditGuest(e) {
    e.preventDefault();

    if (!currentEditingGuestId) {
        showNotification('No guest selected for editing.', 'error', 4000);
        return;
    }

    const name = editGuestNameInput.value.trim();
    const email = editGuestEmailInput.value.trim();
    const notes = editGuestNotesInput.value.trim();
    const partySize = parseInt(editPartySizeInput.value, 10);

    if (!name) {
        showNotification('Please enter a guest name.', 'warning', 4000);
        editGuestNameInput.focus();
        return;
    }

    if (isNaN(partySize) || partySize < 1) {
        showNotification('Please enter a valid party size.', 'warning', 4000);
        editPartySizeInput.focus();
        return;
    }

    try {
        await db.collection('guests').doc(currentEditingGuestId).update({
            name: name,
            email: email || null,
            notes: notes || null,
            partySize: partySize,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification('Guest updated successfully!', 'success', 4000);
        closeEditGuestModal();
        loadGuestData();

    } catch (error) {
        console.error('Error updating guest:', error);
        showNotification('Failed to update guest.', 'error', 5000);
    }
}

function generateUniqueCode() {
    const prefix = 'WED';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const timestamp = Date.now().toString().slice(-4);
    return `${prefix}${randomNum}${timestamp}`;
}

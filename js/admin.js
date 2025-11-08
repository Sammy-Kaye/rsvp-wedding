// Admin Panel JS
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

// ... (rest of the file)

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

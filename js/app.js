// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');
const guestSearch = document.getElementById('guestSearch');
const searchResults = document.getElementById('searchResults');

const rsvpForm = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');
const guestNameElement = document.getElementById('guestName');
const rsvpOptions = document.querySelectorAll('.rsvp-option');




// Track current guest
let currentGuest = null;
let allGuests = [];

// Notification System (defined early so it can be used throughout)
function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notificationContainer');
    if (!container) {
        // Fallback to alert if container doesn't exist
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

    // Auto remove after duration
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

// Load all guests from Firestore on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing...');
    loadAllGuests().then(() => {
        console.log('Guests loaded successfully. Total guests:', allGuests.length);
        
        // Test search after loading
        if (guestSearch) {
            console.log('Adding input event listener to search field');
            guestSearch.addEventListener('input', debounce(handleGuestSearch, 300));
        } else {
            console.error('Search input field not found!');
        }
    }).catch(error => {
        console.error('Failed to load guests:', error);
    });
});

async function loadAllGuests() {
    try {
        console.log('Loading guests from Firestore...');
        // Use window.db to ensure we're using the global instance
        const db = window.db || firebase.firestore();
        const querySnapshot = await db.collection('guests').get();
        
        if (querySnapshot.empty) {
            console.warn('No guest documents found in Firestore');
            return;
        }
        
        allGuests = []; // Reset the array
        querySnapshot.forEach((doc) => {
            const guestData = { id: doc.id, ...doc.data() };
            allGuests.push(guestData);
        });
        
        console.log(`Successfully loaded ${allGuests.length} guests`);
        
        // Test if we can find some elements
        console.log('Testing DOM elements:', {
            guestSearch: !!guestSearch,
            searchResults: !!searchResults,
            rsvpForm: !!rsvpForm
        });
        
        return allGuests;
    } catch (error) {
        console.error('Error loading all guests:', error);
        throw error; // Re-throw to allow proper error handling
    }
}


// Debounce function to limit API calls
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

// Search input event listener is now added after guests are loaded

// Handle guest search
function handleGuestSearch(e) {
    if (!e || !e.target || !searchResults) {
        console.error('Search function called with invalid parameters or searchResults element missing');
        return;
    }
    
    const searchTerm = e.target.value.trim().toLowerCase();
    
    if (searchTerm.length < 1) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        return;
    }
    
    if (!allGuests || allGuests.length === 0) {
        console.warn('No guests loaded yet');
        return;
    }
    
    const matches = allGuests.filter(guest => {
        if (!guest || !guest.name) return false;
        
        const name = guest.name.toLowerCase();
        
        // Handle searchTerms - check if it exists and is an array
        let searchTermsText = '';
        if (guest.searchTerms && Array.isArray(guest.searchTerms)) {
            searchTermsText = guest.searchTerms.join(' ').toLowerCase();
        } else if (guest.searchTerms) {
            // If it's a string, use it directly
            searchTermsText = String(guest.searchTerms).toLowerCase();
        }
        
        // Also search in email if it exists
        const email = guest.email ? guest.email.toLowerCase() : '';
        
        // Match anywhere in the string (case-insensitive)
        return name.includes(searchTerm) || 
               searchTermsText.includes(searchTerm) || 
               email.includes(searchTerm);
    }).slice(0, 10);
    
    displaySearchResults(matches);
}

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Display search results
function displaySearchResults(guests) {
    searchResults.innerHTML = '';
    
    if (guests.length === 0) {
        const noResults = document.createElement('div');
        noResults.textContent = 'No guests found. Please check the spelling or contact the couple.';
        noResults.style.padding = '15px';
        noResults.style.color = '#666';
        searchResults.appendChild(noResults);
    } else {
        guests.forEach(guest => {
            const guestElement = document.createElement('div');
            guestElement.textContent = guest.name;
            guestElement.dataset.id = guest.id;
            
            guestElement.style.padding = '10px 15px';
            guestElement.style.cursor = 'pointer';
            guestElement.style.transition = 'background-color 0.2s';
            
            guestElement.addEventListener('mouseover', () => {
                guestElement.style.backgroundColor = '#f5f5f5';
            });
            
            guestElement.addEventListener('mouseout', () => {
                guestElement.style.backgroundColor = 'transparent';
            });
            
            guestElement.addEventListener('click', () => selectGuest(guest));
            searchResults.appendChild(guestElement);
        });
    }
    
    searchResults.classList.add('active');
}

// Select a guest from search results
async function selectGuest(guest) {
    try {
        // Get the latest guest data from Firestore
        const db = window.db || firebase.firestore();
        const guestDoc = await db.collection('guests').doc(guest.id).get();
        if (!guestDoc.exists) {
            showMessage('Error', 'Guest not found. Please contact the couple.');
            return;
        }
        
        const guestData = { id: guestDoc.id, ...guestDoc.data() };
        currentGuest = guestData;
        guestSearch.value = guestData.name;
        searchResults.classList.remove('active');
        
        // Check if guest has already RSVP'd
        if (guestData.rsvp !== 'pending') {
            showMessage(
                'RSVP Already Submitted',
                `It looks like ${guestData.name} has already submitted an RSVP.\n\n` +
                'Please contact the couple if you believe this is an error.'
            );
            return;
        }
        
        // Show RSVP form
        guestNameElement.textContent = guestData.name;
        rsvpForm.classList.remove('hidden');
        rsvpForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
        console.error('Error selecting guest:', error);
        showMessage('Error', 'Failed to load guest information. Please try again.');
    }
}

// Handle RSVP option selection
rsvpOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        const response = e.currentTarget.dataset.rsvp;
        submitRSVP(response);
    });
});

// Submit RSVP
async function submitRSVP(response) {
    if (!currentGuest) return;
    
    try {
        // Generate a unique code if it doesn't exist
        const uniqueCode = currentGuest.code || generateUniqueCode();
        
        // Update guest in Firestore
        const db = window.db || firebase.firestore();
        await db.collection('guests').doc(currentGuest.id).update({
            rsvp: response,
            code: uniqueCode,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Update local guest object
        currentGuest.rsvp = response;
        currentGuest.code = uniqueCode;
        
        // Show success message
        rsvpForm.classList.add('hidden');
        rsvpSuccess.classList.remove('hidden');
        
        // Update success message
        document.getElementById('guestGreeting').textContent = `Thank you, ${currentGuest.name}!`;
        
        // Scroll to success message
        rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Show the unique code
        const codeElement = document.createElement('div');
        codeElement.style.margin = '20px 0';
        codeElement.style.fontSize = '1.2rem';
        codeElement.style.fontWeight = 'bold';
        codeElement.style.color = 'var(--primary-color)';
        codeElement.textContent = `Your RSVP Code: ${uniqueCode}`;
        
        const successMessage = document.querySelector('.success-message');
        if (response === 'attending') {
            // Automatically generate and download the invitation
            generateAndDownloadInvitation();
        } else {
            // Hide the download button if not attending
            const downloadButton = document.getElementById('downloadInvite');
            if(downloadButton) {
                downloadButton.style.display = 'none';
            }
        }
        
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        showMessage('Error', 'Failed to submit your RSVP. Please try again or contact the couple.');
    }
}

function generateUniqueCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}



async function generateAndDownloadInvitation() {
    console.log('Generating and downloading invitation...');
    
    if (!currentGuest || !currentGuest.name || !currentGuest.code) {
        console.error('No guest selected or guest data incomplete');
        showNotification('Please select a guest first', 'warning', 4000);
        return;
    }

    const invitationContent = document.getElementById('invitationContent');
    if (!invitationContent) {
        console.error('invitationContent element not found in DOM');
        showNotification('Error: Could not load invitation. Please refresh the page and try again.', 'error', 6000);
        return;
    }

    // Make sure the content is visible for html2canvas
    invitationContent.style.display = 'block';
    
    const fileName = `Wedding-Invitation-${currentGuest.name.replace(/\s+/g, '-')}.png`;
    // Prefer scoping to invitationContent; create missing nodes if needed (supports admin page)
    let qrcodeContainer = invitationContent.querySelector('#qrcodeContainer');

    try {
        // Ensure required elements exist
        let pdfGuestNameElement = invitationContent.querySelector('#pdfGuestName');
        let pdfRsvpCodeElement = invitationContent.querySelector('#pdfRsvpCode');

        if (!pdfGuestNameElement) {
            const nameP = document.createElement('p');
            nameP.style.textAlign = 'center';
            nameP.style.fontSize = '1.2em';
            nameP.style.fontWeight = 'bold';
            nameP.setAttribute('data-translate', 'invitation_guest');
            nameP.innerHTML = 'Guest: <span id="pdfGuestName"></span>';
            invitationContent.appendChild(nameP);
            pdfGuestNameElement = nameP.querySelector('#pdfGuestName');
        }

        // RSVP Code is no longer displayed as text since it's in the QR code
        // But we keep the element query in case it exists in older templates
        if (pdfRsvpCodeElement) {
            pdfRsvpCodeElement.textContent = currentGuest.code;
        }

        if (!qrcodeContainer) {
            qrcodeContainer = document.createElement('div');
            qrcodeContainer.id = 'qrcodeContainer';
            qrcodeContainer.style.margin = '20px auto';
            qrcodeContainer.style.textAlign = 'center';
            qrcodeContainer.style.display = 'flex';
            qrcodeContainer.style.justifyContent = 'center';
            qrcodeContainer.style.alignItems = 'center';
            invitationContent.appendChild(qrcodeContainer);
        } else {
            // Ensure existing QR code container is properly centered
            qrcodeContainer.style.textAlign = 'center';
            qrcodeContainer.style.display = 'flex';
            qrcodeContainer.style.justifyContent = 'center';
            qrcodeContainer.style.alignItems = 'center';
        }

        qrcodeContainer.innerHTML = '';
        new QRCode(qrcodeContainer, {
            text: currentGuest.code,
            width: 128,
            height: 128,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        // Re-query (in case of DOM changes) and validate
        pdfGuestNameElement = invitationContent.querySelector('#pdfGuestName');
        
        if (!pdfGuestNameElement) {
            console.error('Could not find guest name element');
            return;
        }

        pdfGuestNameElement.textContent = currentGuest.name;
        
        // Update RSVP code element if it exists (for backward compatibility)
        pdfRsvpCodeElement = invitationContent.querySelector('#pdfRsvpCode');
        if (pdfRsvpCodeElement) {
            pdfRsvpCodeElement.textContent = currentGuest.code;
        }
        
        // Ensure date and address are in correct format
        const dateElement = invitationContent.querySelector('[data-translate="invitation_date"]');
        if (dateElement) {
            dateElement.textContent = 'Date: 16 December 2025 at 09:00';
            dateElement.style.fontSize = '1.1em';
            dateElement.style.fontWeight = 'bold';
        }
        
        // Remove old separate time element if it exists
        const oldTimeElement = invitationContent.querySelector('[data-translate="invitation_time"]');
        if (oldTimeElement) {
            oldTimeElement.style.display = 'none';
        }
        
        const venueElement = invitationContent.querySelector('[data-translate="invitation_venue"]');
        if (venueElement) {
            venueElement.textContent = 'Plot 16, N14 &, Steyn Rd, Krugersdorp';
            venueElement.style.fontSize = '1.1em';
        }
        
        // Hide or remove old address elements if they exist separately
        const oldAddress1 = invitationContent.querySelector('[data-translate="invitation_address1"]');
        if (oldAddress1 && oldAddress1 !== venueElement) {
            oldAddress1.style.display = 'none';
        }
        const oldAddress2 = invitationContent.querySelector('[data-translate="invitation_address2"]');
        if (oldAddress2 && oldAddress2 !== venueElement) {
            oldAddress2.style.display = 'none';
        }
        
        // Wait for venue image to load before generating canvas
        const venueImage = invitationContent.querySelector('#venueImage');
        if (venueImage && venueImage.src) {
            if (!venueImage.complete) {
                await new Promise((resolve, reject) => {
                    venueImage.onload = resolve;
                    venueImage.onerror = resolve; // Continue even if image fails to load
                    // Timeout after 3 seconds
                    setTimeout(resolve, 3000);
                });
            }
        }
                
        const canvas = await html2canvas(invitationContent);
        const imageDataURL = canvas.toDataURL('image/png');
        
        const a = document.createElement('a');
        a.href = imageDataURL;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        invitationContent.style.display = 'none';

    } catch (error) {
        console.error('Error generating image:', error);
        showNotification('Failed to generate image invitation. Please try again or contact the couple.', 'error', 6000);
        invitationContent.style.display = 'none';
    }
}

// Show a message to the user (updated to use notifications)
function showMessage(title, message) {
    showNotification(`${title}: ${message}`, 'info', 6000);
}



// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.section, .detail-card, .gallery-item, .story-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Initialize tooltips
const tooltipElements = document.querySelectorAll('[data-tooltip]');
tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
});

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = this.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (this.offsetWidth - tooltip.offsetWidth) / 2}px`;
    
    this.tooltip = tooltip;
}

function hideTooltip() {
    if (this.tooltip) {
        this.tooltip.remove();
        this.tooltip = null;
    }
}

// Add a simple fade-in animation for page load
document.body.style.opacity = '0';
window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
});

// ============== FIRESTORE HELPERS ==============
// 1. Search for a guest by first+last name (case-insensitive)
async function getGuest(first, last) {
  const db = window.db || firebase.firestore();
  const snap = await db.collection('guests')
                       .where('first', '==', first.trim().toLowerCase())
                       .where('last', '==', last.trim().toLowerCase())
                       .limit(1)
                       .get();
  return snap.empty ? null : snap.docs[0].data();
}

// 2. Save or update an RSVP document
async function submitRsvp(data) {
  // data = {name:string, attending:bool, plusOne:bool, diet:string}
  const db = window.db || firebase.firestore();
  const id = data.name.toLowerCase().replace(/\s+/g,'-');  // simple key
  await db.collection('rsvps').doc(id).set(data);
  return id;
}



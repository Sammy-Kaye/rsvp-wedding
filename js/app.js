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
    const searchTerm = e.target.value.trim().toLowerCase();
    
    if (searchTerm.length < 1) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        return;
    }
    
    const matches = allGuests.filter(guest => {
        const name = guest.name.toLowerCase();
        const searchTerms = guest.searchTerms.join(' ').toLowerCase();
        return name.includes(searchTerm) || searchTerms.includes(searchTerm);
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
        alert('Please select a guest first');
        return;
    }

    const invitationContent = document.getElementById('invitationContent');
    if (!invitationContent) {
        console.error('invitationContent element not found in DOM');
        alert('Error: Could not load invitation. Please refresh the page and try again.');
        return;
    }

    // Make sure the content is visible for html2canvas
    invitationContent.style.display = 'block';
    
    const fileName = `Wedding-Invitation-${currentGuest.name.replace(/\s+/g, '-')}.png`;
    const qrcodeContainer = document.getElementById('qrcodeContainer');

    try {
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

        const pdfGuestNameElement = invitationContent.querySelector('#pdfGuestName');
        const pdfRsvpCodeElement = invitationContent.querySelector('#pdfRsvpCode');

        if (!pdfGuestNameElement || !pdfRsvpCodeElement) {
            console.error('Could not find guest name or rsvp code element');
            return;
        }

        pdfGuestNameElement.textContent = currentGuest.name;
        pdfRsvpCodeElement.textContent = currentGuest.code;
                
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
        alert('Failed to generate image invitation. Please try again or contact the couple.');
        invitationContent.style.display = 'none';
    }
}

// Show a message to the user
function showMessage(title, message) {
    // In a real app, you might use a modal or toast notification
    alert(`${title}\n\n${message}`);
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
  const id = data.name.toLowerCase().replace(/\s+/g,'-');  // simple key
  await db.collection('rsvps').doc(id).set(data);
  return id;
}



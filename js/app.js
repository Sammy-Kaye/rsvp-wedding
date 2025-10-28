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
const downloadInviteBtn = document.getElementById('downloadInvite');
const scrollDown = document.querySelector('.scroll-down');

// Initialize Firestore
db.settings({ timestampsInSnapshots: true });

// Track current guest and guest list
let currentGuest = null;
let guestList = [];

// Listen for guest search input
guestSearch.addEventListener('input', debounce(handleGuestSearch, 300));

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

// Handle guest search
async function handleGuestSearch(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    
    if (searchTerm.length < 2) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        return;
    }
    
    try {
        const guestsRef = db.collection('guests');
        const snapshot = await guestsRef
            .where('name', '>=', searchTerm)
            .where('name', '<=', searchTerm + '\uf8ff')
            .limit(10)
            .get();
            
        const matches = [];
        snapshot.forEach(doc => {
            matches.push({ id: doc.id, ...doc.data() });
        });
        
        displaySearchResults(matches);
    } catch (error) {
        console.error('Error searching guests:', error);
        showMessage('Error', 'Failed to search guests. Please try again.');
    }
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

// Search functionality
guestSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    
    if (searchTerm.length < 2) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        return;
    }
    
    const matches = guestList.filter(guest => 
        guest.name.toLowerCase().includes(searchTerm) ||
        guest.email.toLowerCase().includes(searchTerm)
    );
    
    displaySearchResults(matches);
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
            
            // Show RSVP status if already responded
            if (guest.rsvp !== 'pending') {
                const status = document.createElement('span');
                status.textContent = ` (${guest.rsvp === 'attending' ? '✓ Attending' : '✗ Not Attending'})`;
                status.style.marginLeft = '10px';
                status.style.color = guest.rsvp === 'attending' ? 'green' : 'red';
                guestElement.appendChild(status);
            }
            
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
                `Status: ${guestData.rsvp === 'attending' ? '✓ Attending' : '✗ Not Attending'}\n` +
                `Response Date: ${new Date(guestData.lastUpdated?.toDate()).toLocaleDateString()}\n\n` +
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
        const uniqueCode = currentGuest.code || generateUniqueCode(currentGuest.id);
        
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
        
        const successContent = document.querySelector('.success-message p:last-child');
        successContent.parentNode.insertBefore(codeElement, successContent);
        
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        showMessage('Error', 'Failed to submit your RSVP. Please try again or contact the couple.');
    }
}

// Generate a unique code for the guest
function generateUniqueCode(guestId) {
    const prefix = 'WED';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${guestId.toString().padStart(3, '0')}${randomNum}`;
}

// Download invitation PDF
if (downloadInviteBtn) {
    downloadInviteBtn.addEventListener('click', () => {
        if (!currentGuest) return;
        
        // In a real app, this would generate and download a PDF
        // For now, we'll show a message
        alert('In a real implementation, this would download a PDF invitation.');
        
        // Example of what the PDF would contain:
        /*
        Wedding Invitation
        -----------------
        Guest: ${currentGuest.name}
        Code: ${generateUniqueCode(currentGuest.id)}
        
        You're invited to celebrate the marriage of
        John & Jane
        
        Date: June 12, 2025
        Time: 4:00 PM
        Location: The Grand Ballroom, New York
        
        Please present this invitation at the entrance.
        */
    });
}

// Show a message to the user
function showMessage(title, message) {
    // In a real app, you might use a modal or toast notification
    alert(`${title}\n\n${message}`);
}

// Scroll down button
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
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

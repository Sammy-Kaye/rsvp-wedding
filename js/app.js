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

// Sample guest data (in a real app, this would come from a backend API)
const guestList = [
    { id: 1, name: 'John Doe', email: 'john@example.com', rsvp: 'pending' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', rsvp: 'pending' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', rsvp: 'pending' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', rsvp: 'pending' },
    { id: 5, name: 'David Brown', email: 'david@example.com', rsvp: 'pending' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', rsvp: 'pending' },
    { id: 7, name: 'Robert Wilson', email: 'robert@example.com', rsvp: 'pending' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', rsvp: 'pending' },
    { id: 9, name: 'James Taylor', email: 'james@example.com', rsvp: 'pending' },
    { id: 10, name: 'Jennifer Martinez', email: 'jennifer@example.com', rsvp: 'pending' },
];

// Track current guest
let currentGuest = null;

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
            guestElement.addEventListener('click', () => selectGuest(guest));
            searchResults.appendChild(guestElement);
        });
    }
    
    searchResults.classList.add('active');
}

// Select a guest from search results
function selectGuest(guest) {
    currentGuest = guest;
    guestSearch.value = guest.name;
    searchResults.classList.remove('active');
    
    // Check if guest has already RSVP'd
    if (guest.rsvp !== 'pending') {
        showMessage('RSVP Already Submitted', 
                   `It looks like ${guest.name} has already submitted an RSVP. ` +
                   'Please contact the couple if you believe this is an error.');
        return;
    }
    
    // Show RSVP form
    guestNameElement.textContent = guest.name;
    rsvpForm.classList.remove('hidden');
    rsvpForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Handle RSVP option selection
rsvpOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        const response = e.currentTarget.dataset.rsvp;
        submitRSVP(response);
    });
});

// Submit RSVP
function submitRSVP(response) {
    if (!currentGuest) return;
    
    // In a real app, you would send this to your backend
    console.log(`RSVP for ${currentGuest.name}: ${response}`);
    
    // Update guest status
    currentGuest.rsvp = response;
    
    // Show success message
    rsvpForm.classList.add('hidden');
    rsvpSuccess.classList.remove('hidden');
    
    // Generate and display unique code
    const uniqueCode = generateUniqueCode(currentGuest.id);
    document.getElementById('guestGreeting').textContent = `Thank you, ${currentGuest.name}!`;
    
    // Scroll to success message
    rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Store RSVP in localStorage (temporary solution)
    const rsvpData = {
        guestId: currentGuest.id,
        name: currentGuest.name,
        response: response,
        code: uniqueCode,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(`rsvp_${currentGuest.id}`, JSON.stringify(rsvpData));
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

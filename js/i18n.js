const translations = {};
let currentLang = 'en';

async function loadTranslations(lang) {
    if (translations[lang]) {
        return translations[lang];
    }
    try {
        const response = await fetch(`./lang/${lang}.json`);
        const data = await response.json();
        translations[lang] = data;
        return data;
    } catch (error) {
        console.error(`Error loading translations for ${lang}:`, error);
        return {};
    }
}

function applyTranslations(langData) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langData[key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', langData[key]);
            } else {
                element.textContent = langData[key];
            }
        }
    });
}

async function setLanguage(lang) {
    console.log(`Setting language to: ${lang}`);
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    const langData = await loadTranslations(lang);
    applyTranslations(langData);

    // Update active button state
    updateLangButtonActiveState();
    
    // Update current-lang display text
    const currentLangDisplay = document.getElementById('current-lang');
    if (currentLangDisplay) {
        currentLangDisplay.textContent = lang.toUpperCase();
    }
    
    // Close dropdown if open
    const dropdown = document.querySelector('.lang-toggle-dropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

function updateLangButtonActiveState() {
    document.querySelectorAll('.lang-button').forEach(button => {
        if (button.id === `langToggle${currentLang.toUpperCase()}`) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded fired in i18n.js');
    const preferredLang = localStorage.getItem('preferredLang') || 'en';
    console.log(`Preferred language from localStorage: ${preferredLang}`);
    await setLanguage(preferredLang);

    // Setup dropdown toggle button
    const langToggleBtn = document.querySelector('.lang-toggle-btn');
    const langToggleDropdown = document.querySelector('.lang-toggle-dropdown');
    
    if (langToggleBtn && langToggleDropdown) {
        langToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langToggleDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langToggleBtn.contains(e.target) && !langToggleDropdown.contains(e.target)) {
                langToggleDropdown.classList.remove('active');
            }
        });
    }

    // Add language toggle buttons
    const langToggleEn = document.getElementById('langToggleEn');
    const langToggleFr = document.getElementById('langToggleFr');

    console.log('langToggleEn:', langToggleEn);
    console.log('langToggleFr:', langToggleFr);

    if (langToggleEn) {
        langToggleEn.addEventListener('click', (e) => {
            e.stopPropagation();
            setLanguage('en');
        });
        console.log('Event listener added to langToggleEn');
    }
    if (langToggleFr) {
        langToggleFr.addEventListener('click', (e) => {
            e.stopPropagation();
            setLanguage('fr');
        });
        console.log('Event listener added to langToggleFr');
    }
});

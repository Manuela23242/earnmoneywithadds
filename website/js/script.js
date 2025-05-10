// DOM Elements
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const authModal = document.getElementById('auth-modal');
const closeBtn = document.querySelector('.close-btn');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const watchAdBtn = document.getElementById('watch-ad-btn');
const adPlaceholder = document.getElementById('ad-placeholder');
const coinCount = document.getElementById('coin-count');
const userDashboard = document.getElementById('user-dashboard');
const usernameDisplay = document.getElementById('username');
const contactForm = document.getElementById('contact-form');

// Mock user data (in a real app, this would be stored in a database)
let currentUser = null;
const users = [
    {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        coins: 50
    }
];

// Event Listeners
if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        showAuthModal('register');
    });
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        showAuthModal('login');
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', hideAuthModal);
}

if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthForms();
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthForms();
    });
}

// Add event listener to login form
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        loginUser(email, password);
    });
}

// Add event listener to register form
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwörter stimmen nicht überein!');
            return;
        }
        
        registerUser(username, email, password);
    });
}

// Add event listener to watch ad button
if (watchAdBtn) {
    watchAdBtn.addEventListener('click', showAd);
}

// Add event listener to contact form
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real app, this would send the data to a server
        alert(`Danke für deine Nachricht, ${name}! Wir werden uns bald bei dir melden.`);
        contactForm.reset();
    });
}

// Functions
function showAuthModal(type) {
    authModal.classList.remove('hidden');
    
    if (type === 'register') {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    } else {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    }
}

function hideAuthModal() {
    authModal.classList.add('hidden');
}

function toggleAuthForms() {
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

function loginUser(email, password) {
    // In a real app, this would validate against a database
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        hideAuthModal();
        updateUserInterface();
    } else {
        alert('Ungültige E-Mail oder Passwort!');
    }
}

function registerUser(username, email, password) {
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert('Diese E-Mail wird bereits verwendet!');
        return;
    }
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
        coins: 0
    };
    
    users.push(newUser);
    currentUser = newUser;
    
    hideAuthModal();
    updateUserInterface();
}

function updateUserInterface() {
    if (currentUser) {
        // Hide hero section and show user dashboard
        document.querySelector('.hero').classList.add('hidden');
        userDashboard.classList.remove('hidden');
        
        // Update user info
        usernameDisplay.textContent = currentUser.username;
        coinCount.textContent = currentUser.coins;
        
        // Update nav buttons
        if (loginBtn && registerBtn) {
            loginBtn.classList.add('hidden');
            registerBtn.classList.add('hidden');
        }
    }
}

function showAd() {
    // Disable the watch ad button while ad is showing
    watchAdBtn.disabled = true;
    watchAdBtn.textContent = 'Werbung wird angezeigt...';
    
    // Simulate loading an ad
    adPlaceholder.innerHTML = '<div class="placeholder-text">Werbung wird geladen...</div>';
    
    // Google AdSense Integration
    setTimeout(() => {
        // Erstelle eine echte Google AdSense Anzeige
        adPlaceholder.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block; width:300px; height:250px"
                 data-ad-client="ca-pub-4743415945031649"
                 data-ad-slot="1234567890"
                 data-ad-format="auto"></ins>
        `;
        
        // AdSense-Code ausführen
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense-Fehler:', e);
        }
        
        // Nach 5 Sekunden den Benutzer mit Münzen belohnen
        setTimeout(() => {
            rewardUser();
            
            // Ad-Platzhalter und Button zurücksetzen
            adPlaceholder.innerHTML = '<div class="placeholder-text">Werbung lädt...</div>';
            watchAdBtn.disabled = false;
            watchAdBtn.textContent = 'Werbung anschauen';
        }, 5000);
    }, 1500);
}

function rewardUser() {
    if (currentUser) {
        // Add random number of coins between 1 and 5
        const coinsEarned = Math.floor(Math.random() * 5) + 1;
        currentUser.coins += coinsEarned;
        
        // Update the coin count display
        coinCount.textContent = currentUser.coins;
        
        // Show reward notification
        const notification = document.createElement('div');
        notification.className = 'reward-notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '15px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.innerHTML = `<strong>+${coinsEarned} Münzen!</strong> Gut gemacht!`;
        
        document.body.appendChild(notification);
        
        // Remove the notification after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

// Check if user is already logged in (in a real app, this would use cookies or localStorage)
window.addEventListener('load', () => {
    // For demo purposes, automatically log in the test user
    // Remove this in a real application
    // currentUser = users[0];
    // updateUserInterface();
}); 
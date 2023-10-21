// Initialize Firebase with your own Firebase project config (similar to your signup page)
const firebaseConfig = {
    apiKey: "AIzaSyDUWDlrcDGwkGgp_6us11rsDBrfIHYma1g",
    authDomain: "water-quality-monitoring-cf684.firebaseapp.com",
    projectId: "water-quality-monitoring-cf684",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Function to update the dashboard with user information
function updateUserInformation(user) {
    const userEmailElement = document.getElementById('user-email');
 // Display the user's name or 'User' if not set
    userEmailElement.textContent = user.email || 'No email provided'; // Display the user's email or a placeholder
}

// Check the user's authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        updateUserInformation(user); // Update user information on the dashboard
    } else {
        // User is signed out, you can handle this case if needed
        // For example, you can redirect to the login page
        window.location.href = 'http://127.0.0.1:5500/src/index.html';
    }
});
function signOut() {
    auth.signOut().then(() => {
        // Sign out successful, redirect to the login page
        window.location.href = 'http://127.0.0.1:5500/src/index.html';
    }).catch((error) => {
        // Handle sign out errors if needed
        console.error('Sign Out Error:', error);
    });
}

// Handle the "Sign Out" button click
const signOutButton = document.getElementById('sign-out-button');
signOutButton.addEventListener('click', signOut);

// Initialize Firebase with your own Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyDUWDlrcDGwkGgp_6us11rsDBrfIHYma1g",
    authDomain: "water-quality-monitoring-cf684.firebaseapp.com",
    projectId: "water-quality-monitoring-cf684",
};

firebase.initializeApp(firebaseConfig);

const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');


const auth = firebase.auth();


function signup() {
    const email = signupEmail.value;
    const password = signupPassword.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`Signed up as ${user.email}`);
            // You can get the user's ID token for making authenticated requests to Firebase
            user.getIdToken().then((token) => {
                console.log(`User ID token: ${token}`);
            });

            // Redirect to the dashboard after successful signup
            window.location.href = 'http://127.0.0.1:5500/src/login.html'; // Replace 'dashboard.html' with the actual URL of your dashboard page.
        })
        .catch((error) => {
            // Check if the error is due to an email that already exists
            if (error.code === 'auth/email-already-in-use') {
                // Show a popup or an error message for the existing email
                alert('This email is already in use. Please use a different email.');
            } else {
                console.error(error.message); // Handle other errors
            }
        });
}


// Auth state change listener
auth.onAuthStateChanged((user) => {
    const signupForm = document.getElementById('signup-form');
    const logoutButton = document.getElementById('logout-button');

    if (user) {
        // User is signed in
    } else {
        // User is signed out
        signupForm.style.display = '';
    }
});

// Initialize Firebase with your own Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyDUWDlrcDGwkGgp_6us11rsDBrfIHYma1g",
    authDomain: "water-quality-monitoring-cf684.firebaseapp.com",
    projectId: "water-quality-monitoring-cf684",
};

firebase.initializeApp(firebaseConfig);

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

const auth = firebase.auth();


// login 
function login() {
const email = loginEmail.value;
const password = loginPassword.value;

auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    const user = userCredential.user;
    console.log(`Logged in as ${user.email}`);
    // You can get the user's ID token for making authenticated requests to Firebase
    user.getIdToken().then((token) => {
        console.log(`User ID token: ${token}`);
        // Redirect to the dashboard page with the token as a query parameter
        window.location.href = `dashboard/index.html?token=${token}`;
    });
})

.catch((error) => {
            console.error(error.message);
            // Display the custom popup with the error message
            openPopup(error.message);
        });

}
// Open the custom popup with an error message
function openPopup(message) {
    const errorPopup = document.getElementById('error-popup');
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = message;
    errorPopup.style.display = 'block';
}

// Close the custom popup
function closePopup() {
    const errorPopup = document.getElementById('error-popup');
    errorPopup.style.display = 'none';
} 

// Function to get the token from the URL query parameters
function getTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
}

// Check if a valid token is present
const token = getTokenFromURL();
if (token) {
    // You can use the token for authentication and authorization here
    console.log('Token:', token);
} else {
    // Redirect to the login page if the token is missing or invalid
    window.location.href = 'src/login.html';
    window.location.href = 'src/dashboard/signup.html';
}